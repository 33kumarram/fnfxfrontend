import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { HomePage } from "./components/home/HomePage";
import { ProductsPage } from "./components/productspage/productspage";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomePage} exact />
          <Route path="/products/:category" Component={ProductsPage} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
