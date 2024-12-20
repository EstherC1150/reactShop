import { Button, MenuItem } from "@mui/material";
import Menu from "@mui/material/Menu";
import React from "react";
import { Link } from "react-router-dom";
import { useCategoryStore } from "../../store/categoryStore";

const CateMenu = () => {
  const { anchorEl, menuItems, setAnchorEl } = useCategoryStore(); // Zustand 상태 가져오기

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget); // 메뉴 열기
  };

  const handleClose = () => {
    setAnchorEl(null); // 메뉴 닫기
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        카테고리
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* Link로 라우팅 처리 */}
        {menuItems.map((item) => (
          <MenuItem key={item.path} onClick={handleClose}>
            <Link
              to={item.path}
              style={{ textDecoration: "none", color: "#111111" }}
            >
              {item.label}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CateMenu;
