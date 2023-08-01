import React from "react";
import Link from "next/link";

const Card = ({ data }: any) => {
  // console.log("card data:", data);
  // console.log("price:", data.price);
  return (
    <div className="w-64 h-auto rounded-lg  m-4 shadow-lg  bg-[#222222] p-6 ">
      <img
        className="rounded-lg w-full  "
        // src="https://media.ldlc.com/r1600/ld/products/00/05/72/62/LD0005726238_1.jpg"
        src={data.image}
        data-testid="cardImage"
        alt="image"
      ></img>
      <div className="flex flex-col text-left mt-4">
        <div className="h-24">
          <p className=" text-sm text-center" data-testid="cardBrand">
            {data.manufacturer}
          </p>
          <p className=" text-sm " data-testid="cardTitle">
            {data.name}
          </p>
        </div>
        <div className="align-bottom">
          <div className="flex  bottom-0 justify-between">
            <span
              className=" text-xl font-bold self-end"
              data-testid="cardPrice"
            >
              {data.lowestPrice}
            </span>
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
                href={`/product/${data.id}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded right-0"
                data-testid="cardBuyLink"
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
