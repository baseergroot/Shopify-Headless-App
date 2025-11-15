import CartComponent from "@/components/cartComponent";
import CartLogic from "@/lib/cartLogic";

export default async function CartPage() {
    const cartData = await CartLogic()

    if (!cartData) {
        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                    <div className="flex flex-col items-center justify-center py-32">
                        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
                        <a href="/products" className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                            Start Shopping
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-12">Shopping Cart</h1>
                <CartComponent cartResponse={cartData} isPopover={false} />
            </div>
        </div>
    )
}