import ProductComponents from "@/components/productByHandleComponent"
import { getProductByHandleQuery, storeFront } from "@/lib/graphql"
import { Product } from "@/lib/types"

export default async function Page({params}: {params: {product: string}}) {

    // await params to get the product handle
    const param = await params

    // get the product name from the params
    const productName = param.product

    // get the product details from the graphql api
    const response = await storeFront(getProductByHandleQuery, {handle: productName})

    const rawProduct = response.data.product

    // log the raw product
    // console.log({rawProduct})


    const product: Product = {
        name: rawProduct.title,
        description: rawProduct.description,

        // take care of this
        price: {
            amount: rawProduct.variants.edges[0].node.price.amount,
            currencyCode: rawProduct.variants.edges[0].node.price.currencyCode,
        },
        
        images: rawProduct.images.edges.map((image: any) => image.node.url),
        id: rawProduct.id,
        variants: rawProduct.variants.edges.map((variant: any) => ({
            id: variant.node.id,
            title: variant.node.title,
            price: {
                amount: variant.node.price.amount,
                currencyCode: variant.node.price.currencyCode,
            },
            availableForSale: variant.node.availableForSale,
        })), 

    }
    
    // console.log({product})

    return (
        <main>
            {/* <h1>
                Product Page
            </h1> */}

            <ProductComponents product={product} />
        </main>
    )
}