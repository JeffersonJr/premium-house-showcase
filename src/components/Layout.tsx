import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Phone, MessageCircle, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo.png";
import { PHONE_LABEL, whatsappLink } from "@/data/properties";

const nav = [
  { to: "/", label: "Início" },
  { to: "/imoveis", label: "Imóveis" },
  { to: "/anunciar", label: "Anuncie seu imóvel" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-card/90 backdrop-blur">
      <div className="hidden bg-navy text-navy-foreground text-xs md:block">
        <div className="container-x flex h-9 items-center justify-between">
          <span>CRECI 00000-J · Atendimento de seg. a sáb.</span>
          <span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {PHONE_LABEL}</span>
        </div>
      </div>
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/"><img src={logo} alt="Premium House" width={1280} height={512} className="h-14 w-auto" /></Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary" activeProps={{ className: "text-primary" }} activeOptions={{ exact: n.to === "/" }}>{n.label}</Link>
          ))}
        </nav>
        <a href={whatsappLink("Olá! Gostaria de falar com um corretor da Premium House.")} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-card transition hover:brightness-110 lg:inline-flex">
          <MessageCircle className="h-4 w-4" /> Fale com um corretor
        </a>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="container-x flex flex-col gap-3 pb-5 lg:hidden">
          {nav.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-1 font-semibold">{n.label}</Link>)}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-navy text-navy-foreground">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="inline-block rounded-xl bg-card p-3"><img src={logo} alt="Premium House" width={1280} height={512} loading="lazy" className="h-12 w-auto" /></div>
          <p className="mt-5 max-w-sm text-sm text-navy-foreground/70">Imóveis selecionados, atendimento consultivo e transparência em cada etapa da sua negociação.</p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Instagram" className="rounded-full bg-navy-foreground/10 p-2.5 hover:bg-primary"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="rounded-full bg-navy-foreground/10 p-2.5 hover:bg-primary"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-bold">Navegação</h4>
          <ul className="space-y-2 text-sm text-navy-foreground/70">
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-primary">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-bold">Contato</h4>
          <ul className="space-y-3 text-sm text-navy-foreground/70">
            <li className="flex gap-2"><Phone className="h-4 w-4 text-primary" /> {PHONE_LABEL}</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-primary" /> contato@premiumhouse.com.br</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-primary" /> Av. Paulista, 1000 – São Paulo/SP</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10 py-5 text-center text-xs text-navy-foreground/50">© 2026 Premium House · Site Premium por Microsistec</div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a href={whatsappLink("Olá! Vim pelo site da Premium House.")} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-float transition hover:scale-110">
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (<><Header /><main>{children}</main><Footer /><WhatsAppFloat /></>);
}
