import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../provider/AuthProvider";

const useOrder = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: order = [], refetch: orderRefetch } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/order?email=${user.email}`);
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching order data:", err);
    },
  });

  return [order, orderRefetch];
};

export default useOrder;
