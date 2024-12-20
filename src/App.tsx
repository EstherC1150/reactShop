import { BrowserRouter } from "react-router-dom";
import Header from "./components/common/Header";
import Nav from "./components/common/Nav";
import RoutesConfig from "./routers/RoutesConfig";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Nav />
        <RoutesConfig />
      </BrowserRouter>
    </div>
  );
}

export default App;
