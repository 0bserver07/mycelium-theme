/**
 * Mycelium Type Definitions
 */

import type { CollectionEntry } from 'astro:content';

// Content Types
export type Post = CollectionEntry<'posts'>;
export type Page = CollectionEntry<'pages'>;
export type Project = CollectionEntry<'projects'>;
export type Doc = CollectionEntry<'docs'>;

// Growth status for digital garden
export type GrowthStatus = 'seedling' | 'budding' | 'evergreen';

// Wikilink match for link extraction
export interface WikilinkMatch {
  link: string;
  display: string;
  slug: string;
}

// Graph visualization types
export interface GraphNode {
  id: string;
  name: string;
  slug?: string;
  radius: number;
  group?: string;
  type?: 'post' | 'tag';
  connections?: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  value: number;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
  connections: Array<{
    source: string;
    target: string;
  }>;
}

// Search index entry
export interface SearchEntry {
  title: string;
  description?: string;
  slug: string;
  tags?: string[];
  growth?: GrowthStatus;
  type: 'post' | 'page' | 'project' | 'doc';
}

// Table of contents
export interface TocItem {
  depth: number;
  text: string;
  slug: string;
  children?: TocItem[];
}

// Linked mention (backlink)
export interface LinkedMention {
  title: string;
  slug: string;
  excerpt: string;
}

// Theme colors
export interface ThemeColors {
  primary: ColorScale;
  accent: ColorScale;
}

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}
