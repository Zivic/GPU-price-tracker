import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prismaClient.d";
import { addLowestPrice } from "@/utils/helper";
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
    const withLowestPrice = addLowestPrice(products);
    if (withLowestPrice) res.status(200).json(withLowestPrice);
    else res.status(404).send(404);
  }
  await main();
};
export default handler;
