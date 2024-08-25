import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCategory = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: category = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category");
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching category data:", err);
    },
  });

  return [category, refetch, isLoading, error];
};

export default useCategory;