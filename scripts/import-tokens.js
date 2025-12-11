#!/usr/bin/env node

/**
 * Simple Token Importer - MERGING VERSION
 * 
 * This script imports design tokens from GitHub and MERGES them with existing demo tokens
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_PATH = path.join(__dirname, '../src/design-tokens.css');

// Demo tokens that components need
const DEMO_TOKENS = {
    'color-primary': '#6366f1',
    'color-primary-hover': '#4f46e5',
    'color-secondary': '#8b5cf6',
    'color-success': '#10b981',
    'color-warning': '#f59e0b',
    'color-error': '#ef4444',
    'color-neutral-50': '#f9fafb',
    'color-neutral-100': '#f3f4f6',
    'color-neutral-200': '#e5e7eb',
    'color-neutral-300': '#d1d5db',
    'color-neutral-700': '#374151',
    'color-neutral-900': '#111827',
    'font-family-base': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    'font-size-xs': '0.75rem',
    'font-size-sm': '0.875rem',
    'font-size-base': '1rem',
    'font-size-lg': '1.125rem',
    'font-size-xl': '1.25rem',
    'font-size-2xl': '1.5rem',
    'font-size-3xl': '1.875rem',
    'font-weight-normal': '400',
    'font-weight-medium': '500',
    'font-weight-semibold': '600',
    'font-weight-bold': '700',
    'spacing-xs': '0.25rem',
    'spacing-sm': '0.5rem',
    'spacing-md': '1rem',
    'spacing-lg': '1.5rem',
    'spacing-xl': '2rem',
    'spacing-2xl': '3rem',
    'radius-sm': '0.25rem',
    'radius-md': '0.5rem',
    'radius-lg': '0.75rem',
    'radius-xl': '1rem',
    'radius-full': '9999px',
    'shadow-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    'shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    'shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    'shadow-xl': '0 20px 25px -5px rgb(0 0 0 / 0.1)'
};

async function getContent(source) {
    if (source.startsWith('http://') || source.startsWith('https://')) {
        console.log(`📥 Fetching from URL: ${source}`);
        const response = await fetch(source);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    } else {
        console.log(`📂 Reading from file: ${source}`);
        return fs.readFileSync(source, 'utf-8');
    }
}

function tokensToCSS(githubTokens) {
    let css = `/* Design Tokens - Auto-generated */\n`;
    css += `/* Updated: ${new Date().toLocaleString()} */\n\n`;
    css += `:root {\n`;

    // First, add GitHub tokens
    css += `  /* Your tokens from GitHub */\n`;
    function flatten(obj, prefix = '') {
        const result = [];
        for (const [key, value] of Object.entries(obj)) {
            const cssKey = prefix ? `${prefix}-${key}` : key;
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                if (value.value !== undefined) {
                    result.push(`  --${cssKey}: ${value.value};`);
                } else {
                    result.push(...flatten(value, cssKey));
                }
            } else {
                result.push(`  --${cssKey}: ${value};`);
            }
        }
        return result;
    }
    css += flatten(githubTokens).join('\n');

    // Then add demo tokens
    css += '\n\n  /* Demo tokens for example components */\n';
    for (const [key, value] of Object.entries(DEMO_TOKENS)) {
        css += `  --${key}: ${value};\n`;
    }

    css += '}\n\n';

    // Add base styles
    css += `/* Base Styles */\n`;
    css += `* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n`;
    css += `body {\n`;
    css += `  font-family: var(--font-family-base, -apple-system, sans-serif);\n`;
    css += `  font-size: var(--font-size-base, 1rem);\n`;
    css += `  line-height: 1.5;\n`;
    css += `  color: var(--color-text, #111827);\n`;
    css += `  background-color: var(--color-background, #ffffff);\n`;
    css += `}\n`;

    return css;
}

async function main() {
    const source = process.argv[2];

    if (!source) {
        console.error('❌ Error: Please provide a source (file path or URL)');
        console.log('\nUsage:');
        console.log('  node scripts/import-tokens.js path/to/tokens.json');
        console.log('  node scripts/import-tokens.js https://example.com/tokens.json');
        process.exit(1);
    }

    try {
        console.log('\n🎨 Importing design tokens...\n');

        const content = await getContent(source);
        const tokens = JSON.parse(content);

        console.log('✅ Parsed tokens successfully');
        console.log(`📊 Found ${Object.keys(tokens).length} top-level token categories\n`);

        const css = tokensToCSS(tokens);
        fs.writeFileSync(OUTPUT_PATH, css, 'utf-8');

        console.log(`✅ Saved to: ${OUTPUT_PATH}`);
        console.log('\n🎉 Done! Your Storybook will hot-reload with the new tokens.\n');
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

main();
