#!/bin/bash

# CyberPanel Portfolio Setup Script
# Run this in your domain's public_html directory

echo "🚀 Setting up portfolio for CyberPanel deployment..."

# Get domain from current directory (assumes you're in /home/domain.com/public_html)
DOMAIN=$(pwd | cut -d'/' -f3)
echo "📍 Detected domain: $DOMAIN"

# Clone your repository (replace with your repo URL)
echo "📥 Cloning repository..."
git clone https://github.com/your-username/portfolio.git .

# Install Node.js dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building project..."
npm run build

# Create PM2 ecosystem file for better process management
echo "⚙️ Setting up PM2 configuration..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'portfolio-${DOMAIN}',
    script: 'server.js',
    cwd: '/home/${DOMAIN}/public_html',
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

# Install PM2 globally if not installed
if ! command -v pm2 &> /dev/null; then
    echo "📥 Installing PM2..."
    npm install -g pm2
fi

# Start the application
echo "🚀 Starting application..."
pm2 start ecosystem.config.js
pm2 save

# Create deployment script for easy updates
cat > deploy.sh << EOF
#!/bin/bash
echo "🔄 Deploying latest changes..."
git pull origin main
npm ci --production
npm run build
pm2 restart portfolio-${DOMAIN}
echo "✅ Deployment complete!"
EOF

chmod +x deploy.sh

# Create a simple health check endpoint
cat > health-check.js << EOF
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  if (res.statusCode === 200) {
    console.log('✅ Application is healthy');
    process.exit(0);
  } else {
    console.log('❌ Application returned status:', res.statusCode);
    process.exit(1);
  }
});

req.on('error', (err) => {
  console.log('❌ Health check failed:', err.message);
  process.exit(1);
});

req.on('timeout', () => {
  console.log('❌ Health check timed out');
  req.destroy();
  process.exit(1);
});

req.setTimeout(5000);
req.end();
EOF

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update your GitHub repository URL in this script"
echo "2. Configure GitHub secrets:"
echo "   - HOST: Your server IP"
echo "   - USERNAME: Your CyberPanel user"
echo "   - PASSWORD: Your user password"
echo "   - PORT: SSH port (usually 22)"
echo "   - DOMAIN_USER: $DOMAIN"
echo "3. Set up SSL certificate in CyberPanel"
echo "4. Configure domain DNS to point to your server"
echo ""
echo "🔧 Useful commands:"
echo "   - Check app status: pm2 status"
echo "   - View logs: pm2 logs portfolio-$DOMAIN"
echo "   - Manual deploy: ./deploy.sh"
echo "   - Health check: node health-check.js"