// Multilingual copy for the "CardSurgery — Card Restoration" homepage.
// Keys are kept flat so each section component can read its own slice.

export type Lang = "fr" | "en" | "es" | "ru" | "zh";

export const SUPPORTED: Lang[] = ["fr", "en", "es", "ru", "zh"];

export function pickLang(raw: string | undefined): Lang {
  const code = (raw || "fr").slice(0, 2).toLowerCase() as Lang;
  return (SUPPORTED as string[]).includes(code) ? code : "fr";
}

type C = Record<Lang, string>;

export const copy = {
  brand: { fr: "CardSurgery", en: "CardSurgery", es: "CardSurgery", ru: "CardSurgery", zh: "CardSurgery" } satisfies C,

  // Hero
  heroEyebrow: {
    fr: "Restauration professionnelle de cartes de collection",
    en: "Professional collectible card restoration",
    es: "Restauración profesional de cartas coleccionables",
    ru: "Профессиональная реставрация коллекционных карт",
    zh: "专业收藏卡牌修复",
  } satisfies C,
  heroTitle: {
    fr: "L'art de la chirurgie appliqué à vos cartes.",
    en: "The art of surgery applied to your cards.",
    es: "El arte de la cirugía aplicado a tus cartas.",
    ru: "Искусство хирургии для ваших карт.",
    zh: "以外科精准之艺，呵护每一张珍藏。",
  } satisfies C,
  heroSubtitle: {
    fr: "Redonnez vie à vos cartes en un seul geste maîtrisé. Pokémon, One Piece, Magic, Yu-Gi-Oh et autres TCG.",
    en: "Bring your cards back to life with a single expert touch. Pokémon, One Piece, Magic, Yu-Gi-Oh and other TCGs.",
    es: "Devuelve la vida a tus cartas con un solo gesto experto. Pokémon, One Piece, Magic, Yu-Gi-Oh y otros TCG.",
    ru: "Верните карты к жизни одним выверенным движением. Pokémon, One Piece, Magic, Yu-Gi-Oh и другие ККИ.",
    zh: "一次精准的处理，让卡牌焕然一新。涵盖 Pokémon、One Piece、Magic、Yu-Gi-Oh 等集换式卡牌。",
  } satisfies C,
  heroCtaPrimary: {
    fr: "Estimer ma carte",
    en: "Estimate my card",
    es: "Estimar mi carta",
    ru: "Оценить мою карту",
    zh: "估价我的卡牌",
  } satisfies C,
  heroCtaSecondary: {
    fr: "Expertiser ma carte",
    en: "Get my card appraised",
    es: "Tasar mi carta",
    ru: "Оценить мою карту",
    zh: "鉴定我的卡牌",
  } satisfies C,
  heroBadgeTrust: {
    fr: "+10 000 cartes restaurées",
    en: "10,000+ cards restored",
    es: "+10 000 cartas restauradas",
    ru: "Более 10 000 карт восстановлено",
    zh: "已修复 10,000+ 张卡牌",
  } satisfies C,
  heroBadgeWarranty: {
    fr: "Garantie satisfait ou remboursé",
    en: "Satisfaction-or-refund guarantee",
    es: "Garantía de satisfacción o reembolso",
    ru: "Гарантия возврата средств",
    zh: "满意保证，否则全额退款",
  } satisfies C,
  heroBadgeInsured: {
    fr: "Colis assurés à 100 %",
    en: "Fully insured shipments",
    es: "Envíos 100 % asegurados",
    ru: "Полное страхование посылок",
    zh: "包裹 100% 投保",
  } satisfies C,

  // About / Storytelling
  aboutTitle: {
    fr: "Pourquoi CardSurgery ?",
    en: "Why CardSurgery?",
    es: "¿Por qué CardSurgery?",
    ru: "Почему CardSurgery?",
    zh: "为什么是 CardSurgery？",
  } satisfies C,
  aboutP1: {
    fr: "Parce que dans le monde du collectionnable, la différence entre une carte abîmée et une carte de valeur se joue à un détail près : un impact, une rayure, un geste.",
    en: "Because in the world of collectibles, the line between a damaged card and a valuable one comes down to a single detail: an impact, a scratch, a single move.",
    es: "Porque en el mundo del coleccionismo, la diferencia entre una carta dañada y una carta de valor se juega en un detalle: un impacto, un arañazo, un gesto.",
    ru: "Ведь в мире коллекционирования грань между испорченной и ценной картой определяется одной деталью: ударом, царапиной, движением.",
    zh: "因为在收藏领域，一张受损卡与一张珍品之间的差别，往往就在一个细节：一次撞击、一道划痕、一个动作。",
  } satisfies C,
  aboutP2: {
    fr: "CardSurgery symbolise la précision chirurgicale de notre intervention. Un seul geste expert, une seule pression maîtrisée pour effacer les marques du temps et redonner à vos trésors leur éclat d'origine.",
    en: "CardSurgery stands for the surgical precision of our craft. A single expert gesture, a single controlled press to erase the marks of time and bring your treasures back to their original brilliance.",
    es: "CardSurgery simboliza la precisión quirúrgica de nuestra intervención. Un solo gesto experto, una sola presión controlada para borrar las huellas del tiempo y devolverle a tus tesoros su brillo original.",
    ru: "CardSurgery — это хирургическая точность нашей работы. Одно выверенное движение, одно контролируемое прикосновение, чтобы стереть следы времени и вернуть вашим сокровищам первоначальный блеск.",
    zh: "CardSurgery 象征着我们如外科手术般的精准。一次专业的手势，一次受控的按压，抹去岁月痕迹，让你的珍藏重现原本光彩。",
  } satisfies C,

  // Services
  servicesTitle: {
    fr: "Nos services de restauration",
    en: "Our restoration services",
    es: "Nuestros servicios de restauración",
    ru: "Наши услуги реставрации",
    zh: "我们的修复服务",
  } satisfies C,
  servicesSubtitle: {
    fr: "Quatre interventions artisanales, calibrées pour chaque type de défaut.",
    en: "Four artisan interventions, calibrated for every type of flaw.",
    es: "Cuatro intervenciones artesanales, calibradas para cada tipo de defecto.",
    ru: "Четыре авторские процедуры, рассчитанные под каждый тип дефекта.",
    zh: "四种匠心工艺，针对不同瑕疵精准应对。",
  } satisfies C,

  service1Title: {
    fr: "Nettoyage de surface",
    en: "Surface cleaning",
    es: "Limpieza de superficie",
    ru: "Очистка поверхности",
    zh: "表面清洁",
  } satisfies C,
  service1Desc: {
    fr: "Élimination des impuretés sans altérer la brillance d'origine de la carte.",
    en: "Removal of impurities without altering the card's original gloss.",
    es: "Eliminación de impurezas sin alterar el brillo original de la carta.",
    ru: "Удаление загрязнений без изменения исходного блеска карты.",
    zh: "去除杂质，不损伤卡面原有光泽。",
  } satisfies C,

  service2Title: {
    fr: "Correction des bords (Whitening)",
    en: "Edge correction (Whitening)",
    es: "Corrección de bordes (Whitening)",
    ru: "Коррекция краёв (Whitening)",
    zh: "边缘修整（去白边）",
  } satisfies C,
  service2Desc: {
    fr: "Atténuation des traces d'usure blanches sur les arêtes pour retrouver un cadre net.",
    en: "Reduction of whitened wear marks along the edges for a clean, sharp frame.",
    es: "Atenuación de las marcas blancas de desgaste en los bordes para recuperar un marco nítido.",
    ru: "Уменьшение белых потёртостей по краям ради чёткой, аккуратной рамки.",
    zh: "淡化边缘磨损白痕，恢复整齐锐利的卡框。",
  } satisfies C,

  service3Title: {
    fr: "Redressage (De-curving)",
    en: "Flattening (De-curving)",
    es: "Aplanado (De-curving)",
    ru: "Выпрямление (De-curving)",
    zh: "去弯整平（De-curving）",
  } satisfies C,
  service3Desc: {
    fr: "Correction des cartes courbées par l'humidité pour retrouver une planéité parfaite.",
    en: "Correction of cards warped by humidity to restore perfect flatness.",
    es: "Corrección de cartas curvadas por la humedad para recuperar una planitud perfecta.",
    ru: "Восстановление карт, изогнутых от влажности, до идеальной плоскости.",
    zh: "矫正因受潮而弯曲的卡牌，恢复完美平整。",
  } satisfies C,

  service4Title: {
    fr: "Pressage de précision",
    en: "Precision pressing",
    es: "Prensado de precisión",
    ru: "Прецизионное прессование",
    zh: "精密压平",
  } satisfies C,
  service4Desc: {
    fr: "Réduction des micro-pliures et des imperfections de surface au micron près.",
    en: "Reduction of micro-creases and surface imperfections down to the micron.",
    es: "Reducción de microdobleces e imperfecciones de superficie con precisión micrométrica.",
    ru: "Устранение микрозаломов и поверхностных дефектов с точностью до микрона.",
    zh: "以微米级精度消除微折与表面瑕疵。",
  } satisfies C,

  // Process
  processTitle: {
    fr: "Notre processus en 4 étapes",
    en: "Our 4-step process",
    es: "Nuestro proceso en 4 pasos",
    ru: "Наш процесс из 4 шагов",
    zh: "四步专业流程",
  } satisfies C,
  processSubtitle: {
    fr: "De votre boîte aux lettres à votre vitrine, votre carte est entre des mains expertes.",
    en: "From your mailbox to your display case, your card is in expert hands.",
    es: "Desde tu buzón hasta tu vitrina, tu carta está en manos expertas.",
    ru: "От вашего почтового ящика до витрины — карта в руках экспертов.",
    zh: "从邮箱到展柜，您的卡牌全程由专家把关。",
  } satisfies C,

  step1Title: {
    fr: "Envoi sécurisé",
    en: "Secure shipping",
    es: "Envío seguro",
    ru: "Безопасная отправка",
    zh: "安全寄送",
  } satisfies C,
  step1Desc: {
    fr: "Vous nous expédiez votre carte avec suivi et assurance, dans un emballage protégé.",
    en: "You ship your card to us with tracking and insurance, in protected packaging.",
    es: "Nos envías tu carta con seguimiento y seguro, en un embalaje protegido.",
    ru: "Вы отправляете карту с трекингом и страховкой в защитной упаковке.",
    zh: "您以带跟踪与保险的方式将卡牌寄给我们，全程使用专业包装。",
  } satisfies C,

  step2Title: {
    fr: "Diagnostic CardSurgery",
    en: "CardSurgery diagnosis",
    es: "Diagnóstico CardSurgery",
    ru: "Диагностика CardSurgery",
    zh: "CardSurgery 诊断",
  } satisfies C,
  step2Desc: {
    fr: "Expertise du défaut sous lumière contrôlée, devis transparent et sans engagement.",
    en: "Expert flaw assessment under controlled lighting, transparent quote with no commitment.",
    es: "Diagnóstico del defecto bajo luz controlada, presupuesto transparente y sin compromiso.",
    ru: "Экспертиза дефекта при контролируемом освещении, прозрачная смета без обязательств.",
    zh: "在标准光源下评估瑕疵，提供透明且无义务的报价。",
  } satisfies C,

  step3Title: {
    fr: "Restauration artisanale",
    en: "Artisan restoration",
    es: "Restauración artesanal",
    ru: "Авторская реставрация",
    zh: "匠心修复",
  } satisfies C,
  step3Desc: {
    fr: "Intervention manuelle au micron près, étape par étape, par notre restaurateur expert.",
    en: "Hands-on intervention to the micron, step by step, by our expert restorer.",
    es: "Intervención manual con precisión micrométrica, paso a paso, por nuestro restaurador experto.",
    ru: "Ручная работа с точностью до микрона, шаг за шагом, нашим мастером-реставратором.",
    zh: "由专家修复师手工逐步操作，精准至微米。",
  } satisfies C,

  step4Title: {
    fr: "Retour sous protection rigide",
    en: "Return in rigid protection",
    es: "Devolución en protección rígida",
    ru: "Возврат в жёсткой защите",
    zh: "硬壳保护回寄",
  } satisfies C,
  step4Desc: {
    fr: "Votre carte vous est renvoyée en sleeve + toploader, prête pour la certification.",
    en: "Your card is shipped back in sleeve + toploader, ready for certification.",
    es: "Tu carta vuelve en funda + toploader, lista para la certificación.",
    ru: "Карта возвращается в слив-сливе и топлоадере, готовая к сертификации.",
    zh: "卡牌将装入卡套和硬卡夹回寄，可直接送评级。",
  } satisfies C,

  // Why us
  whyTitle: {
    fr: "Pourquoi nous confier vos cartes ?",
    en: "Why entrust us with your cards?",
    es: "¿Por qué confiarnos tus cartas?",
    ru: "Почему доверить карты именно нам?",
    zh: "为什么把卡牌交给我们？",
  } satisfies C,
  why1Title: {
    fr: "Précision chirurgicale",
    en: "Surgical precision",
    es: "Precisión quirúrgica",
    ru: "Хирургическая точность",
    zh: "外科级精准",
  } satisfies C,
  why1Desc: {
    fr: "Outils calibrés, gestes mesurés, lumière contrôlée. Chaque intervention est documentée.",
    en: "Calibrated tools, measured gestures, controlled light. Every intervention is documented.",
    es: "Herramientas calibradas, gestos medidos, luz controlada. Cada intervención queda documentada.",
    ru: "Калиброванные инструменты, выверенные движения, контролируемое освещение. Каждая работа документируется.",
    zh: "校准工具、细致手法、可控光源。每次操作均有记录。",
  } satisfies C,
  why2Title: {
    fr: "Respect de la valeur",
    en: "Value preserved",
    es: "Valor respetado",
    ru: "Сохранение ценности",
    zh: "守护卡牌价值",
  } satisfies C,
  why2Desc: {
    fr: "Aucune intervention agressive : nous restaurons sans dénaturer ni masquer le grade.",
    en: "No aggressive interventions: we restore without altering or masking the grade.",
    es: "Ninguna intervención agresiva: restauramos sin desnaturalizar ni ocultar el grade.",
    ru: "Никаких агрессивных вмешательств: реставрируем, не искажая и не скрывая грейд.",
    zh: "拒绝激进处理，修复不影响也不掩盖原始品相。",
  } satisfies C,
  why3Title: {
    fr: "Avant / après transparent",
    en: "Transparent before / after",
    es: "Antes / después transparente",
    ru: "Прозрачное «до и после»",
    zh: "透明的修复前后对比",
  } satisfies C,
  why3Desc: {
    fr: "Photos haute définition à chaque étape. Vous validez avant le retour de votre carte.",
    en: "High-definition photos at every step. You approve before your card ships back.",
    es: "Fotos en alta definición en cada etapa. Tú validas antes de que la carta regrese.",
    ru: "HD-фотографии на каждом этапе. Вы подтверждаете до отправки карты обратно.",
    zh: "全程高清留影，回寄前由您确认。",
  } satisfies C,
  why4Title: {
    fr: "Discrétion totale",
    en: "Full discretion",
    es: "Discreción total",
    ru: "Полная конфиденциальность",
    zh: "完全保密",
  } satisfies C,
  why4Desc: {
    fr: "Vos cartes et leur valeur restent confidentielles. Stockage sécurisé en coffre.",
    en: "Your cards and their value remain confidential. Secure vault storage.",
    es: "Tus cartas y su valor son confidenciales. Almacenamiento seguro en caja fuerte.",
    ru: "Ваши карты и их ценность остаются конфиденциальными. Хранение в сейфе.",
    zh: "您的卡牌与价值信息严格保密，全程保险柜存放。",
  } satisfies C,

  // Trust
  trustTitle: {
    fr: "Garanties & expertise",
    en: "Guarantees & expertise",
    es: "Garantías y experiencia",
    ru: "Гарантии и экспертиза",
    zh: "保障与专业",
  } satisfies C,
  trust1: {
    fr: "Plus de 10 000 cartes restaurées depuis 2023",
    en: "Over 10,000 cards restored since 2023",
    es: "Más de 10 000 cartas restauradas desde 2023",
    ru: "Более 10 000 карт восстановлено с 2023 года",
    zh: "自 2023 年起已修复 10,000+ 张卡牌",
  } satisfies C,
  trust2: {
    fr: "Colis assurés jusqu'à 5 000 € à l'aller comme au retour",
    en: "Shipments insured up to €5,000 each way",
    es: "Envíos asegurados hasta 5 000 € en ambos sentidos",
    ru: "Посылки застрахованы на сумму до 5 000 € в обе стороны",
    zh: "去程与回程包裹均最高承保 5,000 €",
  } satisfies C,
  trust3: {
    fr: "Devis transparent avant toute intervention",
    en: "Transparent quote before any intervention",
    es: "Presupuesto transparente antes de cualquier intervención",
    ru: "Прозрачная смета до начала любых работ",
    zh: "任何操作前均提供透明报价",
  } satisfies C,
  trust4: {
    fr: "Garantie satisfait ou remboursé",
    en: "Satisfaction-or-refund guarantee",
    es: "Garantía de satisfacción o reembolso",
    ru: "Гарантия возврата средств",
    zh: "满意保证，否则全额退款",
  } satisfies C,

  // Final CTA
  ctaTitle: {
    fr: "Prêt à redonner vie à votre collection ?",
    en: "Ready to bring your collection back to life?",
    es: "¿Listo para devolver la vida a tu colección?",
    ru: "Готовы вернуть коллекции жизнь?",
    zh: "准备好让你的收藏焕新了吗？",
  } satisfies C,
  ctaDesc: {
    fr: "Demandez votre diagnostic CardSurgery gratuit. Réponse sous 24 h ouvrées.",
    en: "Request your free CardSurgery diagnosis. Reply within 24 working hours.",
    es: "Solicita tu diagnóstico CardSurgery gratuito. Respuesta en 24 h laborables.",
    ru: "Запросите бесплатную диагностику CardSurgery. Ответ в течение 24 рабочих часов.",
    zh: "立即获取免费 CardSurgery 诊断，24 个工作小时内回复。",
  } satisfies C,
  ctaButton: {
    fr: "Lancer ma restauration",
    en: "Start my restoration",
    es: "Iniciar mi restauración",
    ru: "Начать реставрацию",
    zh: "开始我的修复",
  } satisfies C,
  ctaContact: {
    fr: "Ou écrivez-nous à",
    en: "Or write to us at",
    es: "O escríbenos a",
    ru: "Или напишите нам на",
    zh: "或写信至",
  } satisfies C,

  // Section anchors / nav
  navServices: { fr: "Services", en: "Services", es: "Servicios", ru: "Услуги", zh: "服务" } satisfies C,
  navProcess: { fr: "Processus", en: "Process", es: "Proceso", ru: "Процесс", zh: "流程" } satisfies C,
  navWhy: { fr: "Pourquoi CardSurgery", en: "Why CardSurgery", es: "Por qué CardSurgery", ru: "Почему CardSurgery", zh: "关于 CardSurgery" } satisfies C,
  navFaq: { fr: "FAQ", en: "FAQ", es: "FAQ", ru: "FAQ", zh: "常见问题" } satisfies C,
  navContact: { fr: "Contact", en: "Contact", es: "Contacto", ru: "Контакты", zh: "联系" } satisfies C,
  login: { fr: "Connexion", en: "Login", es: "Acceder", ru: "Войти", zh: "登录" } satisfies C,

  // Footer
  footerTagline: {
    fr: "Restauration artisanale de cartes Pokémon, One Piece et autres TCG. Précision, transparence, discrétion.",
    en: "Artisan restoration of Pokémon, One Piece and other TCG cards. Precision, transparency, discretion.",
    es: "Restauración artesanal de cartas Pokémon, One Piece y otros TCG. Precisión, transparencia, discreción.",
    ru: "Авторская реставрация карт Pokémon, One Piece и других ККИ. Точность, прозрачность, конфиденциальность.",
    zh: "Pokémon、One Piece 等 TCG 卡牌的匠心修复服务。精准、透明、保密。",
  } satisfies C,
  footerRights: {
    fr: "Tous droits réservés.",
    en: "All rights reserved.",
    es: "Todos los derechos reservados.",
    ru: "Все права защищены.",
    zh: "保留所有权利。",
  } satisfies C,
  footerLegal: {
    fr: "Légal",
    en: "Legal",
    es: "Legal",
    ru: "Юридическое",
    zh: "法律",
  } satisfies C,
  footerLinks: {
    fr: "Liens utiles",
    en: "Useful links",
    es: "Enlaces útiles",
    ru: "Полезные ссылки",
    zh: "实用链接",
  } satisfies C,
  footerContact: {
    fr: "Contact",
    en: "Contact",
    es: "Contacto",
    ru: "Контакты",
    zh: "联系我们",
  } satisfies C,

  // FAQ
  faqTitle: {
    fr: "Questions fréquentes",
    en: "Frequently asked questions",
    es: "Preguntas frecuentes",
    ru: "Частые вопросы",
    zh: "常见问题",
  } satisfies C,
  faq1Q: {
    fr: "Quels jeux de cartes acceptez-vous ?",
    en: "Which card games do you accept?",
    es: "¿Qué juegos de cartas aceptan?",
    ru: "С какими ККИ вы работаете?",
    zh: "你们接受哪些卡牌游戏？",
  } satisfies C,
  faq1A: {
    fr: "Pokémon, One Piece, Magic: The Gathering, Yu-Gi-Oh!, Lorcana et la plupart des TCG modernes ou vintage.",
    en: "Pokémon, One Piece, Magic: The Gathering, Yu-Gi-Oh!, Lorcana and most modern or vintage TCGs.",
    es: "Pokémon, One Piece, Magic: The Gathering, Yu-Gi-Oh!, Lorcana y la mayoría de TCG modernos o vintage.",
    ru: "Pokémon, One Piece, Magic: The Gathering, Yu-Gi-Oh!, Lorcana и большинство современных и винтажных ККИ.",
    zh: "Pokémon、One Piece、万智牌、游戏王、Lorcana 以及大多数现代或老版 TCG。",
  } satisfies C,
  faq2Q: {
    fr: "La restauration affecte-t-elle le grade PSA / BGS ?",
    en: "Does restoration affect PSA / BGS grading?",
    es: "¿La restauración afecta al grade PSA / BGS?",
    ru: "Влияет ли реставрация на оценку PSA / BGS?",
    zh: "修复会影响 PSA / BGS 评级吗？",
  } satisfies C,
  faq2A: {
    fr: "Nos interventions sont non-invasives : nettoyage, redressage et pressage. Elles ne sont pas considérées comme des altérations chimiques. Nous vous conseillons toutefois selon le grading visé.",
    en: "Our interventions are non-invasive: cleaning, flattening, pressing. They are not considered chemical alterations. We will still advise you depending on the grading you target.",
    es: "Nuestras intervenciones son no invasivas: limpieza, aplanado y prensado. No se consideran alteraciones químicas. Aun así te asesoramos según el grading objetivo.",
    ru: "Наши процедуры неинвазивны: очистка, выпрямление, прессование. Они не считаются химическим вмешательством. При этом мы консультируем с учётом нужного грейдинга.",
    zh: "我们的工艺为非侵入式：清洁、整平与压平，不属于化学改造。我们仍会根据您目标的评级提供建议。",
  } satisfies C,
  faq3Q: {
    fr: "Combien de temps prend une restauration ?",
    en: "How long does a restoration take?",
    es: "¿Cuánto tarda una restauración?",
    ru: "Сколько занимает реставрация?",
    zh: "一次修复需要多久？",
  } satisfies C,
  faq3A: {
    fr: "Comptez 5 à 10 jours ouvrés à compter de la réception de votre colis, hors délai de transport.",
    en: "Plan for 5 to 10 working days from the moment we receive your parcel, excluding shipping time.",
    es: "Calcula entre 5 y 10 días laborables desde la recepción de tu paquete, sin contar el envío.",
    ru: "Планируйте 5–10 рабочих дней с момента получения посылки, без учёта доставки.",
    zh: "自我们收件起约 5 至 10 个工作日，不含运输时间。",
  } satisfies C,
  faq4Q: {
    fr: "Comment se déroule le paiement ?",
    en: "How does payment work?",
    es: "¿Cómo funciona el pago?",
    ru: "Как происходит оплата?",
    zh: "付款方式是怎样的？",
  } satisfies C,
  faq4A: {
    fr: "Devis envoyé après diagnostic. Paiement par carte, virement ou PayPal une fois le devis validé. Aucun prélèvement avant votre accord.",
    en: "Quote sent after diagnosis. Payment by card, bank transfer or PayPal once you approve the quote. Nothing is charged before your agreement.",
    es: "Presupuesto tras el diagnóstico. Pago con tarjeta, transferencia o PayPal cuando lo apruebas. No se cobra nada antes de tu confirmación.",
    ru: "Смета после диагностики. Оплата картой, переводом или PayPal после её утверждения. До согласия с вас ничего не списывается.",
    zh: "诊断后提供报价。报价确认后可用信用卡、银行转账或 PayPal 付款，确认前不收取任何费用。",
  } satisfies C,
} as const;

export type CopyKey = keyof typeof copy;
