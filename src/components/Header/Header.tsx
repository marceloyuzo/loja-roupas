import { FaShoppingBag, FaUser, FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { CartContext } from "../../contexts/CartContext";

export function Header() {
   const [menuAberto, setMenuAberto] = useState(false)
   const { signed, loadingAuth } = useContext(AuthContext)
   const { cartAmount } = useContext(CartContext)
   const navigate = useNavigate()


   function handleMenuUser() {
      if(!menuAberto) {
         setMenuAberto(true)
         return
      }

      setMenuAberto(false)
      return
   }

   function handleSession() {
      handleMenuUser()

      navigate("/login")
   }

   function handleLogout() {
      signOut(auth)
      alert("SESSÃO FINALIZADA")
      return
   }

   return (
      <div className="fixed w-full top-0 z-20">
         <div className="w-full flex items-center justify-center bg-white drop-shadow mb-4">
            <header className="relative w-full max-w-screen-xl flex justify-between items-center mx-auto px-6 py-4">
               <div>
                  <Link to="/">
                     <h1>LOJA DE ROUPA</h1>
                  </Link>
               </div>
               <div className="relative w-96 md:w-auto">
                  <input 
                     className="w-5/6 rounded-md px-2 h-8 border-2 outline-none flex justify-center mx-auto"
                     type="text" 
                     placeholder="Buscar..."

                  />
                  <FaSearch size={16} className="absolute top-2 right-12"/>
                  <nav className="hidden justify-between gap-8 mt-4  md:flex">
                     <Link to="/products">
                        <span>Lançamentos</span>   
                     </Link>
                     <Link to="/products">
                        <span>Masculino</span>
                     </Link>
                     <Link to="/products">
                        <span>Feminino</span>   
                     </Link>
                     <Link to="/products">
                        <span>Infantil</span>   
                     </Link>
                     <Link to="/products">
                        <span>Ofertas</span>
                     </Link>
                  </nav>
               </div>
               <div className="flex gap-5">
                  <Link to="/cart">
                     <FaShoppingBag size={28}/>
                     {cartAmount > 0 && (
                        <span className="absolute top-9 right-16 px-2 bg-zinc-600 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs select-none md:right-16 md:top-14">
                           {cartAmount}
                        </span>
                     )}
                  </Link>
                  <FaUser size={28} onClick={handleMenuUser} className="cursor-pointer"/>
                  {menuAberto && (
                     <div 
                        className="absolute bg-zinc-900 w-60 right-5 top-9 p-4 rounded-md select-none"
                        onMouseLeave={handleMenuUser}
                     >
                        <IoMdClose size={24} className="absolute right-2 top-2 text-white cursor-pointer" onClick={handleMenuUser}/>
                        <div className="flex flex-col items-center mt-6">
                           <Link to="/myaccount">
                              <span className="text-white" onClick={handleSession}>Minha Conta</span>
                           </Link>
                           <div className="w-full h-px bg-slate-200 my-2"></div>
                           <Link to="/order">
                              <span className="text-white" onClick={handleSession}>Meus Pedidos</span>
                           </Link>
                           <div className="w-full h-px bg-slate-200 my-2"></div>
                           
                           {!signed && !loadingAuth && (
                              <>
                                 <button 
                                    className="mt-14 mb-2 bg-zinc-300 w-3/4 h-8 rounded-md" onClick={handleSession}
                                 >
                                    Iniciar Sessão
                                 </button>
                                 <p className="text-xs text-white">Ainda não é membro ?</p>
                                 <strong className="text-white tracking-widest cursor-pointer" onClick={handleSession}>Cadastrar-se</strong>
                              </>
                           )}

                           {signed && !loadingAuth && (
                              <>
                                 <button 
                                    className="mt-20 mb-2 bg-zinc-300 w-3/4 h-8 rounded-md" onClick={() =>{handleLogout(), handleMenuUser()}}
                                 >
                                    Encerrar sessão
                                 </button>
                              </>
                           )}
                        </div>
                     </div>
                  )}
               </div>
            </header>
         </div>
      </div>
      
      
   )
}