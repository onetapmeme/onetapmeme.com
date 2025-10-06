interface SectionTransitionProps {
  variant?: 'primary' | 'accent' | 'subtle';
}

const SectionTransition = ({ variant = 'primary' }: SectionTransitionProps) => {
  const getColors = () => {
    switch (variant) {
      case 'primary':
        return {
          color1: 'hsla(210, 100%, 55%, 0.15)',
          color2: 'hsla(210, 100%, 65%, 0.08)',
          glow: 'hsla(210, 100%, 55%, 0.2)'
        };
      case 'accent':
        return {
          color1: 'hsla(25, 100%, 55%, 0.15)',
          color2: 'hsla(25, 100%, 65%, 0.08)',
          glow: 'hsla(25, 100%, 55%, 0.2)'
        };
      case 'subtle':
        return {
          color1: 'hsla(220, 30%, 20%, 0.1)',
          color2: 'hsla(220, 30%, 25%, 0.05)',
          glow: 'hsla(220, 30%, 20%, 0.15)'
        };
    }
  };

  const colors = getColors();

  return (
    <div className="relative h-64 overflow-hidden">
      {/* Smooth flowing gradient waves - Layer 1 */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 0%, ${colors.color1} 0%, transparent 50%),
            radial-gradient(ellipse 100% 60% at 20% 50%, ${colors.color2} 0%, transparent 50%),
            radial-gradient(ellipse 100% 60% at 80% 50%, ${colors.color2} 0%, transparent 50%)
          `,
          animation: 'flow-wave 8s ease-in-out infinite'
        }}
      />

      {/* Smooth flowing gradient waves - Layer 2 */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{
          background: `
            radial-gradient(ellipse 100% 70% at 50% 30%, ${colors.glow} 0%, transparent 60%),
            radial-gradient(ellipse 80% 50% at 30% 60%, ${colors.color2} 0%, transparent 50%)
          `,
          animation: 'flow-wave-reverse 10s ease-in-out infinite'
        }}
      />

      {/* Gentle pulsing glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 20%, ${colors.glow} 0%, transparent 70%)`,
          animation: 'gentle-pulse 6s ease-in-out infinite'
        }}
      />

      {/* Smooth top fade */}
      <div 
        className="absolute top-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(180deg, hsl(220, 25%, 6%) 0%, transparent 100%)'
        }}
      />

      {/* Smooth bottom fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, hsl(220, 25%, 6%) 100%)'
        }}
      />
    </div>
  );
};

export default SectionTransition;
