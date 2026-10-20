import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageShell } from "@/components/Layout";
import { LeadForm } from "@/components/LeadForm";
import { PHONE_LABEL } from "@/data/properties";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato | Premium House" },
      { name: "description", content: "Fale com a Premium House por telefone, WhatsApp ou e-mail." },
      { property: "og:title", content: "Contato | Premium House" },
      { property: "og:description", content: "Fale com um corretor da Premium House." },
    ],
  }),
  component: () => (
    <PageShell>
      <div className="container-x grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <h1 className="text-5xl">Fale com a gente</h1>
          <p className="mt-4 text-muted-foreground">Estamos prontos para ajudar você a encontrar o imóvel ideal.</p>
          <ul className="mt-10 space-y-5">
            {[[Phone, PHONE_LABEL], [Mail, "contato@premiumhouse.com.br"], [MapPin, "Av. Paulista, 1000 – São Paulo/SP"], [Clock, "Seg. a sex. 9h–19h · Sáb. 9h–14h"]].map(([I, t], i) => {
              const Icon = I as typeof Phone;
              return <li key={i} className="flex items-center gap-4"><span className="rounded-xl bg-accent p-3 text-primary"><Icon className="h-5 w-5" /></span>{t as string}</li>;
            })}
          </ul>
        </div>
        <div className="rounded-3xl border bg-card p-8 shadow-float"><LeadForm cta="Enviar mensagem" /></div>
      </div>
    </PageShell>
  ),
});
