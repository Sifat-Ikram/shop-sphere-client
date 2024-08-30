"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  FaStar,
  FaThumbsUp,
  FaThumbsDown,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/components/provider/AuthProvider";
import useProduct from "@/components/hooks/useProduct";
import useReview from "@/components/hooks/useReview";
import useAxiosPublic from "@/components/hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import useCart from "@/components/hooks/useCart";

const ProductDetail = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [replyText, setReplyText] = useState("");
  const [product] = useProduct();
  const [review] = useReview();
  const [cart, cartRefetch] = useCart();

  const selectedProduct = product?.find((product) => product._id === id);

  if (!selectedProduct) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  const moreProducts = product.filter(
    (item) => item.category === selectedProduct.category
  );

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const reviewInfo = {
      username: user?.displayName,
      rating,
      text: reviewText,
      productName: selectedProduct.name,
      date: new Date().toISOString(),
    };

    try {
      const res = await axiosPublic.post(`/review`, reviewInfo);
      if (res.status === 200) {
        setReviewText("");
        setRating(0);
      }
      refetch();
    } catch (error) {
      Swal.fire("Failed to submit review");
    }
  };

  const handleToOrder = (item) => {
    if (!user) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please log in to add items to the cart",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const isInCart = cart.some(
      (cartItem) => cartItem.productId === id && cartItem.email === user.email
    );

    if (isInCart) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "This item is already in the cart",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      // If the item is not in the cart, proceed to add it
      const cartItem = {
        productId: item._id,
        email: user.email,
        username: user.displayName,
        name: item.name,
        category: item.category,
        image: item.image,
        price: parseFloat(item.price),
        brand: item.brand,
        type: item.type,
        details: item.details,
      };

      axiosPublic.post("/cart", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "This item has been added to the cart",
            showConfirmButton: false,
            timer: 1000,
          });
          cartRefetch();
        }
      });
    }
  };

  const selectedReview = review.filter(
    (rev) => rev.productName === selectedProduct.name
  );

  const handleReplyText = (e) => {
    setReplyText(e.target.value);
  };

  const handleLike = async (reviewId) => {
    try {
      await axiosPublic.post(`/review/${reviewId}/like`);
      refetch();
    } catch (error) {
      console.error("Error liking review:", error);
    }
  };

  const handleDislike = async (reviewId) => {
    try {
      await axiosPublic.post(`/review/${reviewId}/dislike`);
      refetch();
    } catch (error) {
      console.error("Error disliking review:", error);
    }
  };

  const handleReply = async (reviewId) => {
    const replyInfo = {
      username: user?.displayName,
      text: replyText,
      date: new Date().toISOString(),
    };

    try {
      await axiosPublic.post(`/review/${reviewId}/reply`, replyInfo);
      setReplyText("");
      refetch();
    } catch (error) {
      console.error("Error replying to review:", error);
    }
  };

  const handleFacebookShare = () => {
    const productUrl = window.location.href;
    window.FB.ui(
      {
        method: "share",
        href: productUrl,
      },
      function () {}
    );
  };

  const handleTwitterShare = () => {
    const productUrl = window.location.href;
    const text = encodeURIComponent("Check out this awesome product!");
    window.open(
      `https://twitter.com/intent/tweet?url=${productUrl}&text=${text}`,
      "_blank"
    );
  };

  const handleInstagramShare = () => {
    window.open("https://www.instagram.com/", "_blank");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex max-md:flex-col justify-between gap-10 mb-6 max-sm:w-11/12 mx-auto">
        {/* Image Gallery */}
        <div>
          <Image
            src={selectedProduct.image}
            alt={selectedProduct.name}
            height={600}
            width={600}
            className="rounded-lg w-full mb-4"
          />
        </div>
        {/* Selected Product Information */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{selectedProduct.name}</h1>
          <p className="text-2xl font-bold mb-2">
            Price: ${selectedProduct.price}
          </p>
          <p
            className={`mb-4 ${
              selectedProduct.availability ? "text-red-500" : "text-green-500"
            }`}
          >
            {selectedProduct.availability ? "Out of Stock" : "In Stock"}
          </p>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Specifications:</h2>
            <ul className="list-disc pl-5">
              <li>Brand: {selectedProduct.brand}</li>
              <li>Type: {selectedProduct.type}</li>
              <li>Category: {selectedProduct.category}</li>
            </ul>
          </div>
          <div className="mb-4 flex items-center gap-4">
            <h2 className="text-lg font-semibold">Overall Rating:</h2>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {selectedProduct.rating}
              </span>
              <div className="flex ml-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < selectedProduct.rating ? "gold" : "gray"}
                  />
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => handleToOrder(selectedProduct)}
            className="buttons transition duration-300"
          >
            Add to Cart
          </button>
          <div className="mt-10">
            <h1 className="text-2xl font-semibold">Share this product</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-2 space-y-2  mt-2">
              <button
                onClick={handleFacebookShare}
                className="flex items-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                <FaFacebook className="mr-2" /> Share on Facebook
              </button>
              <button
                onClick={handleTwitterShare}
                className="flex items-center bg-blue-400 text-white px-3 py-2 rounded hover:bg-blue-500 transition duration-300"
              >
                <FaTwitter className="mr-2" /> Share on Twitter
              </button>
              <button
                onClick={handleInstagramShare}
                className="flex items-center bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-3 py-2 rounded hover:from-pink-600 hover:to-yellow-600 transition duration-300"
              >
                <FaInstagram className="mr-2" /> Share on Instagram
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
        <p>{selectedProduct.details}</p>
      </div>

      {/* Review Form */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add a Review</h2>
        <form onSubmit={handleReviewSubmit}>
          <div className="mb-4">
            <textarea
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Rating:</label>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  color={i < rating ? "gold" : "gray"}
                  onClick={() => setRating(i + 1)}
                  className="cursor-pointer"
                />
              ))}
            </div>
          </div>
          <button type="submit" className="buttons transition duration-300">
            Submit Review
          </button>
        </form>
      </div>

      {/* User Reviews */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div>
          {selectedReview.length > 0 ? (
            selectedReview.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 mb-4 shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">{review.username}</h3>
                    <p className="text-gray-600 text-sm">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < review.rating ? "gold" : "gray"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{review.text}</p>
                <div className="ml-3">
                  <h1 className="text-lg font-semibold">Replies:</h1>
                  <div className="ml-5">
                    {review?.replies?.map((reply) => (
                      <div
                        key={reply._id}
                        className="p-2 rounded-md mb-2 bg-gray-100"
                      >
                        <h3 className="text-lg font-semibold">
                          {reply.username}
                        </h3>
                        <p className="text-gray-700">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(review._id)}
                    className="flex items-center text-gray-600 hover:text-[#624108]"
                  >
                    <FaThumbsUp className="mr-1" /> {review.likes || 0}
                  </button>
                  <button
                    onClick={() => handleDislike(review._id)}
                    className="flex items-center text-gray-600 hover:text-red-500"
                  >
                    <FaThumbsDown className="mr-1" /> {review.dislikes || 0}
                  </button>
                  <details className="flex items-center text-gray-600">
                    <summary className="cursor-pointer">Reply</summary>
                    <div className="p-2 mt-2 bg-base-200 rounded-md">
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                        name="reply"
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={handleReplyText}
                      />
                      <button
                        onClick={() => handleReply(review._id)}
                        className="buttons transition duration-300 mt-2"
                      >
                        Submit Reply
                      </button>
                    </div>
                  </details>
                </div>
              </div>
            ))
          ) : (
            <h1>No reviews yet!</h1>
          )}
        </div>
      </div>
      <div className="my-20">
        <h1 className="text-4xl font-bold mb-10 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#8d6b31] to-[#624108]">
          Products You May Also Like
        </h1>
        <div>
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              730: {
                slidesPerView: 3,
              },
              1024: {
                // Screens larger than 1024px (desktop)
                slidesPerView: 4,
              },
            }}
          >
            {moreProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <Link href={`/productDetail/${product._id}`}>
                  <div className="bg-gradient-to-br from-[#f5f3eb] to-[#eae1d7] shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 h-80 border border-[#624108]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      height={150}
                      width={200}
                      className="w-full h-[150px] object-cover"
                    />
                    <div className="p-4">
                      <h1 className="text-xl font-semibold text-[#624108] mb-2 hover:text-[#8d6b31] transition-colors duration-300">
                        {product.name}
                      </h1>
                      <h2 className="text-base font-medium text-[#624108] mb-1">
                        <span className="font-semibold text-[#8d6b31]">
                          Brand:
                        </span>{" "}
                        {product.brand}
                      </h2>
                      <h2 className="text-sm font-medium text-[#8d6b31]">
                        <span className="text-[#624108] font-semibold">
                          Price:{" "}
                        </span>
                        ${product.price}
                      </h2>
                      <div className="flex justify-end">
                        <button className="buttons">View</button>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
