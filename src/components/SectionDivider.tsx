const SectionDivider = () => {
  return (
    <div className="relative h-32 overflow-hidden">
      {/* Animated line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
      </div>
      
      {/* Pixel particles */}
      <div className="absolute inset-0 flex items-center justify-center gap-8">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-sm animate-pulse-glow"
            style={{
              animationDelay: `${i * 0.2}s`,
              opacity: 0.6 - i * 0.1,
            }}
          />
        ))}
      </div>
      
      {/* CS:GO style crosshair accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-8 h-8">
          {/* Horizontal line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/40"></div>
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/40"></div>
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full animate-pulse-glow"></div>
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;
