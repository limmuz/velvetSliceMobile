import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-20 px-4 text-center font-newsreader">
        <div className="bg-[#fff6e9] rounded-3xl p-12 max-w-lg mx-auto shadow-lg border border-[#e6642f]/10">
          <ShoppingBag className="mx-auto h-24 w-24 text-[#e6642f]/20 mb-6" />
          <h2 className="text-3xl text-[#873b0b] font-bold mb-4">Seu carrinho está vazio</h2>
          <p className="text-[#6c2f09] mb-8">Parece que você ainda não adicionou nenhum bolo delicioso.</p>
          <Link to="/" className="inline-block bg-[#e6642f] text-white px-8 py-3 rounded-full font-bold hover:bg-[#bd4819] transition-colors shadow-md">
            Continuar comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fff6e9] min-h-screen py-12 font-newsreader">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#873b0b] mb-8 flex items-center gap-3">
          <ShoppingBag size={32} />
          Seu Carrinho
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-[#e6642f]/10 flex gap-4 items-center animate-in fade-in slide-in-from-bottom-2">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-lg border border-[#e6642f]/10"
                />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-[#4f2c1d] text-lg">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 transition-colors p-1"
                      title="Remover item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <p className="text-[#e6642f] font-medium mb-3">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#e6642f]/20 rounded-full bg-[#fff6e9] px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-[#e6642f] hover:bg-[#e6642f]/10 rounded-full transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold text-[#4f2c1d] text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-[#e6642f] hover:bg-[#e6642f]/10 rounded-full transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button 
              onClick={clearCart}
              className="text-[#e6642f] text-sm font-medium hover:underline px-4"
            >
              Esvaziar carrinho
            </button>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#e6642f]/10 sticky top-24">
              <h3 className="text-xl font-bold text-[#873b0b] mb-6 pb-4 border-b border-[#e6642f]/10">Resumo do Pedido</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[#6c2f09]">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-[#6c2f09]">
                  <span>Frete</span>
                  <span className="text-[#e6642f] font-medium">Calculado no checkout</span>
                </div>
                <div className="flex justify-between text-[#4f2c1d] font-bold text-xl pt-4 border-t border-[#e6642f]/10 mt-4">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full block bg-[#e6642f] text-white text-center font-bold py-3 rounded-full hover:bg-[#bd4819] transition-colors shadow-md hover:shadow-lg transform active:scale-95 mb-4"
              >
                Finalizar Compra
              </Link>
              
              <Link 
                to="/"
                className="w-full block text-center text-[#e6642f] font-medium hover:underline text-sm"
              >
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
