import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  await fetch("http://localhost:3000/api/scraper")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.results.forEach((product: any) => {
        // console.log(product);
        
        //TODO: NEED TO FETCH IMAGE FIRST
        const priceAndCurrency = (product.price as String).split(" ");
        const price = priceAndCurrency[0];
        const currency = priceAndCurrency[1];

        const manufacturer = (product.information[0] as String).split(": ")[1]
        const memoryInterface = (product.information[1] as String).split(": ")[1]
        const memory = (product.information[2] as String).split(": ")[1];
        const processorFrequency = (product.information[3] as String).split(": ")[1]
        const memoryFrequency = (product.information[4] as String).split(": ")[1]
        const guarantee = (product.information[5] as String).split(": ")[1]
        // TODO: insert products into database:


      });
    })
    .catch((err) => console.log(err));

  // await prisma.product.create({
  //   data: {
  //     name: "Alice",

  //     email: "alice@prisma.io",

  //     posts: {
  //       create: { title: "Hello World" },
  //     },

  //     profile: {
  //       create: { bio: "I like turtles" },
  //     },
  //   },
  // });

  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     posts: true,

  //     profile: true,
  //   },
  // });

  // console.dir(allUsers, { depth: null });

  //   //UPDATE
  //   const post = await prisma.post.update({

  //     where: { id: 1 },

  //     data: { published: true },

  //   })

  //   console.log(post)
}

//   const allUsers = await prisma.user.findMany()

//   console.log("All users: ", allUsers)

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
