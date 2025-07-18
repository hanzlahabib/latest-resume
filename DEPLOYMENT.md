# Portfolio Deployment Guide

## 🚀 Automated Deployment Setup

### Prerequisites
- Ubuntu/Debian server with root access
- Domain name pointing to your server
- GitHub repository for your portfolio

---

## 📋 Step-by-Step Instructions

### 1. Server Initial Setup

```bash
# Run the setup script on your server
chmod +x deploy-setup.sh
./deploy-setup.sh
```

### 2. Configure Nginx

```bash
# Copy nginx configuration
sudo cp nginx-config.conf /etc/nginx/sites-available/your-domain.com

# Replace 'your-domain.com' with your actual domain
sudo sed -i 's/your-domain.com/yourdomain.com/g' /etc/nginx/sites-available/yourdomain.com

# Enable the site
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/

# Remove default nginx site
sudo rm /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### 3. SSL Certificate with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### 4. GitHub Secrets Configuration

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `HOST` | `your-server-ip` | Your server's IP address |
| `USERNAME` | `your-username` | SSH username (usually ubuntu/root) |
| `SSH_KEY` | `your-private-key` | Your SSH private key |
| `PORT` | `22` | SSH port (usually 22) |

### 5. Generate SSH Key for GitHub Actions

```bash
# On your local machine
ssh-keygen -t rsa -b 4096 -C "github-actions"

# Copy public key to server
ssh-copy-id -i ~/.ssh/id_rsa.pub user@your-server-ip

# Copy private key content for GitHub secret
cat ~/.ssh/id_rsa
```

---

## 🔄 Alternative Deployment Options

### Option A: Vercel (Easiest)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set up automatic deployments
vercel --prod
```

### Option B: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=out
```

### Option C: Docker + GitHub Actions

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🛠️ Troubleshooting

### Common Issues:

**1. Build Fails**
```bash
# Check Node version
node --version

# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
```

**2. PM2 Process Issues**
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs portfolio

# Restart application
pm2 restart portfolio
```

**3. Nginx Issues**
```bash
# Check nginx status
sudo systemctl status nginx

# View error logs
sudo tail -f /var/log/nginx/error.log

# Test configuration
sudo nginx -t
```

**4. SSL Certificate Issues**
```bash
# Check certificate status
sudo certbot certificates

# Renew certificates manually
sudo certbot renew
```

---

## 📈 Performance Optimization

### 1. Enable Compression
```bash
# Already included in nginx config
# Reduces file sizes by ~70%
```

### 2. CDN Setup (Optional)
- Cloudflare (Free)
- AWS CloudFront
- Vercel Edge Network

### 3. Monitoring Setup
```bash
# Install monitoring tools
npm install -g pm2-logrotate
pm2 install pm2-logrotate

# Set up log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

---

## 🔒 Security Best Practices

1. **Firewall Setup**
```bash
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
```

2. **Regular Updates**
```bash
# Add to crontab for automatic updates
0 2 * * 0 apt update && apt upgrade -y
```

3. **Backup Strategy**
```bash
# Backup script
#!/bin/bash
tar -czf /backup/portfolio-$(date +%Y%m%d).tar.gz /var/www/your-domain.com
```

---

## 🎯 Final Checklist

- [ ] Server setup completed
- [ ] Nginx configured and running
- [ ] SSL certificate installed
- [ ] GitHub secrets added
- [ ] First deployment successful
- [ ] Domain resolving correctly
- [ ] HTTPS working
- [ ] PM2 auto-restart enabled
- [ ] Monitoring set up

---

## 📞 Support

If you encounter issues:
1. Check GitHub Actions logs
2. Review server logs: `pm2 logs portfolio`
3. Verify nginx configuration: `sudo nginx -t`
4. Test deployment manually on server