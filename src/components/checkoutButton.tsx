"use client";

import { Button } from "./ui/button";
import handleCheckout from "@/action/handleCheckout";


const CheckoutButton = ({variantId}: any) => {
    console.log("Variant ID in Button:", variantId);
    
    return (
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        onClick={() => {
            handleCheckout(variantId);
        }}>
            Add to Cart
        </Button>
    )
}

export default CheckoutButton