import { Link } from "react-router";
import { cn } from "../utils/cn";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#fff6e9] pt-12 pb-6 border-t border-[#e6642f]/10 font-newsreader">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold text-[#4f2c1d] mb-4">Velvet Slice</h3>
            <p className="text-[#6c2f09] text-base leading-relaxed mb-6">
              Descubra a doçura que transforma momentos em memórias. Velvet Slice, bolos artesanais pensados para te encantar em cada detalhe.
            </p>
          </div>

          {/* Sobre */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold text-[#a65110] mb-4">Sobre</h4>
            <ul className="space-y-2 text-[#4f2c1d]">
              <li><Link to="/sobre" className="hover:text-[#e6642f] transition-colors">Quem somos</Link></li>
              <li><Link to="/historia" className="hover:text-[#e6642f] transition-colors">Nossa história</Link></li>
              <li><Link to="/equipe" className="hover:text-[#e6642f] transition-colors">Nossa equipe</Link></li>
              <li><Link to="/valores" className="hover:text-[#e6642f] transition-colors">Missão e valores</Link></li>
              <li><Link to="/depoimentos" className="hover:text-[#e6642f] transition-colors">Depoimentos</Link></li>
            </ul>
          </div>

          {/* Atendimento */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold text-[#a65110] mb-4">Atendimento</h4>
            <ul className="space-y-2 text-[#4f2c1d]">
              <li><Link to="/contato" className="hover:text-[#e6642f] transition-colors">Contato</Link></li>
              <li><Link to="/localizacao" className="hover:text-[#e6642f] transition-colors">Localização</Link></li>
              <li><Link to="/encomendas" className="hover:text-[#e6642f] transition-colors">Encomendas</Link></li>
              <li><Link to="/faq" className="hover:text-[#e6642f] transition-colors">Perguntas frequentes</Link></li>
              <li><Link to="/horarios" className="hover:text-[#e6642f] transition-colors">Horários de funcionamento</Link></li>
            </ul>
          </div>

          {/* Explore */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold text-[#a65110] mb-4">Explore</h4>
            <ul className="space-y-2 text-[#4f2c1d]">
              <li><Link to="/blog" className="hover:text-[#e6642f] transition-colors">Blog de receitas</Link></li>
              <li><Link to="/promocoes" className="hover:text-[#e6642f] transition-colors">Promoções</Link></li>
              <li><Link to="/eventos" className="hover:text-[#e6642f] transition-colors">Eventos e novidades</Link></li>
              <li><Link to="/dicas" className="hover:text-[#e6642f] transition-colors">Dicas de conservação</Link></li>
              <li><Link to="/galeria" className="hover:text-[#e6642f] transition-colors">Galeria de fotos</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#e6642f]/10 flex flex-col md:flex-row justify-between items-center text-sm text-[#4f2c1d] gap-4">
          <p>Copyright© {currentYear} Velvet Slice. Todos os direitos reservados.</p>
          <div className="flex gap-6 font-medium">
            <Link to="/privacidade" className="hover:text-[#e6642f]">Política de Privacidade</Link>
            <Link to="/termos" className="hover:text-[#e6642f]">Termos de Uso</Link>
            <Link to="/legal" className="hover:text-[#e6642f]">Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
