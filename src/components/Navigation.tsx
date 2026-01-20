import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Works', href: '#works' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: 'body',
      start: '100px top',
      onEnter: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false)
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === document.body) st.kill();
      });
    };
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }, [isVisible]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 opacity-0 -translate-y-full"
      >
        <div className="glass border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            <div className="flex items-center justify-between h-20">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-display text-2xl text-white hover:text-red transition-colors"
              >
                ADARYUS
              </a>

              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-gray-medium hover:text-white transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="px-6 py-2 bg-red text-white text-sm font-medium hover:bg-red-light transition-colors"
                >
                  Let's Talk
                </a>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center text-white"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="absolute top-20 left-0 right-0 p-8">
          <div className="flex flex-col gap-6">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-display text-3xl text-white hover:text-red transition-colors"
                style={{ 
                  transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transition: `all 0.4s ease ${index * 0.1}s`
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="mt-4 px-8 py-4 bg-red text-white font-display text-xl text-center hover:bg-red-light transition-colors"
              style={{ 
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
                transition: `all 0.4s ease ${navLinks.length * 0.1}s`
              }}
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
