#!/bin/bash
# Run this script on your CyberPanel server to fix deployment permissions

echo "🔧 Setting up deployment permissions for CyberPanel..."

# Get current user
DEPLOY_USER=$(whoami)
echo "Current user: $DEPLOY_USER"

# Option 1: Add passwordless sudo for specific commands
echo "Adding passwordless sudo for deployment commands..."
sudo tee /etc/sudoers.d/cyberpanel-deploy > /dev/null << EOF
# Allow $DEPLOY_USER to run deployment commands without password
$DEPLOY_USER ALL=(ALL) NOPASSWD: /bin/cp, /bin/rm, /bin/chown, /usr/bin/find, /usr/bin/tee
EOF

# Option 2: Change ownership of public_html to deployment user (alternative)
echo "Option: Change ownership to allow direct deployment..."
echo "Run this if you want to avoid sudo entirely:"
echo "sudo chown -R $DEPLOY_USER:$DEPLOY_USER /home/hanzla.com/public_html"

# Option 3: Add user to web group
if getent group hanzla.com > /dev/null 2>&1; then
    echo "Adding $DEPLOY_USER to hanzla.com group..."
    sudo usermod -a -G hanzla.com $DEPLOY_USER
fi

echo "✅ Server permissions configured!"
echo "📝 Choose one approach:"
echo "1. Use passwordless sudo (already configured)"
echo "2. Change ownership: sudo chown -R $DEPLOY_USER:$DEPLOY_USER /home/hanzla.com/public_html"
echo "3. Test deployment with current GitHub Actions workflow"