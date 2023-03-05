"use client";
import React, { useState, useEffect, FC} from "react";
import Sidebar from "./Sidebar";
import CardList from "./CardList";

const BrowseProducts: React.FC<{}> = () => {
    const [products, setProducts] = useState<Object[]>([]);

    useEffect(() => {
      getProducts();
    }, []);

    const getProducts = () => {
      fetch("http://localhost:3000/api/products")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((err) => console.error(err));
    };

    function getProductsByFilter  (filter:Object)  {
      fetch("http://localhost:3000/api/products/" + filter)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((err) => console.error(err));
    };

    return (
      <div className="flex">
        <Sidebar filterProducts={getProductsByFilter} />
        <div className="flex justify-center px-40">
          {/* <h1>Browse window</h1> */}
          <CardList cardData = {products}/>
        </div>
      </div>
    );
  };
export default BrowseProducts;
