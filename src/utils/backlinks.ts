/**
 * Backlinks/Linked Mentions Utility
 *
 * Finds all posts that link to a given post
 */

import type { Post, LinkedMention, WikilinkMatch } from '../types';

// Create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Extract wikilinks from content
export function extractWikilinks(content: string): WikilinkMatch[] {
  const matches: WikilinkMatch[] = [];
  const wikilinkRegex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
  let match;

  while ((match = wikilinkRegex.exec(content)) !== null) {
    const [fullMatch, linkText] = match;

    // Skip if in code block
    if (isInCodeBlock(content, match.index)) {
      continue;
    }

    // Remove anchor if present
    const cleanLink = linkText.split('#')[0].trim();
    const slug = createSlug(cleanLink);

    matches.push({
      link: cleanLink,
      display: cleanLink,
      slug: slug,
    });
  }

  return matches;
}

// Extract standard markdown links
export function extractMarkdownLinks(content: string): WikilinkMatch[] {
  const matches: WikilinkMatch[] = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const [fullMatch, display, url] = match;

    // Skip external links
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')) {
      continue;
    }

    // Skip if in code block
    if (isInCodeBlock(content, match.index)) {
      continue;
    }

    // Extract slug from URL
    const slugMatch = url.match(/\/posts\/([^/#]+)/);
    if (slugMatch) {
      matches.push({
        link: display,
        display: display,
        slug: slugMatch[1],
      });
    }
  }

  return matches;
}

// Check if position is inside a code block
function isInCodeBlock(content: string, position: number): boolean {
  const codeBlockRegex = /```[\s\S]*?```/g;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (position >= match.index && position < match.index + match[0].length) {
      return true;
    }
  }

  const inlineCodeRegex = /`[^`]+`/g;
  while ((match = inlineCodeRegex.exec(content)) !== null) {
    if (position >= match.index && position < match.index + match[0].length) {
      return true;
    }
  }

  return false;
}

// Extract all internal links from content
export function extractAllLinks(content: string): WikilinkMatch[] {
  const wikilinks = extractWikilinks(content);
  const markdownLinks = extractMarkdownLinks(content);

  // Combine and deduplicate by slug
  const allLinks = [...wikilinks, ...markdownLinks];
  const uniqueLinks = allLinks.filter(
    (link, index, self) => index === self.findIndex((l) => l.slug === link.slug)
  );

  return uniqueLinks;
}

// Find backlinks for a given post
export function findBacklinks(posts: Post[], targetSlug: string): LinkedMention[] {
  const backlinks: LinkedMention[] = [];

  for (const post of posts) {
    // Skip the target post itself
    if (post.id === targetSlug) {
      continue;
    }

    // Get the post body
    const body = post.body || '';
    if (!body) continue;

    // Extract all links
    const links = extractAllLinks(body);

    // Check if any link points to the target
    const matchingLink = links.find((link) => link.slug === targetSlug);

    if (matchingLink) {
      // Create an excerpt around the link
      const excerpt = createExcerpt(body, matchingLink.link);

      backlinks.push({
        title: post.data.title,
        slug: post.id,
        excerpt: excerpt,
      });
    }
  }

  return backlinks;
}

// Create an excerpt around a link mention
function createExcerpt(content: string, linkText: string): string {
  // Remove frontmatter
  const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Find the link in the content
  const wikilinkPattern = new RegExp(`\\[\\[${escapeRegex(linkText)}[^\\]]*\\]\\]`, 'i');
  const markdownPattern = new RegExp(`\\[([^\\]]+)\\]\\([^)]*${escapeRegex(linkText)}[^)]*\\)`, 'i');

  let match = withoutFrontmatter.match(wikilinkPattern) || withoutFrontmatter.match(markdownPattern);

  if (!match) {
    // Return first 150 characters as fallback
    return withoutFrontmatter.slice(0, 150).trim() + '...';
  }

  const matchIndex = withoutFrontmatter.indexOf(match[0]);
  const contextLength = 100;

  // Get context around the match
  const start = Math.max(0, matchIndex - contextLength);
  const end = Math.min(withoutFrontmatter.length, matchIndex + match[0].length + contextLength);

  let excerpt = withoutFrontmatter.slice(start, end);

  // Clean up the excerpt
  excerpt = excerpt
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^[^\w]*/, '')  // Remove leading non-word chars
    .trim();

  // Add ellipsis if needed
  if (start > 0) excerpt = '...' + excerpt;
  if (end < withoutFrontmatter.length) excerpt = excerpt + '...';

  return excerpt;
}

// Escape regex special characters
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
