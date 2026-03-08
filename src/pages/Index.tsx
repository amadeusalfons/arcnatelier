import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LovePhases from "@/components/LovePhases";
import Catalogue from "@/components/Catalogue";
import WhyArcn from "@/components/WhyArcn";
import Testimonials from "@/components/Testimonials";
import AboutSection from "@/components/AboutSection";
import ScentFinder from "@/components/ScentFinder";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <LovePhases />
      <Catalogue />
      <WhyArcn />
      <Testimonials />
      <AboutSection />
      <ScentFinder />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Index;
