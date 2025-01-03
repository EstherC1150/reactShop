import { useEffect, useMemo, useState } from "react";
import ItemCard from "../../components/item/ItemCard";
import useFilterStore from "../../store/filterStore";
import { getItems } from "../../apis/item";
import { Item } from "../../types/item.types";
import { calculateDiscountRate } from "../../utils/discount";
import CategoryLayout from "../../components/layout/CategoryLayout";

const Makeup = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { priceRange, categories } = useFilterStore();

  const selectedCategories = useMemo(
    () =>
      categories.filter((option) => option.checked).map((option) => option.id),
    [categories]
  );

  useEffect(() => {
    const categoryFilter = selectedCategories.length
      ? `&categories=${selectedCategories.join(",")}`
      : "";

    getItems(2, priceRange.minCost, priceRange.maxCost).then((data) => {
      setItems(data);
      console.log(data);
    });
  }, [priceRange.minCost, priceRange.maxCost, selectedCategories]);

  if (!items.length) {
    return <div>Loading...</div>;
  }

  return (
    <CategoryLayout totalItems={items.length}>
      {items.map((item) => (
        <ItemCard
          itemKey={item.itemKey}
          imageUrl="/image/testimg2.jpg"
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

export default Makeup;
