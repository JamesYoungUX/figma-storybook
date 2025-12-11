# 🎨 How to Pull Tokens from GitHub - Quick Guide

## ✅ What's Been Set Up

I've created a complete system for importing design tokens from GitHub into your Storybook:

### 📁 New Files Created

1. **`scripts/import-tokens.js`** - Simple script to import from URL or local file
2. **`scripts/fetch-tokens.js`** - Advanced script with GitHub API authentication
3. **`.env.example`** - Template for GitHub configuration
4. **`IMPORTING_TOKENS.md`** - Comprehensive guide with all details
5. **`example-tokens.json`** - Example token format

### 🚀 New NPM Scripts

```json
{
  "fetch-tokens": "node scripts/fetch-tokens.js",
  "import-tokens": "node scripts/import-tokens.js"
}
```

## 🎯 Three Ways to Import Tokens

### Method 1: GitHub Raw URL (Easiest - No Setup Required)

Perfect for public repositories:

```bash
npm run import-tokens https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO/main/design-tokens.json
```

**Example:**
```bash
npm run import-tokens https://raw.githubusercontent.com/jamesyoung/figma-tokens/main/tokens.json
```

### Method 2: Local File Path

If you have the tokens file locally:

```bash
npm run import-tokens ../your-other-project/tokens.json
```

### Method 3: GitHub API (For Private Repos)

1. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env`:
   ```env
   GITHUB_TOKEN=your_github_token
   GITHUB_REPO=username/repository
   TOKENS_PATH=design-tokens.json
   ```

3. Run:
   ```bash
   npm run fetch-tokens
   ```

## 📊 Expected Token Format

Your JSON should look like this:

```json
{
  "colors": {
    "primary": "#6366f1",
    "secondary": "#8b5cf6"
  },
  "spacing": {
    "sm": "0.5rem",
    "md": "1rem"
  },
  "typography": {
    "font-size": {
      "base": "1rem",
      "lg": "1.125rem"
    }
  }
}
```

This converts to:

```css
:root {
  --colors-primary: #6366f1;
  --colors-secondary: #8b5cf6;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --typography-font-size-base: 1rem;
  --typography-font-size-lg: 1.125rem;
}
```

## ✨ What Happens When You Import

1. Script fetches your tokens (from GitHub or local file)
2. Converts JSON to CSS custom properties
3. Saves to `src/design-tokens.css`
4. **Storybook automatically hot-reloads** with new tokens!
5. All components using those tokens update instantly

## 🔗 Integration with Your Figma-to-CSS App

Based on your conversation history, you have a Figma-to-CSS app at `localhost:3000` with a "Save to GitHub" feature. Here's the workflow:

1. **Designer uses Figma-to-CSS app** → Extracts tokens
2. **App saves tokens to GitHub** → Commits `design-tokens.json`
3. **Run import command** → Updates Storybook
   ```bash
   npm run import-tokens https://raw.githubusercontent.com/USER/REPO/main/design-tokens.json
   ```
4. **Storybook updates** → Components reflect new design tokens

### Automate It!

Add this to your Figma-to-CSS app after GitHub commit:

```javascript
// After successfully committing to GitHub
console.log('✅ Tokens saved to GitHub!');
console.log('📝 To update Storybook, run:');
console.log(`   npm run import-tokens https://raw.githubusercontent.com/${repo}/main/design-tokens.json`);
```

Or create a webhook to trigger automatic updates (see `IMPORTING_TOKENS.md` for details).

## 🧪 Test It Now!

I've already tested it with the example file:

```bash
npm run import-tokens example-tokens.json
```

Result: ✅ Successfully generated `src/design-tokens.css`

## 📖 Full Documentation

For complete details, workflows, troubleshooting, and automation:
- See **[IMPORTING_TOKENS.md](./IMPORTING_TOKENS.md)**

## 🎯 Next Steps

1. **Find your tokens**: Where are they stored in GitHub?
2. **Get the URL**: Right-click the file in GitHub → "Copy raw file URL"
3. **Import**: Run `npm run import-tokens <URL>`
4. **Enjoy**: Watch Storybook update with your real design tokens!

---

**Questions?** All scripts have helpful error messages and the full guide is in `IMPORTING_TOKENS.md`
