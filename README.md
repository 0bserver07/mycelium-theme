# Mycelium

> A digital garden publishing system built with Astro and Obsidian

Mycelium is named after the underground fungal network that connects trees in a forest. Your notes work the same way - connected beneath the surface, supporting each other.

## Quick Start

```bash
# Clone for your new site
git clone https://github.com/0bserver07/mycelium-theme my-garden
cd my-garden

# Install dependencies
npm install

# Open src/content/ in Obsidian as your vault
# Start writing!

# Preview your site
npm run dev

# Build for production
npm run build
```

## How It Works

```
mycelium-theme/
├── src/content/           <- Open this as Obsidian vault
│   ├── .obsidian/         # Plugins & settings (pre-configured)
│   ├── posts/             # Blog posts
│   ├── pages/             # Static pages
│   ├── projects/          # Project showcases
│   └── docs/              # Documentation
└── ... (Astro files)
```

**One repo. Write in Obsidian. Build with Astro.**

## Included Plugins

### Mycelium Plugins (Custom)
| Plugin | Purpose |
|--------|---------|
| mycelium-climate | Theme customization & color schemes |
| mycelium-focus | Single-tab writing mode |
| mycelium-garden | Setup wizard & configuration |
| mycelium-spore | Content creation with templates |
| mycelium-trace | Preserve old filenames as aliases |
| mycelium-signal | SEO analysis panel |
| mycelium-label | Show title instead of filename |
| mycelium-prune | Hide/customize UI elements |
| mycelium-network | Card-based content view |

### Community Plugins
| Plugin | Purpose |
|--------|---------|
| obsidian-git | Version control & sync |
| homepage | Dashboard on startup |
| obsidian-paste-image-rename | SEO-friendly image names |
| insert-unsplash-image | Stock images |
| obsidian42-brat | Beta plugin manager |
| settings-search | Search settings |
| tag-wrangler | Tag management |
| folder-notes | Folder as notes |

## Features

### Astro Theme
- Obsidian wikilink `[[support]]` with anchors
- Callout blocks (`> [!note]`, `> [!tip]`, etc.)
- D3.js graph visualization
- Command palette (`Ctrl+K`)
- Backlinks / linked mentions
- Growth indicators (seedling/budding/evergreen)
- Dark/light mode
- RSS feed & sitemap

### Content Types
- **Posts**: Blog posts with tags
- **Pages**: Static pages
- **Projects**: Project showcases
- **Docs**: Documentation

## Writing Content

Create files in `src/content/posts/` (or use `mycelium-spore` plugin):

```yaml
---
title: My First Note
description: A brief description
growth: seedling
planted: 2025-12-16
lastTended: 2025-12-16
tags: [topic, subtopic]
draft: false
---

# Your Content

Use [[wikilinks]] to connect notes!

> [!tip] Pro Tip
> Callouts work like in Obsidian.
```

## Configuration

Edit `src/config.ts`:

```typescript
export const siteConfig = {
  site: 'https://your-site.com',
  name: 'My Digital Garden',
  gardener: 'Your Name',
  description: 'Your garden description',
  // ...
};
```

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Development server (localhost:4321) |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview production build |

## Recommended Workflow

1. **Write** in Obsidian (`src/content/`)
2. **Preview** with `npm run dev`
3. **Commit** with obsidian-git or terminal
4. **Deploy** to Netlify/Vercel/etc.

## .gitignore

Add to your `.gitignore`:
```
# Obsidian workspace (device-specific)
**/.obsidian/workspace.json
**/.obsidian/workspace-mobile.json
```

## Built With

- [Astro](https://astro.build) - Static site generator
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [D3.js](https://d3js.org) - Graph visualization
- [Obsidian](https://obsidian.md) - Content authoring

## License

MIT License
