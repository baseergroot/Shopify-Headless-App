import { CartQueryResponse } from "@/lib/types";
import { Button } from "./ui/button";
import UpdateCart from "@/action/updateCart";
import CartCountUpdate from "./cartCountUpdate";

export default function CartComponent({ cartResponse, isPopover = true }: { cartResponse: CartQueryResponse; isPopover?: boolean }) {
	const cart = cartResponse.data.cart;
	const items = cart.lines.edges;
	const totalAmount = cart.cost.totalAmount.amount;
	const currencyCode = cart.cost.totalAmount.currencyCode;

	if (items.length === 0) {
		return (
			<div className={isPopover ? "p-6 text-center w-80" : "flex flex-col items-center justify-center py-32"}>
				<svg className={isPopover ? "w-8 h-8 mx-auto text-gray-400 mb-3" : "w-16 h-16 mx-auto text-gray-300 mb-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
				</svg>
				<p className={isPopover ? "text-sm text-gray-600" : "text-xl text-gray-600 mb-6"}>
					Your cart is empty
				</p>
				{!isPopover && (
					<a href="/products" className="inline-block px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
						Start Shopping
					</a>
				)}
			</div>
		);
	}

	if (isPopover) {
		// POPOVER MODE - Compact cart
		return (
			<div className="w-auto">
				<div className="p-4 border-b border-gray-200">
					<h3 className="font-semibold text-gray-900">Shopping Cart</h3>
					<p className="text-xs text-gray-500 mt-1">{items.length} item{items.length !== 1 ? 's' : ''}</p>
				</div>

				<div className="max-h-64 overflow-y-auto">
					<div className="divide-y divide-gray-200">
						{items.map((item) => (
							<div key={item.node.id} className="p-3 flex gap-3">
								<img
									src={item.node.merchandise.image.url}
									alt={item.node.merchandise.image.altText || item.node.merchandise.title}
									className="w-14 h-14 object-cover rounded bg-gray-100 shrink-0"
								/>
								<div className="flex-1 min-w-0">
									<p className="text-xs font-semibold text-gray-900 truncate">{item.node.merchandise.title}</p>
									<p className="text-xs text-gray-500 mt-0.5">Qty: {item.node.quantity}</p>
									<p className="text-xs font-bold text-gray-900 mt-1">
										{item.node.merchandise.price.amount}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="p-4 border-t border-gray-200 space-y-3">
					<div className="flex justify-between">
						<span className="text-sm text-gray-600">Subtotal</span>
						<span className="font-bold text-gray-900">{totalAmount}</span>
					</div>
					<a
						href={cart.checkoutUrl}
						className="w-full block text-center px-3 py-2 bg-gray-900 text-white text-sm font-semibold rounded hover:bg-gray-800 transition-colors"
						target="_blank"
						rel="noopener noreferrer"
					>
						Checkout
					</a>
					<a
						href="/cart"
						className="w-full block text-center px-3 py-2 border border-gray-300 text-gray-900 text-sm font-semibold rounded hover:bg-gray-50 transition-colors"
					>
						View Cart
					</a>
				</div>
			</div>
		);
	}

	// FULL PAGE MODE - Spacious layout
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
			{/* Products Column */}
			<div className="lg:col-span-2">
				<div className="space-y-4">
					{items.map((item) => (
						<div key={item.node.id} className="border border-gray-200 rounded-lg p-6 flex gap-6">
							<img
								src={item.node.merchandise.image.url}
								alt={item.node.merchandise.image.altText || item.node.merchandise.title}
								className="w-24 h-24 object-cover rounded-lg bg-gray-100 shrink-0"
							/>
							<div className="flex-1">
								<h3 className="font-semibold text-gray-900 text-lg">{item.node.merchandise.title}</h3>
								<p className="text-gray-600 text-sm mt-2">Quantity: {item.node.quantity}</p>
								<p className="text-2xl font-bold text-gray-900 mt-4">
									{item.node.merchandise.price.amount} {item.node.merchandise.price.currencyCode}
								</p>
							</div>
							<CartCountUpdate quantity={+item.node.quantity} lineId={item.node.id} />
						</div>

					))}
				</div>
			</div>

			{/* Summary Column */}
			<div className="lg:col-span-1">
				<div className="bg-gray-50 rounded-lg p-8 sticky top-24">
					<h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>

					<div className="space-y-5 mb-8">
						<div className="flex justify-between text-gray-700">
							<span className="text-base">Subtotal</span>
							<span className="font-semibold">{totalAmount}</span>
						</div>
						<div className="flex justify-between text-gray-700">
							<span className="text-base">Shipping</span>
							<span className="font-semibold">Free</span>
						</div>
						<div className="flex justify-between text-gray-700">
							<span className="text-base">Tax</span>
							<span className="font-semibold">Calculated at checkout</span>
						</div>
					</div>

					<div className="border-t border-gray-300 pt-6 mb-8">
						<div className="flex justify-between items-center">
							<span className="text-lg font-bold text-gray-900">Total</span>
							<span className="text-3xl font-bold text-gray-900">{totalAmount}</span>
						</div>
					</div>

					<div className="space-y-3">
						<a
							href={cart.checkoutUrl}
							className="w-full block text-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
							target="_blank"
							rel="noopener noreferrer"
						>
							Proceed to Checkout
						</a>
						<a
							href="/products"
							className="w-full block text-center px-6 py-3 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
						>
							Continue Shopping
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}