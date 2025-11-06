import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Users, Shield, Code, Megaphone, Gamepad2, Twitter, Github, MessageCircle, Instagram, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Team = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: 'OneTap_OG',
      role: t('team.roles.founder') || 'Founder & Vision',
      icon: Shield,
      bio: t('team.bios.founder') || 'FPS gaming veteran since early days. Built $ONETAP from a meme dream into reality. Previously led gaming communities with 50K+ members. Believes in community ownership and fair launches.',
      color: 'text-yellow-400',
      socials: {
        discord: 'OneTap_OG#1234',
        twitter: '@OneTap_OG',
        telegram: '@OneTapFounder'
      },
      verifications: [
        'Active since 2023',
        'Led 3 gaming communities (50K+ members)',
        'Verified on Discord'
      ],
      proofOfWork: 'https://github.com/onetap'
    },
    {
      name: 'CodeWarrior',
      role: t('team.roles.devLead') || 'Lead Developer',
      icon: Code,
      bio: t('team.bios.devLead') || 'Full-stack wizard with 8 years in Web3. Smart contract security enthusiast. Built DeFi protocols handling $10M+ TVL. Makes magic happen with Solidity and React.',
      color: 'text-blue-400',
      socials: {
        github: 'CodeWarrior',
        twitter: '@CodeWarrior_1TAP',
        discord: 'CodeWarrior#5678'
      },
      verifications: [
        '8+ years Web3 development',
        'Smart contract auditor certified',
        'Built $10M+ TVL protocols'
      ],
      proofOfWork: 'https://github.com/codewarrior'
    },
    {
      name: 'TapMaster',
      role: t('team.roles.gameDev') || 'Game Developer',
      icon: Gamepad2,
      bio: t('team.bios.gameDev') || 'Unity & Web3 gaming specialist. Created the tap-to-earn mechanics and drop roulette system. Obsessed with player experience and on-chain gaming innovation.',
      color: 'text-green-400',
      socials: {
        github: 'TapMaster',
        twitter: '@TapMaster_1TAP',
        discord: 'TapMaster#9012'
      },
      verifications: [
        'Unity certified developer',
        '5+ years game development',
        'Published 10+ Web3 games'
      ],
      proofOfWork: 'https://github.com/tapmaster'
    },
    {
      name: 'MemeKing',
      role: t('team.roles.marketing') || 'Marketing & Memes',
      icon: Megaphone,
      bio: t('team.bios.marketing') || 'Viral content creator. Turned unknown tokens into trending topics. Social media strategist with proven track record. If it doesn\'t slap, it doesn\'t ship.',
      color: 'text-purple-400',
      socials: {
        twitter: '@MemeKing_1TAP',
        instagram: '@memeking.1tap',
        tiktok: '@memeking1tap'
      },
      verifications: [
        '3 viral campaigns (10M+ views)',
        'Social media strategist',
        'Content creator since 2020'
      ],
      proofOfWork: 'https://twitter.com/MemeKing_1TAP'
    },
    {
      name: 'CommunityCaptain',
      role: t('team.roles.community') || 'Community Manager',
      icon: Users,
      bio: t('team.bios.community') || 'The glue that holds us together. Manages Discord, Telegram, and all community channels. Online 24/7 (or so it seems). Your concerns are their priority.',
      color: 'text-pink-400',
      socials: {
        discord: 'CommunityCaptain#3456',
        telegram: '@CommunityCaptain_1TAP',
        twitter: '@CommCaptain_1TAP'
      },
      verifications: [
        'Managed 5+ crypto communities',
        '20K+ Discord members',
        'Online support 24/7'
      ],
      proofOfWork: 'https://discord.gg/onetap'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Users className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('team.title') || 'Meet The Team'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('team.subtitle') || 'Anonymous warriors building the future of meme coins. We use pseudonyms for privacy, but our work speaks louder than names.'}
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-effect p-6 rounded-2xl border-primary/20 hover:border-primary/40 transition-all duration-300 h-full">
                  <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className={`w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 ${member.color}`}>
                      <member.icon className="w-10 h-10" />
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    
                    {/* Role */}
                    <p className={`text-sm font-semibold mb-4 ${member.color}`}>
                      {member.role}
                    </p>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground mb-4">
                      {member.bio}
                    </p>

                    {/* Verifications */}
                    {member.verifications && (
                      <div className="mb-4 space-y-2">
                        {member.verifications.map((verification: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span>{verification}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Social Links */}
                    {member.socials && (
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {member.socials.twitter && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-8 px-3"
                          >
                            <a href={`https://twitter.com/${member.socials.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                              <Twitter className="w-3 h-3 mr-1" />
                              Twitter
                            </a>
                          </Button>
                        )}
                        {member.socials.discord && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-3"
                          >
                            <MessageCircle className="w-3 h-3 mr-1" />
                            {member.socials.discord}
                          </Button>
                        )}
                        {member.socials.github && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-8 px-3"
                          >
                            <a href={`https://github.com/${member.socials.github}`} target="_blank" rel="noopener noreferrer">
                              <Github className="w-3 h-3 mr-1" />
                              GitHub
                            </a>
                          </Button>
                        )}
                        {member.socials.telegram && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-8 px-3"
                          >
                            <a href={`https://t.me/${member.socials.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                              <Send className="w-3 h-3 mr-1" />
                              Telegram
                            </a>
                          </Button>
                        )}
                        {member.socials.instagram && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-8 px-3"
                          >
                            <a href={`https://instagram.com/${member.socials.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                              <Instagram className="w-3 h-3 mr-1" />
                              Instagram
                            </a>
                          </Button>
                        )}
                        {member.socials.tiktok && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-8 px-3"
                          >
                            <a href={`https://tiktok.com/${member.socials.tiktok.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                              <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                              </svg>
                              TikTok
                            </a>
                          </Button>
                        )}
                      </div>
                    )}

                    {/* Proof of Work */}
                    {member.proofOfWork && (
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="h-7 text-xs"
                      >
                        <a href={member.proofOfWork} target="_blank" rel="noopener noreferrer">
                          View Contributions →
                        </a>
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Why Pseudonyms */}
          <motion.div
            className="glass-effect p-8 rounded-2xl border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              {t('team.whyPseudonyms.title') || 'Why Pseudonyms?'}
            </h2>
            <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground">
              <p>
                {t('team.whyPseudonyms.p1') || 'In crypto, privacy is a feature, not a bug. Many successful projects (Bitcoin, Shiba Inu, etc.) were built by anonymous teams. What matters is transparency through code and actions, not personal identities.'}
              </p>
              <p>
                {t('team.whyPseudonyms.p2') || 'We prioritize security for our team and their families. Doxxing in crypto can lead to targeted attacks, harassment, and security risks. Pseudonymity allows us to focus on building without personal concerns.'}
              </p>
              <p className="font-semibold text-foreground">
                {t('team.whyPseudonyms.p3') || 'Our commitment: Open-source code, audited contracts, locked liquidity, and transparent on-chain operations. Judge us by our work, not our IDs.'}
              </p>
            </div>
          </motion.div>

          {/* Join Us */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              {t('team.joinUs.title') || 'Want to Join The Team?'}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('team.joinUs.description') || 'We\'re always looking for talented contributors: developers, designers, marketers, and community moderators. Reach out on Discord if you want to help build the future of $ONETAP.'}
            </p>
            <a
              href="https://discord.gg/onetap"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Apply on Discord
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Team;
