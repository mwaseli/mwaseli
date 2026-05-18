# Deployment Setup Guide - MWASE AI

## Complete Deployment to Vercel & Cloudflare

Your MWASE AI platform is ready to deploy. Follow these steps to go live on both Vercel and Cloudflare.

---

## Step 1: GitHub Secrets Setup

Add these secrets to your GitHub repository at: `Settings → Secrets and variables → Actions`

### Required Secrets:

```
REPLICATE_API_TOKEN = b6aaa6abf8fc48b4c9e111da94e3ef066c86756f81eda8316e78d9189f68e5ca
OPENAI_API_KEY = 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
HUGGINGFACE_API_KEY = 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

VERCEL_TOKEN = [Get from Vercel Settings]
VERCEL_ORG_ID = [From Vercel Account]
VERCEL_PROJECT_ID = prj_WugAxqwJ0VRqH08dep7HKw64cO8l

CLOUDFLARE_API_TOKEN = [Get from Cloudflare]
CLOUDFLARE_ACCOUNT_ID = [From Cloudflare Account]
```

---

## Step 2: Get Vercel Token

1. Go to: `https://vercel.com/account/tokens`
2. Create a new token
3. Copy the token
4. Add to GitHub Secrets as `VERCEL_TOKEN`

---

## Step 3: Get Cloudflare Credentials

### Get API Token:
1. Visit: `https://dash.cloudflare.com/profile/api-tokens`
2. Create new token with:
   - Permissions: Edit Cloudflare Workers, Account Resources
3. Copy token → Add to GitHub Secrets as `CLOUDFLARE_API_TOKEN`

### Get Account ID:
1. Visit: `https://dash.cloudflare.com`
2. Navigate to any domain
3. Right sidebar shows Account ID
4. Add to GitHub Secrets as `CLOUDFLARE_ACCOUNT_ID`

---

## Step 4: Buy Domain

### Option A: Buy from Vercel (Recommended)
1. Go to: `https://vercel.com/domains`
2. Search for `mwaseai.com`
3. Buy domain (~$12/year)
4. Auto-connects to your Vercel project

### Option B: Buy from External Provider
1. Buy `mwaseai.com` from:
   - GoDaddy
   - Namecheap
   - Google Domains
2. Update DNS records:
   - Add Vercel nameservers
   - Add Cloudflare nameservers

### Option C: Free Testing
- Use auto-generated: `mwase-ai.vercel.app`
- Use free tier: `mwase-ai.pages.dev` (Cloudflare)

---

## Step 5: Deploy to Vercel

### Method A: Automatic GitHub Deployment
```bash
# Just push to GitHub - GitHub Actions will auto-deploy!
git push origin ai-agent-image-video
```

The workflow will:
1. Test the build
2. Deploy to Vercel
3. Deploy to Cloudflare
4. Create preview URLs

### Method B: Manual Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

---

## Step 6: Configure Cloudflare DNS

1. **Go to Cloudflare Dashboard**: `https://dash.cloudflare.com`
2. **Add your domain**: `mwaseai.com`
3. **Update nameservers** at your domain registrar with Cloudflare's nameservers
4. **Wait 24-48 hours** for DNS propagation
5. **Add DNS records**:
   ```
   Type: CNAME
   Name: www
   Target: vercel.com
   Proxied: Yes
   
   Type: A
   Name: @
   IP: 76.76.19.21 (Vercel)
   Proxied: Yes
   ```

---

## Step 7: Verify Deployment

### Check Vercel:
```bash
# Your site is live at:
https://mwase-ai.vercel.app
# or
https://mwaseai.com (if domain added)
```

### Check Cloudflare:
```bash
# Your site is live at:
https://mwaseai.pages.dev
# or
https://mwaseai.com (if DNS configured)
```

### Test Live URLs:
1. Open `https://mwaseai.com` (or your URL)
2. Click "AI Image" → Enter prompt → Generate
3. Try all 4 generators
4. Verify all APIs working

---

## Step 8: Monitor & Maintain

### Vercel Dashboard:
- **URL**: `https://vercel.com/dashboard`
- Monitor deployments, logs, performance
- View deployment history

### Cloudflare Dashboard:
- **URL**: `https://dash.cloudflare.com`
- Monitor DNS, caching, performance
- Enable DDoS protection

### GitHub Actions:
- **URL**: `https://github.com/mwaseli/mwaseli/actions`
- View deployment logs
- Check build status

---

## Troubleshooting

### Site Not Loading?
```bash
# Clear Cloudflare cache
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"files":["*"]}'
```

### DNS Not Propagating?
- Wait 24-48 hours for full propagation
- Check: `nslookup mwaseai.com`
- Clear browser cache: `Ctrl+Shift+Delete`

### Build Fails?
- Check GitHub Actions logs
- Verify environment variables are set
- Run locally: `npm run build`

### APIs Not Working?
- Verify secrets are correct
- Check API token limits haven't been exceeded
- Test with: `curl https://api.replicate.com/v1/models`

---

## Environment Variables Needed

These are automatically set via GitHub Secrets:

```
REPLICATE_API_TOKEN=your-token
OPENAI_API_KEY=your-key
HUGGINGFACE_API_KEY=your-key
```

---

## One-Time Setup Checklist

- [ ] Add all secrets to GitHub
- [ ] Get Vercel token
- [ ] Get Cloudflare credentials
- [ ] Buy domain (optional)
- [ ] Push code to trigger deploy
- [ ] Verify Vercel deployment
- [ ] Verify Cloudflare deployment
- [ ] Test live URLs
- [ ] Configure DNS if using custom domain
- [ ] Monitor deployments

---

## Auto-Deploy On Push

Once GitHub Actions is configured, every push to `ai-agent-image-video` or `main` branch will:

1. ✅ Test the build
2. ✅ Deploy to Vercel (production)
3. ✅ Deploy to Cloudflare Pages
4. ✅ Update your live site

No manual intervention needed!

---

## Support & Docs

- **Vercel Docs**: https://vercel.com/docs
- **Cloudflare Docs**: https://developers.cloudflare.com/pages
- **GitHub Actions**: https://github.com/features/actions
- **Next.js**: https://nextjs.org/docs

Your MWASE AI platform is ready to serve millions of users! 🚀
