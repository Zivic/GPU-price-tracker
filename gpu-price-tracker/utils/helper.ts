export const addLowestPrice = (products: Array<Product>) => 
  products.map((product: Product) => {
    //TODO: find a cleaner way
    const lowestPrice = product.prices.sort(
      (a, b) => Number(a.price) - Number(b.price)
    )[0];

    return {
      ...product,
      lowestPrice: `${lowestPrice.price}  ${lowestPrice.currency}`,
    };
  })
;

export const addLowestPriceSingle = (product: Product) => {
  const lowestPrice = product.prices.sort(
    (a, b) => Number(a.price) - Number(b.price)
  )[0];

  return {
    ...product,
    lowestPrice: `${lowestPrice.price}  ${lowestPrice.currency}`,
  };
};
