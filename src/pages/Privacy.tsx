import { ArrowLeft, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Privacy = () => {
  const updated = new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/home">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
        </Link>

        <Card className="p-8 md:p-12 bg-card border-2 border-primary/30">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Politique de confidentialité</h1>
          </div>

          <div className="space-y-6 text-foreground/90">
            <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
              <p className="text-lg leading-relaxed font-medium">
                CardSurgery est un service de restauration de cartes à collectionner (TCG). Nous collectons
                uniquement les informations strictement nécessaires au traitement de votre dossier de
                restauration et à la sécurisation de l'expédition de votre carte.
              </p>
            </div>

            <div className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Eye className="w-6 h-6 text-primary" />
                Données que nous collectons
              </h2>
              <p className="text-foreground/80 mb-4">
                Dans le cadre d'une demande de diagnostic ou d'une prise en charge, nous collectons :
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span><strong>Identité & contact</strong> : nom, prénom, adresse e-mail (et adresse postale au moment de l'expédition retour).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span><strong>Photos de la carte</strong> : images recto, verso, coins et défauts, transmises par vos soins pour le diagnostic.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span><strong>Informations sur la carte</strong> : nom de la carte, TCG, valeur estimée, soins souhaités.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span><strong>Historique du dossier</strong> : numéro de dossier, échanges, photos avant / après, statut de l'intervention.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span><strong>Données de paiement</strong> : traitées exclusivement par notre prestataire de paiement sécurisé. Nous ne stockons aucune coordonnée bancaire.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Finalités du traitement</h2>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2"><span className="text-primary mt-1">▸</span><span>Évaluer le diagnostic de votre carte et établir un devis personnalisé.</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">▸</span><span>Vous transmettre le numéro de dossier, les mises à jour de suivi et les photos avant / après.</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">▸</span><span>Organiser la réception, l'intervention et le renvoi sécurisé de la carte.</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">▸</span><span>Respecter nos obligations comptables et légales liées à la prestation de service.</span></li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Durée de conservation</h2>
              <p className="text-foreground/80">
                Les données liées à votre dossier sont conservées pendant la durée légale (5 à 10 ans pour les
                pièces comptables). Les photos haute définition de votre carte sont conservées 12 mois après la
                fin de l'intervention puis supprimées, sauf demande explicite de votre part.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Sous-traitants</h2>
              <p className="text-foreground/80 mb-3">
                Nous faisons appel à des prestataires techniques pour faire fonctionner le service :
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2"><span className="text-primary mt-1">▸</span><span>Hébergement web et base de données sécurisée (UE).</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">▸</span><span>Prestataire de paiement (Stripe ou équivalent) pour l'encaissement sécurisé.</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">▸</span><span>Transporteurs assurés (La Poste, Chronopost, Mondial Relay…) pour le retour de la carte.</span></li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Vos droits (RGPD)</h2>
              <p className="text-foreground/80 mb-3">
                Conformément au Règlement Général sur la Protection des Données, vous disposez d'un droit
                d'accès, de rectification, d'effacement, d'opposition, de portabilité et de limitation du
                traitement de vos données.
              </p>
              <p className="text-foreground/80">
                Pour exercer ces droits, contactez-nous à{" "}
                <a href="mailto:contact@cardsurgery.com" className="text-accent hover:underline">contact@cardsurgery.com</a>.
                Nous répondons sous 30 jours maximum.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Cookies</h2>
              <p className="text-foreground/80">
                Le site n'utilise que les cookies strictement nécessaires à son fonctionnement (préférences
                de langue, session de suivi de dossier). Aucun cookie publicitaire ni de profilage n'est déposé.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Modifications</h2>
              <p className="text-foreground/80">
                Cette politique peut être mise à jour pour refléter l'évolution du service ou de la réglementation.
                Toute modification est publiée sur cette page avec une nouvelle date de révision.
              </p>
            </div>

            <div className="text-sm text-muted-foreground pt-6 border-t border-border">
              Dernière mise à jour : {updated}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
