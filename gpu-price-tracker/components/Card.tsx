import React from "react";

const Card = () => {
  return (
    <div className="w-72 h-96 rounded-lg bg-slate-400 m-4 shadow-lg">
      <img
        className="rounded-lg"
        src="https://media.ldlc.com/r1600/ld/products/00/05/72/62/LD0005726238_1.jpg"
      ></img>
      <div className="flex flex-col text-center">
        <p className="text-gray-200 text-lg">RTX 3090</p>
        <p className="text-black text-xl"> ROG STRIX</p>
        <div className="relative">
          <span className="text-black text-xl">3000$</span>
          <div className="flex absolute right-12 top-0.5">
          <span >3%</span>
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
          </div>

        </div>
      </div>
    </div>
  );
};

export default Card;
