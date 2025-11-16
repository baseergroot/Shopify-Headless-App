import axios from "axios";

const url = process.env.SHOPIFY_STORE_URL;
const token = process.env.SHOPIFY_ACCESS_TOKEN;

if (!url || !token) {
  throw new Error(
    "Missing SHOPIFY_STORE_URL or SHOPIFY_ACCESS_TOKEN environment variables"
  );
}

const storeFront = async (query: string, variables = {}) => {
  try {
    const response = await axios.post(url,
      { query, variables },
      { headers: { "X-Shopify-Storefront-Access-Token": token } })

    return response.data
  } catch (error) {
    console.error("Error in storeFront function:", error);
    throw error;
  }

}

const getProductsQuery = ` query getProducts {
  products(first: 5) {
    edges {
      node {
        title
        description
        handle
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        media(first: 1) {
          edges {
            node {
              ... on MediaImage {
                image {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
} `

const getProductByHandleQuery = ` query getProductByHandle($handle: String!) {
  product(handle: $handle) {
    id
    title
    description
    variants(first: 10) {
      edges {
        node {
          id
          title
          price {
            amount
            currencyCode
          }
          availableForSale
        }
      }
    }
    images(first: 5) {
      edges {
        node {
          url
          altText
        }
      }
    }
    # Add any other fields you need
  }
} `


// Mutation to create a cart with one item

// Variables: merchandiseId (variant ID), quantity (Int)
const createCartMutation = ` 
mutation CreateCart($merchandiseId: ID!, $quantity: Int!) {
  cartCreate(
    input: {
      lines: [{ merchandiseId: $merchandiseId, quantity: $quantity }]
    }
  ) {
    cart {
      id              # <--- SAVE THIS ID!
      checkoutUrl     # You can link to this immediately
      lines(first: 100) {
        edges {
          node {
            quantity
            merchandise {
              ... on ProductVariant {
                title
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
    userErrors {
      message
    }
  }
} `

// add to cart mutation

// Variables: cartId (ID), merchandiseId (variant ID), quantity (Int)
const addToCartMutation = ` # MUTATION 2: Use this when cartId IS FOUND in local storage.
mutation AddToCart($cartId: ID!, $merchandiseId: ID!, $quantity: Int!) {
  cartLinesAdd(
    cartId: $cartId                 # <--- The ID you saved
    lines: [{ merchandiseId: $merchandiseId, quantity: $quantity }]
  ) {
    cart {
      id
      checkoutUrl
      # After adding the line, you query the full updated cart back:
      lines(first: 100) {
        edges {
          node {
            quantity
            merchandise {
              ... on ProductVariant {
                title
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
    userErrors {
      message
    }
  }
} `


// Query to get cart details

// variables: cartId (ID)
const getCartQuery = ` # QUERY: Use this when the user clicks 'View Cart' or loads the Cart page.
query GetCart($cartId: ID!) {
  cart(id: $cartId) {
    id
    checkoutUrl
    # You are querying the 'lines' array—this is all the items!
    lines(first: 100) {
      edges {
        node {
          id # The Line Item ID (used for updates/removals)
          quantity
          # The specific product information for the user to see
          merchandise {
            ... on ProductVariant {
              id
              title
              image {
                url
                altText
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
    # You are querying the total cost for display
    cost {
      totalAmount {
        amount
        currencyCode
      }
    }
  }
} `

// mutate cart

// variables {cartId, lineId, quantity}
const updateCartQuery = ` mutation UpdateCartQuantity($cartId: ID!, $lineId: ID!, $quantity: Int!) {
  cartLinesUpdate(
    cartId: $cartId
    lines: [
      {
        id: $lineId        # <-- The unique ID of the specific item/line
        quantity: $quantity # <-- The new desired quantity (e.g., 3)
      }
    ]
  ) {
    cart {
      # After the update, always query the full, fresh cart data back
      id
      checkoutUrl
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                title
              }
            }
          }
        }
      }
    }
    userErrors {
      message
      field
    }
  }
} `

export { storeFront, getProductsQuery, getProductByHandleQuery, createCartMutation, addToCartMutation, getCartQuery, updateCartQuery };
