"use client"

import UpdateCart from "@/action/updateCart"
import { Button } from "./ui/button"


const CartCountUpdate = ({lineId, quantity}: {lineId: string, quantity: number}) => {
  return (
    <>
      <Button className="text-lg font-semibold rounded"
        onClick={() => {
          UpdateCart(lineId, quantity + 1)
        }}
      >+</Button>
      <Button className="text-lg font-semibold rounded"
      onClick={() => {
          UpdateCart(lineId, quantity - 1)
        }}
      >-</Button>
    </>
  )
}

export default CartCountUpdate