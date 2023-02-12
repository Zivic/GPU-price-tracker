import React from "react";
import Card from "./Card";
import ECommerceCard from "./ECommerceCard";

const testArray = new Array(20).fill(true,0,20);
const CardList = () => {
  return (
    //TODO: Responsive style for grid overlap on small viewports
    <div className="grid grid-cols-3 gap-4">
      {testArray.map((item, index) => {
        return <Card key={index} />;
      })}
    </div>
  );
};
export default CardList;