import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutGrid, List as ListIcon, SlidersHorizontal } from "lucide-react";
import { PageShell } from "@/components/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyRow } from "@/components/PropertyRow";
import { properties } from "@/data/properties";

type S = string | undefined;
type N = number | undefined;
type Search = { finalidade?: S; tipo?: S; q?: S; cidade?: S; bairro?: S; quartos?: N; suites?: N; vagas?: N; banheiros?: N; precoMin?: N; precoMax?: N; areaMin?: N; areaMax?: N; ordem?: S; view?: S };

const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);
const num = (v: unknown) => (v !== undefined && v !== "" && !isNaN(Number(v)) ? Number(v) : undefined);

export const Route = createFileRoute("/imoveis/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    finalidade: str(s["finalidade"]), tipo: str(s["tipo"]), q: str(s["q"]), cidade: str(s["cidade"]), bairro: str(s["bairro"]),
    quartos: num(s["quartos"]), suites: num(s["suites"]), vagas: num(s["vagas"]), banheiros: num(s["banheiros"]),
    precoMin: num(s["precoMin"]), precoMax: num(s["precoMax"]), areaMin: num(s["areaMin"]), areaMax: num(s["areaMax"]),
    ordem: str(s["ordem"]), view: str(s["view"]),
  }),
  head: () => ({
    meta: [
      { title: "Imóveis à venda e para alugar | Premium House" },
      { name: "description", content: "Busque casas, apartamentos e coberturas por tipo, bairro, preço, área e número de quartos." },
      { property: "og:title", content: "Imóveis | Premium House" },
      { property: "og:description", content: "Busque imóveis à venda e para alugar com a Premium House." },
    ],
  }),
  component: List,
});

const cities = [...new Set(properties.map((p) => p.city))];
const hoods = [...new Set(properties.map((p) => p.neighborhood))];

