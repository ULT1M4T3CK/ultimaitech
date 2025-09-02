#!/bin/bash

echo "🚀 Deploying UltimAItech Website..."

# Create logs directory
mkdir -p logs/nginx

# Stop existing container if running
echo "📦 Stopping existing container..."
docker-compose -f docker-compose.prod.yml down

# Build the Docker image
echo "🔨 Building Docker image..."
docker build -t ultimaitech-website:latest .

# Start the container
echo "🚀 Starting container..."
docker-compose -f docker-compose.prod.yml up -d

# Check if container is running
echo "✅ Checking container status..."
docker ps | grep ultimaitech-website

echo "🎉 Deployment completed!"
echo "🌐 Your website should be accessible at:"
echo "   - http://ultimaitech.com"
echo "   - http://www.ultimaitech.com"
echo ""
echo "📋 Container logs:"
docker-compose -f docker-compose.prod.yml logs -f
