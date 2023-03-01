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
interface Price {
  id: number;
  price: number;
  currency: string;
  store: string;
}
