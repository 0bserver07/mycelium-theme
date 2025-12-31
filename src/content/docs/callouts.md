---
draft: true
title: Callouts Reference
description: All available callout types and how to use them
category: syntax
order: 2
---
draft: true

# Callouts Reference

Callouts are styled blocks for highlighting information.

## Syntax

```markdown
> [!type] Optional Title
> Content goes here
```

## Available Types

| Type | Use Case |
|------|----------|
| `note` | General information |
| `tip` | Helpful suggestions |
| `info` | Additional context |
| `warning` | Caution needed |
| `danger` | Critical warnings |
| `success` | Positive outcomes |
| `question` | Pose a question |
| `quote` | Quotations |
| `example` | Show examples |
| `abstract` | Summaries |
| `todo` | Task lists |
| `bug` | Known issues |

## Examples

### Note

```markdown
> [!note]
> This is a note.
```

### Warning with Title

```markdown
> [!warning] Be Careful
> This action cannot be undone.
```

## Styling

Callouts are automatically styled based on their type with appropriate colors and icons.
