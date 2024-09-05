"use client";
import useCart from "@/components/hooks/useCart";
import { AuthContext } from "@/components/provider/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaExchangeAlt, FaShoppingCart } from "react-icons/fa";
import { GoInbox } from "react-icons/go";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import useAxiosPublic from "@/components/hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useOrder from "@/components/hooks/useOrder";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const Shop = () => {
  const { user } = useContext(AuthContext);
  const [cart, cartRefetch] = useCart();
  const [order, orderRefetch] = useOrder();
  const [amounts, setAmounts] = useState({});
  const [voucherCode, setVoucherCode] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const axiosPublic = useAxiosPublic();
  const router = useRouter();

  const selectedItem = cart.filter(
    (cartItem) => cartItem.email === user?.email
  );

  const navButton = (
    <>
      <Link href={"/register"}>
        <button className="btn btn-outline text-[#624108] hover:bg-[#624108] hover:text-white px-5 lg:px-20 md:px-14 sm:px-8">
          Sign up
        </button>
      </Link>
      <Link href={"/logIn"}>
        <button className="btn btn-outline text-[#624108] hover:bg-[#624108] hover:text-white px-5 lg:px-20 md:px-14 sm:px-8">
          Sign in
        </button>
      </Link>
    </>
  );

  useEffect(() => {
    const initialAmount = {};
    cart.forEach((item) => {
      initialAmount[item.name] = 1;
    });
    setAmounts(initialAmount);
    setDiscountedAmount(totalCostCalculation());
  }, [cart]);

  //delete item handle
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure you want to delete this item?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/cart/${item._id}`)
          .then((res) => {
            if ((res.statusText = "OK")) {
              Swal.fire({
                title: "Item Deleted!",
                text: "This item has been deleted.",
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

  const increaseQuantity = (productItem) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [productItem]: (prevAmounts[productItem] || 0) + 1,
    }));
  };

  const decreaseQuantity = (productItem) => {
    if (amounts[productItem] > 0) {
      setAmounts((prevAmounts) => ({
        ...prevAmounts,
        [productItem]: (prevAmounts[productItem] || 0) - 1,
      }));
    }
  };

  const totalCostCalculation = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * (amounts[item.name] || 0);
    });
    return total;
  };

  const handleDiscountPrice = (voucherCode) => {
    let newDiscountedPrice = totalCostCalculation();
    if (voucherCode === "shop111") {
      newDiscountedPrice -= 11;
    } else {
      Swal.fire({
        title: "Oops!",
        text: "Wrong voucher code",
        icon: "error",
      });
    }
    setDiscountedAmount(newDiscountedPrice);
  };

  const handleFinalOrder = () => {
    const orderInfo = {
      email: user.email,
      order: selectedItem.map((item) => ({
        ...item,
        quantity: amounts[item.name] || 1,
      })),
      username: user.displayName,
      discountedAmount: discountedAmount,
      totalCost: totalCostCalculation(),
      orderTime: new Date().toISOString(),
      status: "pending",
    };

    Swal.fire({
      title: "Are you sure you want to confirm the order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .post("/order", orderInfo)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Order Confirmed!",
                text: "This order has been placed.",
                icon: "success",
              });
              router.push("/");
            }
            orderRefetch();
          })
          .catch((error) => {
            console.log(error.message);
            Swal.fire({
              title: "Error",
              text: "An error occurred while placing the order.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleBkashPayment = async () => {
    try {
      await axiosPublic
        .post("/bkash-checkout", {
          amount:
            discountedAmount !== 0 ? discountedAmount : totalCostCalculation(),
          callbackURL: "http://localhost:4321/bkash-checkout",
          orderID: "12345",
          reference: user.email,
        })
        .then((res) => {
          if (res.statusText == "OK") {
            window.location.href = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="md:flex justify-center gap-5 md:px-5 px-2 pt-20 pb-5">
        <div className="md:w-3/5 lg:py-20 sm:py-14 py-10">
          {/* <div className="sm:flex justify-between items-center gap-8 mb-8">
          <div className="md:w-3/5">
            <h1 className="max-md:text-center max-md:text-lg">
              Register now & get Free shipping
            </h1>
            <div className="flex justify-center items-center lg:my-8 md:my-7 sm:my-5 my-4 gap-4">
              {navButton}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-5">
              <FaShoppingCart className="text-[#624108] text-xl" />
              <h1>Faster Delivery</h1>
            </div>
            <div className="flex items-center gap-5">
              <FaExchangeAlt className="text-[#624108] text-xl" />
              <h1>Easier returns and exchanges</h1>
            </div>
            <div className="flex items-center gap-5">
              <GoInbox className="text-[#624108] text-xl" />
              <h1>Quick order information and tracking</h1>
            </div>
          </div>
        </div> */}
          <h1 className="text-5xl font-extrabold">My Cart</h1>
          <div className="border-t-2 border-solid py-8 mt-1">
            {selectedItem.length ? (
              selectedItem.map((productItem) => (
                <div
                  key={productItem._id}
                  className="border-b-2 border-solid rounded-md p-4 pb-5 bg-base-100 gap-5 shadow-lg space-y-3"
                >
                  <div className="sm:flex justify-between items-center">
                    <h1>
                      <span className="font-bold">Product:</span>{" "}
                      {productItem.name}
                    </h1>
                    <p>
                      <span className="font-bold">Price:</span> $
                      {productItem.price}
                    </p>
                  </div>
                  <div className="flex items-center md:gap-10 sm:gap-5 gap-2">
                    <h1 className="font-bold">Product Quantity: </h1>
                    <div className="flex justify-center items-center">
                      <AiOutlineMinusSquare
                        onClick={() => decreaseQuantity(productItem.name)}
                        className="text-2xl cursor-pointer"
                      />
                      <h1 className="text-2xl mx-5">
                        {amounts[productItem.name]}
                      </h1>
                      <AiOutlinePlusSquare
                        onClick={() => increaseQuantity(productItem.name)}
                        className="text-2xl cursor-pointer"
                      />
                    </div>
                  </div>
                  <h1 className="flex items-center gap-4">
                    <span className="font-bold">Total Price: </span>$
                    {productItem.price * (amounts[productItem.name] || 0)}
                  </h1>
                  <div className="sm:flex justify-end items-center">
                    <button
                      onClick={() => handleDelete(productItem)}
                      className="bg-white rounded-md py-2 px-4 flex justify-center items-center gap-4 border-2 border-solid border-red-600 hover:border-white text-red-700 hover:text-white hover:bg-red-600"
                    >
                      <MdDelete className="text-xl" /> DELETE
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-center items-center gap-20 my-32">
                <h1 className="text-5xl text-center">Your cart is empty</h1>
                <Link href={"/allProducts"}>
                  <button className="bg-[#624108] hover:bg-[#624108] text-white lg:rounded-xl rounded-md lg:px-20 md:px-14 sm:px-8 px-5 lg:py-4 sm:py-3 py-2">
                    Shop now
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 bg-base-200 py-5 px-4 rounded-lg space-y-10 lg:mt-16">
          <div>
            <h1 className="font-bold text-2xl">Products:</h1>
            <table className="w-full text-center">
              <thead>
                <tr>
                  <th className="py-2"></th>
                  <th className="py-2">Name</th>
                  <th className="pr-4 py-2">Amount</th>
                  <th className="py-2 flex">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedItem.map((item, index) => (
                  <tr key={item._id} className="border-b">
                    <td className="pr-2 py-2">{index + 1}</td>
                    <td className="py-2 text-left">{item.name}</td>
                    <td className="pr-4 py-2">{amounts[item.name] || 0}</td>
                    <td className="py-2">
                      ${(item.price * (amounts[item.name] || 0)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-8 px-3">
            <h1 className="text-2xl">
              <span className="font-bold">SubTotal :</span> $
              {totalCostCalculation().toFixed(2)}
            </h1>
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold">Enter Voucher</h1>
                <input
                  type="text"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <button
                  onClick={() => {
                    handleDiscountPrice(voucherCode);
                  }}
                  className="bg-[#725523] mt-2 hover:bg-[#624108] px-5 py-2 text-white rounded-sm"
                >
                  Apply
                </button>
              </div>
              <h1 className="text-lg">
                <span className="font-semibold text-xl">Total Amount: </span>
                {discountedAmount !== 0
                  ? discountedAmount.toFixed(2)
                  : totalCostCalculation().toFixed(2)}
              </h1>
            </div>
          </div>
          <div className="px-3 flex flex-col gap-10">
            <button onClick={() => handleBkashPayment()} className="buttons">
              Bkash Payment
            </button>
            <button onClick={() => handleFinalOrder()} className="buttons">
              Cash On Delivery
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
