/**
 * Defines the object the exact way it is recieved from the DB
 * @interface Product
 */
interface Product {
  id: number;
  name: string;
  lowestPrice: string;
  image: string;
  manufacturer: string;
  memoryInterface: string;
  memory: string;
  processorFrequency: string;
  memoryFrequency: string;
  guarantee: string;
  prices: [Price];
}

/**
 * Defines the object returned from scraper functions.
 * @remark
 * Contains product data which will be saved to the database
 * @interface ScrapedProduct
 */
interface ScrapedProduct {
  store: string;
  name: string;
  fullImageLink: string;
  price: number;
  currency: string;
  manufacturer: string;
  memoryInterface: string;
  memory: string;
  processorFrequency: string;
  memoryFrequency: string;
  guarantee: string;
}

/**
 *Defines the object the exact way it is recieved from the DB
 *
 * @interface Price
 */
interface Price {
  id: number;
  price: number;
  currency: string;
  store: string;
}
