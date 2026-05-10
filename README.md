# MongolsUSA Platform v2.0

> A modern, production-grade social marketplace ecosystem for Mongolian communities across the USA

![MongolsUSA](https://img.shields.io/badge/version-2.0.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-6.1.0-green)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-blue)

---

## 🎯 Project Overview

MongolsUSA Platform v2.0 is a complete rebuild of the original app, transforming it into a **unified social marketplace** that combines:

- **Facebook Groups** (community discussions)
- **Telegram** (messaging & notifications)
- **Facebook Marketplace** (classifieds)
- **LinkedIn** (job listings)
- **Airbnb** (housing)
- **Reddit** (feed algorithm)
- **Craigslist** (services)

### Key Differentiators

✨ **Location-First**: All content ranked by distance to user  
✨ **Modern UI**: Premium dark theme with gold accents  
✨ **Mobile-Optimized**: Built for small screens from ground up  
✨ **Fast Performance**: Virtualized feeds, lazy loading, code splitting  
✨ **Smart Ranking**: Multi-factor algorithm (location > freshness > engagement > trust)  
✨ **Unified Content**: Jobs, housing, marketplace on same feed  
✨ **AI-Powered News**: Autonomous news agent translates Mongolian news  
✨ **Realtime Ready**: Architecture supports WebSockets for messaging  

---

## 📁 What's Included

This package contains **complete production-ready code** for:

### 1. Architecture Documents
- **MONGOLSUSA_ARCHITECTURE_REBUILD.md** - Complete architectural redesign
- **COMPLETE_IMPLEMENTATION_GUIDE.md** - Step-by-step implementation with code examples

### 2. Core Application Files
- **package.json** - All dependencies and scripts
- **src/App.jsx** - Main router with authentication
- **src/types/index.ts** - Complete TypeScript type definitions
- **src/store/appStore.js** - Zustand stores for global state
- **src/services/api.js** - API layer with axios
- **src/services/feedRanking.js** - Feed ranking algorithm

### 3. Components & Pages
- **UI Components** - Buttons, cards, badges, modals, inputs
- **Feature Components** - Feed, jobs, housing, marketplace, messaging
- **Page Components** - Home, search, auth, profile
- **Layout Components** - AppLayout, BottomNav, TopNav

### 4. Hooks & Utilities
- **Custom Hooks** - useDebounce, useInfiniteScroll, useSystemTheme, etc.
- **Utilities** - cn(), formatting, validation, storage
- **API Services** - contentApi, userApi, messagingApi, authApi

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Modern browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of React and TypeScript

### Installation

1. **Create project directory**
```bash
mkdir mongolsusa-platform
cd mongolsusa-platform
```

2. **Initialize project**
```bash
npm init -y
```

3. **Install dependencies**
Copy the `package.json` from this package and run:
```bash
npm install
```

4. **Set up project structure**
Create the following directories:
```
src/
├── features/
├── services/
├── shared/
├── store/
├── types/
├── styles/
├── pages/
├── layout/
└── index.css

public/
tests/
```

5. **Copy all source files**
Copy all files from this package into their respective locations

6. **Environment setup**
```bash
cp .env.example .env
```

Update `.env`:
```
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=MongolsUSA
```

7. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📐 Project Architecture

### Feature-Driven Structure
```
Each feature is self-contained with its own:
- Components (UI specific to feature)
- Hooks (feature-specific logic)
- Services (API calls)
- Store (feature state)
- Types (TypeScript interfaces)
```

### State Management
- **React Query**: Server state (data from API)
- **Zustand**: Client state (UI, theme, filters)
- **Context**: Auth state only

### Data Flow
```
User Action
    ↓
React Component
    ↓
Zustand Hook
    ↓
API Call (axios)
    ↓
React Query (caching)
    ↓
Update UI
```

---

## 🎨 Design System

### Color Palette
```css
Primary: #fbbf24 (Gold)
Primary Dark: #d97706
Background: #0f172a (Deep Slate)
Secondary: #1e293b (Medium Slate)
Text Primary: #f1f5f9 (Off-white)
Text Secondary: #cbd5e1
```

### Typography
- **Display**: 2xl/3xl bold for headlines
- **Body**: base/sm regular for content
- **Small**: xs for metadata
- **Font**: System font stack (San Francisco/Segoe UI)

### Components
All UI components follow:
- Consistent spacing (8px grid)
- Rounded corners (0.5rem default)
- Smooth transitions (200ms)
- Accessible defaults
- Dark mode by default

---

## 🔄 Feed Algorithm

### Ranking Formula
```
Score = (Location × 0.40) 
      + (Freshness × 0.15) 
      + (Engagement × 0.20) 
      + (Interest × 0.15) 
      + (Trust × 0.10) 
      + (Premium × variable)
```

### Location Tiers
1. **Same City** (100 pts) - Exact city match
2. **Nearby** (70-85 pts) - Within 50-150 miles
3. **Regional** (50 pts) - Within 500 miles
4. **National** (20 pts) - Other states

### Key Insight
**Location always wins**: A local item with 0 engagement ranks higher than a national item with high engagement.

---

## 🔐 Authentication

### Flow
1. User submits email/password
2. Backend validates and returns JWT token
3. Token stored in localStorage
4. Token attached to all API requests
5. Auto-redirect on 401 unauthorized

### Protected Routes
All routes except `/auth` require:
- Valid JWT token
- User object in AuthContext

---

## 📊 API Endpoints

### Content
- `GET /api/feed` - Get ranked feed
- `GET /api/content/:id` - Get single item
- `POST /api/content` - Create item
- `PUT /api/content/:id` - Update item
- `DELETE /api/content/:id` - Delete item
- `POST /api/content/:id/like` - Toggle like
- `POST /api/content/:id/save` - Toggle save

### Users
- `GET /api/users/:id` - Get profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/:id/reputation` - Get trust score

### Messaging
- `GET /api/conversations` - List conversations
- `GET /api/conversations/:id/messages` - Get messages
- `POST /api/conversations/:id/messages` - Send message
- `POST /api/conversations` - Start new conversation

### Search
- `GET /api/search?q=query` - Search content

---

## 🔌 Backend Integration

### Expected Response Format
```javascript
// Success
{
  success: true,
  data: { /* content */ },
  timestamp: "2024-05-10T00:00:00Z"
}

// Error
{
  success: false,
  error: {
    code: "INVALID_REQUEST",
    message: "..."
  },
  timestamp: "..."
}

// Paginated
{
  success: true,
  data: {
    items: [],
    total: 100,
    page: 1,
    pageSize: 20,
    hasMore: true
  }
}
```

### CORS Headers Required
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
Access-Control-Allow-Headers: Content-Type,Authorization
```

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized `dist/` folder.

### Deploy Options

**Vercel** (Recommended)
```bash
npm install -g vercel
vercel
```

**Netlify**
```bash
npm run build
# Drag dist/ folder to Netlify
```

**AWS S3 + CloudFront**
```bash
aws s3 sync dist/ s3://your-bucket/
```

### Environment Variables
```
VITE_API_URL=https://api.mongolsusa.com
VITE_APP_NAME=MongolsUSA
VITE_STRIPE_KEY=pk_live_...
```

---

## 🧪 Testing

### Run Linter
```bash
npm run lint
```

### Type Check
```bash
npm run type-check
```

### Format Code
```bash
npm run format
```

---

## 📱 Mobile Optimization

- **Viewport**: Optimized for 375px - 428px screens
- **Touch**: All buttons ≥44px × 44px for touch targets
- **Navigation**: Bottom nav for easy thumb access
- **Performance**: <3s load time on 4G
- **Images**: Lazy loaded with WebP + fallback
- **Scroll**: Smooth 60fps with virtualization

---

## 🎯 Features Implemented

### v2.0.0 (Current)
- ✅ Unified feed with location-based ranking
- ✅ Authentication with JWT
- ✅ Content creation and management
- ✅ User profiles with reputation
- ✅ Search with filters
- ✅ Saved items and favorites
- ✅ Comments and engagement
- ✅ Modern UI with dark theme
- ✅ Mobile-first responsive design
- ✅ Notification system (architecture)

### v2.1.0 (Planned)
- 🔄 Real-time messaging with WebSockets
- 🔄 AI news agent autonomous publishing
- 🔄 Advanced analytics dashboard
- 🔄 Video uploads and streaming
- 🔄 Business profile verification
- 🔄 Payment processing (Stripe)
- 🔄 Reputation badges and milestones

---

## 📚 Documentation

### Architecture
- See **MONGOLSUSA_ARCHITECTURE_REBUILD.md** for complete system design

### Implementation
- See **COMPLETE_IMPLEMENTATION_GUIDE.md** for code examples and database schema

### API
- Backend team: See "API Endpoints" section above

### Types
- TypeScript types in **src/types/index.ts**

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

### Code Style
- Use `npm run format` before committing
- Run `npm run lint` to check for issues
- Prefer functional components with hooks
- Keep components small and focused
- Document complex logic with comments

---

## ⚠️ Important Notes

### Before Deployment
- [ ] Update API URLs in `.env`
- [ ] Set up backend server and database
- [ ] Configure authentication
- [ ] Enable CORS on backend
- [ ] Test all API endpoints
- [ ] Run full QA on mobile devices
- [ ] Set up monitoring and error tracking

### Security
- Never commit `.env` file
- Always use HTTPS in production
- Validate all user input
- Sanitize user-generated content
- Use CSRF tokens for mutations
- Implement rate limiting
- Enable bot protection

### Performance
- Monitor Core Web Vitals
- Use Lighthouse for audits
- Keep bundle size under 250KB
- Optimize images with WebP
- Cache API responses appropriately
- Enable gzip compression
- Consider CDN for assets

---

## 📞 Support

### Issues & Bugs
- Open GitHub Issues with detailed description
- Include browser, OS, and steps to reproduce

### Feature Requests
- Discuss in GitHub Discussions
- Provide use case and reasoning

### Questions
- Check existing documentation
- Ask in community Discord/Slack
- Review implementation guide

---

## 📄 License

This project is proprietary. All rights reserved.

---

## 🎉 Next Steps

1. **Review** architecture documents
2. **Set up** development environment
3. **Copy** all source files
4. **Build** backend API (see schema in guide)
5. **Run** development server
6. **Test** all features
7. **Deploy** to production
8. **Monitor** performance
9. **Iterate** based on user feedback

---

## 📊 Tech Stack Summary

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | React 18 | Modern, hooks-based |
| **Build** | Vite | Fast, modern bundler |
| **Styling** | TailwindCSS | Utility-first, fast |
| **State** | Zustand + React Query | Lightweight, performant |
| **Routing** | React Router v6 | Flexible, modern |
| **HTTP** | Axios | Clean, interceptor support |
| **Forms** | React Hook Form | Lightweight, validation |
| **UI Components** | Headless + Tailwind | Full control, modern |
| **Icons** | Lucide React | Beautiful, lightweight |
| **Animations** | Framer Motion | Smooth, performant |
| **Type Safety** | TypeScript | Optional but recommended |

---

## 🏆 Why This Architecture?

1. **Scalable**: Feature-driven structure supports 100+ developers
2. **Maintainable**: Clear separation of concerns
3. **Performant**: Optimized for mobile, <3s load
4. **Modern**: Latest React patterns and tools
5. **Production-Ready**: Error handling, auth, caching
6. **User-Focused**: Designed for Mongolian community needs

---

**Built with ❤️ for the Mongolian community in the USA**

---

## 📝 Changelog

### v2.0.0 - May 2026
- Complete architectural rebuild
- Unified feed system
- Location-based ranking
- Modern UI overhaul
- Mobile optimization
- Production-ready code

### v1.0.0 - Original
- Basic classifieds functionality
- Page-centric architecture
- Isolated feature sections
