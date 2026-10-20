import p1 from "@/assets/p1.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import banner2 from "@/assets/banner2.jpg";

export type Post = { slug: string; title: string; category: string; date: string; read: string; img: string; excerpt: string; body: string[] };

const lorem = [
  "Comprar ou alugar um imóvel é uma das decisões mais importantes da vida. Por isso, reunimos neste artigo as orientações da equipe Premium House para que você faça a melhor escolha com segurança.",
  "O primeiro passo é entender o seu momento: quanto pode investir, quais regiões fazem sentido para a sua rotina e quais características são indispensáveis. Com isso claro, a busca fica muito mais objetiva.",
  "Em seguida, vale analisar a documentação do imóvel, o histórico do condomínio e o potencial de valorização da região. Nossos corretores fazem essa checagem completa antes de qualquer proposta.",
  "Por fim, conte com uma assessoria que acompanhe todas as etapas — da visita à assinatura do contrato. Esse cuidado evita surpresas e garante uma negociação tranquila.",
];

export const posts: Post[] = [
  { slug: "como-financiar-primeiro-imovel-2026", title: "Como financiar seu primeiro imóvel em 2026", category: "Guia", date: "12 out 2026", read: "6 min", img: p4, excerpt: "Entenda taxas, entrada, prazos e o passo a passo para conseguir o melhor financiamento.", body: lorem },
  { slug: "valorizacao-imoveis-frente-mar", title: "Litoral norte: a valorização dos imóveis frente mar", category: "Mercado", date: "05 out 2026", read: "5 min", img: p3, excerpt: "Por que as regiões litorâneas seguem entre as mais valorizadas do país.", body: lorem },
  { slug: "valorizar-apartamento-antes-de-vender", title: "5 ideias para valorizar seu apartamento antes de vender", category: "Decoração", date: "28 set 2026", read: "4 min", img: p1, excerpt: "Pequenas mudanças que fazem grande diferença no valor e no tempo de venda.", body: lorem },
  { slug: "documentos-para-alugar-imovel", title: "Quais documentos são necessários para alugar um imóvel", category: "Locação", date: "20 set 2026", read: "3 min", img: p5, excerpt: "Checklist completo para inquilinos e proprietários.", body: lorem },
  { slug: "casa-de-campo-investimento", title: "Casa de campo: lazer ou investimento?", category: "Mercado", date: "11 set 2026", read: "5 min", img: p6, excerpt: "Vantagens de ter um refúgio na serra e como avaliar o retorno.", body: lorem },
  { slug: "checklist-mudanca", title: "Checklist da mudança: do contrato às chaves", category: "Guia", date: "02 set 2026", read: "4 min", img: banner2, excerpt: "Organize cada etapa e evite imprevistos no grande dia.", body: lorem },
];
