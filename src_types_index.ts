// src/types/index.ts

// ============================================================================
// CONTENT TYPES
// ============================================================================

export type ContentType =
  | 'job'
  | 'housing'
  | 'marketplace'
  | 'service'
  | 'event'
  | 'community_post'
  | 'news'
  | 'business_listing';

export type ContentStatus =
  | 'active'
  | 'expired'
  | 'sold'
  | 'archived'
  | 'pending_moderation';

export interface ContentPrice {
  amount: number;
  currency: 'USD';
  priceType?: 'fixed' | 'negotiable' | 'range';
  range?: [number, number];
}

export interface ContentLocation {
  city: string;
  state: string;
  coordinates?: [number, number];
  radius?: number;
  country?: string;
}

export interface ContentAuthor {
  id: string;
  name: string;
  avatar?: string;
  trustScore: number;
  verified: boolean;
  verificationBadges?: string[];
  responseRate?: number;
  memberSince?: string;
}

export interface ContentEngagement {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
}

export interface ContentMedia {
  url: string;
  type: 'image' | 'video' | 'carousel';
  alt?: string;
  thumbnail?: string;
}

export interface Content {
  id: string;
  type: ContentType;
  category?: string;
  title: string;
  description: string;
  media: ContentMedia[];
  location: ContentLocation;
  price?: ContentPrice;
  author: ContentAuthor;
  engagement: ContentEngagement;
  tags: string[];
  isFeatured: boolean;
  isBoosted: boolean;
  isUrgent: boolean;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  status: ContentStatus;
  contactEmail?: string;
  contactPhone?: string;
  amenities?: string[];
  requirements?: string[];
}

// ============================================================================
// USER TYPES
// ============================================================================

export interface UserLocation {
  city: string;
  state: string;
  coordinates: [number, number];
  accuracy?: number;
  lastUpdated?: string;
}

export interface UserVerification {
  email: boolean;
  phone: boolean;
  id: boolean;
  address: boolean;
  business: boolean;
}

export interface UserReputation {
  trustScore: number;
  totalTransactions: number;
  totalListings: number;
  avgRating: number;
  responseRate: number;
  memberSince: string;
  badges: string[];
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  location: UserLocation;
  website?: string;
  verification: UserVerification;
  reputation: UserReputation;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  interests: string[];
  notifications: {
    jobs: boolean;
    housing: boolean;
    marketplace: boolean;
    events: boolean;
    messages: boolean;
    news: boolean;
  };
  language: 'en' | 'mn';
  theme: 'light' | 'dark';
  searchRadius: number;
}

// ============================================================================
// MESSAGING TYPES
// ============================================================================

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  media?: ContentMedia[];
  sentAt: string;
  deliveredAt?: string;
  readAt?: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participants: User[];
  lastMessage?: Message;
  lastMessageAt?: string;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// FEED TYPES
// ============================================================================

export interface FeedFilter {
  type?: ContentType;
  category?: string;
  distance?: number;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  sortBy?: 'relevance' | 'distance' | 'newest' | 'trending';
  timeRange?: number;
}

export interface FeedItem extends Content {
  score?: number;
  distance?: number;
  relevanceReason?: string;
}

// ============================================================================
// SEARCH TYPES
// ============================================================================

export interface SearchResult {
  content: Content;
  score: number;
  relevance: 'exact' | 'high' | 'medium' | 'low';
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number = 400
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

// ============================================================================
// LOCATION TYPES
// ============================================================================

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface GeolocationError {
  code: number;
  message: string;
}
