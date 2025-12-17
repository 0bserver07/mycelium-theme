---
title: Getting Started
description: How to set up and use Mycelium for your digital garden
category: basics
order: 1
---

# Getting Started with Mycelium

Welcome to Mycelium! This guide will help you set up your digital garden.

## Installation

```bash
# Clone the repository
git clone https://github.com/example/mycelium-theme

# Install dependencies
npm install

# Start development server
npm run dev
```

## Configuration

Edit `src/config.ts` to customize your garden:

```typescript
export const siteConfig = {
  name: 'My Digital Garden',
  gardener: 'Your Name',
  description: 'Your garden description',
  // ... more options
};
```

## Writing Content

Create markdown files in `src/content/posts/` with this frontmatter:

```yaml
---
title: My First Note
growth: seedling
planted: 2025-12-16
tags: [topic]
---
```
