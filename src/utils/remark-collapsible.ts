/**
 * Remark Collapsible Sections Plugin
 *
 * Transforms special syntax into collapsible <details>/<summary> elements
 *
 * Syntax:
 * :::collapsible[Title]
 * Content goes here
 * :::
 *
 * Or with default open:
 * :::collapsible{open}[Title]
 * Content goes here
 * :::
 */

import { visit } from 'unist-util-visit';
import type { Root, Paragraph, Text } from 'mdast';

export function remarkCollapsible() {
  return (tree: Root) => {
    const nodesToProcess: Array<{ parent: any; startIndex: number; endIndex: number; title: string; open: boolean }> = [];

    // First pass: find collapsible markers
    visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
      if (!parent || index === undefined) return;

      const firstChild = node.children[0];
      if (!firstChild || firstChild.type !== 'text') return;

      const text = firstChild.value;

      // Check for opening marker: :::collapsible[Title] or :::collapsible{open}[Title]
      const openMatch = text.match(/^:::collapsible(\{open\})?\[(.*?)\]\s*$/);
      if (openMatch) {
        const isOpen = !!openMatch[1];
        const title = openMatch[2];

        // Find the closing marker
        for (let i = index + 1; i < parent.children.length; i++) {
          const child = parent.children[i];
          if (child.type === 'paragraph' && child.children[0]?.type === 'text') {
            const childText = (child.children[0] as Text).value;
            if (childText.trim() === ':::') {
              nodesToProcess.push({
                parent,
                startIndex: index,
                endIndex: i,
                title,
                open: isOpen,
              });
              break;
            }
          }
        }
      }
    });

    // Second pass: process found collapsibles (in reverse order to preserve indices)
    nodesToProcess.reverse().forEach(({ parent, startIndex, endIndex, title, open }) => {
      // Get content nodes between start and end
      const contentNodes = parent.children.slice(startIndex + 1, endIndex);

      // Create the details/summary HTML structure
      const openAttr = open ? ' open' : '';
      const detailsOpen = {
        type: 'html',
        value: `<details class="collapsible"${openAttr}><summary>${title}</summary><div class="collapsible-content">`,
      };

      const detailsClose = {
        type: 'html',
        value: `</div></details>`,
      };

      // Replace the markers and content with the new structure
      parent.children.splice(
        startIndex,
        endIndex - startIndex + 1,
        detailsOpen,
        ...contentNodes,
        detailsClose
      );
    });
  };
}

export default remarkCollapsible;
