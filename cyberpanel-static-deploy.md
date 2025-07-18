# Static Portfolio Deployment for CyberPanel

## 🌟 Simple Static Deployment (No Node.js needed!)

Since CyberPanel is already serving your domain from `public_html`, we'll deploy your portfolio as a **static site**.

### Step 1: Configure Next.js for Static Export

Update your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### Step 2: Update package.json Scripts

Add export script to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next build && next export",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Step 3: GitHub Actions for Static Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Static Site to CyberPanel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build and export static site
      run: |
        npm run build
        npx next export
        
    - name: Deploy to CyberPanel
      uses: appleboy/ssh-action@v1.0.3
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        password: ${{ secrets.PASSWORD }}
        port: ${{ secrets.PORT }}
        script: |
          # Navigate to your domain's public_html
          cd /home/hanzla.com/public_html
          
          # Backup current site
          if [ -d "backup" ]; then rm -rf backup; fi
          if [ -d "assets" ]; then mv assets backup_assets; fi
          if [ -f "index.html" ]; then mv index.html backup_index.html; fi
          
          # Clear public_html (keep important files)
          find . -maxdepth 1 -type f -name "*.html" -delete
          find . -maxdepth 1 -type d -name "_next" -exec rm -rf {} +
          find . -maxdepth 1 -type d -name "assets" -exec rm -rf {} +
          
    - name: Upload static files
      uses: appleboy/scp-action@v0.1.7
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        password: ${{ secrets.PASSWORD }}
        port: ${{ secrets.PORT }}
        source: "out/*"
        target: "/home/hanzla.com/public_html/"
        strip_components: 1
        overwrite: true
        
    - name: Set permissions
      uses: appleboy/ssh-action@v1.0.3
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        password: ${{ secrets.PASSWORD }}
        port: ${{ secrets.PORT }}
        script: |
          # Set correct permissions
          cd /home/hanzla.com/public_html
          chown -R hanzla.com:hanzla.com .
          find . -type d -exec chmod 755 {} \;
          find . -type f -exec chmod 644 {} \;
          
          echo "✅ Static site deployed successfully!"
```

---

## 🚀 Alternative: Simple rsync Deployment

Create a simpler deployment script:

```yaml
name: Deploy to CyberPanel (Simple)

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Build static site
      run: |
        npm ci
        npm run build
        npx next export
        
    - name: Deploy via rsync
      uses: burnett01/rsync-deployments@6.0.0
      with:
        switches: -avzr --delete
        path: out/
        remote_path: /home/hanzla.com/public_html/
        remote_host: ${{ secrets.HOST }}
        remote_user: ${{ secrets.USERNAME }}
        remote_key: ${{ secrets.SSH_KEY }}
```

---

## 🔧 Manual Setup on CyberPanel

### Step 1: Access your server
```bash
ssh your-username@your-server-ip
cd /home/hanzla.com/public_html
```

### Step 2: Create deployment script
```bash
cat > deploy.sh << 'EOF'
#!/bin/bash
echo "🚀 Deploying hanzla.com portfolio..."

# Clone/update repository
if [ ! -d ".git" ]; then
    git clone https://github.com/your-username/portfolio.git temp_repo
    mv temp_repo/* .
    mv temp_repo/.* . 2>/dev/null || true
    rm -rf temp_repo
else
    git pull origin main
fi

# Install dependencies and build
npm ci
npm run build
npx next export

# Move static files to public_html root
rm -rf _next assets *.html 2>/dev/null || true
mv out/* .
rmdir out

# Set permissions
chown -R hanzla.com:hanzla.com .
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;

echo "✅ Deployment complete!"
EOF

chmod +x deploy.sh
```

### Step 3: Run first deployment
```bash
./deploy.sh
```

---

## 📝 GitHub Secrets Setup

Go to GitHub → Repository → Settings → Secrets and variables → Actions

| Secret | Value |
|--------|-------|
| `HOST` | Your server IP |
| `USERNAME` | Your CyberPanel username |
| `PASSWORD` | Your password (or use SSH_KEY) |
| `PORT` | SSH port (usually 22) |

---

## ✅ Benefits of Static Deployment

1. **No Node.js required** - Just HTML/CSS/JS files
2. **Faster loading** - Pre-built static files
3. **Better SEO** - All content is pre-rendered
4. **Easier maintenance** - No server processes to manage
5. **Lower resource usage** - Just serving static files
6. **Built-in caching** - CyberPanel/LiteSpeed caches automatically

---

## 🔧 CyberPanel Optimizations

### 1. Enable LiteSpeed Cache
- Go to CyberPanel → Websites → List Websites
- Click hanzla.com → Manage → LiteSpeed Cache
- Enable cache for static files

### 2. Enable Gzip Compression
- Go to CyberPanel → Websites → List Websites  
- Click hanzla.com → Manage → Rewrite Rules
- Add:
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

### 3. Set Browser Caching
Add to your .htaccess:
```apache
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
</IfModule>
```

---

## 🎯 Quick Commands

```bash
# Manual deployment
cd /home/hanzla.com/public_html && ./deploy.sh

# Check site status
curl -I https://hanzla.com

# View CyberPanel logs
tail -f /usr/local/lsws/logs/access.log
tail -f /usr/local/lsws/logs/error.log
```

---

## 📋 Final Checklist

- [ ] Updated next.config.js for static export
- [ ] GitHub Actions workflow created
- [ ] GitHub secrets configured
- [ ] Manual deployment script created
- [ ] First deployment successful
- [ ] SSL certificate working
- [ ] LiteSpeed cache enabled
- [ ] Gzip compression enabled
- [ ] Browser caching configured

Your portfolio will now deploy automatically as a static site whenever you push to GitHub! 🎉