import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home/Index";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <Home />
        </div>
      </QueryClientProvider>
    </>
  );
};

export default App;
