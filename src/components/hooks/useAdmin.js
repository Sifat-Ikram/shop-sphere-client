import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPaused: IsAdminLoading } = useQuery({
        queryKey: [user?.email, "isAdmin"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/admin/${user.email}`);
            console.log(res.data);
            return res.data?.admin;
            
        }
    })
    return [ isAdmin, IsAdminLoading ];
};

export default useAdmin;