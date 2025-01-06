export const getDateRange = (filter) => {
  const currentDate = new Date();
  switch (filter) {
    case "24h":
      return {
        from: new Date(
          currentDate.getTime() - 24 * 60 * 60 * 1000
        ).toISOString(),
        to: currentDate.toISOString(),
      };
    case "7d":
      return {
        from: new Date(
          currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
        to: currentDate.toISOString(),
      };
    case "30d":
      return {
        from: new Date(
          currentDate.getTime() - 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        to: currentDate.toISOString(),
      };
    case "12m":
      return {
        from: new Date(
          currentDate.setFullYear(currentDate.getFullYear() - 1)
        ).toISOString(),
        to: new Date().toISOString(),
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
