import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "../../components/item/ItemCard";
import useFilterStore from "../../store/filterStore";
import useSearchStore from "../../store/searchStore";
import { Item } from "../../types/item.types";
import { getItems } from "../../apis/item";
import { calculateDiscountRate } from "../../utils/discount";
import CategoryLayout from "../../components/layout/CategoryLayout";
import EmptyResults from "../../components/item/EmptyResults";

// 카테고리 내에 api 숫자 매핑만 다른데 굳이 카테고리별로 페이지를 만들어서... 해서 다시 수정!

const categoryName = {
  skincare: 1,
  makeup: 2,
  clensing: 3,
  suncare: 4,
  haircare: 5,
};

const CategoryPage = () => {
  const { categoryId } = useParams(); // URL에서 categoryId 가져오기
  const [items, setItems] = useState<Item[]>([]);
  const { priceRange, categories } = useFilterStore();
  const { searchKeyword, triggerSearch } = useSearchStore();

  const selectedCategories = useMemo(
    () =>
      categories.filter((option) => option.checked).map((option) => option.id),
    [categories]
  );

  useEffect(() => {
    if (!triggerSearch && searchKeyword) return; // 검색 트리거가 false면 API 호출 안함

    getItems(
      Number(categoryName[categoryId as keyof typeof categoryName]),
      priceRange.minCost,
      priceRange.maxCost,
      triggerSearch ? searchKeyword : ""
    ).then((data) => {
      setItems(data);
    });
  }, [
    categoryId,
    priceRange.minCost,
    priceRange.maxCost,
    selectedCategories,
    triggerSearch,
  ]);

  // 카테고리별 이미지 매핑
  const categoryImages: { [key: number]: string } = {
    1: "/image/testimg.jpg",
    2: "/image/testimg2.jpg",
    3: "/image/testimg3.jpeg",
    4: "/image/testimg4.jpg",
    5: "/image/testimg5.jpg",
  };

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
            imageUrl={
              categoryImages[
                Number(categoryName[categoryId as keyof typeof categoryName])
              ]
            }
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

export default CategoryPage;
