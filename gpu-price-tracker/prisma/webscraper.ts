import { Decimal } from "@prisma/client/runtime";
import { UploadImage } from "../utils/data/cloudinary";
import { prisma } from "../utils/prismaClient";
//TODO: generalize this function so it works the same for any scraped site
// ... you will write your Prisma Client queries here
async function main() {
  //TODO: not fetch, util function ?
  await fetch("http://localhost:3000/api/scraper")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.results.forEach(async (product: any) => {
        console.log('product', product)
        
        const uploadedImageURL: string = UploadImage(
          product.fullImageLink,
          product.name
        );

        //Writing to DB
        const upsertProduct = await prisma.product.upsert({
          where: {
            name: product.name,
          },
          update: {
            image: uploadedImageURL,
            manufacturer: product.manufacturer,
            memoryInterface: product.memoryInterface,
            memory: product.memory,
            processorFrequency: product.processorFrequency,
            guarantee: product.guarantee,
          },
          create: {
            name: product.name,
            image: uploadedImageURL,
            manufacturer: product.manufacturer,
            memoryInterface: product.memoryInterface,
            memory: product.memory,
            processorFrequency: product.processorFrequency,
            guarantee: product.guarantee,
          },
        });

        const upsertPrice = await prisma.prices.upsert({
          where: {
            storeIdentifier: {
              productId: upsertProduct.id,
              store: product.store,
            },
          },
          create: {
            price: new Decimal(product.price),
            currency: "RSD",
            store: product.store,
            product: {
              connect: {
                id: upsertProduct.id,
              },
            },
          },
          update: {
            price: new Decimal(product.price),
          },
        });
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
