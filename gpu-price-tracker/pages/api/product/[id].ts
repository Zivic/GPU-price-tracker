import type { NextApiRequest, NextApiResponse } from 'next';

// fake data
import products from '@/utils/data/products';

 const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req

  const product = products.find(x => x.id === id);
  res.status(200).json(product);
}

export default handler;