import { create } from "zustand";

// NavItem 타입 정의
interface NavItem {
  path: string;
  label: string;
}

// Zustand 상태 관리 훅 정의
interface NavStore {
  navItems: NavItem[];
  setNavItems: (items: NavItem[]) => void;
}

// Zustand store 생성
export const useNavStore = create<NavStore>(
  (set: (fn: (state: NavStore) => NavStore) => void) => ({
    navItems: [
      { path: "/new", label: "신상품" },
      { path: "/best", label: "베스트" },
      { path: "/special", label: "특가/혜택" },
      { path: "/brands", label: "브랜드관" },
    ],
    setNavItems: (items: NavItem[]) =>
      set((state) => ({ ...state, navItems: items })),
  })
);
