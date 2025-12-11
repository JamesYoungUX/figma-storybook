# Your Figma-to-Storybook Workflow

## 🎯 The Simple Truth

You **DON'T need the Figma Tokens Studio plugin** because you already have your own Figma-to-CSS extractor app!

## ✅ What You Already Have

1. **Figma-to-CSS Web App** (localhost:3000)
   - Extracts design tokens from Figma
   - Saves to GitHub

2. **This Storybook Project**
   - Displays components
   - Uses design tokens

## 🔄 Your Complete Workflow

```
┌─────────────┐
│   Figma     │
│   Design    │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ Your Web App        │
│ (localhost:3000)    │
│ - Extract tokens    │
│ - Save to GitHub    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ GitHub Repository   │
│ design-tokens.json  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Pull tokens here    │
│ (2 options below)   │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Style Dictionary    │
│ (optional transform)│
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ src/design-tokens   │
│ .css                │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Storybook           │
│ Hot Reload! 🔥      │
└─────────────────────┘
```

## 📋 Two Options to Pull Tokens

### Option 1: Direct Import (Simplest)

If your Figma app already outputs CSS:

```bash
# Pull from GitHub
npm run import-tokens https://raw.githubusercontent.com/USER/REPO/main/tokens.css

# Or from local file
npm run import-tokens ../your-figma-app/output/tokens.css
```

Done! Storybook updates automatically.

### Option 2: With Style Dictionary (More Power)

If your Figma app outputs JSON and you want transformations:

1. **Your app saves JSON to GitHub:**
   ```json
   {
     "colors": {
       "primary": { "value": "#6366f1" }
     }
   }
   ```

2. **Pull the JSON:**
   ```bash
   # Download to tokens/ folder
   curl https://raw.githubusercontent.com/USER/REPO/main/tokens.json -o tokens/design-tokens.json
   ```

3. **Transform with Style Dictionary:**
   ```bash
   npm run build-tokens
   ```

4. **Result:** `src/design-tokens.css` with CSS variables

## 🚀 Quick Setup

### Step 1: Where are your tokens in GitHub?

Find the URL to your tokens file. Example:
```
https://github.com/jamesyoung/figma-tokens/blob/main/design-tokens.json
```

### Step 2: Get the RAW URL

Click "Raw" button or change URL to:
```
https://raw.githubusercontent.com/jamesyoung/figma-tokens/main/design-tokens.json
```

### Step 3: Choose your method

**If your app outputs CSS:**
```bash
npm run import-tokens https://raw.githubusercontent.com/USER/REPO/main/tokens.css
```

**If your app outputs JSON:**
```bash
# Download
curl https://raw.githubusercontent.com/USER/REPO/main/tokens.json -o tokens/design-tokens.json

# Transform
npm run build-tokens
```

## 🔧 What Format Does Your App Output?

Check your Figma-to-CSS app (localhost:3000). When it saves to GitHub, does it save:

- **CSS file** (`.css`) with `--variable-name: value;` → Use Option 1
- **JSON file** (`.json`) with token objects → Use Option 2

## 💡 Recommended: Automate It!

Add this to your Figma-to-CSS app after it commits to GitHub:

```javascript
// After successful GitHub commit
const storybookRepo = 'https://api.github.com/repos/USER/storybook-repo/dispatches';

fetch(storybookRepo, {
  method: 'POST',
  headers: {
    'Authorization': `token ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    event_type: 'tokens-updated'
  })
});
```

Then create `.github/workflows/update-tokens.yml` in this repo to auto-pull and rebuild.

## 📖 What's Style Dictionary For?

Style Dictionary is useful if you need to:
- Convert px to rem
- Transform color formats
- Generate multiple output formats (CSS, SCSS, JSON, etc.)
- Add prefixes or transformations

**You only need it if your token format needs transformation!**

## ❓ What Do You Need Help With?

1. **What format does your Figma-to-CSS app output?** (CSS or JSON?)
2. **Where in GitHub are the tokens saved?** (repo and file path)
3. **Do you want automatic updates or manual?**

Once I know these, I can give you the exact commands to run!

---

**Bottom line:** You're 90% there! You just need to pull your tokens from GitHub into this Storybook project. No plugins needed. 🎉
