#!/usr/bin/env node

/**
 * Mycelium Garden Setup Script
 * Run with: npm run setup
 */

import { createInterface } from 'readline';
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log('\n🌱 Mycelium Garden Setup\n');
  console.log('This will configure your garden.\n');

  // Get site info
  const siteName = await ask('Site name (e.g., "My Digital Garden"): ') || 'My Digital Garden';
  const gardener = await ask('Your name: ') || 'Gardener';
  const siteUrl = await ask('Site URL (e.g., https://mysite.com): ') || 'https://example.com';
  const description = await ask('Site description: ') || 'A digital garden of interconnected thoughts.';

  // Social links
  console.log('\nSocial links (leave blank to skip):');
  const github = await ask('GitHub URL: ');
  const twitter = await ask('Twitter/X URL: ');

  // Git remote
  console.log('\nGit repository:');
  const gitRemote = await ask('Your GitHub repo URL (e.g., https://github.com/user/repo): ');

  // Update config.ts
  console.log('\nUpdating src/config.ts...');
  const configPath = join(rootDir, 'src', 'config.ts');
  let config = readFileSync(configPath, 'utf-8');

  // Escape quotes in user input
  const escapeForJs = (str) => str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');

  config = config.replace(/site: ['"].*['"]/, `site: '${escapeForJs(siteUrl)}'`);
  config = config.replace(/name: ['"].*['"]/, `name: '${escapeForJs(siteName)}'`);
  config = config.replace(/gardener: ['"].*['"]/, `gardener: '${escapeForJs(gardener)}'`);
  config = config.replace(/description: ['"].*['"]/, `description: '${escapeForJs(description)}'`);

  // Update social links
  const socialLinks = [];
  if (github) {
    const ghUrl = github.startsWith('http') ? github : `https://github.com/${github}`;
    socialLinks.push(`      { title: 'GitHub', url: '${escapeForJs(ghUrl)}', icon: 'github' }`);
  }
  if (twitter) {
    const twUrl = twitter.startsWith('http') ? twitter : `https://twitter.com/${twitter}`;
    socialLinks.push(`      { title: 'Twitter', url: '${escapeForJs(twUrl)}', icon: 'twitter' }`);
  }

  if (socialLinks.length > 0) {
    const socialRegex = /social: \[[\s\S]*?\]/;
    config = config.replace(socialRegex, `social: [\n${socialLinks.join(',\n')}\n    ]`);
  }

  writeFileSync(configPath, config);
  console.log('✓ Config updated');

  // Update git remote
  if (gitRemote) {
    console.log('\nUpdating git remote...');
    try {
      execSync('git remote remove origin', { cwd: rootDir, stdio: 'ignore' });
    } catch (e) {
      // ignore if no origin
    }
    try {
      execSync(`git remote add origin ${gitRemote}`, { cwd: rootDir });
      console.log('✓ Git remote set to', gitRemote);
    } catch (e) {
      console.log('⚠ Could not set git remote:', e.message);
    }
  }

  console.log('\n✅ Setup complete!\n');
  console.log('Next steps:');
  console.log('1. Open src/content/ in Obsidian');
  console.log('2. Settings → Community plugins → Turn off Restricted mode');
  console.log('3. Run: npm run dev');
  console.log('');

  rl.close();
}

main().catch((err) => {
  console.error('Setup failed:', err);
  rl.close();
  process.exit(1);
});
