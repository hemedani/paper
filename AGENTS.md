# Paper — Persian Research Paper Management Platform

## Project Overview

Paper (branded **پایگاه دانش**, "Paygah-e Danesh") is a Persian-language,
RTL research-paper and publication management platform for Iranian Islamic
architecture and urban planning. It combines a public catalog (articles, blogs,
keyword/tag search, graph visualization, chatbot, policy pages) with an
authenticated user area and an admin panel for managing content, users, and
relations.

The backend is a Deno + Lesan API backed by MongoDB and Redis. The frontend is
a Next.js 15 App Router application. There is no Docker/CI setup and no
automated test runner; verification is manual plus type-checking and linting.

### Architecture

- **Backend**: Deno + Lesan v0.1.22, MongoDB ODM with automatic API generation.
- **Database**: MongoDB at `127.0.0.1:27017`, database `paper`.
- **Cache / OTP store**: Redis at `127.0.0.1:6379`.
- **Authentication**: JWT (HS512) sent in the raw `token` request header.
- **API**: `POST /lesan`, Lesan playground at `/playground`, generated types.
- **File storage**: `back/uploads/` served statically at `/uploads`.
- **Frontend**: Next.js 15 (App Router, Turbopack), React 19, TypeScript,
  Tailwind CSS 3, custom atomic-design components, TipTap, React Hook Form +
  Zod, React Context, `date-fns-jalali`, Swiper, `vis-network`,
  `react-hot-toast`.
- **Ports**: backend `1382`, frontend `3000`.
- **CORS**: `localhost:1382`, `localhost:3000`, `localhost:4000`,
  `http://194.5.192.166:3000`.

## Repository Layout

```
paper/
├── back/                       # Deno backend; also hosts the @paper/lib workspace
│   ├── mod.ts                  # Application bootstrap (DB, Redis, models, server)
│   ├── deno.json               # Tasks, imports, formatting, workspace
│   ├── deps.ts                 # Single place for all external imports
│   ├── src/<domain>/<act>/     # One folder per act (mod.ts, .fn.ts, .val.ts)
│   ├── lib/                    # @paper/lib: models, context, shared utilities
│   ├── declarations/           # Generated selectInp.ts declarations
│   ├── test/E2E.json           # Manual Lesan playground collection
│   ├── uploads/                # Runtime uploads (ignored)
│   ├── prompts/                # Task / design prompts
│   └── AGENTS.md               # Detailed backend reference
├── web/                        # Next.js frontend
│   ├── src/app/                # Routes, layouts, and server actions
│   ├── src/components/         # atoms / molecules / organisms / template
│   ├── src/context/            # AuthContext
│   ├── src/services/api.ts     # paperApi (Lesan client)
│   ├── src/types/declarations/ # Frontend copy of backend declarations
│   ├── Figma Implemantation/   # Design implementation notes
│   └── QWEN.md                 # Detailed frontend reference
├── ignoreAssets/               # Local UI/UX reference images (untracked)
├── .workbuddy-ai/memory/       # Dated local session notes and decisions
├── main.ts                     # Leftover demo; not an entry point
└── .gitignore
```

The real backend entry point is `back/mod.ts`. `main.ts` at the repository root
is a small stale demo and is not used by the application.

## Read These First

- `back/AGENTS.md` — detailed backend models, acts, relations, auth pipeline,
  and a known-bugs list. Its auth section predates the JWT hardening work, so
  trust the current code in `back/lib/utils/tokenKeys.ts`,
  `back/src/authResponse.ts`, and the `checkSession` / `refreshToken` acts.
- `web/QWEN.md` — frontend architecture, server actions, Lesan integration,
  auth, and styling conventions.
- `.workbuddy-ai/memory/*.md` — recent UI redesign decisions, verification
  notes, and local gotchas. Treat these as working notes, not permanent spec.
- `ignoreAssets/Paygah-Danesh UI_UX/` and `web/Figma Implemantation/` — visual
  design references and implementation write-ups.
- `back/prompts/01-harden-jwt-session-and-structured-auth-errors.md` — the
  auth-hardening specification that shaped the current session behavior.

