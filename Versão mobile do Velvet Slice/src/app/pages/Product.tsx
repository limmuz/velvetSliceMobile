import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, Minus, Plus, ShoppingCart, Truck } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { toast } from "sonner";

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center font-newsreader">
        <h2 className="text-3xl text-[#873b0b] mb-4">Produto não encontrado</h2>
        <Link to="/" className="text-[#e6642f] hover:underline">Voltar para a página inicial</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity}x ${product.name} adicionado ao carrinho!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/carrinho");
  };

  return (
    <div className="bg-[#fff6e9] min-h-screen py-8 font-newsreader">
      <div className="container mx-auto px-4">
        <button onClick={() => navigate(-1)} className="flex items-center text-[#873b0b] mb-8 hover:text-[#e6642f] transition-colors">
          <ArrowLeft className="mr-2" size={20} />
          Voltar
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 gap-0 border border-[#e6642f]/10">
          <div className="h-full bg-[#f9f9f9] flex items-center justify-center p-8">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-[500px] w-full object-contain rounded-xl shadow-lg hover:scale-105 transition-transform duration-500" 
            />
          </div>
          
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-2">
              <span className="bg-[#e6642f]/10 text-[#e6642f] px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                Delícia Artesanal
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-[#4f2c1d] mb-4">{product.name}</h1>
            
            <div className="text-3xl font-light text-[#e6642f] mb-6">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </div>
            
            <p className="text-[#6c2f09] text-lg leading-relaxed mb-8 italic">
              {product.description || "Uma deliciosa criação da Velvet Slice, feita com ingredientes selecionados e muito amor."}
            </p>
            
            <div className="border-t border-b border-[#e6642f]/10 py-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Truck className="text-[#e6642f]" size={24} />
                <div>
                  <p className="font-bold text-[#4f2c1d]">Frete Grátis</p>
                  <p className="text-sm text-[#873b0b]">Para compras acima de R$ 150,00</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-[#e6642f]/30 rounded-full px-4 py-2 w-fit bg-[#fff6e9]">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[#e6642f] hover:bg-[#e6642f]/10 rounded-full transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="mx-4 text-xl font-bold text-[#4f2c1d] min-w-[20px] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-[#e6642f] hover:bg-[#e6642f]/10 rounded-full transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-white border-2 border-[#e6642f] text-[#e6642f] font-bold py-3 px-6 rounded-full hover:bg-[#e6642f] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Adicionar
              </button>
              
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-[#e6642f] text-white font-bold py-3 px-6 rounded-full hover:bg-[#bd4819] transition-colors shadow-lg hover:shadow-xl transform active:scale-95"
              >
                Comprar Agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
