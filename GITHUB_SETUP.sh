#!/bin/bash

# MongolsUSA Platform - GitHub Upload Preparation Script
# This script organizes all files into proper structure for GitHub upload

set -e

echo "🚀 MongolsUSA Platform - GitHub Upload Preparation"
echo "=================================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first:"
    echo "   https://git-scm.com/download"
    exit 1
fi

echo "✅ Git found: $(git --version)"
echo ""

# Create new directory structure
PROJECT_DIR="mongolsusa-platform"

echo "📁 Creating project directory: $PROJECT_DIR"
mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

# Create folder structure
echo "📂 Creating folder structure..."
mkdir -p src/{features/{auth,feed,jobs,housing,marketplace,messaging,community,profile,search,news},services/{api,algorithms},shared/{components/navigation,hooks,utils,constants},pages,layout,store,types,styles}
mkdir -p public
mkdir -p docs
mkdir -p scripts

echo "✅ Folder structure created!"
echo ""

# Instructions
cat > UPLOAD_INSTRUCTIONS.md << 'EOF'
# 📤 GitHub Upload Instructions

## Quick Setup

### 1. Copy all files from /outputs/ to this directory

From the deliverables in `/outputs/`, copy:

**Configuration files** (to root):
- vite.config.js
- tailwind.config.js
- postcss.config.js
- package.json
- index.html
- .env.example
- .gitignore
- eslint.config.js

**Source files** (to src/):
- src_App_working.jsx → src/App.jsx
- src_main.jsx → src/main.jsx
- src_index.css → src/index.css
- src_auth_context.jsx → src/features/auth/store/authContext.jsx
- src_mockData.js → src/services/mockData.js
- And all other src_*.js files (extract and organize)

**Documentation** (to root or docs/):
- README.md
- QUICK_START.md
- MONGOLSUSA_ARCHITECTURE_REBUILD.md
- COMPLETE_IMPLEMENTATION_GUIDE.md
- And all other documentation files

### 2. Initialize Git

```bash
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
git add .
git commit -m "Initial commit: Complete MongolsUSA Platform v2.0"
git branch -M main
```

### 3. Add GitHub Remote

```bash
git remote add origin https://github.com/YOUR_USERNAME/mongolsusa-platform.git
git push -u origin main
```

## Alternative: Using GitHub CLI

```bash
gh repo create mongolsusa-platform --public --source=. --remote=origin --push
```

## Files to Upload

- ✅ All configuration files
- ✅ All source code
- ✅ All documentation
- ✅ .env.example (NOT .env with secrets)
- ✅ .gitignore
- ✅ README.md
- ✅ package.json

## Verify Upload

After pushing, check:
1. Go to https://github.com/YOUR_USERNAME/mongolsusa-platform
2. Verify all files are there
3. Check README.md displays correctly
4. View the folder structure

Done! 🎉
EOF

echo "✅ Created UPLOAD_INSTRUCTIONS.md"
echo ""

# Create a .gitignore if not exists
if [ ! -f ".gitignore" ]; then
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
/.pnp
.pnp.js

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build
dist/
dist-ssr/
*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Testing
coverage/
.nyc_output/

# Misc
*.pem
EOF
    echo "✅ Created .gitignore"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "✅ SETUP COMPLETE!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Copy all files from /outputs/ to this directory"
echo "   (See UPLOAD_INSTRUCTIONS.md for details)"
echo ""
echo "2. Create .env from .env.example:"
echo "   cp .env.example .env"
echo ""
echo "3. Initialize Git:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit: Complete MongolsUSA Platform v2.0'"
echo "   git branch -M main"
echo ""
echo "4. Add GitHub remote:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/mongolsusa-platform.git"
echo "   git push -u origin main"
echo ""
echo "5. Verify on GitHub:"
echo "   https://github.com/YOUR_USERNAME/mongolsusa-platform"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "Project ready for GitHub upload! 🚀"
