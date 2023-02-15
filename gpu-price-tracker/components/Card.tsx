import React from "react";
import Link from "next/link";

const Card = ({ data }: any) => {
  // console.log("card data:", data);
  // console.log("price:", data.price);
  return (
    <div className="w-64 h-auto rounded-lg  m-4 shadow-lg bg-gradient-to-r from-gray-600 to-gray-700">
      <img
        className="rounded-t-lg"
        // src="https://media.ldlc.com/r1600/ld/products/00/05/72/62/LD0005726238_1.jpg"
        src={data.image}
      ></img>
      <div className="flex flex-col text-left m-4">
        <div className="h-24">
          <p className="text-black text-sm text-center">{data.brand}</p>
          <p className="text-black text-sm ">{data.title}</p>
        </div>
        <div className="align-bottom">
          <div className="flex  bottom-0 justify-between">
            <span className="text-black text-2xl self-end">{data.price}</span>
            <div className="flex  right-12 top-0.5 ">
              <span>3%</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                />
              </svg>
              <Link
                href="/product/1"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded right-0"
              >
                Buy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
