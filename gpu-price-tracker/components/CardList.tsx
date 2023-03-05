"use client";
import React from "react";
import Card from "./Card";

const CardList = (props:{cardData: Array<Object>}) => {
  return (
    //TODO: Responsive style for grid overlap on small viewports
    <div className="grid grid-cols-3 gap-4">
      {props.cardData?.map((item, index) => {
        return <Card data={item} key={index} />;
      })}
    </div>
  );
};
export default CardList;
