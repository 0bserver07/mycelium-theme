/**
 * Remark plugin to support ![[note]] embed syntax
 *
 * Converts ![[note-name]] to an embed preview card.
 * For now, creates a styled link card (full transclusion is complex).
 */

import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Paragraph } from 'mdast';

export const remarkEmbeds: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
      if (!parent || index === undefined) return;
      if (node.children.length !== 1) return;

      const child = node.children[0];
      if (child.type !== 'text') return;

      // Match ![[note-name]] syntax
      const embedRegex = /^!\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]$/;
      const match = child.value.match(embedRegex);

      if (!match) return;

      const [, noteName, section, displayText] = match;
      const slug = noteName.toLowerCase().replace(/\s+/g, '-');
      const title = displayText || noteName;
      const url = `/posts/${slug}/`;

      // Replace with embed card HTML
      const embedHtml = {
        type: 'html',
        value: `
<div class="embed-card my-4 p-4 border border-primary-200 dark:border-primary-700 rounded-lg bg-primary-50 dark:bg-primary-900/50 hover:border-accent-400 dark:hover:border-accent-600 transition-colors">
  <a href="${url}" class="flex items-center gap-3 no-underline">
    <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary-200 dark:bg-primary-800 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    </div>
    <div class="flex-1 min-w-0">
      <p class="font-medium text-primary-900 dark:text-primary-100 truncate">${title}</p>
      ${section ? `<p class="text-sm text-primary-600 dark:text-primary-400">#${section}</p>` : ''}
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  </a>
</div>`,
      };

      parent.children.splice(index, 1, embedHtml as any);
    });
  };
};

export default remarkEmbeds;
