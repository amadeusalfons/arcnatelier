import { useEffect, useRef, useState } from "react";
import productEdp from "@/assets/product-edp.jpg";
import productDiffuser from "@/assets/product-diffuser.jpg";
import productKit from "@/assets/product-kit.jpg";

const products = [
  {
    name: "Eau de Parfum",
    tagline: "The Signature",
    description: "A full-bodied fragrance that tells your complete love story. Bold, lasting, and unmistakably yours.",
    notes: "Top: Bergamot, Pink Pepper · Heart: Rose, Oud · Base: Amber, Vanilla",
    image: productEdp,
    price: "IDR 299K",
  },
  {
    name: "Room Diffuser",
    tagline: "The Atmosphere",
    description: "Transform your space into a chapter of your story. Subtle, continuous, and enveloping.",
    notes: "Sandalwood, White Musk, Cedarwood, Warm Amber",
    image: productDiffuser,
    price: "IDR 199K",
  },
  {
    name: "Discovery Kit",
    tagline: "The Journey Begins",
    description: "Five miniature bottles, each representing a Love Phase. The perfect introduction to ARCN.",
    notes: "All 5 Love Phase scents · 5 x 5ml travel vials",
    image: productKit,
    price: "IDR 249K",
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
    ref.current?.querySelectorAll("[data-idx]").forEach((el) => observer.observe(el));
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

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {products.map((product, i) => (
            <div
              key={product.name}
              data-idx={i}
              className={`group transition-all duration-700 ${
                visible.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className="relative overflow-hidden rounded-sm mb-6">
                <img
                  src={product.image}
                  alt={`ARCN ${product.name} - ${product.tagline}`}
                  className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
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
              <p className="text-accent/80 font-body text-xs tracking-wide mb-4 italic">
                {product.notes}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-accent font-heading text-xl font-semibold">
                  {product.price}
                </span>
                <button className="px-6 py-2.5 gradient-gold text-accent-foreground text-xs font-semibold tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalogue;
