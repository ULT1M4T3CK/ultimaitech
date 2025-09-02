#!/bin/bash

echo "🚀 Building and Deploying www.ultimaitech.com..."

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

# Create logs directory
mkdir -p logs/nginx

# Stop existing container if running
echo "📦 Stopping existing containers..."
docker compose -f docker-compose.prod.yml down

# Build the Docker image
echo "🐳 Building Docker image for www.ultimaitech.com..."
docker build -t ultimaitech-website:latest .

# Start the container
echo "🚀 Starting container..."
docker compose -f docker-compose.prod.yml up -d

# Check if container is running
echo "✅ Checking container status..."
docker ps | grep ultimaitech-website

echo ""
echo "🎉 Deployment completed successfully!"
echo "🌐 Your website is now accessible at:"
echo "   - http://localhost:80 (local testing)"
echo "   - http://localhost (local testing)"
echo "   - http://www.ultimaitech.com (once DNS is configured)"
echo "   - https://www.ultimaitech.com (with SSL certificates)"
echo ""
echo "📋 To view container logs:"
echo "   docker compose -f docker-compose.prod.yml logs -f"
echo ""
echo "📋 To stop the container:"
echo "   docker compose -f docker-compose.prod.yml down"
