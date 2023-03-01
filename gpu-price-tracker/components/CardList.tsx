"use client";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import ECommerceCard from "./ECommerceCard";

const testArray = new Array(20).fill(true, 0, 20);

//TODO: testing purposes only, this logic will be moved to backend
// const gigatronAPI: string =
//   "https://search.gigatron.rs/v1/catalog/get/racunari-i-komponente/komponente/graficke-karte?Gaming=!attr_valDa";

const CardList = () => {
  const [cardData, setCardData] = useState<Object[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = function () {
    // console.log("calling function gigatron");
    // fetch(gigatronAPI)
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setCardData(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    //TODO: Responsive style for grid overlap on small viewports
    <div className="grid grid-cols-3 gap-4">
      {cardData?.map((item, index) => {
        return <Card data={item} key={index} />;
      })}
    </div>
  );
};
export default CardList;
