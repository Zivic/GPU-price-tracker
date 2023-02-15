import React from "react";

const Product = ({product}: any) => {
  console.log("posts", product);
  console.log("name", product.name);
  console.log("price", product.price);
  console.log("ide", product.id);


  return (
    <div>
      <h1>{product.name}</h1>
      <h1>{product.price}</h1>
      <h1>{product.id}</h1>
    </div>
  );
};

export default Product;


