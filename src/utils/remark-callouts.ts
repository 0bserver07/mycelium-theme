/**
 * Remark plugin for processing Obsidian-style callout blocks
 *
 * Converts:
 * > [!note] Title
 * > Content here
 *
 * Into styled callout blocks
 */

import { visit } from 'unist-util-visit';

// Callout types and their icons
const calloutTypes: Record<string, { icon: string; color: string }> = {
  note: { icon: 'pencil', color: 'blue' },
  tip: { icon: 'lightbulb', color: 'green' },
  info: { icon: 'info', color: 'blue' },
  warning: { icon: 'alert-triangle', color: 'amber' },
  danger: { icon: 'alert-circle', color: 'red' },
  error: { icon: 'x-circle', color: 'red' },
  success: { icon: 'check-circle', color: 'green' },
  question: { icon: 'help-circle', color: 'purple' },
  quote: { icon: 'quote', color: 'gray' },
  example: { icon: 'list', color: 'purple' },
  abstract: { icon: 'clipboard', color: 'cyan' },
  todo: { icon: 'check-square', color: 'blue' },
  bug: { icon: 'bug', color: 'red' },
};

export function remarkCallouts() {
  return function transformer(tree: any) {
    visit(tree, 'blockquote', (node: any, index: any, parent: any) => {
      if (!node.children || node.children.length === 0) {
        return;
      }

      // Get the first paragraph
      const firstChild = node.children[0];
      if (firstChild.type !== 'paragraph' || !firstChild.children) {
        return;
      }

      // Get the first text node
      const firstText = firstChild.children[0];
      if (firstText.type !== 'text') {
        return;
      }

      // Check for callout syntax: [!type] or [!type] Title
      const calloutMatch = firstText.value.match(/^\[!(\w+)\](?:\s*(.*))?/i);
      if (!calloutMatch) {
        return;
      }

      const [fullMatch, type, title] = calloutMatch;
      const calloutType = type.toLowerCase();
      const calloutConfig = calloutTypes[calloutType] || calloutTypes.note;

      // Remove the callout syntax from the first text
      const remainingText = firstText.value.slice(fullMatch.length).trim();

      // Build the callout content
      const calloutChildren: any[] = [];

      // Add title if present
      if (title || calloutType) {
        calloutChildren.push({
          type: 'element',
          data: {
            hName: 'div',
            hProperties: {
              className: ['callout-title'],
            },
          },
          children: [
            {
              type: 'element',
              data: {
                hName: 'span',
                hProperties: {
                  className: ['callout-icon'],
                },
              },
              children: [
                {
                  type: 'text',
                  value: calloutType.charAt(0).toUpperCase() + calloutType.slice(1),
                },
              ],
            },
            ...(title
              ? [
                  {
                    type: 'element',
                    data: {
                      hName: 'span',
                      hProperties: {
                        className: ['callout-title-text'],
                      },
                    },
                    children: [{ type: 'text', value: title }],
                  },
                ]
              : []),
          ],
        });
      }

      // Process the rest of the content
      const contentChildren = [...node.children];

      // Modify the first paragraph to remove callout syntax
      if (remainingText) {
        firstText.value = remainingText;
      } else {
        // Remove the first text node if it's empty
        firstChild.children.shift();
        // If the paragraph is now empty, remove it
        if (firstChild.children.length === 0) {
          contentChildren.shift();
        }
      }

      // Add content wrapper
      if (contentChildren.length > 0) {
        calloutChildren.push({
          type: 'element',
          data: {
            hName: 'div',
            hProperties: {
              className: ['callout-content'],
            },
          },
          children: contentChildren,
        });
      }

      // Replace the blockquote with a callout div
      const calloutNode = {
        type: 'element',
        data: {
          hName: 'div',
          hProperties: {
            className: ['callout', `callout-${calloutType}`],
            'data-callout': calloutType,
          },
        },
        children: calloutChildren,
      };

      if (parent && parent.children) {
        parent.children[index] = calloutNode;
      }
    });
  };
}

export default remarkCallouts;
