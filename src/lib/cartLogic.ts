import { cookies } from "next/headers";
import { getCartQuery, storeFront } from "./graphql"


const CartLogic = async () => {

     // get cookie cart id
    const cookie = await cookies()
    const cartId = cookie.get("cartId")?.value

    // console.log("Cart ID from cookie:", cartId);
    // fetch cart data
    const cartData = await storeFront(getCartQuery, { cartId })

    // console.log("Cart Data:", cartData);

    return !cartId ? false : cartData
}

export default CartLogic