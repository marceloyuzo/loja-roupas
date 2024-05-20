import { Container } from "../../components/Container/Container"
import { FaTrash } from "react-icons/fa"
import { CartContext } from "../../contexts/CartContext"
import { AuthContext } from "../../contexts/AuthContext"
import { useContext, useState , useEffect} from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Input } from "../../components/Input/Input"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { apiCEP } from "../../services/api"
import { db } from "../../services/firebaseConnection"
import { addDoc, collection } from "firebase/firestore"

const PaymentMethodValues = ["PIX", "Credito", "Boleto"] as const
const schemaOrder = z.object({
   state: z.string().min(1,"*"),
   city: z.string().min(1, "*"),
   district: z.string().min(1,"*"),
   address: z.string().min(1, "*"),
   numberAdress: z.string().min(1, "*"),
   name: z.string().min(1,"*"),
   lname: z.string().min(1, "*"),
   cpf: z.string().min(1, "*"),
   numberPhone: z.string().min(1, "*"),
   email: z.string().email("Digite um email válido.").min(1, "*"),
   paymentMethod: z.enum(PaymentMethodValues).nullable().refine((val) => val !== null, {
      message: 'Selecione uma forma de pagamento.'
    }),
})

type FormOrderData = z.infer<typeof schemaOrder>

interface AddressProps {
   state: string,
   city: string,
   district: string,
   address: string,
   number: string | null
}

