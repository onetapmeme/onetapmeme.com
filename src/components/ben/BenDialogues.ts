export interface BenDialogue {
  text: string;
  duration?: number;
}

export interface BenDialogues {
  [key: string]: {
    [section: string]: BenDialogue;
  };
}

export const benDialogues: BenDialogues = {
  en: {
    spawn: { text: "Target locked. Welcome to $ONETAP.", duration: 3000 },
    hero: { text: "Welcome, 1Tapper. Let me show you what we're building. 🎯", duration: 7000 },
    about: { text: "$ONETAP isn't just a meme — it's precision and purpose. 📖", duration: 7000 },
    tokenomics: { text: "Balanced. Transparent. Locked where it matters. 💎", duration: 7000 },
    'why-onetap': { text: "Want to know why $ONETAP? I'll tell you exactly why. 🎯", duration: 7000 },
    swap: { text: "Ready to swap? One tap and you're in. 💱", duration: 7000 },
    'live-stats': { text: "Watch the data flow in real-time. 📊", duration: 7000 },
    roadmap: { text: "Phase 2 loading... precision incoming. 🗺️", duration: 7000 },
    'tap-to-earn': { text: "Show me your tapping precision! ⚡ (Coming soon)", duration: 7000 },
    rewards: { text: "Every rank brings legendary rewards! 🏆 (In development)", duration: 7000 },
    airdrops: { text: "Free tokens? Count me in. Check the calendar! 🎁", duration: 7000 },
    community: { text: "Join the squad. Become A OneTapper. 🎮", duration: 7000 },
    media: { text: "See what the world is saying about us. 📰", duration: 7000 },
    videos: { text: "Epic gameplay moments. Watch and learn! 🎬", duration: 7000 },
    'social-proof': { text: "The numbers don't lie. We're growing fast! 📈", duration: 7000 },
    memes: { text: "Create legendary content! 🎨 (Coming soon)", duration: 7000 },
    footer: { text: "All legal docs & contact info right here. ⚖️", duration: 7000 },
  },
  fr: {
    spawn: { text: "Cible verrouillée. Bienvenue dans $ONETAP.", duration: 3000 },
    hero: { text: "Bienvenue, OneTapper. Laisse-moi te montrer ce qu'on construit ensemble. 🎯", duration: 7000 },
    about: { text: "$ONETAP, c'est plus qu'un meme — c'est précision et ambition. 📖", duration: 7000 },
    tokenomics: { text: "Équilibré. Transparent. Verrouillé où il faut. 💎", duration: 7000 },
    'why-onetap': { text: "Tu veux savoir pourquoi $ONETAP ? Je vais tout t'expliquer. 🎯", duration: 7000 },
    swap: { text: "Prêt à swap ? Un seul tap et c'est parti. 💱", duration: 7000 },
    'live-stats': { text: "Observe les données en temps réel. On ne rate rien. 📊", duration: 7000 },
    roadmap: { text: "Phase 2 en chargement... la précision arrive. 🗺️", duration: 7000 },
    'tap-to-earn': { text: "Montre-moi ta précision au tap ! ⚡ (Bientôt disponible)", duration: 7000 },
    rewards: { text: "Chaque rang débloque des récompenses légendaires ! 🏆 (En développement)", duration: 7000 },
    airdrops: { text: "Des tokens gratuits ? Je suis partant. Regarde le calendrier ! 🎁", duration: 7000 },
    community: { text: "Rejoins la team. Deviens un vrai OneTapper. 🎮", duration: 7000 },
    media: { text: "Vois ce que le monde dit de nous. 📰", duration: 7000 },
    videos: { text: "Moments de gameplay épiques. Regarde et apprends ! 🎬", duration: 7000 },
    'social-proof': { text: "Les chiffres ne mentent pas. On explose ! 📈", duration: 7000 },
    memes: { text: "Crée du contenu de légende ! 🎨 (Bientôt disponible)", duration: 7000 },
    footer: { text: "Tous les docs légaux et infos de contact, c'est ici. ⚖️", duration: 7000 },
  },
  es: {
    spawn: { text: "Objetivo bloqueado. Bienvenido a $ONETAP.", duration: 3000 },
    hero: { text: "Bienvenido, OneTapper. Déjame mostrarte lo que estamos construyendo. 🎯", duration: 7000 },
    about: { text: "$ONETAP no es solo un meme — es precisión y propósito. 📖", duration: 7000 },
    tokenomics: { text: "Equilibrado. Transparente. Bloqueado donde realmente importa. 💎", duration: 7000 },
    'why-onetap': { text: "¿Quieres saber por qué $ONETAP? Te lo explico todo. 🎯", duration: 7000 },
    swap: { text: "¿Listo para intercambiar? Un tap y estás dentro. 💱", duration: 7000 },
    'live-stats': { text: "Observa los datos fluir en tiempo real. 📊", duration: 7000 },
    roadmap: { text: "Fase 2 cargando... precisión en camino. 🗺️", duration: 7000 },
    'tap-to-earn': { text: "¡Demuéstrame tu precisión al tap! ⚡ (Próximamente)", duration: 7000 },
    rewards: { text: "¡Cada rango desbloquea recompensas legendarias! 🏆 (En desarrollo)", duration: 7000 },
    airdrops: { text: "¿Tokens gratis? Cuenta conmigo. ¡Mira el calendario! 🎁", duration: 7000 },
    community: { text: "Únete al escuadrón. Conviértete en un OneTapper. 🎮", duration: 7000 },
    media: { text: "Ve lo que el mundo dice de nosotros. 📰", duration: 7000 },
    videos: { text: "Momentos épicos de juego. ¡Mira y aprende! 🎬", duration: 7000 },
    'social-proof': { text: "Los números no mienten. ¡Estamos creciendo rápido! 📈", duration: 7000 },
    memes: { text: "¡Crea contenido legendario! 🎨 (Próximamente)", duration: 7000 },
    footer: { text: "Todos los documentos legales e info de contacto aquí. ⚖️", duration: 7000 },
  },
  ru: {
    spawn: { text: "Цель заблокирована. Добро пожаловать в $ONETAP.", duration: 3000 },
    hero: { text: "Добро пожаловать, OneTapper. Позволь показать, что мы создаём. 🎯", duration: 7000 },
    about: { text: "$ONETAP — это не просто мем, это точность и цель. 📖", duration: 7000 },
    tokenomics: { text: "Сбалансированный. Прозрачный. Заблокирован там, где это важно. 💎", duration: 7000 },
    'why-onetap': { text: "Хочешь узнать, почему $ONETAP? Я расскажу всё. 🎯", duration: 7000 },
    swap: { text: "Готов к обмену? Один тап и ты в деле. 💱", duration: 7000 },
    'live-stats': { text: "Наблюдай за данными в реальном времени. 📊", duration: 7000 },
    roadmap: { text: "Фаза 2 загружается... точность на подходе. 🗺️", duration: 7000 },
    'tap-to-earn': { text: "Покажи свою точность в таппинге! ⚡ (Скоро)", duration: 7000 },
    rewards: { text: "Каждый ранг открывает легендарные награды! 🏆 (В разработке)", duration: 7000 },
    airdrops: { text: "Бесплатные токены? Я в деле. Смотри календарь! 🎁", duration: 7000 },
    community: { text: "Присоединяйся к команде. Стань настоящим OneTapper'ом. 🎮", duration: 7000 },
    media: { text: "Смотри, что мир говорит о нас. 📰", duration: 7000 },
    videos: { text: "Эпичные игровые моменты. Смотри и учись! 🎬", duration: 7000 },
    'social-proof': { text: "Цифры не врут. Мы быстро растём! 📈", duration: 7000 },
    memes: { text: "Создавай легендарный контент! 🎨 (Скоро)", duration: 7000 },
    footer: { text: "Вся юридическая информация и контакты прямо здесь. ⚖️", duration: 7000 },
  },
  zh: {
    spawn: { text: "目标锁定。欢迎来到 $ONETAP。", duration: 3000 },
    hero: { text: "欢迎，OneTapper。让我展示我们正在构建的内容。🎯", duration: 7000 },
    about: { text: "$ONETAP 不仅仅是模因币——它是精准与目标的象征。📖", duration: 7000 },
    tokenomics: { text: "平衡。透明。在关键之处锁定。💎", duration: 7000 },
    'why-onetap': { text: "想知道为什么选择 $ONETAP？我来告诉你。🎯", duration: 7000 },
    swap: { text: "准备好交换了吗？一键搞定。💱", duration: 7000 },
    'live-stats': { text: "实时观察数据流动。📊", duration: 7000 },
    roadmap: { text: "第二阶段加载中...精准即将到来。🗺️", duration: 7000 },
    'tap-to-earn': { text: "展示你的点击精准度！⚡（即将推出）", duration: 7000 },
    rewards: { text: "每个等级都会解锁传奇奖励！🏆（开发中）", duration: 7000 },
    airdrops: { text: "免费代币？算我一个。查看日历！🎁", duration: 7000 },
    community: { text: "加入小队。成为真正的 OneTapper。🎮", duration: 7000 },
    media: { text: "看看世界如何评价我们。📰", duration: 7000 },
    videos: { text: "史诗般的游戏时刻。观看并学习！🎬", duration: 7000 },
    'social-proof': { text: "数据不会说谎。我们增长迅速！📈", duration: 7000 },
    memes: { text: "创造传奇内容！🎨（即将推出）", duration: 7000 },
    footer: { text: "所有法律文件和联系信息都在这里。⚖️", duration: 7000 },
  },
};

export const getBenDialogue = (language: string, section: string): BenDialogue => {
  const langDialogues = benDialogues[language] || benDialogues.en;
  return langDialogues[section] || langDialogues.hero;
};