function List() {
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/imoveis/" });
  const [showFilters, setShowFilters] = useState(false);
  const set = (patch: Partial<Search>) => navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });
  const q = s.q?.toLowerCase();
  let list = properties.filter((p) =>
    (!s.finalidade || p.purpose === s.finalidade) && (!s.tipo || p.type === s.tipo) &&
    (!s.cidade || p.city === s.cidade) && (!s.bairro || p.neighborhood === s.bairro) &&
    (!s.quartos || p.beds >= s.quartos) && (!s.suites || p.suites >= s.suites) &&
    (!s.vagas || p.parking >= s.vagas) && (!s.banheiros || p.baths >= s.banheiros) &&
    (!s.precoMin || p.price >= s.precoMin) && (!s.precoMax || p.price <= s.precoMax) &&
    (!s.areaMin || p.area >= s.areaMin) && (!s.areaMax || p.area <= s.areaMax) &&
    (!q || [p.title, p.neighborhood, p.city, p.id].some((x) => x.toLowerCase().includes(q))),
  );
  if (s.ordem === "menor") list = [...list].sort((a, b) => a.price - b.price);
  if (s.ordem === "maior") list = [...list].sort((a, b) => b.price - a.price);
  if (s.ordem === "area") list = [...list].sort((a, b) => b.area - a.area);
  const view = s.view === "lista" ? "lista" : "card";
  const field = "h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring";
  const label = "mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted-foreground";

  const Counter = ({ k, title }: { k: "quartos" | "suites" | "vagas" | "banheiros"; title: string }) => (
    <div>
      <span className={label}>{title}</span>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((n) => (
          <button key={n} onClick={() => set({ [k]: s[k] === n ? undefined : n })} className={`h-9 flex-1 rounded-lg border text-sm font-bold transition ${s[k] === n ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-primary"}`}>{n}+</button>
        ))}
      </div>
    </div>
  );

  return (
    <PageShell>
      <section className="bg-navy py-14 text-navy-foreground">
        <div className="container-x">
          <h1 className="text-4xl md:text-5xl">{s.finalidade === "Locação" ? "Imóveis para alugar" : s.finalidade === "Venda" ? "Imóveis à venda" : "Encontre seu imóvel"}</h1>
          <p className="mt-2 text-navy-foreground/70">{list.length} imóveis encontrados</p>
        </div>
      </section>
      <div className="container-x mt-10 grid gap-8 lg:grid-cols-[300px_1fr]">
        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center justify-center gap-2 rounded-xl border bg-card py-3 font-bold lg:hidden"><SlidersHorizontal className="h-4 w-4" /> Filtros</button>
        <aside className={`${showFilters ? "block" : "hidden"} h-fit space-y-4 rounded-2xl border bg-card p-5 shadow-card lg:sticky lg:top-32 lg:block`}>
          <h2 className="text-xl">Filtrar imóveis</h2>
          <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-muted p-1">
            {[["Venda", "Comprar"], ["Locação", "Alugar"]].map(([v, l]) => (
              <button key={v} onClick={() => set({ finalidade: s.finalidade === v ? undefined : v })} className={`rounded-lg py-2 text-sm font-bold ${s.finalidade === v ? "bg-navy text-navy-foreground" : "text-muted-foreground"}`}>{l}</button>
            ))}
          </div>
          <div><span className={label}>Código ou palavra-chave</span><input defaultValue={s.q} onChange={(e) => set({ q: e.target.value || undefined })} placeholder="Ex.: PH1024" className={field} /></div>
          <div><span className={label}>Tipo de imóvel</span>
            <select value={s.tipo ?? ""} onChange={(e) => set({ tipo: e.target.value || undefined })} className={field}>
              <option value="">Todos os tipos</option><option>Apartamento</option><option>Casa</option><option>Cobertura</option><option>Casa de Campo</option>
            </select></div>
          <div><span className={label}>Cidade</span>
            <select value={s.cidade ?? ""} onChange={(e) => set({ cidade: e.target.value || undefined })} className={field}>
              <option value="">Todas</option>{cities.map((c) => <option key={c}>{c}</option>)}
            </select></div>
          <div><span className={label}>Bairro</span>
            <select value={s.bairro ?? ""} onChange={(e) => set({ bairro: e.target.value || undefined })} className={field}>
              <option value="">Todos</option>{hoods.map((c) => <option key={c}>{c}</option>)}
            </select></div>
          <div><span className={label}>Valor (R$)</span>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" defaultValue={s.precoMin} onChange={(e) => set({ precoMin: num(e.target.value) })} placeholder="Mínimo" className={field} />
              <input type="number" defaultValue={s.precoMax} onChange={(e) => set({ precoMax: num(e.target.value) })} placeholder="Máximo" className={field} />
            </div></div>
          <div><span className={label}>Área (m²)</span>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" defaultValue={s.areaMin} onChange={(e) => set({ areaMin: num(e.target.value) })} placeholder="Mínima" className={field} />
              <input type="number" defaultValue={s.areaMax} onChange={(e) => set({ areaMax: num(e.target.value) })} placeholder="Máxima" className={field} />
            </div></div>
          <Counter k="quartos" title="Quartos" />
          <Counter k="suites" title="Suítes" />
          <Counter k="banheiros" title="Banheiros" />
          <Counter k="vagas" title="Vagas" />
          <button onClick={() => navigate({ search: {} })} className="w-full rounded-xl border-2 border-navy py-2.5 text-sm font-bold text-navy hover:bg-navy hover:text-navy-foreground">Limpar filtros</button>
        </aside>
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground"><strong className="text-foreground">{list.length}</strong> resultados</p>
            <div className="flex items-center gap-2">
              <select value={s.ordem ?? ""} onChange={(e) => set({ ordem: e.target.value || undefined })} className="h-10 rounded-xl border bg-card px-3 text-sm">
                <option value="">Mais relevantes</option><option value="menor">Menor preço</option><option value="maior">Maior preço</option><option value="area">Maior área</option>
              </select>
              <div className="flex rounded-xl border bg-card p-1">
                <button aria-label="Ver em cards" onClick={() => set({ view: undefined })} className={`rounded-lg p-1.5 ${view === "card" ? "bg-navy text-navy-foreground" : "text-muted-foreground"}`}><LayoutGrid className="h-4 w-4" /></button>
                <button aria-label="Ver em lista" onClick={() => set({ view: "lista" })} className={`rounded-lg p-1.5 ${view === "lista" ? "bg-navy text-navy-foreground" : "text-muted-foreground"}`}><ListIcon className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
          {!list.length ? (
            <div className="rounded-2xl border bg-card p-12 text-center text-muted-foreground">Nenhum imóvel encontrado com esses filtros.</div>
          ) : view === "lista" ? (
            <div className="space-y-5">{list.map((p) => <PropertyRow key={p.id} p={p} />)}</div>
          ) : (
            <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">{list.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
