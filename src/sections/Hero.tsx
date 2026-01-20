import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { x: '100%', opacity: 0 },
        { 
          x: '0%', 
          opacity: 1, 
          duration: 1.2, 
          ease: 'expo.out',
          delay: 0.3
        }
      );

      gsap.fromTo(
        subtextRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.8 }
      );

      gsap.fromTo(
        taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 1 }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 1.2 }
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (textRef.current) {
            gsap.set(textRef.current, { 
              x: `${progress * 100}%`,
              opacity: 1 - progress * 0.8
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black-soft/30 to-black-soft pointer-events-none" />
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-red/5 blur-[150px] animate-pulse-glow" />
      </div>

      <div className="relative z-10 px-4 md:px-8 lg:px-16">
        <div className="overflow-hidden">
          <h1
            ref={textRef}
            className="font-display text-[18vw] md:text-[14vw] lg:text-[12vw] leading-[0.85] tracking-tighter text-white opacity-0"
          >
            ADARYUS
          </h1>
        </div>
        
        <div className="mt-8 max-w-2xl">
          <p
            ref={subtextRef}
            className="text-xl md:text-2xl text-gray-medium font-body leading-relaxed opacity-0"
          >
            AI-Augmented Strategist
          </p>
          <p
            ref={taglineRef}
            className="mt-4 text-lg text-red font-medium tracking-wide opacity-0"
          >
            Always Delivering AI Revolution, Yielding Unmatched Superiority
          </p>
        </div>

        <div ref={ctaRef} className="mt-12 flex flex-wrap gap-4 opacity-0">
          <button
            onClick={() => scrollToSection('#services')}
            className="group flex items-center gap-3 px-8 py-4 bg-red text-white font-medium hover:bg-red-light transition-all duration-300"
          >
            <Briefcase className="w-5 h-5" />
            <span>View Services</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection('#contact')}
            className="flex items-center gap-3 px-8 py-4 border-2 border-white/20 text-white font-medium hover:border-red hover:text-red transition-all duration-300"
          >
            <span>Get In Touch</span>
          </button>
        </div>

        <div className="mt-16 inline-flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-full">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-400 text-sm font-medium">Available for Work</span>
        </div>
      </div>

      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-red/30" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-red/30" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-red/30" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-red/30" />

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-red to-red animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
