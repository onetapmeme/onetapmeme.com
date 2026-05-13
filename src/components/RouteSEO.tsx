import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://onetaptoken.lovable.app";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

type Meta = { title: string; description: string };

const ROUTE_META: Record<string, Meta> = {
  "/": {
    title: "1Tap — Restauration professionnelle de cartes de collection",
    description: "Redonnez vie à vos cartes Pokémon, One Piece et TCG. Nettoyage, whitening, redressage et pressage de précision.",
  },
  "/home": {
    title: "1Tap — Restauration de cartes Pokémon, One Piece & TCG",
    description: "Service artisanal de restauration de cartes : nettoyage, correction des bords, redressage, pressage. Devis transparent et garantie satisfait ou remboursé.",
  },
  "/auth": {
    title: "Connexion — 1Tap",
    description: "Accédez à votre espace 1Tap pour suivre vos restaurations en cours.",
  },
  "/profile": {
    title: "Mon profil — 1Tap",
    description: "Gérez votre compte et vos préférences 1Tap.",
  },
  "/faq": {
    title: "FAQ — Questions fréquentes sur la restauration de cartes | 1Tap",
    description: "Délais, garanties, impact sur le grading PSA/BGS, jeux acceptés : toutes les réponses sur la restauration 1Tap.",
  },
  "/team": {
    title: "L'équipe — 1Tap",
    description: "Rencontrez les restaurateurs experts derrière 1Tap.",
  },
  "/blog": {
    title: "Blog — Conseils & actualités sur les cartes de collection | 1Tap",
    description: "Conseils d'entretien, retours clients et coulisses de la restauration de cartes Pokémon, One Piece et TCG.",
  },
  "/ownership": {
    title: "Mentions de propriété — 1Tap",
    description: "Informations légales sur la propriété et l'exploitation de 1Tap.",
  },
  "/disclaimer": {
    title: "Avertissement — 1Tap",
    description: "Avertissements et limites de responsabilité concernant le service 1Tap.",
  },
  "/non-affiliation": {
    title: "Non-affiliation — 1Tap",
    description: "1Tap n'est affilié à aucune marque, éditeur ou détenteur de droits sur les cartes restaurées.",
  },
  "/privacy": {
    title: "Politique de confidentialité — 1Tap",
    description: "Comment 1Tap collecte, utilise et protège vos données personnelles, dans le respect du RGPD.",
  },
  "/terms": {
    title: "Conditions d'utilisation — 1Tap",
    description: "Les conditions qui régissent l'utilisation des services de restauration 1Tap.",
  },
  "/legal-notice": {
    title: "Mentions légales — 1Tap",
    description: "Informations légales sur l'éditeur et l'hébergeur de 1Tap.",
  },
};

const DEFAULT_META: Meta = {
  title: "1Tap — Restauration professionnelle de cartes de collection",
  description: "Service artisanal de restauration de cartes Pokémon, One Piece et TCG. Précision, transparence et discrétion.",
};

const RouteSEO = () => {
  const { pathname } = useLocation();
  const meta = ROUTE_META[pathname] || DEFAULT_META;
  const url = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;

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
    </Helmet>
  );
};

export default RouteSEO;
