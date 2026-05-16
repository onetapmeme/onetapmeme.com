import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const NonAffiliation = () => {
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
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Avis de non-affiliation</h1>
          </div>

          <div className="space-y-6 text-foreground/90">
            <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
              <p className="text-lg leading-relaxed font-medium">
                <strong>CardSurgery</strong> est un service indépendant de restauration et d'entretien
                de cartes à collectionner (TCG). Nous ne sommes <strong>en aucun cas affiliés</strong>,
                associés, autorisés, sponsorisés ou approuvés par les éditeurs, distributeurs ou
                organismes de notation cités sur ce site.
              </p>
            </div>

            <p className="text-lg leading-relaxed">
              CardSurgery intervient à la demande exclusive du propriétaire de la carte, sur du matériel
              qui lui appartient. Nous ne produisons, ne distribuons et ne revendons aucune carte officielle.
            </p>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Marques déposées</h2>
              <p className="text-foreground/80 mb-4">
                Tous les noms de produits, jeux, séries, éditeurs et organismes de notation mentionnés sur ce
                site sont des marques™ ou des marques déposées® de leurs détenteurs respectifs. Leur citation
                à titre purement descriptif n'implique aucune affiliation, partenariat ou approbation.
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span><strong>Pokémon</strong>, Pokémon TCG et toutes les illustrations associées sont des marques de Nintendo, Creatures Inc., GAME FREAK inc. et The Pokémon Company.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span><strong>One Piece Card Game</strong> est une marque de Bandai Co., Ltd. et Shueisha / Toei Animation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span><strong>Magic: The Gathering</strong> est une marque de Wizards of the Coast LLC / Hasbro.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span><strong>Yu-Gi-Oh!</strong> est une marque de Konami Digital Entertainment et Shueisha.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span><strong>Lorcana</strong> est une marque de Ravensburger AG / The Walt Disney Company.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>Les organismes de notation (<strong>PSA, BGS, CGC, SGC</strong>, etc.) sont des entités tierces indépendantes ; CardSurgery ne garantit aucun grade final ni acceptation de la carte restaurée par ces organismes.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Service indépendant</h2>
              <p className="text-foreground/80">
                CardSurgery est un atelier artisanal indépendant spécialisé dans la restauration esthétique
                de cartes à collectionner. Toute prestation est encadrée par nos conditions générales de vente
                et réalisée dans le strict respect du droit de propriété du client sur l'objet confié.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Contact</h2>
              <p className="text-foreground/80">
                Si vous êtes ayant droit d'une marque citée et avez la moindre question sur l'usage qui en
                est fait sur ce site, écrivez-nous à{" "}
                <a href="mailto:contact@cardsurgery.com" className="text-accent hover:underline">
                  contact@cardsurgery.com
                </a>{" "}
                — nous répondons rapidement.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NonAffiliation;
