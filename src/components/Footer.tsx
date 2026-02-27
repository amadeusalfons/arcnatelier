const Footer = () => {
  return (
    <footer className="bg-primary py-16">
      <div className="container mx-auto px-6">
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
                { label: "Scent Finder", href: "#scent-finder" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-accent font-body text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-heading text-lg font-semibold text-primary-foreground mb-4">
              Connect
            </h5>
            <p className="text-primary-foreground/60 font-body text-sm mb-2">
              hello@arcn.co
            </p>
            <p className="text-primary-foreground/60 font-body text-sm">
              Follow us on Instagram @arcn.scent
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-primary-foreground/40 font-body text-xs tracking-wider">
            © {new Date().getFullYear()} ARCN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
