---
title: Markdown Features Showcase
description: A complete demonstration of all supported markdown features in Mycelium
growth: evergreen
planted: 2025-12-11
lastTended: 2025-12-16
tags: [tutorial, markdown, features, reference]
draft: true
---

# Markdown Features Showcase

This post demonstrates all the markdown features supported by Mycelium.

## Text Formatting

**Bold text** and *italic text* and ***bold italic***.

~~Strikethrough~~ and `inline code`.

## Headings

We support all heading levels (H1-H6). Each heading automatically gets an anchor link.

## Links

### External Links
Visit [Astro's website](https://astro.build) for more info.

### Internal Wikilinks
Check out [[welcome-to-mycelium]] or [[digital-garden-philosophy|the philosophy post]].

## Lists

### Unordered
- First item
- Second item
  - Nested item
  - Another nested
- Third item

### Ordered
1. First step
2. Second step
3. Third step

### Task Lists
- [x] Completed task
- [ ] Pending task
- [ ] Another todo

## Blockquotes

> This is a blockquote. It's useful for highlighting quotes or important passages.
>
> It can span multiple paragraphs.

## Code

### Inline Code
Use the `npm install` command.

### Code Blocks

```typescript
// TypeScript example
interface Post {
  title: string;
  content: string;
  tags: string[];
}

function createPost(data: Post): void {
  console.log(`Creating: ${data.title}`);
}
```

```css
/* CSS example */
.garden-note {
  background: var(--color-primary-50);
  border-radius: 0.5rem;
  padding: 1rem;
}
```

```bash
# Shell commands
npm run dev
npm run build
```

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Wikilinks | ✅ | Full support |
| Callouts | ✅ | All types |
| Code highlighting | ✅ | Via Shiki |
| Math (KaTeX) | 🚧 | Coming soon |

## Horizontal Rule

---

## Images

Images can be added using standard markdown syntax.

## Callouts

> [!note] Note Callout
> Standard information callout.

> [!tip] Pro Tip
> Helpful suggestions for the reader.

> [!warning] Warning
> Something to be careful about.

> [!danger] Danger
> Critical warning - pay attention!

See [[callout-examples]] for all callout types.

## Embedding

### YouTube (planned)
Coming soon: `![[youtube:video-id]]`

### Other Notes (planned)
Coming soon: `![[other-note]]`

## Conclusion

Mycelium supports a rich set of markdown features designed for digital gardening. Combine these with [[using-wikilinks|wikilinks]] to create deeply connected content.
