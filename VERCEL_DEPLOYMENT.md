# Vercel Deployment Guide

## 📋 Prerequisites

1. Vercel account (sign up at [vercel.com](https://vercel.com))
2. GitHub repository connected to Vercel
3. Environment variables configured

## 🚀 Quick Deployment

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel will auto-detect Vite framework
4. Configure environment variables (see below)
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## ⚙️ Environment Variables

Configure these in Vercel Dashboard → Project Settings → Environment Variables:

### Required Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### Optional Variables

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Where to find:**
- **Supabase URL & Key**: Supabase Dashboard → Project Settings → API
- **Google Analytics ID**: Google Analytics → Admin → Property Settings

## 📁 Project Configuration

The `vercel.json` file is already configured with:

- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ SPA routing (all routes → index.html)
- ✅ Security headers
- ✅ Cache optimization for static assets
- ✅ Proper content types for sitemap.xml and robots.txt

## 🔧 Build Settings

Vercel will automatically:
- Install dependencies with `npm install`
- Build the project with `npm run build`
- Serve from `dist` directory
- Handle all routes as SPA

## 📊 Performance Features

The configuration includes:
- **Long-term caching** for static assets (1 year)
- **Security headers** (XSS protection, frame options, etc.)
- **Optimized caching** for sitemap and robots.txt
- **SPA routing** for client-side navigation

## 🔍 Post-Deployment Checklist

1. ✅ Verify site is accessible
2. ✅ Check environment variables are set
3. ✅ Test contact form (requires Supabase)
4. ✅ Verify Google Analytics (if configured)
5. ✅ Test all routes and navigation
6. ✅ Check sitemap.xml is accessible
7. ✅ Verify robots.txt is accessible
8. ✅ Submit sitemap to Google Search Console

## 🌐 Custom Domain

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `sitemap.xml` and `robots.txt` with new domain
5. Update canonical URLs in `index.html`

## 🔄 Continuous Deployment

Vercel automatically deploys:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

## 📝 Notes

- The build output is in `dist/` directory
- All routes are handled by `index.html` (SPA)
- Static assets are cached for 1 year
- Environment variables must start with `VITE_` for Vite to expose them

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version (Vercel uses Node 18.x by default)
- Verify all dependencies are in `package.json`
- Check build logs in Vercel Dashboard

### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Redeploy after adding new variables
- Check variable names match exactly

### Routes Not Working
- Verify `vercel.json` has correct rewrites
- Check that all routes redirect to `/index.html`
- Ensure React Router is configured correctly

---

**Ready to deploy?** Just push to your main branch or use `vercel --prod`!

