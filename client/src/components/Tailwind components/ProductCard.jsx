import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { BsPlus, BsEyeFill } from "react-icons/bs";

import { CartContext } from "../../context/Cart";
import { useEffect } from "react";

const ProductCard = ({ p, Admin = false }) => {
  const { addToCart } = useContext(CartContext);
  let size = p.size;
  if (size) {
    size = size.replace(/"/g, "");
    size = size.split("-");
  } else {
    console.error("Error parsing size:", error);
  }
  return (
    <div className=" mb-4 p-2">
      <div className=" border border-[#e4e4e4] p-2 rounded-lg h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          {/* image */}
          <div
            className="w-[200px] mx-auto flex justify-center items-center "
            style={{ width: "18rem" }}
          >
            <img
              src={`${
                import.meta.env.VITE_APP_API
              }/api/v1/product/product-photo/${p._id}`}
              className="card-img-top rounded-3 border-0"
              alt={p.name}
              height={"270px"}
            />
          </div>
        </div>
        {/* buttons */}
        {!Admin ? (
          <>
            <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button onClick={() => addToCart(p)}>
                <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
                  <BsPlus className="text-3xl" />
                </div>
              </button>
              <Link
                to={`/product/${p.slug}`}
                className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
              >
                <BsEyeFill />
              </Link>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="mb-4 ">
        <Link to={`/product/${p.slug}`}>
          <h2 className="font-bold mb-1">{p.name}</h2>
        </Link>

        <div className="flex">
          <p className="text-2xl text-blue-400 tracking-tight ">{p.price}</p>
          <s className="fs-5 text-red-400 ml-3">${p.price + p.price * 0.5}</s>
        </div>
        <div >
          {size.length > 0 ? (
            <p>Size: {size.join(", ")}</p>
          ) : (
            <p>No sizes available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
