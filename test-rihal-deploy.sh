#!/bin/bash
# Test script for rihal-7 deployment setup

echo "🧪 Testing Rihal-7 deployment setup..."

RIHAL_DIR="../rihal-new"

# Check if rihal-new directory exists
if [ ! -d "$RIHAL_DIR" ]; then
    echo "❌ rihal-new directory not found at $RIHAL_DIR"
    exit 1
fi

echo "✅ Found rihal-new directory"

# Check for index.html
if [ -f "$RIHAL_DIR/index.html" ]; then
    echo "✅ Found index.html in rihal-new"
    echo "📄 File size: $(du -h "$RIHAL_DIR/index.html" | cut -f1)"
else
    echo "❌ No index.html found in rihal-new"
fi

# List all files in rihal-new
echo "📁 Files in rihal-new:"
ls -la "$RIHAL_DIR"

# Check if .github/workflows directory exists
if [ -d "$RIHAL_DIR/.github/workflows" ]; then
    echo "✅ Found .github/workflows directory"
    echo "📄 Workflow files:"
    ls -la "$RIHAL_DIR/.github/workflows/"
else
    echo "❌ No .github/workflows directory found"
    echo "💡 You need to create: $RIHAL_DIR/.github/workflows/deploy.yml"
fi

# Create the deployment workflow if it doesn't exist
if [ ! -f "$RIHAL_DIR/.github/workflows/deploy.yml" ]; then
    echo "🔧 Creating deployment workflow..."
    mkdir -p "$RIHAL_DIR/.github/workflows"
    
    cat > "$RIHAL_DIR/.github/workflows/deploy.yml" << 'EOF'
name: Deploy Rihal-7 to hanzla.com/rihal-7

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout rihal-7 repository
      uses: actions/checkout@v4
        
    - name: Deploy rihal-7 files
      uses: appleboy/scp-action@v0.1.7
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        password: ${{ secrets.PASSWORD }}
        port: ${{ secrets.PORT }}
        source: "."
        target: "/home/hanzla.com/public_html/rihal-7/"
        overwrite: true
        rm: true
        
    - name: Set permissions and cleanup
      uses: appleboy/ssh-action@v1.0.3
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        password: ${{ secrets.PASSWORD }}
        port: ${{ secrets.PORT }}
        script: |
          cd /home/hanzla.com/public_html/rihal-7
          
          # Remove git files and other unnecessary files
          rm -rf .git .github .gitignore README.md 2>/dev/null || true
          
          # Set correct permissions
          find . -type f -exec chmod 644 {} \;
          find . -type d -exec chmod 755 {} \;
          
          # List deployed files
          echo "📂 Files deployed to hanzla.com/rihal-7:"
          ls -la
          
          echo "✅ Rihal-7 deployed successfully to hanzla.com/rihal-7!"
EOF
    
    echo "✅ Created deployment workflow at $RIHAL_DIR/.github/workflows/deploy.yml"
else
    echo "✅ Deployment workflow already exists"
fi

echo ""
echo "🎯 Next steps:"
echo "1. cd $RIHAL_DIR"
echo "2. git add .github/workflows/deploy.yml"
echo "3. git commit -m 'Add deployment workflow'"
echo "4. git push"
echo "5. Add GitHub secrets: HOST, USERNAME, PASSWORD, PORT"
echo "6. Go to Actions tab and manually trigger the workflow"