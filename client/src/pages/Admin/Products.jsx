import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ProductCard from "../../components/Tailwind components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/get-products`
      );
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"All Products"}>
      <div className="lg:flex">
        <div className="w-full lg:w-1/4 p-4">
          <AdminMenu />
        </div>
        <div className="w-full lg:w-3/4 p-4">
          <h1 className="text-center text-2xl">All Product List</h1>
          <section className="py-5">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products?.map((p) => (
                  <div className="mb-4" key={p._id}>
                    <Link
                      to={`/dashboard/admin/product/${p?.slug}`}
                      className="no-underline"
                    >
                      <ProductCard p={p} Admin="true" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
