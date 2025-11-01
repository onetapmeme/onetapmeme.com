import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Users, Shield, Code, Megaphone, Gamepad2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';

const Team = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: 'OneTap_OG',
      role: t('team.roles.founder') || 'Founder & Vision',
      icon: Shield,
      bio: t('team.bios.founder') || 'CS:GO veteran since 1.6. Built $ONETAP from a meme dream into reality. Previously led gaming communities with 50K+ members. Believes in community ownership and fair launches.',
      color: 'text-yellow-400'
    },
    {
      name: 'CodeWarrior',
      role: t('team.roles.devLead') || 'Lead Developer',
      icon: Code,
      bio: t('team.bios.devLead') || 'Full-stack wizard with 8 years in Web3. Smart contract security enthusiast. Built DeFi protocols handling $10M+ TVL. Makes magic happen with Solidity and React.',
      color: 'text-blue-400'
    },
    {
      name: 'TapMaster',
      role: t('team.roles.gameDev') || 'Game Developer',
      icon: Gamepad2,
      bio: t('team.bios.gameDev') || 'Unity & Web3 gaming specialist. Created the tap-to-earn mechanics and drop roulette system. Obsessed with player experience and on-chain gaming innovation.',
      color: 'text-green-400'
    },
    {
      name: 'MemeKing',
      role: t('team.roles.marketing') || 'Marketing & Memes',
      icon: Megaphone,
      bio: t('team.bios.marketing') || 'Viral content creator. Turned unknown tokens into trending topics. Social media strategist with proven track record. If it doesn\'t slap, it doesn\'t ship.',
      color: 'text-purple-400'
    },
    {
      name: 'CommunityCaptain',
      role: t('team.roles.community') || 'Community Manager',
      icon: Users,
      bio: t('team.bios.community') || 'The glue that holds us together. Manages Discord, Telegram, and all community channels. Online 24/7 (or so it seems). Your concerns are their priority.',
      color: 'text-pink-400'
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
                    <p className="text-sm text-muted-foreground">
                      {member.bio}
                    </p>
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
