import axios from "axios";

const url = process.env.SHOPIFY_STORE_URL;
const token = process.env.SHOPIFY_ACCESS_TOKEN;

if (!url || !token) {
  throw new Error(
    "Missing SHOPIFY_STORE_URL or SHOPIFY_ACCESS_TOKEN environment variables"
  );
}

const storeFront = async (query: string, variables = {}) => {
  const response = await axios.post(
    process.env.SHOPIFY_STORE_URL!,
    {
      query,
      variables,
    },
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN!,
      },
    }
  );

  return response.data;
};

// const gql = String.raw

const gqlQuery = `
query Products {
products(first: 6) {
edges {
node {
title
description

  images(first: 1) {
    edges {
      node {
        originalSrc
      }
    }
  }

  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  handle
    
}

}
}
}
`;

// const data = await storeFront(gqlQuery)

const ProductByHandleQuery = `
query ProductByHandle($handle: String!) {
  productByHandle(handle: $handle) {
    id
    title
    description
    images(first: 1) {
      edges {
        node {
          originalSrc
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    handle

    variants(first: 1) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    
  }
}
`;


const CheckoutCreateMutation = `
mutation createCart {
  cartCreate {
    cart {
      id
      checkoutUrl
    }
    userErrors {
      field
      message
    }
  }
}
`;


export { gqlQuery, storeFront, ProductByHandleQuery, CheckoutCreateMutation };
