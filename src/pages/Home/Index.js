import React, {  useCallback, useEffect, useState } from "react";
import "./style.css";
import NewsItems from "../../components/NewsItem/index";
import { categoryList, getPreviousMonthDate, sourcesList } from "../../utils";
import { useNewsQuery } from "../../api/useNewsQuery";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import { debounce } from "lodash";


const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const { getNews, newsData, isLoading } = useNewsQuery({
    searchText: searchTerm,
    filters: {
      from: moment(fromDate).format("YYYY-MM-DD"),
      to: moment(toDate).format("YYYY-MM-DD"),
      category: selectedCategory.toLocaleLowerCase(),
      sources:
        selectedSource === "all"
          ? ""
          : selectedSource.includes(" ")
          ? selectedSource.toLowerCase().replace(/\s+/g, "-")
          : selectedSource.toLowerCase(),
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

  const submit = () => {
    getNews();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSource("");
    setTimeout(() => {
      getNews();
    }, 500);
  };

  const handleFilterChange = () => {
    setSelectedCategory("");
    setTimeout(() => {
      getNews();
    }, 500);
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
    if (toDate && date > toDate) {
      setFromDate(null);
    }
  };

  const handleToDateChange = (date) => {
    setToDate(date);
    if (fromDate && date < fromDate) {
      setToDate(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (fromDate && toDate && fromDate <= toDate) {
        getNews();
      }
    };

    fetchData();
  }, [fromDate, toDate]);

  console.log("toDatetoDatetoDate", toDate);

  return (
    <div className="search-page">
      <h1
        style={{
          fontSize: "54px",
          lineHeight: "54px",
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
        <h4 className="headingStyle">Date Filter</h4>

          <div className="date-filter-container">
            <div className="date-input-group">
              <div className="date-input">
                <label htmlFor="fromDate">From:</label>
                <DatePicker
                  selected={fromDate}
                  onChange={handleFromDateChange}
                  dateFormat="dd-MM-yyyy"
                  minDate={getPreviousMonthDate()} // Disable past dates
                />
              </div>

              <div className="date-input">
                <label htmlFor="toDate">To:</label>
                <DatePicker
                  selected={toDate}
                  onChange={handleToDateChange}
                  dateFormat="dd-MM-yyyy"
                  minDate={fromDate} // Disable dates before 'fromDate'
                />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="headingStyle">Category</h4>
            {categoryList.map((category, index) => (
              <label key={index} className="d-block">
                <input
                  type="radio"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => {
                    handleCategoryChange(category);
                  }}
                  style={{ marginInline: 5 }}
                />
                {category}
              </label>
            ))}
          </div>

          {/* Source Filter */}
          <div>
            <h4 className="headingStyle">Source</h4>
            {sourcesList.map((source, index) => (
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
            newsData.map((item, index) => (
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
