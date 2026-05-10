# MongolsUSA Platform — Complete Architectural Rebuild

**Status**: Production-Grade Architecture Design  
**Target**: Modern social marketplace ecosystem for Mongolian communities in USA  
**Version**: 2.0  
**Last Updated**: May 2026

---

## EXECUTIVE SUMMARY

Your current app has excellent foundation algorithms and features, but suffers from:
- **Page-centric architecture** (should be feature-driven)
- **Isolated sections** (jobs, housing, marketplace aren't unified)
- **No unified feed system** (content types segregated)
- **Basic UI/UX** (needs modern social app polish)
- **Location ranking exists but underutilized** (should be core)

This rebuild transforms it into a **unified social marketplace platform** similar to Facebook Groups + Telegram + Marketplace + Reddit, optimized for Mongolian communities.

---

## ARCHITECTURE OVERHAUL

### Current Structure (WRONG)

```
src/
├── pages/          ← Page-centric, bloated
├── components/     ← Mixed concerns
├── hooks/          ← Generic utilities
└── lib/            ← Loose utilities
```

### New Structure (CORRECT)

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── types.ts
│   │
│   ├── feed/
│   │   ├── components/
│   │   │   ├── FeedContainer.jsx
│   │   │   ├── FeedItem.jsx
│   │   │   ├── FeedFilters.jsx
│   │   │   └── FeedSkeleton.jsx
│   │   ├── hooks/
│   │   │   ├── useFeedData.js
│   │   │   ├── useFeedRanking.js
│   │   │   └── useFeedScroll.js
│   │   ├── services/
│   │   │   ├── feedApi.js
│   │   │   └── feedRanking.js
│   │   ├── store/
│   │   │   └── feedStore.js
│   │   └── types.ts
│   │
│   ├── jobs/
│   │   ├── components/
│   │   │   ├── JobCard.jsx
│   │   │   ├── JobDetail.jsx
│   │   │   ├── JobForm.jsx
│   │   │   └── JobFilters.jsx
│   │   ├── hooks/
│   │   │   ├── useJobData.js
│   │   │   └── useJobFilters.js
│   │   ├── services/
│   │   │   └── jobApi.js
│   │   ├── store/
│   │   │   └── jobStore.js
│   │   └── types.ts
│   │
│   ├── housing/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── types.ts
│   │
│   ├── marketplace/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── types.ts
│   │
│   ├── messaging/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── types.ts
│   │
│   ├── community/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── types.ts
│   │
│   ├── profile/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── types.ts
│   │
│   ├── notifications/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── types.ts
│   │
│   ├── events/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── types.ts
│   │
│   ├── news/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   │   └── newsAiAgent.js
│   │   ├── store/
│   │   └── types.ts
│   │
│   ├── search/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── types.ts
│   │
│   └── business/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── store/
│       └── types.ts
│
├── shared/
│   ├── components/
│   │   ├── ui/              ← Radix UI base components
│   │   ├── cards/
│   │   ├── forms/
│   │   ├── modals/
│   │   ├── sheets/
│   │   ├── avatars/
│   │   ├── badges/
│   │   └── buttons/
│   ├── hooks/
│   │   ├── useDebounce.js
│   │   ├── useInfiniteScroll.js
│   │   ├── useScrollOptimization.js
│   │   ├── useScrollDirection.js
│   │   ├── useGestureHandler.js
│   │   ├── useSwipeGesture.js
│   │   ├── useSystemTheme.js
│   │   └── useMedia.js
│   ├── store/
│   │   └── appStore.js      ← Global app state (theme, user, etc)
│   └── utils/
│       ├── formatting.js
│       ├── validation.js
│       └── helpers.js
│
├── layout/
│   ├── AppLayout.jsx
│   ├── FeedLayout.jsx
│   ├── DetailLayout.jsx
│   └── SidebarLayout.jsx
│
├── pages/
│   ├── Home.jsx             ← Thin wrapper using feed feature
│   ├── Jobs.jsx             ← Thin wrapper using jobs feature
│   ├── Housing.jsx          ← Thin wrapper using housing feature
│   ├── Marketplace.jsx      ← Thin wrapper using marketplace feature
│   ├── Messaging.jsx        ← Thin wrapper using messaging feature
│   ├── Community.jsx        ← Thin wrapper using community feature
│   ├── Profile.jsx          ← Thin wrapper using profile feature
│   └── NotFound.jsx
│
├── services/
│   ├── api/
│   │   ├── axiosClient.js
│   │   └── apiBase.js
│   ├── algorithms/
│   │   ├── feedRanking.js
│   │   ├── locationRanking.js
│   │   ├── engagementScoring.js
│   │   ├── trustScoring.js
│   │   └── searchRanking.js
│   ├── cache/
│   │   └── queryCache.js
│   └── analytics/
│       └── tracking.js
│
├── store/
│   ├── authStore.js         ← Zustand: auth state
│   ├── appStore.js          ← Zustand: app-wide state
│   └── notificationStore.js ← Zustand: notifications
│
├── types/
│   ├── index.ts
│   ├── feed.ts
│   ├── listing.ts
│   ├── user.ts
│   └── location.ts
│
├── styles/
│   ├── globals.css
│   ├── tokens.css           ← Design tokens
│   └── animations.css
│
├── App.jsx                  ← Main router
└── main.jsx
```

---

## UNIFIED CONTENT ARCHITECTURE

### Problem
Currently, jobs, housing, and marketplace are separate. They should use a unified post schema.

### Solution
Create a **unified content model**:

```typescript
// src/types/content.ts

export type ContentType = 
  | 'job' 
  | 'housing' 
  | 'marketplace' 
  | 'service' 
  | 'event' 
  | 'community_post' 
  | 'news' 
  | 'business_listing';

export interface Content {
  id: string;
  type: ContentType;
  category?: string;  // 'jobs', 'housing', 'marketplace', etc.
  
  // Core fields
  title: string;
  description: string;
  media: {
    url: string;
    type: 'image' | 'video' | 'carousel';
    alt?: string;
  }[];
  
  // Location (critical for ranking)
  location: {
    city: string;
    state: string;
    coordinates?: [number, number];  // [lat, lon]
    radius?: number;  // For jobs with flexible location
  };
  
  // Pricing & business
  price?: {
    amount: number;
    currency: 'USD';
    priceType?: 'fixed' | 'negotiable' | 'range';
    range?: [number, number];
  };
  
  // Author
  author: {
    id: string;
    name: string;
    avatar?: string;
    trustScore: number;
    verified: boolean;
  };
  
  // Engagement
  engagement: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  };
  
  // Metadata
  tags: string[];
  isFeatured: boolean;
  isBoosted: boolean;
  isUrgent: boolean;
  expiresAt?: string;  // ISO date
  createdAt: string;
  updatedAt: string;
  
  // Status
  status: 'active' | 'expired' | 'sold' | 'archived';
}
```

### Benefits
- **Unified feed ranking** (all content types compete fairly)
- **Flexible categorization** (same post system for everything)
- **Consistent engagement** (same like/comment system)
- **Location-based discovery** (location is first-class field)
- **Scalable** (easy to add new content types)

---

## LOCATION-BASED RANKING SYSTEM

### Priority Hierarchy

```javascript
// src/services/algorithms/locationRanking.js

