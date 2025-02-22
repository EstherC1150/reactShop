import { Item } from "../types/item.types";

export const getItems = async (
  categoryId: number,
  minPrice: number,
  maxPrice: number,
  name: string
): Promise<Item[]> => {
  const response = await fetch(
    `http://192.168.0.2:3000/api/v1/items/${categoryId}?${
      minPrice ? `minPrice=${minPrice}` : ""
    }&${maxPrice ? `maxPrice=${maxPrice}` : ""}&${name ? `name=${name}` : ""}`
  );
  return response.json();
};

export const getItemName = async (name: string): Promise<Item[]> => {
  try {
    console.log("검색어:", name);
    const url = `http://192.168.0.2:3000/api/v1/item/search?name=${name}`;
    console.log("요청 URL:", url);

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("API Error Response:", errorData);
      throw new Error(`API 호출 실패: ${errorData}`);
    }

    const data = await response.json();
    console.log("검색 결과 데이터:", {
      총개수: data.length,
      아이템목록: data,
      요청URL: url,
    });
    return data;
  } catch (error) {
    console.error("API 오류 상세:", error);
    throw error;
  }
};

export const getItemDetail = async (itemKey: number): Promise<Item> => {
  const response = await fetch(
    `http://192.168.0.2:3000/api/v1/item/${itemKey}`
  );
  const data = await response.json();
  // console.log("API 응답:", data);

  if (!data) {
    throw new Error("데이터가 없습니다");
  }

  let imageUrl = "/image/testimg.jpg";

  switch (data[0].categoryKey) {
    case 1:
      imageUrl = "/image/testimg.jpg";
      break;

    case 2:
      imageUrl = "/image/testimg2.jpg";
      break;

    case 3:
      imageUrl = "/image/testimg3.jpeg";
      break;

    case 4:
      imageUrl = "/image/testimg4.jpg";
      break;

    case 5:
      imageUrl = "/image/testimg5.jpg";
      break;
  }

  return {
    itemKey: data[0].itemKey,
    name: data[0].name,
    content: data[0].content,
    price: data[0].price,
    sale: data[0].sale,
    categoryId: data[0].categoryKey,
    imageUrl: imageUrl,
  };
};
