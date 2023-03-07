import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prismaClient.d";
import { addLowestPrice } from "@/utils/helper";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { manufacturers, priceMax },
  } = req;
  // ... you will write your Prisma Client queries here
  async function main() {
    let manufacturers;
    let priceMax = req.query.priceMax ? req.query.priceMax : 999999;

    if (typeof req.query.manufacturers === "string") {
      manufacturers = req.query.manufacturers?.split(",");
    }
    console.log("api: Query: ", req.query);
    console.log("api: Manufacturers: ", manufacturers);
    console.log("api: priceMax: ", priceMax);

    let products;

    if (!manufacturers || manufacturers[0] === "") {
      //default
      products = await prisma.product.findMany({
        where: {
          prices: {
            some:{
              price: {
                lt: priceMax
              }
            }
          }
        },
        include: {
          prices: true,
        },
      });
    } else {
      products = await prisma.product.findMany({
        where: {
          manufacturer: {
            in: manufacturers,
          },
          prices: {
            some:{
              price: {
                lt: priceMax
              }
            }
          }
        },
        include: {
          prices: true,
        },
      });
    }
    
    const withLowestPrice = addLowestPrice(products);
    if (withLowestPrice) res.status(200).json(withLowestPrice);
    else res.status(404).send(404);
  }
  await main();
};
export default handler;
