import imgCaseirinho from "figma:asset/32d06827515a9172289f6eeced550f4851a52723.png";
import imgMel from "figma:asset/ce8ef70164f8c780d0015c3b3962451256549880.png";
import imgFrutado from "figma:asset/4491599488880a526a8a4d582757cd8b283b8983.png";
import imgEncanto from "figma:asset/1190534f4c8deee65b0b821248d4ca1a5e8c3cf5.png";
import imgCaramelo from "figma:asset/5c58efe6c70a430e8af8ec91ab917ff5b9973cc5.png";
import imgTropical from "figma:asset/4804ea1a267b0d061257a4cd4d57ff7f02b26176.png";
import imgVeludo from "figma:asset/a45ea1a56ee8910f5973d897c2cef09c718af61e.png";

export const products = [
  { 
    id: "caseirinho", 
    name: "Caseirinho", 
    price: 79.90, 
    image: imgCaseirinho,
    description: "Um clássico irresistível. Massa fofinha de chocolate com cobertura cremosa de brigadeiro gourmet e granulado crocante."
  },
  { 
    id: "mel-e-amor", 
    name: "Mel e Amor", 
    price: 82.90, 
    image: imgMel,
    description: "A combinação perfeita de pão de mel com um toque de especiarias e doce de leite caseiro. Amor em cada fatia."
  },
  { 
    id: "frutado", 
    name: "Frutado", 
    price: 89.90, 
    image: imgFrutado,
    description: "Refrescante e leve. Massa de baunilha com recheio de frutas vermelhas frescas e chantilly suave."
  },
  { 
    id: "encanto", 
    name: "Encanto", 
    price: 94.90, 
    image: imgEncanto,
    description: "Um bolo encantador com camadas de frutas silvestres e um toque especial de amora."
  },
  { 
    id: "caramelo", 
    name: "Caramelo", 
    price: 85.90, 
    image: imgCaramelo,
    description: "Para os amantes de caramelo salgado. Massa amanteigada com recheio de caramelo toffee e nozes."
  },
  { 
    id: "tropical", 
    name: "Tropical", 
    price: 85.90, 
    image: imgTropical,
    description: "O sabor do verão o ano todo. Bolo de coco com abacaxi e um toque de hortelã."
  },
  { 
    id: "veludo", 
    name: "Veludo", 
    price: 199.90, 
    image: imgVeludo,
    description: "Nossa assinatura. O verdadeiro Red Velvet com recheio de cream cheese frosting original e frutas vermelhas para decorar.",
    featured: true 
  },
];
