import React, { useEffect } from "react";
import NewsItems from "../NewsItem/NewsItems";
import "./NewsGrid.css";
import DateFilter from "../filter/DateFilter";
import Source from "../filter/Source";
import { useNewsQuery } from "../../api/useNewsQuery";

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
        <DateFilter />
        <Source />
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
