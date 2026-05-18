# MWASE AI - Vercel & Cloudflare Deployment Guide

## Quick Summary

Your MWASE AI application is ready to deploy on **Vercel** and **Cloudflare** with automated GitHub Actions CI/CD.

**Current Status:**
- ✅ Code pushed to GitHub: `mwaseli/mwaseli` (branch: `ai-agent-image-video`)
- ✅ Vercel config created: `vercel.json`
- ✅ Cloudflare config created: `wrangler.toml`
- ✅ GitHub Actions workflow created: `.github/workflows/deploy.yml`
- ✅ All builds passing with no errors

---

## Step 1: Deploy to Vercel (Recommended)

Vercel is the optimal choice for Next.js applications - it's built by the same team.

### Option A: One-Click Deploy (Easiest)

1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Choose `mwaseli/mwaseli` from GitHub
4. Select branch: `ai-agent-image-video`
5. Configure environment variables:
   ```
   REPLICATE_API_TOKEN=b6aaa6abf8fc48b4c9e111da94e3ef066c86756f81eda8316e78d9189f68e5ca
   OPENAI_API_KEY=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
   HUGGINGFACE_API_KEY=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
   ```
6. Click "Deploy"
7. **Done!** Your app will be live in 2-3 minutes

### Option B: Manual Vercel CLI Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel (opens browser)
vercel login

# Deploy
cd /vercel/share/v0-project
vercel --prod

# Add environment variables when prompted
# Project name: mwaseai (or your choice)
# Framework: Next.js
# Root directory: ./
```

### Vercel Features You Get:

- 🚀 Automatic deployments on every push to GitHub
- 🔄 Preview URLs for pull requests
- 📊 Analytics dashboard
- ⚡ Edge caching and optimizations
- 🌍 Global CDN (250+ data centers)
- 🔐 Automatic HTTPS/SSL
- 📱 Mobile-friendly preview
- 🎯 Performance metrics

**Your Vercel URL will be:** `https://mwaseai.vercel.app`

---

## Step 2: Deploy to Cloudflare (Optional but Recommended)

Cloudflare provides additional security, caching, and DDoS protection.

### Option A: Deploy via GitHub Integration (Easiest)

1. Go to https://dash.cloudflare.com
2. Sign up or login
3. Go to "Workers & Pages"
4. Click "Create application" → "Pages"
5. Connect GitHub
6. Select `mwaseli/mwaseli` repo
7. Select branch: `ai-agent-image-video`
8. Build settings:
   - Framework: Next.js
   - Build command: `npm run build`
   - Build output directory: `.next`
9. Environment variables:
   ```
   REPLICATE_API_TOKEN=b6aaa6abf8fc48b4c9e111da94e3ef066c86756f81eda8316e78d9189f68e5ca
   OPENAI_API_KEY=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
   HUGGINGFACE_API_KEY=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
   ```
10. Click "Save and Deploy"
11. **Done!** Your app will be live in 1-2 minutes

### Option B: Manual Cloudflare Wrangler Deploy

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
cd /vercel/share/v0-project
wrangler pages deploy dist/ --project-name=mwaseai
```

### Cloudflare Features You Get:

- 🛡️ DDoS protection
- ⚡ Global edge caching
- 🔒 WAF (Web Application Firewall)
- 📊 Advanced analytics
- 🚀 Automatic deployments
- 🌍 250+ global data centers
- 💾 Automatic backups
- 🎯 Performance optimization

**Your Cloudflare URL will be:** `https://mwaseai.pages.dev`

---

## Step 3: Set Up Custom Domain

### For Vercel:

1. Go to Vercel Dashboard → Select your project
2. Settings → Domains
3. Add `mwaseai.com`
4. Update DNS records (Vercel shows exact records needed)
5. **Live in 10-30 minutes**

### For Cloudflare:

1. Go to Cloudflare Dashboard
2. Add your domain (`mwaseai.com`)
3. Update nameservers at registrar (GoDaddy, Namecheap, etc.)
4. Verify domain
5. **Live in 24-48 hours**

