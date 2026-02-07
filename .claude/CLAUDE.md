# Mycelium Theme - Project Context

This is a digital garden publishing system built with Astro + Obsidian.

## Architecture

- `src/components/` - Astro components (theme UI)
- `src/layouts/` - Page layouts (BaseLayout, PostLayout)
- `src/pages/` - Route definitions
- `src/styles/` - Global CSS (Tailwind)
- `src/themes/` - Color theme definitions (sage, ocean, sunset, etc.)
- `src/utils/` - Remark/Rehype plugins for markdown processing
- `src/content/` - Obsidian vault (posts, pages, projects, docs)
- `src/content/.obsidian/` - Obsidian plugins and settings
- `src/config.ts` - Site configuration (edit this to customize)
- `scripts/` - Setup, OG image generation, theme update

## Key Patterns

- Theme files (components, layouts, pages, styles) are upstream-controlled
- User content (posts, pages, projects) lives in `src/content/`
- `src/content/` is opened as an Obsidian vault (not the repo root)
- Wikilinks `[[like this]]` are converted by `remark-wikilinks.ts`
- Growth status (seedling/budding/evergreen) auto-calculates from backlinks
- OG images are generated from `src/config.ts` site branding

## Commands

- `npm run dev` - Dev server at localhost:4321
- `npm run build` - Production build to `dist/`
- `npm run setup` - Interactive site configuration
- `npm run generate-og` - Generate OG images for posts
- `npm run update-theme` - Pull upstream theme updates

## Personal Files

Place personal notes (writing guides, style references) in `.claude/` with
a `.local.md` extension to keep them gitignored. Example:
- `.claude/writing-style-guide.local.md`
- `.claude/content-ideas.local.md`
