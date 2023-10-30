import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("hii");
        const res = await axios.post(
            `${import.meta.env.VITE_APP_API}/api/v1/auth//forgot-password`,
            {
                email,
                newPassword,
                answer,
            }
            );
            console.log("hi1");
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // handle password show or not
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // togle visibility
  };
  return (
    <Layout title={"Forgot Password"}>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
            Reset Password
          </h2>
          <form className="mx-auto max-w-lg rounded-lg border">
            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                >
                  Email
                </label>
                <input
                  name="email"
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter Your Password"
                    required
                  />
                  <button
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div>
                  <label
                    htmlFor="answer"
                    className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                  >
                    Answer
                  </label>
                  <input
                    name="email"
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="What is Your Favorite sports"
                    required
                  />
                </div>
              </div>
              <button
                className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
                onClick={handleSubmit}
              >
                Reset Password
              </button>
            </div>
            <div className="flex items-center justify-center bg-gray-100 p-4">
              <p className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
