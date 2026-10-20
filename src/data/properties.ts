import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import hero from "@/assets/hero.jpg";

export type Property = {
  id: string;
  title: string;
  type: "Apartamento" | "Casa" | "Cobertura" | "Casa de Campo";
  purpose: "Venda" | "Locação";
  neighborhood: string;
  city: string;
  price: number;
  area: number;
  beds: number;
  suites: number;
  baths: number;
  parking: number;
  images: string[];
  featured?: boolean;
  tag?: string;
  description: string;
  amenities: string[];
  nearby: { name: string; dist: string }[];
  features: Record<string, string[]>;
  video: string;
  condo: number;
  iptu: number;
  lat: number;
  lng: number;
};

export const PHONE = "5511999999999";
export const PHONE_LABEL = "(11) 99999-9999";

const base: Omit<Property, Extra>[] = [
  { id: "PH1024", title: "Casa contemporânea com piscina", type: "Casa", purpose: "Venda", neighborhood: "Alphaville", city: "Barueri", price: 4850000, area: 520, beds: 4, suites: 4, baths: 6, parking: 4, images: [hero, p4, p5, p1], featured: true, tag: "Exclusivo", description: "Projeto assinado com integração total entre áreas sociais e jardim tropical. Piscina aquecida, espaço gourmet e acabamentos de alto padrão.", amenities: ["Piscina aquecida", "Espaço gourmet", "Automação", "Energia solar", "Segurança 24h"] },
  { id: "PH1031", title: "Apartamento alto padrão com vista", type: "Apartamento", purpose: "Venda", neighborhood: "Itaim Bibi", city: "São Paulo", price: 2390000, area: 168, beds: 3, suites: 2, baths: 3, parking: 2, images: [p1, p5, p4], featured: true, tag: "Lançamento", description: "Andar alto com vista panorâmica, living amplo com caixilhos piso-teto e condomínio completo de lazer.", amenities: ["Academia", "Piscina", "Varanda gourmet", "Portaria 24h"] },
  { id: "PH1045", title: "Sobrado moderno em condomínio", type: "Casa", purpose: "Venda", neighborhood: "Granja Viana", city: "Cotia", price: 1590000, area: 290, beds: 3, suites: 3, baths: 4, parking: 3, images: [p2, p4, p5], featured: true, description: "Sobrado novo em condomínio fechado, jardim privativo e muita luz natural.", amenities: ["Condomínio fechado", "Jardim", "Churrasqueira", "Playground"] },
  { id: "PH1052", title: "Cobertura duplex frente mar", type: "Cobertura", purpose: "Venda", neighborhood: "Riviera de São Lourenço", city: "Bertioga", price: 6900000, area: 410, beds: 5, suites: 5, baths: 7, parking: 4, images: [p3, p1, p5], featured: true, tag: "Frente mar", description: "Cobertura com piscina de borda infinita e pôr do sol sobre o oceano. Uma experiência única.", amenities: ["Borda infinita", "Frente mar", "Sauna", "Elevador privativo"] },
  { id: "PH1060", title: "Apartamento decorado para locação", type: "Apartamento", purpose: "Locação", neighborhood: "Vila Nova Conceição", city: "São Paulo", price: 14500, area: 132, beds: 2, suites: 2, baths: 3, parking: 2, images: [p5, p4, p1], featured: true, description: "Mobiliado e decorado, pronto para morar ao lado do Parque Ibirapuera.", amenities: ["Mobiliado", "Pet friendly", "Academia", "Coworking"] },
  { id: "PH1077", title: "Casa de campo com vista para serra", type: "Casa de Campo", purpose: "Venda", neighborhood: "Serra da Mantiqueira", city: "Campos do Jordão", price: 2150000, area: 340, beds: 4, suites: 2, baths: 4, parking: 4, images: [p6, p4, p5], featured: true, tag: "Oportunidade", description: "Refúgio com deck de madeira, lareira e vista deslumbrante para as montanhas.", amenities: ["Lareira", "Deck", "Pomar", "Área verde 5.000 m²"] },
  { id: "PH1083", title: "Loft com cozinha gourmet", type: "Apartamento", purpose: "Locação", neighborhood: "Pinheiros", city: "São Paulo", price: 8900, area: 85, beds: 1, suites: 1, baths: 2, parking: 1, images: [p4, p1], description: "Loft com pé-direito duplo e cozinha integrada, perto do metrô.", amenities: ["Pé-direito duplo", "Rooftop", "Bicicletário"] },
  { id: "PH1090", title: "Casa térrea com jardim", type: "Casa", purpose: "Locação", neighborhood: "Alto de Pinheiros", city: "São Paulo", price: 22000, area: 380, beds: 4, suites: 3, baths: 5, parking: 4, images: [p2, p5, p4], description: "Casa térrea em rua arborizada, jardim amplo e piscina.", amenities: ["Piscina", "Jardim", "Edícula"] },
];

export function formatPrice(p: Property) {
  const v = p.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  return p.purpose === "Locação" ? `${v}/mês` : v;
}

export function whatsappLink(msg: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

type Extra = "nearby" | "features" | "video" | "condo" | "iptu" | "lat" | "lng";

const coords: Record<string, [number, number]> = {
  Barueri: [-23.5022, -46.8486], "São Paulo": [-23.5868, -46.6823], Cotia: [-23.6037, -46.8919],
  Bertioga: [-23.8065, -46.0262], "Campos do Jordão": [-22.7396, -45.5912],
};

export const properties: Property[] = base.map((p, i) => ({
  ...p,
  condo: p.type.startsWith("Casa") ? 1200 + i * 150 : 1800 + i * 200,
  iptu: Math.round(p.price * (p.purpose === "Venda" ? 0.0006 : 0.05)),
  video: "https://www.youtube.com/embed/zumJJUL_ruM",
  lat: coords[p.city]?.[0] ?? -23.55,
  lng: coords[p.city]?.[1] ?? -46.63,
  nearby: [
    { name: "Supermercado", dist: `${300 + i * 50} m` }, { name: "Escola bilíngue", dist: `${600 + i * 40} m` },
    { name: "Parque", dist: `${800 + i * 30} m` }, { name: "Hospital", dist: `${1.2 + i * 0.2} km`.replace(".", ",") },
    { name: "Shopping", dist: `${1.5 + i * 0.3} km`.replace(/(\.\d)\d+/, "$1").replace(".", ",") }, { name: "Academia", dist: `${200 + i * 20} m` },
  ],
  features: {
    "Imóvel": ["Piso porcelanato", "Ar-condicionado", "Armários planejados", "Varanda", "Aquecimento a gás", "Closet"],
    "Condomínio": ["Portaria 24h", "Piscina", "Academia", "Salão de festas", "Playground", "Espaço pet"],
  },
}));

export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
export const ADDRESS = "Av. Paulista, 1000 – Bela Vista, São Paulo/SP";
export const HOURS = [["Seg. a sex.", "9h às 19h"], ["Sábado", "9h às 14h"], ["Domingo", "Plantão via WhatsApp"]] as const;
