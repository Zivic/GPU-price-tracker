export const addLowestPrice = (products: Array<Product>) => 
  products.map((product: Product) => {
    let currencyFormatter = new Intl.NumberFormat('sr-RS', { //TODO: generalize to more currencies
      style: 'currency',
      currency: 'RSD',
    });
    //TODO: find a cleaner way
    const lowestPrice = product.prices.sort(
      (a, b) => Number(a.price) - Number(b.price)
    )[0];

    return {
      ...product,
      lowestPrice: `${ currencyFormatter.format(lowestPrice.price)}`,
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
