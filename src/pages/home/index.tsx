import { Container } from "../../components/Container/Container"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"

export interface ProductsProps {
   id: string,
   name: string,
   color: string,
   gender: string[],
   category: string[],
   size: string[],
   price: number,
   cover: string[],
}

export function Home() {
   const [products, setProducts] = useState<ProductsProps[]>([])

   useEffect(() => {
      getProducts()

   }, [])

   async function getProducts() {
      const productsRef = collection(db, "products")
      let listProducts = [] as ProductsProps[]

      const snapshot = await getDocs(productsRef)
      if ((snapshot).empty) {
         console.log("Não possui produtos")
         return
      }

      snapshot.forEach(doc => {
         listProducts.push({
            id: doc.data().id,
            name: doc.data().name,
            color: doc.data().color,
            gender: doc.data().gender,
            category: doc.data().category,
            size: doc.data().size,
            price: doc.data().price,
            cover: doc.data().cover
         })
      })

      setProducts(listProducts)
      return
   }

   return (
      <Container>
         <main className="relative flex flex-col justify-center z-10">
            <div>
               <Swiper
                  modules={[Navigation, Autoplay]}
                  slidesPerView={1}
                  loop
                  navigation
                  autoplay={{ delay: 20000 }}
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
                  <div className="w-auto flex flex-col items-center">
                     <Link to="/products?filter=Calçado">
                        <img
                           className="rounded-md mb-2"
                           src="https://secure-static.vans.com.br/medias/sys_master/vans/vans/ha7/h30/h00/h00/11952115056670/1003550650015U-01-BASEIMAGE-Lores.jpg"
                           alt="CATEGORIA CALÇADO"
                        />
                     </Link>
                     <strong className="text-lg">CALÇADOS</strong>
                  </div>
                  <div className="w-auto flex flex-col items-center">
                     <Link to="/products?filter=Camiseta">
                        <img
                           className="rounded-md mb-2"
                           src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/dc06adf61aab4e499ba9aefb00f92577_9366/Camiseta_Adicolor_Classics_3-Stripes_Vermelho_IA4852_01_laydown.jpg"
                           alt="CATEGORIA CAMISETA"
                        />
                     </Link>
                     <strong className="text-lg">CAMISETAS</strong>
                  </div>
                  <div className="w-auto flex flex-col items-center">
                     <Link to="/products?filter=Calça">
                        <img
                           className="rounded-md mb-2"
                           src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/717d09f5b271468db7ac9120e8f69306_9366/Calca_Treino_Tiro_24_Preto_IP1952_21_model.jpg"
                           alt="CATEGORIA CALÇA"
                        />
                     </Link>
                     <strong className="text-lg">CALÇAS</strong>
                  </div>
                  <div className="w-auto flex flex-col items-center">
                     <Link to="/products?filter=Acessório">
                        <img
                           className="rounded-md mb-2"
                           src="https://imgnike-a.akamaihd.net/360x360/026490ID.jpg"
                           alt="CATEGORIA ACESSÓRIO"
                        />
                     </Link>
                     <strong className="text-lg">ACESSÓRIOS</strong>
                  </div>
               </div>
            </section>


            <section className="mt-12 mb-4">
               <strong>Recomendações para você</strong>

               <Link to="/products/" className="ml-6 text-xs">
                  Ver Mais
               </Link>

               {products && (
                  <Swiper
                     modules={[Navigation, Autoplay]}
                     slidesPerView={2}
                     slidesPerGroup={2}
                     loop
                     navigation
                     autoplay={{ delay: 20000 }}
                     spaceBetween={40}
                     breakpoints={{
                        1024: {
                           slidesPerView: 4,
                           slidesPerGroup: 4
                        },
                        768: {
                           slidesPerView: 3,
                           slidesPerGroup: 3
                        }
                     }}
                  >
                     {products?.map((product) => (
                        <SwiperSlide key={product.id}>
                           <Link to={`/product/${product.id}`}>
                              <div className="w-auto flex flex-col">
                                 <img
                                    className="rounded-md mb-2 w-72"
                                    src={product.cover[0]}
                                    alt={product.name}
                                 />

                                 <strong className="text-ellipsis overflow-hidden whitespace-nowrap">{product.name}</strong>

                                 {Number(product.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                              </div>
                           </Link>
                        </SwiperSlide>

                     ))}
                  </Swiper>
               )}

            </section>

         </main>
      </Container>

   )
}