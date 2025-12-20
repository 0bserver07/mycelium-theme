/**
 * Remark plugin for image galleries
 *
 * Converts consecutive images wrapped in :::gallery ::: to a gallery grid.
 *
 * Syntax:
 * :::gallery
 * ![alt](image1.jpg)
 * ![alt](image2.jpg "caption")
 * :::
 *
 * Or simply consecutive images on their own lines (auto-detected):
 * ![](image1.jpg)
 * ![](image2.jpg)
 * ![](image3.jpg)
 */

import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Paragraph, Image } from 'mdast';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

function createGalleryHtml(images: GalleryImage[]): string {
  const thumbnails = images
    .map(
      (img, i) => `
    <button
      type="button"
      class="gallery-thumbnail group relative aspect-square overflow-hidden rounded-lg bg-primary-100 dark:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
      data-index="${i}"
      data-src="${img.src}"
      data-alt="${escapeHtml(img.alt)}"
      data-caption="${escapeHtml(img.caption)}"
    >
      <img
        src="${img.src}"
        alt="${escapeHtml(img.alt)}"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
      ${
        img.caption
          ? `<div class="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <p class="text-white text-sm truncate">${escapeHtml(img.caption)}</p>
      </div>`
          : ''
      }
    </button>`
    )
    .join('\n');

  return `
<div class="image-gallery my-8" data-gallery>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    ${thumbnails}
  </div>

  <div class="lightbox fixed inset-0 z-50 hidden items-center justify-center bg-black/90" data-lightbox>
    <button type="button" class="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10" data-lightbox-close aria-label="Close">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
    <button type="button" class="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white transition-colors z-10" data-lightbox-prev aria-label="Previous">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white transition-colors z-10" data-lightbox-next aria-label="Next">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
    </button>
    <div class="max-w-5xl max-h-[85vh] mx-4">
      <img src="" alt="" class="lightbox-image max-w-full max-h-[80vh] object-contain" data-lightbox-image />
      <p class="lightbox-caption text-center text-white/80 mt-4 text-sm hidden" data-lightbox-caption></p>
    </div>
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm" data-lightbox-counter>1 / ${images.length}</div>
  </div>
</div>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export const remarkGallery: Plugin<[], Root> = () => {
  return (tree) => {
    // First pass: handle :::gallery blocks
    visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
      if (!parent || index === undefined) return;
      if (node.children.length !== 1) return;

      const child = node.children[0];
      if (child.type !== 'text') return;

      // Check for :::gallery start
      if (child.value.trim() === ':::gallery') {
        const images: GalleryImage[] = [];
        let endIndex = index;

        // Collect following image paragraphs until :::
        for (let i = index + 1; i < parent.children.length; i++) {
          const sibling = parent.children[i];

          if (sibling.type === 'paragraph') {
            const siblingPara = sibling as Paragraph;

            // Check for end marker
            if (
              siblingPara.children.length === 1 &&
              siblingPara.children[0].type === 'text' &&
              siblingPara.children[0].value.trim() === ':::'
            ) {
              endIndex = i;
              break;
            }

            // Check for image
            if (
              siblingPara.children.length === 1 &&
              siblingPara.children[0].type === 'image'
            ) {
              const img = siblingPara.children[0] as Image;
              images.push({
                src: img.url,
                alt: img.alt || '',
                caption: img.title || '',
              });
              endIndex = i;
            }
          }
        }

        if (images.length > 0) {
          const galleryHtml = {
            type: 'html',
            value: createGalleryHtml(images),
          };

          // Remove the gallery block and images, replace with HTML
          parent.children.splice(index, endIndex - index + 1, galleryHtml as any);
        }
      }
    });

    // Second pass: auto-detect consecutive images (3+ in a row)
    let i = 0;
    while (i < tree.children.length) {
      const node = tree.children[i];

      if (
        node.type === 'paragraph' &&
        (node as Paragraph).children.length === 1 &&
        (node as Paragraph).children[0].type === 'image'
      ) {
        // Found an image, look for consecutive images
        const images: GalleryImage[] = [];
        let endIndex = i;

        for (let j = i; j < tree.children.length; j++) {
          const sibling = tree.children[j];
          if (
            sibling.type === 'paragraph' &&
            (sibling as Paragraph).children.length === 1 &&
            (sibling as Paragraph).children[0].type === 'image'
          ) {
            const img = (sibling as Paragraph).children[0] as Image;
            images.push({
              src: img.url,
              alt: img.alt || '',
              caption: img.title || '',
            });
            endIndex = j;
          } else {
            break;
          }
        }

        // Only create gallery if 3+ consecutive images
        if (images.length >= 3) {
          const galleryHtml = {
            type: 'html',
            value: createGalleryHtml(images),
          };

          tree.children.splice(i, endIndex - i + 1, galleryHtml as any);
        }
      }

      i++;
    }
  };
};

export default remarkGallery;
