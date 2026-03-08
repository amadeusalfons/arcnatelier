import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const faqs = [
  {
    q: "How long does the fragrance last?",
    a: "Our Eau de Parfum formulations are designed to last 6–8 hours on skin. For extended longevity, apply to pulse points and moisturised skin.",
  },
  {
    q: "What are the bottle sizes available?",
    a: "Ignite and Aura come in 50 ml full-size bottles. The Discovery Kit includes 2 × 10 ml travel vials — perfect for trying both scents.",
  },
  {
    q: "Are your perfumes unisex?",
    a: "Absolutely. Our fragrances are designed to be worn by anyone. Scent has no gender — only emotion.",
  },
  {
    q: "How do I order?",
    a: "Tap 'Buy Now' on any product to connect with us directly via WhatsApp. We'll guide you through ordering, payment, and delivery.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently we ship within Indonesia. International shipping is coming soon — follow us on Instagram @arcn.atelier for updates.",
  },
  {
    q: "What does 'Love Phases' mean?",
    a: "Love Phases is ARCN's core concept. Each phase of love — from first spark to lasting memory — inspires a unique fragrance collection. Phase 1: The Spark is our debut.",
  },
];

const FAQ = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="py-24 md:py-32 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4">
            Questions
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Frequently <span className="italic text-secondary">Asked</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-sm px-6 data-[state=open]:border-accent/30 transition-colors"
              >
                <AccordionTrigger className="font-heading text-base text-foreground hover:text-accent hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
