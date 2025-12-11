# Deploying to Vercel

## 🚀 Quick Deploy

### Option 1: Deploy with Vercel CLI (Fastest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - What's your project's name? figma-storybook (or whatever you want)
# - In which directory is your code located? ./
# - Want to override settings? No
```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repo (you'll need to push to GitHub first)
4. Vercel will auto-detect the settings from `vercel.json`
5. Click **"Deploy"**

## 🔄 Automatic Updates

Once deployed, Vercel will automatically:
- ✅ Rebuild when you push to GitHub
- ✅ Update Storybook with new tokens
- ✅ Give you a live URL

## 📋 Complete Workflow

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial Storybook with Figma tokens"
git branch -M main
git remote add origin https://github.com/jamesyoung-tech/YOUR-REPO-NAME.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel detects settings automatically
4. Click **Deploy**
5. Get your live URL! (e.g., `your-storybook.vercel.app`)

### Step 3: Set Up Auto-Deploy

**Option A: GitHub Actions + Vercel**

The GitHub Action I created will:
1. Pull new tokens
2. Commit to GitHub
3. Vercel auto-deploys on commit

**Option B: Vercel Deploy Hook (Instant!)**

1. In Vercel dashboard → Settings → Git → Deploy Hooks
2. Create a hook named "Token Update"
3. Copy the webhook URL
4. Add to your Figma-to-CSS app:

```javascript
// After saving tokens to GitHub
await fetch('YOUR_VERCEL_DEPLOY_HOOK_URL', { method: 'POST' });
```

This triggers instant rebuild!

## 🎯 The Automated Flow

```
Designer changes Figma
         ↓
Your web app saves to GitHub
         ↓
Triggers Vercel deploy hook
         ↓
Vercel pulls latest tokens
         ↓
Builds Storybook
         ↓
Deploys to your-storybook.vercel.app
         ↓
Live in ~30 seconds! 🎉
```

## 🔧 Environment Variables (if needed)

If you need GitHub tokens for the build:

1. Vercel Dashboard → Settings → Environment Variables
2. Add: `GITHUB_TOKEN` = your token
3. Redeploy

## 📊 What You Get

- ✅ **Live URL**: Share with your team
- ✅ **Auto-updates**: Every GitHub push rebuilds
- ✅ **Preview deployments**: Every PR gets a preview URL
- ✅ **Fast**: Vercel's CDN is super fast
- ✅ **Free**: For personal projects

## 🎨 Next Steps

1. **Deploy now**: `vercel` (or use dashboard)
2. **Get your URL**: `your-project.vercel.app`
3. **Set up deploy hook**: For instant updates
4. **Share with team**: They can see live components!

---

**Ready to deploy?** Run `vercel` in your terminal!
