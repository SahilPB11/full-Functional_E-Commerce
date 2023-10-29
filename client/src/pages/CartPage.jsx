import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { CartContext } from "../context/Cart";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { useAuth } from "../context/Auth";

const CartPage = () => {
  const {
    cart,
    total,
    clearCart,
    removeCartItem,
    incrementQuantity,
    decrementQuantity,
    itemQuantity,
  } = useContext(CartContext);
  const { auth, setAuth } = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handle Payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/product/braintree/payments`,
        { nonce, cart }
      );
      setLoading(false);
      clearCart();
      localStorage.removeItem("cart");
      auth?.user?.role === 1
        ? navigate(`/dashboard/admin/orders`)
        : navigate(`/dashboard/user/orders`);
      toast.success("Payment completed successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="h-100 h-custom bg-transparent">
        <h1 className="text-center bg-light p-1 mb-1">
          {`Hello ${auth?.token && auth?.user?.name}`}
        </h1>
        <h4 className="text-center">
          {cart?.length > 0
            ? `You have ${cart.length} item in your cart ${
                auth?.token ? "" : "Please Login to check out"
              }`
            : "Your cart is empty"}
        </h4>
        {cart.length > 0 && (
          <div className="container py-2 h-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <h5 className="mb-3">
                  <Link to="/" className="text-body flex items-center">
                    <i className="fas fa-long-arrow-alt-left me-2" />
                    Continue shopping
                  </Link>
                </h5>
                <hr />
                <div className="mb-4">
                  <p className="mb-1">Shopping cart</p>
                  <p className="mb-0">
                    You have {itemQuantity} items in your cart
                  </p>
                </div>
                {cart?.map((p, index) => (
                  <div
                    className="justify-between mb-2 rounded-lg bg-white p-2 shadow-md sm:flex sm:justify-start"
                    key={index}
                  >
                    <img
                      src={`${
                        import.meta.env.VITE_APP_API
                      }/api/v1/product/product-photo/${p?._id}`}
                      className="w-16 h-16 rounded-lg"
                      alt="Shopping item"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {p?.name}
                        </h2>
                        <p className="mt-1 text-xs text-gray-700">{p?.brand}</p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <span
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            onClick={() => decrementQuantity(p._id)}
                          >
                            {" "}
                            -{" "}
                          </span>
                          <input
                            className="h-8 w-8 border bg-white text-center text-xs outline-none"
                            type="number"
                            value={p?.quantity}
                          />
                          <span
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            onClick={() => incrementQuantity(p._id)}
                          >
                            {" "}
                            +{" "}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">${p.price * p.quantity}</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                            onClick={() => removeCartItem(p._id)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="bg-white rounded p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="mb-0">User details</h5>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between mb-2">
                    <p className="mb-2">Subtotal</p>
                    <p className="mb-2">{total}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="mb-2">Shipping</p>
                    <p className="mb-2">$20.00</p>
                  </div>
                  <div className="flex justify-between mb-4">
                    <p className="mb-2">Total(Incl. taxes)</p>
                    <p className="mb-2">{total + 20}</p>
                  </div>
                  <div className="flex flex-col">
                    {auth?.user?.address ? (
                      <>
                        <div className="mt-2 mb-2">
                          <h5>{auth?.user?.address}</h5>
                          <button
                            className="btn btn-outline-warning"
                            onClick={() =>
                              navigate("/dashboard/user/profile", {
                                state: "/cart",
                              })
                            }
                          >
                            Update Address
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="mb-3">
                        {auth?.token ? (
                          <button
                            className="btn btn-outline-warning"
                            onClick={() =>
                              navigate("/dashboard/user/profile", {
                                state: "/cart",
                              })
                            }
                          >
                            Update Address
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-warning"
                            onClick={() =>
                              navigate("/login", {
                                state: "/cart",
                              })
                            }
                          >
                            Please Login to checkout
                          </button>
                        )}
                      </div>
                    )}

                    <div className="text-center">
                      {!clientToken || !cart?.length ? (
                        ""
                      ) : (
                        <>
                          <DropIn
                            options={{
                              authorization: clientToken,
                              paypal: {
                                flow: "vault",
                              },
                            }}
                            onInstance={(instance) => setInstance(instance)}
                          />
                          <button
                            className="btn btn-primary"
                            onClick={handlePayment}
                            disabled={
                              loading || !instance || !auth?.user?.address
                            }
                          >
                            {loading ? "Processing..." : "Make Payment"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default CartPage;
