
import { Container } from "../../components/Container/Container"
import { FaTrash } from "react-icons/fa"
import { CartContext } from "../../contexts/CartContext"
import { useContext, useEffect } from "react"

export function Cart() {
   const { cart, totalPrice, totalAmount, addItemCart, removeItemCart } = useContext(CartContext)

   return (
      <Container>
         <main className="flex flex-col items-center mx-auto">
            <h1 className="text-3xl">SEU CARRINHO</h1>

            <div className="w-full flex flex-col gap-4 mt-14">
               {cart.length === 0 && (
                  <div className="flex justify-center">
                     SEU CARRINHO ESTÁ VAZIO
                  </div>
               )}

               {cart.map( (item) => (
                  <section className="w-full flex items-center justify-between bg-zinc-300 p-4 rounded-lg" key={(item.id, item.selectSize)}>
                     <div className="flex items-center gap-2">
                        <img 
                           className="w-32 rounded-lg"
                           src={item.cover[0]}
                           alt={item.name}
                        />
                        <div className="flex flex-col gap-4 text-sm">
                           <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-60">{item.name}</p>
                           <p>Cor: {item.color}</p>
                           <p>Tamanho: {item.selectSize}</p>
                        </div>

                     </div>
                     <div className="flex gap-2">
                        <button 
                           className="w-6 h-6 rounded-md bg-white"
                           onClick={() => removeItemCart(item, item.selectSize)}
                        >
                           -
                        </button>
                        {item.amount}
                        <button 
                           className="w-6 h-6 rounded-md bg-white"
                           onClick={() => addItemCart(item, item.selectSize)}
                        >
                           +
                        </button>
                     </div>
                     
                     <p>{item.price.toLocaleString("pt-br", {style: "currency", currency:"BRL"})}</p>
                     <p>{item.total.toLocaleString("pt-br", {style: "currency", currency:"BRL"})}</p>

                     <FaTrash size={20}/>
                  </section>
               ))}
            </div>
            
            {cart.length !== 0 && (
               <section className="w-full flex justify-between mt-10 px-8">
                  <div>
                     <div>
                        {/* CEP */}
                     </div>
                     <div>
                        {/* ENDEREÇO */}
                     </div>
                     <div>
                        {/* CONTATO */}
                     </div>
                     <div>
                        {/* PAGAMENTO */}
                     </div>
                  </div>
                  <div className="flex flex-col w-64 items-center">
                     <h2 className="text-xl">RESUMO DO PEDIDO</h2>
                     <div className="flex w-full justify-between mt-6">
                        <div>{totalAmount} Produtos</div>
                        <div>{Number(totalPrice).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</div>
                     </div>
                     <div className="flex w-full justify-between mt-1">
                        <div>Frete</div>
                        <div>R$ 15,00</div>
                     </div>
                     <div className="flex w-full justify-between mt-4">
                        <strong>TOTAL</strong>
                        <strong>{(Number(totalPrice) + 15).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</strong>
                     </div>
                     <button className="w-full bg-zinc-300 rounded-lg py-2 mt-6">CONCLUIR COMPRA</button>
                  </div>
               </section>
            )}
         </main>

      </Container>

   )
}