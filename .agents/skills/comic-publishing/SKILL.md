---
name: comic-publishing
description: Add or update an Arcane Casters comic episode in the website reader and its PR preview. Use for uploading an episode, opening a completed-episode PR, or fixing an episode missing from the comic list. Drawing-only and explicitly source-only work use comic-authoring instead.
---

# Comic Publishing

Deliver a readable episode: the target language's comic list links to its reader,
every selected page loads, and the PR preview contains that delivery. Source art
under `content/` alone is not a website episode.

## Scope and selected art

- Follow the repository [PR workflow](../../docs/workflow.md). Reuse the task's
  issue, branch and open PR when continuing the same episode.
- An instruction to add/upload an episode or open a completed-episode PR includes
  reader integration in the branch preview unless the user explicitly requests
  source-only delivery. This does not by itself authorize merging, production
  deployment or posting to social accounts. Do not request the same authorization
  again because an internal document still calls the artwork a draft.
- For new or changed story/art, use [comic-authoring](../comic-authoring/SKILL.md).
  Inspect the episode's `PLAN.md`, `selected-pages.json` and actual selected images.
  Use the explicit `src` for each numbered page, never the newest-looking folder.
  Confirm the whole episode is present and review lettering, identity, movement
  and geography. Resolve observable errors before exporting.
- Only selected episode pages and covers belong in `public/`. Keep original PNGs,
  rejected alternatives, prompts, maps, character sheets and author spoilers in
  `content/arcane-casters/story/`.

## Export the delivery

Run from the website root with a Python interpreter that has Pillow:

```bash
python scripts/export-comic-episode.py 5
python scripts/export-comic-episode.py 5 --check
```

The exporter reads `content/arcane-casters/story/episodes/005/selected-pages.json`,
copies its Korean pages losslessly to
`public/arcane-casters/comic/005/ko/page-01.webp` and following numbers, and crops
the first page's top region to the shared `cover.webp` (1024×538). Inspect the
cover; use a suitable selected-art crop if its subject or lettering is cut badly.
It records source and asset hashes in the author-facing `publication-ko.json`.
`--check` verifies that the delivery still matches the selected original pixels.
Commit the delivery and its provenance together.

For another language, first obtain and inspect actual translated page images.
Use an explicit localized selection manifest with `locale: en` and its own `src`
paths, then export with `--locale en --manifest <localized-manifest.json>`.
The existing older episode exporters may own their lettering workflow; inspect
them before updating an older episode. Do not copy Korean art into an English
directory or claim English publication because translated metadata exists.

## Register the episode

The current reader uses these files; inspect their present shape before editing:

- `src/content/comic-episodes.json`: numeric-string `id`, zero-padded `directory`,
  page JSON filename, localized title/description/cover alt, and `locales` listing
  only editions whose actual images are ready. Korean-only publication is valid.
- `src/content/comic-pages-NNN.json`: ordered page numbers, reader-facing titles,
  descriptions and exact dialogue. Do not copy technical generation prompts or
  private lore into descriptions. Preserve the current localized copy shape.
- `src/content/comic.ts`: page files are discovered through `comic-pages*.json`;
  metadata and the file must agree. Optional earlier-scene references live here.
  Add a reference only where the story needs it, not as a recap for every episode.
- `vercel.json`: add the episode's default-locale redirect and rewrites for
  published static locale routes before the existing SPA catch-all.
- `scripts/build-comic-pages.mjs`: validates registered page sequences, localized
  copy, WebP pages and cover, and generates static metadata/noscript pages only
  for published editions. Keep list, reader navigation and static language links
  consistent with `locales`.

The list is `/arcane-casters/comic/ko`; episode 5 is
`/arcane-casters/comic/5/ko`; its assets use `/comic/005/ko/`.
Do not confuse reader IDs with padded asset directories. An unavailable edition
must show the current unavailable-language UI, with a link to an available
edition, and must not request missing page images.

## Verify the complete path

Run the export check, `npm run build`, `npm run lint`, and the repository's
[homepage verification](../verify-homepage/SKILL.md) (`npx playwright test` is the
native Windows equivalent of its Bash wrapper). Extend the relevant comic tests
to cover the new visible episode and language availability. Do not merely update
the expected list count without checking actual reader images.

Verify in a browser at desktop and a narrow phone width:

- List card and thumbnail → correct episode/locale route → full body page count.
- Every delivered image returns WebP bytes and decodes at the intended size;
  check actual loading through the final page, not just `<img>` elements or 200
  responses from the SPA fallback.
- Previous/next episode links, list return, reload/resume, completion state,
  supported language switching and unavailable-language behavior.
- Canonical/share URL and generated metadata name this episode and locale.
  No horizontal overflow or broken images. Inspect the screenshots.

Before pushing, inspect the staged scope and run `git diff --cached --check`.
After pushing to the existing PR, wait for the deployment tied to the pushed
commit and open its actual preview list and reader URLs. Verify the new cards and
page decoding there too. If deployment fails or is inaccessible, report that
specific state separately from successful local checks; do not call the episode
visible based only on source files, a push, or an older deployment. Use bounded
deployment checks and preserve repository protections rather than creating a
different project or deploying production as a workaround.

For the preview browser check, set `PLAYWRIGHT_BASE_URL` to its HTTPS origin and run `npx playwright test tests/comic-publishing.spec.ts --workers=2`. This skips the local server. Keep the scoped cases in sync with the newly published episode.

Return the PR, preview list and episode links, page/language coverage and checks
actually completed. Distinguish source storage, visible PR preview and production
publication in the completion message.
