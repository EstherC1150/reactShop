import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ItemCard from "../../components/item/ItemCard";

const Skincare = () => {
  const [items, setItems] = useState<any>([]);

  // 할인율 계산
  const calDiscountRate = (
    originalPrice: number,
    discountedPrice: number
  ): number => {
    if (originalPrice <= 0) return 0;
    const discountRate =
      ((originalPrice - discountedPrice) / originalPrice) * 100;
    return Math.round(discountRate);
  };

  useEffect(() => {
    fetch("http://192.168.0.2:3000/api/v1/item/1")
      .then((response) => {
        // console.log("resddd", response.json());
        return response.json();
      })
      .then((data) => {
        setItems(data);
        console.log(data);
      });
  }, []);

  if (!items.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        sx={{ padding: 2 }}
      >
        {items.map((item) => (
          <ItemCard
            key={item.itemKey} // 고유 키 값
            imageUrl="/image/testimg.jpg"
            title={item.name} // 상품명
            description={item.content || "설명이 없습니다."} // 설명 (없으면 기본값 제공)
            originalPrice={item.price} // 원래 가격
            discountedPrice={item.sale} // 할인 가격
            discountRate={calDiscountRate(item.price, item.sale)} // 할인율
          />
        ))}
      </Box>
    </>
  );
};

export default Skincare;
