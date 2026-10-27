# Backend Task: Harden JWT Sessions and Return Structured Auth Errors

## Context

This repository has a Deno + Lesan backend (`back/`, shared code in `lib/`) and a
Next.js 15 frontend (`web/`). The web app talks to the backend through server
actions using the Lesan client (`web/src/services/api.ts`).

Current authentication flow:

1. `web/src/app/actions/loginReq.ts` calls `user.loginReq`. In development
   (`ENV=development`) the OTP is always `11111`; otherwise it is generated in
   `back/src/user/loginReq/loginReqUser.fn.ts`.
2. `web/src/app/actions/login.ts` calls `user.login`
   (`back/src/user/login/loginUser.fn.ts`). The backend mints a JWT containing
   `_id`, `national_number`, `mobile`, and `exp` (currently 90 days) and returns
   `{ token, user }`.
3. The web stores `token`, `national_number`, and `user` in cookies
   (`web/src/context/AuthContext.tsx`,
   `web/src/components/organisms/login/LoginStepTwo.tsx`).
4. Every protected act runs `preAct`/`preValidation`:
   - `setTokens` (`lib/utils/setToken.ts`) reads the raw `token` request header
     and verifies the JWT.
   - `setUser` (`lib/utils/setUser.ts`) loads the user document by `_id` and
     replaces `context.user`.
   - Optionally `grantAccess` (`lib/utils/grantAccess.ts`) checks levels.
5. `web/src/app/admin/layout.tsx` and `web/src/app/user/layout.tsx` call
   `getMe` (`back/src/user/getMe/*`) on every render. If `getMe` returns
   `success: false`, the web redirects to `/login?expired=1`, clears the session
   cookies, and shows «نشست شما منقضی شده است. لطفاً دوباره وارد شوید.»

## Reported symptom

A user logs in successfully as `Ghost` (national code `3875523474`, dev OTP
`11111`), then opens `/admin` and is immediately bounced back to `/login` with
the expired-session notice, even though a `token` cookie exists.

The current web code already recovers from this by clearing the dead cookie and
forcing a re-login, but the user should not be logged out by a still-valid
session in the first place. The backend is the source of truth for token
validity, so it must make session validity stable and unambiguous.

## Evidence from the current backend

Calling `getMe` directly against `http://localhost:1382/lesan`:

```bash
# missing token
curl -s --noproxy '*' -X POST http://localhost:1382/lesan \
  -H 'Content-Type: application/json' \
  -d '{"service":"main","model":"user","act":"getMe","details":{"set":{},"get":{"_id":1,"level":1}}}'
# => {"body":{"message":"you should send your id with token key in req header"},"success":false}

# tampered signature
# => {"body":{"message":"The jwt's signature does not match the verification signature."},"success":false}

# expired token
# => {"body":{"message":"The jwt is expired."},"success":false}
```

Problems:

- The failures are free-form English strings. The web cannot distinguish
  "expired" from "invalid signature" from "user deleted" without string matching.
- `lib/utils/setToken.ts` falls back to the hard-coded secret
  `"simpleSecretKey"` when `TOKEN_KEY` is unset. If a deployment sets or rotates
  `TOKEN_KEY`, every existing session becomes invalid with no grace period.
- `setUser` does `new ObjectId(_id)` without validating the value. A malformed
  or legacy `_id` in a token throws a raw BSON error instead of an auth error.
- There is no lightweight session-check act, no token refresh, and no way to
  revoke a token.
- The JWT has no `jti`/`kid`, so keys cannot be rotated and tokens cannot be
  revoked.

## Required backend changes

Implement these in `lib/` and `back/`. Do **not** edit anything under `web/`.

### 1. Make the signing key stable and explicit

- Read the signing key from `TOKEN_KEY`.
- In non-development environments, **fail fast at boot** if `TOKEN_KEY` is
  missing, empty, or the weak fallback value. Never sign production tokens with
  `"simpleSecretKey"`.
