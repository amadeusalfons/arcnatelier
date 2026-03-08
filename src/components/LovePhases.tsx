import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

const phases = [
  {
    phase: "Phase 1",
    name: "The Spark",
    icon: "✧",
    description:
      "That electric first encounter. Fresh, bright, and full of possibility.",
  },
  {
    phase: "Phase 2",
    name: "Bloom",
    icon: "❀",
    description:
      "When feelings blossom. Sweet, warm, and beautifully overwhelming.",
  },
  {
    phase: "Phase 3",
    name: "Passion",
    icon: "♦",
    description:
      "Deep intensity. Bold, sensual, and unapologetically consuming.",
  },
  {
    phase: "Phase 4",
    name: "Trials",
    icon: "◈",
    description:
      "The test of time. Complex, layered, and profoundly resilient.",
  },
  {
    phase: "Phase 5",
    name: "Memory",
    icon: "∞",
    description:
      "What remains forever. Nostalgic, warm, and eternally comforting.",
  },
];

const LovePhases = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
      skipSnaps: false,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="concept" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4">
            The Journey
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Love Phases{" "}
            <span className="italic text-secondary">Perfume Arc</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
            Every love story follows an arc. We captured each chapter in a
            scent—so you can wear your story.
          </p>
        </div>

        {/* Slider */}
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {phases.map((phase, i) => {
                const isComingSoon = i > 0;
                return (
                  <div
                    key={phase.name}
                    className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4"

                  >
                    <div
                      className={`text-center py-10 transition-all duration-500 ${
                        isComingSoon
                          ? "grayscale opacity-50"
                          : ""
                      }`}
                    >
                      {/* Circle */}
                      <div
                        className={`w-20 h-20 mx-auto mb-6 rounded-full border-2 flex items-center justify-center text-3xl transition-all duration-500 ${
                          !isComingSoon
                            ? "border-accent/40 hover:border-accent hover:bg-accent/10"
                            : "border-muted-foreground/30"
                        }`}
                      >
                        {phase.icon}
                      </div>

                      <p
                        className={`font-body text-xs tracking-[0.3em] uppercase mb-1 ${
                          !isComingSoon
                            ? "text-accent"
                            : "text-muted-foreground/50"
                        }`}
                      >
                        {phase.phase}
                      </p>
                      <h3
                        className={`font-heading text-xl md:text-2xl font-semibold mb-3 ${
                          !isComingSoon
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {phase.name}
                      </h3>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-xs mx-auto mb-3">
                        {phase.description}
                      </p>
                      {isComingSoon && (
                        <span className="inline-block text-accent/70 font-body text-xs tracking-[0.2em] uppercase border border-accent/30 px-3 py-1 rounded-sm">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground disabled:opacity-30 hover:bg-accent/10 transition-colors"
            aria-label="Previous phase"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground disabled:opacity-30 hover:bg-accent/10 transition-colors"
            aria-label="Next phase"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {phases.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  selectedIndex === i
                    ? "bg-accent w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to phase ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LovePhases;
