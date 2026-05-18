# MWASE AI - Deployment & Domain Setup Guide

## Quick Start - Deploy in 5 Minutes

### Step 1: Prepare GitHub Repository

1. Initialize git (if not already done):
```bash
cd /vercel/share/v0-project
git init
git add .
git commit -m "Initial MWASE AI setup"
```

2. Push to GitHub:
```bash
git remote add origin https://github.com/mwaseli/mwaseli.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Visit https://vercel.com/new
2. Import your GitHub repository
3. Vercel will detect Next.js - click "Deploy"
4. Add environment variables in Vercel dashboard:
   - `REPLICATE_API_TOKEN`: Your Replicate API key
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `HUGGINGFACE_API_KEY`: Your HuggingFace API key
5. Click "Deploy"

**Your app will be live at:** `https://<project-name>.vercel.app`

### Step 3: Connect Custom Domain

#### Option A: Buy Domain from Vercel
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Click "Add Domain"
3. Click "Buy Domain" 
4. Choose one of these:
   - **mwaseai.com** (~$12/year)
   - **mwasecreator.com** (~$15/year)
   - **mwaseagent.ai** (~$45/year)
5. Complete purchase
6. Domain automatically configured ✅

#### Option B: Use Existing Domain
1. Purchase domain from:
   - Namecheap.com
   - GoDaddy.com
   - Domain.com
   - Google Domains

2. Add to Vercel:
   - Settings → Domains → Add Domain
   - Enter your domain name
   - Follow DNS configuration steps
   - Point nameservers to Vercel

3. Verify ownership (Vercel provides TXT record)

**Recommended Domains:**
- **mwaseai.com** - Simple, direct
- **mwasecreator.com** - Describes function
- **mwaseagent.ai** - Modern, trendy
- **createwithmwase.com** - Descriptive

### Step 4: Enable SSL/HTTPS

1. Vercel provides free SSL automatically
2. Once domain propagates (24-48 hours), HTTPS will be active
3. All requests redirect to HTTPS

## Environment Variables Setup

### Get API Keys

#### Replicate API Key
1. Go to https://replicate.com/account/api-tokens
2. Sign up or login
3. Create new API token
4. Copy token (starts with `r8_...`)

#### OpenAI API Key
1. Go to https://platform.openai.com/account/api-keys
2. Sign up or login
3. Create new secret key
4. Copy key (starts with `sk-proj-...`)
5. **Important**: Keep this secure, never commit to git

#### HuggingFace API Key
1. Go to https://huggingface.co/settings/tokens
2. Sign up or login
3. Create new access token
4. Copy token
5. Set token type to "read" for safety

### Set in Vercel

1. Vercel Dashboard → Project Settings → Environment Variables
2. Add each variable:
   ```
   REPLICATE_API_TOKEN = r8_xxxxxxxxxxxxx
   OPENAI_API_KEY = sk-proj-xxxxxxxxxxxxx
   HUGGINGFACE_API_KEY = hf_xxxxxxxxxxxxx
   ```
3. Select which deployments apply (Production, Preview, etc.)
4. Save

## Monitoring & Analytics

### Vercel Monitoring
- Dashboard shows deployment status
- Analytics tab shows traffic
- Edge logs show errors
- Alerts can be configured

### Performance Optimization

1. Enable Vercel Analytics:
   - Settings → Analytics
   - Install Web Vitals

2. Monitor:
   - Time to First Byte (TTFB)
   - Cumulative Layout Shift (CLS)
   - First Contentful Paint (FCP)

## Maintenance

### Weekly Tasks
- Check error logs
- Monitor API usage
- Review analytics

### Monthly Tasks
- Update dependencies: `npm update`
- Check API provider usage limits
- Review costs

### Quarterly Tasks
- Security audit
- Performance optimization
- User feedback review

## Scaling for Growth

### When Traffic Increases
1. Vercel auto-scales - no action needed
2. Monitor API rate limits:
   - Replicate: 100 requests/min free tier
   - OpenAI: Check rate limits in dashboard
   - HuggingFace: Variable by model

3. If hitting limits:
   - Upgrade API plans
   - Implement request queuing
   - Add caching layer
   - Use cheaper alternative models

### Database (Optional)
If adding user accounts later:
1. Vercel provides Postgres (Vercel Postgres)
2. Or use Supabase (free tier available)
3. Connect during deployment

## Custom Domain Examples

### Professional
- **mwaseai.com** - Agency feel
- **aigenerate.com** - Broad appeal
- **createai.app** - Modern TLD

### Personal Brand
- **mwase-creator.com** - With your name
- **mwase.ai** - Minimalist
- **by-mwase.com** - Attribution

### Descriptive
- **ai-image-video.com** - Function-based
- **free-ai-generator.com** - Value proposition
- **smartcreate.ai** - Smart + create

## Troubleshooting Deployments

### Deploy Failed
1. Check build logs in Vercel dashboard
2. Ensure all env vars are set
3. Verify no syntax errors: `npm run build` locally
4. Check git history for recent changes

### Slow Performance
1. Check Vercel Analytics
2. Monitor API response times
3. Clear browser cache
4. Check API provider status pages

### Domain Not Working
1. Check DNS propagation: https://dnschecker.org
2. Wait 24-48 hours for full propagation
3. Verify nameserver settings
4. Check domain is added in Vercel dashboard

## Cost Breakdown

### Free Tier
- **Vercel**: Free (automatic scaling)
- **Replicate**: $0 (free tier, limited)
- **OpenAI**: $0 (free trial) → $0.03-0.06 per image
- **HuggingFace**: Free inference API
- **Domain**: $0 (vercel.app free domain)

**Monthly Cost**: $0-5 for light usage

### With Custom Domain & Paid APIs
- **Vercel**: Free (unless heavy usage)
- **Domain**: $10-15/year
- **API Credits**: $10-50/month
- **Optional CDN**: $0-20/month

**Total Monthly**: $10-50

## Recommended Setup for Production

```
MWASE AI Production Setup
├── Domain: mwaseai.com ($12/year)
├── Hosting: Vercel (Free tier)
├── Image Gen: Replicate ($20/month credits)
├── Video Gen: Replicate ($50/month credits)
├── Voice Gen: OpenAI ($10/month credits)
├── SSL: Free (Vercel)
├── CDN: Free (Vercel Edge Network)
└── Analytics: Free (Vercel)

Total Monthly: ~$30-40 (after free trial credits)
```

## Going Live Checklist

- [ ] All API keys working
- [ ] Environment variables set in Vercel
- [ ] GitHub repository connected
- [ ] Initial deployment successful
- [ ] Domain purchased
- [ ] Domain added to Vercel
- [ ] DNS pointing to Vercel
- [ ] SSL/HTTPS active
- [ ] Custom domain working
- [ ] Analytics enabled
- [ ] Error monitoring configured
- [ ] Backup strategy planned

## Next Steps After Launch

1. **Promote your app**
   - Share on social media
   - Post on Product Hunt
   - Add to AI tools directories

2. **Gather feedback**
   - Add feedback form
   - Monitor error logs
   - Track user behavior

3. **Improve**
   - Add more generation models
   - Optimize UI based on feedback
   - Add advanced features

4. **Monetize (Optional)**
   - Add premium features
   - Set daily generation limits
   - Offer API access

---

**Deployment Complete! 🚀**

Your MWASE AI platform is now live and accessible worldwide.
Visit: **https://mwaseai.com** (or your custom domain)
