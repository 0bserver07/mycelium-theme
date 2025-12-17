# Mycelium

> A digital garden publishing system built with Astro and Obsidian

Mycelium is named after the underground fungal network that connects trees in a forest, allowing them to share nutrients and communicate. Your notes work the same way - connected beneath the surface, supporting each other.

## Features

### Core Features
- **Obsidian Integration**: Full wikilink `[[support]]` with custom display text and anchors
- **Callout Blocks**: Obsidian-style callouts (`> [!note]`, `> [!tip]`, etc.)
- **Graph Visualization**: D3.js powered local graph showing note connections
- **Command Palette**: Quick search and navigation with `Ctrl+K`
- **Backlinks**: Automatic linked mentions showing what notes link here
- **Growth Indicators**: Seedling, budding, and evergreen status for notes

### Content Features
- **Multiple Content Types**: Posts, pages, projects, and documentation
- **Tags**: Full tag system with filtering
- **Dark Mode**: Automatic theme detection with manual toggle
- **RSS Feed**: Auto-generated RSS at `/feed.xml`
- **Sitemap**: Auto-generated sitemap for SEO
- **Reading Time**: Automatic reading time calculation

### Design
- **Forest Theme**: Beautiful green color palette inspired by nature
- **Responsive**: Mobile-first design that works on all devices
- **Typography**: Clean, readable type with Tailwind Typography

## Quick Start

```bash
# Clone the repository
git clone https://github.com/example/mycelium-theme
cd mycelium-theme

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Configuration

Edit `src/config.ts` to customize your garden:

```typescript
export const siteConfig = {
  site: 'https://your-site.com',
  name: 'My Digital Garden',
  gardener: 'Your Name',
  description: 'Your garden description',

  // Features
  features: {
    darkMode: true,
    search: true,
    commandPalette: true,
    graphView: true,
    localGraph: true,
    backlinks: true,
    comments: false,
    rss: true,
  },

  // Garden settings
  garden: {
    showGrowthStatus: true,
    defaultStatus: 'seedling',
  },
};
```

## Writing Content

Create markdown files in `src/content/posts/` with this frontmatter:

```yaml
---
title: My First Note
description: A brief description
growth: seedling  # or budding, evergreen
planted: 2025-12-16
lastTended: 2025-12-16
tags: [topic, subtopic]
draft: false
---

# Your Content Here

Use [[wikilinks]] to connect notes!

> [!tip] Pro Tip
> Use callouts to highlight important information.
```

## Project Structure

```
mycelium-theme/
├── src/
│   ├── components/      # Astro components
│   ├── content/         # Your content
│   │   ├── posts/       # Blog posts
│   │   ├── pages/       # Static pages
│   │   ├── projects/    # Project showcases
│   │   └── docs/        # Documentation
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages
│   ├── styles/          # CSS styles
│   ├── utils/           # Utilities and plugins
│   ├── config.ts        # Site configuration
│   └── types.ts         # TypeScript types
├── public/              # Static assets
└── astro.config.mjs     # Astro configuration
```

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start development server at `localhost:4321` |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview build locally before deploying       |

## Built With

- [Astro](https://astro.build) - Static site generator
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [D3.js](https://d3js.org) - Graph visualization
- [Fuse.js](https://fusejs.io) - Fuzzy search

## License

MIT License
