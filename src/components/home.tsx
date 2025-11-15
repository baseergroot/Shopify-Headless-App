

export default function Home() {
  return (
    <div className="relative isolate px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-1/3 -z-10 w-96 h-96 bg-linear-to-br from-gray-100 to-transparent rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-1/4 -z-10 w-96 h-96 bg-linear-to-tr from-gray-100 to-transparent rounded-full blur-3xl opacity-40" />
      </div>
      <div className="mx-auto max-w-3xl py-16 sm:py-24 lg:py-32">
        <div className="text-center">
          <p className="text-sm text-gray-600 font-medium mb-4">Welcome to our store</p>
          <h1 className="text-6xl sm:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            Discover Quality Products
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Curated selection of premium items, delivered with care. Shop smarter, live better.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="/products"
              className="px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
            >
              Shop Now
            </a>
            <a
              href="#"
              className="px-8 py-3 border border-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
