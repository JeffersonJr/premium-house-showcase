import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck, KeyRound, Handshake, TrendingUp, Building2, Home, Trees, Waves, Star, Search, CalendarCheck, FileSignature, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import hero from "@/assets/hero.jpg";
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner2.jpg";
import p1 from "@/assets/p1.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p6 from "@/assets/p6.jpg";
import { PageShell } from "@/components/Layout";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { LeadForm } from "@/components/LeadForm";
import { properties } from "@/data/properties";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premium House | Imóveis de alto padrão à venda e para alugar" },
      { name: "description", content: "Casas, apartamentos, coberturas e casas de campo de alto padrão para comprar ou alugar em São Paulo, Alphaville, litoral e serra." },
      { name: "keywords", content: "imobiliária, imóveis de alto padrão, apartamentos à venda, casas em condomínio, coberturas, aluguel São Paulo, Alphaville, Itaim Bibi" },
      { property: "og:title", content: "Premium House | Imóveis de alto padrão" },
      { property: "og:description", content: "Casas, apartamentos e coberturas selecionadas para comprar ou alugar." },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({ "@context": "https://schema.org", "@type": "RealEstateAgent", name: "Premium House", telephone: "+55 11 99999-9999", address: { "@type": "PostalAddress", streetAddress: "Av. Paulista, 1000", addressLocality: "São Paulo", addressRegion: "SP", addressCountry: "BR" } }),
    }],
  }),
  component: Index,
});

const cats = [
  { label: "Apartamentos", tipo: "Apartamento", icon: Building2 },
  { label: "Casas", tipo: "Casa", icon: Home },
  { label: "Coberturas", tipo: "Cobertura", icon: Waves },
  { label: "Casas de Campo", tipo: "Casa de Campo", icon: Trees },
];

const banners = [
  { img: banner1, kicker: "Lançamento exclusivo", title: "Skyline Residences: viva no alto do Itaim", cta: "Conhecer o lançamento", to: { tipo: "Apartamento" } },
  { img: banner2, kicker: "Financiamento facilitado", title: "Sua casa nova com condições especiais", cta: "Ver casas à venda", to: { tipo: "Casa", finalidade: "Venda" } },
];

const hoods = [
  { name: "Itaim Bibi", city: "São Paulo", img: p1, n: 128 },
  { name: "Riviera", city: "Bertioga", img: p3, n: 64 },
  { name: "Alphaville", city: "Barueri", img: hero, n: 212 },
  { name: "Campos do Jordão", city: "Serra", img: p6, n: 41 },
];

const tags = [
  "Apartamento à venda Itaim Bibi", "Casa em condomínio Alphaville", "Cobertura frente mar", "Apartamento para alugar São Paulo",
  "Casa de campo Campos do Jordão", "Imóveis de luxo SP", "Apartamento Vila Nova Conceição", "Sobrado Granja Viana",
  "Imóvel com piscina", "Apartamento mobiliado", "Riviera de São Lourenço", "Casa térrea Alto de Pinheiros",
  "Loft Pinheiros", "Apartamento 3 suítes", "Imóvel pet friendly", "Lançamentos imobiliários", "Casa com área gourmet", "Apartamento com varanda gourmet",
];

