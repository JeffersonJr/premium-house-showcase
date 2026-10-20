import { useEffect, useState } from "react";
import { Images, PlayCircle, Rotate3d, X, ChevronLeft, ChevronRight } from "lucide-react";

export function Gallery({ images, title, video, tour }: { images: string[]; title: string; video: string; tour: string }) {
  const [tab, setTab] = useState<"fotos" | "video" | "tour">("fotos");
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); if (e.key === "ArrowRight") setOpen((o) => ((o ?? 0) + 1) % images.length); if (e.key === "ArrowLeft") setOpen((o) => ((o ?? 0) - 1 + images.length) % images.length); };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [open, images.length]);
  const tabs = [
    { k: "fotos" as const, l: `Fotos (${images.length})`, i: Images },
    { k: "video" as const, l: "Vídeo", i: PlayCircle },
    { k: "tour" as const, l: "Tour 360º", i: Rotate3d },
  ];
  return (
    <div>
      <div className="mb-3 flex gap-2">
        {tabs.map((t) => (
          <button key={t.k} onClick={() => setTab(t.k)} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${tab === t.k ? "bg-navy text-navy-foreground" : "border bg-card hover:border-primary"}`}><t.i className="h-4 w-4" />{t.l}</button>
        ))}
      </div>
      {tab === "fotos" && (
        <div className="grid h-[260px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl md:h-[400px]">
          {images.slice(0, 5).map((src, i) => (
            <button key={i} onClick={() => setOpen(i)} className={`relative overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : "hidden md:block"}`}>
              <img src={src} alt={`${title} foto ${i + 1}`} width={1024} height={768} loading={i ? "lazy" : undefined} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              {i === 4 && <span className="absolute inset-0 flex items-center justify-center bg-navy/60 font-bold text-navy-foreground">+{images.length - 5} fotos</span>}
            </button>
          ))}
          <button onClick={() => setOpen(0)} className="col-span-2 row-span-2 flex items-center justify-center bg-muted font-bold md:hidden">Ver as {images.length} fotos</button>
        </div>
      )}
      {tab === "video" && <div className="aspect-video overflow-hidden rounded-2xl bg-muted md:aspect-auto md:h-[400px]"><iframe src={video} title={`Vídeo - ${title}`} className="h-full w-full" loading="lazy" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>}
      {tab === "tour" && <div className="aspect-video overflow-hidden rounded-2xl bg-muted md:aspect-auto md:h-[400px]"><iframe src={tour} title={`Tour 360º - ${title}`} className="h-full w-full" loading="lazy" allow="xr-spatial-tracking; fullscreen" allowFullScreen /></div>}

      {open !== null && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-navy/95 p-4" onClick={() => setOpen(null)}>
          <div className="flex items-center justify-between text-navy-foreground"><span className="text-sm font-bold">{open + 1} / {images.length}</span><button aria-label="Fechar" onClick={() => setOpen(null)}><X className="h-7 w-7" /></button></div>
          <div className="relative flex flex-1 items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button aria-label="Anterior" onClick={() => setOpen((open - 1 + images.length) % images.length)} className="absolute left-2 rounded-full bg-card p-3 text-navy"><ChevronLeft /></button>
            <img src={images[open]} alt={`${title} foto ${open + 1}`} className="max-h-[75vh] max-w-full rounded-xl object-contain" />
            <button aria-label="Próxima" onClick={() => setOpen((open + 1) % images.length)} className="absolute right-2 rounded-full bg-card p-3 text-navy"><ChevronRight /></button>
          </div>
          <div className="flex justify-center gap-2 overflow-x-auto pb-2" onClick={(e) => e.stopPropagation()}>
            {images.map((src, i) => <button key={i} onClick={() => setOpen(i)} className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg ${i === open ? "ring-2 ring-primary" : "opacity-60"}`}><img src={src} alt="" className="h-full w-full object-cover" /></button>)}
          </div>
        </div>
      )}
    </div>
  );
}
