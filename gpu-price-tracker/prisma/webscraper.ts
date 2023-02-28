import products from "@/utils/data/products";
import { Prisma, PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { UploadImage } from "../utils/data/cloudinary";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  await fetch("http://localhost:3000/api/scraper")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.results.forEach(async (_product: any) => {
        // console.log(product);
        // console.log(product);
          const uploadedImageURL: string = UploadImage(
            _product.full_image_link,
            _product.name
          );

        const priceAndCurrency = (_product.price as String).split(" ");
        //TODO: find a cleaner solution for parsing price
        const price = ( Number(priceAndCurrency[0].replace(".", "").replace(",00", "")))
        const currency = priceAndCurrency[1];
        const manufacturer = (_product.information[0] as String)?.split(": ")[1];
        const memoryInterface = (_product.information[1] as String)?.split(
          ": "
        )[1];
        const memory = (_product.information[2] as String)?.split(": ")[1];
        const processorFrequency = (_product.information[3] as String)?.split(
          ": "
        )[1];
        const memoryFrequency = (_product.information[4] as String)?.split(
          ": "
        )[1];
        const guarantee = (_product.information[5] as String)?.split(": ")[1];
        // TODO: insert products into database:
        // console.log(image)
        const upsertProduct = await prisma.product.upsert({
          where: {
            name: _product.name,
          },
          update: {
            image: uploadedImageURL,
            // prices:{
            //       connectOrCreate: {
            //         price: new Decimal(29999),
            //         currency: "RSD",
            //         store: "Monitor System"
            //       },
            // },
            manufacturer: manufacturer,
            memoryInterface: memoryInterface,
            memory: memory,
            processorFrequency: processorFrequency,
            guarantee: guarantee
          },
          create: {
            name: _product.name,
            image: uploadedImageURL,
            // prices:{
            //       create: {
            //         price: new Decimal(29999),
            //         currency: "RSD",
            //         store: "Monitor System"
            //       },

            // },
            
            manufacturer: manufacturer,
            memoryInterface: memoryInterface,
            memory: memory,
            processorFrequency: processorFrequency,
            guarantee: guarantee
          },
        });
        const upsertPrice = await prisma.prices.upsert({
          where:{
            storeIdentifier: {
              productId: upsertProduct.id,
              store: "Monitor System"
            }
          },
          create:{
                    price: new Decimal(price),
                    currency: "RSD",
                    store: "Monitor System",
                    product:{ 
                      connect:{
                         id: upsertProduct.id
                        }
                      }
          },
          update:{
            price: new Decimal(price),
          }
        })
      });

    })
    .catch((err) => console.log(err));
  }
main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
