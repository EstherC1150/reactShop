import { AppBar, Box, InputBase, Toolbar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none", // 밑줄 제거
              color: "inherit", // 텍스트와 아이콘 색상 유지
            }}
          >
            <ShoppingBasketOutlinedIcon
              sx={{
                fontSize: 30, // 아이콘 크기
                marginRight: 0.5, // 아이콘과 텍스트 간격
              }}
              aria-label="menu"
            />
            <Typography
              variant="h6"
              sx={{
                display: "inline", // 텍스트 길이에 맞게 영역 제한
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
            border: "1px solid",
            borderRadius: "4px",
            padding: "0 8px",
            marginLeft: "auto",
          }}
        >
          <InputBase
            placeholder="뷰티 상품을 검색하세요"
            inputProps={{ "aria-label": "search" }}
            sx={{ flexGrow: 1 }}
          />
          <SearchIcon color="action" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
