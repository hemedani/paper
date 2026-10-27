# Paper Backend - Deno + Lesan Application

## Project Overview

This is the backend for a Persian-language research paper and publication
management system. It manages academic articles, blog posts, authors,
publications, categories, tags, keywords, uploaded files, and users. The web
frontend lives in the sibling `web/` directory and talks to this backend through
the Lesan client using the standard `{ service, model, act, details: { set, get } }`
request shape.

### Architecture

- **Runtime**: Deno
- **Framework**: Lesan (v0.1.22), MongoDB ODM with automatic API generation
- **Database**: MongoDB (`paper` database, `127.0.0.1:27017`)
- **Cache / OTP store**: Redis (`127.0.0.1:6379`)
- **Authentication**: JWT (djwt, HS512) sent in the `token` request header
- **File storage**: Local `uploads/` directory served statically at `/uploads`
- **API**: Lesan playground and generated type declarations

The repository is split into two Deno workspaces:

- `back/` — the application (`mod.ts`, `src/`, `test/`, `declarations/`)
- `lib/` — shared package `@paper/lib` (models, context, utilities)

`back/` imports `@paper/lib`; `lib/` imports `coreApp` from `@paper/back`.
This circular import is intentional and works because models are only created
through factory functions invoked from `back/mod.ts`.

## Key Technologies

- **Backend runtime**: Deno
- **Framework**: Lesan (`https://deno.land/x/lesan@v0.1.22`)
- **Database**: MongoDB
- **JWT**: `djwt` (`https://deno.land/x/djwt@v2.8`)
- **Redis client**: `https://deno.land/x/redis`
- **CSV import**: `jsr:@std/csv`
- **Module resolution**: `deps.ts` is aliased as `deps` in `deno.json`; all
  framework imports come through `deps`, never directly from a URL.
- **Node modules**: `nodeModulesDir: "auto"`

## Project Structure

```
back/
├── deno.json               # Deno config (tasks, fmt, imports, workspace)
├── deno.lock
├── deps.ts                 # Single place for external imports
├── mod.ts                  # App bootstrap: DB, Redis, models, acts, server
├── declarations/           # Generated select/type declarations
│   └── selectInp.ts
├── db.csv                  # Seed CSV consumed by user.insertCSV
├── prompts/                # Task/design prompts (not code)
├── test/
│   └── E2E.json            # Manual E2E collection for the Lesan playground
├── uploads/
│   ├── images/
│   ├── docs/
│   └── videos/             # created on demand by uploadFile
├── lib/                    # @paper/lib — models, context, utilities
│   ├── deno.json
│   ├── mod.ts
│   ├── interfaces/
│   │   ├── context.ts      # MyContext (LesanContenxt + user)
│   │   └── mod.ts
│   ├── models/             # one file per model
│   │   ├── article.ts
│   │   ├── author.ts
│   │   ├── blog.ts
│   │   ├── category.ts
│   │   ├── file.ts
│   │   ├── keyword.ts
│   │   ├── publicattion.ts # note the historical filename typo
│   │   ├── tag.ts
│   │   ├── user.ts
│   │   └── mod.ts
│   └── utils/
│       ├── createUpdateAt.ts
│       ├── filters.ts
│       ├── grantAccess.ts
│       ├── isValidNationalNumber.ts
│       ├── numToEN.ts
│       ├── setToken.ts
│       ├── setUser.ts
│       └── throwError.ts
└── src/
    ├── mod.ts              # functionsSetup(): registers every domain
    ├── article/            # addArticle, getArticle(s), update..., remove, count
    ├── author/
    ├── blog/
    ├── category/
    ├── file/
    ├── keyword/
    ├── publication/
    ├── tag/
    └── user/
```

Each domain folder contains one subfolder per act, and its own `mod.ts` that
calls every act's setup function. `src/mod.ts` calls all domain setup functions
once at boot.

## Data Models

Models are defined in `lib/models/`, created by factory functions, and
instantiated exactly once in `back/mod.ts`:

```typescript
export const article = articles();
export const blog = blogs();
export const user = users();
// ...
```

