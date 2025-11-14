import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import CartLogic from "@/lib/cartLogic";
import CartComponent from "./cartComponent";

export  default async function PopoverCart() {
    const cartData = await CartLogic()

    if (!cartData) {
        return <div className="cart-empty">Your cart is empty!</div>;
    }

  return (
    <main className="absolute right-5 bottom-5">
        <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="text-black">
            <IoCartOutline />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <CartComponent cartResponse={cartData} />
      </PopoverContent>
    </Popover>
    </main>
  )
}

// add popover icon from lucide or similar package
