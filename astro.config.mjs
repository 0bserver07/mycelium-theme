// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Remark/Rehype plugins
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkDirective from 'remark-directive';

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
    mdx(),
    sitemap(),
  ],

  // Tailwind CSS v4 is wired via its Vite plugin (the former @astrojs/tailwind
  // integration is deprecated and caps at Astro 5 / Tailwind 3).
  vite: {
    plugins: [tailwindcss()],
  },

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
      remarkDirective,  // Parse ::: directive syntax (must come before collapsible)
      remarkCollapsible,  // Collapsible sections with :::collapsible syntax
      [remarkDropcap, { enabled: false }],  // Drop caps (enable per-post with frontmatter)
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      rehypeKatex,  // Render math with KaTeX
    ],
    shikiConfig: {
      theme: 'min-dark',
      wrap: true,
    },
  },
});
