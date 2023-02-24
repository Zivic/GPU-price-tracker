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

var downloadImageToUrl = (
  url: string,
  filename: string,
  callback: Function
) => {
  var client = http;
  if (url.toString().indexOf("https") === 0) {
    client = https;
  }
  client
    .request(url, function (response: any) {
      var data = new Stream();
      response.on("data", function (chunk: any) {
        data.push(chunk);
      });
      response.on("end", function () {
        fs.writeFileSync(filename, data.read());
      });
    })
    .end();
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
    const imageWrapperContext = ".product_single__compact_image";
    const imageContext = ".product_single__compact_headine__image";

    let products = new Array<Object>();
    $(productContext).each((i: any, el: any) => {
      const name = $(el).children(nameContext).text().trim();
      const price = $(el)
        .children(priceContext)
        .children(priceContext2)
        .text()
        .trim();
      const information = $(el).children(infoContext).text().trim().split("  ");
      const image = $(el)
        .children(imageWrapperContext)
        .children(imageContext)
        .attr("src");
      const fullImageLink = "https://www.monitor.rs/" + image;
      const img_name_clean = image.replace(/^(.+?\.(gif|png|jpe?g)).*$/i, "$1");
      console.log(fullImageLink);

      console.log(img_name_clean);
      const filePath =
        "/home/djole/Documents/Repo/GPU-price-tracker/gpu-price-tracker/images/" +
        img_name_clean;
      downloadImageToUrl(fullImageLink, filePath, () => {});
      // try{
      //   fs.createWriteStream('/home/djole/Documents/Repo/GPU-price-tracker/gpu-price-tracker/images/'+img_name_clean)
      // }
      // catch {
      //   console.log("Error saving image to file system");
      // }
      // console.log("NAME:", name);
      // console.log("PRICE", price);
      // console.log("image:", image);

      products.push({ name: name, price: price, information: information });
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
