#!/bin/bash

# Pull Design Tokens from GitHub (using API to avoid caching)
# This script fetches your latest tokens from GitHub and updates Storybook

echo "🎨 Pulling design tokens from GitHub..."
echo ""

# Use GitHub API instead of raw URL to avoid CDN caching
curl -H "Accept: application/vnd.github.v3.raw" \
     "https://api.github.com/repos/jamesyoung-tech/tokens-test/contents/tokens/design-tokens.json" \
     -o tokens/design-tokens.json

# Import tokens from local file
npm run import-tokens tokens/design-tokens.json

echo ""
echo "✅ Done! Check Storybook at http://localhost:6006"
echo "   Your tokens are now in src/design-tokens.css"
