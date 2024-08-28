"use client";
import Link from "next/link";
import Image from "next/image";
import sign from "../../assets/sign/authentication.gif";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/components/provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "@/components/hooks/useAxiosPublic";
import { useRouter } from "next/navigation";

const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { createUser, updateUserProfile } = useContext(AuthContext) || {};
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const email = form.email.value;
    const password = form.password.value;

    const formData = new FormData();
    formData.append("image", image);

    try {
      // Upload image to external service (like imgbb)
      const resImage = await axios.post(image_hosting_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Password validation
      const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      if (password.length < 6) {
        setError("Your password should not be less than 6 characters");
        return;
      } else if (!regex.test(password)) {
        setError(
          "Password must contain at least one uppercase letter and one special character"
        );
        return;
      }

      setError("");

      createUser(email, password)
        .then((res) => {
          updateUserProfile(res.user, {
            displayName: name,
            photoUrl: resImage.data.data.display_url,
          })
            .then(() => {
              console.log("Profile updated");
            })
            .catch((err) => {
              console.error(err.message);
            });

          const userInfo = {
            name: name,
            email: email,
            photoUrl: resImage.data.data.display_url,
          };
          axiosPublic.post("/user", userInfo).then((res) => {
            if (res.data.insertedId) {
              Swal.fire("You signed up successfully!");
              router.push("/");
            } else {
              Swal.fire("Your signed up failed!");
            }
          });
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
        });
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="container mx-auto my-14 flex items-center max-lg:flex-col">
      <div>
        <Image
          src={sign}
          alt="register"
          height={700}
          width={700}
          priority
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      <div className="flex-col hero-content lg:w-1/2 shadow-2xl p-8">
        <div className="text-center w-full">
          <h1 className="text-5xl font-bold text-[#624108]">Sign up now!</h1>
        </div>
        <div className="w-full card shrink-0">
          <form onSubmit={handleSubmit} className="w-4/5 mx-auto space-y-3">
            <div>
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Upload your photo</span>
              </label>
              <input
                name="image"
                type="file"
                className="file-input file-input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full input input-bordered"
              />
            </div>
            <div>
              <button type="submit" className="buttons w-full text-lg">
                Sign up
              </button>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {success && <div className="text-green-500 mt-2">{success}</div>}
          </form>
          <div className="flex justify-center mt-4">
            <Link href="/logIn">
              <p>
                Already have an account?{" "}
                <span className="text-[#624108] font-semibold">Sign in</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
