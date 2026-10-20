import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { properties } from "@/data/properties";

type Search = { finalidade?: string | undefined; tipo?: string | undefined; q?: string | undefined; quartos?: number | undefined; ordem?: string | undefined };

export const Route = createFileRoute("/imoveis/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    finalidade: typeof s["finalidade"] === "string" ? s["finalidade"] : undefined,
    tipo: typeof s["tipo"] === "string" ? s["tipo"] : undefined,
    q: typeof s["q"] === "string" ? s["q"] : undefined,
    quartos: s["quartos"] ? Number(s["quartos"]) : undefined,
    ordem: typeof s["ordem"] === "string" ? s["ordem"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Imóveis à venda e para alugar | Premium House" },
      { name: "description", content: "Busque casas, apartamentos e coberturas por tipo, bairro e número de quartos." },
      { property: "og:title", content: "Imóveis | Premium House" },
      { property: "og:description", content: "Busque imóveis à venda e para alugar com a Premium House." },
    ],
  }),
  component: List,
});

function List() {
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/imoveis/" });
  const set = (patch: Partial<Search>) => navigate({ search: (prev) => ({ ...prev, ...patch }) });
  const q = s.q?.toLowerCase();
  let list = properties.filter((p) =>
    (!s.finalidade || p.purpose === s.finalidade) &&
    (!s.tipo || p.type === s.tipo) &&
    (!s.quartos || p.beds >= s.quartos) &&
    (!q || [p.title, p.neighborhood, p.city, p.id].some((x) => x.toLowerCase().includes(q))),
  );
  if (s.ordem === "menor") list = [...list].sort((a, b) => a.price - b.price);
  if (s.ordem === "maior") list = [...list].sort((a, b) => b.price - a.price);
  const field = "h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring";

  return (
    <PageShell>
      <section className="bg-navy py-14 text-navy-foreground">
        <div className="container-x">
          <h1 className="text-4xl md:text-5xl">Encontre seu imóvel</h1>
          <p className="mt-2 text-navy-foreground/70">{list.length} imóveis encontrados</p>
        </div>
      </section>
      <div className="container-x mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit space-y-4 rounded-2xl border bg-card p-5 shadow-card lg:sticky lg:top-32">
          <h2 className="text-xl">Filtros</h2>
          <input defaultValue={s.q} onChange={(e) => set({ q: e.target.value || undefined })} placeholder="Bairro, cidade ou código" className={field} />
          <select value={s.finalidade ?? ""} onChange={(e) => set({ finalidade: e.target.value || undefined })} className={field}>
            <option value="">Comprar ou alugar</option><option value="Venda">Comprar</option><option value="Locação">Alugar</option>
          </select>
          <select value={s.tipo ?? ""} onChange={(e) => set({ tipo: e.target.value || undefined })} className={field}>
            <option value="">Todos os tipos</option><option>Apartamento</option><option>Casa</option><option>Cobertura</option><option>Casa de Campo</option>
          </select>
          <div>
            <p className="mb-2 text-sm font-semibold">Quartos</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((n) => (
                <button key={n} onClick={() => set({ quartos: s.quartos === n ? undefined : n })} className={`h-10 flex-1 rounded-lg border text-sm font-bold ${s.quartos === n ? "border-primary bg-primary text-primary-foreground" : "bg-background"}`}>{n}+</button>
              ))}
            </div>
          </div>
          <button onClick={() => navigate({ search: {} })} className="w-full text-sm font-semibold text-primary hover:underline">Limpar filtros</button>
        </aside>
        <div>
          <div className="mb-5 flex justify-end">
            <select value={s.ordem ?? ""} onChange={(e) => set({ ordem: e.target.value || undefined })} className="h-10 rounded-xl border bg-card px-3 text-sm">
              <option value="">Mais relevantes</option><option value="menor">Menor preço</option><option value="maior">Maior preço</option>
            </select>
          </div>
          {list.length ? (
            <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">{list.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
          ) : (
            <div className="rounded-2xl border bg-card p-12 text-center text-muted-foreground">Nenhum imóvel encontrado com esses filtros.</div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
