// src/layout/AppLayout.jsx
import { Outlet } from 'react-router-dom'
import BottomNav from '@/shared/components/navigation/BottomNav'

export default function AppLayout() {
  return (
    <div className="flex flex-col h-screen bg-slate-900">
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

// ============================================================================
// src/shared/components/navigation/BottomNav.jsx
// ============================================================================
import { Home, Briefcase, Building2, ShoppingBag, Users, Search, MoreHorizontal } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/shared/utils/cn'

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Briefcase, label: 'Jobs', path: '/jobs' },
  { icon: Building2, label: 'Housing', path: '/housing' },
  { icon: ShoppingBag, label: 'Marketplace', path: '/marketplace' },
  { icon: Users, label: 'Community', path: '/community' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: MoreHorizontal, label: 'More', path: '#' },
]

export default function BottomNav() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-sm flex items-center justify-around h-16 z-40">
      {navItems.map(({ icon: Icon, label, path }) => (
        <Link
          key={path}
          to={path}
          className={cn(
            'flex flex-col items-center justify-center gap-1 w-full h-full transition-colors',
            isActive(path)
              ? 'text-amber-400'
              : 'text-slate-400 hover:text-slate-300'
          )}
          title={label}
          onClick={(e) => {
            if (path === '#') e.preventDefault()
          }}
        >
          <Icon size={20} />
          <span className="text-xs font-medium hidden sm:inline">{label}</span>
        </Link>
      ))}
    </nav>
  )
}

// ============================================================================
// src/pages/Home.jsx
// ============================================================================
import { useState, useMemo } from 'react'
import { MOCK_CONTENT, MOCK_USER } from '@/services/mockData'
import { rankContent } from '@/services/algorithms/feedRanking'
import FeedCard from '@/features/feed/components/FeedCard'

