# Deployment Guide

## Frontend Deployment (Vercel)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/codecrafter06/portfolio.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project" and import your repository
3. Set these environment variables in Vercel:
   - `NEXT_PUBLIC_API_URL` = `https://your-backend-url.railway.app`
4. Deploy automatically

## Backend Deployment (Railway)

### Step 1: Deploy to Railway
1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository and choose the `backend` folder

### Step 2: Set Environment Variables
In Railway dashboard, add these variables:
```
SECRET_KEY=your-super-secret-key-change-this-in-production
FLASK_ENV=production
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USE_SSL=False
MAIL_USERNAME=sagarkumarb980@gmail.com
MAIL_PASSWORD=your-16-character-app-password
MAIL_DEFAULT_SENDER=sagarkumarb980@gmail.com
CONTACT_RECIPIENT=sagarkumarb980@gmail.com
MAX_CONTENT_LENGTH=16777216
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### Step 3: Update Frontend API URL
1. In Vercel dashboard, update `NEXT_PUBLIC_API_URL` with your Railway URL
2. Redeploy frontend

## Gmail App Password Setup

1. Enable 2FA on your Google account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Generate app password for "Mail"
4. Use the 16-character password in `MAIL_PASSWORD`

## Custom Domain (Optional)

### Vercel:
1. Add custom domain in Vercel dashboard
2. Update DNS records as instructed

### Railway:
1. Add custom domain in Railway dashboard
2. Update `FRONTEND_URL` environment variable

## Monitoring

- Check Railway logs for backend issues
- Check Vercel function logs for frontend issues
- Monitor email delivery in Gmail sent folder