- Keep the development fallback only when `ENV=development`.
- Document the required env var in the backend README or a comment next to the
  key setup.
- Add an optional `TOKEN_KEY_PREVIOUS` to support key rotation (see below).

### 2. Support key rotation without logging everyone out

- Include a `kid` (key id) in the JWT header.
- Sign new tokens with the current key.
- Verify tokens against the current key and, when present, the previous key.
- This lets a deploy rotate `TOKEN_KEY` while still accepting tokens minted with
  the previous key until they expire.

### 3. Return structured auth errors

Replace raw thrown strings from the auth pipeline with a consistent shape, for
example:

```ts
{
  success: false,
  body: {
    code: "AUTH_TOKEN_EXPIRED" | "AUTH_TOKEN_INVALID" | "AUTH_TOKEN_MISSING"
        | "AUTH_USER_NOT_FOUND" | "AUTH_USER_ID_INVALID",
    message: "...", // human readable, safe to log
  },
}
```

At minimum:

- `AUTH_TOKEN_MISSING` — no `token` header.
- `AUTH_TOKEN_INVALID` — signature/format failure.
- `AUTH_TOKEN_EXPIRED` — `exp` in the past.
- `AUTH_USER_ID_INVALID` — token payload `_id` is not a valid ObjectId.
- `AUTH_USER_NOT_FOUND` — token is valid but the user no longer exists.

Wrap `jwt.verify`, `ObjectId` construction, and user lookup so these are
deterministic. Do not expose secrets or stack traces.

### 4. Add a lightweight session-check act

Add a new act, e.g. `user.checkSession` (or `user.validateToken`), registered in
`back/src/user/mod.ts`. It must:

- Accept the raw `token` header.
- Never throw for an expired/invalid token; return
  `{ valid: false, code, message }` instead.
- Return `{ valid: true, user: { _id, level }, expiresAt }` for a valid token.
- Be cheap: no `favArticles` aggregation, no full `getMe` projection.

Keep the existing `getMe` act working for the web, but have it return the same
structured `code` on failure. The web can keep treating any `success: false` as
"go to login", but the code makes future client behavior and logging precise.

### 5. Add sliding expiry / refresh (recommended)

Either:

- add `user.refreshToken` that exchanges a valid token for a new token, or
- re-issue the token from `getMe`/`checkSession` when it is within N days of
  expiry.

Document the chosen lifetime. Do not make tokens longer than necessary.

### 6. Validate `_id` before using it

In `lib/utils/setUser.ts`, validate the token payload before
`new ObjectId(_id)`:

```ts
if (!ObjectId.isValid(_id)) throwAuthError("AUTH_USER_ID_INVALID");
```

Return `AUTH_USER_NOT_FOUND` when the lookup returns nothing.

### 7. Optional: revocation and `jti`

If logout/revocation is in scope:

- Add a `jti` claim to new tokens.
- On logout, store the `jti` in Redis (`myRedis`) with a TTL equal to the
  remaining token lifetime.
- Reject tokens whose `jti` is in the denylist.

This is optional; do not block the rest of the task on it.

## Constraints

- Do not change the act names or request/response fields the web already uses
  (`login`, `loginReq`, `getMe`) without also updating the web in a separate
  task. This task is backend-only.
- Preserve user-level semantics: `Ghost` is the highest level and is accepted
  everywhere `Manager` is accepted (`lib/utils/grantAccess.ts`).
- Keep the dev OTP `11111` behavior for `ENV=development`.
- Use the existing `myRedis` connection if Redis is needed.
- Follow the existing Deno style (tabs, `throwError`, `@paper/lib` imports).

## Suggested file map

