# Keyword backfill report

**Status:** ✅ complete
**Started:** 2026-10-29T09:02:52.767Z
**Updated:** 2026-10-29T09:02:52.780Z

## Progress

| metric | value |
| --- | --- |
| articles in database | 2603 |
| articles processed | 2603 |
| remaining | 0 |
| completion | 100.0% |
| keyword documents created | 9137 |

## Resume

```bash
cd back
deno run -A scripts/keywords/run.ts --apply
```

Processed article ids live in `scripts/keywords/state/processed.jsonl` (one
line per finished article). The script skips any id already listed there, so
re-running after an interruption continues from the last checkpoint.

## Last batch

- **تحلیل مضامین نقوش دیواری بقعۀ روستای پینچاه (درگیلان) مطالعة تطبیقی دیوارنگارۀ حضرت قاسم (** — دیوارنگاره، روستای پینچاه، بقعة، متبرکه، دیوار‌نگاره، مضامین
