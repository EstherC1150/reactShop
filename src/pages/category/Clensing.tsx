import { useEffect, useMemo, useState } from "react";
import ItemCard from "../../components/item/ItemCard";
import useFilterStore from "../../store/filterStore";
import { Item } from "../../types/item.types";
import { getItems } from "../../apis/item";
import { calculateDiscountRate } from "../../utils/discount";
import CategoryLayout from "../../components/layout/CategoryLayout";
import useSearchStore from "../../store/searchStore";
import EmptyResults from "../../components/item/EmptyResults";

const Clensing = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { priceRange, categories } = useFilterStore();
  const { searchKeyword, triggerSearch } = useSearchStore();

  const selectedCategories = useMemo(
    () =>
      categories.filter((option) => option.checked).map((option) => option.id),
    [categories]
  );

  useEffect(() => {
    const categoryFilter = selectedCategories.length
      ? `&categories=${selectedCategories.join(",")}`
      : "";

    getItems(
      3,
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
            itemKey={item.itemKey}
            imageUrl="/image/testimg3.jpeg"
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

export default Clensing;
