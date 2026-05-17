import { ShieldCheck, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { INSURANCE_TIERS, PACK_MULTI_LEG } from "@/lib/insurance";

interface Props {
  pack: string; // 'clean' | 'pro' | 'full'
  selectedTierIndex: number;
  onChange: (tierIndex: number) => void;
}

export function InsuranceTierSelector({ pack, selectedTierIndex, onChange }: Props) {
  const multiLeg = !!PACK_MULTI_LEG[pack];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-semibold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-accent" />
          Niveau d'assurance Ad Valorem
        </p>
        {multiLeg && (
          <span className="text-[10px] uppercase tracking-wider bg-accent/10 text-accent px-2 py-1 rounded font-bold">
            ×2 trajets inclus
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Choisissez la couverture qui correspond à la valeur déclarée de votre carte.
        {multiLeg && " Le pack Full Surgery facture cette assurance deux fois (envoi et retour via le grader)."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {INSURANCE_TIERS.map((t) => {
          const isSelected = selectedTierIndex === t.index;
          const displayedFee = multiLeg ? t.feeEuros * 2 : t.feeEuros;
          return (
            <button
              key={t.index}
              type="button"
              onClick={() => onChange(t.index)}
              className={cn(
                "relative text-left rounded-lg border-2 p-3 transition-all hover:border-accent/60",
                isSelected
                  ? "border-accent bg-accent/10 shadow-[0_0_0_3px_hsl(var(--accent)/0.15)]"
                  : "border-border bg-card",
              )}
              aria-pressed={isSelected}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
              )}
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                Tier {t.index}
              </p>
              <p className="text-sm font-bold mt-1">
                jusqu'à {t.capEuros.toLocaleString("fr-FR")} €
              </p>
              <p className="text-lg font-bold text-accent mt-1 font-mono">
                {displayedFee.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </p>
              {multiLeg && (
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  ({t.feeEuros.toFixed(2)} € × 2)
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
