// ============================================================================
// src/shared/utils/cn.js
// ============================================================================
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// ============================================================================
// src/shared/utils/formatting.js
// ============================================================================

export function formatPrice(amount, currency = 'USD') {
  if (!amount) return '$0'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatTime(date) {
  if (!date) return 'Just now'
  const now = new Date()
  const past = new Date(date)
  const diff = now - past

  const minute = 60 * 1000
  const hour = minute * 60
  const day = hour * 24
  const week = day * 7
  const month = day * 30

  if (diff < minute) return 'Just now'
  if (diff < hour) return `${Math.floor(diff / minute)}m ago`
  if (diff < day) return `${Math.floor(diff / hour)}h ago`
  if (diff < week) return `${Math.floor(diff / day)}d ago`
  if (diff < month) return `${Math.floor(diff / week)}w ago`
  
  return past.toLocaleDateString()
}

export function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

export function truncateText(text, length = 100) {
  if (!text) return ''
  return text.length > length ? text.slice(0, length) + '...' : text
}

// ============================================================================
// src/shared/utils/validation.js
// ============================================================================

export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function isValidPhone(phone) {
  const re = /^[\d\s\-\+\(\)]{10,}$/
  return re.test(phone?.replace(/\s/g, ''))
}

export function isValidPrice(price) {
  return !isNaN(price) && price > 0
}

// ============================================================================
// src/shared/utils/storage.js
// ============================================================================

export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.warn('Storage error:', e)
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (e) {
      console.warn('Storage error:', e)
      return defaultValue
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.warn('Storage error:', e)
    }
  },

  clear: () => {
    try {
      localStorage.clear()
    } catch (e) {
      console.warn('Storage error:', e)
    }
  },
}

// ============================================================================
// src/shared/constants/categories.js
// ============================================================================

export const CATEGORIES = {
  jobs: {
    label: 'Jobs',
    icon: 'Briefcase',
    color: 'blue',
    subcategories: [
      'Full-time',
      'Part-time',
      'Contract',
      'Remote',
      'On-site',
    ],
  },
  housing: {
    label: 'Housing',
    icon: 'Home',
    color: 'purple',
    subcategories: [
      'Apartment',
      'House',
      'Room',
      'Condo',
      'Townhouse',
    ],
  },
  marketplace: {
    label: 'Marketplace',
    icon: 'ShoppingBag',
    color: 'amber',
    subcategories: [
      'Electronics',
      'Furniture',
      'Clothing',
      'Books',
      'Other',
    ],
  },
  services: {
    label: 'Services',
    icon: 'Wrench',
    color: 'green',
    subcategories: [
      'Cleaning',
      'Repair',
      'Consulting',
      'Tutoring',
      'Other',
    ],
  },
  events: {
    label: 'Events',
    icon: 'Calendar',
    color: 'pink',
    subcategories: [
      'Social',
      'Business',
      'Educational',
      'Cultural',
      'Other',
    ],
  },
  community: {
    label: 'Community',
    icon: 'Users',
    color: 'cyan',
    subcategories: [
      'Discussion',
      'Question',
      'Announcement',
      'Recommendation',
    ],
  },
}

// ============================================================================
// src/shared/constants/cities.js
// ============================================================================

export const US_CITIES = [
  { name: 'New York', state: 'NY', coordinates: [40.71, -74.0] },
  { name: 'Los Angeles', state: 'CA', coordinates: [34.05, -118.24] },
  { name: 'Chicago', state: 'IL', coordinates: [41.88, -87.63] },
  { name: 'Houston', state: 'TX', coordinates: [29.76, -95.37] },
  { name: 'Phoenix', state: 'AZ', coordinates: [33.45, -112.07] },
  { name: 'Philadelphia', state: 'PA', coordinates: [39.95, -75.17] },
  { name: 'San Antonio', state: 'TX', coordinates: [29.42, -98.49] },
  { name: 'San Diego', state: 'CA', coordinates: [32.72, -117.15] },
  { name: 'Dallas', state: 'TX', coordinates: [32.78, -96.8] },
  { name: 'San Jose', state: 'CA', coordinates: [37.34, -121.89] },
  { name: 'Denver', state: 'CO', coordinates: [39.74, -104.98] },
  { name: 'Seattle', state: 'WA', coordinates: [47.61, -122.33] },
  { name: 'Boston', state: 'MA', coordinates: [42.36, -71.06] },
  { name: 'Atlanta', state: 'GA', coordinates: [33.75, -84.39] },
  { name: 'Miami', state: 'FL', coordinates: [25.77, -80.19] },
  { name: 'Portland', state: 'OR', coordinates: [45.52, -122.68] },
  { name: 'Las Vegas', state: 'NV', coordinates: [36.17, -115.14] },
  { name: 'Washington', state: 'DC', coordinates: [38.89, -77.04] },
]

// ============================================================================
// src/shared/constants/config.js
// ============================================================================

export const APP_CONFIG = {
  name: 'MongolsUSA',
  description: 'Modern community platform for Mongolians in USA',
  url: process.env.VITE_API_URL || 'http://localhost:3000',
  version: '2.0.0',
  features: {
    analytics: process.env.VITE_ENABLE_ANALYTICS === 'true',
    aiAgent: process.env.VITE_ENABLE_AI_AGENT === 'true',
  },
}

// ============================================================================
// src/shared/utils/geolocation.js
// ============================================================================

export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8 // miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        })
      },
      (error) => {
        reject(error)
      },
      {
        timeout: 10000,
        enableHighAccuracy: false,
      }
    )
  })
}

// ============================================================================
// src/shared/utils/analytics.js
// ============================================================================

export const analytics = {
  trackEvent: (eventName, properties = {}) => {
    if (process.env.VITE_ENABLE_ANALYTICS === 'true') {
      console.log('Analytics:', eventName, properties)
      // Integration point for Google Analytics, Mixpanel, etc.
    }
  },

  trackPageView: (pageName) => {
    analytics.trackEvent('pageview', { page: pageName })
  },

  trackClick: (elementName) => {
    analytics.trackEvent('click', { element: elementName })
  },

  trackSearch: (query) => {
    analytics.trackEvent('search', { query })
  },
}
