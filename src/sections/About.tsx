import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const contentElements = contentRef.current?.querySelectorAll('.animate-item');
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2
            ref={titleRef}
            className="font-display text-[12vw] md:text-[8vw] lg:text-[6vw] text-white leading-none tracking-tight opacity-0"
          >
            <span className="text-white">ABOUT</span>
            <br />
            <span className="text-gradient text-shimmer">ADARYUS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div ref={contentRef} className="space-y-8">
            <p className="animate-item text-2xl md:text-3xl text-white font-light leading-relaxed">
              <span className="text-red font-medium">AI-Augmented Strategist</span> bridging human intuition with machine precision.
            </p>
            
            <p className="animate-item text-gray-dark text-lg leading-relaxed">
              M.S. AI Marketing candidate at West Virginia University specializing in data science, spatial computing, and strategic marketing. Combining cutting-edge artificial intelligence with proven marketing methodologies to deliver measurable results for businesses across West Virginia and beyond.
            </p>

            <p className="animate-item text-gray-dark text-lg leading-relaxed">
              Founded AdvertiseWV to help West Virginia businesses automate tasks, increase productivity, and boost online presence through cutting-edge SEO and AI solutions. Committed to making advanced technology accessible and effective for local businesses.
            </p>

            <div className="animate-item grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
              <div>
                <span className="block font-display text-4xl text-red">20+</span>
                <span className="text-gray-dark text-sm">Certifications</span>
              </div>
              <div>
                <span className="block font-display text-4xl text-red">5+</span>
                <span className="text-gray-dark text-sm">Years Experience</span>
              </div>
              <div>
                <span className="block font-display text-4xl text-red">50+</span>
                <span className="text-gray-dark text-sm">Projects Completed</span>
              </div>
              <div>
                <span className="block font-display text-4xl text-red">100%</span>
                <span className="text-gray-dark text-sm">Client Satisfaction</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-6 bg-black-charcoal rounded-lg border border-white/5">
              <h4 className="font-display text-xl text-white mb-4">Education</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-red font-medium">M.S. AI Marketing, West Virginia University</p>
                  <p className="text-gray-dark text-sm">Expected August 2026 • AI Consumer Behavior, CRM Systems</p>
                </div>
                <div>
                  <p className="text-red font-medium">B.S. Integrated Marketing Communications, WVU</p>
                  <p className="text-gray-dark text-sm">Awarded May 2025 • GPA: 3.17 • Advertising, Digital Media, Social Media Strategy</p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-white/70 text-sm">
                    <span className="text-white">Location:</span> Morgantown, West Virginia
                  </p>
                  <p className="text-white/70 text-sm mt-1">
                    <span className="text-white">Focus:</span> AI Marketing, Spatial Computing, VR/AR
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-red/5 blur-[200px] pointer-events-none" />
    </section>
  );
};

export default About;
