---
title: Getting Started Tutorial
description: A step-by-step guide to creating your first digital garden with Mycelium
growth: evergreen
planted: 2025-12-09
lastTended: 2025-12-16
tags: [tutorial, beginner, getting-started]
draft: false
---

# Getting Started Tutorial

Welcome! This tutorial will walk you through creating your first digital garden with Mycelium.

## Prerequisites

You'll need:
- Node.js 18+
- A text editor (VS Code recommended)
- Git (optional but recommended)

## Step 1: Clone the Theme

```bash
git clone https://github.com/0bserver07/mycelium-theme
cd mycelium-theme
npm install
```

## Step 2: Start Development

```bash
npm run dev
```

Open http://localhost:4321 to see your garden.

## Step 3: Configure Your Garden

Edit `src/config.ts`:

```typescript
export const siteConfig = {
  name: 'My Digital Garden',
  gardener: 'Your Name',
  description: 'A place for my ideas to grow',
  // ... more options
};
```

## Step 4: Create Your First Note

Create `src/content/posts/my-first-note.md`:

```markdown
---
title: My First Note
description: The beginning of my digital garden
growth: seedling
planted: 2025-12-16
tags: [personal, learning]
draft: false
---

# My First Note

This is where my garden journey begins...
```

## Step 5: Connect Your Notes

Use wikilinks to connect ideas:

```markdown
This relates to [[my-first-note|my first thought]].
```

> [!tip] Don't overthink it
> Just start writing. Organization emerges naturally.

## Step 6: Add More Content

Create notes for:
- Ideas you're exploring
- Things you're learning
- Projects you're working on
- Quotes that resonate

## Step 7: Deploy

When ready, deploy to the web:

```bash
npm run build
```

See the [[deployment|deployment guide]] for hosting options.

## Next Steps

- Read [[growth-philosophy|the growth philosophy]]
- Learn [[using-wikilinks|wikilink syntax]]
- Explore [[callout-examples|callout styles]]
- Check the [[configuration|configuration guide]]

Happy gardening! 🌱