The exported model variable is singular (`article`) even though the factory is
plural (`articles()`). Follow this pattern for new models.

All models share `createUpdateAt`:

```typescript
createdAt: optional(defaulted(date(), () => new Date())),
updatedAt: optional(defaulted(date(), () => new Date())),
```

### User

Pure fields: `first_name`, `last_name`, `father_name`, `mobile`, `gender`
(`Male|Female`), `birth_date`, `summery`, `personnel_number`,
`national_number` (Iranian national code, custom `refine` validation),
`address`, `level`, `isVerified` (default `false`), timestamps.

Relations:

- `avatar` → File (optional)
- `nationalCard` → File (optional)
- `favArticles` → Article (multiple) → reverse `favByUsers`
- `favBlogs` → Blog (multiple) → reverse `favByUsers`

Unique index on `national_number`.

User levels: `Ghost`, `Manager`, `Editor`, `Normal`. `Ghost` bypasses
`grantAccess` checks.

### Article

Pure fields: `key`, `articleType` (`journalArticle|book`),
`publicationYear` (1250–1500), `title`, `abstract`, `ISBN`, `ISNN`, `DOI`,
`URL` (required), `page`, `issue`, `volume`, timestamps.

Relations: `registrar` → User (reverse `registerArticles`), `avatar` → File,
`doc` → File, `publication` → Publication (reverse `articles`),
`authors` → Author (multiple), `tags` → Tag (multiple),
`keywords` → Keyword (multiple). Text index on `title` and `abstract`.

`ISNN` (rather than `ISSN`) is the established field name; keep it consistent.

### Blog

Pure fields: `title`, `subtitle`, `abstract`, `content`, `likes`,
`isInSwipper`, timestamps. Relations: `author` → User (reverse
`writtenBlogs`), `pic` → File, `categories` → Category (multiple, reverse
`blogs`). Text index on `title`, `subtitle`, `abstract`, `content`.

### Author, Category, Tag, Keyword, Publication

- **Author**: `first_name`, `last_name`; relation `registrar` → User.
- **Category**: `name`; relation `registrar` → User.
- **Tag**: `name`; relation `registrar` → User.
- **Keyword**: `name`; relation `registrar` → User.
- **Publication**: `title`; relation `registrar` → User (reverse
  `registeredPublications`).

### File

Pure fields: `name`, `type`, `size`; relation `uploader` → User (reverse
`uploadedAssets`).

## Act Naming

Act names are **not consistent across domains**. Always check the existing
domain before adding a new act.

| Model | Acts |
|-------|------|
| User | `addUser`, `updateUser`, `removeUser`, `getUser`, `getUsers`, `countUsers`, `getMe`, `login`, `loginReq`, `registerUser`, `tempUser`, `changeMobile`, `insertCSV`, `dashboardStatistic`, `toggleFavArticle`, `updateUserRelations` |
| Article | `addArticle`, `getArticle`, `getArticles`, `updateArticle`, `updateArticleRelations`, `removeArticle`, `countArticles` |
| Blog | `add`, `get`, `gets`, `update`, `updateRelation`, `remove`, `count`, `toggleFav` |
| Author | `add`, `get`, `gets`, `update`, `remove`, `count` |
| Category | `add`, `get`, `gets`, `update`, `remove`, `count` |
| Tag | `addTag`, `getTag`, `getTags`, `updateTag`, `removeTag`, `countTags` |
| Keyword | `addKeyword`, `getKeyword`, `getKeywords`, `updateKeyword`, `removeKeyword`, `countKeywords` |
| Publication | `addPublication`, `getPublication`, `getPublications`, `updatePublication`, `removePublication`, `countPublications` |
| File | `uploadFile`, `getFiles` |

Public acts (no `preAct`) include login/registration (`login`, `loginReq`,
`registerUser`, `tempUser`, `changeMobile`), most public reads (`getArticle`,
`getArticles`, `countArticles`, blog `get`/`gets`/`count`, author `get`/`gets`,
category `get`/`gets`/`count`, publication reads are auth-only, and
`getTag`/`getTags`, `getKeyword`/`getKeywords`). File acts (`uploadFile`,
`getFiles`) require authentication.

