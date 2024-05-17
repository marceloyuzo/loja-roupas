
import { Container } from "../../components/Container/Container"
import { FaTrash } from "react-icons/fa"

export function Cart() {
   return (
      <Container>
         <main className="flex flex-col items-center mx-auto">
            <h1 className="text-3xl">SEU CARRINHO</h1>

            <div className="w-full flex flex-col gap-4 mt-14">
               <section className="w-full flex items-center justify-between bg-zinc-300 p-4 rounded-lg">
               
                  <div className="flex items-center gap-2">
                     <img 
                        className="w-32 rounded-lg"
                        src="https://secure-static.vans.com.br/medias/sys_master/vans/vans/ha7/h30/h00/h00/11952115056670/1003550650015U-01-BASEIMAGE-Lores.jpg" 
                        alt="TÊNIS ULTRARANGE NEO VR3 COMPL. ULTRA NEO VR3 MULTI" 
                     />
                     <div className="flex flex-col gap-4 text-sm">
                        <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-60">TÊNIS ULTRARANGE NEO VR3 COMPL. ULTRA NEO VR3 MULTI</p>
                        <p>Cor: Branca</p>
                        <p>Tamanho: G</p>
                     </div>

                  </div>
                  <div className="flex gap-2">
                     <button className="w-6 h-6 rounded-md bg-white">
                        -
                     </button>
                     1
                     <button className="w-6 h-6 rounded-md bg-white">
                        +
                     </button>
                  </div>
                  
                  <p>R$ 899,99</p>
                  <p>R$ 899,99</p>

                  <FaTrash size={20}/>
               </section>
            </div>
            
            <section>
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
                     <div>3 Produtos</div>
                     <div>R$ 500,00</div>
                  </div>
                  <div className="flex w-full justify-between mt-1">
                     <div>Frete</div>
                     <div>R$ 15,00</div>
                  </div>
                  <div className="flex w-full justify-between mt-4">
                     <strong>TOTAL</strong>
                     <strong>R$ 515,00</strong>
                  </div>
                  <button className="w-full bg-zinc-300 rounded-lg py-2 mt-6">CONCLUIR COMPRA</button>
               </div>
            </section>
         </main>

      </Container>

   )
}