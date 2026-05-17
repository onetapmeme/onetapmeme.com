import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQAssistant from "@/components/cards/FAQAssistant";
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
        q: "Qu'est-ce qui rend la technologie CardSurgery différente des méthodes classiques ?",
        a: "Notre protocole unique « Technologie de précision CardSurgery » utilise des outils chirurgicaux et des solutions non invasives pour agir au micromètre près, sans jamais altérer la structure d'origine de la carte.",
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
    category: "Expertise technique",
    questions: [
      {
        q: "Le nettoyage abîme-t-il le vernis holographique (holofoil) ?",
        a: "Non. Nous utilisons des solvants doux non-polaires appliqués au coton chirurgical, calibrés pour dissoudre les graisses et résidus sans attaquer la couche de vernis UV ni la trame holographique sous-jacente. Chaque carte holo est testée sur une zone non visible avant intervention.",
      },
      {
        q: "Comment traitez-vous les cartes vintage au carton ancien (Base Set, Jungle…) ?",
        a: "Les cartons d'avant 2003 sont plus poreux et plus sensibles à l'humidité. Nous travaillons à hygrométrie contrôlée (45–55 %), sans solution aqueuse en contact direct, et utilisons un redressage thermique progressif basse température pour éviter le delaminage de la couche bleue arrière.",
      },
      {
        q: "Pouvez-vous intervenir sur les cartes Chrome / Refractor / Prizm ?",
        a: "Oui. Les couches chromées exigent un polish purement mécanique (micro-pads <0.5 µm) sans aucun solvant. Nous restaurons l'éclat de surface sans créer de micro-rayures circulaires perceptibles sous lumière directe — point critique pour la note Surface en grading.",
      },
      {
        q: "Les encres UV modernes (Pokémon Scarlet & Violet) résistent-elles ?",
        a: "Les encres UV récentes sont nettement plus stables que les vernis pré-2010. Nous adaptons néanmoins l'angle d'attaque et le temps de contact pour préserver la texture des cartes Illustration Rare et Special Art Rare, où la trame est particulièrement fine.",
      },
      {
        q: "Que faire si ma carte a des micro-rayures de surface ?",
        a: "Selon leur profondeur, nous proposons un **micro-polish** (Pack 19 €) pour les rayures superficielles, ou un **resurfaçage contrôlé** (Pack 39 €+) pour les rayures plus marquées. Une carte avec rayures profondes traversant le vernis n'est pas restaurable sans risque ; nous le signalons dans le diagnostic.",
      },
      {
        q: "Quels défauts ne peuvent PAS être restaurés ?",
        a: "Whitening profond traversant le carton, pliures structurelles, déchirures, taches d'encre internes, dommages par eau ayant gondolé le noyau, et bords mâchés. Dans ces cas, le diagnostic est facturé 0 € et la carte est renvoyée.",
      },
    ],
  },
  {
    category: "Grading & organismes tiers",
    questions: [
      {
        q: "Quelle est la différence entre PCA, CCC et Collect Aura ?",
        a: "**PCA (Professional Card Authentication)** : leader européen, slab transparent, échelle 1–10. **CCC (Cartes Certifiées Cassées… non, Card Certification Center)** : alternative française, délais souvent plus courts. **Collect Aura** : nouvel acteur premium axé sur les cartes haute valeur, photographie HD incluse. Nous gérons les trois en tant que partenaires logistiques.",
      },
      {
        q: "CardSurgery peut-il garantir une note PCA 10 ou CCC 10 ?",
        a: "**Non, et personne ne le peut.** Nous optimisons la physique de la carte (surface, bords, coins, centrage visible) mais la note finale relève exclusivement de l'organisme de grading. Nous communiquons une estimation indicative basée sur 200+ cartes restaurées, sans engagement de résultat.",
      },
      {
        q: "Vos interventions sont-elles considérées comme « altération » par les organismes ?",
        a: "Le nettoyage de surface et le polishing léger relèvent de l'entretien collector courant, accepté par tous les organismes. En revanche, la **trempe (trimming)**, le **recoloriage** et le **resurfaçage agressif** sont des altérations et nous ne les pratiquons JAMAIS.",
      },
      {
        q: "Quels sont les délais de grading après envoi par CardSurgery ?",
        a: "Les délais dépendent du partenaire et de la valeur déclarée : PCA Standard ~30–60 jours, PCA Express ~15 jours, CCC ~20–40 jours, Collect Aura Premium ~10–20 jours. Le suivi est intégré dans votre espace dossier CardSurgery.",
      },
      {
        q: "Que se passe-t-il en cas de note décevante ?",
        a: "CardSurgery ne rembourse pas la note (hors de notre contrôle) mais offre une analyse post-grading gratuite identifiant les critères pénalisés. Si l'erreur vient d'une intervention de notre laboratoire (ce qui n'est jamais arrivé), nous prenons en charge un re-grading.",
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

          <FAQAssistant />

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
            <h3 className="text-2xl font-bold mb-4">Encore des questions ?</h3>
            <p className="text-muted-foreground mb-6">
              Notre équipe vous répond personnellement sous 24 h ouvrées.
              Écrivez-nous pour toute demande de devis personnalisé, partenariat
              ou question technique avancée.
            </p>
            <a
              href="mailto:contact@cardsurgery.com"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              contact@cardsurgery.com
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
