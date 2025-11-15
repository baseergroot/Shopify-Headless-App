import { Product } from "@/lib/types";

export default function Products({ products }: any) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-sm text-gray-600 font-medium mb-2">New Arrivals</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">Featured Products</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product: Product) => (
            <a
              key={product.handle}
              href={`/${product.handle}`}
              className="group"
            >
              <div className="relative overflow-hidden bg-gray-100 rounded-xl mb-4 aspect-square">
                <img
                  alt={product.name}
                  src={product.images[0]}
                  className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{product.price?.currencyCode}</p>
                </div>
                <p className="text-base font-bold text-gray-900">{product.price?.amount}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
