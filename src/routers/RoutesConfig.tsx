// /routers/RoutesConfig.tsx
import { Route, Routes } from "react-router-dom";
import Makeup from "../pages/category/Makeup"; // Makeup 페이지
import Skincare from "../pages/category/Skincare"; // Skincare 페이지
import New from "../pages/New";
import Best from "../pages/Best";
import Special from "../pages/Special";
import Brands from "../pages/Brands";
import MainPage from "../pages/MainPage";
import Clensing from "../pages/category/Clensing";
import Suncare from "../pages/category/Suncare";
import Haircare from "../pages/category/Haircare";

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/category/skincare" element={<Skincare />} />
    <Route path="/category/makeup" element={<Makeup />} />
    <Route path="/category/clensing" element={<Clensing />} />
    <Route path="/category/suncare" element={<Suncare />} />
    <Route path="/category/haircare" element={<Haircare />} />
    <Route path="/new" element={<New />} />
    <Route path="/best" element={<Best />} />
    <Route path="/special" element={<Special />} />
    <Route path="/brands" element={<Brands />} />
  </Routes>
);

export default RoutesConfig;
