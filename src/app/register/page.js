"use client";
import Link from "next/link";
import Image from "next/image";
import sign from "../../assets/sign/cart-5504_512.gif";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/components/provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Swal from "sweetalert2";

const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
  const { createUser } = useContext(AuthContext) || {};
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const email = form.email.value;
    const password = form.password.value;

    // Password validation
    const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (password.length < 6) {
      setError("Your password should not be less than 6 characters");
      setLoading(false);
      return;
    } else if (!regex.test(password)) {
      setError(
        "Password must contain at least one uppercase letter and one special character"
      );
      setLoading(false);
      return;
    }

    try {
      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", image);

      const resImage = await axios.post(image_hosting_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = resImage.data.data.display_url; // Get the uploaded image URL

      // Create user with Firebase
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      // Update Firebase user profile
      await updateProfile(user, {
        displayName: name,
        photoURL: imageUrl,
      });

      // Send user data to the backend to save the user in the database
      const userInfo = { name, email, photoUrl: imageUrl };
      const res = await axios.post("/api/user", userInfo);

      if (res.data.insertedId) {
        Swal.fire("You signed up successfully!", "", "success");
        router.push("/"); // Redirect to home page after successful registration
      } else {
        throw new Error("Failed to register user");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container md:w-5/6 justify-between mx-auto py-20 flex items-center max-lg:flex-col">
        <div>
          <Image
            src={sign}
            alt="register"
            height={100}
            width={700}
            priority
            sizes={{ width: "auto", height: "auto" }}
            className="w-full h-[500px]"
          />
        </div>
        <div className="flex-col hero-content lg:w-1/2 shadow-2xl p-8">
          <div className="text-center w-full">
            <h1 className="text-5xl font-bold text-[#624108] dark:text-white">
              Sign up now!
            </h1>
          </div>
          <div className="w-full card shrink-0">
            <form onSubmit={handleSubmit} className="w-4/5 mx-auto space-y-3">
              <div>
                <label className="label">
                  <span className="label-text dark:text-white">Full Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text dark:text-white">
                    Upload your photo
                  </span>
                </label>
                <input
                  name="image"
                  type="file"
                  className="file-input file-input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text dark:text-white">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text dark:text-white">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full input input-bordered"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="buttons dark:bg-dark dark:border-2 border-solid border-white dark:text-white w-full text-lg"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign up"}
                </button>
              </div>
              {error && (
                <div className="text-red-500 dark:text-white mt-2">{error}</div>
              )}
            </form>
            <div className="flex justify-center mt-4 dark:text-white">
              <Link href="/logIn">
                <p>
                  Already have an account?{" "}
                  <span className="text-[#624108] font-semibold dark:text-white">
                    Sign in
                  </span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