## Running the Stack

Prerequisites: Deno (2.x), Node.js 20+, npm, MongoDB, and Redis. MongoDB and
Redis URLs are hardcoded to localhost, so start them before the backend.

```bash
# Start dependencies (example on macOS)
redis-server --daemonize yes
# start MongoDB with your usual service manager, e.g. brew services start mongodb-community

# Backend
cd back
deno task dev      # ENV=development, watch mode
deno task start    # production-style start
deno task check    # deno check mod.ts

# Frontend (repo uses package-lock.json)
cd web
npm ci
npm run dev        # next dev --turbopack, http://localhost:3000
npm run build
npm run start
npm run lint
npx tsc --noEmit
```

Recommended start order: Redis and MongoDB -> backend -> frontend.

Local URLs:

- Frontend: `http://localhost:3000`
- Lesan endpoint: `http://localhost:1382/lesan`
- Playground: `http://localhost:1382/playground`
- Uploaded files: `http://localhost:1382/uploads/...`

**Do not start dev servers, watch processes, or production builds
automatically.** Only run them when the user explicitly asks. You may inspect
configuration, suggest commands, and run type checks/lints when appropriate.

### Production Notes

There is no container or deployment config in this repository. For production,
run the backend with `ENV` set to anything other than `development` and a strong
`TOKEN_KEY`, build the frontend with `npm run build`, and update the hardcoded
CORS origins in `back/mod.ts` if the host changes.

## Environment and Secrets

Backend environment variables:

- `ENV=development` — enables the fixed development OTP `11111`.
- `TOKEN_KEY` — JWT signing key. Required outside development; the backend
  refuses to start if it is missing, empty, or the old fallback value.
- `TOKEN_KEY_PREVIOUS` — optional previous key for rotation. Tokens signed with
  it are still accepted until they expire.

In development, `TOKEN_KEY` falls back to `simpleSecretKey`. Never use that
fallback outside development.

Frontend environment variables:

- `LESAN_URL` — backend base URL without `/lesan`; see `web/.env.example`.
  Defaults to `http://localhost:1382/lesan` when unset.

Session cookies: `token`, `national_number`, `user`, `registration_step`.
Never commit `.env` files, private keys, uploads, database dumps, or generated
caches. `uploads/`, `dump.rdb`, `node_modules`, and `.next` are ignored.

## Data Models

Models live in `back/lib/models/` and are instantiated exactly once in
`back/mod.ts`. Exported model variables are singular (`article`) even though
their factories are plural (`articles()`).

- **User** — name, mobile, gender, birth date, summary, personnel number,
  Iranian national number (unique, custom validation), address, level,
  verification, avatar/national card, favorites, registered publications.
- **Article** — `key`, type (`journalArticle` | `book`), publication year
  (1250–1500), title, abstract, ISBN/ISNN/DOI/URL, page/issue/volume, registrar,
  avatar, document, publication, authors, tags, keywords.
- **Blog** — title, subtitle, abstract, content, likes, `isInSwipper`, author,
  image, categories.
- **Author / Category / Tag / Keyword / Publication** — a name or title plus a
  `registrar` relation to User.
- **File** — name, type, size, and uploader.

Intentional legacy names to preserve when touching existing code:
`publicattion.ts` (filename typo), `ISNN` (not ISSN), `URL` (uppercase), and
`isInSwipper`. Keep backend schema changes in sync with the frontend
declarations.

## Backend Conventions

The backend is split into two Deno workspaces: `@paper/back` (`back/`) and
`@paper/lib` (`back/lib/`). `back/` imports `@paper/lib`, and `lib/` imports
`coreApp` from `@paper/back`. This circular import is intentional; models are
created through factory functions invoked from `back/mod.ts`.

- All external imports go through `back/deps.ts` (aliased as `deps`). Never
  import Lesan/Mongo/JWT/Redis symbols directly from a URL.
- Every act is a folder under `back/src/<domain>/<actName>/` containing
  `mod.ts` (registration), `<act>.fn.ts` (implementation), and `<act>.val.ts`
  (validator). Register the setup function in the domain's `mod.ts`.
