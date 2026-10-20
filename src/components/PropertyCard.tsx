import { Link } from "@tanstack/react-router";
import { BedDouble, Bath, Car, Maximize, MapPin } from "lucide-react";
import { formatPrice, type Property } from "@/data/properties";

export function PropertyCard({ p }: { p: Property }) {
  return (
    <Link to="/imoveis/$id" params={{ id: p.id }} className="group block overflow-hidden rounded-2xl border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-float">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={p.images[0]} alt={p.title} width={1024} height={768} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-navy-foreground">{p.purpose}</span>
          {p.tag && <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{p.tag}</span>}
        </div>
        <span className="absolute bottom-3 right-3 rounded-md bg-card/90 px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">Cód. {p.id}</span>
      </div>
      <div className="p-5">
        <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-primary"><MapPin className="h-3.5 w-3.5" />{p.neighborhood}, {p.city}</p>
        <h3 className="mt-2 line-clamp-1 text-xl">{p.title}</h3>
        <div className="mt-4 grid grid-cols-4 gap-2 border-y py-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5" />{p.area}m²</span>
          <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" />{p.beds}</span>
          <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{p.baths}</span>
          <span className="flex items-center gap-1"><Car className="h-3.5 w-3.5" />{p.parking}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-extrabold text-navy">{formatPrice(p)}</span>
          <span className="text-sm font-bold text-primary group-hover:underline">Ver detalhes →</span>
        </div>
      </div>
    </Link>
  );
}
