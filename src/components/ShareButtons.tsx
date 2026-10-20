import { Facebook, Linkedin, Twitter, MessageCircle, Link2 } from "lucide-react";
import { toast } from "sonner";

export function ShareButtons({ title, path }: { title: string; path: string }) {
  const url = () => (typeof window !== "undefined" ? window.location.origin : "") + path;
  const open = (u: string) => window.open(u, "_blank", "noopener,width=600,height=500");
  const items = [
    { label: "WhatsApp", icon: MessageCircle, cls: "bg-whatsapp text-primary-foreground", on: () => open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url()}`)}`) },
    { label: "Facebook", icon: Facebook, cls: "bg-navy text-navy-foreground", on: () => open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`) },
    { label: "X", icon: Twitter, cls: "bg-foreground text-background", on: () => open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url())}&text=${encodeURIComponent(title)}`) },
    { label: "LinkedIn", icon: Linkedin, cls: "bg-navy text-navy-foreground", on: () => open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url())}`) },
    { label: "Copiar link", icon: Link2, cls: "border bg-card text-navy", on: async () => { await navigator.clipboard.writeText(url()); toast.success("Link copiado!"); } },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => <button key={i.label} aria-label={`Compartilhar no ${i.label}`} title={i.label} onClick={i.on} className={`flex h-10 w-10 items-center justify-center rounded-full transition hover:scale-110 ${i.cls}`}><i.icon className="h-4 w-4" /></button>)}
    </div>
  );
}
