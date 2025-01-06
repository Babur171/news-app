import React, { useState } from "react";

const CategoryFilter = ({ onCategoryChange }) => {
  const categories = ["All", "World", "Tech", "Sports"];
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((item) => item !== category));
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
    onCategoryChange(category);
  };

  return (
    <div>
      <h4>Category</h4>
      {categories.map((category, index) => (
        <label key={index} className="d-block">
          <input
            type="checkbox"
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={() => handleCheckboxChange(category)}
          />
          {category}
        </label>
      ))}
    </div>
  );
};

export default CategoryFilter;
