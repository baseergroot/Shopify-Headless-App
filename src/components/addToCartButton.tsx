"use client"

import createCart from "@/action/createCart";
import { useState } from "react";


const AddToCartButton = ({ productId }: any) => {
    // console.log("AddToCartButton productId:", productId);
    const [checkoutUrl, setCheckoutUrl] = useState<string>("");

    return (
        <>
            <button
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                onClick={async () => {
                    const response = await createCart(productId)
                    setCheckoutUrl(response.checkoutUrl)
                }}
            >
                Add to cart
            </button>
            {checkoutUrl && (
                <div className="mt-4 text-center">
                    <a
                        href={checkoutUrl}
                        className="text-indigo-600 hover:text-indigo-500"
                    >
                        Checkout
                    </a>
                </div>
            )}
        </>
    )
}

export default AddToCartButton