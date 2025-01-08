import { guardianInstance, newsAPIInstance } from "./config";

export const fetchArticles = async ({ query = "", filters = {} }) => {
  try {
    const apiKeys = {
      newsAPI: process.env.REACT_APP_NEWSAPI_KEY || "",
      openNews: process.env.REACT_APP_NEWSAPI_KEY || "",
      guardian: process.env.REACT_APP_GUARDIAN_API_KEY || "",
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
      sortBy: "publishedAt",
      pageSize: 20, // Specify page size or fetch limit
      apiKey: apiKeys.newsAPI, // Add NewsAPI key
    });

    const openNewsParams = buildQueryParams({
      q: query,
      ...filters,
      apiKey: apiKeys.openNews, // Add OpenNews key
    });

    const guardianParams = buildQueryParams({
      q: query,
      "from-date": filters.from,
      "from-to": filters.to,
      sources: filters.sources,
      "show-sections": true,
      "api-key": apiKeys.guardian,
    });

    // Concurrently fetch articles from all APIs using Promise.allSettled
    const [newsAPIResult, guardianResult] = await Promise.allSettled([
      newsAPIInstance.get(`/top-headlines?${newsAPIParams}`),
      guardianInstance.get(
        `/${
          filters.category
            ? filters.category === "sports"
              ? "sport"
              : filters.category
            : "technology"
        }?${guardianParams}`
      ),
    ]);

    // Extract successful results and combine them
    const articles = [];
    if (newsAPIResult.status === "fulfilled") {
      articles.push(...(newsAPIResult.value.data?.articles || []));
    }

    // Check if guardianResult was successful
    if (guardianResult.status === "fulfilled") {
      articles.push(...(guardianResult.value.data?.response?.results || []));
    }

    return articles;
  } catch (error) {
    return [];
  }
};
