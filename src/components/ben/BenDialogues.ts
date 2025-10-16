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
    hero: { text: "Ready to tap your way to glory? 🎯", duration: 4000 },
    about: { text: "This is where the story begins... 📖", duration: 4000 },
    tokenomics: { text: "Let's break down the numbers, Onetapper. 💎", duration: 4000 },
    liveStats: { text: "Updating... the market never sleeps. 📊", duration: 4000 },
    roadmap: { text: "The journey ahead is legendary! 🗺️", duration: 4000 },
    rewards: { text: "Every tap brings you closer to drops! 🎁", duration: 4000 },
    community: { text: "Join the squad. Every drop counts. 🎮", duration: 4000 },
    memes: { text: "Time to create some legendary memes! 🎨", duration: 4000 },
    tapToEarn: { text: "Show me your tapping skills! ⚡", duration: 4000 },
    footer: { text: "Mission complete. Ready for the next round. ✅", duration: 4000 },
  },
  fr: {
    spawn: { text: "Cible verrouillée. Bienvenue sur $ONETAP.", duration: 3000 },
    hero: { text: "Prêt à taper vers la gloire ? 🎯", duration: 4000 },
    about: { text: "C'est ici que l'histoire commence... 📖", duration: 4000 },
    tokenomics: { text: "Décortiquons les chiffres, Onetapper. 💎", duration: 4000 },
    liveStats: { text: "Mise à jour... le marché ne dort jamais. 📊", duration: 4000 },
    roadmap: { text: "Le voyage à venir est légendaire ! 🗺️", duration: 4000 },
    rewards: { text: "Chaque tap vous rapproche des drops ! 🎁", duration: 4000 },
    community: { text: "Rejoignez l'équipe. Chaque drop compte. 🎮", duration: 4000 },
    memes: { text: "C'est l'heure de créer des memes légendaires ! 🎨", duration: 4000 },
    tapToEarn: { text: "Montrez-moi vos compétences de tap ! ⚡", duration: 4000 },
    footer: { text: "Mission accomplie. Prêt pour le prochain round. ✅", duration: 4000 },
  },
  es: {
    spawn: { text: "Objetivo bloqueado. Bienvenido a $ONETAP.", duration: 3000 },
    hero: { text: "¿Listo para tapear hacia la gloria? 🎯", duration: 4000 },
    about: { text: "Aquí es donde comienza la historia... 📖", duration: 4000 },
    tokenomics: { text: "Desglosemos los números, Onetapper. 💎", duration: 4000 },
    liveStats: { text: "Actualizando... el mercado nunca duerme. 📊", duration: 4000 },
    roadmap: { text: "¡El viaje por delante es legendario! 🗺️", duration: 4000 },
    rewards: { text: "¡Cada tap te acerca a los drops! 🎁", duration: 4000 },
    community: { text: "Únete al escuadrón. Cada drop cuenta. 🎮", duration: 4000 },
    memes: { text: "¡Hora de crear memes legendarios! 🎨", duration: 4000 },
    tapToEarn: { text: "¡Muéstrame tus habilidades de tap! ⚡", duration: 4000 },
    footer: { text: "Misión completa. Listo para la próxima ronda. ✅", duration: 4000 },
  },
  ru: {
    spawn: { text: "Цель заблокирована. Добро пожаловать в $ONETAP.", duration: 3000 },
    hero: { text: "Готовы тапать к славе? 🎯", duration: 4000 },
    about: { text: "Здесь начинается история... 📖", duration: 4000 },
    tokenomics: { text: "Давайте разберем цифры, Onetapper. 💎", duration: 4000 },
    liveStats: { text: "Обновление... рынок никогда не спит. 📊", duration: 4000 },
    roadmap: { text: "Впереди легендарный путь! 🗺️", duration: 4000 },
    rewards: { text: "Каждый тап приближает вас к дропам! 🎁", duration: 4000 },
    community: { text: "Присоединяйтесь к команде. Каждый дроп важен. 🎮", duration: 4000 },
    memes: { text: "Время создавать легендарные мемы! 🎨", duration: 4000 },
    tapToEarn: { text: "Покажи свои навыки тапа! ⚡", duration: 4000 },
    footer: { text: "Миссия завершена. Готов к следующему раунду. ✅", duration: 4000 },
  },
  zh: {
    spawn: { text: "目标锁定。欢迎来到 $ONETAP。", duration: 3000 },
    hero: { text: "准备好点击通往荣耀之路了吗？🎯", duration: 4000 },
    about: { text: "故事从这里开始... 📖", duration: 4000 },
    tokenomics: { text: "让我们分析一下数字，Onetapper。💎", duration: 4000 },
    liveStats: { text: "更新中... 市场永不眠。📊", duration: 4000 },
    roadmap: { text: "前方的旅程是传奇！🗺️", duration: 4000 },
    rewards: { text: "每次点击都让你更接近空投！🎁", duration: 4000 },
    community: { text: "加入小队。每个空投都很重要。🎮", duration: 4000 },
    memes: { text: "是时候创造传奇表情包了！🎨", duration: 4000 },
    tapToEarn: { text: "展示你的点击技能！⚡", duration: 4000 },
    footer: { text: "任务完成。准备下一轮。✅", duration: 4000 },
  },
};

export const getBenDialogue = (language: string, section: string): BenDialogue => {
  const langDialogues = benDialogues[language] || benDialogues.en;
  return langDialogues[section] || langDialogues.hero;
};
