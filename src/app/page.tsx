import { Button } from "@/components/ui/button";
import { gqlQuery, storeFront } from "@/lib/graphql"
import Link from "next/link";


const Page = async () => {
  const data = await storeFront(gqlQuery)

  console.log("Data : ", data.data.data.products.edges);
  return (
    <main className="w-screen h-screen bg-gray-600 text-white py-8 px-5 flex gap-5 flex-col overflow-hidden">
      <h1 className="text-center text-2xl font-semibold py-10">Shopify Store</h1>
      <h2 className="leading-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos doloribus, maiores accusantium, sunt iusto eaque possimus porro quas earum neque tempore, accusamus dignissimos. Nesciunt rerum eligendi at quod natus nemo.</h2>
      <section className="flex w-full h-full overflow-x-auto flex-wrap gap-5 grow [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {data.data.data.products.edges.map((product: any, index: number) => (
          <div key={index}
            className="flex bg-white/20 h-1/2 w-4/4 rounded-lg md:w-1/3 lg:w-1/4 overflow-hidden grow ">
            <img src={product.node.images.edges[0].node.originalSrc} alt=""
              className="w-1/2 min-h-full object-cover object-center" />
            <div className="w-1/2 min-h-full py-2 px-3">
              <h3 className="font-bold py-2 ">{product.node.title}</h3>
              <p className="leading-4.5">{product.node?.description}</p>
              <p className="font-semibold pt-4">{product.node.priceRange.minVariantPrice.amount} {product.node.priceRange.minVariantPrice.currencyCode}</p>
              <Button className="mt-4 w-full bg-white text-black hover:bg-gray-200 font-semibold">
                <Link href={`/${product.node.handle}`}>View Product</Link>
              </Button>
            </div>

          </div>
        ))}
      </section>
    </main>
  )
}

export default Page