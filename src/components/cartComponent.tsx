import { CartQueryResponse } from "@/lib/types";

export default function CartComponent({ cartResponse }: { cartResponse: CartQueryResponse }) {
    // 1. Get the main cart object and destructure the key properties
    const cart = cartResponse.data.cart;
    const items = cart.lines.edges;
    const totalAmount = cart.cost.totalAmount.amount;
    const currencyCode = cart.cost.totalAmount.currencyCode;

    if (items.length === 0) {
        return <div className="cart-empty">Your cart is empty!</div>;
    }

    return (
        <div className="p-4 w-80 max-h-[600px] overflow-y-auto bg-white shadow-2xl rounded-lg border">
            
            <h3 className="text-lg font-bold mb-3 border-b pb-2">Your Cart ({items.length})</h3>

            {/* Item List */}
            <div className="space-y-3 mb-4">
                {items.map((item) => (
                    <div key={item.node.id} className="flex gap-3 items-start">
                        
                        {/* Image */}
                        <img
                            src={item.node.merchandise.image.url}
                            alt={item.node.merchandise.image.altText || item.node.merchandise.title}
                            className="w-14 h-14 object-cover rounded shrink-0"
                        />
                        
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">{item.node.merchandise.title}</p>
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Qty: **{item.node.quantity}**</span>
                                <span className="font-medium text-gray-700">
                                    {item.node.merchandise.price.amount} {item.node.merchandise.price.currencyCode}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary and Action */}
            <div className="pt-3 border-t">
                
                <div className="flex justify-between items-center mb-3">
                    <span className="text-md font-semibold">Subtotal:</span>
                    <span className="text-lg font-bold text-indigo-600">
                        {totalAmount} {currencyCode}
                    </span>
                </div>

                {/* THE ESSENTIAL CHECKOUT URL */}
                <a
                    href={cart.checkoutUrl} // <-- This is the crucial URL
                    className="w-full text-center block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Proceed to Checkout
                </a>
            </div>
        </div>
    );
}