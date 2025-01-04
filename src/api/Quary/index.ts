import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getNewsAPI } from "../Actions/index";

interface LocationObject {
  coords: {
    latitude: number;
    longitude: number;
  };
}

type UseUseExploreQueryProps = {
  type?: any;
  id?: number;
  onHandleSuccess?: (data: any) => void;
  onEditSuccess?: (data: any) => void;
  postHandleSuccess?: (data: any) => void;
  onError?: any;
  onLikeSuccess?: (data: any) => void;
  onLikeAdSuccess?: (data: any) => void;
  onCommentSuccess?: (data: any) => void;
  searchText?: string;
  handleReportSuccess?: (data: any) => void;
  location?: LocationObject;
  userID?: any;
  specific_reel?: any;
  is_exclude?: boolean;
  isAuth?: boolean;
  setReelsLoading?: any;
};

export function useExploreQuery({ searchText }: UseUseExploreQueryProps) {
  const queryClient = useQueryClient();

  const {
    refetch: getNews,
    isLoading: isLoading,
    data: newsData,
    fetchNextPage: getNextNews,
    hasNextPage: hasNextPageNews,
    isFetchingNextPage: loadingNextNews,
    status,
  } = useInfiniteQuery({
    queryKey: ["getNews", searchText],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getNewsAPI({
        page: pageParam,
        search: searchText,
      }),
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
