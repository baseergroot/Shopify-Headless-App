import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import CartLogic from "@/lib/cartLogic";
import CartComponent from "./cartComponent";
import { ShoppingBag } from "lucide-react";

export default async function PopoverCart() {
    const cartData = await CartLogic()

    if (!cartData) {
        return (
            <Popover>
                <PopoverTrigger className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ShoppingBag className="w-6 h-6 text-gray-900" />
                </PopoverTrigger>
                <PopoverContent className="p-0 border-0 shadow-lg">
                    <div className="p-8 text-center">
                        <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Your cart is empty</p>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Popover>
            <PopoverTrigger className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <ShoppingBag className="w-6 h-6 text-gray-900" />
                {cartData?.data?.cart?.lines?.edges?.length > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                        {cartData.data.cart.lines.edges.length}
                    </span>
                )}
            </PopoverTrigger>
            <PopoverContent className="p-0 border-0 shadow-xl rounded-xl overflow-hidden">
                <CartComponent cartResponse={cartData} />
            </PopoverContent>
        </Popover>
    )
}
