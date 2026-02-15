# Security

If you find a security vulnerability in Mycelium, please report it privately rather than opening a public issue.

## Reporting

Email **security@yad.codes** with:

- A description of the vulnerability
- Steps to reproduce
- Which version you're running (`npm pkg get version`)

You should hear back within 48 hours. If the issue is confirmed, a patch will be released and you'll be credited in the changelog (unless you prefer otherwise).

## Scope

Mycelium is a static site generator theme. It has no server, no database, and no authentication. The main risk surface is:

- Remark/Rehype plugins processing untrusted markdown (XSS via rendered HTML)
- Dependencies with known CVEs
- The setup script (`scripts/setup.mjs`) writing to `src/config.ts`

If you find an issue in a dependency, please report it upstream and open a Mycelium issue so we can pin or patch.
