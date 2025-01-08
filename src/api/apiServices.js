import { convertDate } from "../utils";
import {
  guardianInstance,
  newsAPIInstance,
  newYorkNewsInstance,
} from "./config";

export const fetchArticles = async ({ query = "", filters = {} }) => {
  try {
    const apiKeys = {
      newsAPI: process.env.REACT_APP_NEWSAPI_KEY || "",
      newYork: process.env.REACT_APP_NEWYORK_API_KEY || "",
      guardian: process.env.REACT_APP_GUARDIAN_API_KEY || "",
    };

    if (!apiKeys.newsAPI || !apiKeys.newYork || !apiKeys.guardian) {
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
      pageSize: 20,
      apiKey: apiKeys.newsAPI,
    });

    const guardianParams = buildQueryParams({
      q: query,
      "from-date": filters.from,
      "from-to": filters.to,
      sources: filters.sources,
      "show-sections": true,
      "api-key": apiKeys.guardian,
    });

    const newYorkParams = buildQueryParams({
      q: query,
      begin_date: convertDate(filters.from) || "", // Format: YYYYMMDD
      end_date: convertDate(filters.to),
      fq: filters.category ? `section_name:${filters?.category}` : "",
      "api-key": apiKeys.newYork, // Add NewYork key
    });

    // Concurrently fetch articles from all APIs using Promise.allSettled
    const [newsAPIResult, guardianResult, newYorkNewsResult] =
      await Promise.allSettled([
        newsAPIInstance.get(`/top-headlines?${newsAPIParams}`),
        guardianInstance.get(
          `/${
            filters.category
              ? filters.category === "sports"
                ? "sport"
                : filters.category === "health"
                ? ""
                : filters.category
              : "technology"
          }?${guardianParams}`
        ),
        newYorkNewsInstance.get(`?${newYorkParams}`),
      ]);

    // Extract successful results and combine them
    const articles = [];
    if (newsAPIResult.status === "fulfilled") {
      articles.push(...(newsAPIResult.value.data?.articles || []));
    }

    if (newYorkNewsResult.status === "fulfilled") {
      const articlesWithImages =
        newYorkNewsResult?.value.data?.response?.docs?.map((article) => {
          const multimedia = article.multimedia || [];
          const imageObject = multimedia.find(
            (media) => media.subtype === "xlarge" // Choose the subtype or other criteria
          );

          return {
            ...article,
            urlToImage: imageObject
              ? `https://www.nytimes.com/${imageObject?.url}` // Construct full URL
              : null,
          };
        });

      articles.push(...(articlesWithImages || []));
    }

    // Check if guardianResult was successful
    if (guardianResult.status === "fulfilled") {
      articles.push(...(guardianResult.value.data?.response?.results || []));
    }

    const filteredArticles = articles.filter(
      (article) =>
        article.title !== "[Removed]" && article?.description !== "[Removed]"
    );

    return filteredArticles;
  } catch (error) {
    return [];
  }
};
