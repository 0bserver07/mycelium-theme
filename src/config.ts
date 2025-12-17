/**
 * Mycelium Digital Garden Configuration
 *
 * This file contains all site-wide configuration options.
 * Update these values to customize your garden.
 */

export interface MyceliumConfig {
  // Site Identity
  site: string;
  name: string;
  gardener: string;
  description: string;
  language: string;

  // Appearance
  theme: ThemeName;
  fonts: {
    body: string;
    heading: string;
    mono: string;
  };

  // Navigation
  navigation: {
    items: NavigationItem[];
    showSocialLinks: boolean;
    social: SocialLink[];
  };

  // Features
  features: {
    darkMode: boolean;
    search: boolean;
    commandPalette: boolean;
    graphView: boolean;
    localGraph: boolean;
    backlinks: boolean;
    tableOfContents: boolean;
    comments: boolean;
    rss: boolean;
  };

  // Garden-specific settings
  garden: {
    showGrowthStatus: boolean;
    defaultStatus: GrowthStatus;
    showPlantedDate: boolean;
    showLastTended: boolean;
  };

  // Posts settings
  posts: {
    postsPerPage: number;
    showReadingTime: boolean;
    showWordCount: boolean;
    showTags: boolean;
  };

  // Comments (Giscus)
  comments?: {
    provider: 'giscus';
    repo: string;
    repoId: string;
    category: string;
    categoryId: string;
  };
}

export type ThemeName =
  | 'forest'      // Deep greens - default mycelium theme
  | 'ocean'       // Blues
  | 'sunset'      // Warm oranges/reds
  | 'minimal'     // Grayscale
  | 'nord'        // Nord color palette
  | 'rose'        // Pink/rose tones
  ;

export type GrowthStatus = 'seedling' | 'budding' | 'evergreen';

export interface NavigationItem {
  title: string;
  url: string;
  icon?: string;
}

export interface SocialLink {
  title: string;
  url: string;
  icon: string;
}

// ============================================================================
// SITE CONFIGURATION - Edit these values
// ============================================================================

export const siteConfig: MyceliumConfig = {
  // Site Identity
  site: 'https://example.com',
  name: 'My Digital Garden',
  gardener: 'Your Name',
  description: 'A digital garden of interconnected thoughts and ideas.',
  language: 'en',

  // Appearance
  theme: 'forest',
  fonts: {
    body: 'Inter',
    heading: 'Inter',
    mono: 'JetBrains Mono',
  },

  // Navigation
  navigation: {
    items: [
      { title: 'Garden', url: '/posts/' },
      { title: 'Projects', url: '/projects/' },
      { title: 'Docs', url: '/docs/' },
      { title: 'About', url: '/about/' },
    ],
    showSocialLinks: true,
    social: [
      { title: 'GitHub', url: 'https://github.com', icon: 'github' },
      { title: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
    ],
  },

  // Features
  features: {
    darkMode: true,
    search: true,
    commandPalette: true,
    graphView: true,
    localGraph: true,
    backlinks: true,
    tableOfContents: true,
    comments: false, // Enable when you configure Giscus
    rss: true,
  },

  // Garden settings
  garden: {
    showGrowthStatus: true,
    defaultStatus: 'seedling',
    showPlantedDate: true,
    showLastTended: true,
  },

  // Posts settings
  posts: {
    postsPerPage: 10,
    showReadingTime: true,
    showWordCount: false,
    showTags: true,
  },

  // Uncomment and configure when ready for comments
  // comments: {
  //   provider: 'giscus',
  //   repo: 'your-username/your-repo',
  //   repoId: 'your-repo-id',
  //   category: 'Comments',
  //   categoryId: 'your-category-id',
  // },
};

export default siteConfig;
