import { useEffect, useRef, useState } from "react";
import { Sparkles, Heart, Shield, Star } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Authentic & Affordable",
    description: "Premium-quality ingredients at prices that respect your wallet. No compromises.",
  },
  {
    icon: Star,
    title: "Accessible Premium",
    description: "Luxury fragrance experiences without the luxury price tag. Everyone deserves to smell incredible.",
  },
  {
    icon: Heart,
    title: "Meaningful Purchase",
    description: "More than a perfume—it's a chapter of your story. Every spray carries intention and emotion.",
  },
  {
    icon: Shield,
    title: "Confidence Booster",
    description: "The right scent transforms how you carry yourself. Walk into every room owning your narrative.",
  },
];

const WhyArcn = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4">
            Why Choose Us
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why <span className="italic text-secondary">ARCN</span>?
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {values.map((item, i) => (
            <div
              key={item.title}
              className={`text-center p-8 rounded-sm border border-border hover:border-accent/40 transition-all duration-700 group ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyArcn;
