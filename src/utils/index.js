import moment from "moment";

export const getPreviousMonthDate = () => {
  const today = new Date();
  const previousMonth = new Date(today);
  previousMonth.setMonth(today.getMonth() - 1);
  const previousMonthFormatted = new Date(
    previousMonth.toISOString().split("T")[0]
  );
  return previousMonthFormatted;
};

export const convertDate = (dateString) => {
  // Parse the date string using moment and format it
  return moment(dateString, "YYYY-MM-DD").format("YYYYMMDD");
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
