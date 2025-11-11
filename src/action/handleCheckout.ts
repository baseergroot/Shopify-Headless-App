"use server"

import { CheckoutCreateMutation, storeFront } from "@/lib/graphql"
import { redirect } from "next/navigation"

const handleCheckout = async (variantId: any) => {
    // Log what we're sending
    console.log("Sending variantId:", variantId)
    
    const variables = {
        lineItems: [{
            variantId,
            quantity: 1
        }]
    }
    
    console.log("Variables being sent:", JSON.stringify(variables, null, 2))

    const res = await storeFront(CheckoutCreateMutation, variables)

    // Log complete response
    console.log("Complete checkout response:", JSON.stringify(res, null, 2))
    
    if (res.errors) {
        console.error("Checkout errors:", res.errors)
        throw new Error("Failed to create checkout")
    }

    console.log("Checkout URL:", res.data.cartCreate.cart.checkoutUrl)

    redirect(res.data.cartCreate.cart.checkoutUrl) 
}

export default handleCheckout