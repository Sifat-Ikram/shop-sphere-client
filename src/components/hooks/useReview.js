import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useReview = () => {
  const axiosPublic = useAxiosPublic();

  const { data: review = [], refetch } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axiosPublic.get("/review");
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching review data:", err);
    },
  });

  return [review, refetch];
};

export default useReview;
