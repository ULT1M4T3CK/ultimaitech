#!/bin/bash

# UltimAItech Full-Stack Deployment Script
echo "🚀 Starting UltimAItech Full-Stack Deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Set environment variables
export POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-ultimaitech_secure_password}
export JWT_SECRET=${JWT_SECRET:-ultimaitech_jwt_secret_$(openssl rand -hex 32)}

echo "📦 Building frontend..."
cd Frontend
npm run build
cd ..

echo "🐳 Starting full-stack deployment with Docker..."
docker compose -f docker-compose.fullstack.yml down
docker compose -f docker-compose.fullstack.yml build --no-cache
docker compose -f docker-compose.fullstack.yml up -d

echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
if docker compose -f docker-compose.fullstack.yml ps | grep -q "Up"; then
    echo "✅ Deployment successful!"
    echo ""
    echo "🌐 Your website is now running at:"
    echo "   - Frontend: http://localhost"
    echo "   - Backend API: http://localhost/api"
    echo ""
    echo "🔧 To view logs:"
    echo "   docker compose -f docker-compose.fullstack.yml logs -f"
    echo ""
    echo "🛑 To stop:"
    echo "   docker compose -f docker-compose.fullstack.yml down"
else
    echo "❌ Deployment failed. Check logs:"
    docker compose -f docker-compose.fullstack.yml logs
fi
