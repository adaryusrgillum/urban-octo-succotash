import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Calendar, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

      const formElements = formRef.current?.querySelectorAll('.form-element');
      if (formElements) {
        gsap.fromTo(
          formElements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 px-4 md:px-8 lg:px-16"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-red/5 blur-[200px] animate-pulse-glow" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            className="font-display text-[12vw] md:text-[8vw] lg:text-[6vw] text-white leading-none tracking-tight opacity-0"
          >
            <span className="text-white">GET IN</span>
            <br />
            <span className="text-gradient text-shimmer">TOUCH</span>
          </h2>
          <p className="mt-6 text-gray-dark text-lg max-w-xl mx-auto">
            Ready to transform your business? Let's discuss how AI-powered solutions can drive your growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="p-8 bg-black-charcoal rounded-lg border border-white/5">
              <h3 className="font-display text-2xl text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-red" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <a href="mailto:hello@adaryus.com" className="text-gray-dark hover:text-red transition-colors">
                      hello@adaryus.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-red" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <a href="tel:+13042907713" className="text-gray-dark hover:text-red transition-colors">
                      +1 (304) 290-7713
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-red" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-gray-dark">Morgantown, West Virginia</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-red" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Availability</p>
                    <p className="text-green-400 text-sm">Currently accepting new clients</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-black-charcoal rounded-lg border border-white/5">
              <h3 className="font-display text-2xl text-white mb-6">Quick Links</h3>
              <div className="flex flex-wrap gap-3">
                {['advertisewv.com', 'adaryus.com', 'buckhannon.ai', 'ultimategottiline.com', 'ncrjwatch.org'].map((link, index) => (
                  <a
                    key={index}
                    href={`https://${link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-black-soft rounded-full text-sm text-gray-medium hover:text-red hover:bg-red/10 transition-all duration-300"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div className="p-8 bg-red/5 border border-red/20 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <Calendar className="w-8 h-8 text-red" />
                <div>
                  <h4 className="font-display text-xl text-white">Schedule a Consultation</h4>
                  <p className="text-gray-dark text-sm">Book a free discovery call to discuss your project</p>
                </div>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red text-white text-sm font-medium hover:bg-red-light transition-colors"
              >
                <span>Book Free Call</span>
              </a>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="form-element relative">
              <label className="block text-sm text-gray-medium mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                placeholder="Your name"
                className="w-full bg-black-charcoal border-b-2 border-white/10 py-4 px-0 text-white placeholder:text-gray-dark focus:border-red transition-colors duration-300"
                required
              />
              <div className={`absolute bottom-0 left-0 h-0.5 bg-red transition-all duration-300 ${focusedField === 'name' ? 'w-full' : 'w-0'}`} />
            </div>

            <div className="form-element relative">
              <label className="block text-sm text-gray-medium mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="your@email.com"
                className="w-full bg-black-charcoal border-b-2 border-white/10 py-4 px-0 text-white placeholder:text-gray-dark focus:border-red transition-colors duration-300"
                required
              />
              <div className={`absolute bottom-0 left-0 h-0.5 bg-red transition-all duration-300 ${focusedField === 'email' ? 'w-full' : 'w-0'}`} />
            </div>

            <div className="form-element relative">
              <label className="block text-sm text-gray-medium mb-2">Service Interest</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('service')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-black-charcoal border-b-2 border-white/10 py-4 px-0 text-white focus:border-red transition-colors duration-300 appearance-none cursor-pointer"
              >
                <option value="" className="bg-black-charcoal">Select a service</option>
                <option value="ai-marketing" className="bg-black-charcoal">AI Marketing Strategy</option>
                <option value="seo-content" className="bg-black-charcoal">SEO & Content</option>
                <option value="web-design" className="bg-black-charcoal">Web Design & Development</option>
                <option value="automation" className="bg-black-charcoal">Marketing Automation</option>
                <option value="consulting" className="bg-black-charcoal">Consulting & Strategy</option>
                <option value="lidar-drone" className="bg-black-charcoal">LiDAR & Drone Services</option>
                <option value="other" className="bg-black-charcoal">Other</option>
              </select>
              <div className={`absolute bottom-0 left-0 h-0.5 bg-red transition-all duration-300 ${focusedField === 'service' ? 'w-full' : 'w-0'}`} />
            </div>

            <div className="form-element relative">
              <label className="block text-sm text-gray-medium mb-2">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                placeholder="Tell me about your business goals and challenges..."
                rows={5}
                className="w-full bg-black-charcoal border-b-2 border-white/10 py-4 px-0 text-white placeholder:text-gray-dark focus:border-red transition-colors duration-300 resize-none"
                required
              />
              <div className={`absolute bottom-0 left-0 h-0.5 bg-red transition-all duration-300 ${focusedField === 'message' ? 'w-full' : 'w-0'}`} />
            </div>

            <button
              type="submit"
              className="form-element group relative w-full py-4 px-8 bg-transparent border-2 border-red text-red font-medium overflow-hidden transition-all duration-500 hover:text-white"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                <span>SEND MESSAGE</span>
              </span>
              <div className="absolute inset-0 bg-red transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
