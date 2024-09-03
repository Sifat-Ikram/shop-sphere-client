import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useReviews = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviews = [], refetch: reviewRefetch } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axiosPublic.get("/review");
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching review data:", err);
    },
  });

  return [reviews, reviewRefetch];
};

export default useReviews;
