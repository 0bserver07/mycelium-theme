/**
 * RSS Feed
 *
 * Generates an RSS feed for all posts
 */

import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../config';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => {
    return !data.draft;
  });

  // Sort by planted date, newest first
  const sortedPosts = posts.sort(
    (a, b) => b.data.planted.valueOf() - a.data.planted.valueOf()
  );

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site || siteConfig.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.planted,
      description: post.data.description || '',
      link: `/posts/${post.id}/`,
      categories: post.data.tags || [],
    })),
    customData: `<language>${siteConfig.language}</language>`,
  });
}