- Validators define both `set` and `get`. Use `selectStruct("model", depth)`
  for `get`, reuse pure-field objects from `@paper/lib`, and omit fields the act
  must not accept. Validators are factory functions, not module constants.
- Act names are inconsistent across domains (`addTag` vs `add`, `getUsers` vs
  `gets`). Always check the existing domain before adding a new act; see the act
  table in `back/AGENTS.md`.
- Auth pipeline: `setTokens` verifies the raw `token` header, `setUser` loads
  the user by `_id`, and optional `grantAccess({ levels })` checks the role.
  `Ghost` bypasses every level check. Public acts have no `preAct`.
- Structured auth failures use `throwAuthError(code)` and `AuthError`, with
  codes `AUTH_TOKEN_MISSING`, `AUTH_TOKEN_INVALID`, `AUTH_TOKEN_EXPIRED`,
  `AUTH_USER_ID_INVALID`, and `AUTH_USER_NOT_FOUND`. `back/src/authResponse.ts`
  hoists these into `{ success: false, body: { code, message } }`.
- Tokens are HS512, carry `kid` and `jti`, and expire after 30 days.
  `refreshToken` reissues a token for an authenticated user; `checkSession`
  returns `{ valid: false, code, message }` instead of throwing for bad tokens.
- Data access uses `insertOne`, `aggregation`, `findOne`, `findOneAndUpdate`,
  `deleteOne`, and relation methods. Keep `updatedAt` fresh. `deleteOne` is safe
  by default; pass `hardCascade: hardCascade || false` and delete children
  before parents.
- Deno style is configured in `back/deno.json`: tabs, 80 columns, 4-space
  indent, semicolons. Do not reformat unrelated legacy files.
- Use `throwError(message)` for user-facing failures. Auth and domain messages
  are often Persian; preserve the language of the existing flow.
- Do not add comments unless they carry information the code cannot express.

## Frontend Conventions

- All backend calls go through server actions in `web/src/app/actions/<domain>/`
  or the other action files there. Do not call the Lesan API directly from
  client components.
- `web/src/services/api.ts` exposes `paperApi()`, which wraps the generated
  `lesanApi` and uses `LESAN_URL`.
- Responses follow Lesan's `{ success, body }` shape. On success, the requested
  data is generally in `response.body` directly, not `response.body.data`.
  Plural `gets` operations may also return `metadata` for pagination.
- Use the generated types in `web/src/types/declarations/selectInp.ts` instead
  of hand-writing backend shapes. When act signatures or schemas change,
  regenerate `back/declarations/selectInp.ts` and sync the frontend copy.
  The frontend sends the JWT in the `token` header without a `Bearer` prefix.
- Authentication state is seeded on the server: `web/src/app/layout.tsx` calls
  `getMe` and passes the result into `AuthContext`. Do not treat the mere
  presence of a `token` cookie as a valid session. Logout goes through
  `clearSessionAction` so HttpOnly cookies are removed server-side.
- Components follow atomic design: `atoms`, `molecules`, `organisms`,
  `template`. Use PascalCase for components and camelCase for utilities.
  `SiteHeader` is the single site header; do not reintroduce `Header` or
  `Navbar`.
- The UI is Persian and RTL (`<html lang="fa" dir="rtl">`), with Jalali dates
  and Persian digit helpers in `web/src/utils/digits.ts`. Keep copy Persian
  unless the task says otherwise.
- Brand language: white backgrounds, teal (`#08A6AE`, gradient
  `#3DB4BA -> #00B5BE`), gold accents, rounded fields, and generous spacing.
  Reuse existing design tokens/components instead of inventing a new palette.
- `next.config.ts` allows images from `127.0.0.1`, `localhost`, and
  `194.5.192.166`.

## Verification and Testing

There is no automated test suite. Use these checks:

```bash
cd back && deno task check
cd web && npx tsc --noEmit
cd web && npm run lint
```

Manual end-to-end testing uses the Lesan playground and
`back/test/E2E.json`:

1. Start the backend with `deno task dev`.
2. Open `http://localhost:1382/playground`.
3. Run the collection entries or individual requests.

