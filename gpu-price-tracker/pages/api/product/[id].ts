import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prismaClient";
import { addLowestPriceSingle } from "@/utils/helper";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;
  // ... you will write your Prisma Client queries here
  async function main() {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        prices: true,
      },
    })
    if(product){
      const withLowestPrice = addLowestPriceSingle(product);
      res.status(200).json(withLowestPrice);
    }
    else res.status(404).send(404);

  }
  await main();
};
export default handler;
