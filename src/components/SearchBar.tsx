import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState<"Venda" | "Locação">("Venda");
  const [type, setType] = useState("");
  const [q, setQ] = useState("");
  const go = () => navigate({ to: "/imoveis", search: { finalidade: purpose, tipo: type || undefined, q: q || undefined } });
  const field = "h-12 w-full rounded-xl border bg-background px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-ring";
  return (
    <div className={`rounded-2xl bg-card p-4 shadow-float ${compact ? "" : "md:p-5"}`}>
      <div className="mb-3 flex gap-2">
        {(["Venda", "Locação"] as const).map((p) => (
          <button key={p} onClick={() => setPurpose(p)} className={`rounded-full px-5 py-2 text-sm font-bold transition ${purpose === p ? "bg-navy text-navy-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{p === "Venda" ? "Comprar" : "Alugar"}</button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-[1fr_1.6fr_auto]">
        <select value={type} onChange={(e) => setType(e.target.value)} className={field}>
          <option value="">Todos os tipos</option>
          <option>Apartamento</option><option>Casa</option><option>Cobertura</option><option>Casa de Campo</option>
        </select>
        <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()} placeholder="Bairro, cidade ou código do imóvel" className={field} />
        <button onClick={go} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 font-bold text-primary-foreground transition hover:brightness-110"><Search className="h-4 w-4" /> Buscar</button>
      </div>
    </div>
  );
}
