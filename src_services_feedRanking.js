// src/services/algorithms/feedRanking.js

/**
 * MongolsUSA Feed Ranking Algorithm
 * 
 * Priority: Location > Freshness > Engagement > Interest > Trust > Premium
 */

const CITY_COORDINATES = {
  'New York': [40.71, -74.0],
  'Los Angeles': [34.05, -118.24],
  'Chicago': [41.88, -87.63],
  'Houston': [29.76, -95.37],
  'Phoenix': [33.45, -112.07],
  'Philadelphia': [39.95, -75.17],
  'San Francisco': [37.77, -122.41],
  'Seattle': [47.61, -122.33],
  'Boston': [42.36, -71.06],
  'Atlanta': [33.75, -84.39],
  'Denver': [39.74, -104.98],
  'Dallas': [32.78, -96.8],
  'Miami': [25.77, -80.19],
  'Washington': [38.89, -77.04],
  'Portland': [45.52, -122.68],
};

/**
 * Calculate haversine distance between two coordinates
 */
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Calculate location tier score (40% weight)
 * Same city > Nearby > State > National
 */
function calculateLocationScore(userLocation, contentLocation) {
  if (!userLocation || !contentLocation) return 0;

  // Exact city match
  if (
    userLocation.city.toLowerCase() === contentLocation.city.toLowerCase()
  ) {
    return 100;
  }

  // Calculate distance
  const userCoords = CITY_COORDINATES[userLocation.city];
  const contentCoords = CITY_COORDINATES[contentLocation.city];

  if (userCoords && contentCoords) {
    const distance = haversineDistance(
      userCoords[0],
      userCoords[1],
      contentCoords[0],
      contentCoords[1]
    );

    if (distance < 50) return 85; // Very nearby
    if (distance < 150) return 70; // Nearby
    if (distance < 500) return 50; // Regional
    if (contentLocation.state === userLocation.state) return 40; // Same state
  }

  return 20; // National
}

/**
 * Calculate freshness score (15% weight)
 * Recent content > older content (exponential decay)
 */
function calculateFreshnessScore(createdAt) {
  if (!createdAt) return 0;

  const ageInDays = (Date.now() - new Date(createdAt).getTime()) / 86400000;

  // Exponential decay: 15 pts at 0 days → 0 at 30 days
  return Math.max(0, 15 * Math.exp(-ageInDays / 7));
}

/**
 * Calculate engagement score (20% weight)
 * Views, likes, comments, shares
 */
function calculateEngagementScore(engagement) {
  if (!engagement) return 0;

  const viewsScore = Math.min(engagement.views / 10, 8);
  const likesScore = Math.min(engagement.likes * 1.5, 8);
  const commentsScore = Math.min(engagement.comments * 2, 5);
  const sharesScore = Math.min(engagement.shares * 3, 5);

  return viewsScore + likesScore + commentsScore + sharesScore;
}

/**
 * Calculate interest match score (15% weight)
 * Category match, tag match with user interests
 */
function calculateInterestScore(content, userInterests = []) {
  if (!userInterests.length) return 0;

  let score = 0;

  // Category match
  if (
    userInterests.some(
      (i) => i.toLowerCase() === (content.category || '').toLowerCase()
    )
  ) {
    score += 8;
  }

  // Tag match
  const tags = content.tags || [];
  const matchingTags = tags.filter((tag) =>
    userInterests.some((interest) =>
      tag.toLowerCase().includes(interest.toLowerCase())
    )
  );
  score += Math.min(matchingTags.length * 2, 7);

  return Math.min(score, 15);
}

/**
 * Calculate author trust score (10% weight)
 * Based on trust score, verification status
 */
function calculateAuthorTrustScore(author) {
  if (!author) return 0;

  let score = Math.min(author.trustScore / 10, 5);

  // Verified bonus
  if (author.verified) {
    score += 2;
  }

  // Badge count bonus
  const badgeCount = author.verificationBadges?.length || 0;
  score += Math.min(badgeCount * 0.5, 3);

  return Math.min(score, 10);
}

/**
 * Calculate premium boost score
 * Featured and boosted posts get bonus within their location tier
 */
function calculatePremiumScore(content) {
  let score = 0;
  if (content.isFeatured) score += 15;
  if (content.isBoosted) score += 10;
  if (content.isUrgent) score += 5;
  return score;
}

