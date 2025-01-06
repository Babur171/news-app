import React from "react";

const DateFilter = ({ setSelectedDate }) => {
  return (
    <select onChange={(e) => setSelectedDate(e.target.value)}>
      <option value="All">All Dates</option>
      <option value="Past 24 Hours">Past 24 Hours</option>
      <option value="Past 7 Days">Past 7 Days</option>
      <option value="Past 30 Days">Past 30 Days</option>
    </select>
  );
};

export default DateFilter;
