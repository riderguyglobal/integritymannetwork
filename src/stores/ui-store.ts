import { create } from "zustand";

// ═══════════════════════════════════════════════════════
// UI STORE — global UI state
// ═══════════════════════════════════════════════════════

interface UIState {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isLoading: boolean;

  setMobileMenu: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setSearchOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isLoading: false,

  setMobileMenu: (open) => set({ isMobileMenuOpen: open }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
