import Product from "@/components/Product";
import products from "@/utils/data/products";

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
  return await fetch(`http://localhost:3000/api/product/${id}`).then((res) => {
    return res.json().then((data) => {
      return data;
    });
  });
}
