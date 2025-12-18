---
title: Frontmatter Reference
description: All available frontmatter fields for content types
category: syntax
order: 3
---

# Frontmatter Reference

Every content file in Mycelium uses YAML frontmatter. Here are all available fields.

## Posts

```yaml
---
title: Post Title           # Required
description: Brief summary  # Recommended for SEO
growth: seedling            # seedling | budding | evergreen
planted: 2025-12-16         # Creation date
lastTended: 2025-12-16      # Last update date
tags: [topic, subtopic]     # Array of tags
draft: false                # true to hide from production
image: /images/cover.jpg    # Cover image path
imageAlt: Description       # Alt text for cover
---
```

## Pages

```yaml
---
title: Page Title           # Required
description: Page summary   # For SEO
draft: false                # true to hide
---
```

## Projects

```yaml
---
title: Project Name         # Required
description: Brief summary  # Required
status: active              # active | completed | archived | planned
featured: true              # Show in featured section
repositoryUrl: https://...  # GitHub/GitLab link
liveUrl: https://...        # Deployed site link
technologies: [Tech, Stack] # Array of technologies
startDate: 2025-01-01       # Project start date
---
```

## Documentation

```yaml
---
title: Doc Title            # Required
description: Brief summary  # Optional
category: basics            # Group docs by category
order: 1                    # Sort order within category
---
```

## Growth Status Values

| Value | Meaning | Use When |
|-------|---------|----------|
| `seedling` | New, rough | Just started |
| `budding` | Developing | Has structure |
| `evergreen` | Mature | Complete, maintained |

## Date Formats

Use ISO 8601 format:

```yaml
planted: 2025-12-16          # Just date
planted: 2025-12-16T10:30:00 # With time
```

## Tags Best Practices

- Use lowercase
- Use hyphens for multi-word: `web-development`
- Keep to 2-5 tags per post
- Be consistent across posts
