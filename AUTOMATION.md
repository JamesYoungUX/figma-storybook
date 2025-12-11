# Automating Design Token Updates

## 🎯 Goal
Automatically update Storybook when tokens are saved to GitHub from your Figma-to-CSS app.

## ✅ What I Set Up

### 1. GitHub Actions Workflow (`.github/workflows/update-tokens.yml`)

This workflow runs automatically and:
- ✅ Pulls latest tokens from your `tokens-test` repo
- ✅ Updates `src/design-tokens.css`
- ✅ Commits changes automatically
- ✅ Builds Storybook

**Triggers:**
- **Repository Dispatch**: When your Figma app sends a webhook
- **Schedule**: Every 5 minutes (for testing - adjust as needed)
- **Manual**: You can trigger it manually from GitHub Actions tab

## 🚀 How to Complete the Automation

### Option 1: Webhook from Your Figma-to-CSS App (Recommended)

Add this to your web app **after it successfully saves to GitHub**:

```javascript
// After your app commits tokens to GitHub
async function notifyStorybook() {
  const GITHUB_TOKEN = 'your_github_token_here'; // Create at github.com/settings/tokens
  const STORYBOOK_REPO = 'jamesyoung-tech/YOUR-STORYBOOK-REPO-NAME';
  
  try {
    const response = await fetch(`https://api.github.com/repos/${STORYBOOK_REPO}/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: 'tokens-updated'
      })
    });
    
    if (response.ok) {
      console.log('✅ Storybook will update automatically!');
    }
  } catch (error) {
    console.error('Failed to notify Storybook:', error);
  }
}

// Call this after GitHub commit succeeds
await saveToGitHub(); // Your existing function
await notifyStorybook(); // New function
```

### Option 2: Use the Schedule (Simpler, but slower)

The workflow is already set to check every 5 minutes. You can:
- **Keep it as is** - Storybook updates within 5 minutes
- **Adjust the schedule** - Change `*/5` to `*/1` for every minute
- **Remove the schedule** - Only use webhook (Option 1)

### Option 3: Manual Trigger

Go to your Storybook repo on GitHub:
1. Click **Actions** tab
2. Click **Update Design Tokens** workflow
3. Click **Run workflow**

## 📋 Setup Steps

### 1. Push This Repo to GitHub

```bash
# If you haven't already
git init
git add .
git commit -m "Initial Storybook setup with automated tokens"
git branch -M main
git remote add origin https://github.com/jamesyoung-tech/YOUR-STORYBOOK-REPO.git
git push -u origin main
```

### 2. Create GitHub Token (for Option 1)

1. Go to https://github.com/settings/tokens
2. Click **Generate new token (classic)**
3. Name it: "Figma to Storybook Automation"
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
5. Click **Generate token**
6. **Copy the token** (you won't see it again!)
7. Add it to your Figma-to-CSS web app's environment variables

### 3. Test It!

1. **Change a token in Figma**
2. **Save to GitHub** with your web app
3. **Wait** (if using schedule) or **check GitHub Actions** tab
4. **Watch** the workflow run automatically!

## 🎨 The Complete Automated Flow

```
Designer changes color in Figma
         ↓
Figma-to-CSS App extracts tokens
         ↓
App saves to GitHub (tokens-test repo)
         ↓
App triggers webhook (optional)
         ↓
GitHub Actions runs automatically
         ↓
Pulls latest tokens
         ↓
Updates design-tokens.css
         ↓
Commits changes
         ↓
Builds Storybook
         ↓
Deploys (optional)
         ↓
Team sees updated components! 🎉
```

## 🔧 Customization

### Change Update Frequency

Edit `.github/workflows/update-tokens.yml`:

```yaml
schedule:
  - cron: '*/1 * * * *'  # Every 1 minute
  # or
  - cron: '0 * * * *'    # Every hour
  # or
  - cron: '0 9 * * *'    # Every day at 9am
```

### Add Deployment

Uncomment the deployment section in the workflow to auto-deploy Storybook to GitHub Pages or Vercel.

### Notifications

Add Slack/Discord notifications when tokens update:

```yaml
- name: Notify team
  if: steps.check_changes.outputs.changed == 'true'
  run: |
    curl -X POST YOUR_WEBHOOK_URL \
      -d '{"text":"🎨 Design tokens updated in Storybook!"}'
```

## 📊 Monitoring

Check automation status:
- **GitHub Actions tab**: See all workflow runs
- **Commits**: See automatic commits from `github-actions[bot]`
- **Storybook**: See updated components

## 🎯 Next Steps

1. **Push this repo to GitHub**
2. **Choose your automation method** (webhook, schedule, or manual)
3. **Test it** by changing a token in Figma
4. **Celebrate** when it works automatically! 🎉

---

**Questions?** Check the workflow file at `.github/workflows/update-tokens.yml`
