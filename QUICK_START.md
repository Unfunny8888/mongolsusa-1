# 🚀 MongolsUSA Platform - Quick Start (5 Minutes)

**Start here to get the app running immediately!**

---

## ✅ Prerequisites

You need:
- Node.js 16+ ([download here](https://nodejs.org))
- npm 8+ (comes with Node.js)
- A code editor (VS Code recommended)
- A terminal

Check you have them:
```bash
node --version  # Should be v16 or higher
npm --version   # Should be v8 or higher
```

---

## 🎯 Step 1: Create Project (1 minute)

```bash
# Create folder
mkdir mongolsusa-app
cd mongolsusa-app

# Initialize
npm init -y
```

---

## 📦 Step 2: Install Dependencies (2 minutes)

Copy and paste this command:

```bash
npm install react@18.2.0 react-dom@18.2.0 react-router-dom@6.26.0 @tanstack/react-query@5.84.1 zustand@4.4.1 axios@1.6.0 framer-motion@11.16.4 lucide-react@0.475.0 clsx@2.1.1 tailwind-merge@3.0.2 -S

npm install -D vite@6.1.0 @vitejs/plugin-react@4.3.4 tailwindcss@3.4.17 postcss@8.5.3 autoprefixer@10.4.20 -D
```

---

## 📂 Step 3: Create Folder Structure (1 minute)

```bash
# Create all folders
mkdir -p src/{features/{auth,feed,jobs,housing,marketplace,messaging,community,profile,search,news},services/{api,algorithms},shared/{components/navigation,hooks,utils,constants},store,pages,layout}
mkdir public
```

---

## 📝 Step 4: Copy All Configuration Files

### vite.config.js
```bash
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
```

### tailwind.config.js
```bash
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
```

### postcss.config.js
```bash
cat > postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF
```

### index.html
```bash
cat > index.html << 'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MongolsUSA</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF
```

### .env
```bash
cat > .env << 'EOF'
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=MongolsUSA
VITE_ENABLE_ANALYTICS=false
EOF
```

### package.json scripts
Edit your package.json and replace the scripts section with:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint src"
}
```

---

## 📄 Step 5: Copy Source Files

### Create src/main.jsx
```bash
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
```

### Create src/index.css
```bash
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
```

### Download the source files from deliverables:

From the files provided, copy these files to your project:

```
src/App.jsx.working                    → src/App.jsx
src/auth_context.jsx                   → src/features/auth/store/authContext.jsx
src/mockData.js                        → src/services/mockData.js
src/hooks_and_components.jsx           → Extract and copy to respective folders
src/working_pages_and_layouts.jsx      → Extract and copy to respective folders
src/utils_all.js                       → Extract and copy to respective folders
```

---

## ⚡ Quick Copy-Paste (Fastest Way)

Create these files manually or copy from the deliverables:

### src/App.jsx
```javascript
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSystemTheme } from '@/shared/hooks/useSystemTheme'
import { queryClient } from '@/services/api/queryClient'
import { AuthProvider } from '@/features/auth/store/authContext'

import AppLayout from '@/layout/AppLayout'
import Home from '@/pages/Home'
import Jobs from '@/pages/Jobs'
import Housing from '@/pages/Housing'
import Marketplace from '@/pages/Marketplace'
import Community from '@/pages/Community'
import Search from '@/pages/Search'
import Auth from '@/pages/Auth'
import NotFound from '@/pages/NotFound'

function AppContent() {
  useSystemTheme()
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/housing" element={<Housing />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/community" element={<Community />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  )
}
```

### For all other files, copy from the deliverables provided

---

## 🎬 Step 6: Run the App!

```bash
npm run dev
```

You should see:
```
  VITE v6.1.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Open http://localhost:5173 in your browser! 🎉

---

## ✨ What You'll See

The app should display:

1. **Bottom Navigation** with 7 tabs
2. **Home Feed** showing sample content
3. **All pages** functional (Jobs, Housing, Marketplace, Community, Search)
4. **Beautiful dark theme** with gold accents
5. **Mock content** from real Mongolian community examples

---

## 🧪 Test It Out

1. Click each tab to see different sections
2. Use Search tab to search content
3. Click on items to see details
4. Try the auth page (click logout if needed)
5. All buttons are interactive!

---

## 🐛 Troubleshooting

### "command not found: node"
- Install Node.js: https://nodejs.org

### Port 5173 already in use
- Change port in vite.config.js: `port: 5174,`

### "Cannot find module"
- Make sure you created all folders correctly
- Check @/ alias is working (should map to src/)

### Blank page
- Check browser console for errors
- Make sure all imports use correct paths

### Tailwind styles not loading
- Make sure index.css is imported in main.jsx
- Run: `npm install` again

---

## 📚 File Structure

```
mongolsusa-app/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── features/
│   │   └── auth/
│   │       └── store/
│   │           └── authContext.jsx
│   ├── services/
│   │   ├── api/
│   │   │   └── queryClient.js
│   │   ├── algorithms/
│   │   │   └── feedRanking.js
│   │   └── mockData.js
│   ├── shared/
│   │   ├── components/
│   │   │   └── navigation/
│   │   │       └── BottomNav.jsx
│   │   ├── hooks/
│   │   │   ├── useSystemTheme.js
│   │   │   └── useDebounce.js
│   │   └── utils/
│   │       └── cn.js, formatting.js, etc.
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Jobs.jsx
│   │   ├── Housing.jsx
│   │   ├── Marketplace.jsx
│   │   ├── Community.jsx
│   │   ├── Search.jsx
│   │   ├── Auth.jsx
│   │   └── NotFound.jsx
│   ├── layout/
│   │   └── AppLayout.jsx
│   └── store/
│       └── appStore.js
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── .env
```

---

## ✅ Next Steps

After running successfully:

1. **Explore the code** - Open each file and read comments
2. **Modify content** - Edit mockData.js to add your own listings
3. **Change colors** - Edit tailwind.config.js for different theme
4. **Add features** - Follow the structure to add new pages/components
5. **Connect backend** - Update API calls when backend is ready

---

## 🚀 You're Ready!

The app is fully functional with:
- ✅ Working pages and navigation
- ✅ Mock data (6 sample items)
- ✅ Feed ranking algorithm
- ✅ Dark theme with gold accents
- ✅ Mobile-responsive layout
- ✅ All interactive features

**Now build your backend and connect it! 🎉**

---

## 📞 Questions?

- Check README.md for full docs
- Review the source files for code examples
- Check browser console for errors
- Make sure all files are in correct folders

**Happy coding!**
