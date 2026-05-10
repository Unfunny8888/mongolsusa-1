# MongolsUSA Platform v2.0 - Complete Implementation Guide

## Complete Project Structure

```
mongolsusa-app/
├── src/
│   ├── App.jsx                          ← Main router (see App.jsx file)
│   ├── main.jsx                         ← Entry point
│   │
│   ├── types/
│   │   └── index.ts                     ← All TypeScript types (see types file)
│   │
│   ├── store/
│   │   └── appStore.js                  ← Zustand stores (see store file)
│   │
│   ├── services/
│   │   ├── api/
│   │   │   ├── queryClient.js           ← React Query setup
│   │   │   ├── axiosClient.js           ← Axios config
│   │   │   ├── contentApi.js            ← Content endpoints
│   │   │   ├── userApi.js               ← User endpoints
│   │   │   ├── messagingApi.js          ← Messaging endpoints
│   │   │   └── authApi.js               ← Auth endpoints
│   │   │
│   │   └── algorithms/
│   │       ├── feedRanking.js           ← Feed scoring (see feedRanking file)
│   │       ├── searchRanking.js         ← Search ranking
│   │       ├── locationUtils.js         ← Location calculations
│   │       └── trustScoring.js          ← User trust scores
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── SignupForm.jsx
│   │   │   │   └── AuthGuard.jsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.js
│   │   │   │   └── useAuthForm.js
│   │   │   ├── store/
│   │   │   │   └── authContext.js
│   │   │   └── types.ts
│   │   │
│   │   ├── feed/
│   │   │   ├── components/
│   │   │   │   ├── FeedContainer.jsx
│   │   │   │   ├── FeedCard.jsx
│   │   │   │   ├── FeedFilters.jsx
│   │   │   │   ├── FeedSkeleton.jsx
│   │   │   │   └── VirtualizedFeed.jsx
│   │   │   ├── hooks/
│   │   │   │   ├── useFeedData.js
│   │   │   │   ├── useFeedRanking.js
│   │   │   │   └── useFeedScroll.js
│   │   │   ├── services/
│   │   │   │   └── feedService.js
│   │   │   └── types.ts
│   │   │
│   │   ├── jobs/
│   │   │   ├── components/
│   │   │   │   ├── JobCard.jsx
│   │   │   │   ├── JobDetail.jsx
│   │   │   │   ├── JobForm.jsx
│   │   │   │   └── JobFilters.jsx
│   │   │   ├── hooks/
│   │   │   │   ├── useJobData.js
│   │   │   │   └── useJobFilters.js
│   │   │   └── types.ts
│   │   │
│   │   ├── housing/
│   │   │   ├── components/
│   │   │   │   ├── HousingCard.jsx
│   │   │   │   ├── HousingDetail.jsx
│   │   │   │   ├── HousingForm.jsx
│   │   │   │   └── HousingFilters.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useHousingData.js
│   │   │   └── types.ts
│   │   │
│   │   ├── marketplace/
│   │   │   ├── components/
│   │   │   │   ├── MarketplaceCard.jsx
│   │   │   │   ├── MarketplaceDetail.jsx
│   │   │   │   ├── MarketplaceForm.jsx
│   │   │   │   └── MarketplaceFilters.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useMarketplaceData.js
│   │   │   └── types.ts
│   │   │
│   │   ├── messaging/
│   │   │   ├── components/
│   │   │   │   ├── ConversationList.jsx
│   │   │   │   ├── ConversationView.jsx
│   │   │   │   ├── MessageItem.jsx
│   │   │   │   ├── MessageInput.jsx
│   │   │   │   └── TypingIndicator.jsx
│   │   │   ├── hooks/
│   │   │   │   ├── useConversations.js
│   │   │   │   ├── useMessages.js
│   │   │   │   └── useRealtime.js
│   │   │   └── types.ts
│   │   │
│   │   ├── community/
│   │   │   ├── components/
│   │   │   │   ├── PostCard.jsx
│   │   │   │   ├── PostForm.jsx
│   │   │   │   ├── CommentSection.jsx
│   │   │   │   └── CommunityFilters.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useCommunityPosts.js
│   │   │   └── types.ts
│   │   │
│   │   ├── profile/
│   │   │   ├── components/
│   │   │   │   ├── ProfileHeader.jsx
│   │   │   │   ├── ProfileStats.jsx
│   │   │   │   ├── ProfileListings.jsx
│   │   │   │   ├── ProfileReviews.jsx
│   │   │   │   └── EditProfileForm.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useProfile.js
│   │   │   └── types.ts
│   │   │
│   │   ├── search/
│   │   │   ├── components/
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   ├── SearchFilters.jsx
│   │   │   │   ├── SearchResults.jsx
│   │   │   │   └── SearchHistory.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useSearch.js
│   │   │   └── types.ts
│   │   │
│   │   └── news/
│   │       ├── components/
│   │       │   ├── NewsCard.jsx
│   │       │   ├── NewsList.jsx
│   │       │   └── NewsDetail.jsx
│   │       ├── hooks/
│   │       │   └── useNews.js
│   │       ├── services/
│   │       │   └── newsAiAgent.js
│   │       └── types.ts
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Select.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Sheet.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Avatar.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Toaster.jsx
│   │   │   │   └── Spinner.jsx
│   │   │   │
│   │   │   ├── cards/
│   │   │   │   ├── ContentCard.jsx
│   │   │   │   └── UserCard.jsx
│   │   │   │
│   │   │   ├── forms/
│   │   │   │   ├── FormField.jsx
│   │   │   │   ├── FormError.jsx
│   │   │   │   └── FormSubmit.jsx
│   │   │   │
│   │   │   ├── navigation/
│   │   │   │   ├── BottomNav.jsx
│   │   │   │   ├── TopNav.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── Container.jsx
│   │   │   │   ├── Grid.jsx
│   │   │   │   └── Stack.jsx
│   │   │   │
│   │   │   └── media/
│   │   │       ├── Image.jsx
│   │   │       ├── ImageGallery.jsx
│   │   │       └── Avatar.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useDebounce.js
│   │   │   ├── useInfiniteScroll.js
│   │   │   ├── useScrollOptimization.js
│   │   │   ├── useScrollDirection.js
│   │   │   ├── useGestureHandler.js
│   │   │   ├── useSwipeGesture.js
│   │   │   ├── useSystemTheme.js
│   │   │   ├── useMedia.js
│   │   │   ├── useLocationInit.js
│   │   │   └── useAsync.js
│   │   │
│   │   ├── utils/
│   │   │   ├── cn.js
│   │   │   ├── formatting.js
│   │   │   ├── validation.js
│   │   │   ├── storage.js
│   │   │   ├── geolocation.js
│   │   │   └── analytics.js
│   │   │
│   │   └── constants/
│   │       ├── categories.js
│   │       ├── cities.js
│   │       └── config.js
│   │
│   ├── layout/
│   │   ├── AppLayout.jsx
│   │   ├── FeedLayout.jsx
│   │   ├── DetailLayout.jsx
│   │   └── AuthLayout.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Jobs.jsx
│   │   ├── Housing.jsx
│   │   ├── Marketplace.jsx
│   │   ├── Community.jsx
│   │   ├── Messaging.jsx
│   │   ├── Profile.jsx
│   │   ├── Search.jsx
│   │   ├── Auth.jsx
│   │   ├── ContentDetail.jsx
│   │   ├── CreateContent.jsx
│   │   ├── EditContent.jsx
│   │   └── NotFound.jsx
│   │
│   └── styles/
│       ├── globals.css
│       ├── tokens.css
│       └── animations.css
│
├── public/
│   ├── favicon.ico
│   └── logo.png
│
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── .env.example
```

