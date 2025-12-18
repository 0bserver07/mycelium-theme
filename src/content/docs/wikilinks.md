---
title: Wikilinks Reference
description: Complete guide to using wikilinks in Mycelium
category: syntax
order: 1
---

# Wikilinks Reference

Wikilinks are internal links that connect your notes together.

## Basic Syntax

```markdown
[[note-name]]
```

Links to a note called "note-name.md".

## With Display Text

```markdown
[[note-name|Click here]]
```

Shows "Click here" but links to "note-name".

## With Anchors

```markdown
[[note-name#section]]
```

Links to a specific section within a note.

## Combined

```markdown
[[note-name#section|Go to section]]
```

Display text linking to a specific section.

## How It Works

1. The wikilink plugin scans your content for `[[...]]` patterns
2. It resolves the note name to an actual URL
3. Converts to a standard markdown link
4. Renders as a styled internal link
