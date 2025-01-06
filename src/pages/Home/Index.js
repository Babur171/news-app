import React, { useEffect, useState } from "react";
// import "./SearchPage.css"; // Import CSS for styling
import "./style.css";
import img1 from "../../assets/Dont-be-late-Myra.jpg";
import img2 from "../../assets/Manmohan-Singh.jpg";
import img3 from "../../assets/MBL4154.jpg";
import NewsItems from "../../components/NewsItem/index";
import { categoryList, dateList } from "../../utils";
import { useNewsQuery } from "../../api/useNewsQuery";
const dummyData = [
  {
    id: 1,
    heading:
      "Manmohan Singh, Architect of Modern India’s Economic Reforms and Former Prime Minister, Dies at 92",
    author: "John Doe",
    date: "2024-01-01",
    image: img1,
    description:
      "Manmohan Singh, India’s 13th Prime Minister and a pivotal figure in the country’s economic transformation, died in a New Delhi hospital on Dec. 26 of age-related medical conditions. He was 92. Singh served as Prime Minister from 2004 to 2014, leading…",
    source: "BBC",
    category: "World",
  },
  {
    id: 2,
    heading:
      "RASA Film Group Expands Partners, Details Robust Slate (EXCLUSIVE)",
    author: "Jane Smith",
    date: "2024-01-02",
    image: img2,
    description:
      "Manmohan Singh, India’s 13th Prime Minister and a pivotal figure in the country’s economic transformation, died in a New Delhi hospital on Dec. 26 of age-related medical conditions. He was 92. Singh served as Prime Minister from 2004 to 2014, leading…",
    source: "CNN",
    category: "Tech",
  },
  {
    id: 3,
    heading:
      "Beta Fiction, Spain’s No. 1 Independent Distributor in 2024, Sets New Films by ‘El 47’s’ Marcel Barrena and ‘House on Fire’s’ Dani de la Orden (EXCLUSIVE)",
    author: "Mark Taylor",
    date: "2024-01-03",
    image: img3,
    description:
      "Manmohan Singh, India’s 13th Prime Minister and a pivotal figure in the country’s economic transformation, died in a New Delhi hospital on Dec. 26 of age-related medical conditions. He was 92. Singh served as Prime Minister from 2004 to 2014, leading…",
    source: "ESPN",
    category: "Sports",
  },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(dummyData);
  const [selectedDate, setSelectedDate] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSource, setSelectedSource] = useState("All");

  const { getNews, newsData, isLoading } = useNewsQuery({
    searchText: "",
    filters: {},
  });

  useEffect(() => {
    getNews();
  }, []);

  console.log("newsDatanewsData", newsData);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = dummyData.filter((item) =>
      item.heading.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
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
    let filtered = dummyData.filter((item) => {
      return (
        (selectedDate === "All" || item.date.includes(selectedDate)) &&
        (selectedCategory.length === 0 ||
          selectedCategory.includes(item.category)) &&
        (selectedSource === "All" || item.source === selectedSource)
      );
    });
    setFilteredData(filtered);
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
            onChange={handleSearch}
            className="search-bar"
          />
          <button onClick={handleSearch}>Go</button>
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
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
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
