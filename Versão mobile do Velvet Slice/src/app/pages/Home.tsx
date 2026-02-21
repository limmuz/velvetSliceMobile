import { Link } from "react-router";
import { motion } from "motion/react";

// Images
import imgHero from "figma:asset/d2cae036d6bbbed9a56a76c6a142a7dbe727fe23.png";
import imgCaseirinho from "figma:asset/32d06827515a9172289f6eeced550f4851a52723.png";
import imgMel from "figma:asset/ce8ef70164f8c780d0015c3b3962451256549880.png";
import imgFrutado from "figma:asset/4491599488880a526a8a4d582757cd8b283b8983.png";
import imgEncanto from "figma:asset/1190534f4c8deee65b0b821248d4ca1a5e8c3cf5.png";
import imgCaramelo from "figma:asset/5c58efe6c70a430e8af8ec91ab917ff5b9973cc5.png";
import imgTropical from "figma:asset/4804ea1a267b0d061257a4cd4d57ff7f02b26176.png";
import imgVeludo from "figma:asset/a45ea1a56ee8910f5973d897c2cef09c718af61e.png";
import imgAbout from "figma:asset/a35c21bcd608f2a06c54f60f813a61bef476d467.png";
import imgOrder from "figma:asset/d2c437b1cfa265562d0aad7691d00cf173d13d24.png";
import imgReviewWedding from "figma:asset/a20888c2dddcaa53ab3705c4d04b61cae294a6cc.png";
import imgReviewBirthday from "figma:asset/561f094e688dd1ac747f7a874f19264c27fab478.png";
import imgReview15 from "figma:asset/7c8da093f1ed9e74c46d4056b269c0cd143f0a31.png";

const products = [
  { id: "caseirinho", name: "Caseirinho", price: 79.90, image: imgCaseirinho },
  { id: "mel-e-amor", name: "Mel e Amor", price: 82.90, image: imgMel },
  { id: "frutado", name: "Frutado", price: 89.90, image: imgFrutado },
  { id: "encanto", name: "Encanto", price: 94.90, image: imgEncanto },
  { id: "caramelo", name: "Caramelo", price: 85.90, image: imgCaramelo },
  { id: "tropical", name: "Tropical", price: 85.90, image: imgTropical },
  { id: "veludo", name: "Veludo", price: 199.90, image: imgVeludo, featured: true },
];

