"use server"
import { storeFront, updateCartQuery } from "@/lib/graphql";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";


export default async function UpdateCart( lineId: string, quantity: string | number) {

    const cartId = (await cookies()).get("cartId")?.value
    // TODO: update the cart
    const response = await storeFront(updateCartQuery, { cartId, lineId, quantity })
    console.log( "UpdatedCart: ", response );
    
    revalidatePath('/cart')
}