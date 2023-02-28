import Product from "@/components/Product";
import products from "@/utils/data/products";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string; posts: { id: string; name: string; price: string } };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let product;
  const data = await getData(params.id).then((data) => {
    product = data;
    // console.log(data);
  });

  return (
    <div>
      <h1>This is the dynamic page</h1>
      <Product product={product} />
    </div>
  );
}
// This gets called on every request
async function getData(id: string | number) {
  // Fetch data from external API
  return await fetch(`http://localhost:3000/api/product/${id}`)
    .then((res) => {
      return res.json()
    .then((data) => {
      // console.log("Inside:" ,data);
      return data;
    });
  })

}
