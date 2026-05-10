import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

// Providers
import { queryClient } from '@/services/api/queryClient';
import { AuthProvider, useAuth } from '@/features/auth/store/authContext';

// Hooks
import { useSystemTheme } from '@/shared/hooks/useSystemTheme';
import { useLocationInit } from '@/shared/hooks/useLocationInit';

// Layouts
import AppLayout from '@/layout/AppLayout';

// Pages
import Home from '@/pages/Home';
import Jobs from '@/pages/Jobs';
import Housing from '@/pages/Housing';
import Marketplace from '@/pages/Marketplace';
import Community from '@/pages/Community';
import Messaging from '@/pages/Messaging';
import Profile from '@/pages/Profile';
import Search from '@/pages/Search';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';

// Detail pages
import ContentDetail from '@/pages/ContentDetail';
import EditContent from '@/pages/EditContent';
import CreateContent from '@/pages/CreateContent';

// Toast notifications
import { Toaster } from '@/shared/components/ui/Toaster';

/**
 * Main app shell with authentication check
 */
const AppShell = () => {
  useSystemTheme();
  useLocationInit();

  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Auth pages */}
      <Route path="/auth" element={<Auth />} />

      {/* App pages */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/housing" element={<Housing />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/community" element={<Community />} />
        <Route path="/messaging" element={<Messaging />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/search" element={<Search />} />

        {/* Content management */}
        <Route path="/create" element={<CreateContent />} />
        <Route path="/content/:contentId" element={<ContentDetail />} />
        <Route path="/content/:contentId/edit" element={<EditContent />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

/**
 * Main App component with all providers
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppShell />
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
