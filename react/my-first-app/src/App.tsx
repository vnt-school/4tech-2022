import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Main from "./Main";

function App() {
  return (
    <div className="App">
      <header>
        Cabeçalho
      </header>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Main />
            }
          >
            <Route index element={<Home />} />
            <Route
              path="products"
              element={
                <div>
                  <h1>Products</h1>
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <footer>
        Rodapé
      </footer>
    </div>
  );
}

export default App;
