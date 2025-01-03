export const calculateDiscountRate = (
  originalPrice: number,
  discountedPrice: number
): number => {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

//   // 할인율 계산
//   const calDiscountRate = (
//     originalPrice: number,
//     discountedPrice: number
//   ): number => {
//     if (originalPrice <= 0) return 0;
//     const discountRate =
//       ((originalPrice - discountedPrice) / originalPrice) * 100;
//     return Math.round(discountRate);
//   };