Do not run `back/test/E2E.json` with Deno directly. `next lint` currently has a
couple of pre-existing warnings; do not introduce new ones or treat the existing
ones as regressions. Never claim a change is verified without running the
relevant command and reporting the result.

## Known Gotchas

- `coreApp.runServer({ typeGeneration: true })` rewrites
  `back/declarations/selectInp.ts` on every boot. A watcher that includes the
  declarations directory can restart forever; `deno task dev` intentionally
  watches `src,lib,mod.ts,deps.ts` instead. If a watcher still loops, run
  `deno run -A mod.ts` from `back/` without `--watch`.
- Backend and frontend declaration files are copies. Update both when an act's
  request/response shape changes.
- Turbopack can serve stale modules after layouts/headers move. Restart the dev
  server when rendered markup does not match the source.
- Hydration mismatches have come from class-name joins that leave trailing
  spaces; use `.filter(Boolean).join(" ")`.
- The local shell may set `HTTP_PROXY`. Probe localhost with
  `curl --noproxy '*'`.
- If the web returns 500, check Redis and MongoDB first; the backend crashes
  with `ConnectionRefused` when either is down.
- `back/AGENTS.md` includes a list of known backend bugs and inconsistencies.
  Treat it as leads, not gospel, and verify against the current tree before
  relying on an entry.
- The working tree often contains large in-flight refactors and UI redesigns.
  Stage only files relevant to your task and never revert unrelated changes.

## Scratch Files and Artifacts

- `ignoreAssets/` holds local design reference images; do not treat it as
  application code.
- Put one-off scripts, migrations, and experiments in an untracked
  `ignore-scripts/` folder at the repository root (add it to `.gitignore` if you
  create it). Do not commit throwaway scripts.
- `uploads/`, database dumps (`dump.rdb`), `.env` files, `.next/`, `node_modules/`,
  and `tsconfig.tsbuildinfo` are runtime or generated artifacts. Do not commit
  them.
- `.workbuddy-ai/memory/` contains local session notes. Keep it local unless the
  user explicitly asks to commit it.

## Git and Commits

When the user says `git commit`, act as a careful commit assistant:

- Review the current diff and staged files before committing.
- Group changes into logical, atomic commits rather than one large commit.
- Use Gitmoji shortcodes plus Conventional Commits:
  `:gitmoji: type(scope): imperative description`.
  Examples: `:sparkles: feat(ui): add blog hero card`,
  `:bug: fix(auth): handle expired sessions`, `:recycle: refactor(blog): ...`.
- Keep the subject imperative, specific, and around 50 characters. Add a body
  when the why needs explanation. Mark breaking changes with `!`
  (`feat!: ...`) and reference issues when applicable.
- Mention specific packages for dependency updates and explain config or
  documentation changes.
- Execute the necessary `git add` and `git commit` commands directly; do not ask
  for confirmation. Only create new commits on the current branch. Do not
  rebase, squash, amend, or change unrelated history.
- Never commit secrets, `.env` files, private keys, uploads, dumps, or generated
  caches.

**Warning:** Never run `git reset` in this repository. It can permanently erase
work that took days to produce. Remove specific files from the index with
`git restore --staged <file>` or `git rm --cached <file>` instead.

## Key Configuration Files

- `back/deno.json` — Deno tasks, imports, formatting, and workspace setup.
- `back/mod.ts` — DB/Redis connections, model instantiation, server config.
- `back/deps.ts` — all external backend imports.
- `back/lib/deno.json` — `@paper/lib` workspace package.
- `back/declarations/selectInp.ts` — generated backend declarations.
- `back/test/E2E.json` — manual playground test collection.
- `web/package.json` — frontend scripts and dependencies.
- `web/next.config.ts` — Next.js image domains.
- `web/tsconfig.json` — TypeScript config and path aliases.
- `web/.env.example` — required frontend environment variables.
- `web/src/services/api.ts` — Lesan API client setup.
- `web/src/types/declarations/selectInp.ts` — frontend declaration copy.
- `.gitignore` — ignores runtime uploads, dumps, node_modules, and `.DS_Store`.
