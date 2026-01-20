import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  url: string;
  owner?: string;
  education?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AdvertiseWV',
    category: 'AI Marketing & Automation',
    description: 'AI-powered marketing platform for West Virginia businesses. SEO, content creation, and marketing automation solutions with measurable ROI.',
    image: '/advertisewv_screenshot.png',
    url: 'https://advertisewv.com',
    owner: 'Adaryus R. Gillum'
  },
  {
    id: 2,
    title: 'Buckhannon.ai',
    category: 'AI & Machine Learning',
    description: 'AI solutions tailored for Buckhannon businesses. Boost ROI by 300%, cut operational costs by 40% with custom AI implementations.',
    image: '/buckhannon_ai_screenshot.png',
    url: 'https://www.buckhannon.ai',
    owner: 'Adaryus R. Gillum'
  },
  {
    id: 3,
    title: 'NCRJ Watch',
    category: 'Public Safety & Advocacy',
    description: 'North Central Regional Jail monitoring and accountability platform. Exposing overcrowding, tracking ICE detention contracts, and honoring those lost.',
    image: '/ncrjwatch_screenshot.png',
    url: 'https://ncrjwatch.org'
  },
  {
    id: 4,
    title: 'Ultimate Gottiline',
    category: 'American Bully Breeding',
    description: 'Elite Gottiline bloodlines based in Appalachian West Virginia. Led by owner Ryan Gillum, specializing in compact, exotic American Bullies with worldwide reach.',
    image: '/ultimategottiline.jpg',
    url: 'https://ultimategottiline.com/',
    owner: 'Ryan Gillum',
    education: 'West Virginia Wesleyan College'
  },
  {
    id: 5,
    title: 'Adaryus Portfolio',
    category: 'Professional Portfolio',
    description: 'Personal portfolio showcasing AI marketing expertise and professional experience. High retention strategies that deliver unmatched superiority.',
    image: '/adaryus.jpg',
    url: 'https://adaryus.com',
    owner: 'Adaryus R. Gillum'
  }
];

const Works = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
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

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { rotateX: 45, y: 100, opacity: 0, transformPerspective: 1000 },
          {
            rotateX: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.1
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  };

  const handleCardMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)'
    });
    setHoveredCard(null);
  };

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative py-32 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto mb-20">
        <h2
          ref={titleRef}
          className="font-display text-[10vw] md:text-[6vw] lg:text-[4vw] text-white leading-none tracking-tight opacity-0"
        >
          <span className="text-gradient text-shimmer">SELECTED</span>
          <br />
          <span className="text-white">WORKS</span>
        </h2>
        <p className="mt-6 text-gray-dark text-lg max-w-xl">
          A curated collection of digital experiences, from AI-powered platforms to specialized breeding programs.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={el => { cardsRef.current[index] = el; }}
            className="group relative cursor-pointer preserve-3d"
            onMouseMove={(e) => handleCardMouseMove(e, index)}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => handleCardMouseLeave(index)}
          >
            <div className="relative overflow-hidden rounded-lg bg-black-charcoal border border-white/5 transition-all duration-500 group-hover:border-red/30 group-hover:shadow-glow">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                <div className={`absolute inset-0 bg-red/10 transition-opacity duration-500 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`} />
              </div>

              <div className="relative p-6">
                <span className="text-xs text-red font-medium tracking-widest uppercase">
                  {project.category}
                </span>
                
                <h3 className="mt-2 font-display text-2xl text-white group-hover:text-red transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="mt-3 text-sm text-gray-dark line-clamp-3">
                  {project.description}
                </p>

                {(project.owner || project.education) && (
                  <div className="mt-4 pt-4 border-t border-white/5">
                    {project.owner && (
                      <p className="text-xs text-gray-medium">
                        <span className="text-white/50">Owner:</span> {project.owner}
                      </p>
                    )}
                    {project.education && (
                      <p className="text-xs text-gray-medium mt-1">
                        <span className="text-white/50">Education:</span> {project.education}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-red transition-colors duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Live</span>
                  </a>
                  <div className="w-8 h-8 rounded-full bg-red/10 flex items-center justify-center group-hover:bg-red/20 transition-colors duration-300">
                    <Github className="w-4 h-4 text-red" />
                  </div>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-red/50 to-transparent transform -translate-x-8 -translate-y-8 rotate-45 group-hover:h-12 transition-all duration-500" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-red/5 blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-red/3 blur-[150px] pointer-events-none" />
    </section>
  );
};

export default Works;
