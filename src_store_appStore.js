// src/store/appStore.js
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import produce from 'immer';

/**
 * Global app state: theme, UI, location, filters
 */
export const useAppStore = create(
  devtools(
    persist(
      (set, get) => ({
        // ===== THEME =====
        theme: 'dark',
        setTheme: (theme) => set({ theme }),

        // ===== LOCATION =====
        userLocation: null,
        setUserLocation: (location) => set({ userLocation: location }),
        isLocationDetermined: false,
        setLocationDetermined: (determined) =>
          set({ isLocationDetermined: determined }),

        // ===== UI STATE =====
        sidebarOpen: false,
        toggleSidebar: () =>
          set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setSidebarOpen: (open) => set({ sidebarOpen: open }),

        bottomNavVisible: true,
        setBottomNavVisible: (visible) =>
          set({ bottomNavVisible: visible }),

        // ===== FILTERS =====
        activeFilters: {},
        setActiveFilters: (filters) => set({ activeFilters: filters }),
        clearActiveFilters: () => set({ activeFilters: {} }),

        // ===== SEARCH =====
        searchQuery: '',
        setSearchQuery: (query) => set({ searchQuery: query }),
        searchHistory: [],
        addSearchHistory: (query) =>
          set((state) =>
            produce(state, (draft) => {
              if (!draft.searchHistory.includes(query)) {
                draft.searchHistory.unshift(query);
                draft.searchHistory = draft.searchHistory.slice(0, 10);
              }
            })
          ),
        clearSearchHistory: () => set({ searchHistory: [] }),

        // ===== NOTIFICATIONS =====
        notificationCount: 0,
        setNotificationCount: (count) => set({ notificationCount: count }),
        messageCount: 0,
        setMessageCount: (count) => set({ messageCount: count }),

        // ===== MODALS =====
        openModals: {},
        openModal: (modalId) =>
          set((state) =>
            produce(state, (draft) => {
              draft.openModals[modalId] = true;
            })
          ),
        closeModal: (modalId) =>
          set((state) =>
            produce(state, (draft) => {
              draft.openModals[modalId] = false;
            })
          ),
        toggleModal: (modalId) =>
          set((state) =>
            produce(state, (draft) => {
              draft.openModals[modalId] = !draft.openModals[modalId];
            })
          ),

        // ===== RECENT VIEWS =====
        recentViewedIds: [],
        addRecentViewed: (id) =>
          set((state) =>
            produce(state, (draft) => {
              draft.recentViewedIds = [
                id,
                ...draft.recentViewedIds.filter((vid) => vid !== id),
              ].slice(0, 20);
            })
          ),

        // ===== DRAFTS =====
        drafts: {},
        saveDraft: (draftId, data) =>
          set((state) =>
            produce(state, (draft) => {
              draft.drafts[draftId] = data;
            })
          ),
        getDraft: (draftId) => get().drafts[draftId],
        clearDraft: (draftId) =>
          set((state) =>
            produce(state, (draft) => {
              delete draft.drafts[draftId];
            })
          ),
      }),
      {
        name: 'app-store',
        partialize: (state) => ({
          theme: state.theme,
          searchHistory: state.searchHistory,
          userLocation: state.userLocation,
          drafts: state.drafts,
        }),
      }
    )
  )
);

// Derived hooks
export const useTheme = () => {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);
  return { theme, setTheme };
};

export const useUserLocation = () => ({
  userLocation: useAppStore((state) => state.userLocation),
  setUserLocation: useAppStore((state) => state.setUserLocation),
  isLocationDetermined: useAppStore((state) => state.isLocationDetermined),
  setLocationDetermined: useAppStore((state) => state.setLocationDetermined),
});

export const useSidebar = () => ({
  sidebarOpen: useAppStore((state) => state.sidebarOpen),
  toggleSidebar: useAppStore((state) => state.toggleSidebar),
  setSidebarOpen: useAppStore((state) => state.setSidebarOpen),
});

export const useModals = () => ({
  openModals: useAppStore((state) => state.openModals),
  openModal: useAppStore((state) => state.openModal),
  closeModal: useAppStore((state) => state.closeModal),
  toggleModal: useAppStore((state) => state.toggleModal),
});

// ============================================================================

/**
 * Notification/Toast store
 */
export const useNotificationStore = create(
  devtools((set) => ({
    toasts: [],
    addToast: (message, type = 'info', duration = 3000) =>
      set((state) =>
        produce(state, (draft) => {
          const id = Math.random().toString(36).substr(2, 9);
          draft.toasts.push({ id, message, type, duration });

          // Auto-remove after duration
          if (duration) {
            setTimeout(() => {
              set((state) =>
                produce(state, (draft) => {
                  draft.toasts = draft.toasts.filter((t) => t.id !== id);
                })
              );
            }, duration);
          }
        })
      ),

    removeToast: (id) =>
      set((state) =>
        produce(state, (draft) => {
          draft.toasts = draft.toasts.filter((t) => t.id !== id);
        })
      ),

    clearToasts: () => set({ toasts: [] }),
  }))
);

// Hook
export const useToast = () => {
  const addToast = useNotificationStore((state) => state.addToast);
  const removeToast = useNotificationStore((state) => state.removeToast);

  return {
    success: (message) => addToast(message, 'success'),
    error: (message) => addToast(message, 'error'),
    warning: (message) => addToast(message, 'warning'),
    info: (message) => addToast(message, 'info'),
    remove: removeToast,
  };
};

// ============================================================================

/**
 * Saved items store (bookmarks, favorites, etc.)
 */
export const useSavedStore = create(
  devtools(
    persist(
      (set, get) => ({
        savedIds: new Set(),
        likedIds: new Set(),

        toggleSaved: (id) =>
          set((state) =>
            produce(state, (draft) => {
              if (draft.savedIds.has(id)) {
                draft.savedIds.delete(id);
              } else {
                draft.savedIds.add(id);
              }
            })
          ),

        toggleLiked: (id) =>
          set((state) =>
            produce(state, (draft) => {
              if (draft.likedIds.has(id)) {
                draft.likedIds.delete(id);
              } else {
                draft.likedIds.add(id);
              }
            })
          ),

        isSaved: (id) => get().savedIds.has(id),
        isLiked: (id) => get().likedIds.has(id),
      }),
      {
        name: 'saved-store',
      }
    )
  )
);

// Hooks
export const useSaveItem = () => {
  const toggleSaved = useSavedStore((state) => state.toggleSaved);
  const isSaved = useSavedStore((state) => state.isSaved);

  return { toggleSaved, isSaved };
};

export const useLikeItem = () => {
  const toggleLiked = useSavedStore((state) => state.toggleLiked);
  const isLiked = useSavedStore((state) => state.isLiked);

  return { toggleLiked, isLiked };
};
