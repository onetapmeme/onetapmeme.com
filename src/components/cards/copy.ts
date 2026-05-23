// Multilingual copy for the "CardSurgery — Card Restoration" homepage.
// Keys are kept flat so each section component can read its own slice.
//
// Brand tone — strict glossary:
//   FR : « Restauration clinique », « Précision chirurgicale », « Préservation de la valeur »
//   EN : "Clinical restoration", "Surgical precision", "Asset preservation"
//   DE : „Klinische Wiederherstellung", „Chirurgische Präzision", „Werterhalt"
//
// Priority languages: FR / EN / DE (German auto-detected for DE/AT/LI/CH-DE).
// ES / RU / ZH are kept as fallback locales — surfaced in the "More languages" group.

export type Lang = "fr" | "en" | "de" | "es" | "ru" | "zh";

export const SUPPORTED: Lang[] = ["fr", "en", "de", "es", "ru", "zh"];

export function pickLang(raw: string | undefined): Lang {
  const code = (raw || "fr").slice(0, 2).toLowerCase() as Lang;
  return (SUPPORTED as string[]).includes(code) ? code : "fr";
}

type C = Record<Lang, string>;

export const copy = {
  brand: { fr: "CardSurgery", en: "CardSurgery", de: "CardSurgery", es: "CardSurgery", ru: "CardSurgery", zh: "CardSurgery" } satisfies C,

  // Hero
  heroEyebrow: {
    fr: "Restauration professionnelle de cartes de collection",
    en: "Professional collectible card restoration",
    de: "Professionelle Restaurierung von Sammelkarten",
    es: "Restauración profesional de cartas coleccionables",
    ru: "Профессиональная реставрация коллекционных карт",
    zh: "专业收藏卡牌修复",
  } satisfies C,
  heroTitle: {
    fr: "L'art de la chirurgie appliqué à vos cartes.",
    en: "The art of surgery applied to your cards.",
    de: "Die Kunst der Chirurgie – auf Ihre Karten angewandt.",
    es: "El arte de la cirugía aplicado a tus cartas.",
    ru: "Искусство хирургии для ваших карт.",
    zh: "以外科精准之艺，呵护每一张珍藏。",
  } satisfies C,
  heroSubtitle: {
    fr: "Redonnez vie à vos cartes en un seul geste maîtrisé. Pokémon, One Piece, Magic, Yu-Gi-Oh et autres TCG.",
    en: "Bring your cards back to life with a single expert touch. Pokémon, One Piece, Magic, Yu-Gi-Oh and other TCGs.",
    de: "Erwecken Sie Ihre Karten mit einem einzigen, präzisen Eingriff zu neuem Leben. Pokémon, One Piece, Magic, Yu-Gi-Oh und weitere TCGs.",
    es: "Devuelve la vida a tus cartas con un solo gesto experto. Pokémon, One Piece, Magic, Yu-Gi-Oh y otros TCG.",
    ru: "Верните карты к жизни одним выверенным движением. Pokémon, One Piece, Magic, Yu-Gi-Oh и другие ККИ.",
    zh: "一次精准的处理，让卡牌焕然一新。涵盖 Pokémon、One Piece、Magic、Yu-Gi-Oh 等集换式卡牌。",
  } satisfies C,
  heroTagline: {
    fr: "La précision chirurgicale dont vos précieuses cartes ont besoin.",
    en: "The surgical precision your precious cards deserve.",
    de: "Die chirurgische Präzision, die Ihre wertvollen Karten verdienen.",
    es: "La precisión quirúrgica que tus preciadas cartas merecen.",
    ru: "Хирургическая точность, которой заслуживают ваши драгоценные карты.",
    zh: "为您珍贵卡牌应得的外科级精准。",
  } satisfies C,
  heroBadgeSaved: {
    fr: "+{count} cartes déjà sauvées par nos experts",
    en: "+{count} cards already saved by our experts",
    de: "+{count} cards already saved by our experts",
    es: "+{count} cartas ya salvadas por nuestros expertos",
    ru: "Уже спасено +{count} карт нашими экспертами",
    zh: "我们的专家已挽救 +{count} 张卡牌",
  } satisfies C,
  heroCtaPrimary: {
    fr: "Débuter une opération de restauration",
    en: "Start a restoration operation",
    de: "Restaurierung starten",
    es: "Iniciar una operación de restauración",
    ru: "Начать операцию реставрации",
    zh: "开始修复操作",
  } satisfies C,
  heroCtaSecondary: {
    fr: "Débuter une opération de restauration",
    en: "Start a restoration operation",
    de: "Unsere Leistungen entdecken",
    es: "Iniciar una operación de restauración",
    ru: "Начать операцию реставрации",
    zh: "开始修复操作",
  } satisfies C,
  heroBadgeTrust: {
    fr: "+127 cartes déjà sauvées",
    en: "+127 cards already saved",
    de: "+127 cards already saved",
    es: "+127 cartas ya salvadas",
    ru: "Уже спасено +127 карт",
    zh: "已挽救 +127 张卡牌",
  } satisfies C,
  heroBadgeWarranty: {
    fr: "Garantie satisfait ou remboursé",
    en: "Satisfaction-or-refund guarantee",
    de: "Satisfaction-or-refund guarantee",
    es: "Garantía de satisfacción o reembolso",
    ru: "Гарантия возврата средств",
    zh: "满意保证，否则全额退款",
  } satisfies C,
  heroBadgeInsured: {
    fr: "Colis assurés à 100 %",
    en: "Fully insured shipments",
    de: "Fully insured shipments",
    es: "Envíos 100 % asegurados",
    ru: "Полное страхование посылок",
    zh: "包裹 100% 投保",
  } satisfies C,

  // About / Storytelling
  aboutTitle: {
    fr: "Qui sommes-nous",
    en: "About us",
    de: "Über uns",
    es: "Quiénes somos",
    ru: "О нас",
    zh: "关于我们",
  } satisfies C,
  aboutP1: {
    fr: "CardSurgery est né de la passion d'Hugo, collectionneur exigeant de cartes Pokémon et One Piece haut de gamme. Chaque carte est une pièce de patrimoine — un souvenir, une émotion, une valeur — qui mérite d'être préservée avec la rigueur d'une œuvre d'art.",
    en: "CardSurgery was born from the passion of Hugo, a discerning collector of high-end Pokémon and One Piece cards. Every card is a piece of heritage — a memory, an emotion, a value — that deserves to be preserved with the rigor of a work of art.",
    de: "CardSurgery entstand aus der Leidenschaft von Hugo, einem anspruchsvollen Sammler hochwertiger Pokémon- und One-Piece-Karten. Jede Karte ist ein Stück Vermächtnis – eine Erinnerung, ein Gefühl, ein Wert – das mit der Sorgfalt eines Kunstwerks bewahrt werden sollte.",
    es: "CardSurgery nace de la pasión de Hugo, coleccionista exigente de cartas Pokémon y One Piece de alta gama. Cada carta es una pieza de patrimonio — un recuerdo, una emoción, un valor — que merece preservarse con el rigor de una obra de arte.",
    ru: "CardSurgery родился из страсти Hugo — взыскательного коллекционера премиальных карт Pokémon и One Piece. Каждая карта — часть наследия: воспоминание, эмоция, ценность, которую следует сохранить с тщательностью произведения искусства.",
    zh: "CardSurgery 源自 Hugo 的热爱——他是 Pokémon 与 One Piece 高端卡牌的资深收藏家。每一张卡都是一份珍贵的传承：一段记忆、一份情感、一份价值，值得以艺术品般的严谨加以守护。",
  } satisfies C,
  aboutP2: {
    fr: "Hugo est infirmier en service de chirurgie. Précision millimétrique, dextérité méticuleuse, rigueur absolue : les standards qu'il applique chaque jour à l'hôpital sont exactement ceux qu'il transpose à la restauration et à la préservation de vos cartes. Vos pièces de collection sont traitées avec l'exigence d'un patient.",
    en: "Hugo is a Nurse in a Surgical Department. Millimetric precision, meticulous dexterity, absolute rigor: the standards he applies daily in the hospital are exactly those he transposes to the restoration and preservation of your cards. Your collectibles are treated with the rigor reserved for a patient.",
    de: "Hugo ist OP-Pfleger in einer chirurgischen Abteilung. Millimetergenaue Präzision, akribische Geschicklichkeit, absolute Strenge: Die Standards, die er täglich im Krankenhaus anwendet, überträgt er exakt auf die Restaurierung und Bewahrung Ihrer Karten. Ihre Sammlerstücke werden mit der Sorgfalt eines Patienten behandelt.",
    es: "Hugo es enfermero en un servicio de cirugía. Precisión milimétrica, destreza meticulosa, rigor absoluto: los estándares que aplica a diario en el hospital son exactamente los que traslada a la restauración y preservación de tus cartas. Tus piezas de colección reciben el rigor reservado a un paciente.",
    ru: "Hugo — медсестра хирургического отделения. Миллиметровая точность, скрупулёзная ловкость, абсолютная строгость: стандарты, которые он применяет ежедневно в больнице, в точности переносятся на реставрацию и сохранение ваших карт. С вашими коллекционными ценностями обращаются как с пациентом.",
    zh: "Hugo 是外科病房的护士。毫米级精度、精细手法、绝对严谨——他每日在医院遵循的标准，正是他用于您卡牌修复与保存的标准。您的藏品将得到如同病人般的对待。",
  } satisfies C,


  // Services
  servicesTitle: {
    fr: "Nos services de restauration",
    en: "Our restoration services",
    de: "Unsere Restaurierungsleistungen",
    es: "Nuestros servicios de restauración",
    ru: "Наши услуги реставрации",
    zh: "我们的修复服务",
  } satisfies C,
  servicesSubtitle: {
    fr: "Quatre interventions artisanales, calibrées pour chaque type de défaut.",
    en: "Four artisan interventions, calibrated for every type of flaw.",
    de: "Vier handwerkliche Eingriffe, kalibriert für jede Art von Defekt.",
    es: "Cuatro intervenciones artesanales, calibradas para cada tipo de defecto.",
    ru: "Четыре авторские процедуры, рассчитанные под каждый тип дефекта.",
    zh: "四种匠心工艺，针对不同瑕疵精准应对。",
  } satisfies C,
  servicesFlow: {
    fr: "Parcours sécurisé : vous expédiez votre carte en colis assuré et suivi → diagnostic en laboratoire → restauration → option grading partenaire (PCA, CCC, Collect Aura) si choisie → retour chez vous en colis assuré et suivi de bout en bout.",
    en: "Secure journey: you ship your card in an insured tracked parcel → lab diagnosis → restoration → optional partner grading (PCA, CCC, Collect Aura) if selected → return to you via fully insured tracked parcel.",
    de: "Sicherer Ablauf: Sie versenden Ihre Karte als versichertes, nachverfolgbares Paket → Labordiagnose → Restaurierung → optionales Partner-Grading (PCA, CCC, Collect Aura) → versicherter und nachverfolgter Rückversand.",
    es: "Trayecto seguro: envías tu carta en un paquete asegurado y rastreado → diagnóstico en laboratorio → restauración → grading opcional con socio (PCA, CCC, Collect Aura) si lo eliges → devolución a tu domicilio en paquete asegurado y rastreado.",
    ru: "Безопасный маршрут: вы отправляете карту застрахованной отслеживаемой посылкой → диагностика в лаборатории → реставрация → опциональный грейдинг у партнёра (PCA, CCC, Collect Aura) → возврат застрахованной отслеживаемой посылкой.",
    zh: "安全流程：您以保价并可追踪的包裹寄出卡牌 → 实验室诊断 → 修复 → 可选合作机构评级（PCA、CCC、Collect Aura）→ 全程保价追踪寄回。",
  } satisfies C,

  service1Title: {
    fr: "Nettoyage de surface",
    en: "Surface cleaning",
    de: "Oberflächenreinigung",
    es: "Limpieza de superficie",
    ru: "Очистка поверхности",
    zh: "表面清洁",
  } satisfies C,
  service1Desc: {
    fr: "Élimination des impuretés sans altérer la brillance d'origine de la carte.",
    en: "Removal of impurities without altering the card's original gloss.",
    de: "Entfernung von Verunreinigungen, ohne den ursprünglichen Glanz der Karte zu beeinträchtigen.",
    es: "Eliminación de impurezas sin alterar el brillo original de la carta.",
    ru: "Удаление загрязнений без изменения исходного блеска карты.",
    zh: "去除杂质，不损伤卡面原有光泽。",
  } satisfies C,

  service2Title: {
    fr: "Correction des bords (Whitening)",
    en: "Edge correction (Whitening)",
    de: "Kantenkorrektur (Whitening)",
    es: "Corrección de bordes (Whitening)",
    ru: "Коррекция краёв (Whitening)",
    zh: "边缘修整（去白边）",
  } satisfies C,
  service2Desc: {
    fr: "Atténuation des traces d'usure blanches sur les arêtes pour retrouver un cadre net.",
    en: "Reduction of whitened wear marks along the edges for a clean, sharp frame.",
    de: "Reduktion weißer Abnutzungsspuren an den Kanten für einen sauberen, scharfen Rahmen.",
    es: "Atenuación de las marcas blancas de desgaste en los bordes para recuperar un marco nítido.",
    ru: "Уменьшение белых потёртостей по краям ради чёткой, аккуратной рамки.",
    zh: "淡化边缘磨损白痕，恢复整齐锐利的卡框。",
  } satisfies C,

  service3Title: {
    fr: "Redressage (De-curving)",
    en: "Flattening (De-curving)",
    de: "Glättung (De-curving)",
    es: "Aplanado (De-curving)",
    ru: "Выпрямление (De-curving)",
    zh: "去弯整平（De-curving）",
  } satisfies C,
  service3Desc: {
    fr: "Correction des cartes courbées par l'humidité pour retrouver une planéité parfaite.",
    en: "Correction of cards warped by humidity to restore perfect flatness.",
    de: "Korrektur durch Feuchtigkeit verzogener Karten zur perfekten Planheit.",
    es: "Corrección de cartas curvadas por la humedad para recuperar una planitud perfecta.",
    ru: "Восстановление карт, изогнутых от влажности, до идеальной плоскости.",
    zh: "矫正因受潮而弯曲的卡牌，恢复完美平整。",
  } satisfies C,

  service4Title: {
    fr: "Pressage de précision",
    en: "Precision pressing",
    de: "Präzisionspressung",
    es: "Prensado de precisión",
    ru: "Прецизионное прессование",
    zh: "精密压平",
  } satisfies C,
  service4Desc: {
    fr: "Réduction des micro-pliures et des imperfections de surface au micron près.",
    en: "Reduction of micro-creases and surface imperfections down to the micron.",
    de: "Reduktion von Mikroknicken und Oberflächendefekten bis auf den Mikrometer.",
    es: "Reducción de microdobleces e imperfecciones de superficie con precisión micrométrica.",
    ru: "Устранение микрозаломов и поверхностных дефектов с точностью до микрона.",
    zh: "以微米级精度消除微折与表面瑕疵。",
  } satisfies C,

  // Process
  processTitle: {
    fr: "Notre processus en 4 étapes",
    en: "Our 4-step process",
    de: "Unser Prozess in 4 Schritten",
    es: "Nuestro proceso en 4 pasos",
    ru: "Наш процесс из 4 шагов",
    zh: "四步专业流程",
  } satisfies C,
  processSubtitle: {
    fr: "De votre boîte aux lettres à votre vitrine, votre carte est entre des mains expertes.",
    en: "From your mailbox to your display case, your card is in expert hands.",
    de: "Vom Briefkasten bis zur Vitrine – Ihre Karte ist in Expertenhänden.",
    es: "Desde tu buzón hasta tu vitrina, tu carta está en manos expertas.",
    ru: "От вашего почтового ящика до витрины — карта в руках экспертов.",
    zh: "从邮箱到展柜，您的卡牌全程由专家把关。",
  } satisfies C,

  step1Title: {
    fr: "Analyse au microscope 🔬",
    en: "Microscope analysis 🔬",
    de: "Mikroskopische Analyse 🔬",
    es: "Análisis al microscopio 🔬",
    ru: "Анализ под микроскопом 🔬",
    zh: "显微镜分析 🔬",
  } satisfies C,
  step1Desc: {
    fr: "Diagnostic complet sous microscope optique haute résolution : cartographie des micro-rayures, défauts d'impression, courbure et état des coins.",
    en: "Full diagnosis under high-resolution optical microscope: mapping of micro-scratches, print defects, warping and corner condition.",
    de: "Vollständige Diagnose unter hochauflösendem optischem Mikroskop: Kartierung von Mikrokratzern, Druckfehlern, Verformungen und Eckenzustand.",
    es: "Diagnóstico completo bajo microscopio óptico de alta resolución: mapeo de microarañazos, defectos de impresión, curvatura y estado de las esquinas.",
    ru: "Полная диагностика под оптическим микроскопом высокого разрешения: картирование микроцарапин, дефектов печати, изгиба и состояния углов.",
    zh: "在高分辨率光学显微镜下完成全面诊断：微划痕、印刷瑕疵、卡片弯曲及四角状态的全面映射。",
  } satisfies C,

  step2Title: {
    fr: "Nettoyage en profondeur",
    en: "Deep cleaning",
    de: "Tiefenreinigung",
    es: "Limpieza profunda",
    ru: "Глубокая очистка",
    zh: "深度清洁",
  } satisfies C,
  step2Desc: {
    fr: "Nettoyage de précision du recto et du verso à l'aide de solutions non invasives, sans solvants agressifs ni altération du vernis ou de l'holofoil.",
    en: "Precision cleaning of front and back using non-invasive solutions, no aggressive solvents and no alteration of varnish or holofoil.",
    de: "Präzisionsreinigung von Vorder- und Rückseite mit nicht-invasiven Lösungen, ohne aggressive Lösemittel und ohne Beeinträchtigung von Lack oder Holofoil.",
    es: "Limpieza de precisión del anverso y reverso con soluciones no invasivas, sin disolventes agresivos ni alteración del barniz o del holofoil.",
    ru: "Прецизионная очистка лицевой и обратной стороны с использованием неинвазивных растворов, без агрессивных растворителей и без повреждения лака или голограммы.",
    zh: "采用非侵入式清洁液对卡牌正反面进行精细清洁，不使用强力溶剂，不损伤光油层或镭射层。",
  } satisfies C,

  step3Title: {
    fr: "Redressage carte & coins",
    en: "Card & corner reshaping",
    de: "Card & corner reshaping",
    es: "Aplanado de carta y esquinas",
    ru: "Выпрямление карты и углов",
    zh: "卡身与四角整形",
  } satisfies C,
  step3Desc: {
    fr: "Remise à plat de la carte et reprise des coins par un processus d'humidification contrôlée et de pressage progressif. Délais : 7 jours (Standard), 10 jours (Avancé), 14 jours (Full Surgery).",
    en: "Card flattening and corner recovery through a controlled humidification process and progressive pressing. Turnarounds: 7 days (Standard), 10 days (Advanced), 14 days (Full Surgery).",
    de: "Card flattening and corner recovery through a controlled humidification process and progressive pressing. Turnarounds: 7 days (Standard), 10 days (Advanced), 14 days (Full Surgery).",
    es: "Aplanado de la carta y recuperación de esquinas mediante un proceso de humidificación controlada y prensado progresivo. Plazos: 7 días (Estándar), 10 días (Avanzado), 14 días (Full Surgery).",
    ru: "Выравнивание карты и восстановление углов посредством контролируемого увлажнения и постепенного прессования. Сроки: 7 дней (Стандарт), 10 дней (Продвинутый), 14 дней (Full Surgery).",
    zh: "通过受控加湿与渐进压平工艺，对卡身与四角进行整平复原。周期：标准 7 天 / 进阶 10 天 / Full Surgery 14 天。",
  } satisfies C,

  step4Title: {
    fr: "Polissage de surface",
    en: "Surface polishing",
    de: "Surface polishing",
    es: "Pulido de superficie",
    ru: "Полировка поверхности",
    zh: "表面抛光",
  } satisfies C,
  step4Desc: {
    fr: "Polissage expert pour éliminer le maximum de rayures superficielles, restituer la brillance d'origine et maximiser l'Eye-Appeal avant grading.",
    en: "Expert polishing to remove the maximum of surface scratches, restore original gloss and maximize Eye-Appeal before grading.",
    de: "Expert polishing to remove the maximum of surface scratches, restore original gloss and maximize Eye-Appeal before grading.",
    es: "Pulido experto para eliminar el máximo de arañazos superficiales, restaurar el brillo original y maximizar el Eye-Appeal antes del grading.",
    ru: "Экспертная полировка для удаления максимума поверхностных царапин, восстановления исходного блеска и максимизации Eye-Appeal перед грейдингом.",
    zh: "由专家进行抛光，最大程度去除表面划痕，恢复原有光泽，提升送评前的视觉表现。",
  } satisfies C,

  // Why us
  whyTitle: {
    fr: "Pourquoi nous confier vos cartes ?",
    en: "Why entrust us with your cards?",
    de: "Why entrust us with your cards?",
    es: "¿Por qué confiarnos tus cartas?",
    ru: "Почему доверить карты именно нам?",
    zh: "为什么把卡牌交给我们？",
  } satisfies C,
  why1Title: {
    fr: "Précision chirurgicale",
    en: "Surgical precision",
    de: "Surgical precision",
    es: "Precisión quirúrgica",
    ru: "Хирургическая точность",
    zh: "外科级精准",
  } satisfies C,
  why1Desc: {
    fr: "Outils calibrés, gestes mesurés, lumière contrôlée. Chaque intervention est documentée.",
    en: "Calibrated tools, measured gestures, controlled light. Every intervention is documented.",
    de: "Calibrated tools, measured gestures, controlled light. Every intervention is documented.",
    es: "Herramientas calibradas, gestos medidos, luz controlada. Cada intervención queda documentada.",
    ru: "Калиброванные инструменты, выверенные движения, контролируемое освещение. Каждая работа документируется.",
    zh: "校准工具、细致手法、可控光源。每次操作均有记录。",
  } satisfies C,
  why2Title: {
    fr: "Respect de la valeur",
    en: "Value preserved",
    de: "Value preserved",
    es: "Valor respetado",
    ru: "Сохранение ценности",
    zh: "守护卡牌价值",
  } satisfies C,
  why2Desc: {
    fr: "Aucune intervention agressive : nous restaurons sans dénaturer ni masquer le grade.",
    en: "No aggressive interventions: we restore without altering or masking the grade.",
    de: "No aggressive interventions: we restore without altering or masking the grade.",
    es: "Ninguna intervención agresiva: restauramos sin desnaturalizar ni ocultar el grade.",
    ru: "Никаких агрессивных вмешательств: реставрируем, не искажая и не скрывая грейд.",
    zh: "拒绝激进处理，修复不影响也不掩盖原始品相。",
  } satisfies C,
  why3Title: {
    fr: "Avant / après transparent",
    en: "Transparent before / after",
    de: "Transparent before / after",
    es: "Antes / después transparente",
    ru: "Прозрачное «до и после»",
    zh: "透明的修复前后对比",
  } satisfies C,
  why3Desc: {
    fr: "Photos haute définition à chaque étape. Vous validez avant le retour de votre carte.",
    en: "High-definition photos at every step. You approve before your card ships back.",
    de: "High-definition photos at every step. You approve before your card ships back.",
    es: "Fotos en alta definición en cada etapa. Tú validas antes de que la carta regrese.",
    ru: "HD-фотографии на каждом этапе. Вы подтверждаете до отправки карты обратно.",
    zh: "全程高清留影，回寄前由您确认。",
  } satisfies C,
  why4Title: {
    fr: "Discrétion totale",
    en: "Full discretion",
    de: "Full discretion",
    es: "Discreción total",
    ru: "Полная конфиденциальность",
    zh: "完全保密",
  } satisfies C,
  why4Desc: {
    fr: "Vos cartes et leur valeur restent confidentielles. Stockage sécurisé en coffre.",
    en: "Your cards and their value remain confidential. Secure vault storage.",
    de: "Your cards and their value remain confidential. Secure vault storage.",
    es: "Tus cartas y su valor son confidenciales. Almacenamiento seguro en caja fuerte.",
    ru: "Ваши карты и их ценность остаются конфиденциальными. Хранение в сейфе.",
    zh: "您的卡牌与价值信息严格保密，全程保险柜存放。",
  } satisfies C,

  // Trust
  trustTitle: {
    fr: "Garanties & expertise",
    en: "Guarantees & expertise",
    de: "Guarantees & expertise",
    es: "Garantías y experiencia",
    ru: "Гарантии и экспертиза",
    zh: "保障与专业",
  } satisfies C,
  trust1: {
    fr: "+200 cartes restaurées par notre laboratoire",
    en: "+200 cards restored by our laboratory",
    de: "+200 cards restored by our laboratory",
    es: "+200 cartas restauradas por nuestro laboratorio",
    ru: "+200 карт восстановлено нашей лабораторией",
    zh: "实验室已修复 +200 张卡牌",
  } satisfies C,
  trust2: {
    fr: "Colis assurés jusqu'à 5 000 € à l'aller comme au retour",
    en: "Shipments insured up to €5,000 each way",
    de: "Shipments insured up to €5,000 each way",
    es: "Envíos asegurados hasta 5 000 € en ambos sentidos",
    ru: "Посылки застрахованы на сумму до 5 000 € в обе стороны",
    zh: "去程与回程包裹均最高承保 5,000 €",
  } satisfies C,
  trust3: {
    fr: "Devis transparent avant toute intervention",
    en: "Transparent quote before any intervention",
    de: "Transparent quote before any intervention",
    es: "Presupuesto transparente antes de cualquier intervención",
    ru: "Прозрачная смета до начала любых работ",
    zh: "任何操作前均提供透明报价",
  } satisfies C,
  trust4: {
    fr: "Garantie satisfait ou remboursé",
    en: "Satisfaction-or-refund guarantee",
    de: "Satisfaction-or-refund guarantee",
    es: "Garantía de satisfacción o reembolso",
    ru: "Гарантия возврата средств",
    zh: "满意保证，否则全额退款",
  } satisfies C,

  // Final CTA
  ctaTitle: {
    fr: "Prêt à redonner vie à votre collection ?",
    en: "Ready to bring your collection back to life?",
    de: "Bereit, Ihren Karten neues Leben zu schenken?",
    es: "¿Listo para devolver la vida a tu colección?",
    ru: "Готовы вернуть коллекции жизнь?",
    zh: "准备好让你的收藏焕新了吗？",
  } satisfies C,
  ctaDesc: {
    fr: "Demandez votre diagnostic CardSurgery gratuit. Réponse sous 24 h ouvrées.",
    en: "Request your free CardSurgery diagnosis. Reply within 24 working hours.",
    de: "Starten Sie noch heute Ihre maßgeschneiderte Restaurierungsoperation.",
    es: "Solicita tu diagnóstico CardSurgery gratuito. Respuesta en 24 h laborables.",
    ru: "Запросите бесплатную диагностику CardSurgery. Ответ в течение 24 рабочих часов.",
    zh: "立即获取免费 CardSurgery 诊断，24 个工作小时内回复。",
  } satisfies C,
  ctaButton: {
    fr: "Débuter une opération de restauration",
    en: "Start a restoration operation",
    de: "Eine Restaurierung beginnen",
    es: "Iniciar una operación de restauración",
    ru: "Начать операцию реставрации",
    zh: "开始修复操作",
  } satisfies C,
  ctaContact: {
    fr: "Ou écrivez-nous à",
    en: "Or write to us at",
    de: "Oder schreiben Sie uns an",
    es: "O escríbenos a",
    ru: "Или напишите нам на",
    zh: "或写信至",
  } satisfies C,

  // Section anchors / nav
  navServices: { fr: "Services", en: "Services", de: "Leistungen", es: "Servicios", ru: "Услуги", zh: "服务" } satisfies C,
  navProcess: { fr: "Processus", en: "Process", de: "Ablauf", es: "Proceso", ru: "Процесс", zh: "流程" } satisfies C,
  navWhy: { fr: "Qui sommes-nous", en: "About us", de: "Über uns", es: "Quiénes somos", ru: "О нас", zh: "关于我们" } satisfies C,
  navFaq: { fr: "FAQ", en: "FAQ", de: "FAQ", es: "FAQ", ru: "FAQ", zh: "常见问题" } satisfies C,
  navContact: { fr: "Contact", en: "Contact", de: "Kontakt", es: "Contacto", ru: "Контакты", zh: "联系" } satisfies C,
  login: { fr: "Connexion", en: "Login", de: "Anmelden", es: "Acceder", ru: "Войти", zh: "登录" } satisfies C,

  // Footer
  footerTagline: {
    fr: "Restauration artisanale de cartes Pokémon, One Piece et autres TCG. Précision, transparence, discrétion.",
    en: "Artisan restoration of Pokémon, One Piece and other TCG cards. Precision, transparency, discretion.",
    de: "Handwerkliche Restaurierung von Pokémon-, One-Piece- und weiteren TCG-Karten. Präzision, Transparenz, Diskretion.",
    es: "Restauración artesanal de cartas Pokémon, One Piece y otros TCG. Precisión, transparencia, discreción.",
    ru: "Авторская реставрация карт Pokémon, One Piece и других ККИ. Точность, прозрачность, конфиденциальность.",
    zh: "Pokémon、One Piece 等 TCG 卡牌的匠心修复服务。精准、透明、保密。",
  } satisfies C,
  footerRights: {
    fr: "Tous droits réservés.",
    en: "All rights reserved.",
    de: "Alle Rechte vorbehalten.",
    es: "Todos los derechos reservados.",
    ru: "Все права защищены.",
    zh: "保留所有权利。",
  } satisfies C,
  footerLegal: {
    fr: "Légal",
    en: "Legal",
    de: "Rechtliches",
    es: "Legal",
    ru: "Юридическое",
    zh: "法律",
  } satisfies C,
  footerLinks: {
    fr: "Liens utiles",
    en: "Useful links",
    de: "Nützliche Links",
    es: "Enlaces útiles",
    ru: "Полезные ссылки",
    zh: "实用链接",
  } satisfies C,
  footerContact: {
    fr: "Contact",
    en: "Contact",
    de: "Kontakt",
    es: "Contacto",
    ru: "Контакты",
    zh: "联系我们",
  } satisfies C,

  // FAQ
  faqTitle: {
    fr: "Questions fréquentes",
    en: "Frequently asked questions",
    de: "Häufig gestellte Fragen",
    es: "Preguntas frecuentes",
    ru: "Частые вопросы",
    zh: "常见问题",
  } satisfies C,
  faq1Q: {
    fr: "Quels jeux de cartes acceptez-vous ?",
    en: "Which card games do you accept?",
    de: "Welche Kartenspiele akzeptieren Sie?",
    es: "¿Qué juegos de cartas aceptan?",
    ru: "С какими ККИ вы работаете?",
    zh: "你们接受哪些卡牌游戏？",
  } satisfies C,
  faq1A: {
    fr: "Pokémon, One Piece, Magic: The Gathering, Yu-Gi-Oh!, Lorcana et la plupart des TCG modernes ou vintage.",
    en: "Pokémon, One Piece, Magic: The Gathering, Yu-Gi-Oh!, Lorcana and most modern or vintage TCGs.",
    de: "Pokémon, One Piece, Magic: The Gathering, Yu-Gi-Oh!, Lorcana und die meisten modernen oder Vintage-TCGs.",
    es: "Pokémon, One Piece, Magic: The Gathering, Yu-Gi-Oh!, Lorcana y la mayoría de TCG modernos o vintage.",
    ru: "Pokémon, One Piece, Magic: The Gathering, Yu-Gi-Oh!, Lorcana и большинство современных и винтажных ККИ.",
    zh: "Pokémon、One Piece、万智牌、游戏王、Lorcana 以及大多数现代或老版 TCG。",
  } satisfies C,
  faq2Q: {
    fr: "La restauration affecte-t-elle le grade PSA / BGS ?",
    en: "Does restoration affect PSA / BGS grading?",
    de: "Beeinflusst die Restaurierung das PSA/BGS-Grading?",
    es: "¿La restauración afecta al grade PSA / BGS?",
    ru: "Влияет ли реставрация на оценку PSA / BGS?",
    zh: "修复会影响 PSA / BGS 评级吗？",
  } satisfies C,
  faq2A: {
    fr: "Nos interventions sont non-invasives : nettoyage, redressage et pressage. Elles ne sont pas considérées comme des altérations chimiques. Nous vous conseillons toutefois selon le grading visé.",
    en: "Our interventions are non-invasive: cleaning, flattening, pressing. They are not considered chemical alterations. We will still advise you depending on the grading you target.",
    de: "Unsere Eingriffe sind nicht-invasiv: Reinigung, Glättung, Pressung. Sie gelten nicht als chemische Veränderung. Wir beraten Sie dennoch je nach gewünschtem Grading.",
    es: "Nuestras intervenciones son no invasivas: limpieza, aplanado y prensado. No se consideran alteraciones químicas. Aun así te asesoramos según el grading objetivo.",
    ru: "Наши процедуры неинвазивны: очистка, выпрямление, прессование. Они не считаются химическим вмешательством. При этом мы консультируем с учётом нужного грейдинга.",
    zh: "我们的工艺为非侵入式：清洁、整平与压平，不属于化学改造。我们仍会根据您目标的评级提供建议。",
  } satisfies C,
  faq3Q: {
    fr: "Combien de temps prend une restauration ?",
    en: "How long does a restoration take?",
    de: "Wie lange dauert eine Restaurierung?",
    es: "¿Cuánto tarda una restauración?",
    ru: "Сколько занимает реставрация?",
    zh: "一次修复需要多久？",
  } satisfies C,
  faq3A: {
    fr: "Comptez 5 à 10 jours ouvrés à compter de la réception de votre colis, hors délai de transport.",
    en: "Plan for 5 to 10 working days from the moment we receive your parcel, excluding shipping time.",
    de: "Rechnen Sie mit 5 bis 10 Werktagen ab Eingang Ihres Pakets, exklusive Versandzeit.",
    es: "Calcula entre 5 y 10 días laborables desde la recepción de tu paquete, sin contar el envío.",
    ru: "Планируйте 5–10 рабочих дней с момента получения посылки, без учёта доставки.",
    zh: "自我们收件起约 5 至 10 个工作日，不含运输时间。",
  } satisfies C,
  faq4Q: {
    fr: "Comment se déroule le paiement ?",
    en: "How does payment work?",
    de: "Wie funktioniert die Zahlung?",
    es: "¿Cómo funciona el pago?",
    ru: "Как происходит оплата?",
    zh: "付款方式是怎样的？",
  } satisfies C,
  faq4A: {
    fr: "Devis envoyé après diagnostic. Paiement par carte, virement ou PayPal une fois le devis validé. Aucun prélèvement avant votre accord.",
    en: "Quote sent after diagnosis. Payment by card, bank transfer or PayPal once you approve the quote. Nothing is charged before your agreement.",
    de: "Kostenvoranschlag nach Diagnose. Zahlung per Karte, Überweisung oder PayPal nach Ihrer Bestätigung. Vor Ihrer Zustimmung wird nichts berechnet.",
    es: "Presupuesto tras el diagnóstico. Pago con tarjeta, transferencia o PayPal cuando lo apruebas. No se cobra nada antes de tu confirmación.",
    ru: "Смета после диагностики. Оплата картой, переводом или PayPal после её утверждения. До согласия с вас ничего не списывается.",
    zh: "诊断后提供报价。报价确认后可用信用卡、银行转账或 PayPal 付款，确认前不收取任何费用。",
  } satisfies C,

  // Navigation labels
  navGallery: { fr: "Galerie", en: "Gallery", de: "Galerie", es: "Galería", ru: "Галерея", zh: "画廊" } satisfies C,
  navDiagnostic: { fr: "Diagnostic", en: "Diagnosis", de: "Diagnose", es: "Diagnóstico", ru: "Диагностика", zh: "诊断" } satisfies C,
  navBooking: { fr: "Réservation", en: "Booking", de: "Buchung", es: "Reserva", ru: "Запись", zh: "预约" } satisfies C,
  navTracking: { fr: "Suivi", en: "Tracking", de: "Sendungsverfolgung", es: "Seguimiento", ru: "Отслеживание", zh: "跟踪" } satisfies C,
  stepLabel: { fr: "Étape", en: "Step", de: "Schritt", es: "Paso", ru: "Шаг", zh: "步骤" } satisfies C,

  // Lugia Légende #113 — clinical case study
  lugiaCaseTitle: {
    fr: "Restauration Clinique : Étude de cas N°113 (Lugia Légende)",
    en: "Clinical Restoration: Case Study N°113 (Lugia Legend)",
    de: "Klinische Wiederherstellung: Fallstudie Nr. 113 (Lugia Legende)",
    es: "Restauración Clínica: Estudio de caso N.º 113 (Lugia Leyenda)",
    ru: "Клиническая реставрация: пример № 113 (Lugia Легенда)",
    zh: "临床修复案例 N°113（Lugia 传说）",
  } satisfies C,
  lugiaIntro: {
    fr: "Ce dossier traite une Lugia Légende (113/106) présentant une usure sévère sur sa surface holographique. Notre intervention chirurgicale a ciblé deux points critiques :",
    en: "This case addresses a Lugia Legend (113/106) showing severe wear on its holographic surface. Our surgical intervention targeted two critical points:",
    de: "Dieser Fall behandelt eine Lugia Legende (113/106) mit starker Abnutzung der holografischen Oberfläche. Unser chirurgischer Eingriff zielte auf zwei kritische Punkte:",
    es: "Este caso aborda una Lugia Leyenda (113/106) con un desgaste severo en su superficie holográfica. Nuestra intervención quirúrgica se centró en dos puntos críticos:",
    ru: "В этом случае рассматривается Lugia Легенда (113/106) с сильным износом голографической поверхности. Хирургическое вмешательство было направлено на две ключевые зоны:",
    zh: "本案例处理一张表面镭射层严重磨损的 Lugia 传说（113/106）。我们的精密干预聚焦于两个关键部位：",
  } satisfies C,
  lugiaStep1Label: {
    fr: "Nettoyage Micro-Précis :",
    en: "Micro-Precision Cleaning:",
    de: "Mikropräzise Reinigung:",
    es: "Limpieza Micro-Precisa:",
    ru: "Микроточная очистка:",
    zh: "微精度清洁：",
  } satisfies C,
  lugiaStep1Desc: {
    fr: "Élimination des dépôts de surface sans altérer les micro-pigments de l'illustration.",
    en: "Removal of surface deposits without altering the artwork's micro-pigments.",
    de: "Entfernung von Oberflächenablagerungen ohne Beeinträchtigung der Mikropigmente der Illustration.",
    es: "Eliminación de depósitos superficiales sin alterar los micropigmentos de la ilustración.",
    ru: "Удаление поверхностных отложений без воздействия на микропигменты иллюстрации.",
    zh: "清除表面沉积物，同时不损伤画面微观色素。",
  } satisfies C,
  lugiaStep2Label: {
    fr: "Polissage de la Zone Éclairée :",
    en: "Highlighted Holo Area Polishing:",
    de: "Polieren des holografischen Glanzbereichs:",
    es: "Pulido de la Zona Iluminada:",
    ru: "Полировка освещённой зоны:",
    zh: "高亮镭射区域抛光：",
  } satisfies C,
  lugiaStep2Desc: {
    fr: "Un polissage technique a été appliqué sur la zone centrale impactée par le halo lumineux, effaçant les micro-rayures et les frottements pour redonner une clarté et une brillance maximales au foil.",
    en: "Technical polishing was applied to the central area impacted by the light halo, erasing micro-scratches and abrasions to restore maximum clarity and brilliance to the foil.",
    de: "Eine technische Politur wurde im zentralen Bereich des Lichthalos angewandt, um Mikrokratzer und Reibspuren zu entfernen und der Folie maximale Klarheit und Brillanz zurückzugeben.",
    es: "Se aplicó un pulido técnico en la zona central afectada por el halo de luz, eliminando microarañazos y rozaduras para devolver al foil máxima claridad y brillo.",
    ru: "К центральной зоне светового ореола применена техническая полировка, устраняющая микроцарапины и потёртости и возвращающая фольге максимальную прозрачность и блеск.",
    zh: "对受光晕影响的中心区域施以技术抛光，消除微划痕与摩擦痕迹，让镭射层恢复极致通透与亮度。",
  } satisfies C,
  lugiaCaptionFR: {
    fr: "Nettoyage Micro-Précis et Polissage de la zone éclairée centrale.",
    en: "Micro-Precision Cleaning and Technical Polishing of the central highlighted holo area.",
    de: "Mikropräzise Reinigung und technisches Polieren des zentralen holografischen Glanzbereichs.",
    es: "Limpieza Micro-Precisa y Pulido Técnico de la zona holográfica central iluminada.",
    ru: "Микроточная очистка и техническая полировка центральной освещённой голографической зоны.",
    zh: "对中央高亮镭射区域进行微精度清洁与技术抛光。",
  } satisfies C,
  lugiaSlideHint: {
    fr: "Glissez pour observer la résurrection de la clarté sur la zone holographique centrale.",
    en: "Slide to witness the resurrection of clarity on the central holographic area.",
    de: "Ziehen Sie den Regler, um die Wiederbelebung der Klarheit im zentralen holografischen Bereich zu beobachten.",
    es: "Desliza para ver la resurrección de la claridad en la zona holográfica central.",
    ru: "Сдвиньте, чтобы увидеть возрождение прозрачности центральной голографической зоны.",
    zh: "滑动观察中央镭射区域焕然重生的清澈感。",
  } satisfies C,

  beforeAfterTitle: {
    fr: "Avant / Après",
    en: "Before / After",
    de: "Vorher / Nachher",
    es: "Antes / Después",
    ru: "До / После",
    zh: "修复前 / 修复后",
  } satisfies C,
} as const;

export type CopyKey = keyof typeof copy;
