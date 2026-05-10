import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useSystemTheme } from '@/shared/hooks/useSystemTheme'
import { queryClient } from '@/services/api/queryClient'

// Layouts
import AppLayout from '@/layout/AppLayout'

// Pages
import Home from '@/pages/Home'
import Auth from '@/pages/Auth'
import NotFound from '@/pages/NotFound'
import Jobs from '@/pages/Jobs'
import Housing from '@/pages/Housing'
import Marketplace from '@/pages/Marketplace'
import Community from '@/pages/Community'
import Search from '@/pages/Search'

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
        <AppContent />
      </Router>
    </QueryClientProvider>
  )
}
