import React from "react";
import Card from "./Card";

const testArray = new Array(20).fill(true,0,20);
const CardList = () => {
  return (
    <div className="flex flex-wrap px-32">
      {testArray.map((item, index) => {
        return <Card key={index} />;
      })}
    </div>
  );
};
export default CardList;