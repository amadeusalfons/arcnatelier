import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Footer = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  return (
    <footer className="bg-primary py-16">
      <div ref={ref} className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h4 className="font-heading text-2xl font-bold tracking-[0.3em] text-primary-foreground mb-4">
              ARCN
            </h4>
            <p className="text-primary-foreground/60 font-body text-sm leading-relaxed">
              Your Scent, Your Story. Capturing the memoir of your love story in a bottle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-heading text-lg font-semibold text-primary-foreground mb-4">
              Explore
            </h5>
            <ul className="space-y-2">
              {[
              { label: "Home", href: "#home" },
              { label: "Our Concept", href: "#concept" },
              { label: "Catalogue", href: "#catalogue" },
              { label: "About Us", href: "#about" },
              { label: "Scent Finder", href: "#scent-finder" }].
              map((link) =>
              <li key={link.href}>
                  <a
                  href={link.href}
                  className="text-primary-foreground/60 hover:text-accent font-body text-sm transition-colors">

                    {link.label}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-heading text-lg font-semibold text-primary-foreground mb-4">
              Connect
            </h5>
            <p className="text-primary-foreground/60 font-body text-sm mb-2">arcnatelier@gmail.com

            </p>
            <a href="https://www.instagram.com/arcn.atelier/" target="_blank" rel="noopener noreferrer" className="block text-primary-foreground/60 hover:text-accent font-body text-sm transition-colors mb-2">
              Follow us on Instagram @arcn.atelier
            </a>
            <a href="https://id.shp.ee/RMqPDnsL" target="_blank" rel="noopener noreferrer" className="block text-primary-foreground/60 hover:text-accent font-body text-sm transition-colors">
              Shop on Shopee
            </a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-primary-foreground/40 font-body text-xs tracking-wider">
            © {new Date().getFullYear()} ARCN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>);

};

export default Footer;