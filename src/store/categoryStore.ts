import { create } from "zustand";

// 메뉴 항목 타입 정의
interface MenuItem {
  path: string;
  label: string;
}

// Zustand 상태 관리 훅 정의
interface CategoryStore {
  anchorEl: null | HTMLElement;
  menuItems: MenuItem[];
  setAnchorEl: (anchorEl: null | HTMLElement) => void;
  setMenuItems: (items: MenuItem[]) => void;
}

// Zustand store 생성
export const useCategoryStore = create<CategoryStore>((set) => ({
  anchorEl: null,
  menuItems: [
    { path: "/category/skincare", label: "스킨케어" },
    { path: "/category/makeup", label: "메이크업" },
    { path: "/category/clensing", label: "클렌징" },
    { path: "/category/suncare", label: "선케어" },
    { path: "/category/haircare", label: "헤어케어" },
  ],
  setAnchorEl: (anchorEl) => set({ anchorEl }),
  setMenuItems: (items) => set({ menuItems: items }),
}));
