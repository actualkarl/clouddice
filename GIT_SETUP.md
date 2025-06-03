# Git Setup for Cloud Dice

## 1. Configure Git (if not done)
```bash
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

## 2. Create Initial Commit
```bash
cd /mnt/c/Users/GGPC/Downloads/Coding_Projects/clouddice
git add .
git commit -m "Initial commit: Cloud Dice - Real-time multiplayer dice rolling app"
```

## 3. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `clouddice`
3. Description: "Real-time multiplayer dice rolling app"
4. Choose: Public (so Render can access it)
5. DON'T initialize with README (we already have files)
6. Click "Create repository"

## 4. Push to GitHub

After creating the repo, GitHub will show commands. Use these:

```bash
# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/clouddice.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 5. If You Get Authentication Error

GitHub now requires tokens instead of passwords:

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "Cloud Dice Deploy"
4. Select scopes: `repo` (full control)
5. Generate token and COPY IT

When pushing, use:
- Username: YOUR_GITHUB_USERNAME
- Password: YOUR_TOKEN (not your GitHub password)

## Alternative: GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in with your GitHub account
3. Click "Add" → "Add Existing Repository"
4. Browse to: C:\Users\GGPC\Downloads\Coding_Projects\clouddice
5. Click "Publish repository"

## After Publishing

Your repository will be at:
https://github.com/YOUR_USERNAME/clouddice

You can then use this URL in Render to deploy!