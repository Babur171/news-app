import React, { useCallback, useEffect, useState } from "react";
// import "./SearchPage.css"; // Import CSS for styling
import "./style.css";
import NewsItems from "../../components/NewsItem/index";
import { categoryList, dateList, getDateRange } from "../../utils";
import { useNewsQuery } from "../../api/useNewsQuery";
import { debounce } from "lodash";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");

  const { getNews, newsData, isLoading } = useNewsQuery({
    searchText: searchTerm,
    filters: {
      from: selectedDate === "all" ? "" : getDateRange(selectedDate)?.from,
      to: selectedDate === "all" ? "" : getDateRange(selectedDate)?.to,
      category: selectedCategory === "all" ? "" : selectedCategory,
      sources: selectedSource === "all" ? "" : selectedSource,
    },
  });

  useEffect(() => {
    getNews();
  }, []);

  const fetchSearchResults = useCallback(
    debounce(async (searchTerm) => {
      getNews(searchTerm);
    }, 500),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchSearchResults(value);
  };

  const submit = (e) => {
    getNews();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(
      (prevCategories) =>
        prevCategories.includes(category)
          ? prevCategories.filter((c) => c !== category) // Remove if already selected
          : [...prevCategories, category] // Add if not selected
    );
  };

  const handleFilterChange = () => {
    getNews();
    // let filtered = dummyData.filter((item) => {
    //   return (
    //     (selectedDate === "All" || item.date.includes(selectedDate)) &&
    //     (selectedCategory.length === 0 ||
    //       selectedCategory.includes(item.category)) &&
    //     (selectedSource === "All" || item.source === selectedSource)
    //   );
    // });
    // setFilteredData(filtered);
  };

  return (
    <div className="search-page">
      <h1
        style={{
          fontSize: "54px",
          lineHeight: "54px", // Adjusted for better readability
          color: "black",
          fontWeight: 700,
          paddingBottom: "5%",
        }}
      >
        Search Results
      </h1>
      <div className="search-bar-container">
        <div className="main-sercbar">
          <input
            type="text"
            placeholder="Search News..."
            value={searchTerm}
            onChange={(e) => handleSearch(e)}
            className="search-bar"
          />
          <button onClick={() => submit()}>Go</button>
        </div>
      </div>

      <div className="content">
        {/* Left Side Filters */}
        <div className="filters">
          {/* Date Filter */}
          <div>
            <h4 className="hedingStyle">Date Filter</h4>
            {dateList.map((date, index) => (
              <label key={index} className="d-block">
                <input
                  type="radio"
                  value={date.value}
                  checked={selectedDate === date.value}
                  onChange={() => {
                    setSelectedDate(date?.value);
                    handleFilterChange();
                  }}
                  style={{ marginInline: 5 }}
                />

                {date?.label}
              </label>
            ))}
          </div>

          {/* Category Filter */}
          {/* Category Filter */}
          <div>
            <h4 className="hedingStyle">Category</h4>
            {categoryList.map((category, index) => (
              <label key={index} className="d-block">
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategory.includes(category)}
                  onChange={() => {
                    handleCategoryChange(category);
                    handleFilterChange();
                  }}
                  style={{ marginInline: 5 }}
                />
                {category}
              </label>
            ))}
          </div>

          {/* Source Filter */}
          <div>
            <h4 className="hedingStyle">Source</h4>
            {["All", "BBC", "CNN", "ESPN"].map((source, index) => (
              <label key={index} className="d-block">
                <input
                  type="radio"
                  value={source}
                  checked={selectedSource === source}
                  onChange={() => {
                    setSelectedSource(source);
                    handleFilterChange();
                  }}
                  style={{ marginInline: 5 }}
                />

                {source}
              </label>
            ))}
          </div>
        </div>

        {/* Right Side - News Column */}
        <div className="news-column">
          {newsData?.length > 0 ? (
            newsData?.map((item, index) => (
              <NewsItems item={item} key={index.toString()} />
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
