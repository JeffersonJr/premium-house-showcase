import { createFileRoute } from "@tanstack/react-router";
import p2 from "@/assets/p2.jpg";
import { PageShell } from "@/components/Layout";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a Premium House | Imobiliária" },
      { name: "description", content: "Conheça a Premium House, imobiliária focada em atendimento consultivo e imóveis selecionados." },
      { property: "og:title", content: "Sobre a Premium House" },
      { property: "og:description", content: "Atendimento consultivo e imóveis selecionados há mais de 25 anos." },
    ],
  }),
  component: () => (
    <PageShell>
      <div className="container-x grid items-center gap-12 py-16 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Quem somos</p>
          <h1 className="mt-3 text-5xl">Mais de 25 anos realizando sonhos.</h1>
          <p className="mt-5 leading-relaxed text-muted-foreground">A Premium House nasceu para oferecer uma experiência imobiliária diferente: curadoria cuidadosa, transparência e um atendimento próximo, do primeiro contato à entrega das chaves.</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">Nossa equipe conhece cada região em que atua e usa dados de mercado para garantir as melhores negociações.</p>
        </div>
        <img src={p2} alt="Imóvel Premium House" width={1024} height={768} loading="lazy" className="rounded-3xl shadow-float" />
      </div>
    </PageShell>
  ),
});