export default function Home() {
  return (
    <div className="bg-[#fff6e9] min-h-screen font-newsreader overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-8 pb-16 px-4 md:pt-16 md:pb-24">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left z-10"
          >
            <h1 className="font-parisienne text-[#873b0b] text-6xl md:text-8xl mb-4">
              Sua confeitaria online
            </h1>
            <p className="text-[#e6642f] text-2xl md:text-3xl font-light italic mb-8">
              Delicadeza que derrete na boca
            </p>
            <Link 
              to="/produtos" 
              className="inline-block px-8 py-4 bg-[#e6642f] text-white rounded-full text-xl font-medium hover:bg-[#bd4819] transition-transform hover:scale-105 shadow-lg"
            >
              Escolha o seu bolo
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img src={imgHero} alt="Bolo delicioso" className="w-full h-auto rounded-xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500" />
          </motion.div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="produtos" className="py-16 px-4 bg-white/50 scroll-mt-20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#873b0b] text-5xl italic font-light mb-4">Catálogo</h2>
            <div className="flex flex-wrap justify-center gap-4 text-[#140600] font-bold text-lg">
              <span className="bg-white px-6 py-2 rounded-full shadow-sm border border-[#e6642f]/20 cursor-pointer hover:bg-[#fff6e9]">Mais Vendidos</span>
              <span className="bg-white px-6 py-2 rounded-full shadow-sm border border-[#e6642f]/20 cursor-pointer hover:bg-[#fff6e9]">Bolos Personalizados</span>
              <span className="bg-white px-6 py-2 rounded-full shadow-sm border border-[#e6642f]/20 cursor-pointer hover:bg-[#fff6e9]">Sabores Especiais</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link to={`/produto/${product.id}`} key={product.id} className="block group h-full">
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="aspect-[4/5] w-full relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
                    <p className="text-[#e6642f] text-xl font-bold bg-white/90 inline-block px-3 py-1 rounded-full">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How to Order */}
      <section id="contato" className="py-16 px-4 relative overflow-hidden scroll-mt-20">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img src={imgOrder} alt="Fazendo pedido" className="w-full h-auto rounded-2xl shadow-lg" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-[#873b0b] text-5xl italic font-light mb-8">Como fazer um pedido?</h2>
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#e6642f]/10">
              <p className="text-[#bd4819] text-xl font-light mb-8">
                Informe seus dados e entraremos em contato com você em instantes!
              </p>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[#4f2c1d] font-medium mb-2">Nome</label>
                  <input type="text" className="w-full bg-[#fff6e9] border border-[#e6642f]/20 rounded-lg p-3 outline-none focus:border-[#e6642f]" placeholder="Seu nome completo" />
                </div>
                <div>
                  <label className="block text-[#4f2c1d] font-medium mb-2">Telefone</label>
                  <input type="tel" className="w-full bg-[#fff6e9] border border-[#e6642f]/20 rounded-lg p-3 outline-none focus:border-[#e6642f]" placeholder="(00) 00000-0000" />
                </div>
                <button className="w-full bg-[#e6642f] text-white font-medium py-3 rounded-full hover:bg-[#bd4819] transition-colors shadow-md">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16 px-4 bg-white scroll-mt-20">
        <div className="container mx-auto">
          <h2 className="text-[#873b0b] text-5xl italic font-light text-center mb-16">Reviews</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-[#fff6e9] shadow-lg">
                <img src={imgReviewWedding} alt="Casamento" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-[#bd4819] text-xl font-bold mb-2">Casamento</h3>
              <p className="text-[#4f2c1d] italic font-light px-4">
                "Queremos agradecer imensamente à Velvet Slice pelo trabalho incrível na nossa festa de casamento. Os bolos estavam lindos e deliciosos!"
              </p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-[#fff6e9] shadow-lg">
                <img src={imgReview15} alt="15 Anos" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-[#bd4819] text-xl font-bold mb-2">Festa de 15 anos</h3>
              <p className="text-[#4f2c1d] italic font-light px-4">
                "Nosso agradecimento especial à Velvet Slice pelo excelente trabalho na festa de 15 anos da nossa filha. O bolo ficou perfeito!"
              </p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-[#fff6e9] shadow-lg">
                <img src={imgReviewBirthday} alt="Aniversário" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-[#bd4819] text-xl font-bold mb-2">Aniversário</h3>
              <p className="text-[#4f2c1d] italic font-light px-4">
                "Obrigado, Velvet Slice, por tornar a festa de aniversário do nosso filho inesquecível! O bolo estava maravilhoso!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="sobre" className="py-16 px-4 bg-[#fff6e9] scroll-mt-20">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img src={imgAbout} alt="Sobre nós" className="w-full h-auto rounded-lg shadow-xl" />
          </div>
          <div>
            <h2 className="text-[#6c2f09] text-5xl italic font-bold mb-6">Sobre nós...</h2>
            <div className="space-y-6 text-[#6c2f09] text-lg font-light italic leading-relaxed">
              <p>
                A Velvet Slice nasceu da paixão por confeitaria artesanal e do desejo de transformar momentos simples em memórias inesquecíveis. Inspirados pelas tradições europeias e pelo carinho das receitas caseiras, mergulhamos fundo no universo dos bolos decorados.
              </p>
              <p>
                Cada bolo que criamos respeita a arte da confeitaria clássica, mas traz também um toque de inovação e personalidade. Buscamos as melhores matérias-primas, priorizando ingredientes naturais.
              </p>
              <p>
                <span className="text-[#b85026] font-normal">Nosso segredo:</span> <span className="text-[#873b0b]">fazer tudo com propósito. Da escolha do recheio à finalização da decoração, cada etapa é feita com cuidado, pensando em você.</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
