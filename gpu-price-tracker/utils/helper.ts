let currencyFormatter = new Intl.NumberFormat('sr-RS', { //TODO: generalize to more currencies
  style: 'currency',
  currency: 'RSD',
});

export const addLowestPrice = (products: Array<Product>) => 
  products.map((product: Product) => {

    //TODO: find a cleaner way
    const lowestPrice = product.prices.sort(
      (a, b) => Number(a.price) - Number(b.price)
    )[0];

    return {
      ...product,
      lowestPrice: `${lowestPrice.price}  ${lowestPrice.currency}`,
      lowestPriceFormatted: `${currencyFormatter.format(lowestPrice.price)}`,
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
    lowestPriceFormatted: `${currencyFormatter.format(lowestPrice.price)}`,
  };
};
