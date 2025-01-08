import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: "GmarketSans", // 기본 폰트 설정
    fontWeightLight: 300,
    fontWeightRegular: 500,
    fontWeightBold: 700,
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: "GmarketSans",
        },
      },
    },
  },
});

export default theme;
