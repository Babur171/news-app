import React from "react";
import NewsItems from "../NewsItem/NewsItems";
import "./NewsGrid.css";
const NewsGrid = ({ items }) => {
  // if (!items || items.length === 0) {
  //   return <p>No news available</p>; // Optionally display a message when no items are available
  // }

  return (
    <div className="news-grid">
      {items.map((item, index) => (
        <NewsItems key={index} item={item} />
      ))}
    </div>
  );
};
export default NewsGrid;
