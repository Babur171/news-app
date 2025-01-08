import React from "react";
import "./style.css";
import NotFound from "../../assets/notFound.jpg";
import moment from "moment";

const NewsItems = ({ item }) => {
  return (
    <>
      <div className="news-card">
        <img
          src={item?.urlToImage || item?.urlToImage || NotFound}
          alt={item?.title || item?.webTitle}
        />

        <div className="news-content">
          <h4 className="newHeading">
            {item?.title || item?.webTitle || item?.headline?.main}
          </h4>
          {item?.author ||
            (item?.byline && (
              <span> {item?.author || item?.byline?.original}</span>
            ))}

          <div className="news-meta">
            <span>
              {moment(item?.webPublicationDate).format("YYYY-MM-DD") ||
                moment(item?.publishedAt).format("YYYY-MM-DD") ||
                moment(item?.pub_date).format("YYYY-MM-DD")}
            </span>
            {/* <span> {item.source}</span> */}
          </div>
          <p className="descriptionNews">
            {item.description || item?.lead_paragraph}
          </p>
          {/* <p> {item.source}</p> */}
        </div>
      </div>
    </>
  );
};

export default NewsItems;
