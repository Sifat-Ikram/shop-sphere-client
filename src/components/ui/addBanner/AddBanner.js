"use client";
import useAxiosPublic from "@/components/hooks/useAxiosPublic";
import useBanner from "@/components/hooks/useBanner";
import axios from "axios";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddBanner = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm();
  const [banners, bannerRefetch] = useBanner();

  const onSubmit = async (data) => {
    try {
      const imageFile = { image: data.image[0] };
      const resImage = await axios.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const bannerItem = {
        img: resImage.data.data.display_url,
        title: data.title,
        text: data.text,
      };

      const bannerRes = await axiosPublic.post("/banner", bannerItem);

      if (bannerRes.data.insertedId) {
        bannerRefetch();
        Swal.fire("Banner added successfully");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = (bannerItem) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#624108",
      cancelButtonColor: "#d33",
      confirmButtonText: "delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/banner/${bannerItem._id}`).then((res) => {
          bannerRefetch();
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Banner Deleted!",
              text: "Banner has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="py-5 md:w-4/5 w-11/12 mx-auto">
      <div className="py-5">
        <h1 className="text-2xl font-bold text-center dark:text-white">
          Add Banner
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8 mt-8">
            <div className="flex max-md:flex-col justify-between gap-10">
              <div className="md:w-1/2">
                <label className="block font-semibold dark:text-white">
                  Banner Title
                </label>
                <input
                  type="text"
                  {...register("title")}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold dark:text-white">
                  Upload Image
                </label>
                <input
                  type="file"
                  {...register("image")}
                  className="w-full file-input input-bordered focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold dark:text-white">
                Banner Text
              </label>
              <textarea
                type="email"
                rows={4}
                {...register("text")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              />
            </div>
            <button className="buttons w-full dark:bg-dark dark:border-2 border-solid">
              Add Banner
            </button>
          </div>
        </form>
      </div>
      <div className="mt-8">
        <h1 className="text-3xl font-semibold dark:text-white text-center">
          Added Banners
        </h1>
        <div>
          {banners?.map((bannerItem) => (
            <div
              key={bannerItem._id}
              className="flex max-md:flex-col justify-center mt-5 items-center p-5 gap-5 dark:bg-dark dark:border-2 shadow-lg border-solid rounded-md"
            >
              <Image
                src={bannerItem.img}
                alt={bannerItem.title}
                width={100}
                height={100}
                className="h-20 w-20 rounded-md"
              />
              <div className="pt-2 flex-1 md:px-5 px-2 flex max-md:flex-col justify-between items-center space-y-3">
                <div className="space-y-2">
                  <h1 className="lg:text-xl md:text-lg text-base  font-semibold dark:text-white">
                    {bannerItem.title}
                  </h1>
                  <p className="md:text-medium text-sm font-normal dark:text-white">
                    {bannerItem.text}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(bannerItem)}
                  className="buttons dark:border-2 dark:bg-dark gap-2 border-solid flex justify-center items-center"
                >
                  <MdDelete className="text-white text-2xl" />
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
