import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/Cart";
import ProductCard from "../components/Tailwind components/ProductCard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetail = () => {
  const { addToCart } = useContext(CartContext);
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduts, setRelatedProduts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/get-product/${
          params.slug
        }`
      );
      setProduct(data?.product);
      if (data?.product) {
        getSimilarProducts(data?.product?._id, data?.product?.category._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let size = product?.size;
  let colors = product?.colors;
  if (size || colors) {
    colors = colors.replace(/"/g, "");
    colors = colors.split("-");
    size = size.replace(/"/g, "");
    size = size.split("-");
  }

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_API
        }/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Product View"}>
      <div className="row container">
        <div className="bg-white">
          <div>
            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6">
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                {product && (
                  <img
                    className="h-full w-full object-contain object-center"
                    src={`${
                      import.meta.env.VITE_APP_API
                    }/api/v1/product/product-photo/${product?._id}`}
                    alt={product?.name}
                  />
                )}
              </div>
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product?.name}
                </h1>
                <h2 className="text-xl  tracking-tight text-gray-900 sm:text-3xl">
                  {product?.brand}
                </h2>
              </div>

              {/* Options */}
              <div className="mt-2 justify-center lg:row-span-3 lg:mt-0">
                <div className="flex">
                  <p className="text-3xl text-blue-400 tracking-tight ">
                    {product?.price}
                  </p>
                  <s className="fs-5 text-red-400 ml-3">
                    ${product?.price + product?.price * 0.5}
                  </s>
                </div>

                <div className="d-flex mt-2"></div>
                <div>
                  {product?.size ? (
                    <div className="d-flex items-center ">
                      <p className="text-xl font-semibold">Size: </p>
                      <p className=" ms-2"> {size.join(", ")}</p>
                    </div>
                  ) : (
                    <p>No sizes available</p>
                  )}
                </div>

                <button
                  type="button"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover-bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => {
                    addToCart(product);
                  }}
                >
                  Add to bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row container-fluid mt-5">
        <h2 className="mb-5 font-semibold text-center">Similar Products</h2>
        {relatedProduts.length < 1 && (
          <h5 className="text-center">No Similar Products</h5>
        )}
        <div className="d-flex flex-wrap justify-content-around">
          {relatedProduts?.map((p) => (
            <ProductCard p={p} key={p._id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
