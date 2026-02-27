import { useEffect, useRef, useState } from "react";

const phases = [
  {
    phase: "Phase 1",
    name: "The Spark",
    icon: "✧",
    description: "That electric first encounter. Fresh, bright, and full of possibility.",
    color: "from-amber/20 to-transparent",
  },
  {
    phase: "Phase 2",
    name: "Bloom",
    icon: "❀",
    description: "When feelings blossom. Sweet, warm, and beautifully overwhelming.",
    color: "from-secondary/20 to-transparent",
  },
  {
    phase: "Phase 3",
    name: "Passion",
    icon: "♦",
    description: "Deep intensity. Bold, sensual, and unapologetically consuming.",
    color: "from-primary/20 to-transparent",
  },
  {
    phase: "Phase 4",
    name: "Trials",
    icon: "◈",
    description: "The test of time. Complex, layered, and profoundly resilient.",
    color: "from-muted-foreground/20 to-transparent",
  },
  {
    phase: "Phase 5",
    name: "Memory",
    icon: "∞",
    description: "What remains forever. Nostalgic, warm, and eternally comforting.",
    color: "from-accent/20 to-transparent",
  },
];

const LovePhases = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = sectionRef.current?.querySelectorAll("[data-index]");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="concept" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4">
            The Journey
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Love Phases <span className="italic text-secondary">Perfume Arc</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
            Every love story follows an arc. We captured each chapter in a scent—so you can wear your story.
          </p>
        </div>

        <div ref={sectionRef} className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            {phases.map((phase, i) => (
              <div
                key={phase.name}
                data-index={i}
                className={`relative text-center group transition-all duration-700 ${
                  visibleItems.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Circle */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-accent/40 flex items-center justify-center text-3xl group-hover:border-accent group-hover:bg-accent/10 transition-all duration-500">
                  {phase.icon}
                </div>

                <p className="text-accent font-body text-xs tracking-[0.3em] uppercase mb-1">
                  {phase.phase}
                </p>
                <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-3">
                  {phase.name}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-xs mx-auto">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LovePhases;
