#!/bin/bash

echo "🌐 Building www.ultimaitech.com for Hostinger deployment..."

# Navigate to Frontend directory
cd Frontend

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist
rm -rf hostinger-deploy

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
echo "⚡ Building production build..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed! dist directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"

# Create Hostinger deployment folder
echo "📁 Preparing Hostinger deployment package..."
mkdir -p hostinger-deploy

# Copy all built files
cp -r dist/* hostinger-deploy/

# Create .htaccess file for React routing and optimization
cat > hostinger-deploy/.htaccess << 'EOL'
# .htaccess for React Router and Performance Optimization

# Enable Rewrite Engine
RewriteEngine On

# Handle React Router - Send all requests to index.html
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Gzip Compression
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
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive on
  
  # CSS and JavaScript
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType application/x-javascript "access plus 1 year"
  
  # Images
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
  
  # Fonts
  ExpiresByType font/ttf "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  
  # HTML
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-XSS-Protection "1; mode=block"
  Header always set Referrer-Policy "no-referrer-when-downgrade"
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>

# Force HTTPS (uncomment after SSL is active)
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Prevent access to sensitive files
<FilesMatch "\.(htaccess|htpasswd|ini|log|sh|inc|bak)$">
  Order Allow,Deny
  Deny from all
</FilesMatch>
EOL

# Create deployment instructions
cat > hostinger-deploy/UPLOAD_INSTRUCTIONS.txt << 'EOL'
🌐 HOSTINGER UPLOAD INSTRUCTIONS for www.ultimaitech.com

1. LOGIN TO HOSTINGER:
   - Go to hostinger.com
   - Login to your account
   - Access cPanel

2. UPLOAD FILES:
   - Open File Manager in cPanel
   - Navigate to public_html folder
   - Upload ALL files from this folder
   - Make sure .htaccess file is uploaded

3. CONFIGURE DOMAIN:
   - In Hostinger panel, go to Domains
   - Point www.ultimaitech.com to your hosting account
   - Update DNS if needed

4. ENABLE SSL:
   - Go to SSL section in Hostinger panel
   - Enable Free SSL certificate
   - Force HTTPS redirect

5. TEST WEBSITE:
   - Visit http://www.ultimaitech.com
   - Test all pages: Home, Services, Portfolio, Contact
   - Verify contact form works

Files to upload:
- index.html (main page)
- assets/ folder (CSS, JS, images)
- .htaccess (routing and optimization)
- All other files in this folder

Your website will be live at: https://www.ultimaitech.com
EOL

# Create a zip file for easy upload
echo "📦 Creating deployment package..."
cd hostinger-deploy
zip -r ../ultimaitech-hostinger-deploy.zip ./*
cd ..

# Get file sizes and summary
echo ""
echo "📊 Deployment Summary:"
echo "===================="
echo "📁 Files prepared in: Frontend/hostinger-deploy/"
echo "📦 Zip package: Frontend/ultimaitech-hostinger-deploy.zip"
echo ""
echo "📋 Package contents:"
ls -la hostinger-deploy/
echo ""
echo "📏 Package size:"
du -sh hostinger-deploy/
du -sh ultimaitech-hostinger-deploy.zip
echo ""
echo "✅ Ready for Hostinger deployment!"
echo ""
echo "🚀 Next steps:"
echo "1. Download: Frontend/ultimaitech-hostinger-deploy.zip"
echo "2. Login to Hostinger cPanel"
echo "3. Upload to public_html folder"
echo "4. Enable SSL certificate"
echo "5. Visit: https://www.ultimaitech.com"
echo ""
echo "📖 See HOSTINGER_DEPLOY.md for detailed instructions"

# Go back to root directory
cd ..

echo "🎉 Build for Hostinger completed successfully!"
