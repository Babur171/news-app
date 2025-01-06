import React, { useState, useEffect } from "react";
import Menu from "./components/Menu/Menu";
import NewsGrid from "./components/News/NewsGrid";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import Index from "./pages/search/Index";
import Index from './pages/search/Index'
import SinglePage from "./components/singlepage/SinglePage";
// import SearchPage from "./pages/search/Index";

const App = () => {
  const queryClient = new QueryClient();
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(1);
  const [category, setCategory] = useState("general");

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <h1 style={{ textAlign: "center", marginBottom: "5%" }}>
            See The Latest News
          </h1>
          <Menu
            active={active}
            setActive={setActive}
            setCategory={setCategory}
          />
          <NewsGrid items={items} />
        </div>
      </QueryClientProvider>
    </>
  );
};

export default App;
