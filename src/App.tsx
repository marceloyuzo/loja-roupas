import { createBrowserRouter } from "react-router-dom"
import { Home } from "./pages/home"
import { Login } from "./pages/login-register"
import { Cart } from "./pages/cart"
import { ProductList } from "./pages/productlist"
import { Layout } from "./components/Layout/Layout"
import { MyAccount } from "./pages/myaccount"
import { Order } from "./pages/order"
import { Private } from "./routes/Private"

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
      },
      {
        path: "/myaccount",
        element: <Private><MyAccount/></Private>
      },
      {
        path: "/order",
        element: <Private><Order/></Private>
      },
      {
        path: "/cart",
        element: <Cart/>
      }
    ]
  }
])

export {router}
