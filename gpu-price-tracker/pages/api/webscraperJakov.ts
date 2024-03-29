// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import next from "next";
import { resolve } from "path";
import { Page } from "puppeteer";
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
    await browser.newPage().then(async (page: Page) => {
      return page.goto(url).then(async function () {
        page.waitForSelector(".pagination_nav");
        console.log("calling maxpages");
        let currentPage = 1;
        let maxPage: number = await getMaxPages(page);

        while (currentPage < maxPage) {
          if (maxPage > 20)
            //hard cap
            break;

          console.log("iteration: ", currentPage);
          currentPage++;

          //Waits until data is loaded (it loads skeletons otherwise)
          await page
            .waitForSelector(".product_item_wrap")
            .then(() => {
              return page.content();
            })
            .then((html: string) => {
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
                  //TODO: check whether this is needed ?
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

/**
 * @function
 * Finds the total number of pages the scraper will need to go through, by looking at the page footer
 * @param {*} page - The page object (first page)
 * @returns {Number} - The total number of pages that need to be scraped
 */
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

/**
 * Replaces all occurrences of unwanted words in the text with "" , effectively removing them.
 * @param {string} text - The text to modify.
 * @returns {string} - The modified sentence.
 */
const cleanupNames = (text: string) => {
  const trash = [
    "Grafička karta ",
    "Grafička kartica ",
    "Graficka kartica ",
    "Grafičke karte ",
    "Graficka karta ",
    "SVGA ",
    "PCIE ",
    "PCIe ",
    "PCIe ",
    "PCI-E ",
    "GAMING ",
    "Gaming ",
    "VGA ",
  ];
  return trash.reduce(
    (f, s, i) => `${f}`.replace(new RegExp(s, "ig"), ""),
    text
  );
};

/**
 * Uses cheerio to filter out product data from the page
 * @param {string} html - The entire html page, aka the page.content returned by puppeteer after the page loads completely.
 * @returns void
 * @todo Should return response with the product array, correctly formatted and typed
 */
const parsePage = (html: string) => {
  //   console.log("CONTENTTTT", html);
  const $ = cheerio.load(html);
  // const link = $.find('.product_item_wrap').attr("href")

  // let prod = $(productContext).text()
  let products = new Array<Object>();
  $(productContext).each(async (i: any, el: any) => {
    const price = await $(el).find(".price").text();
    const name: string = $(el).find("h2").text();
    const cleanName: string = cleanupNames(name);
    cleanName.replace("Geforcce", "GeForce").replace("EGeForce", "GeForce");

    console.log("=======================");
    console.log("name", cleanName);
    console.log("price", price);

    const splitRegex = new RegExp("\\s|-|/", "g");
    const model = cleanName.split(splitRegex);
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
      model.find((el) => {
        //TODO: don't go through each one, actually use [find]
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