export function Cart() {
   const navigate = useNavigate()
   const { user } = useContext(AuthContext)
   const { cart, totalPrice, totalAmount, addItemCart, removeItemCart, resetCart } = useContext(CartContext)
   const [CEP, setCEP] = useState<string>("")
   const [address, setAddress] = useState<AddressProps>({
      state: "",
      city: "",
      district: "",
      address: "",
      number: ""
   })
   const { register, handleSubmit, setValue, formState: {errors} } = useForm<FormOrderData>({
      resolver: zodResolver(schemaOrder),
      mode: "onBlur"
   })

   useEffect(() => {
      setValue('state', address.state);
      setValue('city', address.city);
      setValue('district', address.district);
      setValue('address', address.address);
   }, [address, setValue])

   async function getProduct() {
      try {
         const response = await apiCEP.get(`/${CEP}/json/`)
         setAddress({
            state: response.data.uf,
            city: response.data.localidade,
            district: response.data.bairro,
            address: response.data.logradouro,
            number: ""
         })

         
      } catch (error) {
         console.log("ERRO AO IDENTIFICAR O CEP", error)
      }
   }


   function onSubmit(data: FormOrderData) {
      const produtos = cart.map( (item) => {
         return item
      })

      addDoc(collection(db, "orders"), {
         products: produtos,
         uid: user?.uid,
         cep: CEP,
         state: data.state,
         city: data.city,
         district: data.district,
         address: data.address,
         numberAdress: data.numberAdress,
         nameContact: data.name,
         lnameContact: data.lname,
         cpf: data.cpf,
         numberPhone: data.numberPhone,
         email: data.email,
         paymentMethod: data.paymentMethod,
         totalPrice: Number(totalPrice) + 15,
         totalAmount: totalAmount
      })
      .then(() => {
         resetCart()
         navigate("/")
      })
      .catch((error) => {
         console.log(error)
         
      })
   }

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
                  <section className="w-full flex items-center justify-between bg-zinc-300 p-4 rounded-lg flex-wrap" key={(item.id, item.selectSize)}>
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

                     <FaTrash size={20} onClick={() => removeItemCart(item, item.selectSize)} className="cursor-pointer"/>
                  </section>
               ))}
            </div>
            
            {cart.length !== 0 && (
               <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                  <section className="w-full flex flex-col justify-between gap-10 mt-10 px-8 response-920:flex-row response-920:pl-10">
                     <div className="w-full flex flex-col gap-10 response-920:w-2/3">
                        <div className="flex justify-start items-center w-full text-xl gap-16 ">
                           <h2>ENTREGA</h2>
                           <div className="flex items-center gap-2">
                              <span>CEP</span>
                              <input 
                                 className="outline-none bg-zinc-300 rounded-lg py-1 px-2"
                                 type="text" 
                                 placeholder="Digite o seu CEP..."
                                 value={CEP}
                                 onChange={(e) => {setCEP(e.target.value)}}
                                 onBlur={getProduct}
                              />
                           </div>
                        </div>
                        {address.state !== "" && (
                           <div>
                              <div className="flex flex-col w-full mb-10">
                                 <h2 className="text-xl mb-2">ENDEREÇO DE ENTREGA</h2>
                                 <div className="flex flex-col gap-4">
                                    <div className="flex justify-between gap-2">
                                       <Input 
                                          type="text"
                                          placeholder="Estado"
                                          name="state"
                                          register={register}
                                          error={errors.state?.message}
                                       />

                                       <Input 
                                          type="text"
                                          placeholder="Cidade"
                                          name="city"
                                          register={register}
                                          error={errors.city?.message}
                                       />

                                       <Input 
                                          type="text"
                                          placeholder="Bairro"
                                          name="district"
                                          register={register}
                                          error={errors.district?.message}
                                       />
                                    </div>

                                    <div className="flex justify-between gap-2">
                                       <div className="w-3/4">
                                          <Input
                                             type="text"
                                             placeholder="Endereço"
                                             name="address"
                                             register={register}
                                             error={errors.address?.message}
                                          />
                                       </div>
                                       <div className="w-1/4">
                                          <Input 
                                             type="text"
                                             placeholder="Número"
                                             name="numberAdress"
                                             register={register}
                                             error={errors.numberAdress?.message}
                                          />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex flex-col w-full mb-10">
                                 <h2 className="text-xl mb-2">INFORMAÇÕES DE CONTATO</h2>
                                 <div className="flex flex-col gap-4">
                                    <div className="flex justify-between gap-2">
                                       <Input 
                                          type="text"
                                          placeholder="Nome"
                                          name="name"
                                          register={register}
                                          error={errors.name?.message}
                                       />

                                       <Input 
                                          type="text"
                                          placeholder="Sobrenome"
                                          name="lname"
                                          register={register}
                                          error={errors.lname?.message}
                                       />

                                       <Input 
                                          type="text"
                                          placeholder="CPF"
                                          name="cpf"
                                          register={register}
                                          error={errors.cpf?.message}
                                          
                                       />
                                    </div>

                                    <div className="flex justify-between gap-2">
                                       <div className="w-1/3">
                                          <Input
                                             type="text"
                                             placeholder="Telefone"
                                             name="numberPhone"
                                             register={register}
                                             error={errors.numberPhone?.message}
                                          />
                                       </div>
                                       <div className="w-4/6">
                                          <Input 
                                             type="email"
                                             placeholder="Email"
                                             name="email"
                                             register={register}
                                             error={errors.email?.message}
                                          />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex flex-col w-full mb-10">
                                 <h2 className="text-xl mb-2">FORMAS DE PAGAMENTO</h2>
                                 <div className="flex flex-col gap-4 justify-center ml-2">
                                    <div>
                                       <input type="radio" value="PIX" {...register("paymentMethod")}/> PIX
                                    </div>
                                    <div>
                                       <input type="radio" {...register("paymentMethod")} value="Credito"/> Cartão de Crédito
                                    </div>
                                    <div>
                                       <input type="radio" {...register("paymentMethod")} value="Boleto"/> Boleto Bancário
                                    </div>
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>
                     <div className="flex flex-col w-full items-center response-920:w-1/3 response-920:px-0">
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
                        {address.state && (
                           <button className="w-full bg-zinc-300 rounded-lg py-2 mt-6" type="submit">CONCLUIR COMPRA</button>
                        )}
                     </div>
                  </section>
               </form>
            )}
         </main>

      </Container>

   )
}