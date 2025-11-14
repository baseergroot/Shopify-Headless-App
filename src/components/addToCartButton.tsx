"use client"


const AddToCartButton = ({productId}: any) => {
    console.log("AddToCartButton productId:", productId);
    return (
        <button
            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
        >
            Add to cart
        </button>
    )
}

export default AddToCartButton