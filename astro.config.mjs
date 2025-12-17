// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Remark/Rehype plugins
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// Custom remark plugins
import { remarkWikilinks } from './src/utils/remark-wikilinks.ts';
import { remarkCallouts } from './src/utils/remark-callouts.ts';

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
      remarkWikilinks,
      remarkCallouts,
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
