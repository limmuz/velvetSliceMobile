import { Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import logo from "figma:asset/b1efc97dcba5fc750a8da36be50b726a6708788b.png";
import { useState } from "react";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock registration
    setTimeout(() => {
      setLoading(false);
      toast.success("Cadastro realizado com sucesso!");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fff6e9] flex flex-col font-newsreader relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center relative z-10">
        <Link to="/login" className="absolute top-8 left-4 md:left-8 flex items-center text-[#4f2c1d] hover:text-[#e6642f] transition-colors">
          <ArrowLeft className="mr-2" size={20} />
          Voltar
        </Link>

        <div className="mb-6 text-center">
          <img src={logo} alt="Velvet Slice" className="h-24 w-auto mx-auto mb-2" />
          <h1 className="text-4xl font-normal text-[#4f2c1d]">Velvet Slice</h1>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-2xl border border-[#e6642f]/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#e6642f] to-[#873b0b]" />
          
          <h2 className="text-3xl font-bold text-[#4f2c1d] text-center mb-4">
            Junte-se à Velvet Slice e descubra o sabor de momentos inesquecíveis
          </h2>

          <form onSubmit={handleRegister} className="space-y-6 mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#4f2c1d] font-medium mb-2 text-lg">Nome</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-[#fff6e9] border border-[#e6642f]/20 rounded-xl p-4 outline-none focus:border-[#e6642f] transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>

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
                <label className="block text-[#4f2c1d] font-medium mb-2 text-lg">CPF</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-[#fff6e9] border border-[#e6642f]/20 rounded-xl p-4 outline-none focus:border-[#e6642f] transition-colors"
                  placeholder="000.000.000-00"
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
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-[#4f2c1d] font-medium mb-2 text-lg">Confirmar Senha</label>
                <input 
                  type="password" 
                  required
                  className="w-full bg-[#fff6e9] border border-[#e6642f]/20 rounded-xl p-4 outline-none focus:border-[#e6642f] transition-colors"
                  placeholder="********"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#4f2c1d] text-white font-medium py-4 rounded-full hover:bg-[#6c2f09] transition-colors shadow-lg tracking-widest text-lg disabled:opacity-70 mt-4"
            >
              {loading ? "Cadastrando..." : "CADASTRAR"}
            </button>
          </form>

          <p className="text-[#4f2c1d] text-center mt-6">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-[#e6642f] font-bold hover:underline">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
