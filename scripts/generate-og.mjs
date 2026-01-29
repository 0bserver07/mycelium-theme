#!/usr/bin/env node
/**
 * Generate OG images for all posts
 *
 * Usage: npm run generate-og
 *
 * Creates 1200x630 PNG images in public/og/posts/
 * Uses satori + resvg for portability (no ImageMagick needed)
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const POSTS_DIR = join(ROOT, 'src/content/posts');
const OUTPUT_DIR = join(ROOT, 'public/og/posts');

// OG image dimensions
const WIDTH = 1200;
const HEIGHT = 630;

// Colors matching site theme
const COLORS = {
  bgStart: '#1a1a2e',
  bgEnd: '#16213e',
  title: '#e2e8f0',
  subtitle: '#94a3b8',
};

/**
 * Extract title from markdown frontmatter
 */
function extractTitle(content) {
  const match = content.match(/^---\n[\s\S]*?title:\s*["']?([^"'\n]+)["']?[\s\S]*?---/);
  return match ? match[1].trim() : null;
}

/**
 * Split title into lines for better display
 */
function splitTitle(title, maxCharsPerLine = 30) {
  const words = title.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  return lines;
}

/**
 * Generate OG image SVG using satori
 */
async function generateOgImage(title, font) {
  const lines = splitTitle(title, 28);
  const fontSize = lines.length > 2 ? 42 : 52;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: `linear-gradient(135deg, ${COLORS.bgStart} 0%, ${COLORS.bgEnd} 100%)`,
          padding: '60px',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                flex: 1,
              },
              children: lines.map((line) => ({
                type: 'div',
                props: {
                  style: {
                    color: COLORS.title,
                    fontSize: `${fontSize}px`,
                    fontWeight: 700,
                    lineHeight: 1.3,
                  },
                  children: line,
                },
              })),
            },
          },
          {
            type: 'div',
            props: {
              style: {
                color: COLORS.subtitle,
                fontSize: '24px',
                marginTop: '40px',
              },
              children: 'yad.codes',
            },
          },
        ],
      },
    },
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        {
          name: 'Inter',
          data: font,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  return svg;
}

/**
 * Convert SVG to PNG using resvg
 */
function svgToPng(svg) {
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: WIDTH,
    },
  });
  return resvg.render().asPng();
}

/**
 * Load font for satori
 */
async function loadFont() {
  // Try to load Inter from node_modules
  const interPath = join(ROOT, 'node_modules/@fontsource/inter/files/inter-latin-700-normal.woff');

  if (existsSync(interPath)) {
    return readFile(interPath);
  }

  // Fallback: fetch from Google Fonts
  console.log('  Fetching Inter font from Google Fonts...');
  const response = await fetch(
    'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiJ-Ek-_EeA.woff2'
  );
  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  console.log('Generating OG images...\n');

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  // Load font
  const font = await loadFont();

  // Get all markdown files
  const files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith('.md'));

  let generated = 0;
  let skipped = 0;

  for (const file of files) {
    const slug = file.replace('.md', '');
    const outputPath = join(OUTPUT_DIR, `${slug}.png`);

    // Read post content
    const content = await readFile(join(POSTS_DIR, file), 'utf-8');
    const title = extractTitle(content);

    if (!title) {
      console.log(`  Skipping ${file} (no title found)`);
      skipped++;
      continue;
    }

    // Check if image already exists (optional: add --force flag to regenerate)
    if (existsSync(outputPath) && !process.argv.includes('--force')) {
      console.log(`  Skipping ${slug} (already exists, use --force to regenerate)`);
      skipped++;
      continue;
    }

    // Generate OG image
    console.log(`  Generating: ${slug}`);
    const svg = await generateOgImage(title, font);
    const png = svgToPng(svg);
    await writeFile(outputPath, png);
    generated++;
  }

  console.log(`\nDone! Generated ${generated} images, skipped ${skipped}.`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
