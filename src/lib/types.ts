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
  }[] | undefined;
}

// Define other types as needed, e.g., Cart, CartItem, etc.

// Reusable Core Primitives
export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface Image {
  url: string;
  altText: string | null;
}

// Merchandise and Line Item Types
export interface CartMerchandise {
  id: string;
  title: string;
  image: Image;
  price: MoneyV2;
}

export interface CartLineNode {
  id: string;
  quantity: number;
  merchandise: CartMerchandise;
}

export interface CartLineEdge {
  node: CartLineNode;
}

// The Main Cart Type
export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: CartLineEdge[];
  };
  cost: {
    totalAmount: MoneyV2;
  };
}

// The Root GraphQL Response
export interface CartQueryResponse {
  data: {
    cart: Cart;
  };
}