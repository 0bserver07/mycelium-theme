---
title: Deployment Guide
description: How to deploy your Mycelium garden to various platforms
category: basics
order: 4
---

# Deployment Guide

Mycelium generates static files that can be deployed anywhere.

## Build

First, build your site:

```bash
npm run build
```

Output is in the `dist/` folder.

## Deployment Options

### Netlify (Recommended)

1. Push to GitHub
2. Connect repo to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

Or use the CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Vercel

```bash
npm install -g vercel
vercel --prod
```

Or connect via the Vercel dashboard.

### GitHub Pages

Add to `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://username.github.io',
  base: '/repo-name',
});
```

Then build and push to `gh-pages` branch.

### Cloudflare Pages

1. Connect repo in Cloudflare dashboard
2. Build settings:
   - Build command: `npm run build`
   - Build output: `dist`

### Self-Hosted

Copy `dist/` contents to any static hosting:

```bash
scp -r dist/* user@server:/var/www/html/
```

## Environment Variables

Set production URLs:

```bash
# Netlify/Vercel
PUBLIC_SITE_URL=https://your-domain.com
```

## Custom Domain

1. Add domain in host dashboard
2. Update DNS records
3. Update `site` in `astro.config.mjs`

## Preview Builds

Most platforms create preview deployments for PRs:

- Netlify: `deploy-preview-123.netlify.app`
- Vercel: `project-git-branch.vercel.app`

## Continuous Deployment

Push to main → automatic deployment. That's it!
