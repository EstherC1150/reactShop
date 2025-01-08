import { create } from "zustand";

interface SearchStore {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  triggerSearch: boolean;
  setTriggerSearch: (trigger: boolean) => void;
  initSearch: () => void;
}

const useSearchStore = create<SearchStore>((set) => ({
  searchKeyword: "",
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
  triggerSearch: false,
  setTriggerSearch: (trigger) => set({ triggerSearch: trigger }),
  initSearch: () => set({ searchKeyword: "", triggerSearch: false }),
}));

export default useSearchStore;
