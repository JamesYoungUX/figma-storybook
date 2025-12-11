#!/bin/bash

# Build script for Vercel
# This pulls the latest tokens before building Storybook

echo "🎨 Pulling latest design tokens from GitHub..."

# Pull tokens using GitHub API
curl -H "Accept: application/vnd.github.v3.raw" \
     "https://api.github.com/repos/jamesyoung-tech/tokens-test/contents/tokens/design-tokens.json" \
     -o tokens/design-tokens.json

# Import tokens
npm run import-tokens tokens/design-tokens.json

echo "✅ Tokens updated, building Storybook..."

# Build Storybook
npm run build-storybook
