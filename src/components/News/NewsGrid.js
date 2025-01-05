import React from "react";
import NewsItems from "../NewsItem/NewsItems";
import { Row, Col } from "react-bootstrap";  // Import Row and Col from react-bootstrap
import "./NewsGrid.css";
import DateFilter from '../filter/DateFilter';
import Source from "../filter/Source";

const NewsGrid = ({ items }) => {
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