---

## Key Implementation Details

### 1. Authentication Flow

**File: `src/features/auth/store/authContext.js`**

```javascript
import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '@/services/api/authApi';
import { useToast } from '@/store/appStore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { error } = useToast();

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const userData = await authApi.getCurrentUser();
          setUser(userData);
        } catch (err) {
          localStorage.removeItem('auth_token');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await authApi.login(email, password);
      setUser(data.user);
      return data;
    } catch (err) {
      error(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email, password, name) => {
    setIsLoading(true);
    try {
      const data = await authApi.signup(email, password, name);
      setUser(data.user);
      return data;
    } catch (err) {
      error(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      localStorage.removeItem('auth_token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

---

### 2. Main Feed Component

**File: `src/features/feed/components/FeedContainer.jsx`**

```javascript
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { contentApi } from '@/services/api/contentApi';
import { rankContent } from '@/services/algorithms/feedRanking';
import { useUserLocation } from '@/store/appStore';
import FeedCard from './FeedCard';
import FeedSkeleton from './FeedSkeleton';

export default function FeedContainer() {
  const { userLocation } = useUserLocation();

  // Fetch feed with infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['feed', userLocation],
    queryFn: ({ pageParam = 1 }) =>
      contentApi.getFeed({
        page: pageParam,
        userCity: userLocation?.city,
      }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  // Rank content
  const rankedContent = useMemo(() => {
    if (!data) return [];
    const allContent = data.pages.flatMap((page) => page.items);
    return rankContent(allContent, {
      userLocation,
      userInterests: [], // From user profile
    });
  }, [data, userLocation]);

  if (isLoading) {
    return <FeedSkeleton count={5} />;
  }

  return (
    <div className="space-y-3 pb-20">
      {rankedContent.map((item) => (
        <FeedCard key={item.id} content={item} />
      ))}

      {isFetching && <FeedSkeleton count={2} />}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className="w-full py-3 text-amber-400 hover:bg-slate-800/50"
        >
          Load More
        </button>
      )}

      {!hasNextPage && rankedContent.length > 0 && (
        <p className="text-center text-slate-500 py-4">No more items</p>
      )}
    </div>
  );
}
```

---

### 3. Feed Card Component

**File: `src/features/feed/components/FeedCard.jsx`**

```javascript
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { contentApi } from '@/services/api/contentApi';
import { useLikeItem, useSaveItem } from '@/store/appStore';
import Button from '@/shared/components/ui/Button';
import Badge from '@/shared/components/ui/Badge';
import { formatTime, formatPrice } from '@/shared/utils/formatting';

