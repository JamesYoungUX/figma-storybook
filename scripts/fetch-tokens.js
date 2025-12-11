#!/usr/bin/env node

/**
 * Fetch Design Tokens from GitHub
 * 
 * This script fetches design tokens from a GitHub repository and converts them
 * to CSS custom properties for use in Storybook.
 * 
 * Usage:
 *   node scripts/fetch-tokens.js
 * 
 * Environment Variables (create a .env file):
 *   GITHUB_TOKEN=your_github_personal_access_token
 *   GITHUB_REPO=username/repository
 *   GITHUB_BRANCH=main (optional, defaults to 'main')
 *   TOKENS_PATH=path/to/tokens.json (path in the repo)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
    githubToken: process.env.GITHUB_TOKEN,
    githubRepo: process.env.GITHUB_REPO,
    githubBranch: process.env.GITHUB_BRANCH || 'main',
    tokensPath: process.env.TOKENS_PATH || 'design-tokens.json',
    outputPath: path.join(__dirname, '../src/design-tokens.css'),
};

/**
 * Fetch file content from GitHub
 */
async function fetchFromGitHub(repo, branch, filePath, token) {
    const url = `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`;

    const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Storybook-Token-Fetcher',
    };

    if (token) {
        headers['Authorization'] = `token ${token}`;
    }

    try {
        const response = await fetch(url, { headers });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Decode base64 content
        const content = Buffer.from(data.content, 'base64').toString('utf-8');
        return content;
    } catch (error) {
        console.error('Error fetching from GitHub:', error.message);
        throw error;
    }
}

/**
 * Convert design tokens JSON to CSS custom properties
 */
function convertTokensToCSS(tokens) {
    let css = `/* Design Tokens - Auto-generated from GitHub */\n`;
    css += `/* Last updated: ${new Date().toISOString()} */\n\n`;
    css += `:root {\n`;

    // Helper function to process nested token objects
    function processTokens(obj, prefix = '') {
        const lines = [];

        for (const [key, value] of Object.entries(obj)) {
            const tokenName = prefix ? `${prefix}-${key}` : key;

            if (value && typeof value === 'object' && !Array.isArray(value)) {
                // Check if it's a token object with a 'value' property
                if (value.value !== undefined) {
                    lines.push(`  --${tokenName}: ${value.value};`);
                } else {
                    // Recursively process nested objects
                    lines.push(...processTokens(value, tokenName));
                }
            } else {
                // Direct value
                lines.push(`  --${tokenName}: ${value};`);
            }
        }

        return lines;
    }

    const tokenLines = processTokens(tokens);
    css += tokenLines.join('\n');
    css += '\n}\n\n';

    // Add base styles
    css += `/* Base Styles */\n`;
    css += `* {\n`;
    css += `  box-sizing: border-box;\n`;
    css += `  margin: 0;\n`;
    css += `  padding: 0;\n`;
    css += `}\n\n`;
    css += `body {\n`;
    css += `  font-family: var(--font-family-base, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);\n`;
    css += `  font-size: var(--font-size-base, 1rem);\n`;
    css += `  line-height: 1.5;\n`;
    css += `  color: var(--color-neutral-900, #111827);\n`;
    css += `  background-color: var(--color-neutral-50, #f9fafb);\n`;
    css += `}\n`;

    return css;
}

/**
 * Main function
 */
async function main() {
    console.log('🎨 Fetching design tokens from GitHub...\n');

    // Validate configuration
    if (!config.githubRepo) {
        console.error('❌ Error: GITHUB_REPO environment variable is required');
        console.log('\nPlease create a .env file with:');
        console.log('  GITHUB_REPO=username/repository');
        console.log('  GITHUB_TOKEN=your_token (optional for public repos)');
        console.log('  TOKENS_PATH=path/to/tokens.json');
        process.exit(1);
    }

    console.log(`📦 Repository: ${config.githubRepo}`);
    console.log(`🌿 Branch: ${config.githubBranch}`);
    console.log(`📄 File: ${config.tokensPath}\n`);

    try {
        // Fetch tokens from GitHub
        const tokensContent = await fetchFromGitHub(
            config.githubRepo,
            config.githubBranch,
            config.tokensPath,
            config.githubToken
        );

        // Parse JSON
        const tokens = JSON.parse(tokensContent);
        console.log('✅ Successfully fetched tokens from GitHub');

        // Convert to CSS
        const css = convertTokensToCSS(tokens);
        console.log('✅ Converted tokens to CSS custom properties');

        // Write to file
        fs.writeFileSync(config.outputPath, css, 'utf-8');
        console.log(`✅ Saved to ${config.outputPath}`);

        console.log('\n🎉 Design tokens updated successfully!');
        console.log('\n💡 Tip: Storybook will hot-reload with the new tokens');
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

export { fetchFromGitHub, convertTokensToCSS };
