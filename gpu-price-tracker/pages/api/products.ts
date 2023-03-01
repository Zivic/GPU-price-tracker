import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prismaClient.d";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {},
  } = req;
  // ... you will write your Prisma Client queries here
  async function main() {
    const products = await prisma.product.findMany({
      include: {
        prices: true,
      },
    });
    const withLowestPrice = products.map((product:Product) => {
      //TODO: find a cleaner way
      const lowestPrice = product.prices.sort(
        (a, b) => Number(a.price) - Number(b.price)
      )[0];

      return {
        ...product,
        lowestPrice: `${lowestPrice.price}  ${lowestPrice.currency}`,
      };
    });
    if (withLowestPrice) res.status(200).json(withLowestPrice);
    else res.status(404).json("Not found");
  }
  await main();
};
export default handler;
