"use client";
import Link from "next/link";
import Image from "next/image";
import sign from "../../assets/sign/authentication.gif";
import { useContext, useState } from "react";
import { AuthContext } from "@/components/provider/AuthProvider";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const { signIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await signIn(email, password);
      setError("");
      router.push("/");
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-20 flex items-center max-lg:flex-col">
        <div>
          <Image
            src={sign}
            alt="register"
            height={700}
            width={700}
            priority
            style={{ height: "auto" }}
          />
        </div>
        <div className="flex-col hero-content md:w-1/2 w-11/12 max-md:mx-auto shadow-2xl p-8">
          <div className="text-center w-full">
            <h1 className="text-5xl font-bold dark:text-white text-[#624108]">
              Sign in here!
            </h1>
          </div>
          <div className="w-full card shrink-0">
            <form onSubmit={handleSubmit} className="w-4/5 mx-auto space-y-3">
              <div>
                <label className="label">
                  <span className="label-text dark:text-white">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="relative">
                <label className="label">
                  <span className="label-text dark:text-white">Password</span>
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full input input-bordered"
                />
                <div
                  className="absolute right-3 bottom-4 cursor-pointer text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="buttons dark:bg-dark dark:border-2 border-solid border-white dark:text-white w-full text-lg"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
              {error && <div className="text-red-500 mt-2">{error}</div>}
            </form>
            <div className="flex justify-center mt-4 dark:text-white">
              <Link href="/register">
                <p>
                  Do not have an account?{" "}
                  <span className="text-[#624108] dark:text-white font-semibold">
                    Sign up
                  </span>{" "}
                  here
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

export default SignIn;
