# Changelog

## Unreleased

### Fixed

- **Ctrl+K search never opened.** `CommandPalette.astro` used a `define:vars`
  script, which Astro inlines without compiling or bundling. Its TypeScript
  cast was a syntax error in the browser ("Unexpected identifier 'as'"), and
  `import('fuse.js')` could not resolve a bare module name there either. The
  index now ships in a `<script type="application/json">` tag and the palette
  script is bundled, so it compiles and imports Fuse normally.

## 2.0.0 (2026-07-20)

Major dependency modernization plus a new draft preview system.

### Breaking

- **Requires Node 22.12+** (previously Node 18+) — Astro 7's minimum.
- **Astro 5 → 7.** The default compiler is now Rust-based and stricter: HTML
  comments (`<!-- -->`) are no longer allowed inside `{JSX expressions}`. The
  `markdown.remarkPlugins` / `rehypePlugins` config surface is deprecated in
  favor of the new Sätteri processor. The theme's remark/rehype pipeline
  (wikilinks, callouts, mermaid, galleries, sidenotes, dropcaps) still runs via
  the compatibility path with identical output — a warning today, but it will
  need migrating before Astro 8.
- **Tailwind CSS 3 → 4.** The deprecated `@astrojs/tailwind` integration is
  replaced by the `@tailwindcss/vite` plugin. `global.css` now uses
  `@import "tailwindcss"` and loads the existing `tailwind.config.mjs` via
  `@config`, so the 7-theme runtime color system, class-based dark mode, and the
  typography plugin all carry over unchanged.

### Added

- **Draft preview system.** A top-level `drafts/` folder, kept outside the
  Obsidian vault, is rendered at full `PostLayout` fidelity at `/drafts-preview`
  during `npm run dev` and emits **nothing** in a production build (no HTML,
  sitemap entry, or OG image). Relocate it via `DRAFTS_DIR` in
  `src/content.config.ts`. See `drafts/README.md`.
- `.nvmrc` and a `package.json` `engines` field pinning Node 22.

### Changed

- Bumped `@astrojs/mdx` 4 → 7, plus `@astrojs/rss`, `@astrojs/sitemap`,
  `@fontsource/*`, `fuse.js`, and `@tailwindcss/typography` to current releases.
- `sharp` 0.34 → 0.35 — 0.34 has no prebuilt binary for Node 24, so the 1.0.0
  release could no longer be installed on current Node.
- Removed the unused `lucide-react` dependency.
- CI and the README GitHub Pages deploy workflow now run on Node 22.

### Fixed

- Callout color variants (`callout-note`/`-tip`/`-warning`/`-danger`/`-info`)
  were tree-shaken out of the Tailwind 4 build because they are applied
  dynamically by the remark plugin; moved the callout rules into
  `@layer components` so they always ship.

## 1.0.0 (2026-02-08)

First open-source release.

### What's included

- Astro 5 static site with Tailwind CSS
- Obsidian vault integration (open `src/content/` as vault)
- 9 custom Obsidian plugins (climate, focus, garden, spore, trace, signal, label, prune, network)
- 8 pre-configured community plugins (obsidian-git, homepage, paste-image-rename, unsplash, BRAT, settings-search, tag-wrangler, folder-notes)
- 7 color themes (sage, ocean, sunset, minimal, nord, rose, forest)
- Wikilink support with anchors and backlinks
- D3.js graph visualization
- Command palette (Ctrl+K)
- Growth indicators (seedling/budding/evergreen) calculated from backlinks
- Callout blocks matching Obsidian syntax
- Dark/light mode
- OG image generation
- RSS feed and sitemap
- `npm run setup` interactive configuration
- `npm run update-theme` for upstream merges
- Deploy guides for Netlify, Vercel, GitHub Pages

### History

This project grew out of months of iteration on a personal digital garden. Earlier commits cover the full arc from initial Astro scaffold through Obsidian integration, plugin development, and theme refinement. See `git log` for the full story.
