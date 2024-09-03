"use client";
import useAxiosPublic from "@/components/hooks/useAxiosPublic";
import { AuthContext } from "@/components/provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const UserOrders = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const {
    data: orders,
    isLoading,
    refetch: orderRefetch,
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

  // Check if data is still loading
  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  // Find the selected order for the current user
  const selectedOrder = orders.find(
    (orderItem) => orderItem?.email === user?.email
  );

  const handleDeleteEntireOrder = (orderedItem) => {
    Swal.fire({
      title: "Are you sure you want to cancel this order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/order/${orderedItem._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Order cancelled!",
                text: "This order has been cancelled.",
                icon: "success",
              });
              orderRefetch();
            }
          })
          .catch((error) => {
            console.log(error.message);
            Swal.fire({
              title: "Error",
              text: "An error occurred while deleting the item.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <header className="bg-white shadow-md p-4 sm:p-6 mb-6 sm:mb-8 rounded-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            My Orders
          </h1>
        </div>
      </header>
      {selectedOrder ? (
        <div className="p-6">
          <div className="flex md:justify-between max-md:space-y-5 justify-center max-md:flex-col md:w-4/5 mx-auto">
            <p className="text-gray-600 md:px-4">
              <span className="font-bold">Order date:</span> <br />{" "}
              {format(new Date(selectedOrder?.orderTime), "PPPP")}
            </p>
            <p className="text-gray-600 md:px-4">
              <span className="font-bold">Delivery date:</span> <br />
              <h1>10 Days</h1>
            </p>
          </div>
          <div className="md:flex md:justify-between justify-center gap-10 max-md:space-y-5 items-center mt-8 md:w-11/12 mx-auto">
            <p className="text-gray-600 md:px-4">
              <span className="font-bold">Total Cost: </span> <br /> $
              {selectedOrder?.totalCost}
            </p>
            <h2 className="text-gray-600 md:px-4">
              <span className="font-bold">Order Status:</span> <br />
              {selectedOrder?.status}
            </h2>
            <p className="text-gray-600 md:px-4">
              <span className="font-bold">Discounted Amount: </span> <br />$
              {selectedOrder?.discountedAmount}
            </p>
          </div>
          <div className="flex justify-end mt-10">
            <button
              onClick={() => handleDeleteEntireOrder(selectedOrder)}
              className="bg-red-600 text-white hover:bg-red-700 px-6 py-3 rounded-md flex justify-center items-center gap-2"
            >
              <MdDelete />
              Delete Order
            </button>
          </div>
          <div className="mb-10 mt-20 text-center">
            <h1 className="text-4xl font-semibold">Ordered Products</h1>
          </div>
          <div className="space-y-4 grid grid-cols-1 gap-6">
            {selectedOrder?.order?.map((orderItem) => (
              <div
                key={orderItem._id}
                className="flex items-center cursor-pointer md:w-11/12 lg:w-3/5 mx-auto gap-8 bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <Image
                  src={orderItem.image}
                  alt={orderItem.name}
                  width={100}
                  height={100}
                  style={{ width: "auto", height: "auto" }}
                  className="w-full sm:w-24 h-auto rounded-lg shadow"
                />
                <div className="flex-1">
                  <div>
                    <h3 className="text-lg font-semibold">{orderItem.name}</h3>
                    <p>Category: {orderItem.category}</p>
                    <p>Brand: {orderItem.brand}</p>
                    <p>Price: ${orderItem.price}</p>
                    <p>Type: {orderItem.type}</p>
                    <p>Quantity: {orderItem.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-40 gap-20">
          <h1 className="text-7xl font-bold">There is no order yet!!!</h1>
          <Link href={"/shop"}>
            <button className="py-3 px-10 text-2xl font-semibold text-white bg-[#725523] hover:bg-[#624108] rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
              Make Order
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
