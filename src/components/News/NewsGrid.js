import React from "react";
import NewsItems from "../NewsItem/NewsItems";
import "./NewsGrid.css";
// import DateFilter from '../filter/DateFilter';
// import Source from "../filter/SourceFilter";

const NewsGrid = ({ items }) => {
  return (
    <>  
    

      <div className="news-grid">
        {items.map((item, index) => (
          <NewsItems key={index} item={item} />
        ))}
      </div>
    </>
  );
};

export default NewsGrid;
