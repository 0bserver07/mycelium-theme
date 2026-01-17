/**
 * Growth Calculation Utility
 *
 * Calculates suggested growth status based on connections:
 * - Backlinks: Posts that link TO this post
 * - Series: Posts that follow this post in a series
 *
 * Growth through connections philosophy:
 * - A post grows when others build upon it
 * - Foundational posts become evergreen through references
 */

import type { Post, GrowthStatus } from '../types';
import { extractAllLinks } from './backlinks';

export interface GrowthMetrics {
  backlinksCount: number;
  seriesFollowers: number;  // Posts after this one in the series
  seriesTotal: number;      // Total posts in series
  seriesPosition: number;   // Position in series (0 if not in series)
}

export interface GrowthResult {
  suggested: GrowthStatus;
  current: GrowthStatus;
  locked: boolean;
  metrics: GrowthMetrics;
  reasons: string[];
}

// Thresholds for growth calculation
const THRESHOLDS = {
  // Backlinks needed to suggest budding/evergreen
  backlinks: {
    budding: 1,    // 1+ backlinks = budding
    evergreen: 3,  // 3+ backlinks = evergreen
  },
  // Series followers needed (posts after this one)
  seriesFollowers: {
    budding: 1,    // 1+ followers = budding
    evergreen: 2,  // 2+ followers = evergreen
  },
};

/**
 * Build a map of postId -> backlinks count
 */
export function buildBacklinksMap(posts: Post[]): Map<string, string[]> {
  const backlinksMap = new Map<string, string[]>();

  // Initialize all posts with empty arrays
  for (const post of posts) {
    backlinksMap.set(post.id, []);
  }

  // For each post, find what it links to and add backlink
  for (const post of posts) {
    const body = post.body || '';
    if (!body) continue;

    const links = extractAllLinks(body);

    for (const link of links) {
      // Find the target post by slug
      const targetPost = posts.find(p => p.id === link.slug);
      if (targetPost && targetPost.id !== post.id) {
        const existing = backlinksMap.get(targetPost.id) || [];
        if (!existing.includes(post.id)) {
          existing.push(post.id);
          backlinksMap.set(targetPost.id, existing);
        }
      }
    }
  }

  return backlinksMap;
}

/**
 * Build a map of series -> posts in that series (ordered)
 */
export function buildSeriesMap(posts: Post[]): Map<string, Post[]> {
  const seriesMap = new Map<string, Post[]>();

  for (const post of posts) {
    const series = post.data.series;
    if (!series) continue;

    const existing = seriesMap.get(series) || [];
    existing.push(post);
    seriesMap.set(series, existing);
  }

  // Sort each series by seriesOrder
  for (const [series, seriesPosts] of seriesMap) {
    seriesPosts.sort((a, b) => {
      const orderA = a.data.seriesOrder ?? 999;
      const orderB = b.data.seriesOrder ?? 999;
      return orderA - orderB;
    });
    seriesMap.set(series, seriesPosts);
  }

  return seriesMap;
}

/**
 * Calculate growth metrics for a single post
 */
export function calculateMetrics(
  post: Post,
  backlinksMap: Map<string, string[]>,
  seriesMap: Map<string, Post[]>
): GrowthMetrics {
  const backlinks = backlinksMap.get(post.id) || [];
  const series = post.data.series;

  let seriesFollowers = 0;
  let seriesTotal = 0;
  let seriesPosition = 0;

  if (series) {
    const seriesPosts = seriesMap.get(series) || [];
    seriesTotal = seriesPosts.length;
    const myIndex = seriesPosts.findIndex(p => p.id === post.id);
    if (myIndex !== -1) {
      seriesPosition = myIndex + 1;
      seriesFollowers = seriesPosts.length - myIndex - 1;
    }
  }

  return {
    backlinksCount: backlinks.length,
    seriesFollowers,
    seriesTotal,
    seriesPosition,
  };
}

/**
 * Suggest growth status based on metrics
 */
export function suggestGrowth(metrics: GrowthMetrics): { status: GrowthStatus; reasons: string[] } {
  const reasons: string[] = [];
  let suggestedStatus: GrowthStatus = 'seedling';

  // Check backlinks
  if (metrics.backlinksCount >= THRESHOLDS.backlinks.evergreen) {
    suggestedStatus = 'evergreen';
    reasons.push(`${metrics.backlinksCount} posts link to this (foundational content)`);
  } else if (metrics.backlinksCount >= THRESHOLDS.backlinks.budding) {
    if (suggestedStatus === 'seedling') suggestedStatus = 'budding';
    reasons.push(`${metrics.backlinksCount} post(s) link to this`);
  }

  // Check series followers
  if (metrics.seriesFollowers >= THRESHOLDS.seriesFollowers.evergreen) {
    suggestedStatus = 'evergreen';
    reasons.push(`Foundation of a ${metrics.seriesTotal}-part series`);
  } else if (metrics.seriesFollowers >= THRESHOLDS.seriesFollowers.budding) {
    if (suggestedStatus === 'seedling') suggestedStatus = 'budding';
    reasons.push(`Part ${metrics.seriesPosition} of ${metrics.seriesTotal} in series`);
  }

  // If no growth signals, explain why still seedling
  if (reasons.length === 0) {
    reasons.push('No backlinks or series followers yet');
  }

  return { status: suggestedStatus, reasons };
}

/**
 * Calculate growth for a single post
 */
export function calculateGrowth(
  post: Post,
  backlinksMap: Map<string, string[]>,
  seriesMap: Map<string, Post[]>
): GrowthResult {
  const metrics = calculateMetrics(post, backlinksMap, seriesMap);
  const { status: suggested, reasons } = suggestGrowth(metrics);

  return {
    suggested,
    current: post.data.growth,
    locked: post.data.growthLocked ?? false,
    metrics,
    reasons,
  };
}

/**
 * Calculate growth for all posts
 * Returns a map of postId -> GrowthResult
 */
export function calculateAllGrowth(posts: Post[]): Map<string, GrowthResult> {
  const backlinksMap = buildBacklinksMap(posts);
  const seriesMap = buildSeriesMap(posts);
  const results = new Map<string, GrowthResult>();

  for (const post of posts) {
    results.set(post.id, calculateGrowth(post, backlinksMap, seriesMap));
  }

  return results;
}

/**
 * Get the effective growth status for a post
 * Uses suggested growth unless manually locked
 */
export function getEffectiveGrowth(result: GrowthResult, autoGrowth: boolean): GrowthStatus {
  // If auto-growth is disabled, always use current (manual) setting
  if (!autoGrowth) {
    return result.current;
  }

  // If locked, use current (manual) setting
  if (result.locked) {
    return result.current;
  }

  // Use the higher of suggested vs current (posts only grow, never demote)
  const growthOrder: GrowthStatus[] = ['seedling', 'budding', 'evergreen'];
  const suggestedIndex = growthOrder.indexOf(result.suggested);
  const currentIndex = growthOrder.indexOf(result.current);

  return suggestedIndex > currentIndex ? result.suggested : result.current;
}
