import { createFileRoute } from "@tanstack/react-router";
import { Camera, Megaphone, BadgeDollarSign } from "lucide-react";
import { PageShell } from "@/components/Layout";
import { LeadForm } from "@/components/LeadForm";

export const Route = createFileRoute("/anunciar")({
  head: () => ({
    meta: [
      { title: "Anuncie seu imóvel | Premium House" },
      { name: "description", content: "Venda ou alugue seu imóvel com avaliação gratuita e divulgação profissional." },
      { property: "og:title", content: "Anuncie seu imóvel | Premium House" },
      { property: "og:description", content: "Avaliação gratuita, fotos profissionais e divulgação nos principais portais." },
    ],
  }),
  component: () => (
    <PageShell>
      <div className="container-x grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Para proprietários</p>
          <h1 className="mt-3 text-5xl">Anuncie seu imóvel com a Premium House</h1>
          <p className="mt-4 text-lg text-muted-foreground">Cuidamos de tudo para você vender ou alugar mais rápido e pelo melhor valor.</p>
          <div className="mt-10 space-y-6">
            {[
              { i: BadgeDollarSign, t: "Avaliação gratuita", d: "Preço certo com base no mercado da sua região." },
              { i: Camera, t: "Fotos profissionais", d: "Apresentação que valoriza cada detalhe." },
              { i: Megaphone, t: "Divulgação ampla", d: "Site, redes sociais e principais portais imobiliários." },
            ].map((f) => (
              <div key={f.t} className="flex gap-4"><span className="h-fit rounded-xl bg-accent p-3 text-primary"><f.i className="h-6 w-6" /></span><div><h3 className="text-xl">{f.t}</h3><p className="text-sm text-muted-foreground">{f.d}</p></div></div>
            ))}
          </div>
        </div>
        <div className="h-fit rounded-3xl border bg-card p-8 shadow-float">
          <h2 className="text-3xl">Solicite uma avaliação</h2>
          <p className="mb-6 mt-1 text-sm text-muted-foreground">Preencha e um consultor entrará em contato.</p>
          <LeadForm cta="Quero avaliar meu imóvel" />
        </div>
      </div>
    </PageShell>
  ),
});
