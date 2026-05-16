# MWASE AI AGENT - Quick Deployment Guide

## 🚀 Deploy in 5 Minutes - Choose Your Platform

Your MWASE AI AGENT is ready to deploy! Follow the steps below for your preferred platform.

---

## ⚡ FASTEST: Deploy to Railway (Recommended for Beginners)

### Step 1: Push to GitHub
```bash
cd /workspace
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mwase-ai-agent.git
git push -u origin main
```

### Step 2: Deploy on Railway
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your `mwase-ai-agent` repository
5. Railway will auto-detect Node.js and deploy!

### Step 3: Add Environment Variables
In Railway dashboard, click your project → **Variables** → Add:
```
NODE_ENV=production
SESSION_SECRET=your-super-secret-random-string-here
PORT=3000
```

**Generate a secure secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 4: Access Your App
Railway will give you a URL like: `https://mwase-ai-agent.up.railway.app`

✅ **Done!** Your app is live!

---

## 🎯 EASIEST: Deploy to Vercel

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
cd /workspace
vercel login
vercel
```

### Step 3: Add Environment Variables
```bash
vercel env add NODE_ENV production
vercel env add SESSION_SECRET production
```

### Step 4: Deploy to Production
```bash
vercel --prod
```

✅ **Done!** Visit your Vercel URL!

---

## 🌿 PROFESSIONAL: Deploy to Heroku

### Step 1: Install Heroku CLI
Download from: https://devcenter.heroku.com/articles/heroku-cli

### Step 2: Login and Create App
```bash
cd /workspace
heroku login
heroku create mwase-ai-agent
```

### Step 3: Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set SESSION_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
```

### Step 4: Deploy
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
heroku open
```

✅ **Done!** Your app is live on Heroku!

---

## 🖥️ ADVANCED: Deploy to DigitalOcean

### Step 1: Create a Droplet
1. Go to [digitalocean.com](https://www.digitalocean.com)
2. Create → Droplets
3. Choose: Ubuntu 22.04 LTS, Basic plan ($6/month)
4. Add your SSH key
5. Create droplet

### Step 2: Connect to Server
```bash
ssh root@YOUR_SERVER_IP
```

### Step 3: Install Dependencies
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2 process manager
npm install -g pm2

# Install Git
apt install -y git

# Install Nginx
apt install -y nginx
```

### Step 4: Clone Your App
```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/mwase-ai-agent.git
cd mwase-ai-agent
npm install --production
```

### Step 5: Configure Environment
```bash
nano .env
```

Add:
```
PORT=3000
NODE_ENV=production
SESSION_SECRET=your-super-secret-random-string-here
```

### Step 6: Start with PM2
```bash
pm2 start server.js --name "mwase-ai"
pm2 save
pm2 startup
```

### Step 7: Configure Nginx
```bash
nano /etc/nginx/sites-available/mwase-ai
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable the site:
```bash
ln -s /etc/nginx/sites-available/mwase-ai /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 8: Setup SSL (Free with Let's Encrypt)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com -d www.your-domain.com
```

✅ **Done!** Your app is live with HTTPS!

---

## 🔒 Security Checklist for Production

- [ ] Changed default `SESSION_SECRET` to a random string
- [ ] Enabled HTTPS/SSL
- [ ] Set `NODE_ENV=production`
- [ ] Firewall configured (ports 22, 80, 443 only)
- [ ] Regular dependency updates (`npm audit`)
- [ ] Backups configured

---

## 📊 Post-Deployment Testing

1. **Visit your homepage** - Check if it loads
2. **Test login** - Use credentials:
   - Username: `mwaseli`
   - Password: `Mwaseli1`
3. **Access admin dashboard** - `/admin`
4. **Test on mobile** - Check responsiveness
5. **Check logs** for any errors

---

## 🆘 Troubleshooting

### App won't start?
```bash
# Check logs
pm2 logs mwase-ai
# or
heroku logs --tail
```

### Port already in use?
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Permission issues?
```bash
chown -R www-data:www-data /var/www/mwase-ai-agent
chmod -R 755 /var/www/mwase-ai-agent
```

### Need to update code?
```bash
cd /var/www/mwase-ai-agent
git pull origin main
npm install --production
pm2 restart mwase-ai
```

---

## 📞 Support

- **Email:** mwaserobison@gmail.com
- **Domain:** mwaseai.io

---

© 2024 MWASE AI AGENT. All rights reserved.
