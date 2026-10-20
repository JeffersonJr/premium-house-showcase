import { Link } from "@tanstack/react-router";
import { BedDouble, Bath, Car, Maximize, MapPin } from "lucide-react";
import { formatPrice, type Property } from "@/data/properties";

export function PropertyRow({ p }: { p: Property }) {
  return (
    <Link to="/imoveis/$id" params={{ id: p.id }} className="group grid overflow-hidden rounded-2xl border bg-card shadow-card transition hover:shadow-float sm:grid-cols-[300px_1fr]">
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto">
        <img src={p.images[0]} alt={p.title} width={1024} height={768} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-navy px-3 py-1 text-xs font-bold text-navy-foreground">{p.purpose}</span>
      </div>
      <div className="flex flex-col p-6">
        <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-primary"><MapPin className="h-3.5 w-3.5" />{p.neighborhood}, {p.city} · Cód. {p.id}</p>
        <h3 className="mt-2 text-2xl">{p.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Maximize className="h-4 w-4" />{p.area} m²</span>
          <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" />{p.beds} quartos</span>
          <span className="flex items-center gap-1"><Bath className="h-4 w-4" />{p.baths} banheiros</span>
          <span className="flex items-center gap-1"><Car className="h-4 w-4" />{p.parking} vagas</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-2xl font-extrabold text-navy">{formatPrice(p)}</span>
          <span className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground">Ver detalhes</span>
        </div>
      </div>
    </Link>
  );
}
