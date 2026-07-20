---
title: "Example Draft — Delete Me"
description: "How the draft preview works, previewed as a draft."
growth: seedling
planted: 2026-01-01
tags: [meta, drafts]
confidence: high
importance: 2
---

This file lives in `drafts/`, so it renders here at full fidelity but **never
ships to production**. Open it at `/drafts-preview/example-draft` while running
`npm run dev`.

## What you're looking at

The same `PostLayout` that renders published posts — growth indicator, tags,
table of contents, and every markdown feature the theme supports:

> [!note] Callouts work
> Wikilinks, math, code blocks, and callouts all render exactly as they will
> once the post is published.

Some inline `code`, a wikilink to [[example-draft]], and a code block:

```ts
// getStaticPaths() returns [] in production, so this page is dev-only.
if (import.meta.env.PROD) return [];
```

## When it's ready

Promote it into the garden:

```bash
git mv drafts/example-draft.md src/content/posts/my-real-post.md
```

Then delete this example. See `drafts/README.md` for the full workflow.
