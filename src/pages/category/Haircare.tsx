import { useEffect, useMemo, useState } from "react";
import ItemCard from "../../components/item/ItemCard";
import useFilterStore from "../../store/filterStore";
import { Item } from "../../types/item.types";
import { getItems } from "../../apis/item";
import { calculateDiscountRate } from "../../utils/discount";
import CategoryLayout from "../../components/layout/CategoryLayout";
import useSearchStore from "../../store/searchStore";

const Haircare = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { priceRange, categories } = useFilterStore();
  const { searchKeyword } = useSearchStore();
  const selectedCategories = useMemo(
    () =>
      categories.filter((option) => option.checked).map((option) => option.id),
    [categories]
  );

  useEffect(() => {
    const categoryFilter = selectedCategories.length
      ? `&categories=${selectedCategories.join(",")}`
      : "";

    getItems(5, priceRange.minCost, priceRange.maxCost, searchKeyword).then(
      (data) => {
        setItems(data);
        console.log(data);
      }
    );
  }, [
    priceRange.minCost,
    priceRange.maxCost,
    selectedCategories,
    searchKeyword,
  ]);

  if (!items.length) {
    return <div>Loading...</div>;
  }

  return (
    <CategoryLayout totalItems={items.length}>
      {items.map((item) => (
        <ItemCard
          itemKey={item.itemKey}
          imageUrl="/image/testimg5.jpg"
          name={item.name}
          description={item.content || "설명이 없습니다."}
          originalPrice={item.price}
          discountedPrice={item.sale}
          discountRate={calculateDiscountRate(item.price, item.sale)}
        />
      ))}
    </CategoryLayout>
  );
};

export default Haircare;
