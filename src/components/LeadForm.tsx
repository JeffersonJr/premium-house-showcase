import { useState } from "react";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/properties";

export function LeadForm({ subject, cta = "Quero ser contatado", withMessage = true, whatsapp }: { subject?: string; cta?: string; withMessage?: boolean; whatsapp?: string }) {
  const [sent, setSent] = useState(false);
  const field = "h-12 w-full rounded-xl border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring";
  if (sent) return <div className="rounded-xl bg-accent p-6 text-center font-semibold text-accent-foreground">Recebemos seu contato! Um corretor falará com você em breve.</div>;
  return (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Mensagem enviada!"); }}>
      <input required placeholder="Seu nome" className={field} />
      <input required type="email" placeholder="Seu e-mail" className={field} />
      <input required type="tel" placeholder="Telefone / WhatsApp" className={field} />
      {withMessage && <textarea rows={3} defaultValue={subject ? `Tenho interesse no imóvel ${subject}.` : ""} placeholder="Mensagem" className={`${field} h-auto py-3`} />}
      <button className="h-12 w-full rounded-xl bg-primary font-bold text-primary-foreground transition hover:brightness-110">{cta}</button>
      {whatsapp && (
        <a href={whatsappLink(whatsapp)} target="_blank" rel="noreferrer" className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-whatsapp font-bold text-primary-foreground transition hover:brightness-110">
          <MessageCircle className="h-5 w-5" /> Chamar no WhatsApp
        </a>
      )}
      <p className="text-center text-[11px] text-muted-foreground">Ao enviar, você concorda com nossa política de privacidade.</p>
    </form>
  );
}