export default function Home() {
  const [content] = useState(MOCK_CONTENT)

  const rankedContent = useMemo(() => {
    return rankContent(content, {
      userLocation: MOCK_USER.location,
      userInterests: MOCK_USER.interests,
    })
  }, [content])

  return (
    <div className="max-w-2xl mx-auto py-4 px-3">
      <h1 className="text-2xl font-bold text-slate-100 mb-4">Home Feed</h1>
      <div className="space-y-3">
        {rankedContent.map((item) => (
          <FeedCard key={item.id} content={item} />
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// src/pages/Jobs.jsx
// ============================================================================
import { useMemo } from 'react'
import { MOCK_CONTENT, MOCK_USER } from '@/services/mockData'
import { rankContent } from '@/services/algorithms/feedRanking'
import FeedCard from '@/features/feed/components/FeedCard'

export default function Jobs() {
  const jobs = useMemo(() => {
    return MOCK_CONTENT.filter(item => item.type === 'job')
  }, [])

  const ranked = rankContent(jobs, {
    userLocation: MOCK_USER.location,
    userInterests: MOCK_USER.interests,
  })

  return (
    <div className="max-w-2xl mx-auto py-4 px-3">
      <h1 className="text-2xl font-bold text-slate-100 mb-4">Jobs</h1>
      <div className="space-y-3">
        {ranked.length > 0 ? (
          ranked.map((item) => (
            <FeedCard key={item.id} content={item} />
          ))
        ) : (
          <p className="text-slate-400 text-center py-8">No jobs found</p>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// src/pages/Housing.jsx
// ============================================================================
import { useMemo } from 'react'
import { MOCK_CONTENT, MOCK_USER } from '@/services/mockData'
import { rankContent } from '@/services/algorithms/feedRanking'
import FeedCard from '@/features/feed/components/FeedCard'

export default function Housing() {
  const housing = useMemo(() => {
    return MOCK_CONTENT.filter(item => item.type === 'housing')
  }, [])

  const ranked = rankContent(housing, {
    userLocation: MOCK_USER.location,
    userInterests: MOCK_USER.interests,
  })

  return (
    <div className="max-w-2xl mx-auto py-4 px-3">
      <h1 className="text-2xl font-bold text-slate-100 mb-4">Housing</h1>
      <div className="space-y-3">
        {ranked.length > 0 ? (
          ranked.map((item) => (
            <FeedCard key={item.id} content={item} />
          ))
        ) : (
          <p className="text-slate-400 text-center py-8">No housing found</p>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// src/pages/Marketplace.jsx
// ============================================================================
import { useMemo } from 'react'
import { MOCK_CONTENT, MOCK_USER } from '@/services/mockData'
import { rankContent } from '@/services/algorithms/feedRanking'
import FeedCard from '@/features/feed/components/FeedCard'

export default function Marketplace() {
  const marketplace = useMemo(() => {
    return MOCK_CONTENT.filter(item => item.type === 'marketplace')
  }, [])

  const ranked = rankContent(marketplace, {
    userLocation: MOCK_USER.location,
    userInterests: MOCK_USER.interests,
  })

  return (
    <div className="max-w-2xl mx-auto py-4 px-3">
      <h1 className="text-2xl font-bold text-slate-100 mb-4">Marketplace</h1>
      <div className="space-y-3">
        {ranked.length > 0 ? (
          ranked.map((item) => (
            <FeedCard key={item.id} content={item} />
          ))
        ) : (
          <p className="text-slate-400 text-center py-8">No items found</p>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// src/pages/Community.jsx
// ============================================================================
import { useMemo } from 'react'
import { MOCK_CONTENT, MOCK_USER } from '@/services/mockData'
import { rankContent } from '@/services/algorithms/feedRanking'
import FeedCard from '@/features/feed/components/FeedCard'

export default function Community() {
  const community = useMemo(() => {
    return MOCK_CONTENT.filter(item => item.type === 'community_post')
  }, [])

  const ranked = rankContent(community, {
    userLocation: MOCK_USER.location,
    userInterests: MOCK_USER.interests,
  })

  return (
    <div className="max-w-2xl mx-auto py-4 px-3">
      <h1 className="text-2xl font-bold text-slate-100 mb-4">Community</h1>
      <div className="space-y-3">
        {ranked.length > 0 ? (
          ranked.map((item) => (
            <FeedCard key={item.id} content={item} />
          ))
        ) : (
          <p className="text-slate-400 text-center py-8">No posts found</p>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// src/pages/Search.jsx
// ============================================================================
import { useState, useMemo } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { MOCK_CONTENT } from '@/services/mockData'
import { useDebounce } from '@/shared/hooks/useDebounce'
import FeedCard from '@/features/feed/components/FeedCard'

export default function Search() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  const results = useMemo(() => {
    if (!debouncedQuery) return []
    return MOCK_CONTENT.filter(item =>
      item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
  }, [debouncedQuery])

  return (
    <div className="max-w-2xl mx-auto py-4 px-3">
      <div className="relative mb-4">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded border border-slate-600 bg-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
        />
      </div>

      <div className="space-y-3">
        {results.length > 0 ? (
          results.map((item) => (
            <FeedCard key={item.id} content={item} />
          ))
        ) : query ? (
          <p className="text-slate-400 text-center py-8">No results found</p>
        ) : (
          <p className="text-slate-400 text-center py-8">Type to search...</p>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// src/pages/Auth.jsx
// ============================================================================
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/store/authContext'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const { login, signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await signup(email, password, name)
      }
      navigate('/')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-lg border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm p-8">
        <h1 className="text-2xl font-bold text-slate-100 mb-6 text-center">
          {mode === 'login' ? 'Welcome Back' : 'Join MongolsUSA'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded border border-slate-600 bg-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded border border-slate-600 bg-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded border border-slate-600 bg-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-4 text-sm">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login')
            }}
            className="text-amber-400 hover:text-amber-300 font-medium"
          >
            {mode === 'login' ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}

// ============================================================================
// src/pages/NotFound.jsx
// ============================================================================
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-amber-400 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-slate-100 mb-4">Page Not Found</h2>
        <p className="text-slate-400 mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="px-6 py-2 rounded bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
