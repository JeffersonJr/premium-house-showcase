import { useState } from "react";
import { toast } from "sonner";

export function LeadForm({ subject, cta = "Quero ser contatado" }: { subject?: string; cta?: string }) {
  const [sent, setSent] = useState(false);
  const field = "h-12 w-full rounded-xl border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring";
  if (sent) return <div className="rounded-xl bg-accent p-6 text-center font-semibold text-accent-foreground">Recebemos seu contato! Um corretor falará com você em breve.</div>;
  return (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Mensagem enviada!"); }}>
      <input required placeholder="Seu nome" className={field} />
      <input required type="email" placeholder="Seu e-mail" className={field} />
      <input required placeholder="Telefone / WhatsApp" className={field} />
      <textarea rows={3} defaultValue={subject ? `Tenho interesse no imóvel ${subject}.` : ""} placeholder="Mensagem" className={`${field} h-auto py-3`} />
      <button className="h-12 w-full rounded-xl bg-primary font-bold text-primary-foreground transition hover:brightness-110">{cta}</button>
    </form>
  );
}
