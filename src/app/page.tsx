import Home from "@/components/home";
import Products from "@/components/productsCom";
import { getProductsQuery, storeFront } from "@/lib/graphql";
import { Product } from "@/lib/types";


const Page = async () => {
  const data = await storeFront(getProductsQuery)

  const products: Product[] = data.data.products.edges.map((item: any) => ({
    name: item.node.title,
    description: item.node.description,
    handle: item.node.handle,
    price: item.node.priceRange.maxVariantPrice,
    images: item.node.media.edges.map((image: any) => image.node.image.url),
  })
  )

  console.log({ products })

  return (
    <>
    <Home />
    <main className="w-screen h-auto bg-gray-600 text-white flex gap-5 flex-col overflow-hidden">
      <section className="flex flex-col w-full gap-5">
        <Products products={products} />
      </section>
      
    </main>
    </>
    
  )
}

export default Page