import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUser = () => {
  const axiosPublic = useAxiosPublic();

  const { data: user = [], refetch: userRefetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosPublic.get("/user");
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching user data:", err);
    },
  });

  return [user, userRefetch];
};

export default useUser;
