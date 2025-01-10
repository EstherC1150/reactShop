import { useState } from "react";
import { Box, InputBase, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useLocation, useNavigate } from "react-router-dom";
import useSearchStore from "../../store/searchStore";

const SearchBar = () => {
  const [localSearchKeyword, setLocalSearchKeyword] = useState("");
  const { setSearchKeyword, setTriggerSearch, initSearch } = useSearchStore();
  const navigate = useNavigate();
  const location = useLocation();

  // 입력값 변경
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchKeyword(e.target.value);
  };

  // 검색 버튼 클릭
  const handleSearchClick = () => {
    if (localSearchKeyword.trim()) {
      setSearchKeyword(localSearchKeyword);
      setTriggerSearch(true);

      if (location.pathname.startsWith("/category")) {
        const currentParams = new URLSearchParams(location.search);
        currentParams.set("keyword", localSearchKeyword);
        navigate(`${location.pathname}?${currentParams.toString()}`);
      } else {
        navigate(`/search?keyword=${encodeURIComponent(localSearchKeyword)}`);
      }
    }
  };

  // 검색어 초기화
  const handleClearClick = () => {
    setLocalSearchKeyword("");
    initSearch();
  };

  return (
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
  );
};

export default SearchBar;
