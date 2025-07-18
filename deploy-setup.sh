#!/bin/bash

# Portfolio Server Setup Script
# Run this on your server to prepare for automated deployments

echo "🚀 Setting up server for portfolio deployment..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Create directory for your project
sudo mkdir -p /var/www/your-domain.com
sudo chown -R $USER:$USER /var/www/your-domain.com

# Navigate to project directory
cd /var/www/your-domain.com

# Clone your repository (replace with your repo URL)
git clone https://github.com/your-username/portfolio.git .

# Install dependencies
npm ci

# Build the project
npm run build

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'portfolio',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/your-domain.com',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Start the application with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "✅ Server setup complete!"
echo "🔧 Next steps:"
echo "1. Configure Nginx reverse proxy"
echo "2. Set up SSL certificate"
echo "3. Add GitHub secrets for deployment"