import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "produtos", Component: Home },
      { path: "produto/:id", Component: Product },
      { path: "carrinho", Component: Cart },
      { path: "checkout", Component: Checkout },
      // Mock pages for footer links
      { path: "*", Component: Home }, 
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/cadastro",
    Component: Register,
  }
]);
