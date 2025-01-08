import React, { useCallback, useEffect, useState, CSSProperties } from "react";
import "./style.css";
import NewsItems from "../../components/NewsItem/index";
import { categoryList, getPreviousMonthDate, sourcesList } from "../../utils";
import { useNewsQuery } from "../../api/useNewsQuery";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import { debounce } from "lodash";
import { ClipLoader } from "react-spinners";

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

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

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
        News Results
      </h1>
      <div className="search-bar-container">
        <div className="main-sercbar">
          <input
            type="text"
            placeholder="Search News..."
            value={searchTerm}
            onChange={(e) => handleSearch(e)}
            className="search-bar "
          />
          <button onClick={() => submit()}>Go</button>
        </div>
      </div>

      <div className="content">
        {/* Left Side Filters */}
        <div className="filters">
          <h4 className="mt-0">Date Filter:</h4>

          <div className="date-filter-container">
            <div className="date-input-group">
              <div className="date-input">
                <label htmlFor="fromDate">From:</label>
                <DatePicker
                  selected={fromDate}
                  onChange={handleFromDateChange}
                  dateFormat="dd-MM-yyyy"
                  maxDate={new Date()}
                  className="form-control"
                  minDate={getPreviousMonthDate()} // Disable past dates
                />
              </div>

              <div className="date-input">
                <label htmlFor="toDate">To:</label>
                <DatePicker
                  selected={toDate}
                  onChange={handleToDateChange}
                  dateFormat="dd-MM-yyyy"
                  maxDate={new Date()}
                  className="form-control"
                  minDate={fromDate} // Disable dates before 'fromDate'
                />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="mt-3">Category:</h4>
            {categoryList.map((category, index) => (
              <div key={index} className="mt-1">
                <input
                  type="radio"
                  value={category}
                  checked={selectedCategory === category}
                  className="form-check-input"
                  onChange={() => handleCategoryChange(category)}
                  style={{ marginInline: 5 }}
                />
                <label className="form-check-label">{category}</label>
              </div>
            ))}
          </div>

          {/* Source Filter */}
          <div>
            <h4 className="mt-3">Source:</h4>
            {sourcesList.map((source, index) => (
              <div key={index} className="mt-1">
                <input
                  type="radio"
                  value={source}
                  checked={selectedSource === source}
                  className="form-check-input"
                  onChange={() => {
                    setSelectedSource(source);
                    handleFilterChange();
                  }}
                  style={{ marginInline: 5 }}
                />
                <label className="form-check-label">{source}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - News Column */}
        <div className="news-column">
          <div className="news-loader">
            <ClipLoader
              loading={isLoading}
              cssOverride={override}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>

          {newsData?.length > 0
            ? newsData?.map((item, index) => (
                <NewsItems item={item} key={index.toString()} />
              ))
            : !isLoading &&
              newsData?.length === 0 && (
                <strong className="news-loader">No results found.</strong>
              )}
        </div>
      </div>
    </div>
  );
};

export default Home;
