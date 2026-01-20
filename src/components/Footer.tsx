import { Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';

const footerLinks = [
  { label: 'Works', href: '#works' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const projectLinks = [
  { label: 'Ultimate Gottiline', href: 'https://ultimategottiline.com' },
  { label: 'AdvertiseWV', href: 'https://advertisewv.com' },
  { label: 'Buckhannon.ai', href: 'https://buckhannon.ai' },
  { label: 'NCRJ Watch', href: 'https://ncrjwatch.org' },
  { label: 'Adaryus.com', href: 'https://adaryus.com' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
];

const Footer = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-black-charcoal border-t border-white/5">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" className="font-display text-4xl text-white hover:text-red transition-colors">
              SHOWCASE
            </a>
            <p className="mt-4 text-gray-dark max-w-md">
              A curated collection of digital experiences showcasing web development, AI integration, and creative problem-solving across diverse industries.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-medium hover:bg-red/10 hover:text-red transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h4 className="font-display text-lg text-white mb-4">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-dark hover:text-red transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects column */}
          <div>
            <h4 className="font-display text-lg text-white mb-4">Featured Projects</h4>
            <ul className="space-y-3">
              {projectLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-dark hover:text-red transition-colors group"
                  >
                    <span className="link-underline">{link.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-dark text-sm">
              © {new Date().getFullYear()} Work Showcase. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-dark text-sm hover:text-red transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-dark text-sm hover:text-red transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Large watermark logo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none overflow-hidden">
        <span className="font-display text-[20vw] text-white/[0.02] leading-none whitespace-nowrap select-none">
          SHOWCASE
        </span>
      </div>
    </footer>
  );
};

export default Footer;
