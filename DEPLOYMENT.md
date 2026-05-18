# MWASE AI Agent - Deployment & Configuration Guide

## Quick Start

### 1. Local Development

```bash
# Install dependencies
npm install

# Create .env.local file with your API keys
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
REPLICATE_API_TOKEN=your_replicate_token
HUGGINGFACE_API_KEY=your_huggingface_key
OPENAI_API_KEY=your_openai_key

# Start development server
npm run dev

# Application runs at http://localhost:3000
```

### 2. Create Admin User

```bash
# Set environment variables first
export NEXT_PUBLIC_SUPABASE_URL=your_url
export SUPABASE_SERVICE_ROLE_KEY=your_key

# Run admin creation script
npx ts-node scripts/create-admin.ts

# Output:
# ✓ Admin user created
# ✓ Admin profile configured
# 
# Admin Credentials:
#   Email: mwaserobison@gmail.com
#   Password: Mwaseli1
```

### 3. Access Application

- **Home Page**: http://localhost:3000
- **User Dashboard**: http://localhost:3000/dashboard (requires login)
- **Admin Panel**: http://localhost:3000/admin (requires admin login)
- **Sign Up**: http://localhost:3000/auth/sign-up
- **Sign In**: http://localhost:3000/auth/login

## Production Deployment

### Deploy to Vercel

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial MWASE AI Agent commit"
git push origin main
```

#### Step 2: Connect to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Select project directory (if not root)

#### Step 3: Environment Variables
In Vercel Dashboard > Settings > Environment Variables, add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
REPLICATE_API_TOKEN=your_replicate_token
HUGGINGFACE_API_KEY=your_huggingface_key
OPENAI_API_KEY=your_openai_key
```

#### Step 4: Deploy
- Vercel will automatically build and deploy your app
- Your application will be live at a `.vercel.app` domain

#### Step 5: Custom Domain
1. Go to Vercel > Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed

### Deploy to AWS/Self-Hosted

#### Step 1: Build Production Bundle
```bash
npm run build
```

#### Step 2: Start Server
```bash
npm start
```

#### Step 3: Set Environment Variables
```bash
export NEXT_PUBLIC_SUPABASE_URL=...
export NEXT_PUBLIC_SUPABASE_ANON_KEY=...
# ... etc
```

#### Step 4: Configure Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name yourdomain.com;

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

## API Key Configuration

### Getting API Keys

#### Replicate
1. Go to https://replicate.com/signin
2. Create account / Sign in
3. Go to API tokens
4. Copy your token
5. Add to environment as `REPLICATE_API_TOKEN`

#### HuggingFace
1. Go to https://huggingface.co
2. Create account / Sign in
3. Settings > Access Tokens
4. Create new token (read access)
5. Add to environment as `HUGGINGFACE_API_KEY`

#### OpenAI
1. Go to https://platform.openai.com
2. Sign in
3. API keys
4. Create new secret key
5. Add to environment as `OPENAI_API_KEY`

#### Supabase
1. Go to https://supabase.com
2. Create new project
3. Copy Project URL and Anon Key
4. Add to environment variables

## Database Setup

### Automatic Setup
The database schema is automatically created when the application first runs. The schema includes:

- User profiles with credit system
- Generation jobs tracking
- Gallery management
- Admin logs and audit trail
- Credits transaction history

### Manual Database Check

```sql
-- List all tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- View table structure
\d public.profiles

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'profiles';
```

## Monitoring & Maintenance

### Check Application Health
```bash
# Check if app is running
curl http://localhost:3000

# Check API endpoint
curl http://localhost:3000/api/health
```

### View Logs
```bash
# In development
npm run dev

# In production (Vercel)
# View in Vercel Dashboard > Logs

# Self-hosted
# Check system logs or application logs file
```

### Database Backup

#### Supabase
1. Go to Supabase Dashboard
2. Project > Backups
3. Download backup automatically or manually

#### SQL Export
```bash
# Export database
pg_dump -U postgres -h localhost dbname > backup.sql

# Restore database
psql -U postgres -h localhost dbname < backup.sql
```

## Security Checklist

Before going to production:

- [ ] All environment variables are set and secure
- [ ] Supabase RLS policies are enabled on all tables
- [ ] Admin user password is changed from default
- [ ] API keys are rotated and securely stored
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] Database backups are configured
- [ ] Error logging is set up
- [ ] Rate limiting is configured (if needed)
- [ ] CORS is properly configured
- [ ] Sensitive data is not logged

## Performance Optimization

### Database
- Index frequently queried columns
- Optimize RLS policies
- Use connection pooling

### Application
```bash
# Build for production
npm run build

# Test production build locally
npm start
```

### CDN
- Enable Vercel's automatic CDN caching
- Set cache headers for static assets
- Compress images and media files

## Troubleshooting

### Issue: "Module not found: @supabase/ssr"
```bash
npm install @supabase/ssr
npm install --save-dev @types/node
```

### Issue: "Supabase connection refused"
- Check NEXT_PUBLIC_SUPABASE_URL is correct
- Check NEXT_PUBLIC_SUPABASE_ANON_KEY is valid
- Ensure Supabase project is active

### Issue: "API key unauthorized"
- Verify API keys are copied correctly
- Check API key permissions in provider dashboard
- Ensure API keys are not expired

### Issue: "Database connection error"
- Verify database credentials
- Check network connectivity
- Ensure Supabase project is active
- Check RLS policies are not blocking access

## Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Replicate Docs**: https://replicate.com/docs
- **OpenAI Docs**: https://platform.openai.com/docs
- **HuggingFace Docs**: https://huggingface.co/docs

## Contact

For issues or questions:
- Email: support@mwaseai.com
- Documentation: See README.md and PROJECT_SUMMARY.md
