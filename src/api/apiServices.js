import { guardianInstance, newsAPIInstance, openNewsInstance } from "./config";

export const fetchArticles = async ({ query = "", filters = {} }) => {
  try {
    const apiKeys = {
      newsAPI: "6f1dc3d58418487a8d9ea0a45ae963be" || "",
      openNews: "d7bf5c4c-f6ac-4248-8d78-5de8af178963" || "",
      guardian: "d7bf5c4c-f6ac-4248-8d78-5de8af178963" || "",
    };

    if (!apiKeys.newsAPI || !apiKeys.openNews || !apiKeys.guardian) {
      throw new Error("Missing API keys in environment variables.");
    }

    // Helper function to build query string from filters
    const buildQueryParams = (params) => {
      return Object.entries(params)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");
    };

    // Combine query with filters for each API
    const newsAPIParams = buildQueryParams({
      q: query,
      ...filters,
      pageSize: 10, // Specify page size or fetch limit
      apiKey: apiKeys.newsAPI, // Add NewsAPI key
    });

    const openNewsParams = buildQueryParams({
      q: query,
      ...filters,
      apiKey: apiKeys.openNews, // Add OpenNews key
    });

    const guardianParams = buildQueryParams({
      q: query,
      ...filters,
      "api-key": apiKeys.guardian, // Add Guardian API key (uses "api-key" key format)
    });

    // Concurrently fetch articles from all APIs
    const [newsAPI, guardian] = await Promise.all([
      newsAPIInstance.get(`/everything?${newsAPIParams}`),
      guardianInstance.get(`/search?${guardianParams}`),
      // openNewsInstance.get(`/articles?${openNewsParams}`),
    ]);
    console.log("guardianguardian", guardian);

    // Combine and return the results
    return [
      ...(newsAPI.data?.articles || []),
      ...(guardian.data?.response?.results || []),
      // ...(openNews.data?.articles || []),
    ];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};
