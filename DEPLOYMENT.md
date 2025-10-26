# Deployment Guide

This guide provides step-by-step instructions for deploying the AI-Enhanced Driver Wellness Monitoring Dashboard to various hosting platforms.

---

## 📋 Pre-Deployment Checklist

- [ ] All code committed to Git
- [ ] Environment variables configured
- [ ] Production build tested locally (`npm run build`)
- [ ] Dependencies up to date
- [ ] .env file NOT committed (use .env.example)
- [ ] Build artifacts in `.gitignore`

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

#### Using Vercel Dashboard

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select `driverfront`

2. **Configure Project**
   - Framework Preset: **Vite**
   - Build Command: `npm run build:client`
   - Output Directory: `dist/spa`
   - Install Command: `npm install`

3. **Environment Variables** (Optional)
   - Add any environment variables from `.env.example`
   - Click "Add" for each variable

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at `https://your-project.vercel.app`

#### Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (first time - follow prompts)
vercel

# Deploy to production
vercel --prod
```

#### Continuous Deployment
- Push to `main` branch → Auto-deploys to production
- Push to other branches → Auto-deploys preview

---

### Option 2: Netlify

#### Using Netlify Dashboard

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select `driverfront`

2. **Configure Build Settings**
   - Build command: `npm run build:client`
   - Publish directory: `dist/spa`
   - Functions directory: `netlify/functions`

3. **Deploy**
   - Click "Deploy site"
   - Wait for deployment to complete
   - Your app will be live at `https://your-site.netlify.app`

#### Using Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login to Netlify
netlify login

# Initialize (first time)
netlify init

# Deploy to draft
netlify deploy

# Deploy to production
netlify deploy --prod
```

#### Configuration
The project includes `netlify.toml` with optimal settings.

---

### Option 3: Docker Deployment

#### Build Docker Image

```bash
# Build the image
docker build -t driverfront:latest .

# Run the container
docker run -d -p 8080:8080 --name driverfront driverfront:latest

# Access the app
# Open http://localhost:8080
```

#### Using Docker Compose

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

#### Deploy to Cloud Platforms

**AWS ECS/Fargate:**
```bash
# Tag image
docker tag driverfront:latest your-account.dkr.ecr.region.amazonaws.com/driverfront:latest

# Push to ECR
docker push your-account.dkr.ecr.region.amazonaws.com/driverfront:latest
```

**Google Cloud Run:**
```bash
# Tag image
docker tag driverfront:latest gcr.io/your-project/driverfront:latest

# Push to GCR
docker push gcr.io/your-project/driverfront:latest

# Deploy
gcloud run deploy driverfront --image gcr.io/your-project/driverfront:latest --platform managed
```

**Azure Container Instances:**
```bash
# Create container registry
az acr create --name yourregistry --resource-group yourgroup --sku Basic

# Login to ACR
az acr login --name yourregistry

# Tag and push
docker tag driverfront:latest yourregistry.azurecr.io/driverfront:latest
docker push yourregistry.azurecr.io/driverfront:latest

# Deploy
az container create --resource-group yourgroup --name driverfront --image yourregistry.azurecr.io/driverfront:latest --dns-name-label driverfront --ports 8080
```

---

### Option 4: Static Hosting (S3, Cloudflare Pages, GitHub Pages)

#### AWS S3 + CloudFront

```bash
# Build the app
npm run build

# Install AWS CLI
# pip install awscli

# Sync to S3
aws s3 sync dist/spa/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

#### Cloudflare Pages

1. **Via Dashboard**
   - Go to Cloudflare Pages
   - Connect GitHub repository
   - Build command: `npm run build:client`
   - Output directory: `dist/spa`
   - Deploy

2. **Via Wrangler CLI**
```bash
# Install Wrangler
npm i -g wrangler

# Login
wrangler login

# Deploy
wrangler pages deploy dist/spa
```

#### GitHub Pages

```bash
# Install gh-pages
npm i -D gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist/spa"

# Deploy
npm run deploy
```

---

### Option 5: Traditional VPS (DigitalOcean, Linode, etc.)

#### Setup Server

```bash
# SSH into server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (process manager)
sudo npm i -g pm2

# Clone repository
git clone https://github.com/Ayushdevx/driverfront.git
cd driverfront

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start dist/server/node-build.mjs --name driverfront

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/driverfront /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Install SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 🔐 Environment Variables

### Required Variables
None (app works without environment variables)

### Optional Variables

```env
# API URL (if using separate backend)
VITE_API_URL=https://api.yourdomain.com

# Analytics
VITE_ANALYTICS_ID=GA-XXXXXXXXX

# Error Tracking
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx

# Feature Flags
VITE_ENABLE_WEARABLES=true
VITE_ENABLE_EMERGENCY_MODE=true
```

### Setting Environment Variables

**Vercel:**
- Dashboard → Settings → Environment Variables

**Netlify:**
- Site settings → Environment Variables

**Docker:**
```bash
docker run -e VITE_API_URL=https://api.example.com driverfront
```

---

## 🔄 CI/CD Setup

### GitHub Actions

The project includes `.github/workflows/deploy.yml` for automated deployment.

**Required Secrets:**

For Vercel:
- `VERCEL_TOKEN` - From vercel.com/account/tokens
- `VERCEL_ORG_ID` - From project settings
- `VERCEL_PROJECT_ID` - From project settings

For Netlify:
- `NETLIFY_AUTH_TOKEN` - From app.netlify.com/user/applications
- `NETLIFY_SITE_ID` - From site settings

**Setup:**
1. Go to GitHub repository → Settings → Secrets
2. Add required secrets
3. Push to `main` branch → Auto-deploy

---

## 🧪 Testing Deployment

### Local Production Test

```bash
# Build application
npm run build

# Start production server
npm run start

# Open browser
# http://localhost:8080
```

### Performance Testing

```bash
# Install Lighthouse CLI
npm i -g lighthouse

# Run Lighthouse
lighthouse http://localhost:8080 --view
```

---

## 🐛 Troubleshooting

### Build Fails

**Issue:** `Module not found` errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue:** TypeScript errors
```bash
# Run type checking
npm run typecheck
```

### Deployment Issues

**Issue:** 404 on refresh (SPA routing)
- Add rewrite rules in hosting config
- Vercel: `vercel.json` already configured
- Netlify: `netlify.toml` already configured

**Issue:** Environment variables not working
- Prefix with `VITE_` (not `REACT_APP_`)
- Rebuild after adding variables
- Check hosting platform variable settings

---

## 📊 Monitoring

### Recommended Tools

- **Vercel Analytics** - Built-in (free)
- **Netlify Analytics** - Built-in (paid)
- **Google Analytics** - Add tracking code
- **Sentry** - Error tracking
- **LogRocket** - Session replay

---

## 🔄 Updates & Maintenance

### Updating Deployment

```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build
npm run build

# Restart (if using PM2)
pm2 restart driverfront
```

### Automated Updates (Vercel/Netlify)
- Push to `main` → Auto-deploys
- No manual intervention needed

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Ayushdevx/driverfront/issues)
- **Documentation**: [README.md](./README.md)
- **Enhancements**: [DASHBOARD_ENHANCEMENTS.md](./DASHBOARD_ENHANCEMENTS.md)

---

## ✅ Post-Deployment Checklist

- [ ] Application loads correctly
- [ ] All routes work (test navigation)
- [ ] Dashboard displays real-time data
- [ ] Animations are smooth
- [ ] No console errors
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Custom domain configured (optional)
- [ ] Analytics setup (optional)
- [ ] Error tracking setup (optional)

---

**Congratulations! Your app is now live! 🎉**
