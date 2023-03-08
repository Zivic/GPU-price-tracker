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
type Filter = {
  priceMin?: number;
  priceMax?: number;
  manufacturers: Array<string>;
};

const Sidebar = (props: { filterProducts: Function }) => {
  const [filters, setFilters] = useState<Filter>({ manufacturers: [] });
  const [maxPrice, setMaxPrice] = useState<number>();

  const handleManufacturerFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked: boolean = e.target.checked;
    const name: string = e.target.name;
    if (isChecked && !filters.manufacturers.includes(name))
      setFilters({
        ...filters,
        manufacturers: [...filters?.manufacturers, name],
      });
    else if(!isChecked){
      setFilters({
        ...filters,
        manufacturers: filters.manufacturers.filter((manufacturer) => manufacturer !== name),
      });
    }
  };
  const handlePriceFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setMaxPrice(Number(e.target.value));
    setFilters({
      ...filters, priceMax: Number(e.target.value)
    })
  };
  console.log("FILTERS: ", filters);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("clicked!")
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
        className=" top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {/* CHECKBOXES */}
          <label className="form-label">Manufacturers</label>

          <ul className="space-y-2 ml-8 mt-3">
            {testData.map((manufacturer, index) => {
              return (
                <li key={index}>
                  <input
                    type="checkbox"
                    name={manufacturer}
                    onClick={(e: any) => handleManufacturerFilter(e)}
                  />
                  <label className="ml-4">{manufacturer}</label>
                </li>
              );
            })}
          </ul>
          {/* PRICE SLIDER */}
          <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <li>
              <div className="relative pt-1">
                <label className="form-label">Max price</label>
                <div className="text-center ">
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
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg bg-orange-400 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white dark:text-gray-400"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="gem"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"
                  ></path>
                </svg>
                <button
                  type="submit"
                  className="ml-4 "
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
