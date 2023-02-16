// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const cheerio  = require('cheerio');

type Data = {
  name: string;
};
const Scraper = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const response = await fetch(
      `https://www.eponuda.com/graficke-kartice-cene`
    );
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString)
    const searchContext = `div[class='product b-paging-product b-paging-product--vertical']`
    // const followerCountString = $(searchContext)
    //   .text()
    // //   .trim()
    // //   .match(/[0-9]/gi)
    // //   .join('')
    // console.log(followerCountString)

    const elements = $(searchContext)
    elements.each((idx:any,el:any) => $(el).text().trim())
        res.status(200).json({ name: "elements" });

  } catch (err) {
    console.error(err);
    res.status(400).json({ name: "Scraper error" })
  }
};

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: "John Doe" });
// }

export default Scraper;
// product b-paging-product b-paging-product--vertical
