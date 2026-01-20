// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Remark/Rehype plugins
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Custom remark plugins
import { remarkWikilinks } from './src/utils/remark-wikilinks.ts';
import { remarkCallouts } from './src/utils/remark-callouts.ts';
import { remarkHighlight } from './src/utils/remark-highlight.ts';
import { remarkEmbeds } from './src/utils/remark-embeds.ts';
import { remarkMediaEmbeds } from './src/utils/remark-media-embeds.ts';
import { remarkMermaid } from './src/utils/remark-mermaid.ts';
import { remarkGallery } from './src/utils/remark-gallery.ts';
import { remarkSidenotes } from './src/utils/remark-sidenotes.ts';
import { remarkDropcap } from './src/utils/remark-dropcap.ts';
import { remarkCollapsible } from './src/utils/remark-collapsible.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com', // Update with your site URL

  integrations: [
    tailwind({
      applyBaseStyles: false, // We'll use our own base styles
    }),
    mdx(),
    sitemap(),
  ],

  markdown: {
    remarkPlugins: [
      remarkEmbeds,  // Must come before wikilinks
      remarkMediaEmbeds,  // YouTube/Twitter embeds
      remarkMermaid,  // Mermaid diagrams
      remarkGallery,  // Image galleries
      remarkWikilinks,
      remarkCallouts,
      remarkHighlight,
      remarkMath,  // LaTeX math syntax
      remarkSidenotes,  // Convert footnotes to sidenotes (Gwern-style)
      remarkCollapsible,  // Collapsible sections with :::collapsible syntax
      [remarkDropcap, { enabled: false }],  // Drop caps (enable per-post with frontmatter)
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      rehypeKatex,  // Render math with KaTeX
    ],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
