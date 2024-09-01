"use client";
import { useState, useEffect } from "react";
import { Line, Bar, Pie, Radar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import useUser from "@/components/hooks/useUser";
import useProduct from "@/components/hooks/useProduct";
import useAxiosPublic from "@/components/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  CategoryScale,
  LinearScale,
  PointElement
);

const Dashboard = () => {
  const [user] = useUser();
  const [product] = useProduct();
  const axiosPublic = useAxiosPublic();

  const [data, setData] = useState({
    salesOverTime: {},
    productSales: {},
    revenueBreakdown: {},
    userGrowth: {},
    categoryDistribution: {},
  });

  const {
    data: cart = [],
    isLoading: cartLoading,
    isError: cartError,
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

  const {
    data: order = [],
    isLoading: orderLoading,
    isError: orderError,
  } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await axiosPublic.get("/order");
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching order data:", err);
    },
  });

  useEffect(() => {
    if (!cartLoading && !orderLoading && !cartError && !orderError) {
      setData({
        salesOverTime: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              label: "Sales",
              data: cart.length ? [65, 59, 80, 81, 56, 55] : [], // Example data
              borderColor: "#4A90E2",
              backgroundColor: "rgba(74, 144, 226, 0.2)",
              fill: true,
            },
          ],
        },
        productSales: {
          labels: product.length
            ? ["Product A", "Product B", "Product C", "Product D"]
            : [],
          datasets: [
            {
              label: "Sales",
              data: product.length ? [30, 70, 50, 90] : [], // Example data
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            },
          ],
        },
        revenueBreakdown: {
          labels: ["Category A", "Category B", "Category C"],
          datasets: [
            {
              data: [300, 50, 100], // Example data
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        },
        userGrowth: {
          labels: ["Q1", "Q2", "Q3", "Q4"],
          datasets: [
            {
              label: "User Growth",
              data: [10, 20, 30, 40], // Example data
              borderColor: "#FF5733",
              backgroundColor: "rgba(255, 87, 51, 0.2)",
              fill: true,
            },
          ],
        },
        categoryDistribution: {
          labels: ["Electronics", "Clothing", "Home", "Books"],
          datasets: [
            {
              data: [400, 200, 150, 100], // Example data
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            },
          ],
        },
      });
    }
  }, [cart, order, cartLoading, orderLoading, cartError, orderError]);

  if (cartLoading || orderLoading) {
    return <div>Loading...</div>;
  }

  if (cartError || orderError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-6 lg:p-12">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Admin Dashboard
        </h1>

        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          {/* Overview Cards */}
          <div className="grid gap-6 lg:grid-cols-4 mb-6">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">Users</h2>
              <p className="text-3xl font-bold text-gray-600">
                {user?.length || 0}
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">Products</h2>
              <p className="text-3xl font-bold text-gray-600">
                {product?.length || 0}
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">Carts</h2>
              <p className="text-3xl font-bold text-gray-600">
                {cart?.length || 0}
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">Orders</h2>
              <p className="text-3xl font-bold text-gray-600">
                {order?.length || 0}
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Sales Over Time
            </h2>
            <Line data={data?.salesOverTime} />
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Product Sales
            </h2>
            <Bar data={data?.productSales} />
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Revenue Breakdown
            </h2>
            <Pie data={data?.revenueBreakdown} />
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              User Growth
            </h2>
            <Radar data={data?.userGrowth} />
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Category Distribution
            </h2>
            <Doughnut data={data?.categoryDistribution} />
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Details</h2>
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Users</h3>
              <ul>
                {user?.length > 0 ? (
                  user.map((u, index) => (
                    <li key={index} className="text-gray-600">
                      {u.name}{" "}
                      {/* Adjust this as per your user object structure */}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-600">No users available</li>
                )}
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Products</h3>
              <ul>
                {product?.length > 0 ? (
                  product.map((p, index) => (
                    <li key={index} className="text-gray-600">
                      {p.name}{" "}
                      {/* Adjust this as per your product object structure */}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-600">No products available</li>
                )}
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Carts</h3>
              <ul>
                {cart?.length > 0 ? (
                  cart.map((c, index) => (
                    <li key={index} className="text-gray-600">
                      {c.item}{" "}
                      {/* Adjust this as per your cart object structure */}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-600">No cart items available</li>
                )}
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Orders</h3>
              <ul>
                {order?.length > 0 ? (
                  order.map((o, index) => (
                    <li key={index} className="text-gray-600">
                      Order #{o.id}{" "}
                      {/* Adjust this as per your order object structure */}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-600">No orders available</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
