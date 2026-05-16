import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Disclaimer = () => {
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
            <AlertTriangle className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-bold text-foreground">Avertissement</h1>
          </div>

          <div className="space-y-6 text-foreground/90">
            <p className="text-lg leading-relaxed">
              CardSurgery est un atelier indépendant de restauration esthétique de cartes à collectionner.
              Nos interventions visent à améliorer visuellement l'état d'une carte (nettoyage, polissage,
              correction de micro-rayures, redressage). Elles ne constituent ni une garantie de grading,
              ni une expertise d'authenticité, ni une garantie financière.
            </p>

            <div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
              <p className="font-bold text-accent mb-2">À retenir avant toute intervention</p>
              <p className="text-foreground/80">
                Toute restauration est une intervention physique sur un objet de collection. Bien que nos
                gestes soient maîtrisés et non invasifs, l'amélioration esthétique finale dépend de l'état
                initial de la carte et reste une appréciation subjective.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Limites du service</h2>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▸</span><span>Le grade final attribué par un organisme tiers (PSA, BGS, CGC, SGC…) reste à leur entière discrétion.</span></li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▸</span><span>Certains organismes de notation peuvent considérer qu'une carte restaurée n'est plus éligible : à vous d'en tenir compte avant toute demande.</span></li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▸</span><span>Aucune intervention ne modifie ni n'altère l'authenticité de la carte ; nous n'intervenons jamais sur les motifs imprimés.</span></li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▸</span><span>Les délais annoncés sont indicatifs et peuvent varier selon l'état de la carte et la charge de l'atelier.</span></li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Votre responsabilité</h2>
              <p className="text-foreground/80">
                En confiant votre carte à CardSurgery, vous reconnaissez en être le propriétaire légitime
                et avoir lu nos conditions générales de vente. L'expédition de la carte est sous votre
                responsabilité jusqu'à réception en atelier ; nous recommandons un envoi assuré et suivi.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Disclaimer;
