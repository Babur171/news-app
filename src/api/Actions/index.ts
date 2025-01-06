import api, {
  guardianInstance,
  newsAPIInstance,
  openNewsInstance,
} from "../Config/index";

// export const getSingleCourtsApi = async (id: number, userId: number) => {
//   try {
//     const userCourt = `/get-specific-court/${id}/?user_id=${userId}&filter=512`;
//     const guestCourt = `/get-specific-court/${id}/?filter=512`;
//     const response = api.get(userId ? userCourt : guestCourt);
//     return (await response).data;
//   } catch (error) {
//     throw error;
//   }
// };

export const fetchArticles = async (query) => {
  try {
    const [newsAPI, openNews, guardian] = await Promise.all([
      api.get(newsAPIInstance, `/everything?q=${query}`),
      api.get(openNewsInstance, `/articles?q=${query}`),
      api.get(guardianInstance, `/search?q=${query}`),
    ]);

    // Combining the results from different APIs
    return [
      ...newsAPI.data?.articles,
      ...openNews.data?.articles,
      ...guardian.data?.response.results,
    ];
  } catch (error) {
    return [];
  }
};
