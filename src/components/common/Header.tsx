import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        ></IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ReactShop
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid",
            borderRadius: "4px",
            padding: "0 8px",
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
