import { createBrowserRouter } from "react-router-dom"
import { Home } from "./pages/home"
import { Login } from "./pages/login-register"
import { Cart } from "./pages/cart"
import { ProductList } from "./pages/productlist"
import { Layout } from "./components/Layout/Layout"

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/products",
        element: <ProductList/>
      }
    ]
  },
  {
      path: "/cart",
      element: <Cart/>
  }
])

export {router}
