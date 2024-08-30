"use client";
import useAxiosPublic from "@/components/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";

const AdminOrders = () => {
  const axiosPublic = useAxiosPublic();
  const [orders, setOrders] = useState([]);

  const { data, refetch: orderRefetch } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await axiosPublic.get("/order");
      setOrders(res.data);
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching order data:", err);
    },
  });

  const handleChangeStatus = async (orderItem, newStatus) => {
    try {
      const res = await axiosPublic.patch(`/order/${orderItem._id}`, {
        status: newStatus,
      });
      // Update the local state with the new status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderItem._id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  if (!orders || orders.length === 0) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  const handleDeleteOrder = (orderedItem) => {
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
          .delete(`/cart/${orderedItem._id}`)
          .then((res) => {
            if ((res.statusText = "OK")) {
              Swal.fire({
                title: "Order cancelled!",
                text: "This order has been cancelled.",
                icon: "success",
              });
              cartRefetch();
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
      {/* Header */}
      <header className="bg-white shadow-md p-4 sm:p-6 mb-6 sm:mb-8 rounded-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            All Orders
          </h1>
        </div>
      </header>

      {/* Orders Cards */}
      <section className="container mx-auto mb-6 grid grid-cols-1 gap-6">
        {orders.map((orderedItem) => (
          <div
            key={orderedItem._id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
          >
            <div>
              <h3 className="text-xl font-bold text-[#624108] mb-2">
                Order ID: {orderedItem._id}
              </h3>
              <p className="text-gray-800 mb-2">
                <span className="font-semibold">Customer Name:</span>{" "}
                {orderedItem.username}
              </p>
              <p className="text-gray-800 mb-2">
                <span className="font-semibold">Date:</span>{" "}
                {format(new Date(orderedItem.orderTime), "PPP")}
              </p>
              <p className="text-gray-800 mb-2">
                <span className="font-semibold">Total Amount:</span>{" "}
                <span className="text-green-600 font-semibold">
                  ${orderedItem.discountedAmount.toFixed(2)}
                </span>
              </p>
              <p className="text-gray-800 mb-4">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`badge p-3 uppercase text-white ${
                    orderedItem.status === "Completed"
                      ? "badge-success"
                      : orderedItem.status === "Pending"
                      ? "badge-warning"
                      : "badge-error"
                  }`}
                >
                  {orderedItem.status}
                </span>
              </p>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <div>
                <button
                  onClick={() =>
                    document.getElementById("my_modal_4").showModal()
                  }
                  className="bg-[#725523] hover:bg-[#624108] px-3 py-1 text-white rounded-md"
                >
                  View
                </button>
                <dialog
                  id="my_modal_4"
                  className="modal fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4"
                >
                  <div className="modal-box w-full max-w-4xl bg-white rounded-lg shadow-lg relative">
                    {/* Close Button */}
                    <button
                      onClick={() =>
                        document.getElementById("my_modal_4").close()
                      }
                      className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Order Details
                    </h2>

                    <div className="space-y-4 grid grid-cols-1 gap-6">
                      {orderedItem?.order.map((cartItem) => (
                        <div
                          key={cartItem._id}
                          className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300"
                        >
                          <Image
                            src={cartItem.image}
                            alt={cartItem.name}
                            width={100}
                            height={100}
                            style={{ width: "auto", height: "auto" }}
                            className="w-full sm:w-24 h-auto rounded-lg shadow"
                          />
                          <div className="text-gray-800">
                            <h3 className="text-lg font-semibold">
                              {cartItem.name}
                            </h3>
                            <p>Category: {cartItem.category}</p>
                            <p>Brand: {cartItem.brand}</p>
                            <p>Price: ${cartItem.price}</p>
                            <p>Type: {cartItem.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </dialog>
              </div>
              <button
                onClick={() =>
                  handleChangeStatus(
                    orderedItem,
                    orderedItem.status === "Pending" ? "Completed" : "Pending"
                  )
                }
                className="btn btn-sm btn-warning hover:bg-yellow-700 text-white"
              >
                Change Status
              </button>
              <button
                onClick={() => handleDeleteOrder(orderedItem)}
                className="btn btn-sm btn-error text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminOrders;
