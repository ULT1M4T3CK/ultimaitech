#!/bin/bash

echo "🔒 Deploying www.ultimaitech.com with SSL/HTTPS..."

# Check if SSL certificates exist
if [ ! -f "/etc/letsencrypt/live/ultimaitech.com/fullchain.pem" ]; then
    echo "❌ SSL certificates not found!"
    echo "Please run the following commands first:"
    echo "1. sudo certbot certonly --standalone -d ultimaitech.com -d www.ultimaitech.com"
    echo "2. Then run this script again"
    exit 1
fi

echo "✅ SSL certificates found!"

# Navigate to Frontend directory and build locally
echo "🔨 Building frontend locally..."
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

# Use SSL nginx configuration
echo "🔒 Switching to SSL configuration..."
cp nginx.ssl.conf nginx.conf

# Create logs directory
mkdir -p logs/nginx

# Stop existing container if running
echo "📦 Stopping existing containers..."
docker compose -f docker-compose.ssl.yml down

# Build the Docker image
echo "🐳 Building Docker image with SSL for www.ultimaitech.com..."
docker build -t ultimaitech-website:latest .

# Start the container with SSL
echo "🚀 Starting container with SSL..."
docker compose -f docker-compose.ssl.yml up -d

# Check if container is running
echo "✅ Checking container status..."
docker ps | grep ultimaitech-website

echo ""
echo "🎉 SSL Deployment completed successfully!"
echo "🔒 Your website is now accessible at:"
echo "   - https://www.ultimaitech.com (HTTPS - Secure)"
echo "   - https://ultimaitech.com (HTTPS - Secure)"
echo "   - http://www.ultimaitech.com (redirects to HTTPS)"
echo ""
echo "📋 To view container logs:"
echo "   docker compose -f docker-compose.ssl.yml logs -f"
echo ""
echo "📋 To stop the container:"
echo "   docker compose -f docker-compose.ssl.yml down"
echo ""
echo "🔒 SSL Certificate Auto-Renewal:"
echo "   Add to crontab: 0 12 * * * /usr/bin/certbot renew --quiet && docker compose -f $(pwd)/docker-compose.ssl.yml restart"
