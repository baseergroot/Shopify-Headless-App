import CheckoutButton from "@/components/checkoutButton";
import { Button } from "@/components/ui/button";
import { ProductByHandleQuery, storeFront } from "@/lib/graphql";
import Link from "next/link";

// ...existing code...
const Page = async ({ params }: { params: Promise<{ product: string }> }) => {

    // await the params
    const param = await params;


    try {
        const response = await storeFront(ProductByHandleQuery, { handle: param.product });

        // Debug logs
        console.log("Handle:", param.product);
        console.log("Response:", response.data);
        
        // Fix: Check correct nesting of data
        if (!response?.data?.productByHandle) {
            throw new Error('Product not found');
        }

        const product = response.data.productByHandle;

        return (
            <main className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-4xl mx-auto">
                    <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                        ← Back to Products
                    </Link>

                    <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Product Image */}
                            <div>
                                <img
                                    src={product.images.edges[0].node.originalSrc}
                                    alt={product.title}
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>

                            {/* Product Details */}
                            <div>
                                <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
                                <p className="text-gray-600 mb-4">{product.description}</p>
                                <p className="text-xl font-bold mb-6">
                                    {product.priceRange.minVariantPrice.amount}
                                    {product.priceRange.minVariantPrice.currencyCode}
                                </p>
                                <CheckoutButton variantId={product.variants.edges[0].node.id} />
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        );
    } catch (error) {
        console.error('Error loading product:', error);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
                    <Link href="/" className="text-blue-600 hover:text-blue-800">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }
}

export default Page;