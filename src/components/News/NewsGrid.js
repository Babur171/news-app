import React, { useEffect } from "react";
import NewsItems from "../NewsItem/NewsItems";
import "./NewsGrid.css";
import { useNewsQuery } from "../../api/useNewsQuery";
import Index from "../../pages/search/Index";

const NewsGrid = ({ items }) => {
  const { getNews, getNextNews, hasNextPageNews, newsData } = useNewsQuery({
    searchText: "",
    filters: { language: "en" },
  });
  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
      <div className="d-flex align-items-center gap-5 mb-3">
      </div>

      <div className="news-grid">
        {items.map((item, index) => (
          <NewsItems key={index} item={item} />
        ))}
      </div>
    </>
  );
};

export default NewsGrid;
