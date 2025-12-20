/**
 * Remark plugin to support ==highlight== syntax
 *
 * Converts ==highlighted text== to <mark>highlighted text</mark>
 */

import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Text } from 'mdast';

export const remarkHighlight: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || index === undefined) return;

      const regex = /==([^=]+)==/g;
      const value = node.value;

      if (!regex.test(value)) return;

      // Reset regex
      regex.lastIndex = 0;

      const children: any[] = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(value)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          children.push({
            type: 'text',
            value: value.slice(lastIndex, match.index),
          });
        }

        // Add the highlighted content as HTML
        children.push({
          type: 'html',
          value: `<mark class="highlight">${match[1]}</mark>`,
        });

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (lastIndex < value.length) {
        children.push({
          type: 'text',
          value: value.slice(lastIndex),
        });
      }

      if (children.length > 0) {
        parent.children.splice(index, 1, ...children);
      }
    });
  };
};

export default remarkHighlight;
