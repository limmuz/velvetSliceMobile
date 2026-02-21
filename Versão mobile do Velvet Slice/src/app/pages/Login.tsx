import { Link, useNavigate } from "react-router";
import { ArrowLeft, Check } from "lucide-react";
import logo from "figma:asset/b1efc97dcba5fc750a8da36be50b726a6708788b.png";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock login
    setTimeout(() => {
      setLoading(false);
      toast.success("Login realizado com sucesso!");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fff6e9] flex flex-col font-newsreader relative overflow-hidden">
      {/* Background decorations could go here */}
      
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center relative z-10">
        <Link to="/" className="absolute top-8 left-4 md:left-8 flex items-center text-[#4f2c1d] hover:text-[#e6642f] transition-colors">
          <ArrowLeft className="mr-2" size={20} />
          Voltar
        </Link>

        <div className="mb-8 text-center">
          <img src={logo} alt="Velvet Slice" className="h-32 w-auto mx-auto mb-4" />
          <h1 className="text-5xl font-normal text-[#4f2c1d]">Velvet Slice</h1>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-md border border-[#e6642f]/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#e6642f] to-[#873b0b]" />
          
          <h2 className="text-3xl font-bold text-[#4f2c1d] text-center mb-8">Entrar</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[#4f2c1d] font-medium mb-2 text-lg">E-mail</label>
              <input 
                type="email" 
                required
                className="w-full bg-[#fff6e9] border border-[#e6642f]/20 rounded-xl p-4 outline-none focus:border-[#e6642f] transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-[#4f2c1d] font-medium mb-2 text-lg">Senha</label>
              <input 
                type="password" 
                required
                className="w-full bg-[#fff6e9] border border-[#e6642f]/20 rounded-xl p-4 outline-none focus:border-[#e6642f] transition-colors"
                placeholder="********"
              />
              <div className="text-right mt-2">
                <Link to="/esqueci-senha" className="text-[#4f2c1d] hover:text-[#e6642f] text-sm underline decoration-[#4f2c1d] underline-offset-4">
                  Esqueci a minha senha
                </Link>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#4f2c1d] text-white font-medium py-4 rounded-full hover:bg-[#6c2f09] transition-colors shadow-lg tracking-widest text-lg disabled:opacity-70"
            >
              {loading ? "Entrando..." : "LOGIN"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-[#e6642f]/20"></div>
              <span className="flex-shrink-0 mx-4 text-[#a65110] text-lg">ou</span>
              <div className="flex-grow border-t border-[#e6642f]/20"></div>
            </div>

            <p className="text-[#4f2c1d] text-lg">
              Novo na Velvet?{" "}
              <Link to="/cadastro" className="text-[#e6642f] font-bold hover:underline">
                Criar uma conta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
