import React from "react";
import "./style.css";
const NewsItems = ({ item }) => {
  console.log(item)
  return (
    <>
      <div key={item.id} className="news-card">
        <img src={item.image} alt={item.heading} />
        <div className="news-content">
          <h4 className="newHeading">{item.heading}</h4>
          <span> {item.author}</span>

          <div className="news-meta">
            <span> {item.date}</span>
            <span> {item.source}</span>
          </div>
          <p className="descriptionNews">{item.description}</p>
          {/* <p> {item.source}</p> */}
        </div>
      </div>
    </>
  );
};

export default NewsItems;
