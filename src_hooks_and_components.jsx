// src/shared/hooks/useSystemTheme.js
import { useEffect } from 'react'

export function useSystemTheme() {
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.classList.toggle('dark', isDark)
  }, [])
}

// ============================================================================
// src/shared/hooks/useDebounce.js
// ============================================================================
import { useEffect, useState } from 'react'

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// ============================================================================
// src/features/feed/components/FeedCard.jsx
// ============================================================================
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/shared/utils/cn'
import { formatPrice, formatTime } from '@/shared/utils/formatting'

export default function FeedCard({ content }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const getCategoryColor = (type) => {
    const colors = {
      job: 'bg-blue-500/10 text-blue-400',
      housing: 'bg-purple-500/10 text-purple-400',
      marketplace: 'bg-amber-500/10 text-amber-400',
      service: 'bg-green-500/10 text-green-400',
      event: 'bg-pink-500/10 text-pink-400',
      community_post: 'bg-cyan-500/10 text-cyan-400',
      news: 'bg-amber-500/10 text-amber-400',
    }
    return colors[type] || 'bg-slate-500/10 text-slate-400'
  }

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
            <h4 className="text-sm font-semibold text-slate-100 truncate">
              {content.author.name}
            </h4>
            <p className="text-xs text-slate-500">
              {content.location.city} • {formatTime(content.createdAt)}
            </p>
          </div>
        </div>
        {content.isUrgent && (
          <span className="px-2 py-1 text-xs font-medium text-red-400 bg-red-500/10 rounded border border-red-500/20">
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
      {content.media && content.media.length > 0 && (
        <div className="relative mb-3 rounded-lg overflow-hidden">
          <img
            src={content.media[0].url}
            alt={content.title}
            className="w-full h-48 object-cover"
          />
          {content.media.length > 1 && (
            <span className="absolute bottom-2 right-2 px-2 py-1 text-xs font-medium bg-black/60 text-white rounded">
              +{content.media.length - 1}
            </span>
          )}
        </div>
      )}

      {/* Price & Category */}
      <div className="flex items-center justify-between mb-3">
        {content.price && (
          <span className="text-lg font-bold text-amber-400">
            {formatPrice(content.price.amount)}
          </span>
        )}
        <span className={cn('text-xs font-medium px-2.5 py-1 rounded', getCategoryColor(content.type))}>
          {content.category || content.type}
        </span>
      </div>

      {/* Engagement Metrics */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pb-3 border-t border-slate-700/50">
        <span>{content.engagement.views} views</span>
        <span>{content.engagement.likes} likes</span>
        <span>{content.engagement.comments} comments</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2 rounded transition-colors',
            isLiked
              ? 'text-red-400 bg-red-500/10'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/30'
          )}
        >
          <Heart size={16} className={isLiked ? 'fill-current' : ''} />
          Like
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2 rounded transition-colors text-slate-400 hover:text-slate-300 hover:bg-slate-700/30">
          <MessageCircle size={16} />
          Comment
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2 rounded transition-colors text-slate-400 hover:text-slate-300 hover:bg-slate-700/30">
          <Share2 size={16} />
          Share
        </button>

        <button
          onClick={() => setIsSaved(!isSaved)}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2 rounded transition-colors',
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
  )
}

// ============================================================================
// src/services/api/queryClient.js
// ============================================================================
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// ============================================================================
// src/services/algorithms/feedRanking.js
// ============================================================================

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function calculateLocationScore(userLocation, contentLocation) {
  if (!userLocation || !contentLocation) return 0

  if (userLocation.city.toLowerCase() === contentLocation.city.toLowerCase()) {
    return 100
  }

  if (userLocation.coordinates && contentLocation.coordinates) {
    const distance = haversineDistance(
      userLocation.coordinates[0],
      userLocation.coordinates[1],
      contentLocation.coordinates[0],
      contentLocation.coordinates[1]
    )

    if (distance < 50) return 85
    if (distance < 150) return 70
    if (distance < 500) return 50
  }

  return 20
}

function calculateFreshnessScore(createdAt) {
  if (!createdAt) return 0
  const ageInDays = (Date.now() - new Date(createdAt).getTime()) / 86400000
  return Math.max(0, 15 * Math.exp(-ageInDays / 7))
}

function calculateEngagementScore(engagement) {
  if (!engagement) return 0
  const viewsScore = Math.min(engagement.views / 10, 8)
  const likesScore = Math.min(engagement.likes * 1.5, 8)
  const commentsScore = Math.min(engagement.comments * 2, 5)
  return viewsScore + likesScore + commentsScore
}

function calculateInterestScore(content, userInterests = []) {
  if (!userInterests.length) return 0
  let score = 0
  if (userInterests.some((i) => i.toLowerCase() === (content.category || '').toLowerCase())) {
    score += 8
  }
  return Math.min(score, 15)
}

function calculateAuthorTrustScore(author) {
  if (!author) return 0
  let score = Math.min(author.trustScore / 10, 5)
  if (author.verified) {
    score += 2
  }
  return Math.min(score, 10)
}

export function scoreContent(content, userContext = {}) {
  const { userLocation, userInterests = [] } = userContext

  const locationScore = calculateLocationScore(userLocation, content.location)
  const freshnessScore = calculateFreshnessScore(content.createdAt)
  const engagementScore = calculateEngagementScore(content.engagement)
  const interestScore = calculateInterestScore(content, userInterests)
  const trustScore = calculateAuthorTrustScore(content.author)

  let premiumScore = 0
  if (content.isFeatured) premiumScore += 15
  if (content.isBoosted) premiumScore += 10

  const totalScore =
    locationScore * 0.4 +
    freshnessScore * 0.15 +
    engagementScore * 0.2 +
    interestScore * 0.15 +
    trustScore * 0.1 +
    premiumScore

  return totalScore
}

export function rankContent(content, userContext = {}) {
  return [...content]
    .sort((a, b) => scoreContent(b, userContext) - scoreContent(a, userContext))
}
