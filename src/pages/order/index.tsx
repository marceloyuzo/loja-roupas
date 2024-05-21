import { Container } from "../../components/Container/Container"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { db } from "../../services/firebaseConnection"
import { getDocs, collection, where, query } from "firebase/firestore"
import { AuthContext } from "../../contexts/AuthContext"
import { useContext } from "react"
import { CartProps } from "../../contexts/CartContext"
import { signOut } from "firebase/auth"
import { auth } from "../../services/firebaseConnection"

interface OrderProps {
   id: string,
   products: CartProps[],
   uid: string,
   cep: string,
   state: string,
   city: string,
   district: string,
   address: string,
   numberAdress: string,
   nameContact: string,
   lnameContact: string,
   cpf: string,
   numberPhone: string,
   email: string,
   paymentMethod: string,
   totalPrice: number,
   totalAmount: number,
   created: Date
}

export function Order() {
   const [orders, setOrders] = useState<OrderProps[]>([])
   const { user } = useContext(AuthContext)

   function handleLogout() {
      signOut(auth)
      alert("SESSÃO FINALIZADA")
      return
   }

   useEffect(() => {
      if(!user?.uid) {
         return
      }

      const ordersRef = collection(db, "orders")
      const queryRef = query(ordersRef, where("uid", "==", user.uid))

      getDocs(queryRef)
      .then((snapshot) => {
         let listOrders = [] as OrderProps[]

         snapshot.forEach( doc => {
            const data = doc.data().created
            const formated = data.toDate()

            listOrders.push({
               id: doc.id,
               products: doc.data().products,
               uid: doc.data().uid,
               cep: doc.data().cep,
               state: doc.data().state,
               city: doc.data().city,
               district: doc.data().district,
               address: doc.data().address,
               numberAdress: doc.data().numberAddress,
               nameContact: doc.data().nameContact,
               lnameContact: doc.data().lnameContact,
               cpf: doc.data().cpf,
               numberPhone: doc.data().numberPhone,
               email: doc.data().email,
               paymentMethod: doc.data().paymentMethod,
               totalPrice: doc.data().totalPrice,
               totalAmount: doc.data().totalAmount,
               created: formated
            })
         })

         setOrders(listOrders)
      })
      
   }, [])

   return(
      <Container>
         <div className="w-full flex justify-center mx-auto gap-5">
            <nav className="hidden flex-col items-center w-1/4 gap-5 p-4 py-10 bg-zinc-300 rounded-lg h-fit response-1080:flex">
               <div className="text-center text-xl">
                  <h2 className="">Olá {user?.name?.split(" ", 1)},</h2>
                  <span 
                     className="text-sm underline cursor-pointer"
                     onClick={handleLogout}
                  >Sair</span>
               </div>

               <ul className="flex flex-col items-center w-full">
                  <li className="border-y-2 p-2 w-full text-center">
                     <Link to="/myaccount">
                        Informações da Conta
                     </Link>
                  </li>
                  <li className="border-b-2 p-2 w-full text-center">
                     <Link to="/order">
                        Meus Pedidos
                     </Link>
                  </li>
               </ul>
            </nav>
            <main className="flex flex-col w-3/4 py-10 px-10 bg-zinc-300 rounded-lg min-h-96">
               {orders.length > 0 && (
                  <div>
                     <h2 className="text-2xl">Meus Pedidos</h2>
                     {orders.map((order) => (
                        <section className="flex flex-col w-full pb-6 border-b-2" key={order.id}>
                           <div className="w-full flex flex-col justify-between text-lg mb-5 mt-10 response-1080:flex-row response-1080:items-center">
                              Pedido #{order.id} - {order.created.toLocaleDateString("pt-BR")}
                              <button className="bg-white px-6 py-2 rounded-lg text-base">Ver Detalhes</button>
                           </div>
                           {order.products.map((product, index) => (
                              <div className="flex flex-col justify-center items-center gap-3 px-3 mb-2 response-650:flex-row response-650:justify-normal response-650:items-stretch" key={(product.id, index)}>
                                 <img 
                                    className="rounded-lg w-28"
                                    src={product.cover[0]}
                                    alt="" 
                                 />
                                 <div className="flex flex-col justify-evenly">
                                    <p className="">
                                       {product.name} - {product.selectSize}
                                    </p>
                                    <p>
                                       <strong>Cor:</strong> {product.color}
                                    </p>
                                    <p>
                                       <strong>Quantidade:</strong> {product.amount}
                                    </p>
                                 </div>
                              </div>
                           ))}
                           <p className="px-3 text-sm">Forma de Pagamento: {order.paymentMethod}</p>
                        </section>
                     ))}
                  </div>
               )}
               
            </main>
         </div>
      </Container>
   )
}