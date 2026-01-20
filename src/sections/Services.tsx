import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Brain, 
  Search, 
  PenTool, 
  Zap, 
  Globe, 
  BarChart3,
  MessageSquare,
  Palette,
  Code,
  Settings
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Brain,
    title: 'AI Marketing Strategy',
    description: 'Data-driven marketing strategies powered by artificial intelligence. Leverage machine learning for customer segmentation, predictive analytics, and automated campaign optimization.',
    features: ['Customer Behavior Analysis', 'Predictive Analytics', 'Automated Campaigns', 'ROI Optimization']
  },
  {
    icon: Search,
    title: 'SEO & Content Optimization',
    description: 'Advanced SEO strategies powered by AI analysis. Boost visibility with keyword optimization, competitor research, and AI-assisted content generation.',
    features: ['AI-Powered Keyword Research', 'Competitor Gap Analysis', 'Content Generation', 'Local SEO']
  },
  {
    icon: PenTool,
    title: 'Content Creation',
    description: 'Engage your audience with high-quality content created using AI tools and human expertise. Blog posts, social media, and video scripts tailored to your brand.',
    features: ['AI-Assisted Writing', 'Social Media Content', 'Video Scripts', 'Brand Copywriting']
  },
  {
    icon: Zap,
    title: 'Marketing Automation',
    description: 'Automate repetitive marketing tasks to save time and increase efficiency. Email campaigns, social scheduling, and lead nurturing workflows.',
    features: ['Email Automation', 'Social Media Scheduling', 'Lead Nurturing', 'Customer Segmentation']
  },
  {
    icon: Globe,
    title: 'Web Design & Development',
    description: 'Modern, responsive websites with AI-powered functionality. From template-based sites to custom designs with integrated chatbots and analytics.',
    features: ['AI-Responsive Design', 'Integrated Chatbots', 'SEO Optimization', 'Performance Analytics']
  },
  {
    icon: BarChart3,
    title: 'Analytics & Business Intelligence',
    description: 'Transform data into actionable insights with comprehensive analytics dashboards. Track performance, identify trends, and make data-driven decisions.',
    features: ['Custom Dashboards', 'Performance Tracking', 'Trend Analysis', 'ROI Reporting']
  },
  {
    icon: MessageSquare,
    title: 'AI Chatbot Development',
    description: 'Custom-trained AI assistants for customer engagement. 24/7 automated support that handles inquiries, schedules appointments, and converts leads.',
    features: ['Custom Training', 'Lead Qualification', 'Appointment Scheduling', 'Multi-Platform']
  },
  {
    icon: Palette,
    title: 'Brand Strategy & Design',
    description: 'Comprehensive brand development with AI-enhanced creative direction. Logo design, visual identity, and brand guidelines that resonate with your audience.',
    features: ['Brand Identity', 'Visual Design', 'Style Guidelines', 'Creative Direction']
  },
  {
    icon: Code,
    title: 'Custom AI Solutions',
    description: 'Bespoke AI applications tailored to your business needs. From custom LLMs to specialized automation workflows built for your unique challenges.',
    features: ['Custom LLMs', 'Workflow Automation', 'API Integration', 'Enterprise Solutions']
  },
  {
    icon: Settings,
    title: 'Consulting & Strategy',
    description: 'Expert guidance on AI implementation and digital transformation. Discovery sessions, strategic planning, and ongoing support for your team.',
    features: ['Discovery Sessions', 'Strategic Planning', 'Team Training', 'Ongoing Support']
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.05
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2
            ref={titleRef}
            className="font-display text-[10vw] md:text-[6vw] lg:text-[4vw] text-white leading-none tracking-tight opacity-0"
          >
            <span className="text-gradient text-shimmer">SERVICES</span>
          </h2>
          <p className="mt-6 text-gray-dark text-lg max-w-2xl mx-auto">
            Comprehensive AI-powered marketing and technology solutions designed to transform your business operations and drive measurable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="group p-6 bg-black-charcoal/50 border border-white/5 rounded-lg hover:border-red/30 transition-all duration-500 hover:shadow-glow opacity-0"
            >
              <div className="w-12 h-12 rounded-lg bg-red/10 flex items-center justify-center mb-4 group-hover:bg-red/20 transition-colors">
                <service.icon className="w-6 h-6 text-red" />
              </div>

              <h3 className="font-display text-xl text-white mb-3 group-hover:text-red transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-dark text-sm mb-4 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2 text-xs text-gray-medium">
                    <div className="w-1 h-1 bg-red rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-red text-white font-medium hover:bg-red-light transition-all duration-300"
          >
            <span>Discuss Your Project</span>
          </a>
        </div>
      </div>

      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-red/5 blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-red/3 blur-[150px] pointer-events-none" />
    </section>
  );
};

export default Services;
