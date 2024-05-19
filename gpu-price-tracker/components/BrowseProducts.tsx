"use client";
import React, { useState, useEffect, FC } from "react";
import Sidebar from "./Sidebar";
import CardList from "./CardList";
import Navbar from "./Navbar";

const BrowseProducts: React.FC<{}> = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts();
  }, []);
  const sortProducts = (mode: string) => {
    const sortedProducts = products;
    switch (mode) {
      case "asc":
        sortedProducts.sort(
          (a, b) =>
            Number(a.lowestPrice.split(" ")[0]) -
            Number(b.lowestPrice.split(" ")[0])
        );
        setProducts([...sortedProducts]);
        break;

      case "dsc":
        sortedProducts.sort(
          (a, b) =>
            Number(b.lowestPrice.split(" ")[0]) -
            Number(a.lowestPrice.split(" ")[0])
        );
        setProducts([...sortedProducts]);
        break;

      case "name":
        sortedProducts.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        setProducts([...sortedProducts]);
        break;

      default: {
        console.error("Invalid sort argument");
        throw new Error("Invalid sort argument");
      }
    }
  };

  const getProducts = () => {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error(err));
  };

  const getProductsByFilter = (filter: any) => {
    console.log("filter", filter);
    fetch("http://localhost:3000/api/products?" + new URLSearchParams(filter))
      .then((response) => response.json())
      .then((data) => {
        console.table("FILTERED DATA:", data);
        setProducts(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Navbar isSearchActive={true} searchProducts = {getProductsByFilter}/>
      <div className="flex">
        <Sidebar filterProducts={getProductsByFilter} />
        <div className="flex justify-center w-full px-10 bg-dark-bg border-t-2 border-dark-border text-white ">
          {/* <h1>Browse window</h1> */}
          <CardList cardData={products} sortProducts={sortProducts} />
        </div>
      </div>
    </>
  );
};
export default BrowseProducts;
