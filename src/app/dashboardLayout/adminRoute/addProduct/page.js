"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import useAxiosPublic from "@/components/hooks/useAxiosPublic";

const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submitStatus, setSubmitStatus] = useState("");

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const resImage = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const productItem = {
      image: resImage.data.data.display_url,
      name: data.productName,
      type: data.productType,
      category: data.productCategory,
      price: data.productPrice,
      rating: data.productRating,
      brand: data.productBrand,
      details: data.productDescription,
    };
    const productRes = await axiosPublic.post("/product", productItem);

    if (productRes.data.insertedId) {
      setSubmitStatus("Product added successfully!");
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="p-8">
          <h1 className="md:text-3xl sm:text-xl dark:text-white text-lg text-center font-bold text-[#624108] mb-6">
            Add New Product
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-8 mb-10">
              <div className="md:w-3/5 mx-auto">
                <label className="block dark:text-white text-sm font-medium text-gray-700 mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  {...register("image", {
                    required: "Image is required",
                  })}
                  className={`w-full file-input focus:outline-none ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500`}
                />
                {errors.image && (
                  <p className="text-red-400 text-sm">{errors.image.message}</p>
                )}
              </div>
              <div className="md:flex justify-between items-center gap-5 max-md:space-y-8">
                <div className="md:w-1/2">
                  <label className="block dark:text-white text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    {...register("productName", {
                      required: "Product Name is required",
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                      errors.productName ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.productName && (
                    <p className="text-red-500 text-sm">
                      {errors.productName.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block dark:text-white text-sm font-medium text-gray-700 mb-2">
                    Product Category
                  </label>
                  <input
                    type="text"
                    {...register("productCategory", {
                      required: "Product Category is required",
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                      errors.productCategory
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.productCategory && (
                    <p className="text-red-500 text-sm">
                      {errors.productCategory.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="md:flex justify-between items-center gap-5 max-md:space-y-8">
                <div className="md:w-1/2">
                  <label className="block dark:text-white text-sm font-medium text-gray-700 mb-2">
                    Product Type
                  </label>
                  <input
                    type="text"
                    {...register("productType", {
                      required: "Product Type is required",
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                      errors.productType ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.productType && (
                    <p className="text-red-500 text-sm">
                      {errors.productType.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block dark:text-white text-sm font-medium text-gray-700 mb-2">
                    Product Brand
                  </label>
                  <input
                    type="text"
                    {...register("productBrand", {
                      required: "Product Brand is required",
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                      errors.productBrand ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.productBrand && (
                    <p className="text-red-500 text-sm">
                      {errors.productBrand.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="md:flex justify-between items-center gap-5 max-md:space-y-8">
                <div className="md:w-1/2">
                  <label className="block dark:text-white text-sm font-medium text-gray-700 mb-2">
                    Product Price
                  </label>
                  <input
                    type="number"
                    {...register("productPrice", {
                      required: "Product Price is required",
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                      errors.productPrice ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.productPrice && (
                    <p className="text-red-500 text-sm">
                      {errors.productPrice.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block dark:text-white text-sm font-medium text-gray-700 mb-2">
                    Product Rating
                  </label>
                  <input
                    type="number"
                    {...register("productRating", {
                      required: "Product Rating is required",
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                      errors.productRating
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.productRating && (
                    <p className="text-red-500 text-sm">
                      {errors.productRating.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block dark:text-white text-sm font-medium text-gray-700 mb-2">
                  Product Description
                </label>
                <textarea
                  {...register("productDescription", {
                    required: "Product Description is required",
                  })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    errors.productDescription
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500`}
                  rows="4"
                />
                {errors.productDescription && (
                  <p className="text-red-500 text-sm">
                    {errors.productDescription.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full buttons dark:bg-dark dark:text-white dark:border-2 border-solid border-white focus:ring-2 focus:ring-[#624108]"
            >
              Add Product
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

export default AddProduct;