---

## Step 4: GitHub Actions Automation

Your repository includes automatic deployments. Every time you push to `ai-agent-image-video`:

1. ✅ Tests run automatically
2. ✅ Build verification
3. ✅ Auto-deploy to Vercel
4. ✅ Auto-deploy to Cloudflare
5. ✅ Notifications sent

**View deployment status:**
- GitHub: Go to repo → Actions tab
- Vercel: Dashboard
- Cloudflare: Dashboard

---

## Recommended Setup

### Production (Recommended)

**For the best experience:**

1. **Primary:** Deploy to Vercel
   - Best for Next.js
   - Fastest cold starts
   - Analytics built-in
   
2. **Secondary:** Deploy to Cloudflare
   - Redundancy & failover
   - Enhanced security
   - Global edge caching

3. **Domain:** Buy `mwaseai.com`
   - Through Cloudflare: $8.99/year
   - Through Vercel: $12/year
   - Through GoDaddy: $2-15/year

4. **Setup DNS:**
   - Primary: Vercel
   - Secondary: Cloudflare Pages
   - Both redirect to your domain

### Configuration Example

```
Domain: mwaseai.com
├── Primary: vercel.com (main traffic)
├── Secondary: cloudflare.pages.dev (backup)
└── CDN: Cloudflare (security layer)
```

---

## Deployment Checklist

- [ ] Code pushed to GitHub ✓
- [ ] Environment variables configured
- [ ] Vercel project created
- [ ] Cloudflare project created
- [ ] Custom domain purchased
- [ ] DNS records updated
- [ ] GitHub Actions enabled
- [ ] Test all 4 generators:
  - [ ] Text-to-Image
  - [ ] Text-to-Video
  - [ ] Image-to-Image
  - [ ] Text-to-Voice

---

## Monitoring & Maintenance

### Daily:
- Check GitHub Actions for failed deployments
- Monitor Vercel analytics
- Monitor Cloudflare analytics

### Weekly:
- Review error logs
- Check API usage (Replicate, OpenAI, HuggingFace)
- Performance metrics

### Monthly:
- Update dependencies: `npm update`
- Review security advisories: `npm audit`
- Backup database/logs if applicable

---

## Troubleshooting

### Build Fails on Vercel
```bash
# Check locally first
npm run build

# If error, run this for details
npm run build -- --verbose
```

### Environment Variables Not Working
- Verify in Vercel Dashboard → Settings → Environment Variables
- Ensure exact spelling matches
- Redeploy after adding variables

### Cloudflare Deployment Issues
- Check wrangler.toml configuration
- Verify GitHub token permissions
- Check Cloudflare Pages build settings

### Slow Performance
- Check Vercel Analytics
- Enable Cloudflare caching
- Optimize images (Vercel does this automatically)

---

## Support Links

- **Vercel Docs:** https://vercel.com/docs
- **Cloudflare Docs:** https://developers.cloudflare.com
- **Next.js Docs:** https://nextjs.org/docs
- **GitHub Actions:** https://docs.github.com/en/actions

---

## What You Have

**3 Deployment Options Ready:**

1. ✅ **Vercel** (Recommended)
   - One-click deploy
   - Automatic from GitHub
   - Best for Next.js
   
2. ✅ **Cloudflare** (Backup/Security)
   - One-click deploy
   - Edge optimization
   - Global CDN
   
3. ✅ **GitHub Actions** (Automation)
   - Auto-deploy on push
   - CI/CD pipeline
   - Email notifications

**Your application is ready to go live!** Choose Vercel, Cloudflare, or both.

---

## Next Steps

1. **Choose Your Deployment Platform**
   - Vercel (primary - recommended)
   - Cloudflare (secondary/backup)
   - Both for redundancy

2. **Deploy**
   - Follow steps above
   - Configure environment variables
   - Test all generators

3. **Get Custom Domain**
   - Buy mwaseai.com
   - Point to your deployment
   - Go live!

**Your MWASE AI application is production-ready.** 🚀
