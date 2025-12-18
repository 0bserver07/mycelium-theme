---
title: Configuration Guide
description: Complete guide to configuring your Mycelium garden
category: basics
order: 3
---

# Configuration Guide

Mycelium is configured through `src/config.ts`. This guide covers all options.

## Site Identity

```typescript
{
  site: 'https://your-domain.com',
  name: 'Your Garden Name',
  gardener: 'Your Name',
  description: 'A digital garden of ideas',
  language: 'en',
}
```

## Navigation

Configure your menu items:

```typescript
navigation: {
  items: [
    { title: 'Garden', url: '/posts/' },
    { title: 'Projects', url: '/projects/' },
    { title: 'Docs', url: '/docs/' },
    { title: 'About', url: '/about/' },
  ],
  showSocialLinks: true,
  social: [
    { title: 'GitHub', url: 'https://github.com/you', icon: 'github' },
  ],
}
```

## Features

Toggle features on/off:

```typescript
features: {
  darkMode: true,        // Dark mode toggle
  search: true,          // Command palette search
  commandPalette: true,  // Ctrl+K command palette
  graphView: true,       // Global graph view
  localGraph: true,      // Per-post connection graph
  backlinks: true,       // Linked mentions section
  tableOfContents: true, // Auto-generated TOC
  comments: false,       // Giscus comments
  rss: true,            // RSS feed
}
```

## Garden Settings

Configure digital garden specific options:

```typescript
garden: {
  showGrowthStatus: true,    // Show seedling/budding/evergreen
  defaultStatus: 'seedling', // Default for new posts
  showPlantedDate: true,     // Show "planted" date
  showLastTended: true,      // Show "last tended" date
}
```

## Post Settings

```typescript
posts: {
  postsPerPage: 10,      // Posts per page (pagination)
  showReadingTime: true, // Estimated reading time
  showWordCount: false,  // Word count display
  showTags: true,        // Tag display
}
```

## Comments (Giscus)

To enable comments:

1. Set up [Giscus](https://giscus.app)
2. Add configuration:

```typescript
comments: {
  provider: 'giscus',
  repo: 'username/repo',
  repoId: 'R_xxxxx',
  category: 'Comments',
  categoryId: 'DIC_xxxxx',
}
```

## Environment Variables

For sensitive values, use environment variables:

```bash
# .env
PUBLIC_SITE_URL=https://your-domain.com
```

Access in config:

```typescript
site: import.meta.env.PUBLIC_SITE_URL || 'https://example.com',
```
