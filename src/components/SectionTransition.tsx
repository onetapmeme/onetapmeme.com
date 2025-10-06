interface SectionTransitionProps {
  variant?: 'primary' | 'accent' | 'subtle';
}

const SectionTransition = ({ variant = 'primary' }: SectionTransitionProps) => {
  const getGradient = () => {
    switch (variant) {
      case 'primary':
        return 'radial-gradient(ellipse at center, hsl(210, 100%, 55%) 0%, transparent 70%)';
      case 'accent':
        return 'radial-gradient(ellipse at center, hsl(25, 100%, 55%) 0%, transparent 70%)';
      case 'subtle':
        return 'radial-gradient(ellipse at center, hsl(220, 30%, 12%) 0%, transparent 70%)';
    }
  };

  return (
    <div className="relative h-48 overflow-hidden">
      {/* Main gradient glow */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ background: getGradient() }}
      />
      
      {/* Animated light beam */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              ${variant === 'accent' ? 'hsl(25, 100%, 55%)' : 'hsl(210, 100%, 55%)'} 50%, 
              transparent 100%)`
          }}
        />
        <div 
          className="absolute inset-0 opacity-50 animate-pulse"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              ${variant === 'accent' ? 'hsl(25, 100%, 55%)' : 'hsl(210, 100%, 55%)'} 50%, 
              transparent 100%)`,
            animationDuration: '3s'
          }}
        />
      </div>

      {/* Floating light orbs */}
      <div className="absolute inset-0 flex items-center justify-center gap-12">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full animate-pulse"
            style={{
              background: variant === 'accent' 
                ? `radial-gradient(circle, hsl(25, 100%, 55%) 0%, transparent 70%)`
                : `radial-gradient(circle, hsl(210, 100%, 55%) 0%, transparent 70%)`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '2s',
              opacity: 0.4 - i * 0.05,
              boxShadow: variant === 'accent'
                ? '0 0 30px hsl(25, 100%, 55%)'
                : '0 0 30px hsl(210, 100%, 55%)'
            }}
          />
        ))}
      </div>

      {/* Bottom gradient fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, hsl(220, 25%, 6%) 100%)'
        }}
      />
    </div>
  );
};

export default SectionTransition;
