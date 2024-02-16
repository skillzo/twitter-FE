import { useQuery } from "react-query";
import { axiosInstance } from "../../config/AxiosInstance";

export const useUser = (id) => {
  const {
    data: userById,
    isLoading: userByIdLoading,
    refetch: refetchById,
  } = useQuery("api/users/getById", async () => {
    return axiosInstance.get(`api/users/getById/${id}`);
  });

  const {
    data: allUsers,
    isLoading: allUsersLoading,
    refetch: refetchAllUsers,
  } = useQuery("api/tweet/getAll", async () => {
    return axiosInstance.get("api/tweet/getAll");
  });

  return {
    userById,
    userByIdLoading,
    refetchById,

    allUsers,
    allUsersLoading,
    refetchAllUsers,
  };
};
