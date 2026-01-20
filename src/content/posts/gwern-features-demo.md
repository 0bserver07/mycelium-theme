---
title: "Demo: Gwern-Style Features"
description: "A showcase of all the new Gwern-inspired features in the Mycelium theme"
growth: evergreen
planted: 2026-01-20
lastTended: 2026-01-20
tags: [features, demo, gwern]
confidence: high
importance: 4
dropcap: true
---

This post demonstrates all the new Gwern-inspired features now available in the Mycelium theme. Each feature enhances the reading experience and adds depth to your digital garden.

## Sidenotes and Margin Notes

Traditional footnotes disrupt the reading flow by forcing readers to jump to the bottom of the page. Sidenotes solve this elegantly[^1].

[^1]: This is a sidenote! On wide screens, it appears in the margin. On mobile, it expands inline when you tap the number.

You can also use inline sidenotes for shorter asides[^{Like this quick thought that doesn't need a full footnote}].

## Link Type Icons

The theme now automatically adds icons to help readers understand what they're clicking:

- External links like [Wikipedia](https://en.wikipedia.org) get an external link icon
- PDF links like [this paper](/papers/example.pdf) get a document icon
- [GitHub repositories](https://github.com/example/repo) get the GitHub logo
- Internal [[wikilinks]] keep their distinctive dashed underline style

## Drop Caps

Notice the decorative "T" at the beginning of this post? That's a drop cap. You can enable it per-post via frontmatter:

```yaml
dropcap: true      # Standard drop cap
dropcap: accent    # Accent-colored drop cap
dropcap: false     # Disable (default)
```

## Collapsible Sections

Sometimes you want to include detailed information without cluttering the main flow:

:::collapsible[Click to expand: Implementation Details]
This content is hidden by default. Perfect for:
- Technical implementation details
- Extended code examples
- Supplementary information
- Spoiler warnings
:::

:::collapsible[This one demonstrates a second collapsible]
Collapsible sections can be used multiple times on the same page!
:::

## Confidence Ratings

I've added a "high" confidence rating to this post's frontmatter. You'll see it displayed in the post header alongside other metadata.

Available levels:
- **high**: Well-researched and verified
- **medium**: Reasonably confident with some uncertainty
- **low**: Uncertain, needs more research
- **speculative**: Experimental thinking, may be wrong

## Importance Ratings

The importance rating (also in the header) uses a 5-star system:

- ⭐ (1): Low importance, minor note
- ⭐⭐ (2): Minor but useful
- ⭐⭐⭐ (3): Moderate importance
- ⭐⭐⭐⭐ (4): Important reading (like this post!)
- ⭐⭐⭐⭐⭐ (5): Essential, must-read content

## Image Lightbox

Click any image in your posts to zoom in! The lightbox provides:

- Full-screen view
- Caption display (from alt text or figcaption)
- Keyboard navigation (Escape to close)
- Click outside to dismiss

## Link Preview Popups

Hover over any internal link (like [[sample-post]]) to see a preview popup showing:

- The linked page's title
- Description excerpt
- Content type and growth status

This helps readers decide whether to click without losing their place.

## Frontmatter Example

Here's how to use all these features in your posts:

```yaml
---
title: "My Amazing Post"
description: "A great article about something"
growth: budding
planted: 2026-01-20
confidence: medium
importance: 3
dropcap: accent
---
```

## What's Next?

These features bring the Mycelium theme closer to Gwern's legendary site design. Each one is:

- **Opt-in**: Enable only what you want
- **Accessible**: Works with keyboards and screen readers
- **Responsive**: Adapts beautifully to mobile
- **Themeable**: Inherits your color scheme

Happy gardening! 🌱