## Action Pattern

Every act is a folder with three files:

- `mod.ts` — registers the act with Lesan.
- `<act>.fn.ts` — implementation (`ActFn`).
- `<act>.val.ts` — validator.

```typescript
// src/tag/addTag/mod.ts
export const addTagSetup = () =>
	coreApp.acts.setAct({
		schema: "tag",
		fn: addTagFn,
		actName: "addTag",
		preAct: [setTokens, setUser, grantAccess({ levels: ["Manager"] })],
		validator: addTagValidator(),
		validationRunType: "create",
	});
```

```typescript
// src/tag/addTag/addTag.val.ts
export const addTagValidator = () => {
	return object({
		set: object(pureTag),
		get: selectStruct("tag", 1),
	});
};
```

```typescript
// src/tag/addTag/addTag.fn.ts
export const addTagFn: ActFn = async (body) => {
	const { set, get } = body.details;
	const { user }: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;

	return await tag.insertOne({
		doc: set,
		relations: {
			registrar: { _ids: user._id },
		},
		projection: get,
	});
};
```

Rules of thumb:

- Validators always define both `set` and `get`.
- Use `selectStruct("modelName", depth)` for `get`; depth 1 for a single level
  of relations, 2 when the frontend needs nested relations.
- Reuse pure-field objects from `@paper/lib` in validators. Omit fields that the
  act must not accept (for example `addUser` omits `isVerified`, `updateUser`
  omits `mobile`, `national_number`, and `isVerified`).
- Use `validationRunType: "create"` on insert-style acts.
- Validators are built by a function (`const xValidator = () => object({...})`),
  not a module-level constant.
- The setup function is exported as `<actName>Setup` (for example
  `addTagSetup`, `getTagsSetup`) and registered in the domain `mod.ts`.
- `preAct` vs `preValidation` are used interchangeably in this codebase; both run
  before the act. Existing files mostly use `preAct`.

## Authentication and Authorization

### Pipeline

1. `setTokens` (`lib/utils/setToken.ts`) reads the raw `token` header, verifies
   the JWT with HS512, and stores the payload as `context.user`.
2. `setUser` (`lib/utils/setUser.ts`) loads the user by `_id` from the token and
   replaces `context.user` with the full user document.
3. `grantAccess({ levels: [...] })` (`lib/utils/grantAccess.ts`) checks the
   user's `level`. `Ghost` always passes. A wrong level throws
   `"You cant do this"`.

The signing key is `TOKEN_KEY`, falling back to `"simpleSecretKey"` when unset.
Tokens carry `_id`, `national_number`, `mobile`, and a 90-day `exp`.

### Levels used in code

- `Ghost` — bootstrap user created by `tempUser`; bypasses every level check.
- `Manager` — full administrative access.
- `Editor` — content edit access (blogs, categories).
- `Normal` — regular authenticated user.

There is no role/scope system and no `activeRoleId` field in this project.

### OTP login flow

1. `user.loginReq` looks up the user by `national_number`, stores a 5-digit code
   in Redis under the national number with a 100-second TTL, and returns a
   masked mobile. In development (`ENV=development`) the code is always
   `11111`.
2. `user.login` verifies the code from Redis and returns `{ token, user }`.
3. The web stores `token` in a cookie and sends it as the `token` header.

`registerUser` and `changeMobile` reuse the same OTP generation behavior.

## Model and Relation Conventions

- Define pure fields in `<name>Pure`, `<name>PureFields`, or `pure<Name>` and
  export the relation map separately. There is no single naming convention;
  follow the file you are editing.
- Relations are one-directional. Define the relation on the model that owns the
  foreign key and put the reverse in `relatedRelations`. Never define the same
  relation on both sides.
- Single relations are embedded inline by Lesan; use them by default instead of
  storing raw IDs or denormalized names.
- `relatedRelations` that return multiple documents usually specify `limit: 50`
  and `sort: { field: "_id", order: "desc" }`.
