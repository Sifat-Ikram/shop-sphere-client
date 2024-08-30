"use client";
import useAxiosPublic from "@/components/hooks/useAxiosPublic";
import useProduct from "@/components/hooks/useProduct";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateProduct = () => {
  const { id } = useParams();
  const [product] = useProduct();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm();
  const [submitStatus, setSubmitStatus] = useState("");

  const selectedProduct = product?.find((product) => product._id === id);

  if (!selectedProduct) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  const { name, image, type, category, brand, price, rating, details, _id } =
    selectedProduct;

  const onSubmit = async (data) => {
    try {
      let imageUrl = image;

      if (data.image && data.image[0]) {
        // Prepare FormData for image upload
        const formData = new FormData();
        formData.append("image", data.image[0]);

        // Upload image
        const resImage = await axios.post(image_hosting_api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        imageUrl = resImage.data.data.display_url;
      }

      const productItem = {
        image: imageUrl || image,
        name: data.productName || name,
        type: data.productType || type,
        category: data.productCategory || category,
        price: data.productPrice || price,
        rating: data.productRating || rating,
        brand: data.productBrand || brand,
        details: data.productDescription || details,
      };

      const productRes = await axiosPublic.patch(
        `/product/${_id}`,
        productItem
      );

      if (productRes.data.modifiedCount) {
        setSubmitStatus("Product updated successfully!");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setSubmitStatus("Failed to update product.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="px-4">
        <div className="p-8">
          <h1 className="md:text-3xl sm:text-xl text-lg text-center font-bold text-[#624108] mb-6">
            Update Product
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-8 mb-10">
              <div className="md:w-3/5 mx-auto">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  {...register("image")}
                  className="w-full file-input focus:outline-none"
                />
              </div>
              <div className="md:flex justify-between items-center gap-5 max-md:space-y-8">
                <div className="md:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    defaultValue={name}
                    {...register("productName")}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Category
                  </label>
                  <input
                    type="text"
                    defaultValue={category}
                    {...register("productCategory")}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  />
                </div>
              </div>
              <div className="md:flex justify-between items-center gap-5 max-md:space-y-8">
                <div className="md:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Type
                  </label>
                  <input
                    type="text"
                    defaultValue={type}
                    {...register("productType")}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Brand
                  </label>
                  <input
                    type="text"
                    defaultValue={brand}
                    {...register("productBrand")}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  />
                </div>
              </div>
              <div className="md:flex justify-between items-center gap-5 max-md:space-y-8">
                <div className="md:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Price
                  </label>
                  <input
                    type="number"
                    defaultValue={price}
                    {...register("productPrice")}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Rating
                  </label>
                  <input
                    type="number"
                    defaultValue={rating}
                    {...register("productRating")}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Description
                </label>
                <textarea
                  {...register("productDescription")}
                  defaultValue={details}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  rows="4"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full buttons focus:outline-none focus:ring-2 focus:ring-[#624108]"
            >
              Update Product
            </button>
            {submitStatus && (
              <p className="mt-4 text-green-600 text-center">{submitStatus}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
