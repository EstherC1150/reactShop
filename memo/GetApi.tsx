const GetApi = () => {
  // const { filterSections } = useFilterStore();
  // const curCost = filterSections[1].options.filter(
  //   (option) => option.checked
  // )[0];
  //   let minCost = 0;
  //   let maxCost = 0;
  //   if (curCost) {
  //     if (curCost.id === "price1") {
  //       maxCost = 10000;
  //       minCost = 0;
  //     } else if (curCost.id === "price2") {
  //       minCost = 10000;
  //       maxCost = 30000;
  //     } else {
  //       minCost = 30000;
  //       maxCost = 0;
  //     }
  //   }
  //   fetch(
  //     `http://192.168.0.2:3000/api/v1/item/1?${
  //       minCost && `minPrice=${minCost}`
  //     }&${maxCost && `maxPrice=${maxCost}`}`
  //   )
  //     .then((response) => {
  //       // console.log("resddd", response.json());
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setItems(data);
  //       console.log(data);
  //     });
  // }, [curCost]);
};

export default GetApi;
