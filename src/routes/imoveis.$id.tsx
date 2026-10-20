import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { BedDouble, Bath, Car, Maximize, MapPin, Check, MessageCircle, Phone, Sparkles } from "lucide-react";
import { PageShell } from "@/components/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { LeadForm } from "@/components/LeadForm";
import { formatPrice, properties, whatsappLink, PHONE } from "@/data/properties";

export const Route = createFileRoute("/imoveis/$id")({
  loader: ({ params }) => {
    const p = properties.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | Premium House` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.title} | Premium House` },
          { property: "og:description", content: loaderData.description },
        ]
      : [{ title: "Imóvel não encontrado | Premium House" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <PageShell><div className="container-x py-32 text-center"><h1 className="text-4xl">Imóvel não encontrado</h1><Link to="/imoveis" className="mt-6 inline-block font-bold text-primary">Ver outros imóveis</Link></div></PageShell>
  ),
  component: Detail,
});

function Detail() {
  const p = Route.useLoaderData();
  const [img, setImg] = useState(0);
  const similar = properties.filter((x) => x.id !== p.id && x.purpose === p.purpose).slice(0, 3);
  const msg = `Olá! Tenho interesse no imóvel ${p.id} - ${p.title}.`;
  const specs = [
    { icon: Maximize, v: `${p.area} m²`, l: "Área útil" },
    { icon: BedDouble, v: p.beds, l: "Quartos" },
    { icon: Sparkles, v: p.suites, l: "Suítes" },
    { icon: Bath, v: p.baths, l: "Banheiros" },
    { icon: Car, v: p.parking, l: "Vagas" },
  ];
  return (
    <PageShell>
      <div className="container-x pt-8">
        <p className="text-sm text-muted-foreground"><Link to="/imoveis" className="hover:text-primary">Imóveis</Link> / {p.type} / Cód. {p.id}</p>
        <div className="mt-5 grid gap-3 md:grid-cols-[2fr_1fr]">
          <img src={p.images[img]} alt={p.title} width={1024} height={768} className="aspect-[16/10] w-full rounded-2xl object-cover" />
          <div className="grid grid-cols-3 gap-3 md:grid-cols-1 md:grid-rows-3">
            {p.images.slice(0, 3).map((src, i) => (
              <button key={i} onClick={() => setImg(i)} className={`overflow-hidden rounded-xl ring-offset-2 ${img === i ? "ring-2 ring-primary" : ""}`}>
                <img src={src} alt="" width={1024} height={768} loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-navy-foreground">{p.purpose}</span>
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{p.type}</span>
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl">{p.title}</h1>
            <p className="mt-3 flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4 text-primary" />{p.neighborhood}, {p.city}</p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {specs.map((s) => (
                <div key={s.l} className="rounded-xl border bg-card p-4 text-center">
                  <s.icon className="mx-auto h-5 w-5 text-primary" />
                  <div className="mt-2 font-extrabold">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
            <h2 className="mt-10 text-3xl">Sobre o imóvel</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{p.description}</p>
            <h2 className="mt-10 text-3xl">Diferenciais</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {p.amenities.map((a) => <li key={a} className="flex items-center gap-2"><Check className="h-5 w-5 rounded-full bg-accent p-0.5 text-primary" />{a}</li>)}
            </ul>
          </div>
          <aside className="h-fit rounded-2xl border bg-card p-6 shadow-float lg:sticky lg:top-32">
            <p className="text-sm text-muted-foreground">{p.purpose === "Venda" ? "Valor de venda" : "Valor do aluguel"}</p>
            <p className="font-display text-4xl text-navy">{formatPrice(p)}</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <a href={whatsappLink(msg)} target="_blank" rel="noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-xl bg-whatsapp font-bold text-primary-foreground hover:brightness-110"><MessageCircle className="h-4 w-4" />WhatsApp</a>
              <a href={`tel:+${PHONE}`} className="flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-navy font-bold text-navy hover:bg-navy hover:text-navy-foreground"><Phone className="h-4 w-4" />Ligar</a>
            </div>
            <div className="my-5 border-t" />
            <p className="mb-3 font-bold">Agende uma visita</p>
            <LeadForm subject={`${p.id} - ${p.title}`} cta="Agendar visita" />
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl md:text-4xl">Imóveis semelhantes</h2>
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{similar.map((x) => <PropertyCard key={x.id} p={x} />)}</div>
          </section>
        )}
      </div>
    </PageShell>
  );
}