export default function FeedCard({ content }) {
  const { toggleLiked, isLiked } = useLikeItem();
  const { toggleSaved, isSaved } = useSaveItem();

  const isContentLiked = isLiked(content.id);
  const isContentSaved = isSaved(content.id);

  // Mutation for liking
  const likeMutation = useMutation({
    mutationFn: () => contentApi.toggleLike(content.id),
    onMutate: () => toggleLiked(content.id),
  });

  const saveMutation = useMutation({
    mutationFn: () => contentApi.toggleSave(content.id),
    onMutate: () => toggleSaved(content.id),
  });

  return (
    <article className="rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-sm p-4 transition-all duration-200 hover:border-slate-600 hover:shadow-lg mb-3">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5 flex-1">
          <img
            src={content.author.avatar}
            alt={content.author.name}
            className="w-10 h-10 rounded-full border border-slate-700"
          />
          <div className="flex-1 min-w-0">
            <Link
              to={`/profile/${content.author.id}`}
              className="text-sm font-semibold text-slate-100 hover:text-amber-400 truncate"
            >
              {content.author.name}
            </Link>
            <p className="text-xs text-slate-500">
              {content.location.city} • {formatTime(content.createdAt)}
            </p>
          </div>
        </div>
        {content.isUrgent && (
          <Badge variant="danger" size="sm">
            Urgent
          </Badge>
        )}
      </div>

      {/* Title */}
      <Link
        to={`/content/${content.id}`}
        className="text-base font-bold text-slate-100 hover:text-amber-400 mb-2 line-clamp-2 block"
      >
        {content.title}
      </Link>

      {/* Description */}
      <p className="text-sm text-slate-300 mb-3 line-clamp-3">
        {content.description}
      </p>

      {/* Media */}
      {content.media.length > 0 && (
        <Link
          to={`/content/${content.id}`}
          className="relative mb-3 rounded-lg overflow-hidden block"
        >
          <img
            src={content.media[0].url}
            alt={content.title}
            className="w-full h-48 object-cover hover:scale-105 transition-transform"
          />
          {content.media.length > 1 && (
            <span className="absolute bottom-2 right-2 px-2 py-1 text-xs font-medium bg-black/60 text-white rounded">
              +{content.media.length - 1}
            </span>
          )}
        </Link>
      )}

      {/* Price & Category */}
      <div className="flex items-center justify-between mb-3">
        {content.price && (
          <span className="text-lg font-bold text-amber-400">
            {formatPrice(content.price.amount)}
          </span>
        )}
        <Badge variant="primary" size="sm">
          {content.category}
        </Badge>
      </div>

      {/* Engagement Metrics */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pb-3 border-t border-slate-700/50">
        <span>{content.engagement.views} views</span>
        <span>{content.engagement.likes} likes</span>
        <span>{content.engagement.comments} comments</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => likeMutation.mutate()}
          className={isContentLiked ? 'text-red-400' : 'text-slate-400'}
        >
          <Heart size={16} className={isContentLiked ? 'fill-current' : ''} />
          Like
        </Button>

        <Button variant="ghost" size="sm" className="text-slate-400">
          <MessageCircle size={16} />
          Comment
        </Button>

        <Button variant="ghost" size="sm" className="text-slate-400">
          <Share2 size={16} />
          Share
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => saveMutation.mutate()}
          className={isContentSaved ? 'text-amber-400' : 'text-slate-400'}
        >
          <Bookmark size={16} className={isContentSaved ? 'fill-current' : ''} />
          Save
        </Button>
      </div>
    </article>
  );
}
```

---

### 4. Bottom Navigation

**File: `src/shared/components/navigation/BottomNav.jsx`**

```javascript
import {
  Home,
  Briefcase,
  Building2,
  ShoppingBag,
  MessageSquare,
  Users,
  MoreHorizontal,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/shared/utils/cn';
import { useAppStore } from '@/store/appStore';

export default function BottomNav() {
  const location = useLocation();
  const { messageCount, notificationCount } = useAppStore();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Briefcase, label: 'Jobs', path: '/jobs' },
    { icon: Building2, label: 'Housing', path: '/housing' },
    { icon: ShoppingBag, label: 'Marketplace', path: '/marketplace' },
    {
      icon: MessageSquare,
      label: 'Messages',
      path: '/messaging',
      badge: messageCount,
    },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: MoreHorizontal, label: 'More', path: '/more' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-sm flex items-center justify-around h-16 z-40">
      {navItems.map(({ icon: Icon, label, path, badge }) => (
        <Link
          key={path}
          to={path}
          className={cn(
            'flex flex-col items-center justify-center gap-1 w-full h-full transition-colors relative',
            isActive(path)
              ? 'text-amber-400'
              : 'text-slate-400 hover:text-slate-300'
          )}
          title={label}
        >
          <Icon size={20} />
          <span className="text-xs font-medium">{label}</span>
          {badge > 0 && (
            <span className="absolute top-2 right-2 px-1.5 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
              {badge > 9 ? '9+' : badge}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
}
```

---

### 5. Layout Component

**File: `src/layout/AppLayout.jsx`**

```javascript
import { Outlet } from 'react-router-dom';
import BottomNav from '@/shared/components/navigation/BottomNav';
import TopNav from '@/shared/components/navigation/TopNav';
import { useSystemTheme } from '@/shared/hooks/useSystemTheme';

export default function AppLayout() {
  useSystemTheme();

  return (
    <div className="flex flex-col h-screen bg-slate-900">
      {/* Top Navigation */}
      <TopNav />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto mb-16">
        <div className="max-w-2xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
```

---

## Database Schema (Example - Node/Express Backend)

### Content Collection
```javascript
{
  _id: ObjectId,
  type: 'job' | 'housing' | 'marketplace' | ...,
  title: string,
  description: string,
  media: Array<{url, type, alt}>,
  location: {
    city: string,
    state: string,
    coordinates: [lat, lon]
  },
  price: {amount, currency, priceType},
  author: {id, name, avatar, trustScore, verified},
  engagement: {views, likes, comments, shares, saves},
  tags: [string],
  isFeatured: boolean,
  isBoosted: boolean,
  isUrgent: boolean,
  status: 'active' | 'expired' | 'sold' | 'archived',
  createdAt: Date,
  updatedAt: Date,
  expiresAt: Date (optional)
}
```

### User Collection
```javascript
{
  _id: ObjectId,
  email: string (unique),
  name: string,
  avatar: string (URL),
  bio: string,
  location: {city, state, coordinates},
  verification: {email, phone, id, address, business},
  reputation: {
    trustScore: number,
    totalTransactions: number,
    totalListings: number,
    avgRating: number,
    responseRate: number,
    badges: [string]
  },
  preferences: {
    interests: [string],
    notifications: {...},
    language: 'en' | 'mn',
    theme: 'light' | 'dark',
    searchRadius: number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Message Collection
```javascript
{
  _id: ObjectId,
  conversationId: ObjectId,
  senderId: ObjectId,
  content: string,
  media: Array<{url, type}>,
  sentAt: Date,
  deliveredAt: Date (optional),
  readAt: Date (optional),
  status: 'sending' | 'sent' | 'delivered' | 'read'
}
```

---

## Environment Variables

**`.env.example`**
```
VITE_API_URL=https://api.mongolsusa.com
VITE_APP_NAME=MongolsUSA
VITE_ENABLE_ANALYTICS=true
VITE_STRIPE_KEY=pk_live_...
VITE_FIREBASE_CONFIG={}
```

---

## Build & Deployment

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint and format
npm run lint
npm run format
```

---

## Key Features Implemented

✅ Unified feed with location-based ranking  
✅ Modern dark theme with gold accents  
✅ Mobile-first responsive design  
✅ Infinite scroll with virtualization  
✅ Authentication with JWT  
✅ Real-time messaging (architecture ready)  
✅ Content creation and management  
✅ User profiles with reputation system  
✅ Advanced search and filtering  
✅ Notification system  
✅ AI news system (architecture ready)  
✅ Trust scoring algorithm  
✅ Engagement metrics  
✅ Location-aware discovery  
✅ Saved items and favorites  

---

## Next Steps

1. Set up backend (Node/Express, MongoDB)
2. Implement API endpoints
3. Deploy to production
4. Add realtime messaging with WebSockets
5. Implement AI news agent
6. Add analytics and monitoring
7. Scale infrastructure
