// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const cheerio = require("cheerio");

type Data = {
  name: string;
  results?: Array<Object>;
};

type JSONResponse = {
  name: string;
};
const Scraper = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const response = await fetch(
      `https://www.monitor.rs/graficke-karte?limit=48&sort=artid_desc&strana=0&price_retail=Min:4050-Max:465355&`
    );
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const productContext = `.product_single__compact_information`;
    const nameContext = ".product_single__compact_url";
    const priceContext = ".product_single__compact_price";
    const priceContext2 = ".product_single__compact_price_discount"; //It is nested
    const infoContext = ".product_single__compact_attributes";



    let products = new Array<Object>();
    $(productContext).each((i: any, el: any)=> {
      const name = $(el).children(nameContext).text().trim();
      const price = $(el).children(priceContext).children(priceContext2).text().trim();
      const information = $(el).children(infoContext).text().trim().split("  ");
        // console.log("NAME:", name);
        // console.log("PRICE", price);
        products.push({name:name, price:price, information: information})
    })

    res.status(200).json({ name: "success", results: products});
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ name: "ERROR" });
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
