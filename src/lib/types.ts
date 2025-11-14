export interface Product {
  name: string;
  description: string;
  handle?: string;
  price?: {
    amount: string;
    currencyCode: string;
  };
  images: string[];
  id?: string;
  variants?: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    availableForSale: boolean;
  }[];
}