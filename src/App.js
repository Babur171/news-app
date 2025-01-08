import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home/Index";

import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  console.log("processss", process.env);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <div className="app">
            <Home />
          </div>
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default App;
