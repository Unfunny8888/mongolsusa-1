// ============================================================================
// src/shared/utils/cn.js
// ============================================================================
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge tailwind classNames intelligently
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ============================================================================
// src/shared/utils/formatting.js
// ============================================================================

/**
 * Format price for display
 */
export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatTime(date) {
  const now = new Date();
  const past = new Date(date);
  const diff = now - past;

  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;

  if (diff < minute) return 'Just now';
  if (diff < hour) return `${Math.floor(diff / minute)}m ago`;
  if (diff < day) return `${Math.floor(diff / hour)}h ago`;
  if (diff < week) return `${Math.floor(diff / day)}d ago`;
  if (diff < month) return `${Math.floor(diff / week)}w ago`;
  
  return past.toLocaleDateString();
}

/**
 * Format large numbers (e.g., 1.2K, 3.5M)
 */
export function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text, length = 100) {
  return text.length > length ? text.slice(0, length) + '...' : text;
}

/**
 * Format full name from first/last
 */
export function formatName(first, last) {
  return `${first} ${last}`.trim();
}

// ============================================================================
// src/shared/components/ui/Button.jsx
// ============================================================================
import { cn } from '@/shared/utils/cn';

const buttonVariants = {
  primary: 'bg-amber-500 hover:bg-amber-600 text-white',
  secondary: 'bg-slate-700 hover:bg-slate-600 text-white',
  ghost: 'hover:bg-slate-800/50 text-slate-300',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  success: 'bg-emerald-600 hover:bg-emerald-700 text-white',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  ...props
}) {
  return (
    <button
      className={cn(
        'rounded transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed',
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
}

// ============================================================================
// src/shared/components/ui/Badge.jsx
// ============================================================================

const badgeVariants = {
  primary: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  secondary: 'bg-slate-700/50 text-slate-300 border border-slate-600/50',
  success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
  warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
};

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export default function Badge({
  variant = 'primary',
  size = 'md',
  className,
  children,
}) {
  return (
    <span
      className={cn(
        'font-medium rounded-full',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

// ============================================================================
// src/shared/components/ui/Card.jsx
// ============================================================================

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-lg border border-slate-700/50',
        'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
        'p-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return (
    <div className={cn('border-b border-slate-700/50 pb-3 mb-3', className)}>
      {children}
    </div>
  );
}

export function CardBody({ className, children }) {
  return <div className={cn('', className)}>{children}</div>;
}

export function CardFooter({ className, children }) {
  return (
    <div className={cn('border-t border-slate-700/50 pt-3 mt-3', className)}>
      {children}
    </div>
  );
}

// ============================================================================
// src/shared/components/ui/Input.jsx
// ============================================================================

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'w-full px-3 py-2 rounded border border-slate-600',
        'bg-slate-800 text-slate-100 placeholder-slate-500',
        'focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50',
        'transition-colors',
        className
      )}
      {...props}
    />
  );
}

// ============================================================================
// src/shared/components/ui/Spinner.jsx
// ============================================================================

export default function Spinner({ size = 'md', className }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div
      className={cn(
        'border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin',
        sizeClasses[size],
        className
      )}
    />
  );
}

// ============================================================================
// src/shared/hooks/useDebounce.js
// ============================================================================
import { useEffect, useState } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ============================================================================
// src/shared/hooks/useSystemTheme.js
// ============================================================================
import { useEffect } from 'react';
import { useTheme } from '@/store/appStore';

export function useSystemTheme() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Check system preference
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = theme || (isDark ? 'dark' : 'light');
    setTheme(initialTheme);

    // Apply theme to document
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, [theme, setTheme]);
}

// ============================================================================
// src/shared/hooks/useLocationInit.js
// ============================================================================
import { useEffect } from 'react';
import { useUserLocation } from '@/store/appStore';
import { useToast } from '@/store/appStore';

