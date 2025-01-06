import { useEffect, useMemo, useState } from "react";
import ItemCard from "../../components/item/ItemCard";
import useFilterStore from "../../store/filterStore";
import { Item } from "../../types/item.types";
import { getItems } from "../../apis/item";
import { calculateDiscountRate } from "../../utils/discount";
import CategoryLayout from "../../components/layout/CategoryLayout";
import useSearchStore from "../../store/searchStore";
import EmptyResults from "../../components/item/EmptyResults";

const Skincare = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { priceRange, categories } = useFilterStore();
  const { searchKeyword, triggerSearch } = useSearchStore();

  // 선택된 카테고리 가져오기
  const selectedCategories = useMemo(
    () =>
      categories.filter((option) => option.checked).map((option) => option.id),
    [categories]
  );

  useEffect(() => {
    // 카테고리 필터 추가
    const categoryFilter = selectedCategories.length
      ? `&categories=${selectedCategories.join(",")}`
      : "";

    getItems(
      1,
      priceRange.minCost,
      priceRange.maxCost,
      triggerSearch ? searchKeyword : ""
    ).then((data) => {
      setItems(data);
      console.log(data);
    });
  }, [
    priceRange.minCost,
    priceRange.maxCost,
    selectedCategories,
    triggerSearch,
  ]);

  return (
    <CategoryLayout totalItems={items.length}>
      {items.length === 0 ? (
        <EmptyResults
          triggerSearch={triggerSearch}
          searchKeyword={searchKeyword}
        />
      ) : (
        items.map((item) => (
          <ItemCard
            key={item.itemKey}
            itemKey={item.itemKey}
            imageUrl="/image/testimg.jpg"
            name={item.name}
            description={item.content || "설명이 없습니다."}
            originalPrice={item.price}
            discountedPrice={item.sale}
            discountRate={calculateDiscountRate(item.price, item.sale)}
          />
        ))
      )}
    </CategoryLayout>
  );
};

export default Skincare;
