import CartComponent from "@/components/cartComponent";
import CartLogic from "@/lib/cartLogic";


export default async function Page() {

    const cartData = await CartLogic()

    if (!cartData) {
        return <div className="cart-empty">Your cart is empty!</div>;
    }

    return (
        <div>
            <CartComponent cartResponse={cartData} />
        </div>
    )
}