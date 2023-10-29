import React from "react";
import { Link } from "react-router-dom";

const Collection = () => {
  return (
    <div>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 md:mb-12 lg:text-3xl">
            Collections
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {/* product - start */}
            <div>
              <Link
                to="/category/men's-sports-shoes"
                className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
              >
                <img
                  src="../../../public/CollectionImages/Running.jpg"
                  loading="lazy"
                  alt="Photo by Austin Wade"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
                <div className="relative flex w-full flex-col rounded-lg bg-white p-4 text-center">
                  <span className="text-gray-500">Running Shoes</span>
                  <span className="text-lg font-bold text-gray-800 lg:text-xl">
                    Causual
                  </span>
                </div>
              </Link>
            </div>
            {/* product - end */}
            {/* product - start */}
            <div>
              <Link
                to="/category/men's-casual-shoes"
                className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
              >
                <img
                  src="../../../public/CollectionImages/Sneaker.jpg"
                  loading="lazy"
                  alt="Photo by engin akyurt"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
                <div className="relative flex w-full flex-col rounded-lg bg-white p-4 text-center">
                  <span className="text-gray-500">Sneaker</span>
                  <span className="text-lg font-bold text-gray-800 lg:text-xl">
                    Be Sneaker Fan
                  </span>
                </div>
              </Link>
            </div>
            {/* product - end */}
            {/* product - start */}
            <div>
              <Link
                to="/category/men's-formal-shoes"
                className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
              >
                <img
                  src="../../../public/CollectionImages/Loafers.jpg"
                  loading="lazy"
                  alt="Photo by Austin Wade"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
                <div className="relative flex w-full flex-col rounded-lg bg-white p-4 text-center">
                  <span className="text-gray-500">Loafers</span>
                  <span className="text-lg font-bold text-gray-800 lg:text-xl">
                    Party Wear
                  </span>
                </div>
              </Link>
            </div>
            {/* product - end */}
            {/* product - start */}
            <div>
              <Link
                to="/category/men's-formal-shoes"
                className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
              >
                <img
                  src="../../../public/CollectionImages/formal.jpg"
                  loading="lazy"
                  alt="Photo by Austin Wade"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
                <div className="relative flex w-full flex-col rounded-lg bg-white p-4 text-center">
                  <span className="text-gray-500">Formal</span>
                  <span className="text-lg font-bold text-gray-800 lg:text-xl">
                    Professional Wear
                  </span>
                </div>
              </Link>
            </div>
            {/* product - end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
