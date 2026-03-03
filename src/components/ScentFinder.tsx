import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

type QuizStep = "q1" | "q2" | "lead" | "result";

interface QuizState {
  lovePhase: string;
  vibe: string;
  name: string;
  email: string;
}

const lovePhaseOptions = [
  { label: "Just sparked ✧", value: "spark" },
  { label: "Blooming ❀", value: "bloom" },
  { label: "Intensely passionate ♦", value: "passion" },
  { label: "Going through trials ◈", value: "trials" },
  { label: "Reminiscing ∞", value: "memory" },
];

const vibeOptions = [
  { label: "Fresh & Energizing", value: "fresh" },
  { label: "Sweet & Powdery", value: "sweet" },
  { label: "Warm & Sensual", value: "warm" },
  { label: "Mysterious", value: "mysterious" },
  { label: "Nostalgic", value: "nostalgic" },
];

const recommendations: Record<string, { name: string; tagline: string; description: string }> = {
  spark: { name: "IGNITE", tagline: "For The Spark", description: "A burst of citrus and white florals that captures the electricity of a first encounter. Fresh, daring, unforgettable." },
  bloom: { name: "BLOOM", tagline: "For The Bloom", description: "Lush peony and rose absolute wrapped in soft musk. The scent of feelings blossoming into something beautiful." },
  passion: { name: "FLARE", tagline: "For The Passion", description: "Deep oud and warm amber ignite with spicy saffron. Bold, intoxicating, and unapologetically intense." },
  trials: { name: "RESILIENCE", tagline: "For The Trials", description: "Smoky vetiver and cedarwood grounded by soft leather. Complex, layered, and profoundly strong." },
  memory: { name: "ECHO", tagline: "For The Memory", description: "Warm vanilla, sandalwood, and a whisper of dried rose. The fragrance of moments you never want to forget." },
};

const ScentFinder = () => {
  const [step, setStep] = useState<QuizStep>("q1");
  const [quiz, setQuiz] = useState<QuizState>({ lovePhase: "", vibe: "", name: "", email: "" });
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const goNext = (nextStep: QuizStep) => {
    setDirection("right");
    setStep(nextStep);
  };

  const goBack = (prevStep: QuizStep) => {
    setDirection("left");
    setStep(prevStep);
  };

  const leadSchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
    email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  });

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = leadSchema.safeParse({ name: quiz.name, email: quiz.email });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message || "Please check your input.");
      return;
    }

    const scentResult = (recommendations[quiz.lovePhase] || recommendations.spark).name;
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("quiz_leads").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        scent_result: scentResult,
      });

      if (error) throw error;

      toast.success("Your scent match is ready! ✨");
      goNext("result");
    } catch (err: unknown) {
      console.error("Lead insert error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const result = recommendations[quiz.lovePhase] || recommendations.spark;

  const animClass = direction === "right" ? "animate-slide-right" : "animate-slide-left";

  return (
    <section id="scent-finder" className="py-24 md:py-32 gradient-burgundy relative overflow-hidden">
      <div className="absolute inset-0 shimmer pointer-events-none opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4">
            Interactive Experience
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            The Scent <span className="italic text-accent">Finder</span>
          </h2>
          <p className="text-primary-foreground/70 font-body text-lg max-w-xl mx-auto">
            Answer two quick questions and discover the ARCN fragrance written for your chapter.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {["q1", "q2", "lead", "result"].map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  ["q1", "q2", "lead", "result"].indexOf(step) >= i
                    ? "w-12 bg-accent"
                    : "w-8 bg-primary-foreground/20"
                }`}
              />
            ))}
          </div>

          {/* Q1 */}
          {step === "q1" && (
            <div key="q1" className={animClass}>
              <h3 className="font-heading text-2xl md:text-3xl text-primary-foreground text-center mb-8">
                What does your heart feel like right now?
              </h3>
              <div className="space-y-3">
                {lovePhaseOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setQuiz({ ...quiz, lovePhase: opt.value });
                      goNext("q2");
                    }}
                    className={`w-full py-4 px-6 border rounded-sm text-left font-body transition-all duration-300 ${
                      quiz.lovePhase === opt.value
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-primary-foreground/20 text-primary-foreground/80 hover:border-accent/50 hover:bg-accent/5"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Q2 */}
          {step === "q2" && (
            <div key="q2" className={animClass}>
              <h3 className="font-heading text-2xl md:text-3xl text-primary-foreground text-center mb-8">
                Pick a vibe that suits your current story.
              </h3>
              <div className="space-y-3">
                {vibeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setQuiz({ ...quiz, vibe: opt.value });
                      goNext("lead");
                    }}
                    className="w-full py-4 px-6 border border-primary-foreground/20 rounded-sm text-left font-body text-primary-foreground/80 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => goBack("q1")}
                className="mt-6 text-primary-foreground/50 hover:text-accent text-sm font-body transition-colors"
              >
                ← Back
              </button>
            </div>
          )}

          {/* Lead Capture */}
          {step === "lead" && (
            <div key="lead" className={animClass}>
              <h3 className="font-heading text-2xl md:text-3xl text-primary-foreground text-center mb-3">
                Almost there!
              </h3>
              <p className="text-primary-foreground/60 font-body text-center mb-8">
                Enter your name and email to reveal your perfect scent match.
              </p>
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={quiz.name}
                  onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
                  className="w-full px-4 py-3.5 bg-primary-foreground/5 border border-primary-foreground/20 rounded-sm text-primary-foreground font-body text-sm placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent transition-colors"
                  maxLength={100}
                  required
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={quiz.email}
                  onChange={(e) => setQuiz({ ...quiz, email: e.target.value })}
                  className="w-full px-4 py-3.5 bg-primary-foreground/5 border border-primary-foreground/20 rounded-sm text-primary-foreground font-body text-sm placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent transition-colors"
                  maxLength={255}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 gradient-gold text-accent-foreground font-semibold tracking-wider uppercase text-sm rounded-sm hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Revealing…" : "Reveal My Scent"}
                </button>
              </form>
              <button
                onClick={() => goBack("q2")}
                className="mt-4 text-primary-foreground/50 hover:text-accent text-sm font-body transition-colors"
              >
                ← Back
              </button>
            </div>
          )}

          {/* Result */}
          {step === "result" && (
            <div key="result" className="text-center animate-scale-up">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full gradient-gold flex items-center justify-center">
                <span className="text-accent-foreground text-4xl font-heading font-bold">
                  {result.name[0]}
                </span>
              </div>
              <p className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-2">
                {result.tagline}
              </p>
              <h3 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                {result.name}
              </h3>
              <p className="text-primary-foreground/70 font-body text-lg leading-relaxed max-w-md mx-auto mb-8">
                {result.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3.5 gradient-gold text-accent-foreground font-semibold tracking-wider uppercase text-sm rounded-sm hover:opacity-90 transition-opacity">
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    setStep("q1");
                    setQuiz({ lovePhase: "", vibe: "", name: "", email: "" });
                  }}
                  className="px-8 py-3.5 border border-accent/60 text-accent font-semibold tracking-wider uppercase text-sm rounded-sm hover:bg-accent/10 transition-colors"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScentFinder;
