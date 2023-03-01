import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prismaClient.d";

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
    });
    res.status(200).json(product);
  }
  await main();
};
export default handler;
