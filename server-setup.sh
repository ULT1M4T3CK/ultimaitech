#!/bin/bash

echo "🛠️ Setting up production server for www.ultimaitech.com..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
sudo apt install docker.io docker-compose-plugin -y

# Add user to docker group
sudo usermod -aG docker $USER

# Install Certbot for SSL
echo "🔒 Installing Certbot for SSL certificates..."
sudo apt install certbot python3-certbot-nginx -y

# Configure firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw --force enable

# Install security tools
echo "🛡️ Installing security tools..."
sudo apt install fail2ban unattended-upgrades -y

# Create SSL certificates
echo "🔒 Creating SSL certificates..."
echo "Please run the following command manually after this script completes:"
echo "sudo certbot certonly --standalone -d ultimaitech.com -d www.ultimaitech.com"

echo ""
echo "✅ Server setup completed!"
echo ""
echo "🚀 Next steps:"
echo "1. Log out and log back in (or run: newgrp docker)"
echo "2. Get SSL certificates: sudo certbot certonly --standalone -d ultimaitech.com -d www.ultimaitech.com"
echo "3. Clone your repository: git clone https://github.com/ULT1M4T3CK/ultimaitech.git"
echo "4. Deploy with SSL: cd ultimaitech && ./deploy-ssl.sh"
echo ""
echo "🌐 Your website will be live at: https://www.ultimaitech.com"
