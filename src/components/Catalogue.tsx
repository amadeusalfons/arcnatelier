import { useEffect, useRef, useState } from "react";
import productIgnite from "@/assets/product-ignite.webp";
import productAura from "@/assets/product-aura.webp";
import productDiscovery from "@/assets/product-discovery.webp";

const products = [
  {
    name: "Ignite — Eau de Parfum",
    tagline: "The Spark",
    description:
      "A bold opening of zesty pomegranate and bergamot that melts into a lush heart of lemon blossom, peony, and jasmine—grounded by warm musk, ambroxan, and creamy sandalwood.",
    notes:
      "Top: Pomegranate, Lemon, Bergamot · Heart: Lemon Blossom, Peony, Jasmine · Base: Musk, Ambroxan, Woodsy, Sandalwood",
    image: productIgnite,
  },
  {
    name: "Aura — Eau de Parfum",
    tagline: "The Presence",
    description:
      "A crisp apple opening unfolds into romantic rose, peony, and jasmine, settling into a rich, enveloping warmth of vanilla bean and amber.",
    notes: "Top: Apple · Heart: Rose, Peony, Jasmine · Base: Vanilla Bean, Amber",
    image: productAura,
  },
  {
    name: "Discovery Kit",
    tagline: "The Journey Begins",
    description:
      "Two mini bottles representing the current Love Phase — The Spark. The perfect introduction to ARCN.",
    notes: "Ignite & Aura · 2 × 5 ml travel vials",
    image: productDiscovery,
  },
];

const Catalogue = () => {
  const [visible, setVisible] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            setVisible((prev) => [...new Set([...prev, idx])]);
          }
        });
      },
      { threshold: 0.15 }
    );
    ref.current
      ?.querySelectorAll("[data-idx]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="catalogue" className="py-24 md:py-32 gradient-burgundy">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4">
            Collection
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Our <span className="italic text-accent">Catalogue</span>
          </h2>
          <p className="text-primary-foreground/70 font-body text-lg max-w-xl mx-auto">
            Crafted with intention. Designed for your story.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto"
        >
          {products.map((product, i) => (
            <div
              key={product.name}
              data-idx={i}
              className={`group flex flex-col transition-all duration-700 ${
                visible.includes(i)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className="relative overflow-hidden rounded-sm mb-6 shadow-lg shadow-black/20 group-hover:shadow-xl group-hover:shadow-black/30 transition-shadow duration-500">
                <img
                  src={product.image}
                  alt={`ARCN ${product.name} - ${product.tagline}`}
                  className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={800}
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500" />
                <span className="absolute top-4 left-4 text-accent font-body text-xs tracking-[0.2em] uppercase bg-primary/60 backdrop-blur-sm px-3 py-1 rounded-sm">
                  {product.tagline}
                </span>
              </div>

              <h3 className="font-heading text-2xl font-semibold text-primary-foreground mb-2">
                {product.name}
              </h3>
              <p className="text-primary-foreground/70 font-body text-sm leading-relaxed mb-3">
                {product.description}
              </p>
              <p className="text-accent/80 font-body text-xs tracking-wide italic">
                {product.notes}
              </p>
              <div className="mt-auto pt-6 flex items-center justify-end">
                <a
                  href="https://wa.me/6282136421628"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 gradient-gold text-accent-foreground text-xs font-semibold tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity"
                >
                  Buy Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalogue;
