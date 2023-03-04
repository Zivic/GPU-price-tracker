// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import next from "next";
import { resolve } from "path";
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

const url = "https://www.jakov.rs/kategorije/pci-express-nvidia";
const productContext = `.product_item_holder`;

const ScraperJakov = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const browser = await puppeteer.launch();
  try {
    await browser.newPage().then(async (page) => {
      return page.goto(url).then(async function () {
        page.waitForSelector(".pagination_nav");
        console.log("calling maxpages");
        let pagesAvailable = true;
        let currentPage = 1;
        let maxPage: number = await getMaxPages(page);

        while (currentPage < maxPage) {
          if (maxPage > 20)
            //hard cap
            break;

          console.log("iteration: ", currentPage);
          currentPage++;

          await page
            .waitForSelector(".product_item_wrap")
            .then(() => {
              return page.content();
            })
            .then((html) => {
              parsePage(html);
            })
            .then(() => {
              console.log("waiting");

              return page
                .waitForSelector(".pagination_nav > ul > li:last-child")
                .then(async (nextPageLink) => {
                  const textContent: string = await nextPageLink.evaluate(
                    (el) => el.textContent
                  );
                  // console.log("NextpageLink: ", textContent);
                  //Hinges on whether last page has this element
                  if (textContent.includes("❯")) {
                    console.log("Proceeding to next page...");
                    // await page.screenshot({path: 'test.png'});
                    await Promise.all([
                      page.click(".pagination_nav > ul > li:last-child"),
                      new Promise((resolve) => setTimeout(resolve, 500)),
                      // page.waitForNavigation({waitUntil:'networkidle0'})
                    ]);
                    return;
                  }
                  // await page.click(".pagination_nav > ul > li:last-child");
                });
            });
        }
      });
    });

    res.status(200).json({ name: "success" });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ name: "ERROR" });
  }
  await browser.close();
};
const getMaxPages = async (page) => {
  let maxPage = 10;
  await page
    .waitForSelector(".pagination_nav > ul > li:nth-last-child(2)")
    .then(async (nextPageLink) => {
      const textContent: string = await nextPageLink.evaluate(
        (el) => el.textContent
      );
      // console.log("NextpageLink22222: ", textContent);
      maxPage = Number(textContent);
    });
  return maxPage;
};

const parsePage = (html) => {
  //   console.log("CONTENTTTT", html);
  const $ = cheerio.load(html);
  // const link = $.find('.product_item_wrap').attr("href")

  // let prod = $(productContext).text()
  let products = new Array<Object>();
  $(productContext).each(async (i: any, el: any) => {
    const price = await $(el).find(".price").text();
    //what is this company doing....
    const name: string = $(el)
      .find("h2")
      .text()
      .replace("Grafička karta ", "")
      .replace("Grafička kartica ", "")
      .replace("Graficka kartica", "")
      .replace("Grafičke karte ", "")
      .replace("SVGA ", "")
      .replace("PCIE ", "")
      .replace("PCIe ", "")
      .replace("PCI-E ", "")
      .replace("GAMING ", "")
      .replace("Gaming ", "")
      .replace("VGA ", "")
      .replace("Geforcce", "GeForce")
      .replace("EGeForce", "GeForce");

    console.log("=======================");
    console.log("name", name);
    console.log("price", price);

    const splitRegex = new RegExp("\\s|-|/", "g");
    const model = name.split(splitRegex);
    const manufacturer = model[0];

    let memory;

    //if there's no space between [number] and GB eg. 8GB
    model.find((el) => {
      const gbIndex = el.search("GB");
      if (el.includes("GB") && el.split("")[gbIndex] !== " ") {
        //workaround for no string.splice in js
        const resplice = el.split("").splice(gbIndex, 0, " ").join("");

        memory = resplice;
      } else memory = el.includes("GB");
    });

    //warn: may overwrite [memory] multiple times  if name contains it multiple times
    // eg. name nVidia GeForce RTX 4090 24GB 384bit RTX 4090 X TRIO 24G
    //filters out memory size from irregular product names + adds space
    const memorySizeRegex = new RegExp("[0-9]+G", "g");
    if (!memory) {
      let realMemory;
      model.find((el) => { //TODO: don't go through each one, actually use [find]
        const isIrregular = memorySizeRegex.test(el);
        if (isIrregular) {
          console.log("[PARSING memory]");

          if (!el.endsWith(" GB")) {
            //not starting with 0 eg. 016GB, 08GB
            const num = el.match("[1-9]([0-9]?)+");
            console.log(" NUMBER ", num?.[0]);
            const newMemorySize = `${num?.[0]} GB`;
            console.log(" NEW ELEMENT", newMemorySize);
            realMemory = newMemorySize;
          }
        }
      });
      memory = realMemory;
    }

    console.log("memory", memory);
    console.log("manufacturer", manufacturer);
    products.push(model);
    // console.table(model);

    let prod = $(el).text();
    // console.log("productcontext", prod);
  });
  // console.table(products);
};

export default ScraperJakov;
