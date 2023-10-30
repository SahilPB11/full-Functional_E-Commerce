import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/Tailwind components/ProductCard";
const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-category/${
          params.slug
        }`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);

  return (
    <Layout title={"Category Poducts"}>
      <div className="container mt-3 ">
        <div className="text-center">
          <div className="d-flex  justify-content-center ">
            <h1>{params.slug} </h1>
          <h1 className=" ms-2">Category</h1>
          </div>
        </div>
        <div className="row">
          <div className="d-flex flex-wrap justify-content-around">
            {products?.map((p) => (
              <ProductCard p={p} key={p._id} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
