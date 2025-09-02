# 🌐 DNS Configuration Guide for www.ultimaitech.com

## Prerequisites
- Domain purchased: ultimaitech.com
- Server with public IP address
- Access to your domain registrar's DNS management

## Step 1: Get Your Server's Public IP Address

### If hosting on a cloud provider (AWS, DigitalOcean, etc.):
- Check your server's public IP in the provider's dashboard
- It will look like: `203.0.113.1`

### If hosting at home:
- Go to [whatismyipaddress.com](https://whatismyipaddress.com)
- Note your public IP address

## Step 2: Configure DNS Records

### Log into your domain registrar (GoDaddy, Namecheap, etc.)

### Add these DNS records:

#### A Record (Root Domain)
```
Type: A
Name: @ (or leave blank)
Value: YOUR_SERVER_IP_ADDRESS
TTL: 3600 (or default)
```

#### A Record (WWW Subdomain)
```
Type: A
Name: www
Value: YOUR_SERVER_IP_ADDRESS
TTL: 3600 (or default)
```

### Example with IP 203.0.113.1:
```
A    @    203.0.113.1    3600
A    www  203.0.113.1    3600
```

## Step 3: Verify DNS Propagation

### Check DNS propagation:
- [dnschecker.org](https://dnschecker.org)
- [whatsmydns.net](https://whatsmydns.net)

### Test locally:
```bash
nslookup ultimaitech.com
nslookup www.ultimaitech.com
```

## Step 4: Test Your Website

### After DNS propagation (can take 24-48 hours):
1. Open browser and go to `http://ultimaitech.com`
2. Should redirect to `https://ultimaitech.com` (if SSL configured)
3. Test `http://www.ultimaitech.com` as well

## Common Issues & Solutions

### Issue: "This site can't be reached"
- Check if DNS records are correct
- Verify server is running and accessible
- Check firewall settings

### Issue: "Connection timed out"
- Verify port 80/443 is open on server
- Check if Docker container is running
- Test with: `curl -I http://YOUR_SERVER_IP`

### Issue: "SSL certificate error"
- Ensure Let's Encrypt certificates are properly configured
- Check nginx.ssl.conf is being used
- Verify certificate paths are correct

## Security Considerations

### Firewall Rules:
```bash
# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow SSH (if needed)
sudo ufw allow 22/tcp
```

### SSL Certificate Renewal:
```bash
# Set up automatic renewal with cron
0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring

### Check website status:
```bash
# Check if container is running
docker ps | grep ultimaitech-website

# Check nginx logs
docker exec ultimaitech-website tail -f /var/log/nginx/access.log

# Check nginx status
docker exec ultimaitech-website nginx -t
```

---

**Next Steps:**
1. Configure DNS records at your registrar
2. Wait for DNS propagation
3. Deploy your Docker container
4. Test your website
5. Set up SSL certificates (optional but recommended)

**Support:**
If you encounter issues, check:
- DNS propagation status
- Server accessibility
- Docker container logs
- Firewall configuration
