export const getPreviousMonthDate = () => {
  const today = new Date();
  const previousMonth = new Date(today);
  previousMonth.setMonth(today.getMonth() - 1);

  const previousMonthFormatted =new  Date(previousMonth.toISOString().split('T')[0]);

  return previousMonthFormatted;
};

export const getDateRange = (fromDate, toDate) => {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return fromDate && toDate
    ? { from: formatDate(new Date(fromDate)), to: formatDate(new Date(toDate)) }
    : null; // Return null if no dates are selected
};

export const categoryList = [
  "Technology",
  "Entertainment",
  "Science",
  "Health",
  "Sports",
  "Business",
];
export const sourcesList = ["BBC News", "CBC News", "CNN", "ESPN"];
