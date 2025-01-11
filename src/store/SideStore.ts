// useStore.ts
import {create} from 'zustand';

interface StoreState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const useSideStore = create<StoreState>((set) => ({
  isSidebarOpen: false, // Initial state of the sidebar
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

export default useSideStore;