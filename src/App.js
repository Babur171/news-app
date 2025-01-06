import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home/Index";
import SinglePage from "./components/singlepage/SinglePage";
import NewsItems from "./components/NewsItem";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          {/* <Home /> */}
          {/* <SinglePage/> */}
          <NewsItems/>
        </div>
      </QueryClientProvider>
    </>
  );
};

export default App;
