import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  styled,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import useFilterStore from "../../store/filterStore";
import { useLocation } from "react-router-dom";

// 스타일링된 컴포넌트
const SidebarContainer = styled(Paper)(({ theme }: { theme: Theme }) => ({
  width: "220px",
  height: "100vh",
  position: "sticky",
  top: 0,
  padding: theme.spacing(3),
  borderRadius: 0,
  boxShadow: "none",
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const SectionTitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  fontSize: "15px",
  color: "rgb(66, 66, 66)",
}));

const FilterSidebar = () => {
  const {
    categories,
    priceRange,
    brands,
    setCategories,
    setPriceRange,
    setBrands,
    resetFilters,
  } = useFilterStore();

  const [hasSelectedFilters, setHasSelectedFilters] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const hasSelection =
      categories.some((option) => option.checked) ||
      brands.some((option) => option.checked) ||
      priceRange.selectedPriceRange !== "";

    setHasSelectedFilters(hasSelection);
  }, [categories, priceRange, brands]);

  useEffect(() => {
    console.log("location은 바아로오?", location);

    resetFilters();
  }, [location]);

  // 필터 변경 핸들러
  const handleCategoryChange = (optionIndex: number) => {
    const updatedCategories = categories.map((option, idx) => ({
      ...option,
      checked: idx === optionIndex ? !option.checked : option.checked,
    }));
    setCategories(updatedCategories);
  };

  const handleBrandChange = (optionIndex: number) => {
    const updatedBrands = brands.map((option, idx) => ({
      ...option,
      checked: idx === optionIndex ? !option.checked : option.checked,
    }));
    setBrands(updatedBrands);
  };

  const handlePriceRangeChange = (selectedPriceRange: string) => {
    setPriceRange(selectedPriceRange);
  };

  return (
    <SidebarContainer>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: "15px", fontWeight: 500, color: "rgb(66, 66, 66)" }}
        >
          필터
        </Typography>
        <Box
          display={"flex"}
          alignItems={"start"}
          sx={{
            color: hasSelectedFilters
              ? "rgb(66, 66, 66)"
              : "rgba(66, 66, 66, 0.5)",
            cursor: hasSelectedFilters ? "pointer" : "not-allowed",
            pointerEvents: hasSelectedFilters ? "auto" : "none",
          }}
          onClick={resetFilters}
        >
          <Typography sx={{ fontSize: "14px" }}>초기화</Typography>
          <RefreshOutlinedIcon sx={{ fontSize: "18px" }} />
        </Box>
      </Box>

      {/* 카테고리 필터 */}
      <Box sx={{ mb: 3 }}>
        <SectionTitle variant="subtitle1">카테고리</SectionTitle>
        <FormGroup>
          {categories.map((option, optionIndex) => (
            <FormControlLabel
              key={option.id}
              control={
                <Checkbox
                  checked={option.checked}
                  onChange={() => handleCategoryChange(optionIndex)}
                  size="small"
                />
              }
              label={option.label}
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "14px",
                  color: "rgb(66, 66, 66)",
                },
              }}
            />
          ))}
        </FormGroup>
      </Box>

      {/* 가격대 필터 */}
      <Box sx={{ mb: 3 }}>
        <SectionTitle variant="subtitle1">가격대</SectionTitle>
        <RadioGroup>
          {priceRange.options.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.id}
              control={
                <Radio
                  checked={priceRange.selectedPriceRange === option.id} // 가격대 선택에 따라 checked 상태 업데이트
                  onChange={() => handlePriceRangeChange(option.id)}
                  size="small"
                />
              }
              label={option.label}
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "14px",
                  color: "rgb(66, 66, 66)",
                },
              }}
            />
          ))}
        </RadioGroup>
      </Box>

      {/* 브랜드 필터 */}
      <Box sx={{ mb: 3 }}>
        <SectionTitle variant="subtitle1">브랜드</SectionTitle>
        <FormGroup>
          {brands.map((option, optionIndex) => (
            <FormControlLabel
              key={option.id}
              control={
                <Checkbox
                  checked={option.checked}
                  onChange={() => handleBrandChange(optionIndex)}
                  size="small"
                />
              }
              label={option.label}
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "14px",
                  color: "rgb(66, 66, 66)",
                },
              }}
            />
          ))}
        </FormGroup>
      </Box>
    </SidebarContainer>
  );
};

export default FilterSidebar;
