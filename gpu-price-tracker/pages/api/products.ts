import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prismaClient";
import { addLowestPrice } from "@/utils/helper";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { manufacturers, vram, priceMax, searchString },
  } = req;
  // ... you will write your Prisma Client queries here
  async function main() {
    let products: Array<Product>;
    let productsFilteredByManufacturer: Array<Product>;
    let productsFilteredByVram: Array<Product>;

    if (searchString) {
      console.log("api: searchString: ", searchString);
      products = await prisma.product.findMany({
        where: {
          name: {
            search: searchString,
          },
        },
        include: {
          prices: true,
        },
      });
    } else {
      let manufacturers;
      let vram;
      let priceMax = req.query.priceMax ? req.query.priceMax : 999999;

      if (typeof req.query.manufacturers === "string") {
        manufacturers = req.query.manufacturers?.split(",");
      }

      if (typeof req.query.vram === "string") {
        vram = req.query.vram?.split(",");
      }
      console.log("api: Query: ", req.query);
      console.log("api: Manufacturers: ", manufacturers);
      console.log("api: priceMax: ", priceMax);

      if (!manufacturers || manufacturers[0] === "") {
        //default
        productsFilteredByManufacturer = await prisma.product.findMany({
          where: {
            prices: {
              some: {
                price: {
                  lt: priceMax,
                },
              },
            },
          },
          include: {
            prices: true,
          },
        });
      } else {
        productsFilteredByManufacturer = await prisma.product.findMany({
          where: {
            manufacturer: {
              in: manufacturers,
            },
            prices: {
              some: {
                price: {
                  lt: priceMax,
                },
              },
            },
          },
          include: {
            prices: true,
          },
        });
      }

      if (!vram || vram[0] === "") {
        //default
        productsFilteredByVram = await prisma.product.findMany({
          where: {
            prices: {
              some: {
                price: {
                  lt: priceMax,
                },
              },
            },
          },
          include: {
            prices: true,
          },
        });
      } else {
        productsFilteredByVram = await prisma.product.findMany({
          where: {
            memory: {
              in: vram,
            },
            prices: {
              some: {
                price: {
                  lt: priceMax,
                },
              },
            },
          },
          include: {
            prices: true,
          },
        });
      }

      let filteredProducts = productsFilteredByManufacturer.filter((product1) =>
      productsFilteredByVram.some((product2) => product1.id === product2.id)
    );
    products = filteredProducts;
    }



    const withLowestPrice = addLowestPrice(products);
    if (withLowestPrice) res.status(200).json(withLowestPrice);
    else res.status(404).send(404);
  }
  await main();
};
export default handler;
