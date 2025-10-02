#!/bin/bash

echo "🚀 Deploying UltimAItech Backend to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway (if not already logged in)
echo "🔐 Logging into Railway..."
railway login

# Deploy the backend
echo "📦 Deploying backend..."
cd backend
railway deploy

echo "✅ Backend deployment complete!"
echo "🌐 Your backend will be available at: https://your-project.railway.app"
echo ""
echo "Next steps:"
echo "1. Add PostgreSQL database in Railway dashboard"
echo "2. Update frontend API URL to your Railway backend URL"
echo "3. Update CORS settings in backend for your domain"
echo ""
echo "Admin dashboard will then be accessible at: https://www.ultimaitech.com/admin"
