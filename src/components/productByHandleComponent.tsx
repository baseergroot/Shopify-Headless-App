import { Product } from '@/lib/types'
import AddToCartButton from './addToCartButton'

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductComponents({ product }: { product: Product }) {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <a href="/products" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        ← Back to Products
                    </a>
                </nav>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <div className="flex items-start">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full rounded-xl object-cover bg-gray-100"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                {product.name}
                            </h1>
                            
                            <p className="text-4xl font-bold text-gray-900 mb-6">
                                {product.price?.amount} {product.price?.currencyCode}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex gap-1">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <svg
                                            key={rating}
                                            className={classNames(
                                                reviews.average > rating ? 'text-gray-900' : 'text-gray-300',
                                                'w-5 h-5'
                                            )}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <a href={reviews.href} className="text-sm font-medium text-gray-600 hover:text-gray-900">
                                    ({reviews.totalCount} reviews)
                                </a>
                            </div>

                            {/* Description */}
                            {product.description && (
                                <div className="mb-8">
                                    <p className="text-gray-600 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            {/* Divider */}
                            <div className="h-px bg-gray-200 my-8" />

                            {/* Add to Cart */}
                            {product.variants?.[0]?.id ? (
                                <AddToCartButton productId={product.variants[0].id} />
                            ) : null}

                            {/* Additional Info */}
                            <div className="mt-8 space-y-4 text-sm text-gray-600">
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span>Free Shipping</span>
                                    <span className="text-gray-900 font-medium">On orders over $50</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span>Returns</span>
                                    <span className="text-gray-900 font-medium">30-day easy returns</span>
                                </div>
                                <div className="flex justify-between py-3">
                                    <span>Support</span>
                                    <span className="text-gray-900 font-medium">24/7 customer service</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
