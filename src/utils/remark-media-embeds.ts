/**
 * Remark plugin for YouTube and Twitter/X embeds
 *
 * Converts standalone URLs on their own line to responsive embeds:
 * - YouTube: https://www.youtube.com/watch?v=ID or https://youtu.be/ID
 * - Twitter/X: https://twitter.com/user/status/ID or https://x.com/user/status/ID
 */

import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Paragraph, Link } from 'mdast';

// YouTube URL patterns
const youtubePatterns = [
  /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
  /^https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
  /^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/,
];

// Twitter/X URL patterns
const twitterPatterns = [
  /^https?:\/\/(?:www\.)?twitter\.com\/(\w+)\/status\/(\d+)/,
  /^https?:\/\/(?:www\.)?x\.com\/(\w+)\/status\/(\d+)/,
];

function extractYouTubeId(url: string): string | null {
  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function extractTwitterInfo(url: string): { user: string; id: string } | null {
  for (const pattern of twitterPatterns) {
    const match = url.match(pattern);
    if (match) return { user: match[1], id: match[2] };
  }
  return null;
}

function createYouTubeEmbed(videoId: string): string {
  return `
<div class="media-embed youtube-embed my-6">
  <div class="relative w-full pb-[56.25%] rounded-lg overflow-hidden bg-primary-900">
    <iframe
      class="absolute inset-0 w-full h-full"
      src="https://www.youtube-nocookie.com/embed/${videoId}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
    ></iframe>
  </div>
</div>`;
}

function createTwitterEmbed(user: string, tweetId: string, originalUrl: string): string {
  // Using Twitter's oEmbed-compatible structure
  // The script will hydrate this into a proper embed
  return `
<div class="media-embed twitter-embed my-6">
  <blockquote class="twitter-tweet" data-dnt="true" data-theme="dark">
    <a href="${originalUrl}">Loading tweet...</a>
  </blockquote>
</div>`;
}

export const remarkMediaEmbeds: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
      if (!parent || index === undefined) return;

      // Check if paragraph contains a single link or text that's a URL
      if (node.children.length !== 1) return;

      const child = node.children[0];
      let url: string | null = null;

      // Handle raw URLs as text
      if (child.type === 'text') {
        const trimmed = child.value.trim();
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
          url = trimmed;
        }
      }

      // Handle linked URLs
      if (child.type === 'link') {
        url = (child as Link).url;
      }

      if (!url) return;

      // Try YouTube
      const youtubeId = extractYouTubeId(url);
      if (youtubeId) {
        const embedHtml = {
          type: 'html',
          value: createYouTubeEmbed(youtubeId),
        };
        parent.children.splice(index, 1, embedHtml as any);
        return;
      }

      // Try Twitter/X
      const twitterInfo = extractTwitterInfo(url);
      if (twitterInfo) {
        const embedHtml = {
          type: 'html',
          value: createTwitterEmbed(twitterInfo.user, twitterInfo.id, url),
        };
        parent.children.splice(index, 1, embedHtml as any);
        return;
      }
    });
  };
};

export default remarkMediaEmbeds;
