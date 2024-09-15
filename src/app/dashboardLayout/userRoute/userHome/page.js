"use client";
import useCart from "@/components/hooks/useCart";
import useOrder from "@/components/hooks/useOrder";
import useProduct from "@/components/hooks/useProduct";
import { AuthContext } from "@/components/provider/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const [product] = useProduct();
  const [order] = useOrder();
  const [cart] = useCart();

  const previousOrder = order?.filter((item) => item.status == "Completed");
  const newOrder = order?.filter((item) => item.status == "Pending");

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  // Shuffle the products array
  const shuffledProducts = shuffleArray([...product]);

  return (
    <div className="p-4 min-h-screen">
      {/* Welcome section */}
      <div className="dark:bg-dark dark:text-white text-center p-6 mb-6">
        <h1 className="text-4xl font-semibold">
          Welcome back,{" "}
          <span className="font-bold uppercase">
            {user?.displayName || "User"}
          </span>
          !
        </h1>
        <p className="mt-2 text-xl">
          It&apos;s great to have you here. Let&apos;s see what&apos;s new!
        </p>
      </div>

      <div className="space-y-5">
        <div className="p-4 w-full dark:bg-dark dark:text-white">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <div className="mt-2 space-y-4">
            {cart && cart.length > 0 ? (
              cart.map((cartItem) => (
                <div
                  key={cartItem._id}
                  className="flex max-sm:flex-col items-center p-3 gap-5 rounded-lg shadow-md"
                >
                  <Image
                    src={cartItem.image}
                    alt={cartItem.name}
                    width={100}
                    height={100}
                    className="h-20 w-20 rounded-md"
                  />
                  <div className="flex-1 space-y-5">
                    <div className="flex max-sm:flex-col justify-between ">
                      <h1>{cartItem.name}</h1>
                      <h1>Price: ${cartItem.price}</h1>
                    </div>
                    <h1>Category: {cartItem.category}</h1>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-between">
                <p className="text-sm font-semibold">No orders available</p>
              </div>
            )}
          </div>
        </div>
        <div className="dark:bg-dark dark:text-white p-4 rounded-lg shadow-md w-full">
          <h2 className="text-lg font-bold">Past Orders</h2>
          <div className="mt-2">
            {previousOrder && previousOrder.length > 0 ? (
              previousOrder.map((orderItem) => (
                <div key={orderItem._id}>
                  {orderItem?.order?.map((item, index) => (
                    <ol key={item._id}>
                      <li className="text-sm font-semibold mt-2 gap-1">
                        {index + 1}. {item.name}
                      </li>
                    </ol>
                  ))}
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-between">
                <p className="text-sm font-semibold">No orders available</p>
              </div>
            )}
          </div>
        </div>
        <div className="dark:bg-dark dark:text-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-2">Your Recent Orders</h2>
          <div className="mt-2">
            {newOrder && newOrder.length > 0 ? (
              newOrder.map((orderItem) => (
                <div key={orderItem._id}>
                  {orderItem?.order?.map((item, index) => (
                    <ol key={item._id}>
                      <li className="text-sm font-semibold mt-2 gap-1">
                        {index + 1}. {item.name}
                      </li>
                    </ol>
                  ))}
                </div>
              ))
            ) : (
              <div>
                <p className="text-sm font-semibold">No new orders available</p>

                <Link
                  href="/dashboardLayout/userRoute/order"
                  className="flex justify-end mt-3"
                >
                  <button className="buttons dark:bg-dark dark:text-white">
                    View Orders
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Recommendations */}
      <div className="dark:bg-dark dark:text-white p-6 mb-6">
        <h2 className="text-xl font-bold mb-2">Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shuffledProducts?.slice(0, 8)?.map((productItem) => (
            <Link
              key={productItem._id}
              href={`/productDetail/${productItem._id}`}
            >
              <div className="p-4 rounded-lg shadow-md w-60 dark:border-2 border-white border-solid">
                <Image
                  src={productItem.image}
                  alt={productItem.name}
                  height={100}
                  width={100}
                  className="h-32 w-full"
                />
                <h3 className="text-lg font-bold">{productItem.name}</h3>
                <p className="text-gray-600 dark:text-white">
                  ${productItem.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div className="dark:bg-dark dark:text-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Special Offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Offer 1 */}
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Buy 1 Get 1 Free!</h3>
            <p className="text-gray-600">
              On selected products. Limited time offer.
            </p>
            <button className="mt-2 text-blue-500 hover:underline">
              Shop Now
            </button>
          </div>
          {/* Offer 2 */}
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">20% Off on First Purchase</h3>
            <p className="text-gray-600">Use code WELCOME20 at checkout.</p>
            <button className="mt-2 text-blue-500 hover:underline">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
