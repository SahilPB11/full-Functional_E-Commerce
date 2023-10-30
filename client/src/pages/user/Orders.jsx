import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu/UserMenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/Auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { auth, setAuth } = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/auth/orders`
      );
      setOrders(data?.orders || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  return (
    <Layout title="User - All Orders">
      <div className="container mx-auto mt-6 px-4 sm:px-6 lg:px-8">
        <div className="lg:flex">
          <div className="w-full lg:w-1/4">
            <UserMenu />
          </div>
          <div className="w-full lg:w-3/4 ml-2">
            <h1 className="text-2xl text-center mt-4 mb-8">All Orders</h1>
            {orders.map((order, index) => (
              <div key={index} className="border shadow mb-6 sm:mb-4">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="w-1/6 sm:w-1/12 text-xs">Order #</th>
                      <th className="w-1/6 sm:w-1/12 text-xs">Status</th>
                      <th className="w-1/6 sm:w-1/12 text-xs">Buyer</th>
                      <th className="w-1/6 sm:w-1/12 text-xs">Date</th>
                      <th className="w-1/6 sm:w-1/12 text-xs">Payment</th>
                      <th className="w-1/6 sm:w-1/12 text-xs">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-xs">{index + 1}</td>
                      <td className="text-xs">{order?.status}</td>
                      <td className="text-xs">{order?.buyer?.name}</td>
                      <td className="text-xs">{moment(order?.createAt).fromNow()}</td>
                      <td className="text-xs">{order?.payment?.success ? "Success" : "Failed"}</td>
                      <td className="text-xs">{order?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container mx-auto border-none text-sm sm:text-xs xs:text-xs">
                  {order?.products?.map((p, i) => (
                    <div className="flex mb-2 p-3 flex-row" key={p._id}>
                      <div className="w-1/4 sm:w-1/6">
                        <img
                          src={`${
                            import.meta.env.VITE_APP_API
                          }/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="h-32 w-32 object-cover"
                        />
                      </div>
                      <div className="w-3/4 sm:w-5/6 pl-4">
                        <p className="text-base sm:text-sm xs:text-xs">{p.name}</p>
                        <p className="text-sm text-gray-500 xs:text-xs">
                          {p.description.substring(0, 30)}
                        </p>
                        <p className="text-base sm:text-sm xs:text-xs">
                          Price: {p.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
