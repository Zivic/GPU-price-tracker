import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {},
  } = req;

  async function main() {
    // ... you will write your Prisma Client queries here
    const products = await prisma.product.findMany({
      include: {
        prices: true,
      },
    });
    const withLowestPrice = products.map((product) => {
        //TODO: find a cleaner way
        const lowestPrice = product.prices.sort(
            (a, b) => Number(a.price) - Number(b.price)
          )[0]
          
      return {
        ...product,
        lowestPrice: `${lowestPrice.price}  ${lowestPrice.currency}`,
      };
    });
    if (withLowestPrice) res.status(200).json(withLowestPrice);
    else res.status(404).json("Not found");
  }
  main();
};
export default handler;
