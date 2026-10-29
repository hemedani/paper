# Add landing highlights act (popular keywords/tags + stats)

## Context

The public landing page (`web/src/app/(common)/page.tsx`) renders the Hero
section from `web/src/components/organisms/Hero.tsx`. The old hardcoded
"trending searches" block has already been replaced in the frontend with two
real data groups and three live counters:

- «محبوب‌ترین کلمات کلیدی» — most used keywords across articles
- «محبوب‌ترین برچسب‌ها» — most used tags across articles
- stats: total keywords, total tags, total articles

The frontend is already wired, but the backend act does not exist yet, so the
groups and counters stay empty/dashed. This prompt describes the backend act
that must be added.

## Contract the frontend already expects

Request must use `service: "main"`, `model: "article"`,
`act: "getLandingHighlights"`.

```json
{
  "service": "main",
  "model": "article",
  "act": "getLandingHighlights",
  "details": {
    "set": { "limit": 8 },
    "get": {}
  }
}
```

Expected success body:

```json
{
  "keywords": [
    { "_id": "…", "name": "خانه", "articleCount": 87 }
  ],
  "tags": [
    { "_id": "…", "name": "معماری", "articleCount": 139 }
  ],
  "stats": {
    "keywords": 9137,
    "tags": 7322,
    "articles": 2603
  }
}
```

- `keywords` / `tags` sorted by `articleCount` descending, then `name` ascending.
- `limit` defaults to `8`; clamp it to `1..20`.
- The act is **public**: no `preAct`, no `setTokens`, no `setUser`, no
  `grantAccess`. Do not reuse `countKeywords`/`countTags` because those acts are
  Manager-only.
- Do **not** change existing acts or their permissions.

## Why this shape

Articles embed the related documents, so popularity can be computed without
lookups:

```js
// article document (abridged)
{
  tags: [{ _id: ObjectId(...), name: "معماری", ... }],
  keywords: [{ _id: ObjectId(...), name: "خانه", ... }]
}
```

Pipelines below were verified against the local `paper` database; the current
top results are `معماری` (139 articles) for tags and `خانه` (87) for keywords.

## Files to add

```text
back/src/article/getLandingHighlights/
├── mod.ts
├── getLandingHighlights.fn.ts
└── getLandingHighlights.val.ts
```

Register the setup in `back/src/article/mod.ts`:

```ts
import { getLandingHighlightsSetup } from "./getLandingHighlights/mod.ts";

export const articleSetup = () => {
	// …existing setups
	getLandingHighlightsSetup();
};
```

## `mod.ts`

```ts
import { coreApp } from "../../../mod.ts";
import { getLandingHighlightsFn } from "./getLandingHighlights.fn.ts";
import { getLandingHighlightsValidator } from "./getLandingHighlights.val.ts";

export const getLandingHighlightsSetup = () =>
	coreApp.acts.setAct({
		schema: "article",
		actName: "getLandingHighlights",
		validator: getLandingHighlightsValidator(),
		fn: getLandingHighlightsFn,
	});
```

## `getLandingHighlights.val.ts`

`selectStruct` cannot express the computed `articleCount`, so define `get`
manually. Keep the Deno style used by the rest of the repo (tabs, semicolons).

```ts
import { array, number, object, optional, string } from "deps";

const termValidator = () =>
	object({
		_id: optional(string()),
		name: optional(string()),
		articleCount: optional(number()),
	});

export const getLandingHighlightsValidator = () => {
	return object({
		set: object({
			limit: optional(number()),
		}),
		get: object({
			keywords: optional(array(termValidator())),
			tags: optional(array(termValidator())),
			stats: optional(
				object({
					keywords: optional(number()),
					tags: optional(number()),
					articles: optional(number()),
				}),
			),
		}),
	});
};
```

## `getLandingHighlights.fn.ts`

Run the two popularity pipelines and the three counts in parallel. Skip
articles that have no relations before unwinding.

```ts
import { type ActFn } from "deps";
import { article, keyword, tag } from "../../../mod.ts";

const DEFAULT_LIMIT = 8;
const MAX_LIMIT = 20;

const buildPopularPipeline = (field: "keywords" | "tags", limit: number) => [
	{ $match: { [`${field}.0`]: { $exists: true } } },
	{ $unwind: `$${field}` },
	{
		$group: {
			_id: `$${field}._id`,
			name: { $first: `$${field}.name` },
			articleCount: { $sum: 1 },
		},
	},
	{ $match: { _id: { $ne: null }, name: { $nin: [null, ""] } } },
	{ $sort: { articleCount: -1, name: 1 } },
	{ $limit: limit },
];

export const getLandingHighlightsFn: ActFn = async (body) => {
	const { set: { limit } } = body.details;

	const safeLimit = Math.min(
		MAX_LIMIT,
		Math.max(1, Number(limit) || DEFAULT_LIMIT),
	);

	const [keywords, tags, keywordCount, tagCount, articleCount] = await Promise
		.all([
			article.aggregation({
				pipeline: buildPopularPipeline("keywords", safeLimit),
			}).toArray(),
			article.aggregation({
				pipeline: buildPopularPipeline("tags", safeLimit),
			}).toArray(),
			keyword.countDocument({ filter: {} }),
			tag.countDocument({ filter: {} }),
			article.countDocument({ filter: {} }),
		]);

	return {
		keywords,
		tags,
		stats: {
			keywords: keywordCount,
			tags: tagCount,
			articles: articleCount,
		},
	};
};
```

## Declarations

`coreApp.runServer({ typeGeneration: true })` rewrites
`back/declarations/selectInp.ts` on boot. After adding the act:

1. Start the backend once so the declaration file includes
   `main.article.getLandingHighlights`.
2. Diff it against `web/src/types/declarations/selectInp.ts`. A matching entry
   has already been added by hand to the frontend copy; the generated one must
   agree with this shape:

```ts
getLandingHighlights: {
  set: { limit?: number };
  get: {
    keywords?: { _id?: string; name?: string; articleCount?: number }[];
    tags?: { _id?: string; name?: string; articleCount?: number }[];
    stats?: { keywords?: number; tags?: number; articles?: number };
  };
};
```

If generation produces additional nested fields, update the frontend copy to
match; do not remove the manual entry before the backend boots.

## Verification

Run from `back/`:

```bash
deno task check
```

Then start the backend and call the act from `http://localhost:1382/playground`:

```graphql
query {
  main {
    article {
      getLandingHighlights(
        set: { limit: 8 }
        get: {}
      ) {
        keywords { _id name articleCount }
        tags { _id name articleCount }
        stats { keywords tags articles }
      }
    }
  }
}
```

Acceptance criteria:

- The call succeeds without a token.
- `keywords` contains the most used keywords first (e.g. `خانه`).
- `tags` contains the most used tags first (e.g. `معماری`).
- No empty names and no `null` ids in either list.
- `stats.articles` matches `article.countDocuments()`.
- `stats.keywords` / `stats.tags` match `keyword.countDocuments()` /
  `tag.countDocuments()`.
- `limit: 1` returns one item per list; `limit: 100` is clamped to 20; omitting
  `limit` uses 8.

After the backend is live, reload `http://localhost:3000/`; the two groups and
the three counters in the Hero should populate automatically. No further
frontend change is required.
