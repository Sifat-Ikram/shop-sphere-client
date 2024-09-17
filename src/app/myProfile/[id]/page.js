"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import useUser from "@/components/hooks/useUser";
import useOrder from "@/components/hooks/useOrder";
import useCart from "@/components/hooks/useCart";
import { MdEditNote } from "react-icons/md";
import Link from "next/link";

const MyProfile = () => {
  const { id } = useParams();
  const [user] = useUser();
  const [order] = useOrder();
  const [cart] = useCart();

  const currentUser = user.find((userItem) => userItem?._id === id);

  if (!currentUser) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">
            User not found
          </h2>
          <p className="dark:text-white">
            We could not find the profile you are looking for.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="pt-20 pb-10 px-6 lg:px-16">
        <div className="w-11/12 mx-auto p-8">
          {/* Profile Header */}
          <div className="flex items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#624108]">
              <Image
                src={currentUser.photoUrl || "/default-profile.png"}
                alt={`${currentUser.name}'s profile picture`}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <div className="ml-6">
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                {currentUser.name}
              </h1>
              <p className="text-gray-600 dark:text-white">
                {currentUser.email}
              </p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mt-8 text-center">
            <h2 className="text-4xl font-semibold dark:text-white text-[#624108]">
              Welcome, {currentUser.name}!
            </h2>
            <p className="text-gray-700 dark:text-white text-xl pt-5">
              We are glad to have you here. Below, you can find all your account
              details, order history, and wishlist.
            </p>
          </div>

          {/* Profile Details */}
          <div className="mt-10">
            {/* Account Settings */}
            <div className="my-20 flex justify-between items-center">
              <div>
                <h2 className="text-2xl dark:text-white font-semibold text-gray-900">
                  Account Settings
                </h2>
                <p className="text-gray-600 dark:text-white">
                  Manage your account settings and set your e-mail preferences.
                </p>
              </div>
              <Link
                className="bg-[#624108] px-4 py-2 text-white rounded-md flex justify-center items-center dark:border-2 border-solid dark:bg-dark dark:text-white"
                href={`/updateProfile/${currentUser._id}`}
              >
                <MdEditNote className="text-3xl text-white dark:text-white hover:text-white" />
                Edit Profile
              </Link>
            </div>

            {/* Order History */}
            <div className="mb-8 w-11/12 mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Order History
              </h2>
              {order && order?.length > 0 ? (
                <ul className="mt-4 space-y-6">
                  {order.map((order) => (
                    <li
                      key={order.orderId}
                      className="border p-6 cursor-pointer rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex justify-between">
                        <span className="text-[#624108] dark:text-white font-medium">
                          Order ID: {order?._id}
                        </span>
                        <span className="text-gray-700 dark:text-white">
                          Total: ${order?.totalCost}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-white mt-2">
                        Placed on: {new Date(order.date).toLocaleDateString()}
                      </p>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {order?.order?.map((item) => (
                          <div
                            key={item._id}
                            className="border p-4 rounded-lg text-center hover:shadow-lg transition-shadow duration-300"
                          >
                            <Image
                              src={item?.image}
                              alt={item.productName}
                              width={50}
                              height={50}
                              className="object-cover mx-auto rounded-lg border"
                            />
                            <div>
                              <p className="text-gray-800 dark:text-white">
                                {item.name}
                              </p>
                              <p className="text-gray-600 dark:text-white mt-2">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-white">
                  You have not placed any orders yet.
                </p>
              )}
            </div>

            {/* Wishlist */}
            <div className="mb-8 w-11/12 mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Wishlist
              </h2>
              {cart && cart.length > 0 ? (
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {cart?.map((item) => (
                    <li
                      key={item?._id}
                      className="border cursor-pointer p-4 rounded-lg text-center hover:shadow-lg transition-shadow duration-300"
                    >
                      <Image
                        src={item?.image || "/placeholder.png"}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="object-cover mx-auto rounded-lg"
                      />
                      <p className="mt-2 text-gray-800 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-gray-600 dark:text-white">
                        ${item.price}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-white">
                  Your wishlist is empty.
                </p>
              )}
            </div>
            {/* Address Information */}
            <div className="mb-6 w-11/12 mx-auto">
              <h2 className="text-xl font-semibold dark:text-white">
                Address Information
              </h2>
              <p className="mt-4 dark:text-white">
                {currentUser.address || "No address information available."}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyProfile;
