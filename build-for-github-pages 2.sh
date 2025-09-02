#!/bin/bash

echo "🚀 Building www.ultimaitech.com for GitHub Pages..."

# Navigate to Frontend directory and build
echo "🔨 Building frontend..."
cd Frontend

# Clean previous build
rm -rf dist

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

echo "✅ Frontend build completed!"

# Go back to root directory
cd ..

# Create docs folder for GitHub Pages (alternative to root deployment)
echo "📁 Preparing GitHub Pages deployment..."
rm -rf docs
mkdir -p docs

# Copy built files to docs folder
cp -r Frontend/dist/* docs/

# Copy CNAME file to docs folder
cp CNAME docs/

# Create 404.html for React Router (copy of index.html)
cp docs/index.html docs/404.html

echo "📊 Deployment Summary:"
echo "===================="
echo "📁 Files prepared in: docs/"
echo "🌐 Custom domain: www.ultimaitech.com"
echo ""
echo "📋 Contents:"
ls -la docs/
echo ""
echo "📏 Size:"
du -sh docs/
echo ""
echo "✅ Ready for GitHub Pages!"
echo ""
echo "🚀 Next steps:"
echo "1. git add ."
echo "2. git commit -m 'Deploy to GitHub Pages'"
echo "3. git push origin main"
echo "4. Enable GitHub Pages in repository settings"
echo "5. Set custom domain: www.ultimaitech.com"
echo "6. Configure DNS records"
echo ""
echo "🌐 Your site will be live at: https://www.ultimaitech.com"
echo "📖 See GITHUB_PAGES_DEPLOY.md for detailed instructions"

echo "🎉 Build for GitHub Pages completed successfully!"