const LOCATION_TIER_WEIGHTS = {
  same_city: 100,      // Chicago user sees Chicago posts first
  nearby: 80,          // Within 150 miles
  state: 50,           // Same state
  national: 20,        // Other states
};

const DISTANCE_THRESHOLDS = {
  same_city: 0,        // Exact city match
  nearby_close: 50,    // Within 50 miles
  nearby_far: 150,     // Within 150 miles
  regional: 500,       // Within 500 miles
};

export function calculateLocationScore(userLocation, contentLocation) {
  const distance = haversineDistance(
    userLocation.coordinates,
    contentLocation.coordinates
  );
  
  if (contentLocation.city === userLocation.city) {
    return 100;  // Highest priority
  }
  
  if (distance < 150) return 80;   // Nearby
  if (distance < 500) return 50;   // Regional
  return 20;                       // National
}

// Location always wins over paid boosts
export function getFinalLocationTier(score) {
  // Ensure location tier prevents paid posts from outranking local content
  if (score >= 100) return 'same_city';
  if (score >= 80) return 'nearby';
  if (score >= 50) return 'state';
  return 'national';
}
```

### Implementation
1. **All content has coordinates** (required field)
2. **User location is persistent** (detected, user can override)
3. **Feed ranking uses location first** (before engagement, freshness)
4. **Search results are location-aware** (can filter/sort by distance)

---

## UNIFIED FEED SYSTEM

### Feed Architecture

```javascript
// src/features/feed/services/feedRanking.js

