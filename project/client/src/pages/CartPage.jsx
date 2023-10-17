import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
const CartPage = () => {
  const [cart, setCart] = useCart();
  const { auth, setAuth } = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // total price
  const totalPrice = (val) => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      total = total > 0 ? total + val : total + 0;
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // deleteitem
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(myCart));
      setCart(myCart);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

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

  // handle Paymenst
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/product/braintree/payments`,
        { nonce, cart }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("payment completed succesfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <section
        className="h-100 h-custom"
        style={{ backgroundColor: "transparent" }}
      >
        <h1 className="text-center bg-light p-1 mb-1">
          {`Hello ${auth?.token && auth?.user?.name}`}
        </h1>
        <h4 className="text-center">
          {cart?.length > 0
            ? `You have ${cart.length} item in ur cart ${
                auth?.token ? "" : "Please Login to check out"
              }`
            : "Your cart is empty"}
        </h4>
        {cart.length > 0 && (
          <div className="container py-2 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div className="card">
                  <div className="card-body p-4">
                    <div className="row">
                      <div>
                        <h5 className="mb-3">
                          <a href="#!" className="text-body">
                            <i className="fas fa-long-arrow-alt-left me-2" />
                            Continue shopping
                          </a>
                        </h5>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            <p className="mb-1">Shopping cart</p>
                            <p className="mb-0">
                              You have 4 items in your cart
                            </p>
                          </div>
                          <div>
                            <p className="mb-0">
                              <span className="text-muted">Sort by:</span>{" "}
                              <a href="#!" className="text-body">
                                price <i className="fas fa-angle-down mt-1" />
                              </a>
                            </p>
                          </div>
                        </div>
                        {cart?.map((p) => (
                          <div className="card mb-3 mb-lg-0" key={p._id}>
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                  <div>
                                    <img
                                      src={`${
                                        import.meta.env.VITE_APP_API
                                      }/api/v1/product/product-photo/${p._id}`}
                                      className="img-fluid rounded-3"
                                      alt="Shopping item"
                                      style={{ width: 65 }}
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <h5>{p.name}</h5>
                                    <p className="small mb-0">
                                      {p.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                  <div style={{ width: 50 }}>
                                    <h5 className="fw-normal mb-0">
                                      {p.quantity}
                                    </h5>
                                  </div>
                                  <div style={{ width: 80 }}>
                                    <h5 className="mb-0">${p.price}</h5>
                                  </div>
                                  <button
                                    style={{
                                      background: "transparent",
                                      border: "none",
                                    }}
                                  >
                                    <DeleteIcon
                                      className="text-danger"
                                      onClick={() => {
                                        removeCartItem(p._id);
                                      }}
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className="card  rounded-3">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center ">
                              <h5 className="mb-0">User details</h5>
                            </div>
                            <hr className="my-4" />
                            <div className="d-flex justify-content-between">
                              <p className="mb-2">Subtotal</p>
                              <p className="mb-2">{totalPrice(0)}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p className="mb-2">Shipping</p>
                              <p className="mb-2">$20.00</p>
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                              <p className="mb-2">Total(Incl. taxes)</p>
                              <p className="mb-2">{totalPrice(20)}</p>
                            </div>
                            <div className="flex flex-column">
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
                                      Plase Login to checkout
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
                                      onInstance={(instance) =>
                                        setInstance(instance)
                                      }
                                    />
                                    <button
                                      className="btn btn-primary "
                                      onClick={handlePayment}
                                      disabled={
                                        loading ||
                                        !instance ||
                                        !auth?.user?.address
                                      }
                                    >
                                      {loading
                                        ? "processing ..."
                                        : "Make Payment"}
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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