import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories: { category: string; questions: { q: string; a: string }[] }[] = [
  {
    category: "Général",
    questions: [
      {
        q: "Qu'est-ce que CardSurgery ?",
        a: "CardSurgery est un laboratoire spécialisé dans la restauration, le nettoyage et la préservation esthétique de cartes à collectionner de haute valeur.",
      },
      {
        q: "Pourquoi faire restaurer ses cartes ?",
        a: "La restauration permet d'éliminer les impuretés et d'atténuer les défauts de surface afin de maximiser le « Eye-Appeal » de la carte avant une certification (Grading).",
      },
      {
        q: "Est-ce affilié à Nintendo, Bandai ou aux éditeurs officiels ?",
        a: "Non. CardSurgery est un service totalement indépendant. Nous ne sommes pas affiliés à Nintendo, The Pokémon Company, Bandai ou tout autre éditeur de TCG.",
      },
      {
        q: "Qu'est-ce qui rend la technologie 1Tap différente des méthodes classiques ?",
        a: "Notre protocole unique « Technologie de précision 1Tap » utilise des outils chirurgicaux et des solutions non invasives pour agir au micromètre près, sans jamais altérer la structure d'origine de la carte.",
      },
    ],
  },
  {
    category: "Processus & Expédition",
    questions: [
      {
        q: "Comment réserver une session de restauration ?",
        a: "Remplissez notre formulaire de diagnostic en ligne avec les photos de votre carte, choisissez votre forfait et bloquez votre créneau d'envoi.",
      },
      {
        q: "Quel est le protocole de sécurité pour l'envoi ?",
        a: "Après validation, vous recevez un guide d'expédition strict (Toploader scellé, emballage blindé). Tous nos colis de retour sont expédiés avec suivi et assurance intégrée.",
      },
      {
        q: "Quels sont les moyens de paiement acceptés ?",
        a: "Nous acceptons les paiements sécurisés par Carte Bancaire (Stripe) et PayPal lors de la validation du diagnostic de votre carte.",
      },
    ],
  },
  {
    category: "Tarifs & Garanties",
    questions: [
      {
        q: "Quels sont vos forfaits ?",
        a: "Nous proposons 3 formules : Surface Clean & Polish (19 €), Professional Restoration (39 €), et Full Surgery (95 €).",
      },
      {
        q: "Y a-t-il des frais cachés ?",
        a: "Non, nos tarifs sont transparents. Les options à la carte (Redressage à 9 €, Nettoyage de colle à 9 €) sont validées uniquement après diagnostic de votre part.",
      },
      {
        q: "Comment mes cartes sont-elles sécurisées dans vos locaux ?",
        a: "Vos cartes sont manipulées sous microscope en atmosphère protégée et conservées dans un coffre-fort ignifugé entre chaque étape de traitement.",
      },
      {
        q: "Y a-t-il une limite de cartes par envoi ?",
        a: "Non, mais pour les commandes de plus de 10 cartes, veuillez nous contacter directement pour obtenir un calendrier d'admission personnalisé.",
      },
      {
        q: "Proposez-vous des tarifs dégressifs pour les professionnels ?",
        a: "Oui, nous proposons des partenariats et des tarifs de volume pour les boutiques de cartes et les gros collectionneurs. Contactez notre support.",
      },
    ],
  },
  {
    category: "Sécurité & Certifications",
    questions: [
      {
        q: "Vos interventions sont-elles acceptées par PSA, BGS ou PCA ?",
        a: "Le nettoyage de surface et le redressage sont des pratiques d'entretien courantes. Nos interventions légères respectent scrupuleusement les chartes de conservation des plus grands organismes de grading.",
      },
      {
        q: "Que se passe-t-il si une carte ne peut pas être restaurée ?",
        a: "Si notre diagnostic initial révèle qu'une intervention présente un risque pour la carte, l'opération est annulée et la carte vous est renvoyée sans aucun frais technique.",
      },
      {
        q: "Comment vérifier l'authenticité de mon rapport CardSurgery ?",
        a: "Chaque carte restaurée est livrée avec un certificat numérique unique répertoriant les interventions effectuées dans notre laboratoire.",
      },
      {
        q: "Comment modifier ou annuler une commande en cours ?",
        a: "Vous pouvez modifier votre demande à tout moment avant l'envoi physique de vos cartes en envoyant un e-mail à notre support client.",
      },
    ],
  },
  {
    category: "Fonctionnalités & Suivi",
    questions: [
      {
        q: "Comment fonctionne le suivi de dossier en temps réel ?",
        a: "Entrez votre numéro de suivi sur notre page dédiée pour suivre l'état de votre « patient » en temps réel : Réception, Analyse, En Chirurgie, Expédié.",
      },
      {
        q: "Qu'est-ce que l'analyse pré-grading ?",
        a: "Une option à 15 € permettant d'évaluer numériquement les chances d'obtenir une note maximale auprès des organismes de certification après notre intervention.",
      },
      {
        q: "Proposez-vous un service d'urgence ?",
        a: "Oui, une option « Fast Track » permet de réduire le temps de traitement en laboratoire à 48 heures pour les cartes prioritaires.",
      },
      {
        q: "Le site est-il adapté au suivi sur mobile ?",
        a: "Absolument. L'interface de suivi CardSurgery est entièrement optimisée pour consulter l'état de vos restaurations depuis votre smartphone.",
      },
    ],
  },
  {
    category: "Communauté & Partenaires",
    questions: [
      {
        q: "Comment suivre vos restaurations en direct ?",
        a: "Rejoignez notre communauté sur Instagram et Discord pour découvrir nos coulisses, nos vidéos avant/après et échanger avec d'autres passionnés.",
      },
      {
        q: "Proposez-vous un programme d'affiliation pour les créateurs de contenu ?",
        a: "Oui, nous soutenons les créateurs de l'écosystème TCG. Contactez-nous pour obtenir votre code partenaire.",
      },
      {
        q: "Comment donner mon avis sur votre intervention ?",
        a: "Un lien d'évaluation vous est envoyé automatiquement par e-mail dès réception de votre colis de retour pour partager votre expérience.",
      },
      {
        q: "Où est basée l'équipe de CardSurgery ?",
        a: "Notre laboratoire de restauration et nos experts techniques sont basés en France.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HelpCircle className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Foire aux questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Tout ce que vous devez savoir sur la restauration CardSurgery.
            </p>
          </motion.div>

          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.05 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-primary">
                {category.category}
              </h2>

              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${categoryIndex}-${faqIndex}`}
                    className="glass-effect border border-primary/20 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left hover:text-primary transition-colors">
                      <span className="font-semibold">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground whitespace-pre-line">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}

          <motion.div
            className="mt-16 text-center glass-effect p-8 rounded-2xl border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              Encore des questions ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Rejoignez notre communauté Discord pour un support en temps réel de l'équipe et des membres de la communauté.
            </p>
            <a
              href="https://discord.gg/cardsurgery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Join Discord
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
