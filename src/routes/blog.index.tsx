import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/Layout";
import { PostCard } from "@/components/PostCard";
import { posts } from "@/data/posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog Premium House | Dicas e mercado imobiliário" },
      { name: "description", content: "Guias, tendências e dicas para comprar, vender e alugar imóveis com segurança." },
      { property: "og:title", content: "Blog Premium House" },
      { property: "og:description", content: "Guias, tendências e dicas do mercado imobiliário." },
    ],
  }),
  component: BlogList,
});

function BlogList() {
  const cats = ["Todos", ...new Set(posts.map((p) => p.category))];
  const [cat, setCat] = useState("Todos");
  const list = cat === "Todos" ? posts : posts.filter((p) => p.category === cat);
  return (
    <PageShell>
      <section className="bg-navy py-16 text-navy-foreground">
        <div className="container-x"><p className="text-sm font-bold uppercase tracking-widest text-primary">Blog</p><h1 className="mt-2 text-5xl">Dicas e mercado imobiliário</h1></div>
      </section>
      <div className="container-x mt-10">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-5 py-2 text-sm font-bold ${cat === c ? "border-navy bg-navy text-navy-foreground" : "bg-card"}`}>{c}</button>)}
        </div>
        <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PostCard key={p.slug} post={p} />)}</div>
      </div>
    </PageShell>
  );
}
