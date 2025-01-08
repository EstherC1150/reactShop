import { BrowserRouter } from "react-router-dom";
import Header from "./components/common/Header";
import Nav from "./components/common/Nav";
import RoutesConfig from "./routers/RoutesConfig";
import { ThemeProvider } from "@mui/material";
import "./App.css";
import theme from "./theme";

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
