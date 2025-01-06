// useExploreQuery.js

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchArticles } from "../Actions/index";

interface UseExploreQueryProps {
  searchText?: string;
}

export function useExploreQuery({ searchText }: UseExploreQueryProps) {
  const {
    refetch: getNews,
    isLoading,
    data: newsData,
    fetchNextPage: getNextNews,
    hasNextPage: hasNextPageNews,
    isFetchingNextPage: loadingNextNews,
  } = useInfiniteQuery({
    queryKey: ["getNews", searchText],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchArticles(searchText || ""),
    getNextPageParam: (lastPage) => {
      return lastPage?.next ? lastPage?.current_page_number + 1 : undefined;
    },
    retry: false,
    enabled: false,
  });

  return {
    isLoading,
    getNews,
    newsData,
    getNextNews,
    hasNextPageNews,
    loadingNextNews,
  };
}
