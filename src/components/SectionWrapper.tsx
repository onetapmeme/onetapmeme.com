import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  variant?: 'primary' | 'accent' | 'neutral';
  className?: string;
}

const SectionWrapper = ({ children, variant = 'primary', className = '' }: SectionWrapperProps) => {
  const getTransitionColors = () => {
    switch (variant) {
      case 'primary':
        return {
          from: 'hsla(210, 100%, 55%, 0.08)',
          to: 'hsla(210, 100%, 65%, 0.04)',
          glow1: 'hsla(210, 100%, 55%, 0.12)',
          glow2: 'hsla(210, 100%, 60%, 0.06)',
          glow3: 'hsla(210, 90%, 50%, 0.08)'
        };
      case 'accent':
        return {
          from: 'hsla(25, 100%, 55%, 0.08)',
          to: 'hsla(25, 100%, 65%, 0.04)',
          glow1: 'hsla(25, 100%, 55%, 0.12)',
          glow2: 'hsla(25, 100%, 60%, 0.06)',
          glow3: 'hsla(25, 90%, 50%, 0.08)'
        };
      case 'neutral':
        return {
          from: 'hsla(220, 20%, 15%, 0.06)',
          to: 'hsla(220, 20%, 20%, 0.03)',
          glow1: 'hsla(220, 20%, 15%, 0.08)',
          glow2: 'hsla(220, 20%, 18%, 0.04)',
          glow3: 'hsla(220, 15%, 12%, 0.06)'
        };
    }
  };

  const colors = getTransitionColors();

  return (
    <div className={`relative ${className}`}>
      {/* Top transition overlay - incoming from previous section */}
      <div 
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ 
          height: '600px',
          background: `
            linear-gradient(
              180deg,
              ${colors.from} 0%,
              ${colors.to} 20%,
              transparent 100%
            )
          `,
          filter: 'blur(100px)',
          opacity: 0.7,
          animation: 'vertical-wave-down 20s ease-in-out infinite'
        }}
      />

      {/* Multi-layer flowing gradient mesh */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 140% 70% at 50% 0%, ${colors.glow1} 0%, transparent 50%),
            radial-gradient(ellipse 100% 50% at 20% 30%, ${colors.glow2} 0%, transparent 60%),
            radial-gradient(ellipse 100% 50% at 80% 40%, ${colors.glow2} 0%, transparent 60%),
            radial-gradient(ellipse 80% 40% at 40% 60%, ${colors.glow3} 0%, transparent 50%)
          `,
          filter: 'blur(120px)',
          opacity: 0.5,
          animation: 'gradient-mesh-flow 25s ease-in-out infinite'
        }}
      />

      {/* Secondary flowing layer - creates depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 120% 60% at 50% 30%, ${colors.glow1} 0%, transparent 70%),
            radial-gradient(ellipse 90% 45% at 30% 70%, ${colors.glow2} 0%, transparent 60%)
          `,
          filter: 'blur(180px)',
          opacity: 0.4,
          animation: 'gradient-mesh-reverse 30s ease-in-out infinite'
        }}
      />

      {/* Breathing glow effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 35% at 50% 15%, ${colors.glow1} 0%, transparent 80%)`,
          filter: 'blur(150px)',
          opacity: 0.6,
          animation: 'breathing-glow 18s ease-in-out infinite'
        }}
      />

      {/* Bottom transition overlay - outgoing to next section */}
      <div 
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ 
          height: '600px',
          background: `
            linear-gradient(
              0deg,
              ${colors.from} 0%,
              ${colors.to} 20%,
              transparent 100%
            )
          `,
          filter: 'blur(100px)',
          opacity: 0.7,
          animation: 'vertical-wave-up 22s ease-in-out infinite'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SectionWrapper;
