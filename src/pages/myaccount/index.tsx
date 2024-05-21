import { useContext, useEffect, useState } from "react"
import { Container } from "../../components/Container/Container"
import { AuthContext } from "../../contexts/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "../../services/firebaseConnection"
import { Link } from "react-router-dom"
import { Input } from "../../components/Input/Input"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { MdModeEdit } from "react-icons/md";

const schema = z.object({
   email: z.string().email(),
   name: z.string().min(1, "*")
})

type FormData = z.infer<typeof schema>

export function MyAccount() {
   const { user } = useContext(AuthContext)
   const [readOnly, setReadOnly] = useState<boolean>(true)
   const { register, handleSubmit, setValue, setFocus, formState: {errors} } = useForm<FormData>({
      resolver: zodResolver(schema),
      mode: "onBlur"
   })

   useEffect(() => {
      if(user?.name && user?.email) {
         setValue('name', user?.name),
         setValue('email', user?.email)
      }
   }, [])

   function handleLogout() {
      signOut(auth)
      alert("SESSÃO FINALIZADA")
      return
   }

   function handleEdit(type: string) {
      if(readOnly) {
         switch(type) {
            case "name":
               setFocus('name')
               break
            case "email":
               setFocus('email')
               break
            default:
               return
         }

         setReadOnly(false)
         return
      }
   }

   function onEdit(data: FormData) {
      console.log(data)
   }

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
               <h2 className="text-2xl mb-4">Informações da Conta</h2>
               
               <section>
                  <form className="flex flex-col items-end gap-3" onSubmit={handleSubmit(onEdit)}>
                     <div className="relative w-full">
                        <Input 
                           type="text"
                           placeholder=""
                           name="name"
                           register={register}
                           error={errors.name?.message}
                           readOnly={readOnly}
                        />
                        <MdModeEdit 
                           size={18} 
                           className="absolute top-1/3 right-4 cursor-pointer"
                           onClick={() => handleEdit("name")}
                        />
                     </div>
                     <Input 
                        type="email"
                        placeholder=""
                        name="email"
                        register={register}
                        error={errors.email?.message}
                        readOnly={true}
                     />

                     <button 
                        className="flex justify-center items-center rounded-md w-32 bg-white py-2 text-center"
                     >SALVAR</button>
                  </form>
               </section>
                  
               
            </main>
         </div>
      </Container>
   )
}