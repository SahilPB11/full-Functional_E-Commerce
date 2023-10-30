import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { CartContext } from "../../context/Cart";
import { useAuth } from "../../context/Auth";
const Login2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, setCart } = useContext(CartContext);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch products data and update the state
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/get-products`
      );
      if (data?.success) {
        setAllProducts(data?.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // handle the cart items
  // i am fetching cart items after the login
  const getCartFromDataBase = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/cart/get-cart`
      );
      const newCart = [];
      if (data?.success && data?.item?.length > 0) {
        // now i will find the cart items from products
        for (const item of data?.item) {
          const product = allProducts.find((pro) => pro._id === item._id);
          if (product) {
            newCart.push({ ...product, quantity: item.quantity });
          }
        }
        setCart([...newCart]);
        localStorage.setItem("cart", JSON.stringify([...newCart]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        const user = JSON.parse(localStorage.getItem("auth"));
        setTimeout(() => {
          if (user?.user?.role == 0) {
            setCart([]);
            getCartFromDataBase();
          }
        }, 2000);
        navigate(location.state || "/");
      } else {
        toast.error(res?.data?.message);
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
    <Layout title={"User Login"}>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
            Login
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
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password"
                    required
                  />
                  <button
                  type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button
                className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
                onClick={handleSubmit}
              >
                Log in
              </button>
              <button
                className="block rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-500 focus-visible:ring active:bg-gray-600 md:text-base"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password
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

export default Login2;
