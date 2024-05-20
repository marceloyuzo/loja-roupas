import { FaYoutube, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";


export function Footer() {
   return (
      <div className="w-full bottom-0 mt-24">
         <footer className="flex flex-col justify-center items-center w-full h-32 gap-1 bg-zinc-300">
            <strong>Redes Sociais</strong>
            <div className="flex justify-between gap-3 max-w-32">
               <Link to="https://instagram.com" target="_blank">
                  <FaInstagram size={28} className=""/>
               </Link>
               <Link to="https://youtube.com" target="_blank">
                  <FaYoutube size={28}/>
               </Link>
               <Link to="https://twitter.com" target="_blank">
                  <FaSquareXTwitter size={28}/>
               </Link>
            </div>
         </footer>
      </div>

   )
}