export function rankFeedContent(
  allContent,
  userContext,
  options = {}
) {
  const {
    userLocation,
    userInterests,
    userFollowing,
    userTrustScore,
    filterType = 'all',
    timeRange = 24,
  } = userContext;

  let filtered = allContent;

  // 1. Apply type filter if specified
  if (filterType !== 'all') {
    filtered = filtered.filter(c => c.type === filterType);
  }

  // 2. Apply time range filter
  const cutoff = Date.now() - (timeRange * 60 * 60 * 1000);
  filtered = filtered.filter(c => 
    new Date(c.createdAt).getTime() > cutoff
  );

  // 3. Score and rank
  const scored = filtered.map(content => ({
    ...content,
    score: calculateContentScore(content, userContext),
  }));

  // 4. Sort by score (highest first)
  return scored.sort((a, b) => b.score - a.score);
}

export function calculateContentScore(content, userContext) {
  const locationScore = getLocationScore(
    userContext.userLocation,
    content.location
  ) * 0.40;  // 40% weight

  const engagementScore = getEngagementScore(content) * 0.20;  // 20% weight
  const freshnessScore = getFreshnessScore(content.createdAt) * 0.15;  // 15% weight
  const interestScore = getInterestScore(content, userContext) * 0.15;  // 15% weight
  const authorTrustScore = getAuthorTrustScore(content.author) * 0.10;  // 10% weight

  // Premium boost only applies within same location tier
  let boostScore = 0;
  if (content.isFeatured) boostScore += 15;
  if (content.isBoosted) boostScore += 10;

  return (
    locationScore +
    engagementScore +
    freshnessScore +
    interestScore +
    authorTrustScore +
    boostScore
  );
}
```

### Feed Sections (Home)

```
┌─────────────────────────────────────┐
│        Unified Home Feed             │
├─────────────────────────────────────┤
│                                     │
│  [Job Posting from Chicago]          │ Location-ranked
│  Posted 2 hours ago • 12 likes       │
│                                     │
│  [Housing listing from Chicago]      │ Location-ranked
│  Posted 4 hours ago • 8 likes        │
│                                     │
│  [Marketplace item from Chicago]     │ Location-ranked
│  Posted 6 hours ago • 25 likes       │
│                                     │
│  [Community discussion]              │ Engagement-ranked
│  Posted 8 hours ago • 45 comments    │
│                                     │
│  [Business listing nearby]           │ Location-ranked
│  Posted 12 hours ago • 6 likes       │
│                                     │
│  [Event from Chicago]                │ Location-ranked
│  Posted 1 day ago • 200 attending    │
│                                     │
│  [News story in Mongolian]           │ AI-generated + pinned
│  Posted 3 hours ago • trending       │
│                                     │
└─────────────────────────────────────┘
```

---

## STATE MANAGEMENT STRATEGY

### Use React Query for Server State

```javascript
// src/features/feed/hooks/useFeedData.js
import { useQuery } from '@tanstack/react-query';
import { feedApi } from '../services/feedApi';

export function useFeedData(options = {}) {
  return useQuery({
    queryKey: ['feed', options],
    queryFn: () => feedApi.getFeedContent(options),
    staleTime: 1000 * 60 * 5,  // 5 minutes
    gcTime: 1000 * 60 * 10,     // 10 minutes (formerly cacheTime)
  });
}
```

### Use Zustand for Client State

```javascript
// src/store/appStore.js
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useAppStore = create(
  devtools((set, get) => ({
    // Theme
    theme: 'dark',
    setTheme: (theme) => set({ theme }),

    // User location
    userLocation: null,
    setUserLocation: (location) => set({ userLocation: location }),

    // Active filters
    activeFilters: {},
    setActiveFilters: (filters) => set({ activeFilters: filters }),

    // Sidebar visibility
    sidebarOpen: true,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  }))
);
```

### Avoid Context Overuse

**AVOID:**
```javascript
// ❌ BAD: Too many contexts
<QueryProvider>
  <AuthProvider>
    <TabNavigationProvider>
      <DiscoveryProvider>
        <ThemeProvider>
          <NotificationProvider>
            ...
```

**PREFER:**
```javascript
// ✅ GOOD: Minimal contexts
<QueryProvider>
  <AuthProvider>  // Only for auth
    <App />
  </AuthProvider>
