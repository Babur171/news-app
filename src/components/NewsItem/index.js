import React from "react";
import "./style.css";
const NewsItems = ({ item }) => {
  return (
    <>
      <div className="news-card">
        {item?.urlToImage && (
          <img
            src={item?.urlToImage || item?.urlToImage}
            alt={item?.title || item?.webTitle}
          />
        )}
        <div className="news-content">
          <h4 className="newHeading">{item?.title || item?.webTitle}</h4>
          {item?.author && <span> {item?.author}</span>}

          <div className="news-meta">
            <span> {item?.webPublicationDate || item?.publishedAt}</span>
            {/* <span> {item.source}</span> */}
          </div>
          <p className="descriptionNews">{item.description}</p>
          {/* <p> {item.source}</p> */}
        </div>
      </div>
    </>
  );
};

export default NewsItems;
