import { Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import { cn } from "../utils/cn";
import { useCart } from "../context/CartContext";
import logo from "figma:asset/b1efc97dcba5fc750a8da36be50b726a6708788b.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { itemCount } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setIsOpen(false);
    
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `/#${id}`);
      }
    }
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#fff6e9] shadow-sm font-newsreader">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-[#4f2c1d] hover:bg-[#e6642f]/10 rounded-full transition-colors"
          aria-label="Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={logo} alt="Velvet Slice" className="h-10 w-auto object-contain" />
          <span className="text-xl font-bold text-[#4f2c1d] hidden sm:block">Velvet Slice</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[#4f2c1d]">
          <Link to="/#produtos" onClick={(e) => handleNavClick(e, "produtos")} className="hover:text-[#e6642f] transition-colors font-medium">Produtos</Link>
          <Link to="/#contato" onClick={(e) => handleNavClick(e, "contato")} className="hover:text-[#e6642f] transition-colors font-medium">Contato</Link>
          <Link to="/#reviews" onClick={(e) => handleNavClick(e, "reviews")} className="hover:text-[#e6642f] transition-colors font-medium">Reviews</Link>
          <Link to="/#sobre" onClick={(e) => handleNavClick(e, "sobre")} className="hover:text-[#e6642f] transition-colors font-medium">Sobre nós</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="hidden md:block px-6 py-2 bg-[#e6642f] text-white rounded-full font-medium hover:bg-[#bd4819] transition-colors shadow-sm"
          >
            Entrar
          </Link>
          
          <Link to="/carrinho" className="relative p-2 text-[#4f2c1d] hover:text-[#e6642f] transition-colors">
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#e6642f] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-in zoom-in">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#fff6e9] border-t border-[#e6642f]/10 shadow-lg animate-in slide-in-from-top-2 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex flex-col p-4 gap-4 text-[#4f2c1d]">
            <Link to="/" onClick={() => setIsOpen(false)} className="py-2 border-b border-[#e6642f]/10 font-medium">Início</Link>
            <Link to="/#produtos" onClick={(e) => handleNavClick(e, "produtos")} className="py-2 border-b border-[#e6642f]/10 font-medium">Produtos</Link>
            <Link to="/#contato" onClick={(e) => handleNavClick(e, "contato")} className="py-2 border-b border-[#e6642f]/10 font-medium">Contato</Link>
            <Link to="/#reviews" onClick={(e) => handleNavClick(e, "reviews")} className="py-2 border-b border-[#e6642f]/10 font-medium">Reviews</Link>
            <Link to="/#sobre" onClick={(e) => handleNavClick(e, "sobre")} className="py-2 border-b border-[#e6642f]/10 font-medium">Sobre nós</Link>
            <Link 
              to="/login" 
              onClick={() => setIsOpen(false)}
              className="py-3 mt-2 bg-[#e6642f] text-white text-center rounded-lg font-bold shadow-sm"
            >
              Entrar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
