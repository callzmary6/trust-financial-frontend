
import { create } from 'zustand';

//Defining the shape of the store
interface NavState {
  activeSideNav: string;
  setActiveSideNav: (value: string) => void;
  gridView: boolean;
  setGridView: () => void;
}

// Create the store
const useNavStore = create<NavState>((set) => ({
  activeSideNav: "dashboard",
  gridView: false,


  setActiveSideNav: (value: string) => set(() => ({ activeSideNav: value })),
  setGridView: () => set((state) => ({gridView: !state.gridView})),
}));

export default useNavStore;