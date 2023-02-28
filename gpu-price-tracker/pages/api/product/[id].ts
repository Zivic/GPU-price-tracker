import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// // fake data
// import products from '@/utils/data/products';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  async function main() {
    // ... you will write your Prisma Client queries here
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    // const product = products.find(x => x.id === id);
    // console.log(product);
    res.status(200).json(product);
  }
  main();
};
export default handler;
