import { createContext, ReactNode } from "react";
import { useState } from "react";
import { ProductsProps } from "../pages/home";

interface CartContextData {
   cart: CartProps[],
   cartAmount: number,
   totalPrice: string,
   totalAmount: string,
   addItemCart: (newItem: ProductsProps, size: string) => void,
   removeItemCart: (product: CartProps, size: string) => void
}

export interface CartProps {
   id: string,
   name: string,
   color: string,
   filters: string[],
   size: string[],
   price: number,
   cover: string[],
   amount: number,
   total: number,
   selectSize: string
}

interface CartProviderProps {
   children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({ children }: CartProviderProps) {
   const [cart, setCart] = useState<CartProps[]>([])
   const [totalPrice, setTotalPrice] = useState<string>("")
   const [totalAmount, setTotalAmount] = useState<string>("")
   
   function addItemCart(newItem: ProductsProps, size: string) {
      const indexItem = cart.findIndex(item => item.id === newItem.id && item.selectSize === size)
      let cartList = cart
      
      if(size === "") {
         alert("Selecione um tamanho")
         // adicionar um toast depois
         return
      }
      
      if(indexItem !== -1 && cartList[indexItem].selectSize === size) {
         cartList[indexItem].amount = cartList[indexItem].amount + 1
         cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price
         
         setCart(cartList)
         totalResultCart(cartList)
         return
      }

      let data = {
         ...newItem,
         amount: 1,
         total: newItem.price,
         selectSize: size
      }

      setCart(products => [...products, data])
      totalResultCart([...cart, data])
      return
   }

   function removeItemCart(product: CartProps, size: string) {
      const indexItem = cart.findIndex(item => item.id === product.id && item.selectSize === size)

      if(cart[indexItem]?.amount > 1) {
         let cartList = cart

         cartList[indexItem].amount = cartList[indexItem].amount - 1
         cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price

         setCart(cartList)
         totalResultCart(cartList)
         return
      }

      const removeItem = cart.filter(item => !(item.id === product.id && item.selectSize === size));
      setCart(removeItem)
      totalResultCart(removeItem)

   }

   function totalResultCart(items: CartProps[]) {
      let myCart = items
      let resultPrice = myCart.reduce((acc, obj) => {
         return acc + obj.total
      }, 0)
      let resultAmount = myCart.reduce((acc, obj) => {
         return acc + obj.amount
      }, 0)

      setTotalPrice(String(resultPrice))
      setTotalAmount(String(resultAmount))
   }

   return (
      <CartContext.Provider 
         value={{
            cart, 
            cartAmount: cart.length, 
            totalPrice,
            totalAmount,
            addItemCart,
            removeItemCart
         }}
      >
         {children}
      </CartContext.Provider>
   )
}

export default CartProvider