import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import CateMenu from "./CateMenu";
import { useNavStore } from "../../store/navStore";

const Nav = () => {
  const { navItems } = useNavStore(); //상태 가져오기

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        backgroundColor: "#F5F5F5",
        py: 1,
      }}
    >
      {/* 카테고리메뉴 */}
      <CateMenu />

      {/* 네브 메뉴들 */}
      {navItems.map((item) => (
        <Box key={item.path} sx={{ mx: 2 }}>
          <Link
            to={item.path}
            style={{ textDecoration: "none", color: "#111111" }}
          >
            {item.label}
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default Nav;
