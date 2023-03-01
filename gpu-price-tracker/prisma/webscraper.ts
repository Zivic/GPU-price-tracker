import { Decimal } from "@prisma/client/runtime";
import { UploadImage } from "../utils/data/cloudinary";
import { prisma } from "@/utils/prismaClient.d";

// ... you will write your Prisma Client queries here
async function main() {
  await fetch("http://localhost:3000/api/scraper")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.results.forEach(async (_product: any) => {
        const uploadedImageURL: string = UploadImage(
          _product.full_image_link,
          _product.name
        );

        //Parsing the data:
        const priceAndCurrency = (_product.price as String).split(" ");
        //TODO: find a cleaner solution for parsing price
        const price = Number(
          priceAndCurrency[0].replace(".", "").replace(",00", "")
        );
        const currency = priceAndCurrency[1];
        const manufacturer = (_product.information[0] as String)?.split(
          ": "
        )[1];
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

        //Writing to DB
        const upsertProduct = await prisma.product.upsert({
          where: {
            name: _product.name,
          },
          update: {
            image: uploadedImageURL,
            manufacturer: manufacturer,
            memoryInterface: memoryInterface,
            memory: memory,
            processorFrequency: processorFrequency,
            guarantee: guarantee,
          },
          create: {
            name: _product.name,
            image: uploadedImageURL,
            manufacturer: manufacturer,
            memoryInterface: memoryInterface,
            memory: memory,
            processorFrequency: processorFrequency,
            guarantee: guarantee,
          },
        });

        const upsertPrice = await prisma.prices.upsert({
          where: {
            storeIdentifier: {
              productId: upsertProduct.id,
              store: "Monitor System",
            },
          },
          create: {
            price: new Decimal(price),
            currency: "RSD",
            store: "Monitor System",
            product: {
              connect: {
                id: upsertProduct.id,
              },
            },
          },
          update: {
            price: new Decimal(price),
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
