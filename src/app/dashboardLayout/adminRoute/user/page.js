"use client";
import useAxiosPublic from "@/components/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FaUserGraduate } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const User = () => {
  const axiosPublic = useAxiosPublic();

  const { data: user = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosPublic.get("/user");
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching cart data:", err);
    },
  });

  console.log(user);

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.patch(`/user/admin/${user._id}`).then((res) => {
          refetch();
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: `${user.name} is admin now!`,
              text: "",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/user/${user._id}`).then((res) => {
          refetch();
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "User Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="lg:px-20 mt-20">
      <h1 className="uppercase text-4xl font-bold text-[#624108] dark:text-white text-center">
        Users
      </h1>
      <div className="w-11/12 mx-auto">
        <div className="p-2 mt-10">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold dark:text-white uppercase text-center">
              Total Users: {user.length}
            </h1>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {user.map((person) => (
              <div
                key={person._id}
                className="bg-white rounded-lg shadow-lg p-5 transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <div className="flex justify-center">
                  <Image
                    src={person.photoUrl}
                    alt="User photo"
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-[#624108]"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h1 className="text-lg font-bold text-[#624108]">
                    {person.name}
                  </h1>
                  <h2 className="text-sm text-gray-600">{person.email}</h2>
                </div>
                <div className="flex justify-around mt-5">
                  <button className="text-red-500 hover:text-red-700 transition duration-200">
                    <MdDelete onClick={() => handleDelete(person)} size={24} />
                  </button>
                  <button className="text-green-500 hover:text-green-700 transition duration-200">
                    {person.role === "admin" ? (
                      "Admin"
                    ) : (
                      <FaUserGraduate
                        onClick={() => handleMakeAdmin(person)}
                        size={24}
                      />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