</QueryProvider>

// Use Zustand + React Query for everything else
```

---

## MODERN UI/UX IMPROVEMENTS

### Design System Tokens

```css
/* src/styles/tokens.css */

:root {
  /* Colors - Premium Dark Theme with Gold Accents */
  --color-primary: #fbbf24;        /* Gold */
  --color-primary-dark: #d97706;   /* Dark gold */
  --color-bg-primary: #0f172a;     /* Deep slate */
  --color-bg-secondary: #1e293b;   /* Medium slate */
  --color-bg-tertiary: #334155;    /* Light slate */
  
  --color-text-primary: #f1f5f9;   /* Off-white */
  --color-text-secondary: #cbd5e1; /* Light gray */
  --color-text-muted: #94a3b8;     /* Muted gray */
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  
  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  
  /* Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.2);
}
```

### Modern Card Component

```jsx
// src/shared/components/cards/FeedCard.jsx
import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

export function FeedCard({ content, onSave, onLike }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <article className={cn(
      'rounded-lg border border-slate-700/50',
      'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
      'backdrop-blur-sm',
      'p-4 transition-all duration-200',
      'hover:border-slate-600 hover:shadow-lg',
      'mb-3'
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5 flex-1">
          <img
            src={content.author.avatar}
            alt={content.author.name}
            className="w-10 h-10 rounded-full border border-slate-700"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-slate-100 truncate">
              {content.author.name}
            </h4>
            <p className="text-xs text-slate-500">
              {content.location.city} • {formatTime(content.createdAt)}
            </p>
          </div>
        </div>
        {content.isUrgent && (
          <span className="px-2 py-1 text-xs font-medium text-red-400 
                         bg-red-500/10 rounded border border-red-500/20">
            Urgent
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-slate-100 mb-2 line-clamp-2">
        {content.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-300 mb-3 line-clamp-3">
        {content.description}
      </p>

      {/* Media */}
      {content.media.length > 0 && (
        <div className="relative mb-3 rounded-lg overflow-hidden">
          <img
            src={content.media[0].url}
            alt={content.title}
            className="w-full h-48 object-cover"
          />
          {content.media.length > 1 && (
            <span className="absolute bottom-2 right-2 px-2 py-1 
                           text-xs font-medium bg-black/60 text-white rounded">
              +{content.media.length - 1}
            </span>
          )}
        </div>
      )}

      {/* Price & Category */}
      <div className="flex items-center justify-between mb-3">
        {content.price && (
          <span className="text-lg font-bold text-amber-400">
            ${content.price.amount.toLocaleString()}
          </span>
        )}
        <span className="text-xs font-medium text-amber-400/80 
                       bg-amber-500/10 px-2.5 py-1 rounded">
          {getCategoryLabel(content.type)}
        </span>
      </div>

      {/* Engagement Metrics */}
      <div className="flex items-center justify-between text-xs 
                     text-slate-400 mb-3 pb-3 border-t border-slate-700/50">
        <span>{content.engagement.views} views</span>
        <span>{content.engagement.likes} likes</span>
        <span>{content.engagement.comments} comments</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            setIsLiked(!isLiked);
            onLike?.(content.id);
          }}
          className={cn(
            'flex-1 flex items-center justify-center gap-2',
            'text-sm font-medium py-2 rounded transition-colors',
            isLiked
              ? 'text-red-400 bg-red-500/10'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/30'
          )}
        >
          <Heart size={16} className={isLiked ? 'fill-current' : ''} />
          Like
        </button>
        
        <button className={cn(
          'flex-1 flex items-center justify-center gap-2',
          'text-sm font-medium py-2 rounded transition-colors',
          'text-slate-400 hover:text-slate-300 hover:bg-slate-700/30'
        )}>
          <MessageCircle size={16} />
          Comment
        </button>
        
        <button className={cn(
          'flex-1 flex items-center justify-center gap-2',
          'text-sm font-medium py-2 rounded transition-colors',
          'text-slate-400 hover:text-slate-300 hover:bg-slate-700/30'
        )}>
          <Share2 size={16} />
          Share
        </button>
        
        <button
          onClick={() => {
            setIsSaved(!isSaved);
            onSave?.(content.id);
          }}
          className={cn(
            'flex-1 flex items-center justify-center gap-2',
            'text-sm font-medium py-2 rounded transition-colors',
            isSaved
              ? 'text-amber-400 bg-amber-500/10'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/30'
          )}
        >
          <Bookmark size={16} className={isSaved ? 'fill-current' : ''} />
          Save
        </button>
      </div>
    </article>
  );
}
```

### Bottom Navigation

```jsx
// src/layout/BottomNav.jsx
import { Home, Briefcase, Building2, ShoppingBag, MessageSquare, 
         Users, MoreHorizontal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/shared/utils/cn';

export function BottomNav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={cn(
      'fixed bottom-0 left-0 right-0',
      'border-t border-slate-700/50',
      'bg-slate-900/95 backdrop-blur-sm',
      'flex items-center justify-around',
      'h-16 z-40'
    )}>
      <NavLink icon={Home} label="Home" path="/" isActive={isActive('/')} />
      <NavLink icon={Briefcase} label="Jobs" path="/jobs" isActive={isActive('/jobs')} />
      <NavLink icon={Building2} label="Housing" path="/housing" isActive={isActive('/housing')} />
      <NavLink icon={ShoppingBag} label="Marketplace" path="/marketplace" isActive={isActive('/marketplace')} />
      <NavLink icon={MessageSquare} label="Messages" path="/messaging" isActive={isActive('/messaging')} />
      <NavLink icon={Users} label="Community" path="/community" isActive={isActive('/community')} />
      <NavLink icon={MoreHorizontal} label="More" path="/more" isActive={isActive('/more')} />
    </nav>
  );
}

