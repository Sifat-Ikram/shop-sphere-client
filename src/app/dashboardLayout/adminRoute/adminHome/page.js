"use client";
import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import useProduct from "@/components/hooks/useProduct";
import useUser from "@/components/hooks/useUser";
import useOrder from "@/components/hooks/useOrder";
import AddBanner from "@/components/ui/addBanner/AddBanner";
import useAxiosPublic from "@/components/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AdminHome = () => {
  const [product] = useProduct();
  const [user] = useUser();
  const [order] = useOrder();
  const axiosPublic = useAxiosPublic();

  const { data: userOrder = [] } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await axiosPublic.get("/order/admin");
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching order data:", err);
    },
  });

  return (
    <div className="container w-11/12 mx-auto p-6 mt-20">
      <h1 className="lg:text-4xl md:text-3xl text-2xl dark:text-white font-bold mb-8 text-gray-700 text-center">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 space-y-3 rounded-lg shadow-md text-white">
          <p className="mt-2 text-sm text-center">
            Total orders placed on your store
          </p>
          <h2 className="text-xl font-bold text-center">Total Orders</h2>
          <p className="text-4xl font-semibold text-center">{order.length}</p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-teal-500 p-6 space-y-3 rounded-lg shadow-md text-white">
          <p className="mt-2 text-sm text-center">
            Available products in your inventory
          </p>
          <h2 className="text-xl font-bold text-center">Total Products</h2>
          <p className="text-4xl font-semibold text-center">{product.length}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-6 space-y-3 rounded-lg shadow-md text-white">
          <p className="mt-2 text-sm text-center">
            Registered users on your platform
          </p>
          <h2 className="text-xl font-bold text-center">Total Users</h2>
          <p className="text-4xl font-semibold text-center">{user.length}</p>
        </div>
      </div>
      <AddBanner />
    </div>
  );
};
export default AdminHome;
