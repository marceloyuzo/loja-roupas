import { Container } from "../../components/Container/Container"
import { Link } from "react-router-dom"

export function Home() {
   return (
      <Container>
         <main>
            <img
               className="w-full "
               src="https://imgnike-a.akamaihd.net/branding/home-sbf/touts/Banner-corinthians-antiracista-03-05-desktop.jpg" alt="Imagem de exposição, coleção nova, novidades" 
            />

            <section className="mt-12 mb-4">
               <strong>Compre por Categoria</strong>

               <div className="mt-4 grid grid-cols-2 gap-6 lg:grid-cols-4 px-10">
                  <div className="w-auto flex">
                     <Link to="/products">
                        <img 
                           className="rounded-md mb-2"
                           src="https://secure-static.vans.com.br/medias/sys_master/vans/vans/ha7/h30/h00/h00/11952115056670/1003550650015U-01-BASEIMAGE-Lores.jpg" 
                           alt="TÊNIS ULTRARANGE NEO VR3 COMPL. ULTRA NEO VR3 MULTI" 
                        />
                     </Link>
                  </div>
                  <div className="w-auto flex">
                     <Link to="/products">
                        <img 
                           className="rounded-md mb-2"
                           src="https://secure-static.vans.com.br/medias/sys_master/vans/vans/ha7/h30/h00/h00/11952115056670/1003550650015U-01-BASEIMAGE-Lores.jpg" 
                           alt="TÊNIS ULTRARANGE NEO VR3 COMPL. ULTRA NEO VR3 MULTI" 
                        />
                     </Link>
                  </div>
                  <div className="w-auto flex">
                     <Link to="/products">
                        <img 
                           className="rounded-md mb-2"
                           src="https://secure-static.vans.com.br/medias/sys_master/vans/vans/ha7/h30/h00/h00/11952115056670/1003550650015U-01-BASEIMAGE-Lores.jpg" 
                           alt="TÊNIS ULTRARANGE NEO VR3 COMPL. ULTRA NEO VR3 MULTI" 
                        />
                     </Link>
                  </div>
                  <div className="w-auto flex">
                     <Link to="/products">
                        <img 
                           className="rounded-md mb-2"
                           src="https://secure-static.vans.com.br/medias/sys_master/vans/vans/ha7/h30/h00/h00/11952115056670/1003550650015U-01-BASEIMAGE-Lores.jpg" 
                           alt="TÊNIS ULTRARANGE NEO VR3 COMPL. ULTRA NEO VR3 MULTI" 
                        />
                     </Link>
                  </div>
               </div>
            </section>


            <section className="mt-12 mb-4">
               <strong>Recomendações para você</strong>

               <Link to="/" className="ml-6 text-xs">
                  Ver Mais
               </Link>

               <div className="mt-4 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 px-10">
                  <div className="w-auto flex flex-col">
                     <img 
                        className="rounded-md mb-2"
                        src="https://secure-static.vans.com.br/medias/sys_master/vans/vans/ha7/h30/h00/h00/11952115056670/1003550650015U-01-BASEIMAGE-Lores.jpg" 
                        alt="TÊNIS ULTRARANGE NEO VR3 COMPL. ULTRA NEO VR3 MULTI" />
                     
                     <strong className="text-ellipsis overflow-hidden whitespace-nowrap">TÊNIS ULTRARANGE NEO VR3 COMPL. ULTRA NEO VR3 MULTI</strong>

                     R$ 899,99
                  </div>
                  <div className="w-auto flex flex-col">
                     <img 
                        className="rounded-md mb-2"
                        src="https://secure-static.vans.com.br/medias/sys_master/vans/vans/ha7/h30/h00/h00/11952115056670/1003550650015U-01-BASEIMAGE-Lores.jpg" 
                        alt="TÊNIS ULTRARANGE NEO VR3 COMPL. ULTRA NEO VR3 MULTI" />
                     
                     <strong className="text-ellipsis overflow-hidden whitespace-nowrap">TÊNIS ULTRARANGE NEO VR3 COMPL. ULTRA NEO VR3 MULTI</strong>

                     R$ 899,99
                  </div>
                  <div className="w-auto flex flex-col">
                     <img 
                        className="rounded-md mb-2"
                        src="https://secure-static.vans.com.br/medias/sys_master/vans/vans/ha7/h30/h00/h00/11952115056670/1003550650015U-01-BASEIMAGE-Lores.jpg" 
                        alt="TÊNIS ULTRARANGE NEO VR3 COMPL. ULTRA NEO VR3 MULTI" />
                     
                     <strong className="text-ellipsis overflow-hidden whitespace-nowrap">TÊNIS ULTRARANGE NEO VR3 COMPL. ULTRA NEO VR3 MULTI</strong>

                     R$ 899,99
                  </div>
                  <div className="w-auto flex flex-col">
                     <img 
                        className="rounded-md mb-2"
                        src="https://secure-static.vans.com.br/medias/sys_master/vans/vans/ha7/h30/h00/h00/11952115056670/1003550650015U-01-BASEIMAGE-Lores.jpg" 
                        alt="TÊNIS ULTRARANGE NEO VR3 COMPL. ULTRA NEO VR3 MULTI" />
                     
                     <strong className="text-ellipsis overflow-hidden whitespace-nowrap">TÊNIS ULTRARANGE NEO VR3 COMPL. ULTRA NEO VR3 MULTI</strong>
                     R$ 899,99
                  </div>
               </div>
            </section>

         </main>
      </Container>

   )
}