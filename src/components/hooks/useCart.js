import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCart = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: cart = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosPublic.get("/cart");
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching cart data:", err);
    },
  });

  return [cart, refetch, isLoading, error];
};

export default useCart;
