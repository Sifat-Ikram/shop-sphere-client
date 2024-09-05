import useAxiosPublic from "@/components/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";

const AddBanner = () => {
    

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Add Banner</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="block font-semibold dark:text-white">
              Banner Title
            </label>
            <input
              type="text"
              {...register("title")}
              className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-semibold dark:text-white">
              Banner Text
            </label>
            <input
              type="email"
              {...register("text")}
              className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBanner;