/**
 * Calculate recency decay for time-sensitive content
 * (jobs, housing, events)
 */
function getRecencyMultiplier(contentType, createdAt) {
  const isTimeSensitive = ['job', 'housing', 'event'].includes(contentType);
  if (!isTimeSensitive) return 1;

  const ageInHours = (Date.now() - new Date(createdAt).getTime()) / 3600000;
  // Recent: 1.5x boost, older: decay
  return Math.max(0.5, 1.5 - ageInHours / 48);
}

/**
 * Main scoring function
 */
export function scoreContent(content, userContext = {}) {
  const {
    userLocation,
    userInterests = [],
    boostRecency = false,
  } = userContext;

  // Calculate each component
  const locationScore = calculateLocationScore(userLocation, content.location);
  const freshnessScore = calculateFreshnessScore(content.createdAt);
  const engagementScore = calculateEngagementScore(content.engagement);
  const interestScore = calculateInterestScore(content, userInterests);
  const trustScore = calculateAuthorTrustScore(content.author);
  const premiumScore = calculatePremiumScore(content);

  // Apply recency multiplier for time-sensitive content
  const recencyMultiplier = boostRecency
    ? getRecencyMultiplier(content.type, content.createdAt)
    : 1;

  // Weighted sum (weights sum to 100%)
  const totalScore =
    (locationScore * 0.4 +
      freshnessScore * 0.15 +
      engagementScore * 0.2 +
      interestScore * 0.15 +
      trustScore * 0.1 +
      premiumScore) *
    recencyMultiplier;

  return {
    score: totalScore,
    components: {
      location: locationScore,
      freshness: freshnessScore,
      engagement: engagementScore,
      interest: interestScore,
      trust: trustScore,
      premium: premiumScore,
    },
    distance: userLocation?.coordinates
      ? haversineDistance(
          userLocation.coordinates[0],
          userLocation.coordinates[1],
          content.location.coordinates?.[0] || 0,
          content.location.coordinates?.[1] || 0
        )
      : null,
  };
}

/**
 * Rank array of content items
 */
export function rankContent(content, userContext = {}) {
  return content
    .map((item) => ({
      ...item,
      _ranking: scoreContent(item, userContext),
    }))
    .sort((a, b) => b._ranking.score - a._ranking.score);
}

/**
 * Build feed sections with different sorting strategies
 */
export function buildFeedSections(content, user = {}) {
  const userLocation = user.location;
  const userInterests = user.preferences?.interests || [];

  // Rank all content
  const ranked = rankContent(content, {
    userLocation,
    userInterests,
  });

  return {
    // Personalized: location + interest match
    forYou: ranked
      .filter((item) => item.location.city === userLocation?.city)
      .slice(0, 8),

    // All content sorted by relevance
    all: ranked.slice(0, 20),

    // Nearby content within 150 miles
    nearby: ranked
      .filter((item) => {
        const distance = haversineDistance(
          userLocation?.coordinates[0] || 0,
          userLocation?.coordinates[1] || 0,
          item.location.coordinates?.[0] || 0,
          item.location.coordinates?.[1] || 0
        );
        return distance < 150;
      })
      .slice(0, 8),

    // Trending by engagement
    trending: [...ranked]
      .sort(
        (a, b) =>
          b._ranking.components.engagement - a._ranking.components.engagement
      )
      .slice(0, 6),

    // Fresh content
    fresh: [...ranked]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 6),

    // Jobs
    jobs: ranked.filter((item) => item.type === 'job').slice(0, 8),

    // Housing
    housing: ranked.filter((item) => item.type === 'housing').slice(0, 8),

    // Events
    events: ranked.filter((item) => item.type === 'event').slice(0, 8),

    // Featured/Premium
    featured: ranked.filter((item) => item.isFeatured).slice(0, 6),
  };
}

/**
 * Calculate relevance reason for UI display
 */
export function getRelevanceReason(scoring) {
  const { components } = scoring;

  if (components.location >= 100) return 'In your city';
  if (components.location >= 80) return 'Nearby you';
  if (components.interest >= 8) return 'Matches your interests';
  if (components.engagement >= 20) return 'Trending';
  if (components.freshness >= 12) return 'Just posted';

  return 'Recommended';
}
