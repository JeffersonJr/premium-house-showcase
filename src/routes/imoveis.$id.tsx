import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { BedDouble, Bath, Car, Maximize, MapPin, Check, Sparkles, Share2, Heart, Navigation, PlayCircle, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { LeadForm } from "@/components/LeadForm";
import { ShareButtons } from "@/components/ShareButtons";
import { shareLink, useFavorites } from "@/lib/favorites";
import { brl, formatPrice, properties } from "@/data/properties";

export const Route = createFileRoute("/imoveis/$id")({
  loader: ({ params }) => {
    const p = properties.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} em ${loaderData.neighborhood} | Premium House` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.title} | Premium House` },
          { property: "og:description", content: loaderData.description },
          { property: "og:type", content: "product" },
        ]
      : [{ title: "Imóvel indisponível | Premium House" }, { name: "robots", content: "noindex" }],
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
  const sec = "rounded-2xl border bg-card p-6 md:p-8";
  return (
    <PageShell>
      <div className="container-x pt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground"><Link to="/" className="hover:text-primary">Início</Link> / <Link to="/imoveis" className="hover:text-primary">Imóveis</Link> / {p.type} / Cód. {p.id}</p>
          <DetailActions id={p.id} title={p.title} />
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-[2fr_1fr]">
          <div className="relative">
            <img src={p.images[img]} alt={p.title} width={1024} height={768} className="aspect-[16/10] w-full rounded-2xl object-cover" />
            <span className="absolute bottom-4 left-4 rounded-full bg-card/90 px-3 py-1 text-xs font-bold">{img + 1} / {p.images.length} fotos</span>
          </div>
          <div className="grid grid-cols-4 gap-3 md:grid-cols-1 md:grid-rows-3">
            {p.images.slice(0, 3).map((src, i) => (
              <button key={i} onClick={() => setImg(i)} className={`overflow-hidden rounded-xl ring-offset-2 ${img === i ? "ring-2 ring-primary" : ""}`}>
                <img src={src} alt="" width={1024} height={768} loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
            <a href="#video" className="flex items-center justify-center gap-2 rounded-xl bg-navy text-sm font-bold text-navy-foreground md:hidden"><PlayCircle className="h-5 w-5" />Vídeo</a>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_390px]">
          <div className="space-y-8">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-navy-foreground">{p.purpose}</span>
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{p.type}</span>
                {p.tag && <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{p.tag}</span>}
              </div>
              <h1 className="mt-4 text-4xl md:text-5xl">{p.title}</h1>
              <p className="mt-3 flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4 text-primary" />{p.neighborhood}, {p.city}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3"><span className="text-sm font-bold">Compartilhar:</span><ShareButtons title={p.title} path={`/imoveis/${p.id}`} /></div>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {specs.map((s) => (
                  <div key={s.l} className="rounded-xl border bg-card p-4 text-center">
                    <s.icon className="mx-auto h-5 w-5 text-primary" />
                    <div className="mt-2 font-extrabold">{s.v}</div>
                    <div className="text-xs text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <section className={sec}>
              <h2 className="text-3xl">Sobre o imóvel</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{p.description} Agende uma visita e conheça pessoalmente cada detalhe deste imóvel selecionado pela Premium House.</p>
              <dl className="mt-6 grid gap-4 border-t pt-6 sm:grid-cols-3">
                <div><dt className="text-xs uppercase text-muted-foreground">{p.purpose === "Venda" ? "Valor de venda" : "Aluguel"}</dt><dd className="font-bold">{formatPrice(p)}</dd></div>
                <div><dt className="text-xs uppercase text-muted-foreground">Condomínio</dt><dd className="font-bold">{brl(p.condo)}/mês</dd></div>
                <div><dt className="text-xs uppercase text-muted-foreground">IPTU</dt><dd className="font-bold">{brl(p.iptu)}/ano</dd></div>
              </dl>
            </section>

            <section className={sec}>
              <h2 className="text-3xl">Características</h2>
              <div className="mt-6 grid gap-8 sm:grid-cols-2">
                {[["Diferenciais", p.amenities] as const, ...Object.entries(p.features)].map(([g, items]) => (
                  <div key={g} className={g === "Diferenciais" ? "sm:col-span-2" : ""}>
                    <h3 className="mb-3 text-lg">{g}</h3>
                    <ul className={`grid gap-2.5 ${g === "Diferenciais" ? "sm:grid-cols-3" : ""}`}>
                      {items.map((a) => <li key={a} className="flex items-center gap-2 text-sm"><Check className="h-5 w-5 shrink-0 rounded-full bg-accent p-0.5 text-primary" />{a}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section id="video" className={sec}>
              <h2 className="text-3xl">Vídeo do imóvel</h2>
              <div className="mt-5 aspect-video overflow-hidden rounded-xl bg-muted">
                <iframe src={p.video} title={`Vídeo - ${p.title}`} className="h-full w-full" loading="lazy" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen />
              </div>
            </section>

            <section className={sec}>
              <h2 className="text-3xl">Localização e proximidades</h2>
              <p className="mt-2 text-sm text-muted-foreground">Localização aproximada · {p.neighborhood}, {p.city}</p>
              <div className="mt-5 aspect-[16/8] overflow-hidden rounded-xl bg-muted">
                <iframe title="Mapa" loading="lazy" className="h-full w-full" src={`https://www.google.com/maps?q=${p.lat},${p.lng}&z=14&output=embed`} />
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {p.nearby.map((n) => (
                  <li key={n.name} className="flex items-center justify-between rounded-xl bg-muted px-4 py-3 text-sm">
                    <span className="flex items-center gap-2 font-semibold"><Navigation className="h-4 w-4 text-primary" />{n.name}</span>
                    <span className="text-muted-foreground">{n.dist}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="h-fit lg:sticky lg:top-32">
            <div className="rounded-2xl border bg-card p-6 shadow-float">
              <p className="text-sm text-muted-foreground">{p.purpose === "Venda" ? "Valor de venda" : "Valor do aluguel"}</p>
              <p className="font-display text-4xl text-navy">{formatPrice(p)}</p>
              <p className="mt-1 text-xs text-muted-foreground">Cond. {brl(p.condo)} · IPTU {brl(p.iptu)}/ano</p>
              <div className="my-5 border-t" />
              <p className="mb-1 text-lg font-bold">Gostou deste imóvel?</p>
              <p className="mb-4 text-sm text-muted-foreground">Receba mais informações agora mesmo.</p>
              <LeadForm subject={`${p.id} - ${p.title}`} cta="Solicitar informações" withMessage={false} whatsapp={msg} />
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-primary" />Seus dados estão protegidos</p>
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

function DetailActions({ id, title }: { id: string; title: string }) {
  const { has, toggle } = useFavorites();
  const fav = has(id);
  return (
    <div className="flex items-center gap-3">
      <button onClick={() => toggle(id)} className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition ${fav ? "border-destructive bg-destructive/10 text-destructive" : "bg-card hover:border-primary"}`}>
        <Heart className={`h-5 w-5 ${fav ? "fill-current" : ""}`} />{fav ? "Favoritado" : "Favoritar"}
      </button>
      <button onClick={() => shareLink(title, `/imoveis/${id}`)} className="flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-bold hover:border-primary"><Share2 className="h-5 w-5" />Compartilhar</button>
    </div>
  );
}
