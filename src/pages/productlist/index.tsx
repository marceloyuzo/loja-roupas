import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react"
import { Container } from "../../components/Container/Container"
import { getDocs, collection } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { ProductsProps } from "../home";

interface FiltersProps {
   filter: string
}


export function ProductList() {
   const [filters, setFilters] = useState<string[]>([])
   const [filtersGenderOptions, setFiltersGenderOptions] = useState<FiltersProps[]>([])
   const [filtersCategoriesOptions, setFiltersCategoriesOptions] = useState<FiltersProps[]>([])
   const [products, setProducts] = useState<ProductsProps[]>([])

   const location = useLocation()
   const navigate = useNavigate()

   useEffect(() => {
      loadFilters("filtersCategories")
      loadFilters("filtersGender")

      getProducts()
   }, [])

   useEffect(() => {
      applyFiltersFromURL()
   }, [location.search])


   function handleFilter(type: string) {
      const index = filters.indexOf(type);
      if (index !== -1) {
         // Remove o filtro se já estiver selecionado
         const updatedFilters = filters.filter((filtro) => filtro !== type);
         setFilters(updatedFilters);
         updateURLWithFilters(updatedFilters); // Atualiza a URL com os filtros atualizados
      } else {
         // Adiciona o filtro
         const updatedFilters = [...filters, type];
         setFilters(updatedFilters);
         updateURLWithFilters(updatedFilters); // Atualiza a URL com os filtros atualizados
      }
   }

   function loadFilters(type: string) {
      const filterRef = collection(db, type)

      getDocs(filterRef)
         .then((snapshot) => {
            let listFilters = [] as FiltersProps[]

            snapshot.forEach(doc => {
               listFilters.push({
                  filter: doc.data().filter
               })
            })

            if (type === "filtersGender") {
               setFiltersGenderOptions(listFilters)
               return
            }

            if (type === "filtersCategories") {
               setFiltersCategoriesOptions(listFilters)
               return
            }
         })
   }

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

   function applyFiltersFromURL() {
      const searchParams = new URLSearchParams(location.search);
      const filtersFromURL = searchParams.getAll("filter");
      setFilters(filtersFromURL);
   }

   function updateURLWithFilters(filters: string[]) {
      const searchParams = new URLSearchParams();
      filters.forEach(filter => searchParams.append('filter', filter));
      navigate(`?${searchParams.toString()}`);
   }

   function filterProducts() {
      if (filters.length === 0) {
         return products;
      }

      const genderFilters = filtersGenderOptions.map(option => option.filter);
      const isGenderFilter = (filter: string): boolean => genderFilters.includes(filter);
      const hasGenderFilters = filters.some(filter => isGenderFilter(filter));
      const hasCategoryFilters = filters.some(filter => !isGenderFilter(filter));

      return products.filter(product => {
         const genderMatches = !hasGenderFilters || filters.some((filter: string) => isGenderFilter(filter) && product.gender.includes(filter));
         const categoryMatches = !hasCategoryFilters || filters.some((filter: string) => !isGenderFilter(filter) && product.category.includes(filter));
         return genderMatches && categoryMatches;
      });
   }

   const productsFiltered = filterProducts();

   return (
      <Container>
         <main className="flex gap-10 w-full">
            <div className="flex flex-col w-1/5">
               <div className="mb-10 flex flex-col">
                  FILTROS
                  <div className="flex flex-col gap-2 w-full">
                     {filters.length > 0 && filters.map((filter) => (
                        <span key={filter} className="flex items-center gap-2 bg-zinc-300 px-2 py-1 rounded-lg w-fit">
                           {filter}
                           <IoMdClose
                              onClick={() => handleFilter(filter)}
                              className="cursor-pointer"
                           />
                        </span>
                     ))}
                  </div>
               </div>
               <div className="flex flex-col">
                  <h2>GÊNERO</h2>
                  {filtersGenderOptions.map((filter) => (
                     <div key={filter.filter}>
                        <input
                           type="checkbox"
                           name={filter.filter}
                           id=""
                           checked={filters.includes(filter.filter)}
                           onChange={() => handleFilter(filter.filter)}
                        /> {filter.filter}
                     </div>
                  ))}


               </div>
               <div>
                  <h2>CATEGORIA</h2>
                  {filtersCategoriesOptions.map((filter) => (
                     <div key={filter.filter}>
                        <input
                           type="checkbox"
                           name={filter.filter}
                           id=""
                           checked={filters.includes(filter.filter)}
                           onChange={() => handleFilter(filter.filter)}
                        /> {filter.filter}
                     </div>
                  ))}
               </div>
            </div>
            <div className="flex flex-col w-4/5">
               <h2 className="mb-4">Produtos</h2>

               <div className="grid grid-cols-4 w-full gap-y-12 gap-x-6">
                  {productsFiltered.map((product => (
                     <Link to={`/product/${product.id}`} key={product.id}>
                        <div className="flex flex-col">
                           <img
                              className="rounded-md mb-2 w-52"
                              src={product.cover[0]}
                              alt={product.name}
                           />

                           <strong className="text-ellipsis overflow-hidden whitespace-nowrap w-auto">{product.name}</strong>

                           {Number(product.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </div>
                     </Link>
                  )))}

               </div>
            </div>
         </main>
      </Container>
   )
}
