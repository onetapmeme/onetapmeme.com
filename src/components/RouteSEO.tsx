import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://onetaptoken.lovable.app";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

type Meta = { title: string; description: string };

const ROUTE_META: Record<string, Meta> = {
  "/": {
    title: "CardSurgery — Restauration professionnelle de cartes de collection",
    description: "Redonnez vie à vos cartes Pokémon, One Piece et TCG. Nettoyage, whitening, redressage et pressage de précision.",
  },
  "/home": {
    title: "CardSurgery — Restauration de cartes Pokémon, One Piece & TCG",
    description: "Service artisanal de restauration de cartes : nettoyage, correction des bords, redressage, pressage. Devis transparent et garantie satisfait ou remboursé.",
  },
  "/auth": {
    title: "Connexion — CardSurgery",
    description: "Accédez à votre espace CardSurgery pour suivre vos restaurations en cours.",
  },
  "/profile": {
    title: "Mon profil — CardSurgery",
    description: "Gérez votre compte et vos préférences CardSurgery.",
  },
  "/faq": {
    title: "FAQ — Questions fréquentes sur la restauration de cartes | CardSurgery",
    description: "Délais, garanties, impact sur le grading PSA/BGS, jeux acceptés : toutes les réponses sur la restauration CardSurgery.",
  },
  "/team": {
    title: "L'équipe — CardSurgery",
    description: "Rencontrez les restaurateurs experts derrière CardSurgery.",
  },
  "/blog": {
    title: "Blog — Conseils & actualités sur les cartes de collection | CardSurgery",
    description: "Conseils d'entretien, retours clients et coulisses de la restauration de cartes Pokémon, One Piece et TCG.",
  },
  "/ownership": {
    title: "Mentions de propriété — CardSurgery",
    description: "Informations légales sur la propriété et l'exploitation de CardSurgery.",
  },
  "/disclaimer": {
    title: "Avertissement — CardSurgery",
    description: "Avertissements et limites de responsabilité concernant le service CardSurgery.",
  },
  "/non-affiliation": {
    title: "Non-affiliation — CardSurgery",
    description: "CardSurgery n'est affilié à aucune marque, éditeur ou détenteur de droits sur les cartes restaurées.",
  },
  "/privacy": {
    title: "Politique de confidentialité — CardSurgery",
    description: "Comment CardSurgery collecte, utilise et protège vos données personnelles, dans le respect du RGPD.",
  },
  "/terms": {
    title: "Conditions d'utilisation — CardSurgery",
    description: "Les conditions qui régissent l'utilisation des services de restauration CardSurgery.",
  },
  "/legal-notice": {
    title: "Mentions légales — CardSurgery",
    description: "Informations légales sur l'éditeur et l'hébergeur de CardSurgery.",
  },
};

const DEFAULT_META: Meta = {
  title: "CardSurgery — Restauration professionnelle de cartes de collection",
  description: "Service artisanal de restauration de cartes Pokémon, One Piece et TCG. Précision, transparence et discrétion.",
};

const RouteSEO = () => {
  const { pathname } = useLocation();
  const meta = ROUTE_META[pathname] || DEFAULT_META;
  const url = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
  const isHome = pathname === "/" || pathname === "/home";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "CardSurgery — Restauration professionnelle de cartes de collection",
    serviceType: "Collectible card restoration",
    provider: {
      "@type": "Organization",
      name: "CardSurgery",
      url: SITE_URL,
      email: "contact@cardsurgery.com",
    },
    areaServed: "Worldwide",
    description:
      "Restauration artisanale de cartes TCG (Pokémon, One Piece, Magic, Yu-Gi-Oh, Lorcana) : nettoyage de surface, whitening, redressage, pressage de précision et préparation au grading PCA / CCC / Collect Aura.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "19",
      highPrice: "95",
    },
  };

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      {isHome && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default RouteSEO;