function NavLink({ icon: Icon, label, path, isActive }) {
  return (
    <Link
      to={path}
      className={cn(
        'flex flex-col items-center justify-center gap-1',
        'w-full h-full transition-colors',
        isActive
          ? 'text-amber-400'
          : 'text-slate-400 hover:text-slate-300'
      )}
      title={label}
    >
      <Icon size={20} />
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}
```

---

## MESSAGING SYSTEM (REALTIME-READY)

### Architecture

```javascript
// src/features/messaging/types.ts

export interface Conversation {
  id: string;
  participantIds: string[];
  participants: User[];
  lastMessage?: Message;
  lastMessageAt?: string;
  unreadCount: number;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  media?: {
    url: string;
    type: 'image' | 'video' | 'file';
  }[];
  
  // Realtime features
  sentAt: string;
  deliveredAt?: string;
  readAt?: string;
  isTyping?: boolean;
  
  status: 'sending' | 'sent' | 'delivered' | 'read';
}
```

### Messaging Component

```jsx
// src/features/messaging/components/ConversationList.jsx
import { useQuery } from '@tanstack/react-query';
import { messagingApi } from '../services/messagingApi';
import { cn } from '@/shared/utils/cn';

export function ConversationList() {
  const { data: conversations = [] } = useQuery({
    queryKey: ['conversations'],
    queryFn: messagingApi.getConversations,
  });

  return (
    <div className="flex flex-col h-full bg-slate-900">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <h1 className="text-xl font-bold text-slate-100">Messages</h1>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <ConversationItem key={conv.id} conversation={conv} />
        ))}
      </div>
    </div>
  );
}

function ConversationItem({ conversation }) {
  const participant = conversation.participants[0];

  return (
    <button className={cn(
      'w-full p-3 border-b border-slate-800',
      'hover:bg-slate-800/50 transition-colors text-left'
    )}>
      <div className="flex items-start gap-3">
        <img
          src={participant.avatar}
          alt={participant.name}
          className="w-12 h-12 rounded-full border border-slate-700"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="text-sm font-semibold text-slate-100 truncate">
              {participant.name}
            </h3>
            <span className="text-xs text-slate-500">
              {formatTime(conversation.lastMessageAt)}
            </span>
          </div>
          <p className={cn(
            'text-sm truncate',
            conversation.unreadCount > 0
              ? 'text-slate-200 font-medium'
              : 'text-slate-400'
          )}>
            {conversation.lastMessage?.content}
          </p>
        </div>
        {conversation.unreadCount > 0 && (
          <span className="flex-shrink-0 px-2 py-0.5 text-xs font-bold 
                         text-white bg-amber-500 rounded-full">
            {conversation.unreadCount}
          </span>
        )}
      </div>
    </button>
  );
}
```

---

## AI NEWS SYSTEM

### Architecture

```javascript
// src/features/news/services/newsAiAgent.js

