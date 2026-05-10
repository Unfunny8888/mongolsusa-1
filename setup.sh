#!/bin/bash

# MongolsUSA Platform - Quick Setup Script
# This script will set up the entire project and get it running

set -e

echo "🚀 MongolsUSA Platform v2.0 - Setup Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ NPM version: $(npm --version)"
echo ""

# Create project directory if it doesn't exist
PROJECT_DIR="${1:-.}"
if [ "$PROJECT_DIR" != "." ]; then
    mkdir -p "$PROJECT_DIR"
    cd "$PROJECT_DIR"
fi

echo "📁 Setting up project in: $(pwd)"
echo ""

# Initialize package.json if it doesn't exist
if [ ! -f "package.json" ]; then
    echo "📦 Creating package.json..."
    npm init -y > /dev/null
fi

# Copy package.json with dependencies
echo "📥 Installing dependencies..."
echo "This may take a few minutes..."
npm install

# Create folder structure
echo "📂 Creating folder structure..."
mkdir -p src/{features/{auth,feed,jobs,housing,marketplace,messaging,community,profile,search,news},services/{api,algorithms},shared/{components/{ui,navigation,layout,cards,forms},hooks,utils,constants},store,types,pages,styles}
mkdir -p public

# Copy config files
echo "⚙️  Setting up configuration files..."
cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
  },
})
EOF

cat > tailwind.config.js << 'EOF'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
      },
    },
  },
  plugins: [],
}
EOF

cat > postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# Copy source files
echo "📄 Setting up source files..."

# Create index.html
cat > index.html << 'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MongolsUSA - Community Marketplace</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF

# Create main.jsx
cat > src/main.jsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

# Create index.css
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-slate-900 text-slate-100;
  }
}
EOF

# Create .env file
cat > .env << 'EOF'
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=MongolsUSA
VITE_ENABLE_ANALYTICS=false
EOF

echo ""
echo "✅ Setup complete!"
echo ""
echo "📖 Next steps:"
echo "1. Copy all source files from the deliverables"
echo "2. Run: npm run dev"
echo "3. Open browser to: http://localhost:5173"
echo ""
echo "🎉 Happy coding!"
