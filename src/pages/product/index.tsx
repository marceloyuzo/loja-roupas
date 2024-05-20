import { Container } from "../../components/Container/Container"
import { api } from "../../services/api"
import { ProductsProps } from "../home"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../../contexts/CartContext"

export function Product() {
   const { id } = useParams()
   const { addItemCart } = useContext(CartContext)
   const [product, setProduct] = useState<ProductsProps>()
   const [size, setSize] = useState<string>("")

   useEffect(() => {
      async function getProduct() {
         const response = await api.get(`/products/${id}`)
         setProduct(response.data)
      }
      
      getProduct()
   }, [])

   function handleSize(selectSize: string) {
      if(size === selectSize) {
         setSize("")
         return
      }
      setSize(selectSize)
   }

   return(
      <Container>
         <main>
            {product && (
               <section className="flex w-full gap-16 flex-col custom:flex-row" key={product.id}>
                  <div className="flex gap-4 justify-center">
                     <div className="flex flex-col gap-4">
                        {product.cover.map((image) => (
                           <img 
                              src={image} 
                              alt={product.name} 
                              className="md:w-28 md:max-w-28 rounded-lg w-16"
                              key={image}
                           />
                        ))}
                     </div>
                        <img src={product.cover[0]} alt={product.name} className="md:w-image md:max-w-image rounded-lg w-96"/>
                  </div>
                  <div className="flex flex-col items-start justify-start">
                     <h2 className="text-2xl mb-6">{product.name}</h2>

                     <p className="text-xl mb-6">{Number(product.price).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</p>

                     <div className="text-xl w-full mb-6">
                        Selecione um tamanho

                        {!product.size && (
                           <strong className="mt-6">Produto indisponível</strong>
                        )}
                        {product.size && (
                           <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
                              {product.size.map((selectSize) => (
                                 <div 
                                    className={`text-center rounded-sm w-full py-1 ${selectSize !== size ? 'bg-zinc-200' : 'bg-zinc-500'} cursor-pointer`}
                                    key={selectSize}
                                    onClick={() => handleSize(selectSize)}
                                 >
                                    {selectSize}
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>

                     <p className="text-xl mb-20">Cor: {product.color}</p>

                     <button 
                        className="text-xl bg-black text-white w-full py-3 rounded-lg"
                        onClick={() => addItemCart(product, size)}
                     >ADICIONAR AO CARRINHO</button>
                  </div>
               </section>
            )}
         </main>
      </Container>

   )
}