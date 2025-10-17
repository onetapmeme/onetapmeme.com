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
    hero: { text: "Welcome, Onetapper. Let me show you what we're building. 🎯", duration: 7000 },
    about: { text: "$ONETAP isn't just a meme — it's precision and purpose. 📖", duration: 7000 },
    tokenomics: { text: "Balanced. Transparent. Locked where it matters. 💎", duration: 7000 },
    'live-stats': { text: "Watch the data flow in real-time. 📊", duration: 7000 },
    roadmap: { text: "Phase 2 loading... precision incoming. 🗺️", duration: 7000 },
    community: { text: "Join the squad. Become an Onetapper. 🎮", duration: 7000 },
    'tap-to-earn': { text: "Show me your tapping precision! ⚡ (Coming soon)", duration: 7000 },
    rewards: { text: "Every rank brings legendary rewards! 🏆 (In development)", duration: 7000 },
    memes: { text: "Create legendary content! 🎨 (Coming soon)", duration: 7000 },
    footer: { text: "All legal docs & contact info are here. Stay protected! ⚖️", duration: 7000 },
  },
  fr: {
    spawn: { text: "Cible verrouillée. Bienvenue sur $ONETAP.", duration: 3000 },
    hero: { text: "Bienvenue, Onetapper. Laissez-moi vous montrer ce que nous construisons. 🎯", duration: 7000 },
    about: { text: "$ONETAP n'est pas qu'un meme — c'est précision et objectif. 📖", duration: 7000 },
    tokenomics: { text: "Équilibré. Transparent. Verrouillé là où ça compte. 💎", duration: 7000 },
    'live-stats': { text: "Regardez les données affluer en temps réel. 📊", duration: 7000 },
    roadmap: { text: "Phase 2 en chargement... précision en approche. 🗺️", duration: 7000 },
    community: { text: "Rejoignez l'équipe. Devenez Onetapper. 🎮", duration: 7000 },
    'tap-to-earn': { text: "Montrez-moi votre précision de tap ! ⚡ (Bientôt)", duration: 7000 },
    rewards: { text: "Chaque rang apporte des récompenses légendaires ! 🏆 (En développement)", duration: 7000 },
    memes: { text: "Créez du contenu légendaire ! 🎨 (Bientôt)", duration: 7000 },
    footer: { text: "Tous les documents légaux et contacts sont ici. Restez protégé ! ⚖️", duration: 7000 },
  },
  es: {
    spawn: { text: "Objetivo bloqueado. Bienvenido a $ONETAP.", duration: 3000 },
    hero: { text: "Bienvenido, Onetapper. Déjame mostrarte lo que estamos construyendo. 🎯", duration: 7000 },
    about: { text: "$ONETAP no es solo un meme — es precisión y propósito. 📖", duration: 7000 },
    tokenomics: { text: "Equilibrado. Transparente. Bloqueado donde importa. 💎", duration: 7000 },
    'live-stats': { text: "Mira los datos fluir en tiempo real. 📊", duration: 7000 },
    roadmap: { text: "Fase 2 cargando... precisión entrante. 🗺️", duration: 7000 },
    community: { text: "Únete al escuadrón. Conviértete en Onetapper. 🎮", duration: 7000 },
    'tap-to-earn': { text: "¡Muéstrame tu precisión de tap! ⚡ (Próximamente)", duration: 7000 },
    rewards: { text: "¡Cada rango trae recompensas legendarias! 🏆 (En desarrollo)", duration: 7000 },
    memes: { text: "¡Crea contenido legendario! 🎨 (Próximamente)", duration: 7000 },
    footer: { text: "Todos los documentos legales e información de contacto están aquí. ¡Mantente protegido! ⚖️", duration: 7000 },
  },
  ru: {
    spawn: { text: "Цель заблокирована. Добро пожаловать в $ONETAP.", duration: 3000 },
    hero: { text: "Добро пожаловать, Onetapper. Позвольте показать, что мы создаем. 🎯", duration: 7000 },
    about: { text: "$ONETAP — это не просто мем, это точность и цель. 📖", duration: 7000 },
    tokenomics: { text: "Сбалансированный. Прозрачный. Заблокирован там, где важно. 💎", duration: 7000 },
    'live-stats': { text: "Смотрите, как данные текут в реальном времени. 📊", duration: 7000 },
    roadmap: { text: "Фаза 2 загружается... точность на подходе. 🗺️", duration: 7000 },
    community: { text: "Присоединяйтесь к команде. Станьте Onetapper. 🎮", duration: 7000 },
    'tap-to-earn': { text: "Покажи свою точность тапа! ⚡ (Скоро)", duration: 7000 },
    rewards: { text: "Каждый ранг приносит легендарные награды! 🏆 (В разработке)", duration: 7000 },
    memes: { text: "Создавай легендарный контент! 🎨 (Скоро)", duration: 7000 },
    footer: { text: "Вся юридическая информация и контакты здесь. Будьте защищены! ⚖️", duration: 7000 },
  },
  zh: {
    spawn: { text: "目标锁定。欢迎来到 $ONETAP。", duration: 3000 },
    hero: { text: "欢迎，Onetapper。让我展示我们正在构建的内容。🎯", duration: 7000 },
    about: { text: "$ONETAP 不仅仅是一个表情包——它是精准和目标。📖", duration: 7000 },
    tokenomics: { text: "平衡。透明。在重要的地方锁定。💎", duration: 7000 },
    'live-stats': { text: "实时观看数据流动。📊", duration: 7000 },
    roadmap: { text: "第二阶段加载中...精准即将到来。🗺️", duration: 7000 },
    community: { text: "加入小队。成为 Onetapper。🎮", duration: 7000 },
    'tap-to-earn': { text: "展示你的点击精准度！⚡（即将推出）", duration: 7000 },
    rewards: { text: "每个等级都会带来传奇奖励！🏆（开发中）", duration: 7000 },
    memes: { text: "创造传奇内容！🎨（即将推出）", duration: 7000 },
    footer: { text: "所有法律文件和联系信息都在这里。保持保护！⚖️", duration: 7000 },
  },
};

export const getBenDialogue = (language: string, section: string): BenDialogue => {
  const langDialogues = benDialogues[language] || benDialogues.en;
  return langDialogues[section] || langDialogues.hero;
};
