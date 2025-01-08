import React from "react";
import "./style.css";
import moment from "moment";

const NewsItems = ({ item }) => {
  console.log(item);
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
            <span>
              {moment(item?.webPublicationDate).format("YYYY-MM-DD") ||
                moment(item?.publishedAt).format("YYYY-MM-DD")}
            </span>
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
