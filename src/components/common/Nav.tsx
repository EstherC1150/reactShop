import React from "react";
import { Box } from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CateMenu from "./CateMenu";
import { useNavStore } from "../../store/navStore";

const Nav = () => {
  const { navItems } = useNavStore(); // 상태 가져오기

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        py: 1,
      }}
    >
      {/* 카테고리메뉴 */}
      <CateMenu />

      {/* 네브 메뉴들 */}
      {navItems.map((item) => (
        <Box key={item.path} sx={{ mx: 2 }}>
          <MuiLink
            component={RouterLink}
            to={item.path}
            style={{
              textDecoration: "none",
              color: "rgb(52, 52, 52)",
            }}
          >
            {item.label}
          </MuiLink>
        </Box>
      ))}
    </Box>
  );
};

export default Nav;
