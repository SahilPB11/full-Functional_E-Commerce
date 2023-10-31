import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";

import toast from "react-hot-toast";
import { Box } from "@mui/material";
import { Slider } from "@mui/material";
import HomeIntro from "../components/layout/HomeIntro";
import { ShoeSize, ShoeColor, brands } from "../components/material";
import CreatableSelect from "react-select/creatable";
import ProductCard from "../components/Tailwind components/ProductCard";
import Collection from "../components/Tailwind components/Collection";
import useCategory from "../hooks/useCategory";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function HomePage() {
  // const [allCategories] = useCategory();
  const [products, setProducts] = useState([]);
  const categories = useCategory();
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState();
  const [value, setValue] = React.useState([0, 1000]);
  const [filterTimeout, setFilterTimeout] = useState(null);
  const [size, setSize] = useState([]);
  const [colors, setColors] = useState([]);
  const [brand, setBrand] = useState([]);

  const sizeOptions = ShoeSize.map((size, index) => ({
    label: size,
    value: size,
    id: index,
  }));

  const colorOptions = ShoeColor.map((color, index) => ({
    label: color,
    value: color,
    id: index,
  }));

  const brandOptions = brands.map((brand, index) => ({
    label: brand,
    value: brand,
    id: index,
  }));

  // getTotal count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTotal();
  }, []);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // fileter by categories
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    filterProducts();
  }, [checked, size, colors, brand]);

  // const filter products
  const filterProducts = async () => {
    const formattedColors = colors.join("-");
    const formattedSize = size.join("-");
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-filters`,
        { checked, value, size: formattedSize, colors: formattedColors, brand },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      console.log(error.message);
      toast.error("somethinh went wrong");
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Function to format the value with a dollar sign
  const valuetext = (value) => {
    return `$${value}`;
  };

  // Filter products with a delay
  const filterProductsWithDelay = (newValue) => {
    if (filterTimeout) {
      clearTimeout(filterTimeout); // Clear the previous timeout
    }

    // Set a new timeout to filter after 2000ms (2 seconds)
    const newFilterTimeout = setTimeout(() => {
      filterProducts();
    }, 1500);

    setFilterTimeout(newFilterTimeout);
  };

  // useEffect
  useEffect(() => {
    filterProductsWithDelay(value);
  }, [value]);

  return (
    <Layout title={"All Products - Best Offers"}>
      <HomeIntro />
      <Collection />
      <div className="row mt-3">
        <div className="col-md-3">
          <h4 className="text-center">Fileter by categorty</h4>
          <div className="d-flex flex-column m-2">
            {categories?.map((c) => (
              <FormControlLabel
                key={c._id}
                control={
                  <Checkbox
                    checked={checked.includes(c._id)}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                    color="primary"
                  />
                }
                label={<h6>{c.name}</h6>}
              />
            ))}
          </div>

          {/* price filter */}
          <h4 className="text-center mt-4">Fileter by Prices</h4>
          <div className="container m-2">
            <Box sx={{ width: 300 }} className="w-100">
              <div className="d-flex flex-row  justify-align-align-content-between">
                <>
                  <p className="me-3 fw-bold">Low: ${value[0]}</p>
                  <Slider
                    className="me-3"
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={valuetext} // Use the valuetext function to format the label
                    min={0}
                    max={1000}
                    size="big"
                    sx={{
                      "& .MuiSlider-valueLabel": {
                        borderRadius: "50%", // Adjust the label border-radius
                        padding: "4px", // Adjust the padding for value label
                        fontSize: "15px",
                      },
                    }}
                  />
                  <p className="fw-bold">High: ${value[1]}</p>
                </>
              </div>
            </Box>
          </div>

          {/* {sizes} */}
          <div className="row m-2">
            <h4 className="text-center">Sizes</h4>
            <CreatableSelect
              isMulti
              className="mb-3 "
              options={sizeOptions}
              onChange={(selectedOptions) => {
                // Extract the selected size values
                const selectedSizes = selectedOptions.map(
                  (option) => option.value
                );
                setSize(selectedSizes);
              }}
              placeholder="Please Select a size"
            />
          </div>

          {/* colors */}

          <div className="row m-2">
            <h4 className="text-center">Colors</h4>
            <CreatableSelect
              isMulti
              className="mb-3"
              options={colorOptions}
              onChange={(selectedOptions) => {
                // Extract the selected size values
                const selectedColors = selectedOptions.map(
                  (option) => option.value
                );

                setColors(selectedColors);
                console.log(colors);
              }}
              placeholder="Please Select a color"
            />
          </div>

          {/* brands */}
          <div className="row m-2">
            <h4 className="text-center">Brands</h4>
            <CreatableSelect
              isMulti
              className="mb-3"
              options={brandOptions}
              onChange={(selectedOptions) => {
                // Extract the selected brand values
                const selectedBrands = selectedOptions.map(
                  (option) => option.value
                );

                setBrand(selectedBrands); // Update selected brands
              }}
              placeholder="Please Select a Brand"
            />
          </div>

          <div className="d-flex flex-column m-2 w-75">
            <button
              type="button"
              className="mt-1 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center mb-4 font-bold text-3xl">All Products</h1>
          <div className="d-flex flex-wrap justify-content-around">
            {products?.map((p) => (
              <ProductCard p={p} key={p._id} />
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length > 0 && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
