import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Phone, MessageCircle, Mail, MapPin, Instagram, Facebook, Linkedin, Youtube, Clock, Heart } from "lucide-react";
import logo from "@/assets/logo.png";
import { PHONE_LABEL, PHONE_RENT_LABEL, whatsappLink, ADDRESS, HOURS } from "@/data/properties";

const nav = [
  { to: "/", label: "Início" },
  { to: "/imoveis", label: "Imóveis" },
  { to: "/empreendimentos", label: "Empreendimentos" },
  { to: "/blog", label: "Blog" },
  { to: "/anunciar", label: "Anuncie" },
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
          <span className="flex items-center gap-5"><span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-primary" /> <strong>Vendas:</strong> {PHONE_LABEL}</span><span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-primary" /> <strong>Locação:</strong> {PHONE_RENT_LABEL}</span></span>
        </div>
      </div>
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/"><img src={logo} alt="Premium House" width={1280} height={512} className="h-14 w-auto" /></Link>
        <nav className="hidden items-center gap-6 xl:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary" activeProps={{ className: "text-primary" }} activeOptions={{ exact: n.to === "/" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
        <Link to="/favoritos" aria-label="Favoritos" className="rounded-full border p-2.5 text-navy transition hover:border-primary hover:text-primary" activeProps={{ className: "border-primary text-primary" }}><Heart className="h-5 w-5" /></Link>
        <a href={whatsappLink("Olá! Gostaria de falar com um corretor da Premium House.")} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-card transition hover:brightness-110 sm:inline-flex">
          <MessageCircle className="h-4 w-4" /> Fale com um corretor
        </a>
        <button className="xl:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && (
        <nav className="container-x flex flex-col gap-3 pb-5 xl:hidden">
          {nav.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-1 font-semibold">{n.label}</Link>)}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const col = "space-y-2.5 text-sm text-navy-foreground/70";
  const h = "mb-4 font-sans text-sm font-bold uppercase tracking-widest text-navy-foreground";
  return (
    <footer className="mt-24 bg-navy text-navy-foreground">
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="inline-block rounded-xl bg-card p-3"><img src={logo} alt="Premium House" width={1280} height={512} loading="lazy" className="h-12 w-auto" /></div>
          <p className="mt-5 max-w-sm text-sm text-navy-foreground/70">Imóveis selecionados, atendimento consultivo e transparência em cada etapa da sua negociação. CRECI 00000-J.</p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Facebook, Linkedin, Youtube].map((I, i) => <a key={i} href="#" aria-label="Rede social" className="rounded-full bg-navy-foreground/10 p-2.5 transition hover:bg-primary"><I className="h-4 w-4" /></a>)}
          </div>
        </div>
        <div>
          <h4 className={h}>Imóveis</h4>
          <ul className={col}>
            <li><Link to="/imoveis" search={{ finalidade: "Venda" }} className="hover:text-primary">Comprar</Link></li>
            <li><Link to="/imoveis" search={{ finalidade: "Locação" }} className="hover:text-primary">Alugar</Link></li>
            {["Apartamento", "Casa", "Cobertura", "Casa de Campo"].map((t) => <li key={t}><Link to="/imoveis" search={{ tipo: t }} className="hover:text-primary">{t}s</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className={h}>Institucional</h4>
          <ul className={col}>
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-primary">{n.label}</Link></li>)}
            <li><a href="#" className="hover:text-primary">Trabalhe conosco</a></li>
            <li><a href="#" className="hover:text-primary">Política de privacidade</a></li>
          </ul>
        </div>
        <div>
          <h4 className={h}>Contato</h4>
          <ul className="space-y-3 text-sm text-navy-foreground/70">
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-primary" /> Vendas: {PHONE_LABEL}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-primary" /> Locação: {PHONE_RENT_LABEL}</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-primary" /> contato@premiumhouse.com.br</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-primary" /> {ADDRESS}</li>
            <li className="flex gap-2"><Clock className="h-4 w-4 shrink-0 text-primary" />
              <div className="space-y-0.5">{HOURS.map(([d, t]) => <div key={d}><span className="font-semibold text-navy-foreground">{d}:</span> {t}</div>)}</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-navy-foreground/50 md:flex-row">
          <span>© 2026 Premium House Imóveis · Todos os direitos reservados</span>
          <span>Site Premium por Microsistec</span>
        </div>
      </div>
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
