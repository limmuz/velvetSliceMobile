import { Outlet, ScrollRestoration } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#fff6e9]">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}
