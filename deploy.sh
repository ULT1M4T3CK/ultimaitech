#!/bin/bash

# UltimAItech Production Deployment Script
# This script helps deploy the application to your server

set -e  # Exit on any error

echo "🚀 UltimAItech Production Deployment Script"
echo "============================================="

# Check if .env file exists
if [ ! -f "backend/.env" ]; then
    echo "❌ Backend .env file not found!"
    echo "📋 Please copy backend/env.example to backend/.env and configure:"
    echo "   - Database credentials"
    echo "   - JWT secrets (generate with: node -e \"console.log(require('crypto').randomBytes(64).toString('hex'))\")"
    echo "   - Admin credentials"
    echo "   - CORS origins for your domain"
    exit 1
fi

# Check if docker-compose.yml exists
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ docker-compose.yml not found!"
    exit 1
fi

echo "✅ Pre-deployment checks passed"

# Generate secure secrets if needed
echo "🔐 Checking security configuration..."
if ! grep -q "your_strong_jwt_secret_here_use_crypto_randomBytes_to_generate" backend/.env; then
    echo "✅ JWT secret appears to be configured"
else
    echo "⚠️  JWT secret still uses default value. Please generate a secure secret!"
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p uploads logs ssl

# Set proper permissions
echo "🔒 Setting proper permissions..."
chmod 755 uploads logs ssl
chmod 644 backend/.env

# Build and deploy
echo "🏗️  Building and deploying containers..."
docker-compose down || true
docker-compose build --no-cache
docker-compose up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to start..."
sleep 30

# Check deployment status
echo "🔍 Checking deployment status..."
if docker-compose ps | grep -q "Up"; then
    echo "✅ All containers are running!"

    # Run health checks
    echo "🏥 Running health checks..."
    if curl -f http://localhost/health > /dev/null 2>&1; then
        echo "✅ Backend health check passed"
    else
        echo "⚠️  Backend health check failed - check logs with: npm run docker:logs"
    fi

    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ Frontend health check passed"
    else
        echo "⚠️  Frontend health check failed - check logs with: npm run docker:logs"
    fi

    echo ""
    echo "🎉 Deployment completed successfully!"
    echo ""
    echo "📋 Access your application:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:5002"
    echo "   Admin Panel: http://localhost:3000/admin"
    echo ""
    echo "🔧 Useful commands:"
    echo "   Check status: npm run deploy:status"
    echo "   View logs: npm run docker:logs"
    echo "   Restart: npm run docker:rebuild"
    echo "   Stop: npm run docker:down"

else
    echo "❌ Deployment failed! Check logs with: npm run docker:logs"
    exit 1
fi
