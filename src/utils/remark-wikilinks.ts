/**
 * Remark plugin for processing Obsidian-style wikilinks [[...]]
 *
 * Converts:
 * - [[Post Title]] → link to correct collection (/posts/, /projects/, or /)
 * - [[Post Title|Display Text]] → link with custom text
 * - [[Post Title#Section]] → link with anchor
 * - ![[image.jpg]] → image embed
 */

import { visit } from 'unist-util-visit';
import fs from 'fs';
import path from 'path';

// Build slug to collection map at module load time
function buildSlugMap(): Map<string, string> {
  const slugMap = new Map<string, string>();
  const contentDir = path.join(process.cwd(), 'src/content');

  const collections = ['posts', 'projects', 'pages'];
  const pathMap: Record<string, string> = {
    posts: '/posts/',
    projects: '/projects/',
    pages: '/'
  };

  for (const collection of collections) {
    const collectionDir = path.join(contentDir, collection);
    if (fs.existsSync(collectionDir)) {
      const files = fs.readdirSync(collectionDir);
      for (const file of files) {
        if (file.endsWith('.md') || file.endsWith('.mdx')) {
          const slug = file.replace(/\.mdx?$/, '');
          slugMap.set(slug, pathMap[collection]);
        }
      }
    }
  }

  return slugMap;
}

const slugMap = buildSlugMap();

// Create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Parse wikilink with potential anchor
function parseWikilink(content: string): { link: string; anchor: string | null; display: string | null } {
  // Check for display text: [[link|display]]
  const pipeIndex = content.indexOf('|');
  let linkPart = content;
  let display: string | null = null;

  if (pipeIndex !== -1) {
    linkPart = content.substring(0, pipeIndex);
    display = content.substring(pipeIndex + 1).trim();
  }

  // Check for anchor: [[link#anchor]]
  const hashIndex = linkPart.indexOf('#');
  let link = linkPart;
  let anchor: string | null = null;

  if (hashIndex !== -1) {
    link = linkPart.substring(0, hashIndex);
    anchor = linkPart.substring(hashIndex + 1).trim();
  }

  return { link: link.trim(), anchor, display };
}

// Check if wikilink is inside code block
function isInCode(content: string, index: number): boolean {
  // Check for code blocks
  const codeBlockRegex = /```[\s\S]*?```/g;
  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (index >= match.index && index < match.index + match[0].length) {
      return true;
    }
  }

  // Check for inline code
  const inlineCodeRegex = /`[^`]+`/g;
  while ((match = inlineCodeRegex.exec(content)) !== null) {
    if (index >= match.index && index < match.index + match[0].length) {
      return true;
    }
  }

  return false;
}

export function remarkWikilinks() {
  return function transformer(tree: any) {
    visit(tree, 'text', (node: any, index: any, parent: any) => {
      if (!node.value || typeof node.value !== 'string') {
        return;
      }

      // Skip if parent is already a link or code
      if (parent && (parent.type === 'link' || parent.type === 'inlineCode' || parent.type === 'code')) {
        return;
      }

      const wikilinkRegex = /(!?)\[\[([^\]]+)\]\]/g;
      let match;
      const newChildren: any[] = [];
      let lastIndex = 0;
      let hasWikilinks = false;

      while ((match = wikilinkRegex.exec(node.value)) !== null) {
        const [fullMatch, isEmbed, content] = match;
        const isImage = isEmbed === '!';

        // Skip if in code
        if (isInCode(node.value, match.index)) {
          continue;
        }

        hasWikilinks = true;

        // Add text before the wikilink
        if (match.index > lastIndex) {
          newChildren.push({
            type: 'text',
            value: node.value.slice(lastIndex, match.index),
          });
        }

        if (isImage) {
          // Image wikilink: ![[image.jpg]]
          const imagePath = content.trim();
          newChildren.push({
            type: 'image',
            url: imagePath,
            alt: '',
            data: {
              hName: 'img',
              hProperties: {
                src: imagePath,
                alt: '',
              },
            },
          });
        } else {
          // Link wikilink: [[Post Title]]
          const { link, anchor, display } = parseWikilink(content);
          const slug = createSlug(link);

          // Look up the correct path for this slug, default to /posts/
          const basePath = slugMap.get(slug) || '/posts/';
          let url = `${basePath}${slug}/`;

          if (anchor) {
            url += `#${createSlug(anchor)}`;
          }

          const displayText = display || link;

          newChildren.push({
            type: 'link',
            url: url,
            title: null,
            data: {
              hName: 'a',
              hProperties: {
                className: ['wikilink'],
                'data-wikilink': slug,
              },
            },
            children: [
              {
                type: 'text',
                value: displayText,
              },
            ],
          });
        }

        lastIndex = wikilinkRegex.lastIndex;
      }

      // Add remaining text
      if (lastIndex < node.value.length) {
        newChildren.push({
          type: 'text',
          value: node.value.slice(lastIndex),
        });
      }

      if (hasWikilinks && parent && parent.children) {
        parent.children.splice(index, 1, ...newChildren);
      }
    });
  };
}

export default remarkWikilinks;
