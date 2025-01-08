import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Item } from "../types/item.types";
import { getItemName } from "../apis/item";
import CategoryLayout from "../components/layout/CategoryLayout";
import ItemCard from "../components/item/ItemCard";
import EmptyResults from "../components/item/EmptyResults";
import { calculateDiscountRate } from "../utils/discount";
import useFilterStore from "../store/filterStore";

const SearchPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchParams] = useSearchParams();
  const { priceRange } = useFilterStore();

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (!keyword) return;

    getItemName(keyword)
      .then((itemData) => {
        const filteredItems = itemData.filter((item) => {
          const price = item.sale || item.price;
          return (
            (!priceRange.minCost || price >= priceRange.minCost) &&
            (!priceRange.maxCost || price <= priceRange.maxCost)
          );
        });

        console.log("검색 결과 (필터 적용):", filteredItems);
        setItems(filteredItems);
      })
      .catch((err) => {
        console.error("검색 오류:", err);
      });
  }, [searchParams, priceRange.minCost, priceRange.maxCost]);

  return (
    <CategoryLayout totalItems={items.length}>
      {items.length === 0 ? (
        <EmptyResults
          searchKeyword={searchParams.get("keyword") || ""}
          triggerSearch={true}
        />
      ) : (
        items.map((item) => (
          <ItemCard
            key={item.itemKey}
            itemKey={item.itemKey}
            imageUrl={`/image/testimg${item.categoryId}.jpg`}
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

export default SearchPage;
