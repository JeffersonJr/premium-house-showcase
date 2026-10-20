import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { properties } from "@/data/properties";

type Mode = "Venda" | "Locação" | "Código";

export function SearchBar() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("Venda");
  const [type, setType] = useState("");
  const [q, setQ] = useState("");
  const [code, setCode] = useState("");
  const go = () => {
    if (mode === "Código") {
      const c = code.trim().toUpperCase();
      const hit = properties.find((p) => p.id === c || p.id === `PH${c}`);
      if (hit) return navigate({ to: "/imoveis/$id", params: { id: hit.id } });
      return navigate({ to: "/imoveis", search: { q: c || undefined } });
    }
    return navigate({ to: "/imoveis", search: { finalidade: mode, tipo: type || undefined, q: q || undefined } });
  };
  const field = "h-12 w-full rounded-xl border bg-background px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-ring";
  const labels: Record<Mode, string> = { Venda: "Comprar", Locação: "Alugar", Código: "Código" };
  return (
    <div className="rounded-2xl bg-card p-4 shadow-float md:p-5">
      <div className="mb-3 flex gap-2">
        {(["Venda", "Locação", "Código"] as const).map((p) => (
          <button key={p} onClick={() => setMode(p)} className={`rounded-full px-5 py-2 text-sm font-bold transition ${mode === p ? "bg-navy text-navy-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{labels[p]}</button>
        ))}
      </div>
      {mode === "Código" ? (
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input autoFocus value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()} placeholder="Digite o código do imóvel (ex.: PH1024)" className={field} />
          <button onClick={go} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 font-bold text-primary-foreground transition hover:brightness-110"><Search className="h-4 w-4" /> Buscar código</button>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-[1fr_1.6fr_auto]">
          <select value={type} onChange={(e) => setType(e.target.value)} className={field}>
            <option value="">Todos os tipos</option>
            <option>Apartamento</option><option>Casa</option><option>Cobertura</option><option>Casa de Campo</option>
          </select>
          <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()} placeholder="Bairro ou cidade" className={field} />
          <button onClick={go} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 font-bold text-primary-foreground transition hover:brightness-110"><Search className="h-4 w-4" /> Buscar</button>
        </div>
      )}
    </div>
  );
}
