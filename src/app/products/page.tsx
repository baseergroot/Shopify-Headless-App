import Products from "@/components/productsCom";
import { getProductsQuery, storeFront } from "@/lib/graphql";
import { Product } from "@/lib/types";

const ProductsPage = async () => {
  const data = await storeFront(getProductsQuery)

  const products: Product[] = data.data.products.edges.map((item: any) => ({
    name: item.node.title,
    description: item.node.description,
    handle: item.node.handle,
    price: item.node.priceRange.maxVariantPrice,
    images: item.node.media.edges.map((image: any) => image.node.image.url),
  }))

  return (
    <div className="bg-white">
      <Products products={products} />
    </div>
  )
}

export default ProductsPage