- Use `type: "single" as RelationDataType` / `type: "multiple" as RelationDataType`
  and `order: "desc" as RelationSortOrderType` to satisfy TypeScript.
- `deleteOne` defaults to safe mode. Always pass `hardCascade: hardCascade || false`.
  Delete children before parents; do not rely on cascade deletion.
- Cascading deletion is explicit and dangerous. Only use `hardCascade: true`
  when the caller is certain the whole tree must go.

### Model template

```typescript
export const modelPureFields = {
	name: string(),
	...createUpdateAt,
};

export const modelRelations = {
	registrar: {
		schemaName: "user",
		optional: false,
		type: "single" as RelationDataType,
		relatedRelations: {
			modelItems: {
				type: "multiple" as RelationDataType,
				limit: 50,
				sort: { field: "_id", order: "desc" as RelationSortOrderType },
			},
		},
	},
};

export const models = () =>
	coreApp.odm.newModel("model", modelPureFields, modelRelations);
```

## Data Access Patterns

- **Create**: `model.insertOne({ doc, relations, projection })`. Always include
  `registrar`/`author`/`uploader` from `context.user._id` where the model has
  such a relation.
- **Read one**: `model.aggregation({ pipeline: [{ $match: { _id: new ObjectId(_id) } }], projection }).toArray()`.
  `findOne({ filters, projection })` is also used.
- **List/search**: build a `pipeline` array conditionally:
  - text search: `{ $match: { $text: { $search: search } } }`
  - relation filter: `{ $match: { "tags._id": { $in: ids.map((id) => new ObjectId(id)) } } }`
  - name filter: `{ $match: { name: { $regex: new RegExp(name, "i") } } }`
  - always `{ $sort: { _id: -1 } }`, `{ $skip: (page - 1) * limit }`,
    `{ $limit: limit }`
- **Count**: `model.countDocument({ filter })` and return `{ qty }`.
- **Update**: `model.findOneAndUpdate({ filter, update: { $set: { ...rest, updatedAt: new Date() } }, projection })`.
  Strip immutable fields such as `_id` and `createdAt` from the update payload.
- **Relations**: `model.addRelation({ filters, relations, projection, replace: true })`
  and `model.removeRelation({ filters, relations })`. When adding to a
  multiple relation, pass `relatedRelations: { reverseName: true }` so the
  reverse side stays in sync.
- **Favorites**: `toggleFav` / `toggleFavArticle` load the current user's
  relation list, then either add or remove the relation. `blog.toggleFav` also
  increments/decrements `likes`.

## Validator Conventions

Validators use Lesan's schema helpers imported from `deps`:
`object`, `string`, `number`, `boolean`, `array`, `optional`, `enums`, `size`,
`pattern`, `refine`, `coerce`, `date`, `defaulted`, `instance`,
`objectIdValidation`.

- `objectIdValidation` for Mongo IDs.
- `size(number(), min, max)` for bounded numbers.
- `enums([...])` for literal unions; export the enum array when the frontend or
  other acts need to reuse it (for example `articleTypeArray`, `userLevelArray`).
- `mobilePattern` and `isValidNationalNumberStruct` are exported from
  `@paper/lib`.
- `get` is usually `selectStruct("model", 1 | 2)`; count acts use
  `object({ qty: optional(enums([0, 1])) })`; remove acts use
  `object({ success: optional(enums([0, 1])) })`.
- Optional update fields use `optional(...)` even when the pure field is
  required.

## Type Generation

`coreApp.runServer({ typeGeneration: true, ... })` regenerates
`declarations/selectInp.ts` on server start. The web app consumes an equivalent
declaration file for type safety; keep backend schema changes in sync with the
web when act signatures change.

## Running

```bash
# from back/
deno task dev      # ENV=development, watch src/lib/mod.ts/deps.ts
deno task start    # production-style start
deno task check    # deno check mod.ts
```

Prerequisites:

