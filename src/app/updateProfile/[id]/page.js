"use client";
import useUser from "@/components/hooks/useUser";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/components/hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProfile = () => {
  const { id } = useParams();
  const [user] = useUser();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const selectedUser = user.find((userItem) => userItem._id === id);

  if (!selectedUser) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const resImage = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const updateInfo = {
      name: data.name,
      email: data.email,
      address: data.address,
      image: resImage.data.data.display_url,
      cardMethod: data.cardMethod,
      cardNumber: data.cardNumber,
    };
    await axiosPublic
      .patch(`/user/${selectedUser._id}`, updateInfo)
      .then((res) => {
        Swal.fire("Update completed");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="pt-20 pb-10 px-6 lg:px-16">
        <div className="md:p-8 py-10">
          <div className="mb-10 flex justify-center items-center gap-8">
            <div className="flex items-center mt-4">
              <Image
                src={selectedUser?.photoUrl || "/default-profile.png"}
                alt={`${selectedUser?.name}'s profile picture`}
                width={96}
                height={96}
                className="object-cover rounded-full border-2 border-gray-300"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <h2 className="text-2xl font-medium text-gray-800 dark:text-white">
                {selectedUser.name}
              </h2>
              <h2 className="text-xl font-medium text-gray-600 dark:text-white">
                {selectedUser.email}
              </h2>
            </div>
          </div>

          <h1 className="text-4xl dark:text-white font-semibold text-center mb-6 text-gray-800 mt-10">
            Update Profile
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="block font-semibold dark:text-white">
                Upload Picture
              </label>
              <input
                type="file"
                {...register("image")}
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div>
                <label className="block font-semibold dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  defaultValue={selectedUser?.name}
                  className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-semibold dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  defaultValue={selectedUser?.email}
                  className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-lg font-semibold dark:text-white">
                Shipping Address
              </h2>
              <textarea
                {...register("address")}
                defaultValue={selectedUser?.address}
                className="mt-4 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="4"
              />
            </div>

            <div className="mb-10">
              <h2 className="text-lg font-semibold dark:text-white">
                Payment Methods
              </h2>
              <div className="mt-4">
                <div className="flex max-md:flex-col gap-8 md:justify-evenly items-center">
                  <h1 className="dark:text-white">
                    <span className="font-bold">Card Method: </span>{" "}
                    {selectedUser?.cardMethod}
                  </h1>
                  <h1 className="dark:text-white">
                    <span className="font-bold">Card Number: </span>{" "}
                    {selectedUser?.cardNumber}
                  </h1>
                </div>

                <details className="mt-6">
                  <summary className="cursor-pointer dark:text-white font-semibold">
                    Add New Payment Method
                  </summary>
                  <div className="mt-4 space-y-4">
                    <div className="flex justify-center items-center gap-3">
                      <label className="block dark:text-white">
                        Card Method
                      </label>
                      <input
                        type="text"
                        {...register("cardMethod")}
                        placeholder="Type card method..."
                        className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex justify-center items-center gap-3">
                      <label className="block dark:text-white">
                        Card Number
                      </label>
                      <input
                        type="text"
                        {...register("cardNumber")}
                        className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Type card Number"
                      />
                    </div>
                  </div>
                </details>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <button type="submit" className="buttons transition">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateProfile;
