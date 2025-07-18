# Portfolio Deployment with CyberPanel

## 🎯 CyberPanel Automated Deployment

### Step 1: Create Website in CyberPanel

1. **Login to CyberPanel** (usually port 8090)
2. **Create Website:**
   - Go to `Websites` → `Create Website`
   - Domain: `yourdomain.com`
   - Email: Your email
   - Package: Default or custom
   - PHP Version: Not needed (we'll use Node.js)
   - Click `Create Website`

### Step 2: Setup Node.js in CyberPanel

1. **Enable Node.js:**
   - Go to `Websites` → `List Websites`
   - Click your domain
   - Go to `Manage` → `Node.js`
   - Click `Create App`
   - App Name: `portfolio`
   - Startup File: `server.js` (we'll create this)
   - App Root: `/home/yourdomain.com/public_html`

### Step 3: Server Setup

**SSH into your server and run:**

```bash
# Navigate to your domain's directory
cd /home/yourdomain.com/public_html

# Run the setup script
wget https://raw.githubusercontent.com/your-repo/portfolio/main/cyberpanel-setup.sh
chmod +x cyberpanel-setup.sh
./cyberpanel-setup.sh
```

### Step 4: Configure GitHub Secrets

Go to GitHub → Your Repository → Settings → Secrets and variables → Actions

Add these secrets:

| Secret | Value | Example |
|--------|-------|---------|
| `HOST` | Your server IP | `123.456.78.90` |
| `USERNAME` | CyberPanel user | `admin` or your username |
| `PASSWORD` | User password | Your password |
| `PORT` | SSH port | `22` |
| `DOMAIN_USER` | Domain folder name | `yourdomain.com` |

### Step 5: CyberPanel Configuration

1. **SSL Certificate:**
   - Go to `SSL` → `Manage SSL`
   - Select your domain
   - Choose `Lets Encrypt` or upload custom certificate
   - Click `Issue SSL`

2. **Node.js App Setup:**
   - Go to `Websites` → `List Websites`
   - Click your domain → `Manage`
   - Click `Node.js Selector`
   - Set Node.js version to `18`
   - App Root: `/home/yourdomain.com/public_html`
   - Startup File: `server.js`
   - Click `Create App`

3. **Reverse Proxy (Optional but recommended):**
   - Go to `Websites` → `List Websites`
   - Click your domain → `Manage`
   - Click `Rewrite Rules`
   - Add this rule:
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
   ```

### Step 6: Alternative Simple Setup (If Node.js Selector doesn't work)

**Create a simple reverse proxy in CyberPanel:**

1. **Go to your domain's document root:**
```bash
cd /home/yourdomain.com/public_html
```

2. **Create .htaccess file:**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# Enable CORS if needed
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type, Authorization"
```

### Step 7: Manual Deployment Process

**For manual deployments, use these commands:**

```bash
# SSH into your server
ssh your-username@your-server-ip

# Navigate to your website directory
cd /home/yourdomain.com/public_html

# Run the deployment script
./deploy.sh
```

---

## 🔧 CyberPanel Specific Features

### 1. Backup Management
```bash
# CyberPanel has built-in backup
# Go to: Backup → Create Backup
# Or via command line:
cyberpanel createBackup --domainName yourdomain.com
```

### 2. Log Management
```bash
# View application logs
pm2 logs portfolio-yourdomain.com

# View CyberPanel logs
tail -f /home/cyberpanel/logs/access.log
tail -f /home/cyberpanel/logs/error.log
```

### 3. Resource Monitoring
- Go to `Server Status` in CyberPanel
- Monitor CPU, RAM, Disk usage
- Set up alerts for high resource usage

### 4. Database Setup (if needed)
```bash
# Create database via CyberPanel
# Go to: Databases → Create Database
# Then update your environment variables
```

---

## 🚀 Advanced CyberPanel Features

### 1. Email Setup
```bash
# If you want contact form emails
# Go to: Email → Create Email Account
# Configure SMTP settings in your app
```

### 2. CDN Integration
```bash
# CyberPanel supports CloudFlare integration
# Go to: DNS → Cloudflare
# Add your CloudFlare API key
```

### 3. Security Features
```bash
# Enable ModSecurity
# Go to: Security → ModSecurity
# Configure firewall rules
```

---

## 🛠️ Troubleshooting CyberPanel Issues

### 1. Node.js App Not Starting
```bash
# Check if port 3000 is available
netstat -tulpn | grep :3000

# Manually start the app
cd /home/yourdomain.com/public_html
node server.js

# Check PM2 status
pm2 status
pm2 logs portfolio-yourdomain.com
```

### 2. SSL Certificate Issues
```bash
# Check SSL status in CyberPanel
# Go to: SSL → Manage SSL → Check SSL Status

# Manual SSL renewal
/root/.acme.sh/acme.sh --renew -d yourdomain.com
```

### 3. Permission Issues
```bash
# Fix ownership
chown -R cyberpanel:cyberpanel /home/yourdomain.com/public_html

# Fix permissions
chmod -R 755 /home/yourdomain.com/public_html
```

### 4. Memory Issues
```bash
# Check memory usage
free -h

# Restart CyberPanel services
systemctl restart lscpd
systemctl restart lsws
```

---

## 📈 Performance Optimization for CyberPanel

### 1. LiteSpeed Cache
```bash
# Enable LiteSpeed Cache in CyberPanel
# Go to: Websites → List Websites → Manage → LiteSpeed Cache
# Enable cache and configure settings
```

### 2. PHP-FPM (if using PHP alongside Node.js)
```bash
# Optimize PHP-FPM settings
# Go to: Server → PHP → PHP Config
# Adjust memory_limit and max_execution_time
```

### 3. Resource Limits
```bash
# Set resource limits for your domain
# Go to: Packages → Modify Package
# Set appropriate CPU and RAM limits
```

---

## ✅ Final Checklist for CyberPanel

- [ ] Website created in CyberPanel
- [ ] Node.js app configured
- [ ] SSL certificate installed
- [ ] GitHub secrets configured
- [ ] First deployment successful
- [ ] Domain resolving correctly
- [ ] Application accessible via HTTPS
- [ ] PM2 process running
- [ ] Backup strategy in place
- [ ] Monitoring set up

---

## 🎯 Quick Commands Reference

```bash
# Check app status
pm2 status

# View logs
pm2 logs portfolio-yourdomain.com

# Manual deployment
cd /home/yourdomain.com/public_html && ./deploy.sh

# Restart app
pm2 restart portfolio-yourdomain.com

# Health check
node health-check.js

# Check CyberPanel status
systemctl status lscpd
```