- `lib/utils/setToken.ts` — key loading, `kid`/rotation, structured verify errors.
- `lib/utils/setUser.ts` — `ObjectId.isValid`, `AUTH_USER_NOT_FOUND`.
- `lib/utils/throwError.ts` — if a structured error helper is needed.
- `lib/models/user.ts` — no schema change expected.
- `back/src/user/login/loginUser.fn.ts` — sign with `kid`, optional `jti`.
- `back/src/user/getMe/*` — return structured failure codes.
- `back/src/user/checkSession/*` — new act (fn, val, mod).
- `back/src/user/mod.ts` — register the new act.
- `back/mod.ts` — env validation at boot if appropriate.
- `back/test/E2E.json` — add cases if the harness supports them.

## Acceptance criteria

1. With `ENV=development` and no `TOKEN_KEY`, the backend still starts and the
   dev flow works.
2. With `ENV=production` (or any non-development value) and no `TOKEN_KEY`, the
   backend refuses to start with a clear message.
3. Login returns a token with a `kid` header.
4. `checkSession` with a valid token returns `valid: true`, the user `_id` and
   `level`, and `expiresAt`.
5. `checkSession` with an expired token returns `valid: false` and
   `AUTH_TOKEN_EXPIRED` (no throw).
6. `checkSession` with a tampered token returns `valid: false` and
   `AUTH_TOKEN_INVALID`.
7. `getMe` with a valid token still returns the user document exactly as before.
8. `getMe` with an expired/invalid token returns `success: false` with the
   structured `code`.
9. A token signed with `TOKEN_KEY_PREVIOUS` is accepted while `TOKEN_KEY` is the
   current key.
10. A token whose `_id` is not a valid ObjectId returns `AUTH_USER_ID_INVALID`
    instead of a BSON error.
11. A token for a deleted user returns `AUTH_USER_NOT_FOUND`.

## Verification commands

```bash
# start deps (Redis + Mongo) and backend
redis-server --daemonize yes
cd /Users/syd/work/momeni/paper
ENV=development deno run -A ./back/mod.ts

# get an OTP and log in (dev OTP is 11111)
curl -s --noproxy '*' -X POST http://localhost:1382/lesan \
  -H 'Content-Type: application/json' \
  -d '{"service":"main","model":"user","act":"loginReq","details":{"set":{"national_number":"3875523474"},"get":{"mobile":1,"national_number":1}}}'

TOKEN=$(curl -s --noproxy '*' -X POST http://localhost:1382/lesan \
  -H 'Content-Type: application/json' \
  -d '{"service":"main","model":"user","act":"login","details":{"set":{"national_number":"3875523474","code":"11111"},"get":{"token":1,"user":{"_id":1,"level":1}}}}' \
  | python3 -c 'import sys,json;print(json.load(sys.stdin)["body"]["token"])')

# valid session
curl -s --noproxy '*' -X POST http://localhost:1382/lesan \
  -H 'Content-Type: application/json' -H "token: $TOKEN" \
  -d '{"service":"main","model":"user","act":"checkSession","details":{"set":{},"get":{}}}'

# valid getMe
curl -s --noproxy '*' -X POST http://localhost:1382/lesan \
  -H 'Content-Type: application/json' -H "token: $TOKEN" \
  -d '{"service":"main","model":"user","act":"getMe","details":{"set":{},"get":{"_id":1,"level":1}}}'

# invalid token
curl -s --noproxy '*' -X POST http://localhost:1382/lesan \
  -H 'Content-Type: application/json' -H "token: ${TOKEN}x" \
  -d '{"service":"main","model":"user","act":"checkSession","details":{"set":{},"get":{}}}'
```

Then run the backend's type check / E2E suite used by the repo (for example
`deno check back/mod.ts` and the existing `back/test/E2E.json` runner, if any).

## Notes for the agent

- The web already clears the session and shows the expired notice, so returning
  structured codes will not break it.
- The web calls `getMe` on every layout render; keep it fast.
- The reported symptom was originally caused by the frontend trusting the mere
  presence of a `token` cookie. That frontend bug is already fixed in the
  working tree. This task is the backend half: make token validity stable,
  observable, and recoverable.
- If you cannot implement refresh/revocation in this pass, still do items 1–4 and
  6; they are the minimum needed to make the session behavior trustworthy.
