/**
 * Remark Drop Cap Plugin
 *
 * Adds a decorative drop cap to the first paragraph of an article
 * Transforms the first letter into a large, styled initial
 *
 * Usage:
 * - Automatically applies to the first paragraph
 * - Can be disabled with frontmatter: dropcap: false
 * - Can specify accent style: dropcap: accent
 */

import { visit } from 'unist-util-visit';
import type { Root, Paragraph, Text } from 'mdast';

interface DropCapOptions {
  // Whether to enable drop caps by default (default: true)
  enabled?: boolean;
  // Whether to use accent color (default: false)
  accent?: boolean;
}

export function remarkDropcap(options: DropCapOptions = {}) {
  const { enabled = true, accent = false } = options;

  return (tree: Root, file: any) => {
    // Check frontmatter for dropcap settings
    const frontmatter = file.data?.astro?.frontmatter || {};

    // If dropcap is explicitly disabled in frontmatter, skip
    if (frontmatter.dropcap === false) return;

    // If dropcap is not enabled by default and not explicitly enabled, skip
    if (!enabled && frontmatter.dropcap !== true && frontmatter.dropcap !== 'accent') return;

    const useAccent = frontmatter.dropcap === 'accent' || accent;
    let firstParagraphProcessed = false;

    visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
      // Only process the first paragraph
      if (firstParagraphProcessed) return;

      // Skip if not in the main content (e.g., inside a blockquote)
      if (!parent || parent.type !== 'root') return;

      // Find the first text node
      const firstChild = node.children[0];
      if (!firstChild || firstChild.type !== 'text') return;

      const text = firstChild.value;
      if (!text || text.length === 0) return;

      // Get the first letter and the rest of the text
      const firstLetter = text[0];
      const restOfText = text.slice(1);

      // Skip if the first character is not a letter
      if (!/[a-zA-Z]/.test(firstLetter)) return;

      // Create the drop cap HTML
      const accentClass = useAccent ? ' drop-cap-accent' : '';
      const dropCapHtml = {
        type: 'html',
        value: `<span class="drop-cap-wrapper"><span class="drop-cap${accentClass}">${firstLetter}</span>`,
      };

      const closingHtml = {
        type: 'html',
        value: `</span>`,
      };

      // Update the text node to remove the first letter
      (firstChild as Text).value = restOfText;

      // Insert the drop cap HTML at the beginning
      node.children.unshift(dropCapHtml as any);

      // Add closing wrapper at the end of the paragraph
      node.children.push(closingHtml as any);

      firstParagraphProcessed = true;
    });
  };
}

export default remarkDropcap;
