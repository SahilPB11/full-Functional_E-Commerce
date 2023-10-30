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
      <div className="container mx-auto mt-6">
        <div className="lg:flex">
          <div className="w-full lg:w-1/4">
            <UserMenu />
          </div>
          <div className="w-full lg:w-1/4">
            <h1 className="text-2xl text-center mb-6">All Orders</h1>
            {orders.map((order, index) => (
              <div key={index} className="border shadow mb-6">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="w-1/6">#</th>
                      <th className="w-1/6">Status</th>
                      <th className="w-1/6">Buyer</th>
                      <th className="w-1/6">Date</th>
                      <th className="w-1/6">Payment</th>
                      <th className="w-1/6">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{order?.status}</td>
                      <td>{order?.buyer?.name}</td>
                      <td>{moment(order?.createAt).fromNow()}</td>
                      <td>{order?.payment?.success ? "Success" : "Failed"}</td>
                      <td>{order?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container mx-auto">
                  {order?.products?.map((p, i) => (
                    <div className="flex mb-2 p-3 card" key={p._id}>
                      <div className="w-1/4">
                        <img
                          src={`${
                            import.meta.env.VITE_APP_API
                          }/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="h-32 w-32 object-cover"
                        />
                      </div>
                      <div className="w-3/4 pl-4">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price: {p.price}</p>
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
