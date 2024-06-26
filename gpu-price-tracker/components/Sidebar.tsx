"use client";
import React from "react";
import PriceSlider from "./PriceSlider";
import { useState } from "react";
const testData = [
  "MSI",
  "Gigabyte",
  "Asus",
  "Sapphire",
  "Powercolor",
  "XFX",
  "AS Rock",
  "Inno3D",
];

const testDataVram = [
  "24 GB",
  "20 GB",
  "16 GB",
  "12 GB",
  "8 GB",
  "4 GB",
  "2 GB",
  "1 GB",
];
type Filter = {
  priceMin?: number;
  priceMax?: number;
  manufacturers: Array<string>;
  vram: Array<string>;

};

const Sidebar = (props: { filterProducts: Function }) => {
  const [filters, setFilters] = useState<Filter>({ manufacturers: [], vram:[] });
  const [maxPrice, setMaxPrice] = useState<number>();

  const handleManufacturerFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked: boolean = e.target.checked;
    const name: string = e.target.name;
    if (isChecked && !filters.manufacturers.includes(name))
      setFilters({
        ...filters,
        manufacturers: [...filters?.manufacturers, name],
      });
    else if (!isChecked) {
      setFilters({
        ...filters,
        manufacturers: filters.manufacturers.filter(
          (manufacturer) => manufacturer !== name
        ),
      });
    }
  };
  
  const handleVramFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked: boolean = e.target.checked;
    const name: string = e.target.name;
    if (isChecked && !filters.vram.includes(name))
      setFilters({
        ...filters,
        vram: [...filters?.vram, name],
      });
    else if (!isChecked) {
      setFilters({
        ...filters,
        vram: filters.vram.filter(
          (vram) => vram !== name
        ),
      });
    }
  };
  

  const handlePriceFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setMaxPrice(Number(e.target.value));
    setFilters({
      ...filters,
      priceMax: Number(e.target.value),
    });
  };
  console.log("FILTERS: ", filters);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("clicked!");
    e.preventDefault;
    props.filterProducts(filters);
  };
  return (
    <>
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="separator-sidebar"
        className=" top-0 left-0 z-40 w-64  transition-transform -translate-x-full sm:translate-x-0 text-sm"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-dark-bg border-r-2 border-t-2 border-dark-border text-dark-text">
          {/* CHECKBOXES */}
          <label className="form-label font-medium text-base ml-8 text-gray-300">
            Manufacturers
          </label>

          <ul className="space-y-2 ml-8 my-4">
            {testData.map((manufacturer, index) => {
              return (
                <li key={index}>
                  <div className="mt-3">
                    <input
                      className="relative peer shrink-0 appearance-none w-4 h-4 rounded-sm bg-[#343434] checked:bg-blue-500"
                      type="checkbox"
                      name={manufacturer}
                      onClick={(e: any) => handleManufacturerFilter(e)}
                    />
                    <label className="ml-4">{manufacturer}</label>
                    <svg
                      className="
                      absolute 
                      w-3 h-3 -mt-[18px] ml-[2px]
                      hidden peer-checked:block
                      pointer-events-none
                      "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* VRAM */}
          <label className="form-label font-medium text-base ml-8 text-gray-300">
            VRAM
          </label>

          <ul className="space-y-2 ml-8 my-4">
            {testDataVram.map((vram, index) => {
              return (
                <li key={index}>
                  <div className="mt-3">
                    <input
                      className="relative peer shrink-0 appearance-none w-4 h-4 rounded-sm bg-[#343434] checked:bg-blue-500"
                      type="checkbox"
                      name={vram}
                      onClick={(e: any) => handleVramFilter(e)}
                    />
                    <label className="ml-4">{vram}</label>
                    <svg
                      className="
                      absolute 
                      w-3 h-3 -mt-[18px] ml-[2px]
                      hidden peer-checked:block
                      pointer-events-none
                      "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </li>
              );
            })}
          </ul>
          {/* PRICE SLIDER */}
          <ul className="mt-4 space-y-2  dark:border-gray-700 mx-4 my-4">
            <li>
              <div className="relative pt-1">
                <label className="form-label font-medium text-base ml-4 text-gray-300">
                  Max price
                </label>
                <div className="text-center mt-4">
                  <label className="form-label text-center">{maxPrice}</label>
                </div>
                <input
                  type="range"
                  onChange={(e) => handlePriceFilter(e)}
                  className="form-range w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
                  min="0"
                  max="300000"
                  step="10000"
                  id="customRange2"
                />
              </div>
            </li>
            <li>
              <button
                type="submit"
                className=" bg-blue-500 hover:bg-blue-700 text-white font-medium  py-1 px-6 rounded-lg"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
