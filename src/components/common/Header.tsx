import {
  AppBar,
  Box,
  InputBase,
  Toolbar,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import useSearchStore from "../../store/searchStore";
import { useEffect, useState } from "react";

const Header = () => {
  const [localSearchKeyword, setLocalSearchKeyword] = useState("");
  const { setSearchKeyword, setTriggerSearch } = useSearchStore();
  const navigate = useNavigate();
  const location = useLocation(); // 리액트 방식으로 현재 URL 가져오기

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchKeyword(e.target.value);
  };
  const handleSearchClick = () => {
    if (localSearchKeyword.trim()) {
      setSearchKeyword(localSearchKeyword);
      setTriggerSearch(true);

      // 현재 경로가 /category로 시작하는지 확인
      if (location.pathname.startsWith("/category")) {
        // 카테고리 페이지 내에서 검색 - 현재 URL 유지하고 검색어만 추가
        const currentParams = new URLSearchParams(location.search);
        currentParams.set("keyword", localSearchKeyword);
        navigate(`${location.pathname}?${currentParams.toString()}`);
      } else {
        // 메인 페이지나 다른 페이지에서 검색 - 전체 검색 페이지로 이동
        navigate(`/search?keyword=${encodeURIComponent(localSearchKeyword)}`);
      }
    }
  };

  const handleClearClick = () => {
    setLocalSearchKeyword("");
    setSearchKeyword("");
    setTriggerSearch(false);
  };

  const resetSearch = () => {
    setLocalSearchKeyword("");
    setSearchKeyword("");
    setTriggerSearch(false);
  };

  const handleLogoClick = () => {
    resetSearch();
  };

  useEffect(() => {
    setLocalSearchKeyword("");
  }, [location]);

  return (
    <AppBar position="static" sx={{ boxShadow: "none" }}>
      <Toolbar sx={{ backgroundColor: "#ffffff" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            onClick={handleLogoClick}
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <ShoppingBasketOutlinedIcon
              sx={{
                fontSize: 30,
                marginRight: 0.5,
                color: "#161616",
              }}
              aria-label="menu"
            />
            <Typography
              variant="h6"
              sx={{
                display: "inline",
                color: "#161616",
                fontWeight: "600",
              }}
            >
              ReactShop
            </Typography>
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #e0e0e0",
            borderRadius: "4px",
            padding: "0 8px",
            marginLeft: "auto",
          }}
        >
          <InputBase
            placeholder="뷰티 상품을 검색하세요"
            value={localSearchKeyword}
            onChange={handleSearch}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchClick();
              }
            }}
            inputProps={{ "aria-label": "search" }}
            sx={{ flexGrow: 1 }}
            endAdornment={
              localSearchKeyword && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleClearClick}
                    sx={{ padding: "2px" }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }
          />
          <SearchIcon
            color="action"
            sx={{ cursor: "pointer", ml: 1 }}
            onClick={handleSearchClick}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
