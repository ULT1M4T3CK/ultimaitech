# 🚀 Production Deployment Guide for www.ultimaitech.com

## Server Information
- **Domain**: www.ultimaitech.com
- **IP Address**: 31.161.190.2
- **DNS Status**: ✅ Configured and propagating

## Prerequisites on Production Server
- Ubuntu/Debian Linux server
- Docker and Docker Compose installed
- Ports 80 and 443 open
- SSH access to the server

## Step 1: Install Docker (if not already installed)

```bash
# Update package list
sudo apt update

# Install Docker
sudo apt install docker.io docker-compose-plugin -y

# Add user to docker group
sudo usermod -aG docker $USER

# Restart session or run:
newgrp docker

# Verify installation
docker --version
docker compose version
```

## Step 2: Clone and Deploy Your Website

```bash
# Clone your repository
git clone https://github.com/ULT1M4T3CK/ultimaitech.git
cd ultimaitech

# Make deployment script executable
chmod +x deploy.sh

# Run the deployment
./deploy.sh
```

## Step 3: Configure Firewall

```bash
# Allow HTTP and HTTPS traffic
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow SSH (if needed)
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

## Step 4: Test Your Website

```bash
# Test from server
curl -I http://localhost

# Test from external
curl -I http://www.ultimaitech.com
```

## Step 5: Set Up SSL with Let's Encrypt

### Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Get SSL Certificate
```bash
# Stop the Docker container temporarily
docker compose -f docker-compose.prod.yml down

# Get certificate
sudo certbot certonly --standalone -d ultimaitech.com -d www.ultimaitech.com

# Certificates will be saved to:
# /etc/letsencrypt/live/ultimaitech.com/fullchain.pem
# /etc/letsencrypt/live/ultimaitech.com/privkey.pem
```

### Update Docker Compose for SSL
```bash
# Edit docker-compose.prod.yml to mount certificates
# Add these volumes to the ultimaitech-website service:
volumes:
  - ./logs/nginx:/var/log/nginx
  - /etc/letsencrypt:/etc/letsencrypt:ro
```

### Switch to SSL Configuration
```bash
# Copy SSL config over regular config
cp nginx.ssl.conf nginx.conf

# Rebuild and restart
./deploy.sh
```

### Set Up Auto-Renewal
```bash
# Add to crontab
echo "0 12 * * * /usr/bin/certbot renew --quiet && docker compose -f /path/to/ultimaitech/docker-compose.prod.yml restart" | sudo crontab -
```

## Step 6: Monitoring and Maintenance

### Check Container Status
```bash
# View running containers
docker ps

# View logs
docker compose -f docker-compose.prod.yml logs -f

# Check nginx status
docker exec ultimaitech-website nginx -t
```

### Update Website
```bash
# Pull latest changes
git pull origin main

# Rebuild and redeploy
./deploy.sh
```

### Backup Important Data
```bash
# Backup SSL certificates
sudo tar -czf ssl-backup-$(date +%Y%m%d).tar.gz /etc/letsencrypt/

# Backup website files
tar -czf website-backup-$(date +%Y%m%d).tar.gz ultimaitech/
```

## Troubleshooting

### Website Not Loading
1. Check if container is running: `docker ps`
2. Check logs: `docker compose logs`
3. Test local access: `curl -I http://localhost`
4. Check firewall: `sudo ufw status`

### SSL Issues
1. Verify certificates exist: `ls -la /etc/letsencrypt/live/ultimaitech.com/`
2. Test SSL: `openssl s_client -connect ultimaitech.com:443`
3. Check nginx config: `docker exec ultimaitech-website nginx -t`

### DNS Issues
1. Test DNS: `nslookup www.ultimaitech.com`
2. Check propagation: Use online DNS checker tools
3. Wait up to 48 hours for full propagation

## Performance Optimization

### Server Level
```bash
# Install and configure fail2ban
sudo apt install fail2ban -y

# Set up automatic updates
sudo apt install unattended-upgrades -y
```

### Application Level
- Gzip compression: ✅ Already enabled
- Static asset caching: ✅ Already configured
- Security headers: ✅ Already implemented
- HTTP/2: ✅ Enabled with SSL

## Support Commands

```bash
# View website status
curl -I https://www.ultimaitech.com

# Check SSL certificate
openssl s_client -connect www.ultimaitech.com:443 -servername www.ultimaitech.com

# Monitor nginx access logs
docker exec ultimaitech-website tail -f /var/log/nginx/access.log

# Restart the website
docker compose -f docker-compose.prod.yml restart

# Stop the website
docker compose -f docker-compose.prod.yml down

# Update and redeploy
git pull && ./deploy.sh
```

---

## Quick Deployment Summary

1. **Install Docker** on your server
2. **Clone repository**: `git clone https://github.com/ULT1M4T3CK/ultimaitech.git`
3. **Deploy**: `cd ultimaitech && ./deploy.sh`
4. **Configure firewall**: Allow ports 80 and 443
5. **Set up SSL**: Use certbot and update nginx config
6. **Test**: Visit https://www.ultimaitech.com

Your professional website will be live at **https://www.ultimaitech.com**! 🎉
