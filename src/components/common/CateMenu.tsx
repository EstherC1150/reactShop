import { Button, MenuItem } from "@mui/material";
import Menu from "@mui/material/Menu";
import React from "react";
import { useCategoryStore } from "../../store/categoryStore";
import { useNavigate } from "react-router-dom";

const CateMenu = () => {
  const { anchorEl, menuItems, setAnchorEl } = useCategoryStore(); // Zustand 상태 가져오기
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget); // 메뉴 열기
  };

  const handleClose = () => {
    setAnchorEl(null); // 메뉴 닫기
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleClose();
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disableRipple // 리플 효과 제거
        sx={{
          display: "flex",
          alignItems: "center", // 수직 중앙 정렬
          padding: "6px 16px", // 기본 padding 조정
          lineHeight: "normal", // line-height를 기본 값으로 설정
          marginTop: "6.5px",
          color: "#6e6e6e",
          fontWeight: "bold",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent !important", // hover 시 배경색 강제로 투명하게
            color: "#ff6600",
          },
        }}
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
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            onClick={() => handleMenuItemClick(item.path)}
            style={{
              textDecoration: "none",
              color: "rgb(52, 52, 52)",
              fontWeight: 500,
              fontSize: "14px",
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CateMenu;
