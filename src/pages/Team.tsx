import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Users, Code, Megaphone, Twitter, Github, MessageCircle, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Team = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: 'Hugo',
      role: 'Founder & Visionary',
      icon: Users,
      bio: 'Project founder with a passion for bridging gaming culture and Web3. Leading $1TAP from vision to execution with strategic planning and community-first approach.',
      color: 'from-yellow-400 to-orange-400',
      socials: {
        twitter: 'https://twitter.com/1tap',
        discord: 'https://discord.gg/onetap'
      },
      expertise: [
        'Project Leadership',
        'Brand Strategy',
        'Community Architecture',
        'Vision & Roadmap'
      ]
    },
    {
      name: 'TapDev',
      role: 'Lead Developer',
      icon: Code,
      bio: 'Full-stack engineer with 8+ years in Web3. Smart contract security specialist who built DeFi protocols handling $10M+ TVL. Expert in Solidity, React, and Base network development.',
      color: 'from-blue-400 to-cyan-400',
      socials: {
        github: 'https://github.com/anonymous-dev',
        linkedin: 'https://linkedin.com/in/anonymous-dev'
      },
      expertise: [
        'Smart Contract Development',
        'DeFi Protocol Architecture',
        'Security Auditing',
        'Base Network Integration'
      ]
    },
    {
      name: 'GrowthMaster',
      role: 'Marketing Lead',
      icon: Megaphone,
      bio: 'Crypto marketing strategist with proven track record in viral campaigns. Specialized in community growth and brand positioning. Led multiple projects from 0 to 100K+ holders.',
      color: 'from-purple-400 to-pink-400',
      socials: {
        twitter: 'https://twitter.com/anonymous-growth',
        linkedin: 'https://linkedin.com/in/anonymous-marketing'
      },
      expertise: [
        'Viral Marketing Campaigns',
        'Community Growth Strategy',
        'Brand Positioning',
        'Partnership Development'
      ]
    },
    {
      name: 'CommunityGuardian',
      role: 'Community Manager',
      icon: Users,
      bio: 'Dedicated community builder with experience managing 50K+ member Discord and Telegram communities. Expert in conflict resolution, engagement strategies, and creating vibrant ecosystems.',
      color: 'from-green-400 to-emerald-400',
      socials: {
        discord: 'https://discord.gg/onetap',
        telegram: 'https://t.me/onetap'
      },
      expertise: [
        'Community Management',
        'Discord & Telegram Moderation',
        'Engagement Strategy',
        '24/7 Support Coordination'
      ]
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
              Meet the Core 1Tappers
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Anonymous warriors building the future of gaming memecoins. We use pseudonyms for privacy, but our work speaks louder than names.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden p-8 rounded-3xl border border-primary/30 backdrop-blur-xl bg-gradient-to-br from-background/80 via-background/60 to-background/40 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(22,163,224,0.3)] transition-all duration-500 h-full group">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${member.color}`}></div>
                  
                  <div className="relative flex flex-col items-center text-center">
                    {/* Icon with gradient background */}
                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${member.color} p-[2px] mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <div className="w-full h-full rounded-2xl bg-background/90 backdrop-blur-xl flex items-center justify-center">
                        <member.icon className={`w-12 h-12 bg-gradient-to-br ${member.color} bg-clip-text text-transparent`} />
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      {member.name}
                    </h3>
                    
                    {/* Role with gradient */}
                    <p className={`text-sm font-semibold mb-6 bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                      {member.role}
                    </p>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Expertise Tags */}
                    {member.expertise && (
                      <div className="mb-6 flex flex-wrap justify-center gap-2">
                        {member.expertise.map((skill: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-foreground/80 backdrop-blur-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Social Links */}
                    <div className="flex gap-3 pt-4 border-t border-primary/20 w-full justify-center">
                      {member.socials.github && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-10 w-10 p-0 rounded-full hover:bg-primary/10"
                        >
                          <a href={member.socials.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-5 h-5" />
                          </a>
                        </Button>
                      )}
                      {member.socials.linkedin && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-10 w-10 p-0 rounded-full hover:bg-primary/10"
                        >
                          <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        </Button>
                      )}
                      {member.socials.twitter && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-10 w-10 p-0 rounded-full hover:bg-primary/10"
                        >
                          <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="w-5 h-5" />
                          </a>
                        </Button>
                      )}
                      {member.socials.discord && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-10 w-10 p-0 rounded-full hover:bg-primary/10"
                        >
                          <a href={member.socials.discord} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="w-5 h-5" />
                          </a>
                        </Button>
                      )}
                      {member.socials.telegram && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-10 w-10 p-0 rounded-full hover:bg-primary/10"
                        >
                          <a href={member.socials.telegram} target="_blank" rel="noopener noreferrer">
                            <Send className="w-5 h-5" />
                          </a>
                        </Button>
                      )}
                    </div>
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
              Why We Use Pseudonyms
            </h2>
            <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground">
              <p>
                In Web3 culture, pseudonyms are standard practice for good reason. Many of the most successful crypto projects (Bitcoin, Shiba Inu, Yearn Finance) were built by anonymous teams. What matters is transparency through code and actions, not personal identities.
              </p>
              <p>
                <strong className="text-foreground">Security First:</strong> Doxxing in crypto can lead to targeted attacks, harassment, extortion attempts, and physical security risks for team members and their families. By using pseudonyms, we protect our team while maintaining full transparency in our work.
              </p>
              <p>
                <strong className="text-foreground">Focus on Work, Not Personalities:</strong> Pseudonymity allows us to be judged purely on merit—on the quality of our code, the strength of our partnerships, and the value we deliver to the community. No distractions, just results.
              </p>
              <p className="font-semibold text-foreground">
                <strong>Our Commitment:</strong> Fully audited smart contracts, locked liquidity, transparent on-chain operations, and open communication with the community. Judge us by our work, not our IDs. That&apos;s the Web3 way.
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
              Want to Join The Team?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We&apos;re always looking for talented contributors: developers, designers, marketers, and community moderators. If you&apos;re passionate about gaming and Web3, reach out on Discord to help build the future of $1TAP.
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