function Index() {
  const featured = properties.filter((p) => p.featured);
  const rentals = properties.filter((p) => p.purpose === "Locação");
  return (
    <PageShell>
      <section className="relative flex min-h-[88vh] items-center">
        <img src={hero} alt="Casa de alto padrão com piscina" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="container-x relative py-20">
          <span className="inline-block rounded-full bg-primary/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-foreground">+ de 1.200 imóveis selecionados</span>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[1.05] text-navy-foreground md:text-7xl">O imóvel dos seus sonhos começa aqui.</h1>
          <p className="mt-5 max-w-xl text-lg text-navy-foreground/85">Curadoria de imóveis de alto padrão e um time de corretores que entende o que você procura.</p>
          <div className="mt-10 max-w-4xl"><SearchBar /></div>
        </div>
      </section>

      <section className="container-x relative z-10 -mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {cats.map((c) => (
          <Link key={c.tipo} to="/imoveis" search={{ tipo: c.tipo }} className="group flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-card transition hover:border-primary">
            <span className="rounded-xl bg-accent p-3 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground"><c.icon className="h-6 w-6" /></span>
            <span className="font-bold">{c.label}</span>
          </Link>
        ))}
      </section>

      <SectionHead kicker="Destaques" title="Imóveis em destaque" link={{ label: "Ver todos à venda", search: { finalidade: "Venda" } }} />
      <div className="container-x mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {featured.slice(0, 6).map((p) => <PropertyCard key={p.id} p={p} />)}
      </div>

      <BannerCarousel />

      <SectionHead kicker="Locação" title="Para alugar e morar já" link={{ label: "Ver todos para alugar", search: { finalidade: "Locação" } }} />
      <div className="container-x mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {rentals.slice(0, 3).map((p) => <PropertyCard key={p.id} p={p} />)}
      </div>

      <SectionHead kicker="Regiões" title="Explore por bairro" />
      <div className="container-x mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {hoods.map((h) => (
          <Link key={h.name} to="/imoveis" search={{ q: h.name.split(" ")[0] }} className="group relative h-80 overflow-hidden rounded-2xl">
            <img src={h.img} alt={h.name} width={1024} height={768} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-hero-overlay" />
            <div className="absolute bottom-0 p-6 text-navy-foreground">
              <p className="text-xs uppercase tracking-widest text-navy-foreground/70">{h.city}</p>
              <h3 className="text-2xl">{h.name}</h3>
              <p className="mt-1 text-sm font-semibold text-navy-foreground/85">{h.n} imóveis →</p>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-24 bg-secondary py-20">
        <div className="container-x">
          <div className="text-center"><p className="text-sm font-bold uppercase tracking-widest text-primary">Por que a Premium House</p><h2 className="mt-2 text-4xl md:text-5xl">Experiência de compra sem preocupação</h2></div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { icon: ShieldCheck, t: "Segurança jurídica", d: "Toda documentação analisada por especialistas." },
              { icon: KeyRound, t: "Imóveis exclusivos", d: "Opções que você não encontra em outros portais." },
              { icon: Handshake, t: "Atendimento consultivo", d: "Um corretor dedicado do início ao fim." },
              { icon: TrendingUp, t: "Avaliação precisa", d: "Preço justo com base em dados de mercado." },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl bg-card p-7 shadow-card">
                <f.icon className="h-9 w-9 text-primary" />
                <h3 className="mt-4 text-xl">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[["25+", "anos de mercado"], ["1.200", "imóveis na carteira"], ["4.800", "famílias atendidas"], ["98%", "clientes satisfeitos"]].map(([n, l]) => (
              <div key={l}><div className="font-display text-5xl text-navy">{n}</div><div className="mt-1 text-sm text-muted-foreground">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x mt-24">
        <div className="text-center"><p className="text-sm font-bold uppercase tracking-widest text-primary">Como funciona</p><h2 className="mt-2 text-4xl md:text-5xl">Do primeiro clique às chaves</h2></div>
        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {[
            { i: Search, t: "Busque", d: "Filtre entre centenas de imóveis selecionados." },
            { i: CalendarCheck, t: "Agende a visita", d: "Escolha o melhor horário com um corretor." },
            { i: FileSignature, t: "Negocie com segurança", d: "Proposta, análise e contrato sem burocracia." },
            { i: KeyRound, t: "Receba as chaves", d: "Acompanhamos você até a mudança." },
          ].map((s, i) => (
            <div key={s.t} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-navy-foreground shadow-float"><s.i className="h-7 w-7" /></div>
              <span className="absolute left-1/2 top-0 ml-6 rounded-full bg-primary px-2 text-xs font-bold text-primary-foreground">{i + 1}</span>
              <h3 className="mt-5 text-xl">{s.t}</h3><p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 bg-navy py-20 text-navy-foreground">
        <div className="container-x">
          <h2 className="text-center text-4xl md:text-5xl">O que dizem nossos clientes</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["Mariana e Rafael", "Compraram em Alphaville", "Atendimento impecável. Encontramos nossa casa em duas semanas e toda a documentação foi tranquila."],
              ["Carlos Menezes", "Alugou no Itaim Bibi", "Processo rápido e transparente. O corretor entendeu exatamente o que eu precisava."],
              ["Fernanda Lima", "Vendeu na Granja Viana", "Venderam meu imóvel pelo valor justo e em tempo recorde. Recomendo de olhos fechados."],
            ].map(([n, s, t]) => (
              <figure key={n} className="rounded-2xl bg-navy-foreground/5 p-7">
                <Quote className="h-8 w-8 text-primary" />
                <div className="mt-3 flex gap-0.5 text-primary">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <blockquote className="mt-4 text-navy-foreground/85">“{t}”</blockquote>
                <figcaption className="mt-5"><div className="font-bold">{n}</div><div className="text-sm text-navy-foreground/60">{s}</div></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <SectionHead kicker="Blog" title="Dicas e mercado imobiliário" />
      <div className="container-x mt-10 grid gap-7 md:grid-cols-3">
        {[
          [p4, "Guia", "Como financiar seu primeiro imóvel em 2026"],
          [p3, "Mercado", "Litoral norte: a valorização dos imóveis frente mar"],
          [p1, "Decoração", "5 ideias para valorizar seu apartamento antes de vender"],
        ].map(([img, c, t]) => (
          <article key={t} className="group overflow-hidden rounded-2xl border bg-card shadow-card">
            <div className="aspect-[16/10] overflow-hidden"><img src={img} alt={t} width={1024} height={768} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
            <div className="p-6"><span className="text-xs font-bold uppercase tracking-widest text-primary">{c}</span><h3 className="mt-2 text-xl">{t}</h3><span className="mt-3 inline-block text-sm font-bold text-navy">Ler artigo →</span></div>
          </article>
        ))}
      </div>

      <section className="container-x mt-24">
        <div className="grid overflow-hidden rounded-3xl bg-brand-gradient md:grid-cols-2">
          <div className="p-10 text-navy-foreground md:p-14">
            <p className="text-sm font-bold uppercase tracking-widest text-navy-foreground/70">Proprietário?</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Venda ou alugue seu imóvel com quem entende.</h2>
            <p className="mt-4 text-navy-foreground/80">Avaliação gratuita, fotos profissionais e divulgação nos principais portais.</p>
            <Link to="/anunciar" className="mt-8 inline-block rounded-full bg-card px-7 py-3 font-bold text-navy transition hover:scale-105">Anunciar meu imóvel</Link>
          </div>
          <div className="bg-card/95 p-8 md:p-12">
            <h3 className="text-2xl">Fale com um especialista</h3>
            <p className="mb-5 mt-1 text-sm text-muted-foreground">Retornamos em até 30 minutos em horário comercial.</p>
            <LeadForm cta="Solicitar contato" />
          </div>
        </div>
      </section>

      <section className="container-x mt-24">
        <h2 className="text-2xl">Buscas populares</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Link key={t} to="/imoveis" search={{ q: t.split(" ").slice(-2).join(" ") }} className="rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground transition hover:border-primary hover:text-primary">{t}</Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function SectionHead({ kicker, title, link }: { kicker: string; title: string; link?: { label: string; search: Record<string, string> } }) {
  return (
    <div className="container-x mt-24 flex flex-wrap items-end justify-between gap-4">
      <div><p className="text-sm font-bold uppercase tracking-widest text-primary">{kicker}</p><h2 className="mt-2 text-4xl md:text-5xl">{title}</h2></div>
      {link && <Link to="/imoveis" search={link.search} className="rounded-full border-2 border-navy px-6 py-2.5 text-sm font-bold text-navy transition hover:bg-navy hover:text-navy-foreground">{link.label}</Link>}
    </div>
  );
}

function BannerCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % banners.length), 6000); return () => clearInterval(t); }, []);
  const b = banners[i]!;
  return (
    <section className="container-x mt-24">
      <div className="relative h-[340px] overflow-hidden rounded-3xl md:h-[400px]">
        {banners.map((x, k) => (
          <img key={k} src={x.img} alt={x.title} width={1600} height={640} loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${k === i ? "opacity-100" : "opacity-0"}`} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-transparent" />
        <div className="relative flex h-full max-w-xl flex-col justify-center p-8 text-navy-foreground md:p-14">
          <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground">{b.kicker}</span>
          <h2 className="mt-4 text-4xl md:text-5xl">{b.title}</h2>
          <Link to="/imoveis" search={b.to} className="mt-7 w-fit rounded-full bg-card px-7 py-3 font-bold text-navy transition hover:scale-105">{b.cta}</Link>
        </div>
        <div className="absolute bottom-5 right-5 flex gap-2">
          <button aria-label="Anterior" onClick={() => setI((i - 1 + banners.length) % banners.length)} className="rounded-full bg-card/90 p-2 text-navy"><ChevronLeft className="h-5 w-5" /></button>
          <button aria-label="Próximo" onClick={() => setI((i + 1) % banners.length)} className="rounded-full bg-card/90 p-2 text-navy"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
    </section>
  );
}
