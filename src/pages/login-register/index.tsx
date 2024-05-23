import { Container } from "../../components/Container/Container"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../components/Input/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import toast from "react-hot-toast"

// IMPORTS PARA LIDAR COM REGISTRO E LOGIN
import { auth } from "../../services/firebaseConnection"
import { 
   createUserWithEmailAndPassword, 
   updateProfile,
   signInWithEmailAndPassword,  
   signOut 
} from "firebase/auth"


const schemaLogin = z.object({
   emailLogin: z.string().email("*").min(1, "*"),
   passwordLogin: z.string().min(1,"*")
})
type FormLoginData = z.infer<typeof schemaLogin>

const schemaRegister = z.object({
   emailRegister: z.string().email("*").min(1, "*"),
   nameRegister: z.string().min(1, "*"),
   lnameRegister: z.string().min(1, "*"),
   passwordRegister: z.string().min(1,"*").min(8, "*"),
   cpasswordRegister: z.string().min(1, "*"),
})
.refine((data) => (data.passwordRegister === data.cpasswordRegister), {
   message: "A senha não está igual.",
   path: ["cpasswordRegister"]
})
type FormRegisterData = z.infer<typeof schemaRegister>

export function Login() {
   const navigate = useNavigate()
   const { register:registerLogin, handleSubmit:handleSubmitLogin, formState: {errors: errorsLogin} } = useForm<FormLoginData>({
      resolver: zodResolver(schemaLogin),
      mode: "onBlur"
   })

   const { register:registerRegister, handleSubmit:handleSubmitRegister, formState: {errors: errorsRegister} } = useForm<FormRegisterData>({
      resolver: zodResolver(schemaRegister),
      mode: "onBlur"
   })

   useEffect(() => {
      async function handleLogout() {
         await signOut(auth)
      }

      handleLogout()
   }, [])

   async function handleRegister(data: FormRegisterData) {
      createUserWithEmailAndPassword(auth, data.emailRegister, data.passwordRegister)
      .then(async (user) => {
         await updateProfile(user.user, {
            displayName: data.nameRegister + ` ` + data.lnameRegister
         })

         toast.success("Cadastro realizado com sucesso. Seja bem-vindo.")
         navigate("/", {replace:true})
      })
      .catch((error) => {
         console.log(error)
         toast.error("Problema ao cadastrar o usuário, tente novamente")
         navigate("/login", {replace:true})
      })
   }

   function handleLogin(data: FormLoginData) {
      signInWithEmailAndPassword(auth, data.emailLogin, data.passwordLogin)
      .then( () => {
         toast.success("Login realizado com sucesso. Seja bem-vindo.")
         navigate("/", {replace:true})
      })
      .catch((error) => {
         console.log(error)
         toast.error("Erro ao tentar logar, tente novamente")
         navigate("/login", {replace:true})
      })
   }

   return (
      <Container>
         <main className="flex justify-between mt-28">
            <section className="mx-auto w-96 flex flex-col justify-start">
               <h2 className="text-center my-8 text-2xl">Tenho cadastro</h2>

               <form
                  onSubmit={handleSubmitLogin(handleLogin)}
               >
                  <p className="ml-2 mt-4">E-mail</p>
                  <Input
                     type="email"
                     placeholder="Digite seu email..."
                     name="emailLogin"
                     register={registerLogin}
                     error={errorsLogin.emailLogin?.message}
                     readOnly={false}
                  />

                  <p className="ml-2 mt-4">Senha</p>
                  <Input 
                     type="password"
                     placeholder="Digite sua senha..."
                     name="passwordLogin"
                     register={registerLogin}
                     error={errorsLogin.passwordLogin?.message}
                     readOnly={false}
                  />

                  <button 
                     className="w-full bg-zinc-300 rounded-md mt-8 h-11"
                  >
                     ENTRAR
                  </button>
                  <Link to="/" className="flex justify-center mt-1">
                     Esqueci minha senha
                  </Link>
               </form>

            </section>

            <div className="h-auto w-px bg-slate-600 mx-1 mt-10"></div>

            <section className="m-auto w-96">
               <h2 className="text-center my-8 text-2xl">Quero me cadastrar</h2>

               <form 
                  onSubmit={handleSubmitRegister(handleRegister)}
               >
                  <p className="ml-2 mt-4">E-mail</p>
                  <Input
                     type="email"
                     placeholder="Digite seu email..."
                     name="emailRegister"
                     register={registerRegister}
                     error={errorsRegister.emailRegister?.message}
                     readOnly={false}
                  />

                  <p className="ml-2 mt-4">Nome</p>
                  <Input
                     type="text"
                     placeholder="Digite seu nome..."
                     name="nameRegister"
                     register={registerRegister}
                     error={errorsRegister.nameRegister?.message}
                     readOnly={false}
                  />

                  <p className="ml-2 mt-4">Sobrenome</p>
                  <Input
                     type="text"
                     placeholder="Digite seu sobrenome..."
                     name="lnameRegister"
                     register={registerRegister}
                     error={errorsRegister.lnameRegister?.message}
                     readOnly={false}
                  />

                  <p className="ml-2 mt-4">Senha</p>
                  <Input 
                     type="password"
                     placeholder="Digite sua senha..."
                     name="passwordRegister"
                     register={registerRegister}
                     error={errorsRegister.passwordRegister?.message}
                     readOnly={false}
                  />

                  <p className="ml-2 mt-4">Confirmação de senha</p>
                  <Input 
                     type="password"
                     placeholder="Digite sua senha..."
                     name="cpasswordRegister"
                     register={registerRegister}
                     error={errorsRegister.cpasswordRegister?.message}
                     readOnly={false}
                  />

                  
                  <button 
                     className="w-full bg-zinc-300 rounded-md mt-8 h-11"
                  >
                     CRIAR CONTA
                  </button>
               </form>

            </section>
         </main>
      </Container>
   )
}