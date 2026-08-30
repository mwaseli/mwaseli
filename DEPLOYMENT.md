# MWASE AI AGENT - Deployment Guide

## 🚀 Complete Deployment Instructions

Your MWASE AI AGENT application is now ready to deploy! Follow these step-by-step instructions for different deployment options.

---

## 📋 Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Git (for version control)

---

## 🖥️ Option 1: Local Development

### Step 1: Install Dependencies
```bash
cd /workspace
npm install
```

### Step 2: Configure Environment
Edit the `.env` file with your settings:
```
PORT=3000
NODE_ENV=development
SESSION_SECRET=your-secure-random-string
```

### Step 3: Start the Server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

### Step 4: Access the Application
- **Homepage:** http://localhost:3000
- **Login:** http://localhost:3000/login
- **Admin Dashboard:** http://localhost:3000/admin

**Login Credentials:**
- Username: `mwaseli`
- Password: `Mwaseli1`

---

## ☁️ Option 2: Deploy to Heroku

### Step 1: Prepare for Heroku
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Login to Heroku
heroku login

# Create Heroku app
heroku create mwase-ai-agent
```

### Step 2: Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set SESSION_SECRET=$(openssl rand -hex 32)
```

### Step 3: Deploy
```bash
git push heroku main
heroku open
```

### Step 4: Scale and Monitor
```bash
heroku ps:scale web=1
heroku logs --tail
```

---

## 🐳 Option 3: Deploy to DigitalOcean

### Step 1: Create a Droplet
1. Go to DigitalOcean.com
2. Create a new Droplet (Ubuntu 22.04 recommended)
3. Choose at least 1GB RAM

### Step 2: Connect to Your Server
```bash
ssh root@your-server-ip
```

### Step 3: Install Node.js and PM2
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2 globally
npm install -g pm2

# Install Git
apt install -y git
```

### Step 4: Clone and Setup Your App
```bash
# Create directory
mkdir -p /var/www/mwase-ai
cd /var/www/mwase-ai

# Clone your repository
git clone your-repo-url .

# Install dependencies
npm install --production

# Create .env file
nano .env
```

Add your environment variables:
```
PORT=3000
NODE_ENV=production
SESSION_SECRET=your-secure-random-string
```

### Step 5: Start with PM2
```bash
pm2 start server.js --name "mwase-ai"
pm2 save
pm2 startup
```

### Step 6: Setup Nginx (Optional but Recommended)
```bash
apt install -y nginx

# Create Nginx config
nano /etc/nginx/sites-available/mwase-ai
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
ln -s /etc/nginx/sites-available/mwase-ai /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 7: Setup SSL with Let's Encrypt
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

---

## 🚂 Option 4: Deploy to Railway

### Step 1: Connect to Railway
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"

### Step 2: Configure Environment Variables
In Railway dashboard, add:
```
NODE_ENV=production
SESSION_SECRET=your-secure-random-string
PORT=3000
```

### Step 3: Deploy
Railway will automatically detect your Node.js app and deploy it.

---

## ⚡ Option 5: Deploy to Vercel

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
vercel login
vercel
```

### Step 3: Configure for Production
Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

---

## 🔒 Security Best Practices

### For Production:

1. **Change Default Secrets:**
   ```bash
   # Generate a strong session secret
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **Enable HTTPS:** Always use SSL/TLS certificates

3. **Set Secure Environment Variables:**
   - Never commit `.env` files to Git
   - Use platform-specific secret management

4. **Update Dependencies Regularly:**
   ```bash
   npm audit
   npm audit fix
   ```

5. **Enable Rate Limiting:** Add express-rate-limit package

6. **Setup Firewall:**
   ```bash
   # On Ubuntu
   ufw allow 22
   ufw allow 80
   ufw allow 443
   ufw enable
   ```

---

## 📊 Monitoring and Maintenance

### Setup Logging:
```bash
# PM2 logs
pm2 logs mwase-ai

# View status
pm2 status

# Restart app
pm2 restart mwase-ai

# View metrics
pm2 monit
```

### Backup Strategy:
- Regular database backups (if using MongoDB)
- Backup uploaded files
- Version control with Git

---

## 🔧 Integrating Real AI Services

To enable actual AI generation, update `server.js` with API integrations:

### Image Generation (Stable Diffusion):
```javascript
// Add to your image generation endpoint
const response = await fetch('https://api.stability.ai/v1/generation', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${process.env.STABLE_DIFFUSION_API_KEY}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt, width: 1024, height: 1024 })
});
```

### Voice Synthesis (ElevenLabs):
```javascript
// Add to your voice generation endpoint
const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
});
```

---

## 📱 Testing Your Deployment

1. **Test Homepage:** Visit your domain
2. **Test Login:** Use credentials (mwaseli / Mwaseli1)
3. **Test Admin Dashboard:** Access all features
4. **Test API Endpoints:** Use Postman or curl
5. **Check Mobile Responsiveness:** Test on different devices

---

## 🆘 Troubleshooting

### Port Already in Use:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Permission Issues:
```bash
# Fix ownership
chown -R www-data:www-data /var/www/mwase-ai

# Fix permissions
chmod -R 755 /var/www/mwase-ai
```

### App Won't Start:
```bash
# Check logs
pm2 logs mwase-ai --lines 100

# Check Node.js version
node --version

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Support

- **Email:** mwaserobison@gmail.com
- **Domain:** mwaseai.io
- **Documentation:** See SETUP_GUIDE.md

---

© 2024 MWASE AI AGENT. All rights reserved.
