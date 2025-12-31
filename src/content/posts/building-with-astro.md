---
draft: true
title: Building with Astro
description: Why Astro is the perfect choice for digital gardens and static sites.
growth: evergreen
planted: 2025-12-10
lastTended: 2025-12-16
tags: [astro, web-development, static-sites]
---
draft: true

# Building with Astro

Astro is a modern static site generator that's perfect for building digital gardens like this one.

## Why Astro?

> [!info]
> Astro ships zero JavaScript by default, making your garden incredibly fast.

### Key Features

1. **Content Collections** - Type-safe content with Zod schemas
2. **Component Islands** - Hydrate only what needs interactivity
3. **Markdown/MDX** - Write in familiar formats
4. **Remark/Rehype** - Powerful content processing

### Integration with Obsidian

Astro works beautifully with Obsidian. You can:

- Write in Obsidian using [[Digital Garden Philosophy|wikilinks]]
- Process those links with remark plugins
- Generate a static site automatically

> [!tip] Pro Tip
> Use the Obsidian Git plugin to sync your vault and trigger builds automatically.

## Code Example

```javascript
// astro.config.mjs
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkWikilinks],
    rehypePlugins: [rehypeSlug]
  }
});
```

## Related Notes

- [[Welcome to Mycelium]] - Getting started
- [[Digital Garden Philosophy]] - The philosophy behind gardens