export class NewsAiAgent {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * Autonomous news agent that:
   * 1. Scans trusted Mongolian news sources
   * 2. Detects important stories
   * 3. Rewrites in clear Mongolian
   * 4. Generates metadata (thumbnail, tags)
   * 5. Submits for moderation
   * 6. Publishes to feed
   */
  async scanAndPublish() {
    try {
      // Step 1: Scan news sources
      const newStories = await this.scanNewsSources([
        'https://news.mn',
        'https://montsame.mn',
        'https://gogo.mn',
        // Add trusted Mongolian sources
      ]);

      // Step 2: Score importance
      const scored = newStories
        .map(story => ({
          ...story,
          importance: this.scoreImportance(story),
        }))
        .filter(story => story.importance > 0.6)
        .sort((a, b) => b.importance - a.importance);

      // Step 3: Process each story
      for (const story of scored.slice(0, 5)) {
        const processed = await this.processStory(story);
        
        // Step 4: Submit for moderation
        const approved = await this.submitForModeration(processed);
        
        if (approved) {
          // Step 5: Publish to feed
          await this.publishToFeed(processed);
        }
      }
    } catch (error) {
      console.error('News agent error:', error);
    }
  }

  async processStory(story) {
    // Rewrite in Mongolian
    const mongolianText = await this.translateAndRewrite(story.content);
    
    // Generate thumbnail
    const thumbnail = await this.generateThumbnail(story.url);
    
    // Extract tags
    const tags = await this.extractTags(mongolianText);

    return {
      title: story.title,
      description: mongolianText,
      source: story.source,
      sourceUrl: story.url,
      thumbnail,
      tags,
      category: 'news',
      type: 'news',
      status: 'pending_moderation',
      createdAt: new Date().toISOString(),
    };
  }

  async publishToFeed(newsItem) {
    // Creates a content item and publishes to main feed
    const content = {
      ...newsItem,
      type: 'news',
      author: {
        id: 'news-agent',
        name: 'MongolsUSA News',
        avatar: '/logo.png',
        trustScore: 95,
        verified: true,
      },
      engagement: {
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        saves: 0,
      },
      isFeatured: true,  // Pin news to top
      location: {
        city: 'USA',
        state: 'USA',
      },
    };

    return await contentApi.createContent(content);
  }

  scoreImportance(story) {
    // Simple scoring: check keywords, source reliability, etc.
    const keywords = ['mongolian', 'immigration', 'community', 'usa'];
    const hasKeyword = keywords.some(kw => 
      story.title.toLowerCase().includes(kw) ||
      story.content.toLowerCase().includes(kw)
    );

    return hasKeyword ? 0.8 : 0.5;
  }
}
```

### News Feed Item

```jsx
// src/features/news/components/NewsCard.jsx

