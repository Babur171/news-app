// useExploreQuery.js

import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "./apiServices";

export function useNewsQuery({ searchText = "", filters }) {
  const {
    refetch: getNews,
    isLoading,
    data: newsData,
  } = useQuery({
    queryKey: ["getNews", filters],
    queryFn: () =>
      fetchArticles({
        query: searchText || "t",
        filters: { ...filters },
      }),

    retry: false,
    enabled: false,
  });

  return {
    isLoading,
    getNews,
    newsData,
  };
}