export function useLocationInit() {
  const { setUserLocation, setLocationDetermined } = useUserLocation();
  const { info } = useToast();

  useEffect(() => {
    const getLocation = async () => {
      if (!navigator.geolocation) {
        setLocationDetermined(true);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocode to get city/state (use a service like Google Geocoding)
          // For now, just store coordinates
          setUserLocation({
            coordinates: [latitude, longitude],
            city: 'Detecting...', // Will be determined by reverse geocoding
            state: '',
            accuracy: position.coords.accuracy,
            lastUpdated: new Date().toISOString(),
          });

          setLocationDetermined(true);
        },
        (error) => {
          // Silently fail - not critical
          setLocationDetermined(true);
        },
        {
          timeout: 10000,
          enableHighAccuracy: false,
        }
      );
    };

    getLocation();
  }, [setUserLocation, setLocationDetermined]);
}

// ============================================================================
// src/shared/hooks/useInfiniteScroll.js
// ============================================================================
import { useEffect, useRef, useCallback } from 'react';

export function useInfiniteScroll(callback, options = {}) {
  const { threshold = 0.1, enabled = true } = options;
  const observerTarget = useRef(null);

  const handleIntersection = useCallback(
    (entries) => {
      if (entries[0].isIntersecting && enabled) {
        callback?.();
      }
    },
    [callback, enabled]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [handleIntersection, threshold]);

  return observerTarget;
}

// ============================================================================
// src/pages/Home.jsx
// ============================================================================
import { useEffect } from 'react';
import FeedContainer from '@/features/feed/components/FeedContainer';
import { useAppStore } from '@/store/appStore';

export default function Home() {
  const { setBottomNavVisible } = useAppStore();

  useEffect(() => {
    setBottomNavVisible(true);
  }, [setBottomNavVisible]);

  return (
    <div className="py-4 px-3">
      <h1 className="text-2xl font-bold text-slate-100 mb-4">Home Feed</h1>
      <FeedContainer />
    </div>
  );
}

// ============================================================================
// src/pages/Search.jsx
// ============================================================================
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search as SearchIcon } from 'lucide-react';
import { contentApi } from '@/services/api/contentApi';
import { useDebounce } from '@/shared/hooks/useDebounce';
import Input from '@/shared/components/ui/Input';
import FeedCard from '@/features/feed/components/FeedCard';

export default function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () =>
      debouncedQuery
        ? contentApi.search(debouncedQuery)
        : Promise.resolve({ items: [] }),
    enabled: debouncedQuery.length > 2,
  });

  return (
    <div className="py-4 px-3">
      <div className="relative mb-4">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <Input
          placeholder="Search jobs, housing, marketplace..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading && <p className="text-slate-400">Searching...</p>}

      {data?.items?.length > 0 ? (
        <div className="space-y-3">
          {data.items.map((item) => (
            <FeedCard key={item.id} content={item} />
          ))}
        </div>
      ) : query && !isLoading ? (
        <p className="text-center text-slate-400 py-8">No results found</p>
      ) : (
        <p className="text-center text-slate-500 py-8">
          Type to search...
        </p>
      )}
    </div>
  );
}

// ============================================================================
// src/pages/Auth.jsx
// ============================================================================
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/store/authContext';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(email, password, name);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-lg border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm p-8">
        <h1 className="text-2xl font-bold text-slate-100 mb-6 text-center">
          {mode === 'login' ? 'Welcome Back' : 'Join MongolsUSA'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <Input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Sign Up'}
          </Button>
        </form>

        <p className="text-center text-slate-400 mt-4 text-sm">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError('');
            }}
            className="text-amber-400 hover:text-amber-300 font-medium"
          >
            {mode === 'login' ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// src/pages/NotFound.jsx
// ============================================================================
import { Link } from 'react-router-dom';
import Button from '@/shared/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-amber-400 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-slate-100 mb-4">
          Page Not Found
        </h2>
        <p className="text-slate-400 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}

// ============================================================================
// src/index.css
// ============================================================================
/*
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-slate-900 text-slate-100;
  }

  html {
    scroll-behavior: smooth;
  }
}

@layer components {
  .card {
    @apply rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-sm;
  }

  .btn {
    @apply px-4 py-2 rounded font-medium transition-colors;
  }

  .input-field {
    @apply w-full px-3 py-2 rounded border border-slate-600 bg-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-colors;
  }
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
*/
