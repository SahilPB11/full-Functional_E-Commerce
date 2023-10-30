import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went Wrong");
    }
  };
  return (
    <Layout title={"User Sign Up"}>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          {/* text - start */}
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Registeration Form
            </h2>
          </div>

          <form
            className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2"
            onSubmit={handleSubmit}
          >
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                placeholder="Enter Your  Name"
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Email*
              </label>
              <input
                type="email"
                value={email}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                placeholder="Enter Your Email "
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="Password"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Password*
              </label>
              <input
                type="password"
                value={password}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                required
                autoFocus
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="Phone"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Phone
              </label>
              <input
                type="text"
                value={phone}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Your Phone Number"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="Address"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Address
              </label>
              <input
                type="text"
                value={address}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Your Address"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="answer"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Answer
              </label>
              <input
                type="text"
                value={answer}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="What is Your Favorite sports"
                required
              />
            </div>

            <div className="flex items-center justify-between sm:col-span-2">
              <button
                className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-500 focus-visible:ring active:bg-gray-500 md:text-base"
                type="submit"
              >
                Register
              </button>
              <button
                className="block rounded-lg bg-blue-600 px-2 py-1 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-500 focus-visible:ring active:bg-gray-600 md:text-base"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password
              </button>
              <span className="text-sm text-gray-500">*Required</span>
            </div>
            <div className="flex   bg-gray-100 p-4">
              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                >
                  Login Here
                </Link>
              </p>
            </div>
          </form>
          {/* form - end */}
        </div>
      </div>
    </Layout>
  );
};

export default Register;
