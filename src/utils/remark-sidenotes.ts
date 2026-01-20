/**
 * Remark Sidenotes Plugin
 *
 * Transforms footnotes into sidenotes/margin notes (Gwern-style)
 *
 * Syntax:
 * - Standard footnotes: [^1] and [^1]: content
 * - Inline sidenotes: [^{This is an inline sidenote}]
 *
 * The plugin transforms these into sidenote markup that displays
 * in the margin on wide screens, and as expandable notes on mobile.
 */

import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import type { Root, Paragraph, Text, FootnoteReference, FootnoteDefinition } from 'mdast';

interface SidenoteOptions {
  // Whether to use numbered references (default: true)
  numbered?: boolean;
  // CSS class prefix (default: 'sidenote')
  classPrefix?: string;
}

export function remarkSidenotes(options: SidenoteOptions = {}) {
  const { numbered = true, classPrefix = 'sidenote' } = options;

  return (tree: Root) => {
    const footnotes: Map<string, FootnoteDefinition> = new Map();
    let sidenoteCounter = 0;

    // First pass: collect all footnote definitions
    visit(tree, 'footnoteDefinition', (node: FootnoteDefinition) => {
      footnotes.set(node.identifier, node);
    });

    // Second pass: transform footnote references to sidenotes
    visit(tree, 'footnoteReference', (node: FootnoteReference, index, parent) => {
      if (!parent || index === undefined) return;

      const definition = footnotes.get(node.identifier);
      if (!definition) return;

      sidenoteCounter++;
      const id = `sn-${sidenoteCounter}`;

      // Get the content from the footnote definition using proper serialization
      const content = toString(definition)
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Replace the footnote reference with sidenote HTML
      const sidenoteHtml = {
        type: 'html',
        value: `<span class="${classPrefix}-wrapper">` +
          `<label for="${id}" class="${classPrefix}-toggle ${classPrefix}-number">${numbered ? sidenoteCounter : '†'}</label>` +
          `<input type="checkbox" id="${id}" class="${classPrefix}-checkbox" />` +
          `<span class="${classPrefix} ${classPrefix}-right">` +
          `<span class="${classPrefix}-number">${numbered ? sidenoteCounter : '†'}</span> ` +
          `${content}` +
          `</span>` +
          `</span>`,
      };

      (parent.children as any[])[index] = sidenoteHtml;
    });

    // Third pass: handle inline sidenotes [^{content}]
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || index === undefined) return;

      const inlineSidenoteRegex = /\[\^\{([^}]+)\}\]/g;
      let match;
      const parts: any[] = [];
      let lastIndex = 0;

      while ((match = inlineSidenoteRegex.exec(node.value)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          parts.push({
            type: 'text',
            value: node.value.slice(lastIndex, match.index),
          });
        }

        sidenoteCounter++;
        const id = `sn-${sidenoteCounter}`;
        const content = match[1];

        // Add the sidenote HTML
        parts.push({
          type: 'html',
          value: `<span class="${classPrefix}-wrapper">` +
            `<label for="${id}" class="${classPrefix}-toggle ${classPrefix}-number">${numbered ? sidenoteCounter : '†'}</label>` +
            `<input type="checkbox" id="${id}" class="${classPrefix}-checkbox" />` +
            `<span class="${classPrefix} ${classPrefix}-right">` +
            `<span class="${classPrefix}-number">${numbered ? sidenoteCounter : '†'}</span> ` +
            `${content}` +
            `</span>` +
            `</span>`,
        });

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (lastIndex < node.value.length) {
        parts.push({
          type: 'text',
          value: node.value.slice(lastIndex),
        });
      }

      // Replace node with parts if we found any sidenotes
      if (parts.length > 0) {
        (parent.children as any[]).splice(index, 1, ...parts);
      }
    });

    // Fourth pass: remove footnote definitions (they're now inline)
    tree.children = tree.children.filter(
      (node) => node.type !== 'footnoteDefinition'
    );
  };
}

export default remarkSidenotes;
