import React from "react";
import "./NewsItems.css";
const NewsItems = ({ item }) => {
  if (!item || !item.urlToImage) {
    return null; // If no image, return nothing
  }
  const websiteUrl = item.url;
  const website = websiteUrl.split("https://").pop().split("/")[0];
  const date = item.publishedAt;
   const formattedDate = date.replace("T", " ").replace("Z", "");

  return (
    <>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="article"
      >
        <div className="article-image">
          <img src={item.urlToImage} alt={item.title} />
        </div>

        <div className="article-content">
          <div className="article-source">
            <img
              src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${website}&size=16`}
              alt={item.source.id}
            />
            <span style={{ color: "#000" }}>{item.source.name}</span>
          </div>

          <div className="article-title">
            <h2 className="title">{item.title}</h2>
          </div>

          <p className="article-description">{item.description}</p>

          <div className="article-details">
            <small className="details">
              <b>Published At:</b> {formattedDate}
            </small>
          </div>
        </div>
      </a>
    </>
  );
};

export default NewsItems;
