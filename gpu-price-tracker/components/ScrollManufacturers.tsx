import React from "react";

const ScrollManufacturers = () => {
  // const companyNames = ["Tehnomedia","Monitor System","Jakov","Gigatron", "ITShop"]
  const manufacturers = [
    {
        name: "Nvidia",
        imageLink: "url(/Nvidia-Horizontal-Black-Logo.wine.svg)",
      },
      {
        name: "MSI",
        imageLink: "url(/msi.svg)",
      },
      {
        name: "ASUS",
        imageLink: "url(/asus.svg)",
      },
      {
        name: "Nvidia",
        imageLink: "url(/Nvidia-Horizontal-Black-Logo.wine.svg)",
      },
      {
        name: "MSI",
        imageLink: "url(/msi.svg)",
      },
      {
        name: "ASUS",
        imageLink: "url(/asus.svg)",
      },
      {
        name: "Nvidia",
        imageLink: "url(/Nvidia-Horizontal-Black-Logo.wine.svg)",
      },
      {
        name: "MSI",
        imageLink: "url(/msi.svg)",
      },
      {
        name: "ASUS",
        imageLink: "url(/asus.svg)",
      },
  ];

  //   style={{backgroundImage: manufacturer.imageLink}}
  return (
    <>
      <div className="gsap-banner flex flex-row">
        {manufacturers.map((manufacturer, i) => {
          return (
            <div
              key={i}
              className=" p-32 px-48 mr-2 bg-white"
              style={{
                backgroundImage: manufacturer.imageLink,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
          );
        })}
      </div>
    </>
  );
};

export default ScrollManufacturers;
