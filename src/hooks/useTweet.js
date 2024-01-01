import { useQuery } from "react-query";
import { axiosInstance } from "../../config/AxiosInstance";

export const useTweet = (id) => {
  const {
    data: tweetById,
    isLoading: tweetByIdLoading,
    refetch: refetchById,
  } = useQuery("/api/tweet/getById", async () => {
    return axiosInstance.get(`/api/tweet/getById/${id}`);
  });

  const {
    data: allTweets,
    isLoading: allTweetsLoading,
    refetch: refetchAllTweets,
  } = useQuery("api/tweet/getAll", async () => {
    return axiosInstance.get("api/tweet/getAll");
  });

  return {
    tweetById,
    tweetByIdLoading,
    refetchById,

    allTweets,
    allTweetsLoading,
    refetchAllTweets,
  };
};
