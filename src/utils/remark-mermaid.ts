/**
 * Remark plugin for Mermaid diagram support
 *
 * Transforms ```mermaid code blocks into div elements
 * that can be rendered by Mermaid.js on the client side.
 */

import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Code } from 'mdast';

export const remarkMermaid: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'code', (node: Code, index, parent) => {
      if (!parent || index === undefined) return;
      if (node.lang !== 'mermaid') return;

      // Replace code block with a div containing the mermaid source
      // The client-side script will render this
      const mermaidDiv = {
        type: 'html',
        value: `
<div class="mermaid-container my-6">
  <div class="mermaid">${escapeHtml(node.value)}</div>
</div>`,
      };

      parent.children.splice(index, 1, mermaidDiv as any);
    });
  };
};

// Simple HTML escape for safety
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default remarkMermaid;
