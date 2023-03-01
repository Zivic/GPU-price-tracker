import Product from "@/components/Product";
import products from "@/utils/data/products";
import { notFound } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string; id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const data = await getData(params.id).then((data) => {
    return data;
  });

  return (
    <div>
      <h1>This is the dynamic page</h1>
      <Product product={data} />
    </div>
  );
}
// This gets called on every request
async function getData(id: string | number) {
  // Fetch data from external API
  return await fetch(`http://localhost:3000/api/product/${id}`)
    .then((res) => {
      // console.log("STATUS:", res.status);
      if (res.status === 404) throw new Error("Product data not found");
      return res.json().then((data) => {
        return data;
      });
    })
    .catch((err) => {
      notFound();
    });
}
