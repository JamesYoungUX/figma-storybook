# Importing Design Tokens from GitHub

This guide explains how to pull your design tokens from GitHub into this Storybook project.

## 🎯 Quick Start

### Option 1: Import from GitHub Raw URL (Easiest)

If your tokens are in a public GitHub repository:

```bash
npm run import-tokens https://raw.githubusercontent.com/USERNAME/REPO/main/path/to/tokens.json
```

**Example:**
```bash
npm run import-tokens https://raw.githubusercontent.com/jamesyoung/figma-tokens/main/design-tokens.json
```

### Option 2: Import from Local File

If you've cloned your tokens repository locally:

```bash
npm run import-tokens ../path/to/your/tokens.json
```

**Example:**
```bash
npm run import-tokens ../figma-to-css/public/design-tokens.json
```

### Option 3: Fetch from GitHub API (With Authentication)

For private repositories or to avoid rate limits:

1. **Create a `.env` file** (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` and add your details**:
   ```env
   GITHUB_TOKEN=ghp_your_token_here
   GITHUB_REPO=username/repository
   GITHUB_BRANCH=main
   TOKENS_PATH=design-tokens.json
   ```

3. **Run the fetch script**:
   ```bash
   npm run fetch-tokens
   ```

## 📋 Prerequisites

### Getting a GitHub Personal Access Token

1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name like "Storybook Token Fetcher"
4. Select scopes:
   - For **public repos**: No scopes needed
   - For **private repos**: Check `repo` scope
5. Click "Generate token"
6. Copy the token (you won't see it again!)

## 📊 Token Format

Your tokens JSON should follow this structure:

```json
{
  "colors": {
    "primary": "#6366f1",
    "secondary": "#8b5cf6",
    "success": {
      "value": "#10b981",
      "description": "Success state color"
    }
  },
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem"
  },
  "typography": {
    "font-family": {
      "base": "'Inter', sans-serif"
    },
    "font-size": {
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem"
    }
  }
}
```

The scripts will convert this to CSS custom properties:

```css
:root {
  --colors-primary: #6366f1;
  --colors-secondary: #8b5cf6;
  --colors-success: #10b981;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --typography-font-family-base: 'Inter', sans-serif;
  --typography-font-size-sm: 0.875rem;
  --typography-font-size-base: 1rem;
  --typography-font-size-lg: 1.125rem;
}
```

## 🔄 Workflow Integration

### Manual Updates

Whenever you update tokens in your Figma-to-CSS project:

```bash
# If using GitHub
npm run import-tokens https://raw.githubusercontent.com/user/repo/main/tokens.json

# If using local file
npm run import-tokens ../figma-to-css/tokens.json
```

Storybook will automatically hot-reload with the new tokens!

### Automated Updates with GitHub Actions

Create `.github/workflows/update-tokens.yml`:

```yaml
name: Update Design Tokens

on:
  repository_dispatch:
    types: [tokens-updated]
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Fetch tokens
        env:
          GITHUB_TOKEN: ${{ secrets.TOKENS_REPO_TOKEN }}
          GITHUB_REPO: username/tokens-repo
          TOKENS_PATH: design-tokens.json
        run: npm run fetch-tokens
      
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add src/design-tokens.css
          git commit -m "Update design tokens" || echo "No changes"
          git push
      
      - name: Deploy Storybook
        run: |
          npm run build-storybook
          # Add your deployment commands here
```

### Webhook from Figma-to-CSS App

In your Figma-to-CSS web app, after saving tokens to GitHub, trigger a webhook:

```javascript
// In your web app after GitHub commit
async function triggerStorybookUpdate() {
  await fetch('https://api.github.com/repos/username/storybook-repo/dispatches', {
    method: 'POST',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event_type: 'tokens-updated'
    })
  });
}
```

## 🛠️ Customizing Token Conversion

If you need custom token conversion logic, edit `scripts/import-tokens.js`:

```javascript
// Example: Add custom naming conventions
function tokensToCSS(tokens) {
  // Your custom logic here
  // For example, flatten color tokens differently
  if (tokens.colors) {
    for (const [name, value] of Object.entries(tokens.colors)) {
      css += `  --color-${name}: ${value};\n`;
    }
  }
}
```

## 📁 File Locations

- **Tokens source**: Your GitHub repository or local file
- **Generated CSS**: `src/design-tokens.css`
- **Import scripts**: `scripts/import-tokens.js` and `scripts/fetch-tokens.js`
- **Configuration**: `.env` (create from `.env.example`)

## 🔍 Troubleshooting

### "GITHUB_REPO environment variable is required"

Create a `.env` file with your repository details.

### "HTTP error! status: 404"

- Check the URL is correct
- For private repos, make sure you have a valid `GITHUB_TOKEN`
- Verify the file path in the repository

### "Unexpected token in JSON"

Your tokens file might not be valid JSON. Validate it at [jsonlint.com](https://jsonlint.com)

### Tokens not updating in Storybook

- Check that `src/design-tokens.css` was updated
- Storybook should hot-reload automatically
- Try refreshing the browser if needed

## 💡 Tips

1. **Version Control**: Commit the generated `design-tokens.css` so you have a history
2. **CI/CD**: Automate token updates in your deployment pipeline
3. **Documentation**: Keep token descriptions in your JSON for better documentation
4. **Validation**: Add a validation step to ensure tokens meet your standards

## 🎨 Example: Complete Workflow

1. **Designer updates Figma**
2. **Designer uses your Figma-to-CSS web app** (localhost:3000)
3. **App extracts tokens and commits to GitHub**
4. **Webhook triggers Storybook update** (or manual import)
5. **Storybook rebuilds with new tokens**
6. **Team reviews updated components in Storybook**

---

**Need help?** Check the scripts in the `scripts/` directory or refer to the main README.md
