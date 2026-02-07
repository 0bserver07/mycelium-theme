# Contributing to Mycelium

Thanks for your interest in contributing to Mycelium! This project is a digital garden theme built with Astro and Obsidian.

## How to Contribute

### Reporting Issues

- Use [GitHub Issues](https://github.com/0bserver07/mycelium-theme/issues) to report bugs or suggest features
- Include your Node.js version, OS, and steps to reproduce
- Screenshots are helpful for UI issues

### Pull Requests

1. Fork the repository
2. Create a branch from `master` (`git checkout -b my-fix`)
3. Make your changes
4. Test locally with `npm run dev` and `npm run build`
5. Submit a pull request

### What to Contribute

**Welcome contributions:**
- Bug fixes
- Accessibility improvements
- Performance improvements
- New remark/rehype plugins
- New color themes (add to `src/themes/`)
- Documentation improvements

**Please discuss first (open an issue):**
- New features that change the default behavior
- Breaking changes to config schema
- Major architectural changes

## Project Structure

Understanding the separation is important:

| Directory | Purpose | Upstream-controlled? |
|-----------|---------|---------------------|
| `src/components/` | Theme UI components | Yes |
| `src/layouts/` | Page layouts | Yes |
| `src/pages/` | Route definitions | Yes |
| `src/styles/` | Global CSS | Yes |
| `src/themes/` | Color themes | Yes |
| `src/utils/` | Remark/Rehype plugins | Yes |
| `src/content/posts/` | Sample/draft posts | No (user content) |
| `src/content/pages/` | Sample pages | No (user content) |
| `src/config.ts` | Site configuration | Template only |

Theme contributions go in the upstream-controlled directories. Sample content ships as `draft: true`.

## Development Setup

```bash
git clone https://github.com/0bserver07/mycelium-theme.git
cd mycelium-theme
npm install
npm run dev
```

Open `src/content/` in Obsidian to test the full writing experience.

## Style Guidelines

- Keep components focused and single-purpose
- Use Tailwind utility classes; avoid custom CSS when possible
- Remark plugins should be self-contained in `src/utils/`
- Test with both light and dark mode
- Test with multiple themes (at minimum: sage, ocean, minimal)

## Adding a Color Theme

1. Add your theme object to `src/themes/index.ts`
2. Follow the existing pattern (light + dark variants)
3. Test all page types (post, project, docs, index)
4. Submit a PR with a screenshot

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
