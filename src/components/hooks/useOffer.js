"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useOffer = () => {
  const axiosPublic = useAxiosPublic();

  const { data: offer = [] } = useQuery({
    queryKey: ["offer.id"],
    queryFn: async () => {
      const res = await axiosPublic.get("/offer");
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching offer data:", err);
    },
  });

  return [offer];
};

export default useOffer;
