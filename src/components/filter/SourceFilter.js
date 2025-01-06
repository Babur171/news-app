import React from "react";

const SourceFilter = ({ setSelectedSource }) => {
  return (
    <select onChange={(e) => setSelectedSource(e.target.value)}>
      <option value="">All Sources</option>
      <option value="BBC">BBC</option>
      <option value="CNN">CNN</option>
      <option value="Fox News">Fox News</option>
    </select>
  );
};

export default SourceFilter;
