"use client"

import createCart from "@/action/createCart";
import { useState } from "react";

const AddToCartButton = ({ productId }: any) => {
    const [checkoutUrl, setCheckoutUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <button
                onClick={async () => {
                    setIsLoading(true)
                    const response = await createCart(productId)
                    setCheckoutUrl(response.checkoutUrl)
                    setIsLoading(false)
                }}
                disabled={isLoading}
                className="w-full mt-8 px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
                {isLoading ? 'Adding...' : 'Add to Cart'}
            </button>
            {checkoutUrl && (
                <div className="mt-4">
                    <a
                        href={checkoutUrl}
                        className="block text-center px-6 py-2 border border-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Proceed to Checkout
                    </a>
                </div>
            )}
        </>
    )
}

export default AddToCartButton