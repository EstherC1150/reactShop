import { BrowserRouter } from "react-router-dom";
import Header from "./components/common/Header";
import Nav from "./components/common/Nav";
import RoutesConfig from "./routers/RoutesConfig";
import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Nav />
        <RoutesConfig />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
