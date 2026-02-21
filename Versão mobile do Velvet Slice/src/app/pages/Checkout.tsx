import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { Check, CreditCard, Loader2, MapPin, QrCode, Truck } from "lucide-react";
import { cn } from "../utils/cn";
import { toast } from "sonner";

type CheckoutStep = "address" | "payment" | "confirmation";

interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  paymentMethod: "pix" | "credit_card" | "debit_card";
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<CheckoutStep>("address");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutForm>();
  
  const paymentMethod = watch("paymentMethod", "pix");
  const shippingCost = total > 150 ? 0 : 15.90;
  const finalTotal = total + shippingCost;

  const onSubmit = async (data: CheckoutForm) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setStep("confirmation");
    clearCart();
    toast.success("Pedido realizado com sucesso!");
  };

  if (items.length === 0 && step !== "confirmation") {
    navigate("/");
    return null;
  }

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-[#fff6e9] py-12 px-4 font-newsreader flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <Check size={40} />
          </div>
          <h2 className="text-3xl font-bold text-[#873b0b] mb-4">Pedido Confirmado!</h2>
          <p className="text-[#6c2f09] mb-8">
            Obrigado por comprar na Velvet Slice. Enviaremos as atualizações do seu pedido para o seu e-mail.
          </p>
          <Link 
            to="/" 
            className="block w-full bg-[#e6642f] text-white font-bold py-3 rounded-full hover:bg-[#bd4819] transition-colors"
          >
            Voltar para a Loja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff6e9] py-8 font-newsreader">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-[#873b0b] mb-8 text-center">Finalizar Pedido</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Address Section */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e6642f]/10">
                <h2 className="text-xl font-bold text-[#4f2c1d] mb-6 flex items-center gap-2">
                  <MapPin className="text-[#e6642f]" />
                  Endereço de Entrega
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-[#6c2f09] mb-1">Nome Completo</label>
                    <input 
                      {...register("fullName", { required: true })}
                      className="w-full bg-[#fff6e9]/50 border border-[#e6642f]/20 rounded-lg p-3 outline-none focus:border-[#e6642f]"
                    />
                    {errors.fullName && <span className="text-red-500 text-xs">Campo obrigatório</span>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#6c2f09] mb-1">Email</label>
                    <input 
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      className="w-full bg-[#fff6e9]/50 border border-[#e6642f]/20 rounded-lg p-3 outline-none focus:border-[#e6642f]"
                    />
                    {errors.email && <span className="text-red-500 text-xs">Email inválido</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#6c2f09] mb-1">CPF</label>
                    <input 
                      {...register("cpf", { required: true })}
                      placeholder="000.000.000-00"
                      className="w-full bg-[#fff6e9]/50 border border-[#e6642f]/20 rounded-lg p-3 outline-none focus:border-[#e6642f]"
                    />
                    {errors.cpf && <span className="text-red-500 text-xs">Campo obrigatório</span>}
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-[#6c2f09] mb-1">CEP</label>
                    <input 
                      {...register("cep", { required: true })}
                      placeholder="00000-000"
                      className="w-full bg-[#fff6e9]/50 border border-[#e6642f]/20 rounded-lg p-3 outline-none focus:border-[#e6642f]"
                    />
                    {errors.cep && <span className="text-red-500 text-xs">Campo obrigatório</span>}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-[#6c2f09] mb-1">Rua</label>
                    <input 
                      {...register("street", { required: true })}
                      className="w-full bg-[#fff6e9]/50 border border-[#e6642f]/20 rounded-lg p-3 outline-none focus:border-[#e6642f]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#6c2f09] mb-1">Número</label>
                    <input 
                      {...register("number", { required: true })}
                      className="w-full bg-[#fff6e9]/50 border border-[#e6642f]/20 rounded-lg p-3 outline-none focus:border-[#e6642f]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#6c2f09] mb-1">Complemento</label>
                    <input 
                      {...register("complement")}
                      className="w-full bg-[#fff6e9]/50 border border-[#e6642f]/20 rounded-lg p-3 outline-none focus:border-[#e6642f]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#6c2f09] mb-1">Cidade</label>
                    <input 
                      {...register("city", { required: true })}
                      className="w-full bg-[#fff6e9]/50 border border-[#e6642f]/20 rounded-lg p-3 outline-none focus:border-[#e6642f]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#6c2f09] mb-1">Estado</label>
                    <input 
                      {...register("state", { required: true })}
                      className="w-full bg-[#fff6e9]/50 border border-[#e6642f]/20 rounded-lg p-3 outline-none focus:border-[#e6642f]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e6642f]/10">
                <h2 className="text-xl font-bold text-[#4f2c1d] mb-6 flex items-center gap-2">
                  <CreditCard className="text-[#e6642f]" />
                  Pagamento
                </h2>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <label className={cn(
                    "cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all hover:bg-[#fff6e9]",
                    paymentMethod === "pix" ? "border-[#e6642f] bg-[#fff6e9] text-[#e6642f]" : "border-gray-200 text-gray-500"
                  )}>
                    <input type="radio" value="pix" {...register("paymentMethod")} className="hidden" />
                    <QrCode size={24} />
                    <span className="text-sm font-bold">Pix</span>
                  </label>
                  
                  <label className={cn(
                    "cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all hover:bg-[#fff6e9]",
                    paymentMethod === "credit_card" ? "border-[#e6642f] bg-[#fff6e9] text-[#e6642f]" : "border-gray-200 text-gray-500"
                  )}>
                    <input type="radio" value="credit_card" {...register("paymentMethod")} className="hidden" />
                    <CreditCard size={24} />
                    <span className="text-sm font-bold">Crédito</span>
                  </label>

                  <label className={cn(
                    "cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all hover:bg-[#fff6e9]",
                    paymentMethod === "debit_card" ? "border-[#e6642f] bg-[#fff6e9] text-[#e6642f]" : "border-gray-200 text-gray-500"
                  )}>
                    <input type="radio" value="debit_card" {...register("paymentMethod")} className="hidden" />
                    <CreditCard size={24} />
                    <span className="text-sm font-bold">Débito</span>
                  </label>
                </div>

                {paymentMethod === "pix" && (
                  <div className="text-center p-6 bg-[#fff6e9]/30 rounded-xl border border-dashed border-[#e6642f]">
                    <div className="w-48 h-48 bg-gray-200 mx-auto mb-4 flex items-center justify-center text-gray-400">
                      <QrCode size={64} />
                    </div>
                    <p className="text-[#4f2c1d] font-bold mb-2">Escaneie o QR Code para pagar</p>
                    <p className="text-sm text-[#6c2f09]">O pagamento é aprovado na hora!</p>
                  </div>
                )}

                {(paymentMethod === "credit_card" || paymentMethod === "debit_card") && (
                  <div className="space-y-4 animate-in slide-in-from-top-2">
                    <div>
                      <label className="block text-sm font-medium text-[#6c2f09] mb-1">Número do Cartão</label>
                      <input 
                        {...register("cardNumber")}
                        placeholder="0000 0000 0000 0000"
                        className="w-full bg-[#fff6e9]/50 border border-[#e6642f]/20 rounded-lg p-3 outline-none focus:border-[#e6642f]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6c2f09] mb-1">Nome no Cartão</label>
                      <input 
                        {...register("cardName")}
                        placeholder="Como está impresso no cartão"
                        className="w-full bg-[#fff6e9]/50 border border-[#e6642f]/20 rounded-lg p-3 outline-none focus:border-[#e6642f]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#6c2f09] mb-1">Validade</label>
                        <input 
                          {...register("cardExpiry")}
                          placeholder="MM/AA"
                          className="w-full bg-[#fff6e9]/50 border border-[#e6642f]/20 rounded-lg p-3 outline-none focus:border-[#e6642f]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#6c2f09] mb-1">CVV</label>
                        <input 
                          {...register("cardCvv")}
                          placeholder="123"
                          className="w-full bg-[#fff6e9]/50 border border-[#e6642f]/20 rounded-lg p-3 outline-none focus:border-[#e6642f]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#e6642f]/10 sticky top-24">
              <h3 className="text-xl font-bold text-[#873b0b] mb-6 pb-4 border-b border-[#e6642f]/10">Resumo do Pedido</h3>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-[#6c2f09]">
                    <span>{item.quantity}x {item.name}</span>
                    <span>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pt-4 border-t border-[#e6642f]/10">
                <div className="flex justify-between text-[#6c2f09]">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-[#6c2f09]">
                  <span>Frete</span>
                  <span className="text-[#e6642f]">{shippingCost === 0 ? "Grátis" : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}</span>
                </div>
                <div className="flex justify-between text-[#4f2c1d] font-bold text-xl pt-4 border-t border-[#e6642f]/10 mt-4">
                  <span>Total</span>
                  <span>R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <button 
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                className="w-full bg-[#e6642f] text-white font-bold py-3 rounded-full hover:bg-[#bd4819] transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Confirmar Pagamento"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
