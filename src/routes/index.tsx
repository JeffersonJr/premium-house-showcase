import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, KeyRound, Handshake, TrendingUp, Building2, Home, Trees, Waves } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { PageShell } from "@/components/Layout";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { LeadForm } from "@/components/LeadForm";
import { properties } from "@/data/properties";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premium House | Imóveis de alto padrão" },
      { name: "description", content: "Encontre casas, apartamentos e coberturas selecionadas para comprar ou alugar com a Premium House." },
      { property: "og:title", content: "Premium House | Imóveis de alto padrão" },
      { property: "og:description", content: "Casas, apartamentos e coberturas selecionadas para comprar ou alugar." },
    ],
  }),
  component: Index,
});

const cats = [
  { label: "Apartamentos", tipo: "Apartamento", icon: Building2 },
  { label: "Casas", tipo: "Casa", icon: Home },
  { label: "Coberturas", tipo: "Cobertura", icon: Waves },
  { label: "Casas de Campo", tipo: "Casa de Campo", icon: Trees },
];

function Index() {
  const featured = properties.filter((p) => p.featured);
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

      <section className="container-x -mt-10 relative z-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {cats.map((c) => (
          <Link key={c.tipo} to="/imoveis" search={{ tipo: c.tipo }} className="group flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-card transition hover:border-primary">
            <span className="rounded-xl bg-accent p-3 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground"><c.icon className="h-6 w-6" /></span>
            <span className="font-bold">{c.label}</span>
          </Link>
        ))}
      </section>

      <section className="container-x mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Destaques</p>
            <h2 className="mt-2 text-4xl md:text-5xl">Imóveis em destaque</h2>
          </div>
          <Link to="/imoveis" className="rounded-full border-2 border-navy px-6 py-2.5 text-sm font-bold text-navy transition hover:bg-navy hover:text-navy-foreground">Ver todos os imóveis</Link>
        </div>
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => <PropertyCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="mt-24 bg-secondary py-20">
        <div className="container-x grid gap-6 md:grid-cols-4">
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
        <div className="container-x mt-12 grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {[["25+", "anos de mercado"], ["1.200", "imóveis na carteira"], ["4.800", "famílias atendidas"], ["98%", "clientes satisfeitos"]].map(([n, l]) => (
            <div key={l}><div className="font-display text-5xl text-navy">{n}</div><div className="mt-1 text-sm text-muted-foreground">{l}</div></div>
          ))}
        </div>
      </section>

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
    </PageShell>
  );
}
