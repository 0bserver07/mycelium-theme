---
cssclasses:
  - dashboard
---

# Mycelium Spore Dashboard

> [!tip] Quick Actions
> **Ctrl+Q** → QuickAdd Menu | **Ctrl+T** → Insert Template | **Ctrl+Shift+K** → Git Commit

---

## Recent Posts

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Title",
  growth AS "Growth",
  planted AS "Planted",
  length(file.inlinks) AS "Backlinks"
FROM "posts"
WHERE !contains(file.name, "attachments")
SORT planted DESC
LIMIT 10
```

---

## Content Overview

### By Growth Status

```dataview
TABLE WITHOUT ID
  growth AS "Status",
  length(rows) AS "Count"
FROM "posts"
GROUP BY growth
SORT growth ASC
```

### Draft Posts

```dataview
LIST
FROM "posts"
WHERE draft = true
SORT planted DESC
```

---

## All Content

### Posts (`posts/`)

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Title",
  growth AS "Growth",
  join(tags, ", ") AS "Tags",
  planted AS "Planted",
  lastTended AS "Last Tended"
FROM "posts"
WHERE !contains(file.name, "attachments")
SORT lastTended DESC
```

### Pages (`pages/`)

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Title",
  description AS "Description"
FROM "pages"
SORT file.name ASC
```

### Projects (`projects/`)

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Title",
  status AS "Status",
  join(technologies, ", ") AS "Tech"
FROM "projects"
SORT file.name ASC
```

### Documentation (`docs/`)

```dataview
TABLE WITHOUT ID
  link(file.link, title) AS "Title",
  category AS "Category",
  order AS "Order"
FROM "docs"
SORT order ASC
```

---

## Tags Overview

```dataview
TABLE WITHOUT ID
  tags AS "Tag",
  length(rows) AS "Posts"
FROM "posts"
FLATTEN tags
GROUP BY tags
SORT length(rows) DESC
```

---

## Orphan Notes

Notes with no backlinks (consider linking them):

```dataview
LIST
FROM "posts" OR "pages" OR "projects" OR "docs"
WHERE length(file.inlinks) = 0
LIMIT 10
```
