import { Container } from "../../components/Container/Container"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

export function Home() {

   return (
      <Container>
         <main className="relative flex flex-col justify-center z-10">
            <div className="">
               <Swiper
                  modules={[Navigation, Pagination, Autoplay ]}
                  slidesPerView={1}
                  pagination={{clickable:true}}
                  loop
                  navigation
                  autoplay ={{delay:20000}}
                  autoHeight
                  
               >
                  
                  <SwiperSlide>
                     <img
                        className="w-full select-none"
                        src="https://imgnike-a.akamaihd.net/branding/home-sbf/touts/Banner-corinthians-antiracista-03-05-desktop.jpg" alt="Imagem de exposição, coleção nova, novidades" 
                     />
                  </SwiperSlide>
                  <SwiperSlide>
                     <img
                        className="w-full select-none"
                        src="https://br.puma.com/media/contentmanager/content/PUMA---LEISURE-PALMEIRAS---Social-Post-Esta%CC%81tico--4x5---1440x500.jpg" alt="Imagem de exposição, coleção nova, novidades" 
                     />
                  </SwiperSlide>
                  <SwiperSlide>
                     <img
                        className="w-full select-none"
                        src="https://secure-static.vans.com.br/medias/sys_master/vans/vans/h29/h31/h00/h00/11951746023454/UltraRangeNeoVR3-hero-01-copiar.jpg" alt="Imagem de exposição, coleção nova, novidades" 
                     />
                  </SwiperSlide>

               </Swiper>
            </div>
            

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