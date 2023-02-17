// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const cheerio = require("cheerio");

type Data = {
  name: string;
  results?: Array<string>;
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
    const nameContext = productContext + ":first"
    const childContext = productContext + ":first"

    // const followerCountString = $(searchContext)
    //   .text()
    // //   .trim()
    // //   .match(/[0-9]/gi)
    // //   .join('')
    // console.log(followerCountString)

    const elements = $(productContext);
    let someObjArr = new Array();
      elements.contents().each((i:any, el:any ) => {
        console.log("i: ", i)
        if ($(el).hasClass('product_single__compact_url') ) {
          someObjArr.push({name: $(el).text().trim()});
      }
      })
    // const name = $(searchContext)
    // console.log("array?:", elements.contents());
    console.log("????:", someObjArr);

    
    elements.each((i: any, el: any) => $(el).text().trim());
    const parsedElements: Array<string> =  elements.text().trim().split("\n");
    // console.log(parsedElements)

    res.status(200).json({ name: "success" });
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
