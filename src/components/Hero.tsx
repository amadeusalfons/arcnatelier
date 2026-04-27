import heroBg from "@/assets/hero-bg.webp";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="ARCN luxury perfume bottle on burgundy velvet with golden light"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 gradient-hero opacity-70" />
        <div className="absolute inset-0 bg-primary/40" />
      </div>

      {/* Shimmer overlay */}
      <div className="absolute inset-0 shimmer pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-accent font-body text-sm md:text-base tracking-[0.4em] uppercase mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          Introducing ARCN
        </p>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          Your Scent,
          <br />
          <span className="italic text-accent">Your Story</span>
        </h1>
        <p className="text-primary-foreground/80 font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          Capturing the memoir of your love story in a bottle. Every scent maps to a chapter of your heart.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <a
            href="#catalogue"
            className="inline-block px-8 py-4 gradient-gold text-accent-foreground font-semibold tracking-wider uppercase text-sm rounded-sm hover:opacity-90 transition-opacity duration-300"
          >
            Explore Collection
          </a>
          <a
            href="#scent-finder"
            className="inline-block px-8 py-4 border border-accent/60 text-accent font-semibold tracking-wider uppercase text-sm rounded-sm hover:bg-accent/10 transition-colors duration-300"
          >
            Find Your Scent
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-accent rounded-full mt-2 animate-fade-in" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
