#!/bin/bash
# Script to set up SSH key authentication for secure deployment

echo "🔐 Setting up SSH key authentication for secure deployment..."

# Generate SSH key pair for GitHub Actions
echo "📝 Generating SSH key pair for deployment..."
ssh-keygen -t rsa -b 4096 -C "github-actions@hanzla.com" -f ./github_deploy_key -N ""

echo ""
echo "✅ SSH key pair generated!"
echo ""

echo "🔧 Manual steps to complete setup:"
echo ""
echo "1. COPY THE PUBLIC KEY TO YOUR SERVER:"
echo "   Copy this public key content:"
echo "   ----------------------------------------"
cat ./github_deploy_key.pub
echo "   ----------------------------------------"
echo ""
echo "   Then on your server, run:"
echo "   mkdir -p ~/.ssh"
echo "   echo 'PASTE_PUBLIC_KEY_HERE' >> ~/.ssh/authorized_keys"
echo "   chmod 700 ~/.ssh"
echo "   chmod 600 ~/.ssh/authorized_keys"
echo ""

echo "2. ADD PRIVATE KEY TO GITHUB SECRETS:"
echo "   Copy this private key content:"
echo "   ----------------------------------------"
cat ./github_deploy_key
echo "   ----------------------------------------"
echo ""
echo "   Add it as SSH_KEY secret in GitHub:"
echo "   - Go to your repo → Settings → Secrets → Actions"
echo "   - Create new secret named: SSH_KEY"
echo "   - Paste the private key content above"
echo ""

echo "3. UPDATE YOUR SERVER SSH CONFIG (Optional but recommended):"
echo "   sudo nano /etc/ssh/sshd_config"
echo "   "
echo "   Make these changes:"
echo "   PasswordAuthentication no"
echo "   PubkeyAuthentication yes"
echo "   PermitRootLogin no"
echo "   "
echo "   Then restart SSH:"
echo "   sudo systemctl restart ssh"
echo ""

echo "4. TEST SSH CONNECTION:"
echo "   ssh -i ./github_deploy_key username@your-server-ip"
echo ""

echo "🚨 IMPORTANT:"
echo "- Keep the private key (github_deploy_key) secure"
echo "- Never commit it to git"
echo "- Delete it after adding to GitHub secrets"
echo "- Test SSH connection before disabling password auth"
echo ""

# Create .gitignore entry
echo "github_deploy_key*" >> .gitignore

echo "✅ Setup script complete!"
echo "📁 Files created:"
echo "   - github_deploy_key (private key - ADD TO GITHUB SECRETS)"
echo "   - github_deploy_key.pub (public key - ADD TO SERVER)"
echo "   - Updated .gitignore to exclude private key"