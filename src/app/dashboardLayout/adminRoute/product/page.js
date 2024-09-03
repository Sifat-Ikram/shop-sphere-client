"use client";
import Link from "next/link";
import Swal from "sweetalert2";
import Image from "next/image";
import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";
import { MdDelete, MdEdit } from "react-icons/md";
import useProduct from "@/components/hooks/useProduct";
import useAxiosPublic from "@/components/hooks/useAxiosPublic";

const AdminProduct = () => {
  const axiosPublic = useAxiosPublic();
  const [product, refetch] = useProduct();

  const handleDelete = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#624108",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/product/${product._id}`).then((res) => {
          refetch();
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Product Deleted!",
              text: "Product has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="lg:px-10 px-4 sm:px-6 mt-10">
      <h1 className="uppercase text-4xl font-bold text-[#624108] dark:text-white text-center mb-16">
        Products Management
      </h1>
      <div className="w-full mx-auto">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.map((productItem) => (
              <div
                key={productItem._id}
                className="relative rounded-xl overflow-hidden w-72 max-md:w-4/5 mx-auto py-5 bg-white shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2"
              >
                <div className="flex justify-center">
                  <Image
                    src={productItem?.image}
                    alt="product photo"
                    width={100}
                    height={100}
                    priority
                    className="object-cover w-full h-40"
                    onError={(e) => console.error("Image failed to load:", e)}
                  />
                </div>
                <div className="flex justify-between items-center mt-4 px-5">
                  <button className="bg-[#624108] rounded-full px-5 py-1 text-white">
                    {productItem?.brand}
                  </button>
                  <button className="bg-[#624108] rounded-full px-5 py-1 text-white">
                    {productItem?.category}
                  </button>
                </div>
                <div className="p-5 flex justify-between items-center z-10 relative">
                  <div>
                    <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#624108] pr-2">
                      {productItem?.name}
                    </h1>
                    <p className="text-lg text-[#624108]">
                      <span className="font-bold text-black">Price:</span> $
                      {productItem?.price}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">Rating:</span>
                      <Rating
                        style={{ maxWidth: 100 }}
                        value={productItem?.rating}
                        readOnly
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDelete(productItem)}
                      className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                    >
                      <MdDelete size={20} />
                    </button>
                    <Link
                      href={`/dashboardLayout/adminRoute/updateProduct/${productItem._id}`}
                    >
                      <button className="flex items-center gap-2 px-4 py-2 mt-5 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                        <MdEdit size={20} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
