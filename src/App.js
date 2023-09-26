import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { HomePage } from "./components/home/HomePage";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomePage} exact />
          <Route path="/products" Component={HomePage} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
