import React, { useState, useEffect } from "react";
import Menu from "./components/Menu/Menu";
import NewsGrid from "./components/News/NewsGrid";
import "./App.css";
const App = () => {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(1);
  const [category, setCategory] = useState("general");
  const apiKey = "6f1dc3d58418487a8d9ea0a45ae963be";
  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.articles);
        return setItems(data.articles);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [category]);

  return (
    <>
      <div className="app">
        <h1 style={{ textAlign: "center", marginBottom: "5%" }}>
          See The Latest News
        </h1>
        <Menu active={active} setActive={setActive} setCategory={setCategory} />
        <NewsGrid items={items} />
      </div>
    </>
  );
};

export default App;
