import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  packPriceId: "pack_clean" | "pack_pro" | "pack_full";
  insuranceTierIndex?: number; // 1-5 or undefined
  insuranceQuantity?: 1 | 2;
  dossierRef: string;
  customerEmail?: string;
  returnUrl: string;
  shippingCarrier?: string;
}

export function StripeDossierCheckout(props: Props) {
  const fetchClientSecret = async (): Promise<string> => {
    const { data, error } = await supabase.functions.invoke("create-dossier-checkout", {
      body: {
        packPriceId: props.packPriceId,
        insuranceTierIndex: props.insuranceTierIndex,
        insuranceQuantity: props.insuranceQuantity,
        dossierRef: props.dossierRef,
        customerEmail: props.customerEmail,
        returnUrl: props.returnUrl,
        environment: getStripeEnvironment(),
        shippingCarrier: props.shippingCarrier,
      },
    });
    if (error || !data?.clientSecret) {
      throw new Error(error?.message || "Impossible de créer la session de paiement.");
    }
    return data.clientSecret as string;
  };


  return (
    <div id="checkout" className="w-full">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
