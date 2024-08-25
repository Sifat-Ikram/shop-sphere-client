"use client";
import Link from "next/link";
import Image from "next/image";
import sign from "../../assets/sign/sign.png";
import { useContext, useState } from "react";
import { AuthContext } from "@/components/provider/AuthProvider";
import Swal from "sweetalert2";

const SignIn = () => {
  const { signIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((res) => {
        console.log(res.user);
        Swal.fire("You signed up successfully!");
        setSuccess("sign In successful!");
      })
      .catch((err) => {
        console.error(err.message);
        setError(err.message);
      });

    setError("");
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
      <div className="flex-col hero-content w-1/2 shadow-2xl p-8">
        <div className="text-center w-full">
          <h1 className="text-5xl font-bold text-[#624108]">Sign up now!</h1>
        </div>
        <div className="w-full card shrink-0">
          <form
            onSubmit={handleSubmit} // Fixing onSubmit handler
            className="w-4/5 mx-auto space-y-3"
          >
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
                Sign in
              </button>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </form>
          <div className="flex justify-center mt-4">
            <Link href="/register">
              <p>
                Do not have an account?{" "}
                <span className="text-[#624108] font-semibold">Sign up</span>{" "}
                here
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
