/**
 * Mycelium Content Collections Configuration
 *
 * Defines the schema for all content types in the digital garden.
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Growth status enum for digital garden content
const growthStatusEnum = z.enum(['seedling', 'budding', 'evergreen']).default('seedling');

// Confidence level enum (Gwern-style)
const confidenceEnum = z.enum(['high', 'medium', 'low', 'speculative']).optional();

// Importance level (1-5 stars)
const importanceLevel = z.number().min(1).max(5).optional();

// Posts Collection - Main blog/garden content
const postsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Garden-specific fields
    growth: growthStatusEnum,
    growthLocked: z.boolean().optional().default(false), // Lock to prevent auto-growth
    planted: z.coerce.date(),                    // When first created
    lastTended: z.coerce.date().optional(),      // Last updated
    // Series support (for growth through connections)
    series: z.string().optional(),               // Series name (e.g., "claude-code-guide")
    seriesOrder: z.number().optional(),          // Position in series (1, 2, 3...)
    // Standard blog fields
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
    // Media
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    // SEO
    noIndex: z.boolean().optional(),
    // Gwern-style metadata
    confidence: confidenceEnum,           // How confident are you in this content?
    importance: importanceLevel,          // How important is this (1-5 stars)?
    dropcap: z.union([z.boolean(), z.literal('accent')]).optional(), // Enable drop cap
  }),
});

// Pages Collection - Static pages (About, Contact, etc.)
const pagesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    lastModified: z.coerce.date().optional(),
    draft: z.boolean().optional().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    noIndex: z.boolean().optional(),
  }),
});

// Projects Collection - Portfolio/showcase
const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Project-specific fields
    status: z.enum(['active', 'completed', 'archived', 'planned']).default('active'),
    featured: z.boolean().optional().default(false),
    repositoryUrl: z.string().url().optional(),
    projectUrl: z.string().url().optional(),
    // Dates
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    // Categorization
    categories: z.array(z.string()).optional(),
    technologies: z.array(z.string()).optional(),
    // Media
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    // Publishing
    draft: z.boolean().optional().default(false),
    noIndex: z.boolean().optional(),
  }),
});

// Documentation Collection - Technical docs
const docsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Doc-specific fields
    category: z.string().optional(),
    order: z.number().optional().default(0),      // For sorting within category
    version: z.string().optional(),
    // Dates
    lastModified: z.coerce.date().optional(),
    // Display options
    showToc: z.boolean().optional().default(true),
    // Publishing
    draft: z.boolean().optional().default(false),
    noIndex: z.boolean().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
  pages: pagesCollection,
  projects: projectsCollection,
  docs: docsCollection,
};
