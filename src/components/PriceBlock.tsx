import { brl, rentPrice, salePrice, type Property } from "@/data/properties";

export function PriceBlock({ p, size = "md" }: { p: Property; size?: "md" | "lg" }) {
  const sale = salePrice(p);
  const rent = rentPrice(p);
  const big = size === "lg" ? "font-display text-4xl" : "text-xl font-extrabold";
  const small = size === "lg" ? "font-display text-3xl" : "text-lg font-extrabold";
  const both = sale !== undefined && rent !== undefined;
  return (
    <div className={both && size === "md" ? "grid grid-cols-2 gap-3" : "space-y-2"}>
      {sale !== undefined && (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Venda</p>
          <p className={`${both ? small : big} leading-tight text-navy`}>{brl(sale)}</p>
        </div>
      )}
      {rent !== undefined && (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary">Locação</p>
          <p className={`${both ? small : big} leading-tight text-navy`}>{brl(rent)}<span className="text-sm font-semibold text-muted-foreground">/mês</span></p>
        </div>
      )}
    </div>
  );
}
