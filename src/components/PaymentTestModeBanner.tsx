import { isStripeTestMode } from "@/lib/stripe";

export function PaymentTestModeBanner() {
  if (!isStripeTestMode()) return null;
  return (
    <div className="w-full bg-orange-100 border-b border-orange-300 px-4 py-2 text-center text-sm text-orange-800">
      Tous les paiements en preview sont en mode test. Utilisez la carte{" "}
      <code className="font-mono bg-white/60 px-1 rounded">4242 4242 4242 4242</code> pour simuler un succès.
    </div>
  );
}
