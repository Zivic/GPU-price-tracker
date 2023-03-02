// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const cheerio = require("cheerio");
var fs = require("fs");
var http = require("http");
var https = require("https");
var Stream = require("stream").Transform;
const puppeteer = require("puppeteer");
type Data = {
  name: string;
  results?: Array<Object>;
};

type JSONResponse = {
  name: string;
};

const ScraperJakov = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    const url = "https://www.jakov.rs/kategorije/pci-express-nvidia";
    const productContext = `.product_item_holder`;

    puppeteer
      .launch()
      .then((browser) => browser.newPage())
      .then(async (page) => {
        // await page.waitForTimeout(3000);
        return page.goto(url).then(function () {
          page
            .waitForSelector(".product_item_holder")
            .then(() => {
            //   console.log(page.content());
              return page.content();
            })
            .then((html) => {
            //   console.log("CONTENTTTT", html);
                  const $ = cheerio.load(html);
                  // let prod = $(productContext).text()
                  let products = new Array<Object>();
                  $(productContext).each((i: any, el: any) => {
                  let prod = $(el).text()
                  console.log("productcontext", prod)

                  })
            });
        });
      });

    res.status(200).json({ name: "success" });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ name: "ERROR" });
  }
};
export default ScraperJakov;
