// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const cheerio = require("cheerio");
var fs = require("fs");
var http = require("http");
var https = require("https");
var Stream = require("stream").Transform;

type Data = {
  name: string;
  results?: Array<Object>;
};

type JSONResponse = {
  name: string;
};
const Scraper = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    //@ts-ignore
    let retval: ScrapedProduct = {store: "Monitor System"};

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
    const imageWrapperContext = ".product_single__compact_image";
    const imageContext = ".product_single__compact_headine__image";

    let products = new Array<Object>();
    $(productContext).each((i: any, el: any) => {
      retval.name = $(el).children(nameContext).text().trim();

      const priceAndCurrency: Array<string> = $(el)
        .children(priceContext)
        .children(priceContext2)
        .text()
        .trim()
        .split(" ");
      //TODO: find a cleaner solution for parsing price
      retval.price = Number(
        priceAndCurrency[0].replace(".", "").replace(",00", "")
      );
      retval.currency = priceAndCurrency[1];

      const information = $(el).children(infoContext).text().trim().split("  ");
      retval.manufacturer = (information[0] as String)?.split(": ")[1];
      retval.memoryInterface = (information[1] as String)?.split(": ")[1];
      retval.memory = (information[2] as String)?.split(": ")[1];
      retval.processorFrequency = (information[3] as String)?.split(": ")[1];
      retval.memoryFrequency = (information[4] as String)?.split(": ")[1];
      retval.guarantee = (information[5] as String)?.split(": ")[1];

      const image: string = $(el)
        .children(imageWrapperContext)
        .children(imageContext)
        .attr("src");
      const bigImage = image.replace("200x200", "1000x1000");
      const fullImageLink = "https://www.monitor.rs/" + bigImage;
      const img_name_clean = image.replace(/^(.+?\.(gif|png|jpe?g)).*$/i, "$1");
      // console.log(fullImageLink);
      // console.log(img_name_clean);
      retval.fullImageLink = fullImageLink
      // console.log("retval", retval);

      products.push(retval);
    });

    res.status(200).json({ name: "success", results: products });
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
