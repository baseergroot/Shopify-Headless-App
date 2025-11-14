"use server"

import { addToCartMutation, createCartMutation, storeFront } from "@/lib/graphql"
import { cookies } from "next/headers"

export default async function AddToCart(productId: string, quantity = 1): Promise<{cartId: string, checkoutUrl: string}> {

    // setup cookie 
    const cookie = await cookies()
    const cartId = cookie.get("cartId")?.value

    // if no cart id in cookie, create a new cart
    if (cartId) {
        // cart id exists, add to existing cart
        console.log("Existing cartId found in cookie:", cartId);

        // add to cart mutation
        const addToCart = await storeFront(addToCartMutation, {
            cartId: cartId,
            merchandiseId: productId,
            quantity
        })

        // log for debugging
        console.log("addToCart response:", addToCart.data.cartLinesAdd.cart.checkoutUrl);

        // return cart id
        return {
            cartId: addToCart.data.cartLinesAdd.cart.id,
            checkoutUrl: addToCart.data.cartLinesAdd.cart.checkoutUrl
        }

    } else {

        // no cart id, create new cart\
        console.log("No cartId found in cookie, creating new cart.");

        // create cart mutation
        const createCartResponse = await storeFront(createCartMutation, {
            merchandiseId: productId, quantity
        })

        // log for debugging
        console.log("createCartResponse:", createCartResponse.data.cartCreate.cart);

        // set cart id in cookie
        cookie.set("cartId", createCartResponse.data.cartCreate.cart.id, {
            httpOnly: process.env.NODE_ENV === "production",
            secure: process.env.NODE_ENV === "production",
        })

        // get cookie value for debugging
        console.log("cartId cookie set to:", cookie.get("cartId")?.value);

        // return cart id
        return {
            cartId: createCartResponse.data.cartCreate.cart.id,
            checkoutUrl: createCartResponse.data.cartCreate.cart.checkoutUrl
        }

    }
}