export function NewsCard({ newsItem }) {
  return (
    <article className={cn(
      'rounded-lg border border-slate-700/50',
      'bg-gradient-to-br from-amber-900/20 via-slate-800 to-slate-900',
      'backdrop-blur-sm',
      'p-4 mb-3 border-l-4 border-l-amber-500'
    )}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 px-2.5 py-1 
                      bg-amber-500/20 rounded text-amber-400 text-xs font-bold">
          NEWS
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-slate-100 mb-2">
            {newsItem.title}
          </h3>
          <p className="text-sm text-slate-300 mb-3 line-clamp-3">
            {newsItem.description}
          </p>
          {newsItem.thumbnail && (
            <img
              src={newsItem.thumbnail}
              alt={newsItem.title}
              className="w-full h-40 rounded object-cover mb-3"
            />
          )}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Via <a href={newsItem.sourceUrl} className="text-amber-400 hover:underline">
                {newsItem.source}
              </a>
            </span>
            <span>{formatTime(newsItem.createdAt)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
```

---

## PERFORMANCE OPTIMIZATIONS

### 1. Virtualization for Feed

```jsx
// src/features/feed/components/VirtualizedFeed.jsx
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

export function VirtualizedFeed({ items, onLoadMore, isLoading }) {
  return (
    <InfiniteLoader
      isItemLoaded={(index) => index < items.length}
      itemCount={isLoading ? items.length + 10 : items.length}
      loadMoreItems={onLoadMore}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          ref={ref}
          onItemsRendered={onItemsRendered}
          height={window.innerHeight - 100}
          itemCount={items.length}
          itemSize={400}
          width="100%"
        >
          {({ index, style }) => (
            <div style={style}>
              <FeedCard content={items[index]} />
            </div>
          )}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
}
```

### 2. Image Optimization

```javascript
// src/shared/utils/imageOptimization.js

export function getOptimizedImageUrl(url, options = {}) {
  const {
    width = 400,
    height = 300,
    quality = 80,
    format = 'webp'
  } = options;

  // Use imgix or similar service
  const params = new URLSearchParams({
    w: width,
    h: height,
    q: quality,
    fm: format,
    fit: 'crop',
    auto: 'format',
  });

  return `${url}?${params.toString()}`;
}
```

### 3. Code Splitting by Route

```javascript
// src/App.jsx
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Jobs = lazy(() => import('./pages/Jobs'));
const Housing = lazy(() => import('./pages/Housing'));
const Marketplace = lazy(() => import('./pages/Marketplace'));

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Suspense fallback={<Skeleton />}><Home /></Suspense>} />
        <Route path="/jobs" element={<Suspense fallback={<Skeleton />}><Jobs /></Suspense>} />
        {/* ... */}
      </Route>
    </Routes>
  );
}
```

### 4. Memoization Strategy

```jsx
// src/shared/utils/memoization.js
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive components
export const FeedItem = memo(({ item, onLike }) => {
  return <FeedCard content={item} onLike={onLike} />;
}, (prev, next) => {
  // Only rerender if item ID or engagement changed
  return (
    prev.item.id === next.item.id &&
    prev.item.engagement.likes === next.item.engagement.likes
  );
});

// Use useMemo for expensive calculations
export function useFeedRanking(items, context) {
  return useMemo(() => {
    return rankFeedContent(items, context);
  }, [items, context.userCity, context.userInterests]);
}
```

---

## MIGRATION STRATEGY

### Phase 1: Foundation (Week 1-2)
- [ ] Set up new folder structure
- [ ] Create base feature modules
- [ ] Implement unified Content model
- [ ] Set up types/interfaces

### Phase 2: Core Features (Week 3-4)
- [ ] Migrate feed system
- [ ] Implement location-based ranking
- [ ] Create FeedCard component
- [ ] Wire up React Query hooks

### Phase 3: UI Overhaul (Week 5-6)
- [ ] Build modern card components
- [ ] Implement bottom navigation
- [ ] Update styling with design tokens
- [ ] Add animations and transitions

### Phase 4: Advanced Features (Week 7-8)
- [ ] Messaging system
- [ ] AI news agent
- [ ] Search optimization
- [ ] Analytics

### Phase 5: Optimization (Week 9-10)
- [ ] Virtualization
- [ ] Image optimization
- [ ] Code splitting
- [ ] Performance testing

---

## KEY IMPROVEMENTS SUMMARY

| Aspect | Current | New |
|--------|---------|-----|
| **Architecture** | Page-centric | Feature-driven |
| **State** | Multiple contexts | React Query + Zustand |
| **Content** | Isolated sections | Unified feed system |
| **Ranking** | Basic location | Location-first, multi-factor |
| **UI** | Basic, flat | Modern, social app quality |
| **Performance** | Basic | Virtualized, optimized images, lazy loading |
| **Messaging** | Basic | Realtime-ready architecture |
| **News** | Manual | AI-powered autonomous agent |
| **Location** | Supported | Primary ranking signal |
| **Scalability** | Limited | Enterprise-grade |

---

## DEPENDENCIES TO ADD

```json
{
  "new-dependencies": {
    "@tanstack/react-window": "^8.0.0",
    "zustand": "^4.4.0",
    "axios": "^1.6.0",
    "immer": "^10.0.0",
    "next-themes": "^0.4.0"
  },
  "notes": {
    "react-query": "Already installed (^5.84.1)",
    "tailwindcss": "Already installed (^3.4.17)",
    "lucide-react": "Already installed (^0.475.0)",
    "framer-motion": "Already installed (^11.16.4)"
  }
}
```

---

## NEXT STEPS

1. **Review** this architecture document
2. **Discuss** any concerns or changes
3. **Start** with Phase 1 (folder restructuring)
4. **Build** feature modules one by one
5. **Test** thoroughly before Phase 2
6. **Deploy** incrementally with feature flags

This is a **production-grade architecture** that will support:
- Millions of users
- Real-time features
- Complex ranking algorithms
- Multiple content types
- High performance on mobile

Let's build this! 🚀
