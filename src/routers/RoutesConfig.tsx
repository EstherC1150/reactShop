// /routers/RoutesConfig.tsx
import { Route, Routes } from "react-router-dom";
import CategoryPage from "../pages/category/CategoryPage";
import New from "../pages/New";
import Best from "../pages/Best";
import Special from "../pages/Special";
import Brands from "../pages/Brands";
import MainPage from "../pages/MainPage";
import ItemDetail from "../pages/item/ItemDetail";

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/category/:categoryId" element={<CategoryPage />} />
    <Route path="/new" element={<New />} />
    <Route path="/best" element={<Best />} />
    <Route path="/special" element={<Special />} />
    <Route path="/brands" element={<Brands />} />
    <Route path="/item/:itemKey" element={<ItemDetail />} />
  </Routes>
);

export default RoutesConfig;
