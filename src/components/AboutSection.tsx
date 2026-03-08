import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  subject: z.string().trim().max(200, "Subject is too long").optional().default(""),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message is too long"),
});

const AboutSection = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message || "Please check your input.");
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.from("contact_leads").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        subject: parsed.data.subject || null,
        message: parsed.data.message,
      });
      if (error) throw error;
      toast.success("Message sent! We'll be in touch soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      if (import.meta.env.DEV) console.error("Contact form error:", err);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Mission */}
          <div>
            <p className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4">
              About Us
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
              Our <span className="italic text-secondary">Mission</span>
            </h2>
            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8">
              We create high-quality, story-driven perfumes that journey with you through every moment of life and love, all while staying affordable and accessible.
            </p>
            <div className="border-l-2 border-accent/40 pl-6">
              <p className="text-foreground font-heading text-xl italic leading-relaxed">
                "Every fragrance is a love letter—written in notes of amber, rose, and memory."
              </p>
            </div>

            <div className="mt-12">
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                Collaborate With Us
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Are you a KOL, content creator, or affiliate? We'd love to partner with you. 
                Reach out through the form and let's create something beautiful together.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-8">
              Get in Touch
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5 font-body">Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors"
                  maxLength={100}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5 font-body">Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors"
                  maxLength={255}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-1.5 font-body">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors"
                  maxLength={200}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5 font-body">Message *</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                  maxLength={1000}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 gradient-gold text-accent-foreground font-semibold tracking-wider uppercase text-sm rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
