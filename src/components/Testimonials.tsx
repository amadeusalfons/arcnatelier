import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alya R.",
    quote: "Ignite is my signature scent now. Every time I wear it, someone asks what I'm wearing. It's bold but still elegant — exactly what I wanted.",
    rating: 5,
    product: "Ignite",
  },
  {
    name: "Dimas P.",
    quote: "Bought the Discovery Kit as a gift for my girlfriend. She fell in love with Aura instantly. The packaging alone feels so premium for the price.",
    rating: 5,
    product: "Discovery Kit",
  },
  {
    name: "Sari M.",
    quote: "I've tried expensive designer perfumes, but Aura genuinely competes with them. The vanilla-amber dry down lasts all day on my skin.",
    rating: 5,
    product: "Aura",
  },
];

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="py-24 md:py-32 bg-card">
      <div
        ref={ref}
        className={`container mx-auto px-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4">
            Testimonials
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            What They <span className="italic text-secondary">Say</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
            Real stories from people who wear their story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="p-8 rounded-sm border border-border hover:border-accent/30 transition-all duration-500 bg-background"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-accent text-accent"
                  />
                ))}
              </div>
              <p className="text-foreground font-body text-sm leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center justify-between">
                <span className="text-foreground font-heading text-sm font-semibold">
                  {t.name}
                </span>
                <span className="text-accent/70 font-body text-xs tracking-wider uppercase">
                  {t.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
