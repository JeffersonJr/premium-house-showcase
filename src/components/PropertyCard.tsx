import { Link } from "@tanstack/react-router";
import { useState, type MouseEvent } from "react";
import { BedDouble, Bath, Car, Maximize, MapPin, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { type Property } from "@/data/properties";
import { PriceBlock } from "@/components/PriceBlock";
import { shareLink, useFavorites } from "@/lib/favorites";

export function CardActions({ p, className = "" }: { p: Property; className?: string }) {
  const { has, toggle } = useFavorites();
  const fav = has(p.id);
  const stop = (e: MouseEvent, fn: () => void) => { e.preventDefault(); e.stopPropagation(); fn(); };
  const btn = "flex h-10 w-10 items-center justify-center rounded-full bg-card/95 text-navy shadow-card transition hover:scale-110";
  return (
    <div className={`flex gap-2 ${className}`}>
      <button aria-label="Favoritar" onClick={(e) => stop(e, () => toggle(p.id))} className={btn}><Heart className={`h-5 w-5 ${fav ? "fill-destructive text-destructive" : ""}`} /></button>
      <button aria-label="Compartilhar" onClick={(e) => stop(e, () => shareLink(p.title, `/imoveis/${p.id}`))} className={btn}><Share2 className="h-5 w-5" /></button>
    </div>
  );
}

export function PhotoSlider({ p, className = "" }: { p: Property; className?: string }) {
  const [i, setI] = useState(0);
  const n = p.images.length;
  const go = (e: MouseEvent, d: number) => { e.preventDefault(); e.stopPropagation(); setI((x) => (x + d + n) % n); };
  const arrow = "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-navy opacity-0 shadow-card transition group-hover:opacity-100";
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="flex h-full transition-transform duration-500" style={{ transform: `translateX(-${i * 100}%)` }}>
        {p.images.map((src, k) => <img key={k} src={src} alt={`${p.title} foto ${k + 1}`} width={1024} height={768} loading="lazy" className="h-full w-full shrink-0 object-cover" />)}
      </div>
      {n > 1 && (
        <>
          <button aria-label="Foto anterior" onClick={(e) => go(e, -1)} className={`${arrow} left-3`}><ChevronLeft className="h-5 w-5" /></button>
          <button aria-label="Próxima foto" onClick={(e) => go(e, 1)} className={`${arrow} right-3`}><ChevronRight className="h-5 w-5" /></button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {p.images.map((_, k) => <span key={k} className={`h-1.5 rounded-full bg-card transition-all ${k === i ? "w-5" : "w-1.5 opacity-60"}`} />)}
          </div>
        </>
      )}
    </div>
  );
}

export function PropertyCard({ p }: { p: Property }) {
  return (
    <Link to="/imoveis/$id" params={{ id: p.id }} className="group block overflow-hidden rounded-2xl border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-float">
      <div className="relative">
        <PhotoSlider p={p} className="aspect-[4/3]" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-navy-foreground">{p.purpose}</span>
          {p.tag && <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{p.tag}</span>}
        </div>
        <CardActions p={p} className="absolute right-3 top-3" />
      </div>
      <div className="p-5">
        <p className="flex items-center justify-between gap-1 text-xs font-semibold uppercase tracking-wide text-primary"><span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{p.neighborhood}, {p.city}</span><span className="text-muted-foreground">Cód. {p.id}</span></p>
        <h3 className="mt-2 line-clamp-1 text-xl">{p.title}</h3>
        <div className="mt-4 grid grid-cols-4 gap-2 border-y py-3 text-sm font-semibold text-foreground/80">
          <span className="flex flex-col items-center gap-1"><Maximize className="h-6 w-6 text-primary" />{p.area}m²</span>
          <span className="flex flex-col items-center gap-1"><BedDouble className="h-6 w-6 text-primary" />{p.beds} qts</span>
          <span className="flex flex-col items-center gap-1"><Bath className="h-6 w-6 text-primary" />{p.baths} ban</span>
          <span className="flex flex-col items-center gap-1"><Car className="h-6 w-6 text-primary" />{p.parking} vg</span>
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <PriceBlock p={p} />
          <span className="shrink-0 text-sm font-bold text-primary group-hover:underline">Ver →</span>
        </div>
      </div>
    </Link>
  );
}