- MongoDB running on `127.0.0.1:27017` (database `paper`)
- Redis running on `127.0.0.1:6379`
- Optional `TOKEN_KEY` (defaults to `simpleSecretKey`)
- `ENV=development` enables the fixed OTP `11111`

Server details:

- Port: `1382`
- Lesan endpoint: `POST /lesan`
- Playground: `/playground`
- Static files: `/uploads` → `./uploads`
- CORS origins: `localhost:1382`, `localhost:3000`, `localhost:4000`,
  `http://194.5.192.166:3000`

## Testing

There is no automated test runner in this repository. `test/E2E.json` is a
manual collection for the Lesan playground:

1. Start the server with `deno task dev`.
2. Open `/playground`.
3. Paste the JSON collection or execute entries one by one.

Do not try to run `test/E2E.json` with Deno directly. When a manual run fails,
fix field names, captures, act names, or missing `get` fields in the JSON and
report the change.

Use `deno task check` to verify TypeScript correctness. There is no configured
lint task; run `deno fmt` only on files you touch if formatting is required.

## Formatting and Style

- `deno.json` configures tabs, line width 80, indent width 4, semicolons, and
  preserved prose. Some legacy files use spaces; prefer the configured style for
  new code and avoid reformatting unrelated files.
- Use `throwError(message)` for user-facing failures. Auth and domain errors are
  frequently written in Persian; preserve the existing language of the flow.
- Reach shared code through `@paper/lib`; reach the app's models through
  `../../../mod.ts` (relative depth depends on the act's nesting).
- Never import Lesan/Mongo symbols directly from a URL; add/reuse them in
  `deps.ts`.
- Keep `updatedAt` fresh on every update.
- Do not add comments unless they carry information the code cannot.

## Known Bugs and Inconsistencies

These are real defects in the current tree. Do not copy them into new code; fix
them when touching the relevant act.

- `src/user/getUsers/getUsers.fn.ts` filters on `levels`, but the user schema
  field is `level` (singular).
- `src/user/addUser/mod.ts` (`checkGhostUser`) reads
  `body.details.set.levels`, but `addUser` accepts `level` (singular), so the
  Ghost-protection check is dead code.
- `src/author/count/count.fn.ts` counts **blogs** instead of authors.
- `src/blog/count/count.fn.ts` builds `filters["$match"] = { $text: ... }` and
  then passes it to `countDocument`, producing a malformed filter.
- `src/user/getUser/mod.ts` grants `Examiner`, which is not a user level, so that
  entry can never match; only Manager/Ghost pass.
- `src/user/register/registerUser.fn.ts` writes `level: "Driver"` (not in the
  enum) and `registration_step` (not in the schema).
- `src/article/updateArticle/mod.ts` has no `grantAccess`, so any authenticated
  user can update an article; only `setTokens` + `setUser` run.
- `lib/utils/grantAccess.ts` treats `isOwn: true` as an unconditional allow; the
  "own resource" check is not implemented.
- `lib/utils/setToken.ts` falls back to a hard-coded JWT secret when
  `TOKEN_KEY` is unset.
- `src/user/changeMobile/*` is public and changes the mobile number for a given
  national code after OTP; treat it as sensitive.
- Field-name inconsistencies that are intentional legacy: `ISNN` (not `ISSN`),
  `URL` (uppercase), `publicattion.ts` (filename typo), `isInSwipper`.
- `page` means the article page range in the Article model but means pagination
  in list validators. Read the validator, not the field name.

## Checklist For New Acts

1. Add a folder under `src/<domain>/<actName>/` with `mod.ts`, `.fn.ts`, `.val.ts`.
2. Reuse `<model>Pure`/`<model>Relations` and `createUpdateAt` from `@paper/lib`.
3. Decide the auth pipeline: public (no `preAct`), authenticated
   (`setTokens`, `setUser`), or authorized (add `grantAccess`).
4. Implement the act with `insertOne` / `aggregation` / `findOneAndUpdate` /
   `deleteOne` using the patterns above.
5. Register the setup function in `src/<domain>/mod.ts`.
6. Run `deno task check`.
7. If the web calls the act, update the web service/declarations as a separate
   change.
