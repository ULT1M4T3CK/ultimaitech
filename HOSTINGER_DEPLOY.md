# 🌐 Hostinger Deployment Guide for www.ultimaitech.com

## Overview
Deploy your UltimAItech website to Hostinger hosting with SSL and optimized performance.

## Prerequisites
- Hostinger hosting account (Premium or Business plan recommended)
- Domain: www.ultimaitech.com
- cPanel access from Hostinger

## Deployment Options

### Option 1: Static Site Deployment (Recommended for React Apps)

#### Step 1: Build Your Website Locally
```bash
# On your local machine
cd Frontend
npm run build

# This creates a 'dist' folder with your built website
```

#### Step 2: Upload to Hostinger
1. **Login to cPanel** (provided by Hostinger)
2. **Open File Manager**
3. **Navigate to public_html** folder
4. **Upload the contents** of your `Frontend/dist` folder
5. **Extract/Copy all files** to public_html root

#### Step 3: Configure Domain
1. **In Hostinger Panel**, go to Domains
2. **Point your domain** www.ultimaitech.com to your hosting account
3. **Update DNS** if needed (Hostinger will provide instructions)

### Option 2: Node.js App Deployment (Full Stack)

#### Step 1: Prepare Your Application
```bash
# Create a deployment package
tar -czf ultimaitech-app.tar.gz Frontend/ backend/ package.json
```

#### Step 2: Upload via SSH/SFTP
```bash
# Using SFTP (Hostinger provides SSH access on Business plans)
sftp your-username@your-domain.com
put ultimaitech-app.tar.gz
```

#### Step 3: Setup Node.js in cPanel
1. **Login to cPanel**
2. **Find "Node.js" or "Node.js Apps"**
3. **Create new Node.js app**
4. **Set startup file**: `backend/dist/index.js`
5. **Install dependencies**

## Hostinger-Specific Configuration

### .htaccess for React Routing
Create this file in your public_html folder:

```apache
# .htaccess for React Router
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Handle Angular and React Router
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive on
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-XSS-Protection "1; mode=block"
  Header always set Referrer-Policy "no-referrer-when-downgrade"
</IfModule>
```

### SSL Certificate Setup
1. **In Hostinger Panel**, go to SSL
2. **Enable "Free SSL"** (Let's Encrypt)
3. **Force HTTPS** redirect
4. **Verify certificate** is active

## Step-by-Step Hostinger Deployment

### Step 1: Login to Hostinger
1. Go to [hostinger.com](https://hostinger.com)
2. Login to your account
3. Access your hosting panel

### Step 2: Prepare Your Files
```bash
# On your MacBook
cd /Users/andrehassler/Desktop/Projects/UltimAItech
cd Frontend
npm run build

# Your files are now in Frontend/dist/
ls -la dist/
```

### Step 3: Upload Files
**Option A: File Manager (Easy)**
1. **cPanel** → **File Manager**
2. **Navigate to public_html**
3. **Upload** → Select all files from `Frontend/dist/`
4. **Extract** if uploaded as zip

**Option B: FTP (Advanced)**
```bash
# Use FTP client like FileZilla
# Host: ftp.your-domain.com
# Username: (provided by Hostinger)
# Password: (provided by Hostinger)
```

### Step 4: Configure Domain
1. **Hostinger Panel** → **Domains**
2. **Manage Domain** → www.ultimaitech.com
3. **Point to hosting** account
4. **Update nameservers** if needed

### Step 5: Enable SSL
1. **Hostinger Panel** → **SSL**
2. **Activate Free SSL** for www.ultimaitech.com
3. **Force HTTPS** redirect
4. **Wait 15-30 minutes** for activation

## Testing Your Deployment

### Local Testing
```bash
# Test your built files locally first
cd Frontend/dist
python3 -m http.server 8000
# Visit: http://localhost:8000
```

### Live Testing
1. **Visit**: http://www.ultimaitech.com
2. **Check SSL**: https://www.ultimaitech.com
3. **Test all pages**: Home, Services, Portfolio, Contact
4. **Verify forms** work properly

## Hostinger Panel Configuration

### Performance Settings
1. **Enable LiteSpeed Cache** (if available)
2. **Enable Cloudflare** integration
3. **Optimize images** automatically
4. **Enable HTTP/2**

### Security Settings
1. **Enable SSL certificate**
2. **Set up backups** (daily recommended)
3. **Enable firewall** protection
4. **Monitor uptime**

## Updating Your Website

### Method 1: File Manager
1. **Build locally**: `npm run build`
2. **Upload new files** via cPanel File Manager
3. **Replace old files** in public_html

### Method 2: Git Integration (Advanced)
1. **Setup Git** in cPanel (if available)
2. **Connect repository**: https://github.com/ULT1M4T3CK/ultimaitech.git
3. **Auto-deploy** on push

## Hostinger Specific Features

### Email Setup
1. **Create email accounts**: admin@ultimaitech.com
2. **Setup forwarding** to your Gmail
3. **Configure contact form** to use hosting email

### Database (If Needed)
1. **Create MySQL database** in cPanel
2. **Update backend config** with new credentials
3. **Import data** if migrating

### Monitoring
1. **Check uptime** in Hostinger panel
2. **Monitor traffic** and performance
3. **Review error logs** regularly

## Troubleshooting

### Common Issues
**404 Errors on Page Refresh**
- Solution: Add .htaccess file with React Router rules

**SSL Not Working**
- Wait 30 minutes after activation
- Check domain pointing correctly
- Contact Hostinger support

**Files Not Uploading**
- Check file size limits
- Use zip upload for multiple files
- Verify permissions

### Support Resources
- **Hostinger Knowledge Base**
- **24/7 Live Chat Support**
- **Video Tutorials**

## Cost and Performance

### Hosting Costs
- **Premium**: ~$2.99/month
- **Business**: ~$3.99/month
- **Includes**: SSL, Domain, Email

### Expected Performance
- **Load Time**: <3 seconds
- **Uptime**: 99.9%
- **Global CDN**: Available
- **SSD Storage**: Included

---

## Quick Deployment Checklist

- [ ] Build website locally (`npm run build`)
- [ ] Upload files to public_html via cPanel
- [ ] Add .htaccess file for React routing
- [ ] Configure domain in Hostinger panel
- [ ] Enable SSL certificate
- [ ] Test website functionality
- [ ] Set up email forwarding
- [ ] Configure backups

**Your website will be live at https://www.ultimaitech.com within 1-2 hours!** 🚀
