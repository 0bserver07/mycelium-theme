# Drafts

In-progress writing that is **not ready to publish**. Files here are rendered at
full fidelity — exactly as a real post would look — but they **never ship to
production**.

## How it works

- Every `.md` / `.mdx` file in this folder is loaded as the `drafts` content
  collection (see `src/content.config.ts`).
- Run `npm run dev` and open **`/drafts-preview`** for an index, or
  **`/drafts-preview/<filename>`** to preview one draft through the real
  `PostLayout` (growth indicator, table of contents, callouts, wikilinks — the
  works).
- `src/pages/drafts-preview/[...slug].astro` returns `[]` from `getStaticPaths`
  when `import.meta.env.PROD` is true, so `npm run build` emits **nothing** for
  drafts: no HTML, no sitemap entry, no OG image. They stay local.

## Why a separate folder (not `draft: true` frontmatter)?

Drafts live **outside** `src/content/` (the Obsidian vault) on purpose:

- they don't clutter the vault, backlinks, graph, or search;
- the schema is permissive (safe defaults), so a half-written draft with a
  missing title or date won't break `astro build`;
- promoting a draft is a one-step `git mv drafts/my-post.md src/content/posts/`.

## Publishing a draft

```bash
git mv drafts/my-post.md src/content/posts/my-post.md
```

Then fill in the required frontmatter for a real post (`title`, `planted`) and
commit.

## Relocating this folder

Drafts default to `./drafts`. To point somewhere else (e.g. a private notes
folder), change the single `DRAFTS_DIR` constant in `src/content.config.ts`.

## Keeping drafts private

This folder is tracked by default so the example is visible. If you'd rather keep
your drafts off GitHub entirely, add `drafts/` to `.gitignore` (the preview route
still works locally either way).
