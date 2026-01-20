/**
 * Remark Collapsible Sections Plugin
 *
 * Transforms :::collapsible container directives into <details>/<summary> elements
 * Requires remark-directive to be loaded first
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
import type { Root } from 'mdast';

interface DirectiveNode {
  type: 'containerDirective' | 'leafDirective' | 'textDirective';
  name: string;
  attributes?: Record<string, string>;
  children: any[];
  data?: any;
}

export function remarkCollapsible() {
  return (tree: Root) => {
    visit(tree, (node: any) => {
      if (node.type !== 'containerDirective') return;
      if (node.name !== 'collapsible') return;

      const directive = node as DirectiveNode;

      // Get the title from the directive label (first child if it's a paragraph with directiveLabel)
      let title = 'Details';
      const labelNode = directive.children.find(
        (child: any) => child.data?.directiveLabel === true
      );
      if (labelNode && labelNode.children?.[0]?.value) {
        title = labelNode.children[0].value;
      }

      // Check for open attribute
      const isOpen = directive.attributes?.open !== undefined ||
                     (directive.attributes && 'open' in directive.attributes);

      // Set up the data for hast transformation
      const data = directive.data || (directive.data = {});
      const tagName = 'details';

      data.hName = tagName;
      data.hProperties = {
        className: ['collapsible'],
        ...(isOpen ? { open: true } : {}),
      };

      // Transform children: wrap in summary + content div
      const contentChildren = directive.children.filter(
        (child: any) => child.data?.directiveLabel !== true
      );

      // Replace children with summary + content structure
      directive.children = [
        {
          type: 'html',
          value: `<summary>${escapeHtml(title)}</summary><div class="collapsible-content">`,
        },
        ...contentChildren,
        {
          type: 'html',
          value: `</div>`,
        },
      ];
    });
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default remarkCollapsible;
