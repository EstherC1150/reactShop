import { create } from "zustand";

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

interface FilterState {
  priceRange: {
    minCost: number;
    maxCost: number;
    selectedPriceRange: string;
    options: FilterOption[];
  };

  categories: FilterOption[];
  brands: FilterOption[];

  setPriceRange: (selectedPriceRange: string) => void;
  setCategories: (categories: FilterOption[]) => void;
  setBrands: (brands: FilterOption[]) => void;

  resetFilters: () => void;
  updateCategorySelection: (optionIndex: number) => void;
  updateBrandSelection: (optionIndex: number) => void;
}

const useFilterStore = create<FilterState>((set) => ({
  priceRange: {
    minCost: 0,
    maxCost: 0,
    selectedPriceRange: "",
    options: [
      { id: "price1", label: "1만원 이하", checked: false },
      { id: "price2", label: "1만원 ~ 3만원", checked: false },
      { id: "price3", label: "3만원 이상", checked: false },
    ],
  },

  categories: [
    { id: "category1", label: "카테고리1", checked: false },
    { id: "category2", label: "카테고리2", checked: false },
    { id: "category3", label: "카테고리3", checked: false },
  ],

  brands: [
    { id: "brand1", label: "브랜드1", checked: false },
    { id: "brand2", label: "브랜드2", checked: false },
    { id: "brand3", label: "브랜드3", checked: false },
  ],

  setPriceRange: (selectedPriceRange) => {
    let minCost = 0;
    let maxCost = 0;

    // 선택된 가격대에 맞춰 minCost와 maxCost 설정
    if (selectedPriceRange === "price1") {
      maxCost = 10000;
      minCost = 0;
    } else if (selectedPriceRange === "price2") {
      minCost = 10000;
      maxCost = 30000;
    } else if (selectedPriceRange === "price3") {
      minCost = 30000;
      maxCost = 0;
    }

    set((state) => ({
      priceRange: {
        ...state.priceRange, // 기존 상태 복사
        minCost, // minCost 업데이트
        maxCost, // maxCost 업데이트
        selectedPriceRange, // 선택된 가격대 업데이트
      },
    }));
  },

  setCategories: (categories) => set({ categories }),

  setBrands: (brands) => set({ brands }),

  resetFilters: () =>
    set({
      priceRange: {
        minCost: 0,
        maxCost: 0,
        selectedPriceRange: "",
        options: [
          { id: "price1", label: "1만원 이하", checked: false },
          { id: "price2", label: "1만원 ~ 3만원", checked: false },
          { id: "price3", label: "3만원 이상", checked: false },
        ], // options는 그대로 유지
      },
      categories: [
        { id: "category1", label: "카테고리1", checked: false },
        { id: "category2", label: "카테고리2", checked: false },
        { id: "category3", label: "카테고리3", checked: false },
      ],
      brands: [
        { id: "brand1", label: "브랜드1", checked: false },
        { id: "brand2", label: "브랜드2", checked: false },
        { id: "brand3", label: "브랜드3", checked: false },
      ],
    }),

  updateCategorySelection: (optionIndex) =>
    set((state) => ({
      categories: state.categories.map((option, idx) => ({
        ...option,
        checked: idx === optionIndex ? !option.checked : option.checked,
      })),
    })),

  updateBrandSelection: (optionIndex) =>
    set((state) => ({
      brands: state.brands.map((option, idx) => ({
        ...option,
        checked: idx === optionIndex ? !option.checked : option.checked,
      })),
    })),
}));

export default useFilterStore;
