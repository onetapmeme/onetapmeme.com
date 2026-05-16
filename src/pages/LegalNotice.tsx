import { ArrowLeft, Building2, Mail, Server, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const LegalNotice = () => {
  const formatDate = () =>
    new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
        </Link>

        <Card className="p-8 md:p-12 bg-card border-2 border-primary/30">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Mentions légales</h1>
          </div>

          <div className="space-y-6 text-foreground/90">
            <p className="text-lg leading-relaxed">
              Les présentes mentions légales s'appliquent au site CardSurgery, laboratoire
              français spécialisé dans la restauration et la préservation esthétique de cartes
              de collection (TCG).
            </p>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Éditeur du site
              </h2>
              <div className="space-y-3 text-foreground/80">
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[200px]">Nom commercial :</span>
                  <span>CardSurgery</span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[200px]">Activité :</span>
                  <span>
                    Restauration, nettoyage et préservation esthétique de cartes à collectionner
                    (Pokémon, One Piece, Lorcana, Magic, Yu-Gi-Oh et autres TCG).
                  </span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[200px]">Pays :</span>
                  <span>France</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Mail className="w-6 h-6 text-primary" />
                Contact
              </h2>
              <div className="space-y-3 text-foreground/80">
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[200px]">Email :</span>
                  <a href="mailto:contact@cardsurgery.com" className="text-primary hover:underline">
                    contact@cardsurgery.com
                  </a>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-center">
                  <span className="font-bold min-w-[200px]">Instagram :</span>
                  <a
                    href="https://www.instagram.com/card_surgery/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Instagram className="w-4 h-4" /> @card_surgery
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Server className="w-6 h-6 text-primary" />
                Hébergement
              </h2>
              <p className="text-foreground/80">
                Le site est hébergé par un prestataire technique européen conforme au RGPD.
                Les données techniques sont traitées au sein de l'Union européenne.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Propriété intellectuelle</h2>
              <p className="text-foreground/80 mb-4">
                L'ensemble des contenus présents sur ce site (textes, identité visuelle, logo,
                photographies de restauration) est la propriété exclusive de CardSurgery, sauf
                mention contraire. Toute reproduction est interdite sans autorisation écrite.
              </p>
              <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded">
                <p className="font-bold text-destructive mb-2">Marques tierces</p>
                <p className="text-foreground/80">
                  CardSurgery est un service totalement indépendant. Pokémon™, One Piece™,
                  Lorcana™, Magic: The Gathering™, Yu-Gi-Oh!™ et toutes les marques associées
                  appartiennent à leurs propriétaires respectifs (Nintendo, The Pokémon Company,
                  Bandai, Disney, Wizards of the Coast, Konami).{" "}
                  <Link to="/non-affiliation" className="text-primary hover:underline">
                    Voir la mention de non-affiliation
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Litiges</h2>
              <p className="text-foreground/80">
                Tout litige relatif à l'utilisation du site ou aux prestations de restauration est
                soumis au droit français. À défaut d'accord amiable, les tribunaux français seront
                seuls compétents.
              </p>
            </div>

            <div className="text-sm text-muted-foreground pt-6 border-t border-border">
              Dernière mise à jour : {formatDate()}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LegalNotice;
