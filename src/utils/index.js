export const getDateRange = (filter) => {
  console.log("filterfilterfilterfilterfilterfilter", filter);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const currentDate = new Date();

  switch (filter) {
    case "24h":
      return {
        from: formatDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000)),
        to: formatDate(currentDate),
      };
    case "7d":
      return {
        from: formatDate(
          new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000)
        ),
        to: formatDate(currentDate),
      };
    case "30d":
      return {
        from: formatDate(
          new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000)
        ),
        to: formatDate(currentDate),
      };
    case "12m":
      return {
        from: formatDate(
          new Date(currentDate.setFullYear(currentDate.getFullYear() - 1))
        ),
        to: formatDate(new Date()),
      };
    default:
      return null; // "All" selected
  }
};

export const dateList = [
  { value: "all", label: "All" },
  { value: "24h", label: "Past 24 Hours" },
  { value: "7d", label: "Past 7 Days" },
  { value: "30d", label: "Past 30 Days" },
  { value: "12m", label: "Past 12 Months" },
];

export const categoryList = [
  "Technology",
  "Entertainment",
  "Science",
  "Health",
  "Sports",
  "Business",
];
