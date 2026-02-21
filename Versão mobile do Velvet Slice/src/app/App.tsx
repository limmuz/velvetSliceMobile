import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "sonner";
import "../styles/fonts.css";

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </CartProvider>
  );
}
