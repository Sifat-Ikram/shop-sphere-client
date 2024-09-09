import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useBanner = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: banners = [], refetch: bannerRefetch } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosPublic.get('/banner');
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching banner data:", err);
    },
  });

  return [banners, bannerRefetch];
};

export default useBanner;
