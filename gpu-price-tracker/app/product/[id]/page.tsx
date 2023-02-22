import Product from "@/components/Product";
import products from "@/utils/data/products";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string, posts: { id: string, name: string, price: string } };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <h1>This is the dynamic page</h1>
      <Product product = {products[1]}/>
    </div>
  );
}
