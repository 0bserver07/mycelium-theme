# Mycelium

> A digital garden publishing system built with Astro and Obsidian

Mycelium is named after the underground fungal network that connects trees in a forest. Your notes work the same way - connected beneath the surface, supporting each other.

## Quick Start

```bash
git clone https://github.com/0bserver07/mycelium-theme my-garden
cd my-garden
npm install
npm run setup    # Configure your site name, URL, git remote
npm run dev      # Start dev server
```

**Obsidian vault:** Open `src/content/` in Obsidian (not repo root!)

After opening in Obsidian:
1. Settings → Community plugins → Turn off Restricted mode
2. Plugins auto-enable

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
| `npm run setup` | Configure site name, URL, socials |
| `npm run dev` | Development server (localhost:4321) |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview production build |
| `npm run update-theme` | Pull latest theme updates from upstream |

## Recommended Workflow

1. **Write** in Obsidian (`src/content/`)
2. **Preview** with `npm run dev`
3. **Commit** with obsidian-git or terminal
4. **Deploy** to Netlify/Vercel/etc.

## Receiving Theme Updates

Your garden can receive updates from the upstream theme without losing your content:

```bash
npm run update-theme
```

That's it. The script automatically:
1. Adds the upstream remote (first time only)
2. Stashes your local changes
3. Fetches and merges theme updates
4. Restores your changes

### Manual Workflow (if you prefer)
```bash
git remote add upstream https://github.com/0bserver07/mycelium-theme.git  # first time
git stash push -u                    # Stash your changes (including untracked)
git fetch upstream                   # Get latest theme updates
git merge upstream/master            # Merge theme updates
git stash pop                        # Restore your content
```

### Why This Works

The repo separates **theme files** from **user content**:

| Type | Files | Who Modifies |
|------|-------|--------------|
| **Theme** | `src/components/`, `src/layouts/`, `src/pages/`, `src/styles/` | Upstream only |
| **User Content** | `src/content/posts/`, `src/content/pages/`, `src/content/projects/` | You only |
| **User Config** | `src/config.ts` | You only |
| **Shared** | `src/content/.obsidian/` | Both (plugins update upstream) |

Theme updates merge cleanly because you don't edit theme files. Content conflicts are rare because upstream doesn't touch your posts.

## Draft Content

Content with `draft: true` in frontmatter:
- **Dev mode** (`npm run dev`): Visible - so you can preview while writing
- **Production** (`npm run build`): Hidden - won't be published

Sample posts ship as drafts. Create your own content and set `draft: false` to publish.

## .gitignore

Add to your `.gitignore`:
```
# Obsidian workspace (device-specific)
**/.obsidian/workspace.json
**/.obsidian/workspace-mobile.json
```

## Troubleshooting

### "No plugins found" in Obsidian
You opened the repo root. Close Obsidian, then open `src/content/` specifically.

### Tags/pages return 404 in dev
Check that your posts have `draft: false` or that you're testing with dev server (drafts visible in dev mode only).

### BRAT keeps downloading old plugins
Clear `src/content/.obsidian/plugins/obsidian42-brat/data.json` - set `pluginList` and `themesList` to empty arrays.

### Merge conflicts on update
If you accidentally edited theme files, use:
```bash
git checkout --theirs src/components/  # Accept upstream theme changes
git add .
git commit -m "Resolve merge conflicts, accept upstream theme"
```

## Built With

- [Astro](https://astro.build) - Static site generator
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [D3.js](https://d3js.org) - Graph visualization
- [Obsidian](https://obsidian.md) - Content authoring

## License

MIT License
