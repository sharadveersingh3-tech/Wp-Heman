import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { 
  ArrowUpRight, 
  ChevronDown, 
  Instagram, 
  Linkedin, 
  Dribbble, 
  Menu, 
  X,
  Star,
  Quote,
  ArrowRight,
  ArrowDown,
  Plus,
  Minus,
  Maximize2,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import ProjectOnboarding from './components/ProjectOnboarding';

// --- Components ---

// --- Types ---

type AppView = 'home' | 'services' | 'work' | 'uiux-work' | 'photography-work' | 'videography-work' | 'process' | 'about' | 'onboarding';

/**
 * Custom Cursor Component
 */
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverTarget = target.closest('[data-cursor]');
      
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        hoverTarget
      ) {
        setIsHovering(true);
        if (hoverTarget instanceof HTMLElement && hoverTarget.dataset.cursor === 'view') {
          setCursorText('VIEW');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none z-[10000] hidden lg:flex overflow-hidden"
      style={{
        width: 16,
        height: 16,
        backgroundColor: cursorText ? 'transparent' : '#C9A84C',
        border: cursorText ? '1px solid #C9A84C' : 'none',
        mixBlendMode: cursorText ? 'normal' : 'difference',
      }}
      animate={{
        x: position.x - 8,
        y: position.y - 8,
        scale: isHovering ? (cursorText ? 6 : 4) : 1,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
    >
      {cursorText && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[4px] font-bold text-gold tracking-tighter"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
};

/**
 * Navigation Component
 */
const Navbar = ({ navigateTo, currentView }: { navigateTo: (v: AppView) => void, currentView: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work', view: 'work', hasDropdown: true },
    { name: 'Services', href: '#services', view: 'services' },
    { name: 'Process', href: '#process', view: 'process' },
    { name: 'About', href: '#about', view: 'about' },
    { name: 'Contact', href: '#contact', view: 'home' },
  ];

  const categories = [
    {
      title: "Photography",
      image: "https://lh3.googleusercontent.com/d/1K3b91eo-RBI15iLVCxFV6raT3OqbkEPy",
      desc: "Visual storytelling through a high-fashion lens."
    },
    {
      title: "Videography",
      image: "https://lh3.googleusercontent.com/d/1B6hSNAL3b9gLzQ11WfyelgbXaiEUj3Vi",
      desc: "Cinematic narratives that bring brands to life."
    },
    {
      title: "UI/UX",
      image: "https://lh3.googleusercontent.com/d/1waEZFnRk_ibgodE1D_BncYsN3zXoO6ar",
      desc: "Crafting seamless digital experiences."
    },
    {
      title: "Branding",
      image: "https://lh3.googleusercontent.com/d/1MEMKd0i77Br4JIr76YjTeN61mLd2vMbl",
      desc: "Building identities that define legacies."
    }
  ];

  const handleNavClick = (e: React.MouseEvent, view: string, href: string) => {
    e.preventDefault();
    if (view === 'work') {
      navigateTo('work');
    } else if (view === 'services') {
      navigateTo('services');
    } else if (view === 'process') {
      navigateTo('process');
    } else if (view === 'about') {
      navigateTo('about');
    } else {
      if (currentView !== 'home') {
        navigateTo('home');
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-6 lg:px-12 ${scrolled ? 'frosted py-4' : 'bg-transparent'}`}>
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="flex items-center group">
            <img 
              src="https://lh3.googleusercontent.com/d/1JEEKbgRcRm-uwFue7rgQ2WqrYFaKm7FJ" 
              alt="ADVYS STUDIO"
              className="h-[26px] lg:h-[31px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setWorkDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setWorkDropdownOpen(false)}
              >
                <a 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.view, link.href)}
                  className="text-xs font-sans font-medium uppercase tracking-widest text-white/70 hover:text-gold transition-colors gold-underline flex items-center gap-1"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={12} className={`transition-transform duration-300 ${workDropdownOpen ? 'rotate-180' : ''}`} />}
                </a>

                {/* Dropdown for Work */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {workDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[800px] bg-black border border-white/10 p-2 shadow-2xl rounded-sm overflow-hidden"
                      >
                        <div className="grid grid-cols-4 gap-6 p-4">
                          {categories.map((cat, i) => (
                            <motion.div
                              key={cat.title}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                                onClick={() => {
                                  if (cat.title === 'UI/UX') {
                                    navigateTo('uiux-work');
                                  } else if (cat.title === 'Photography') {
                                    navigateTo('photography-work');
                                  } else if (cat.title === 'Videography') {
                                    navigateTo('videography-work');
                                  } else {
                                    navigateTo('work');
                                  }
                                  setWorkDropdownOpen(false);
                                }}
                              className="group cursor-pointer"
                            >
                              <div className="mb-4">
                                <h4 className="text-sm font-serif text-white group-hover:text-gold transition-colors tracking-widest uppercase mb-1">{cat.title}</h4>
                                <div className="h-px bg-white/10 group-hover:bg-gold/30 transition-colors w-full" />
                              </div>
                              <div className="relative h-[200px] overflow-hidden border border-white/5 bg-zinc-900 rounded-sm">
                                <img 
                                  src={cat.image} 
                                  alt={cat.title} 
                                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-transparent group-hover:bg-gold/5 transition-colors" />
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <ArrowUpRight size={16} className="text-gold" />
                                </div>
                              </div>
                              <p className="mt-3 text-[9px] text-white/30 uppercase tracking-[0.2em] leading-tight">
                                {cat.desc}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            <motion.button 
              onClick={() => navigateTo('onboarding')}
              animate={{ 
                boxShadow: [
                  "0 0 0px rgba(201, 168, 76, 0)", 
                  "0 0 35px rgba(201, 168, 76, 0.7)", 
                  "0 0 0px rgba(201, 168, 76, 0)"
                ] 
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="border border-gold text-gold px-6 py-2 rounded-full text-xs font-sans uppercase tracking-widest hover:bg-gold hover:text-black transition-all duration-300 relative"
            >
              Start a Project
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white hover:text-gold transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-black frosted flex flex-col justify-center p-12"
          >
            <button 
              className="absolute top-8 right-8 text-white hover:text-gold"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  className="text-4xl font-serif italic text-white hover:text-gold transition-colors"
                  onClick={(e) => {
                    handleNavClick(e, link.view, link.href);
                    setIsOpen(false);
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button 
                onClick={() => {
                  navigateTo('onboarding');
                  setIsOpen(false);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  boxShadow: [
                    "0 0 0px rgba(201, 168, 76, 0)", 
                    "0 0 50px rgba(201, 168, 76, 0.6)", 
                    "0 0 0px rgba(201, 168, 76, 0)"
                  ]
                }}
                transition={{ 
                  opacity: { delay: 0.7 },
                  y: { delay: 0.7 },
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="mt-8 border border-gold text-gold px-10 py-4 rounded-full text-sm font-sans uppercase tracking-[0.2em]"
              >
                Start a Project
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/**
 * Hero Section
 */
const Hero = ({ navigateTo }: { navigateTo: (v: AppView) => void }) => {
  return (
    <section className="relative min-h-screen flex items-center px-6 lg:px-12 overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Studio Background" 
          className="w-full h-full object-cover opacity-50 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
      </div>

      {/* Animated Background Mesh */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-[1]">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.1)_0,transparent_50%)]"
        />
      </div>

      <div className="max-w-[1800px] mx-auto w-full relative z-10 text-center flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-[0.9] tracking-tighter text-white">
          <motion.span 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="block"
          >
            CRAFTING
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="block italic text-gold"
          >
            EMOTION
          </motion.span>
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-12 text-sm lg:text-base font-sans font-light tracking-[0.2em] text-white/50 max-w-lg uppercase leading-relaxed mx-auto"
        >
          We don't build projects. We create legacies for brands that demand perfection.
        </motion.p>


      </div>

    </section>
  );
};

/**
 * Marquee Strip
 */
const MarqueeStrip = () => {
  const words = ["UI/UX DESIGN", "★", "BRAND STRATEGY", "✦", "PHOTOGRAPHY", "◆", "FRONT-END DEV", "★", "VISUAL IDENTITY", "✦"];
  
  return (
    <div className="bg-gold py-4 overflow-hidden flex whitespace-nowrap border-y border-gold/30">
      <div className="animate-marquee flex items-center">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            {words.map((word, idx) => (
              <span key={idx} className="text-black font-sans font-bold text-xs uppercase tracking-[0.3em] mx-10">
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * About / Philosophy Section
 */
const About = () => {
  return (
    <section id="about" className="py-32 px-6 lg:px-12 bg-black border-b border-white/5">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row-reverse gap-20 lg:gap-32">
          <div className="flex-1 lg:pt-10">
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-8xl font-serif leading-[1.1] text-white mb-10 tracking-tighter"
            >
              We believe in <span className="italic text-gold">meaning</span> over noise.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-white/60 font-sans font-light leading-loose max-w-xl text-lg italic mb-12"
            >
              Every detail is a choice, and every choice defines your story. ADVYS STUDIO is an elite collective of designers, photographers, and strategists.
            </motion.p>
            <div className="w-full h-px bg-white/5 mb-12 lg:hidden" />
          </div>
          
          <div className="lg:w-1/3 flex flex-col justify-start gap-12 mt-[50px] border-r border-white/5 pr-12 lg:pr-20">
            <div className="h-px bg-gold/30 w-12" />
            <div className="space-y-12">
              <div>
                <h4 className="text-6xl lg:text-7xl font-serif text-white mb-2">120<span className="text-gold">+</span></h4>
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">Projects Mastered</p>
              </div>
              <div className="w-12 h-px bg-white/10" />
              <div>
                <h4 className="text-6xl lg:text-7xl font-serif text-white mb-2">98<span className="text-gold">%</span></h4>
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">Loyalty Rate</p>
              </div>
            </div>
            <div className="mt-12 flex items-center gap-4 group cursor-pointer">
              <span className="text-xs uppercase tracking-widest text-gold font-bold">Discover our philosophy</span>
              <div className="w-12 h-px bg-gold group-hover:w-20 transition-all duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Service Card Component
 */
const ServiceCard = ({ number, title, description, subServices, index }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group relative p-10 border border-white/5 bg-black-soft hover:border-gold/50 transition-all duration-700 h-full flex flex-col"
    >
      <div className="absolute top-0 left-0 w-1 h-0 bg-gold group-hover:h-full transition-all duration-700" />
      
      <span className="text-gold font-serif text-3xl italic mb-10 opacity-50 block">{number}</span>
      <h3 className="text-3xl font-serif text-white mb-6 group-hover:text-gold transition-colors">{title}</h3>
      <p className="text-white/50 font-sans font-light leading-relaxed mb-8 flex-grow">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-10">
        {subServices.map((sub: string) => (
          <span key={sub} className="text-[9px] uppercase tracking-widest text-white/30 border border-white/10 px-3 py-1 rounded-full group-hover:border-gold/20 group-hover:text-white/50 transition-colors">
            {sub}
          </span>
        ))}
      </div>
      
      <a href="#" className="flex items-center gap-2 text-white/50 group-hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
        Learn More <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
      </a>
    </motion.div>
  );
};

/**
 * Services Section
 */
const Services = () => {
  const services = [
    {
      number: "01",
      title: "UI/UX & Development",
      description: "We design digital interfaces that breathe and interact. Our development isn't just code; it's the seamless extension of brand identity into the digital realm.",
      subServices: ["User Research", "Wireframing", "Prototyping", "UI Design", "Interaction Design", "Front-End Dev", "Design Systems"]
    },
    {
      number: "02",
      title: "Photography",
      description: "Visual storytelling through a high-fashion lens. From meticulous product geometry to cinematic fashion campaigns, we capture the essence of your creation.",
      subServices: ["Product Shoots", "E-Commerce", "Lifestyle", "Model Shoots", "Fashion Editorial", "Campaigns", "Retouching"]
    },
    {
      number: "03",
      title: "Branding",
      description: "Creating comprehensive visual ecosystems. We define how your brand speaks, looks, and feels across every touchpoint to curate a distinct market position.",
      subServices: ["Strategy", "Logo Design", "Identity", "Guidelines", "Typography Systems", "Packaging", "Social Content"]
    },
    {
      number: "04",
      title: "Videography",
      description: "Cinematic narratives that bring brands to life. We specialize in high-end production, fashion films, and social-first video content that commands attention.",
      subServices: ["Brand Films", "Cinemagraphs", "Social Content", "Motion Graphics", "Production", "Color Grading", "Post-Production"]
    }
  ];

  return (
    <section id="services" className="py-32 px-6 lg:px-12 bg-black overflow-hidden mt-[-100px]">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex items-end justify-between mb-20">
          <div className="max-w-2xl">
            <h6 className="text-gold font-sans font-medium uppercase tracking-[0.4em] text-[10px] mb-4">Our Expertise</h6>
            <h2 className="text-5xl lg:text-6xl font-serif text-white">Multidisciplinary Impact</h2>
          </div>
          <div className="hidden lg:block w-40 h-px bg-white/20 mb-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={i} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Work / Portfolio Section
 */
const Work = ({ navigateTo }: { navigateTo: (v: AppView) => void }) => {
  const projects = [
    {
      title: "Aethelred Mobile",
      category: "Fintech UI/UX",
      year: "2024",
      gradient: "from-gray-900 to-indigo-950",
      image: "https://lh3.googleusercontent.com/d/1waEZFnRk_ibgodE1D_BncYsN3zXoO6ar",
      view: 'uiux-work' as AppView
    },
    {
      title: "L'Eclat Skin",
      category: "Luxury Branding",
      year: "2023",
      gradient: "from-stone-900 to-amber-950",
      image: "https://lh3.googleusercontent.com/d/1nBNcBhJdDYZ5Q9gPPxh_r5EB2bFlPydy",
      view: 'work' as AppView
    },
    {
      title: "Ree Joys Cafe",
      category: "Identity & Interior",
      year: "2024",
      gradient: "from-zinc-900 to-zinc-800",
      image: "https://lh3.googleusercontent.com/d/1MItcnrAq87kyb3Nj2sHo0KYvkqUwCx_O",
      view: 'work' as AppView
    },
    {
      title: "Nexus One",
      category: "Product Photography",
      year: "2023",
      gradient: "from-slate-900 to-blue-900",
      image: "https://lh3.googleusercontent.com/d/1K3b91eo-RBI15iLVCxFV6raT3OqbkEPy",
      view: 'photography-work' as AppView
    },
    {
      title: "Maison Blanc",
      category: "Hospitality Branding",
      year: "2024",
      gradient: "from-warm-gray-900 to-stone-800",
      image: "https://lh3.googleusercontent.com/d/1MEMKd0i77Br4JIr76YjTeN61mLd2vMbl",
      view: 'work' as AppView
    },
    {
      title: "Vogue Milano",
      category: "Model Campaign",
      year: "2023",
      gradient: "from-neutral-900 to-rose-950/20",
      image: "https://lh3.googleusercontent.com/d/1B6hSNAL3b9gLzQ11WfyelgbXaiEUj3Vi",
      imageOffset: "-50px",
      view: 'photography-work' as AppView
    }
  ];

  return (
    <section id="work" className="py-32 px-6 lg:px-12 bg-black border-t border-white/5 mt-[-100px]">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-8">
          <h2 className="text-5xl lg:text-7xl font-serif text-white uppercase tracking-tighter">Our <span className="italic text-gold">Work</span></h2>
          <button 
            onClick={() => navigateTo('work')}
            className="self-start md:self-auto text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-white/50 border border-white/10 px-10 py-5 rounded-full hover:border-gold hover:text-gold transition-all duration-500"
          >
            Explore All Projects
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {projects.map((project, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i % 2 * 0.2 }}
              className="group cursor-pointer"
              onClick={() => navigateTo(project.view)}
            >
              <div className="relative aspect-[4/5] lg:aspect-[16/11] overflow-hidden bg-black-soft mb-8">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-70"
                    style={project.imageOffset ? { 
                      transform: `translateY(${project.imageOffset})`,
                      height: `calc(100% + ${Math.abs(parseInt(project.imageOffset))}px)`
                    } : {}}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-1000 ease-out group-hover:scale-110 opacity-60`} />
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
                  <span className="text-white text-xs font-sans font-bold uppercase tracking-[0.5em] border border-white px-8 py-3 rounded-full">View Project</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-2xl font-serif text-white mb-2 group-hover:text-gold transition-colors">{project.title}</h4>
                  <p className="text-[10px] tracking-[0.3em] font-sans text-white/40 uppercase">{project.category}</p>
                </div>
                <span className="text-xs font-serif italic text-gold">{project.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Process Section
 */
const Process = () => {
  const steps = [
    { title: "Discovery", desc: "Immersion into your brand's core DNA." },
    { title: "Concept", desc: "Architecting the visual narrative." },
    { title: "Execution", desc: "Meticulous production and craft." },
    { title: "Delivery", desc: "Launching with precision and support." }
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="process" ref={containerRef} className="py-32 px-6 lg:px-12 bg-black overflow-hidden relative mt-[-100px]">
      <div className="max-w-[1800px] mx-auto">
        <h6 className="text-gold font-sans font-medium uppercase tracking-[0.4em] text-[10px] mb-4">Methodology</h6>
        <h2 className="text-5xl font-serif text-white mb-20">How We <span className="italic text-gold">Work</span></h2>
        
        <div className="relative">
          {/* Animated Line (Desktop Only) */}
          <motion.div 
            style={{ scaleX }}
            className="hidden lg:block absolute top-6 left-[12.5%] w-[75%] h-px bg-gold origin-left z-0"
          />
          <div className="hidden lg:block absolute top-6 left-[12.5%] w-[75%] h-px bg-white/10 z-[-1]" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full border border-gold bg-black flex items-center justify-center text-gold font-serif italic text-lg mb-8 mx-auto">
                  {i + 1}
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-serif text-white mb-3">{step.title}</h4>
                  <p className="text-white/40 font-sans font-light text-sm leading-relaxed max-w-[200px] mx-auto">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Testimonials
 */
const Testimonials = () => {
  const [active, setActive] = useState(0);
  const reviews = [
    {
      name: "Julian Sterling",
      role: "CEO of Valora",
      text: "ADVYS doesn't just design apps; they design movements. Our conversion tripled, but more importantly, our brand found its soul.",
      rating: 5
    },
    {
      name: "Lena Van de Meer",
      role: "Creative Director, L'Oreal",
      text: "The photographic precision and branding depth they brought to our campaign was unparalleled. They are the only studio I trust with our luxury lines.",
      rating: 5
    },
    {
      name: "Marcus Thorne",
      role: "Founder, Thorne Tech",
      text: "An obsessive attention to detail. Every interaction, every pixel was considered. ADVYS is the gold standard of modern creative agencies.",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section className="py-32 px-6 lg:px-12 bg-black-soft border-y border-white/5 mt-[-100px]">
      <div className="max-w-[1800px] mx-auto flex flex-col items-center text-center">
        <Quote size={40} className="text-gold mb-12 opacity-50" />
        
        <div className="relative h-64 w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="text-2xl md:text-4xl font-serif italic leading-relaxed text-white max-w-4xl px-4">
                "{reviews[active].text}"
              </p>
              <div className="mt-10">
                <h5 className="text-gold font-sans font-bold uppercase tracking-widest text-xs">{reviews[active].name}</h5>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-sans mt-2">{reviews[active].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-4 mt-12">
          {reviews.map((_, i) => (
            <button 
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${active === i ? 'bg-gold w-8' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Journal / Blog Preview
 */
const Journal = () => {
  const posts = [
    { title: "The Psychology of Luxury Branding", category: "Strategy", excerpt: "How color palettes and negative space command authority." },
    { title: "Why Great UI Starts With Photography", category: "Design", excerpt: "The invisible link between visual depth and user trust." },
    { title: "Building a Visual Identity From Zero", category: "Branding", excerpt: "The iterative journey of finding a brand's unique voice." }
  ];

  return (
    <section id="journal" className="py-32 px-6 lg:px-12 bg-black mt-[-100px]">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex items-end justify-between mb-20">
          <h2 className="text-5xl font-serif text-white italic">The <span className="not-italic text-gold">Journal</span></h2>
          <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-gold gold-underline">Read all entries</a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="group border border-white/5 p-10 hover:border-gold/30 transition-all duration-500 bg-black-soft"
            >
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 block mb-6 px-3 py-1 border border-white/10 w-fit rounded-full group-hover:text-gold group-hover:border-gold/30 transition-colors">
                {post.category}
              </span>
              <h4 className="text-2xl font-serif text-white mb-4 leading-tight group-hover:text-gold transition-colors">{post.title}</h4>
              <p className="text-white/40 font-sans font-light text-sm italic mb-8">"{post.excerpt}"</p>
              <a href="#" className="flex items-center gap-2 text-white/50 group-hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">
                Read Story <ArrowRight size={12} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * CTA Banner
 */
const CTABanner = ({ navigateTo }: { navigateTo: (v: AppView) => void }) => {
  return (
    <section id="contact" className="py-40 px-6 lg:px-12 bg-gold relative overflow-hidden mt-[-100px]">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,black_0,transparent_70%)]" />
      </div>
      <div className="max-w-[1800px] mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-5xl md:text-8xl font-serif text-black leading-tight mb-8"
        >
          Ready to Build Something <br className="hidden lg:block" /> <span className="italic">Extraordinary?</span>
        </motion.h2>
        <p className="text-black font-sans tracking-[0.2em] font-medium text-sm lg:text-lg mb-12 uppercase">We are taking new projects for Q3 2024</p>
        <button 
          onClick={() => navigateTo('onboarding')}
          className="bg-black text-gold px-12 py-6 rounded-full text-sm font-sans font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl"
        >
          Start a Project
        </button>
      </div>
    </section>
  );
};

/**
 * Footer
 */
const Footer = ({ navigateTo }: { navigateTo: (v: AppView) => void }) => {
  return (
    <footer className="py-24 px-6 lg:px-12 bg-black border-t border-white/5">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          <div className="lg:col-span-2">
            <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="flex flex-col items-start gap-0 group mb-8">
              <span className="text-2xl lg:text-3xl font-sans font-semibold tracking-[0.5em] text-white group-hover:text-gold transition-colors leading-tight">ADVYS</span>
              <span className="text-[10px] lg:text-[12px] font-sans tracking-[0.8em] font-light text-white/50 uppercase group-hover:text-gold/50 transition-colors">STUDIO</span>
            </a>
            <p className="text-white/40 font-sans font-light italic max-w-sm text-sm leading-relaxed">
              We create legacies, not just websites. Our obsession with detail ensures your brand stands where it belongs: at the pinnacle of its industry.
            </p>
            <div className="flex gap-6 mt-10">
              <a href="#" className="text-white/40 hover:text-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors"><Dribbble size={20} /></a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
          
          <div>
            <h6 className="text-white font-sans font-bold uppercase tracking-[0.3em] text-[10px] mb-8">Work</h6>
            <ul className="flex flex-col gap-4 text-xs font-sans text-white/40 tracking-widest">
              <li><button onClick={() => navigateTo('work')} className="hover:text-gold transition-colors text-left uppercase">Selected Projects</button></li>
              <li><button onClick={() => navigateTo('work')} className="hover:text-gold transition-colors text-left uppercase">Case Studies</button></li>
              <li><button onClick={() => navigateTo('work')} className="hover:text-gold transition-colors text-left uppercase">Showreel</button></li>
              <li><button onClick={() => navigateTo('work')} className="hover:text-gold transition-colors text-left uppercase">Client List</button></li>
            </ul>
          </div>
          
          <div>
            <h6 className="text-white font-sans font-bold uppercase tracking-[0.3em] text-[10px] mb-8">Services</h6>
            <ul className="flex flex-col gap-4 text-xs font-sans text-white/40 tracking-widest">
              <li><button onClick={() => navigateTo('services')} className="hover:text-gold transition-colors text-left uppercase">UI/UX Design</button></li>
              <li><button onClick={() => navigateTo('services')} className="hover:text-gold transition-colors text-left uppercase">Development</button></li>
              <li><button onClick={() => navigateTo('services')} className="hover:text-gold transition-colors text-left uppercase">Photography</button></li>
              <li><button onClick={() => navigateTo('services')} className="hover:text-gold transition-colors text-left uppercase">Branding</button></li>
            </ul>
          </div>
          
          <div>
            <h6 className="text-white font-sans font-bold uppercase tracking-[0.3em] text-[10px] mb-8">Company</h6>
            <ul className="flex flex-col gap-4 text-xs font-sans text-white/40 tracking-widest">
              <li><button onClick={() => navigateTo('about')} className="hover:text-gold transition-colors text-left uppercase">About Us</button></li>
              <li><button onClick={() => navigateTo('process')} className="hover:text-gold transition-colors text-left uppercase">Process</button></li>
              <li><button onClick={() => { navigateTo('home'); setTimeout(() => document.getElementById('journal')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-gold transition-colors text-left uppercase">Journal</button></li>
              <li><a href="#" className="hover:text-gold transition-colors text-left uppercase">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h6 className="text-white font-sans font-bold uppercase tracking-[0.3em] text-[10px] mb-8">Contact</h6>
            <ul className="flex flex-col gap-4 text-xs font-sans text-white/40 tracking-widest">
              <li><a href="#" className="hover:text-gold transition-colors">hello@advysstudio.com</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">+1 (234) 567 890</a></li>
              <li><a href="#" className="hover:text-gold transition-colors uppercase text-left">London, UK</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-sans tracking-[0.2em] text-white/20">© 2024 ADVYS STUDIO. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-2">
            <Star size={10} className="text-gold" />
            <p className="text-[10px] font-serif italic text-gold uppercase tracking-[0.4em]">Crafted with obsession</p>
          </div>
          <div className="flex gap-8 text-[10px] font-sans tracking-[0.2em] text-white/20 uppercase">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Detailed Services Components ---

const ServicesFullPage = ({ navigateTo }: { navigateTo: AppView | any }) => {
  return (
    <div className="bg-black mt-[50px]">
      {/* SECTION 1 — SERVICES HERO BANNER */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 lg:px-12 overflow-hidden">
        {/* SERVICES Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.span 
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 0.03, scale: 1 }}
            transition={{ duration: 2 }}
            className="text-[20vw] lg:text-[40vh] font-serif font-extralight text-white leading-none tracking-[-0.05em]"
          >
            SERVICES
          </motion.span>
        </div>

        {/* Breathing Pulse Background */}
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.5)_0,transparent_70%)]"
        />

        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-serif leading-tight text-white mb-6">
            <motion.span 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="block"
            >
              We Don't Just Create.
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="block italic text-gold"
            >
              We Elevate.
            </motion.span>
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col items-center"
          >
            <p className="text-[10px] md:text-xs font-sans tracking-[0.6em] text-white/50 uppercase mb-8">
              Three disciplines. One obsession. Zero compromise.
            </p>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
              className="h-px bg-gold"
            />
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-white/20 relative">
            <motion.div 
              animate={{ height: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 left-0 w-full bg-gold"
            />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2 — SERVICE TICKER / MARQUEE */}
      <section className="py-10 bg-black-soft border-y border-white/5 overflow-hidden flex flex-col gap-6">
        <div className="flex whitespace-nowrap">
          <div className="animate-marquee-slow flex items-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                {["UI/UX DESIGN", "✦", "PRODUCT PHOTOGRAPHY", "✦", "MODEL PHOTOGRAPHY", "✦", "BRANDING", "✦"].map((text, idx) => (
                  <span key={idx} className={`text-xs tracking-[0.3em] uppercase mx-8 ${text === '✦' ? 'text-gold' : 'text-white/40 font-medium'}`}>
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex whitespace-nowrap">
          <div className="animate-marquee-slow-reverse flex items-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                {["VISUAL IDENTITY", "✦", "INTERACTION DESIGN", "✦", "CAMPAIGNS", "✦", "GRAPHIC DESIGN", "✦"].map((text, idx) => (
                  <span key={idx} className={`text-xs tracking-[0.3em] uppercase mx-8 ${text === '✦' ? 'text-gold' : 'text-white/40 font-medium'}`}>
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — THREE SERVICE PILLARS */}
      <section className="pb-32 bg-black">
        <ServicePillarDetailed 
          number="01"
          name="UI/UX DESIGN & DEVELOPMENT"
          tagline="Interfaces that feel inevitable."
          description="We design digital products that users don't just use — they remember. From the first wireframe to the final pixel, every decision is intentional. We combine deep user research with striking visual design to create experiences that convert, retain, and delight. Our development team brings every design to life with clean, performant front-end code."
          subServices={["User Research", "Wireframing", "Prototyping", "UI Design", "UX Strategy", "Interaction Design", "Design Systems", "Front-End Development", "Mobile App Design", "Web App Design", "Usability Testing", "Accessibility"]}
          works={[
            { title: "Pulse", category: "Fintech Dashboard", gradient: "from-gray-900 to-indigo-950" },
            { title: "Aether", category: "SaaS Product Design", gradient: "from-purple-950 to-black" },
            { title: "Orbit", category: "Mobile Banking", gradient: "from-slate-900/40 to-slate-950" }
          ]}
        />
        
        <ServicePillarDetailed 
          number="02"
          name="PHOTOGRAPHY"
          tagline="Light, story, and obsessive detail."
          description="Every image we produce is a strategic asset. Whether it's a product sitting on a surface or a model commanding a frame, we approach every shoot with a filmmaker's eye and a marketer's brain. Our studio and on-location shoots are crafted to stop scrolling, sell product, and build brand equity — one frame at a time."
          subServices={["Product Photography", "E-Commerce Shoots", "Lifestyle Photography", "Model Shoots", "Fashion Editorials", "Lookbooks", "Campaign Photography", "Flat Lay Styling", "Retouching", "Video Reels", "Creative Direction"]}
          works={[
            { title: "Lumière", category: "Luxury Skincare", gradient: "from-stone-900 to-amber-900/30" },
            { title: "Fragment", category: "Fashion Editorial", gradient: "from-neutral-900 to-rose-950/20" },
            { title: "Forma", category: "Tech Campaign", gradient: "from-zinc-900 to-zinc-800" }
          ]}
        />

        <ServicePillarDetailed 
          number="03"
          name="BRANDING"
          tagline="Identity built to outlast trends."
          description="A brand is not a logo. It's a belief system, a visual dialect, and a promise of consistency. We help brands find their true north by engineering visual identities that survive the turbulence of fluctuating trends. We build systems that are as scalable as they are beautiful, ensuring every touchpoint tells the same compelling story."
          subServices={["Brand Strategy", "Logo Design", "Visual Identity", "Brand Guidelines", "Typography Systems", "Color Palettes", "Packaging Design", "Social Media Design", "Print Collateral", "Graphic Design"]}
          works={[
            { title: "Maison Blanc", category: "Hospitality Branding", gradient: "from-stone-900 to-amber-900/10" },
            { title: "Nexus One", category: "Tech Identity", gradient: "from-blue-950 to-black" },
            { title: "Vogue Milano", category: "Campaign Identity", gradient: "from-black to-zinc-900" }
          ]}
          onContact={() => { 
            navigateTo('home'); 
            setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); 
          }}
        />
      </section>

      <CTABanner navigateTo={navigateTo} />
    </div>
  );
};

const ServicePillarDetailed = ({ number, name, tagline, description, subServices, works, onContact }: any) => {
  return (
    <div className="py-24 lg:py-40 border-b border-white/5 relative overflow-hidden group">
      {/* Decorative background number */}
      <div className="absolute top-20 left-10 lg:left-20 pointer-events-none select-none opacity-[0.03]">
        <h3 className="text-[200px] lg:text-[400px] font-serif leading-none">{number}</h3>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <span className="text-gold font-serif italic text-xl lg:text-3xl block mb-6 px-1">{tagline}</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-10 leading-tight uppercase tracking-tighter">{name}</h2>
            <p className="text-white/50 font-sans font-light text-lg lg:text-xl leading-relaxed mb-12 max-w-2xl">
              {description}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-16 max-w-xl">
              {subServices.map((sub: string) => (
                <span key={sub} className="text-[10px] uppercase tracking-widest text-white/30 border border-white/10 px-4 py-2 rounded-full hover:border-gold/30 hover:text-white/60 transition-colors cursor-default">
                  {sub}
                </span>
              ))}
            </div>

            <button 
              onClick={onContact}
              className="border border-gold text-gold px-12 py-5 rounded-full text-xs font-sans uppercase tracking-[0.3em] font-bold hover:bg-gold hover:text-black transition-all duration-500 flex items-center gap-3 group/btn"
            >
              Start This Project <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex flex-col gap-8">
            <h6 className="text-[9px] uppercase tracking-[0.5em] text-white/20 italic">Curated Samples</h6>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {works.map((work: any, i: number) => (
                <div key={i} className="group/card relative aspect-[3/4] overflow-hidden bg-black-soft">
                  <div className={`absolute inset-0 bg-gradient-to-br ${work.gradient} opacity-50 group-hover/card:scale-110 transition-transform duration-1000`} />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end bg-black/20 group-hover/card:bg-black/40 transition-colors">
                    <motion.div
                      initial={{ opacity: 0.8, y: 0 }}
                      whileHover={{ opacity: 1, y: -5 }}
                    >
                      <h5 className="text-white font-serif text-lg leading-tight mb-1">{work.title}</h5>
                      <p className="text-[8px] uppercase tracking-widest text-white/40">{work.category}</p>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Work Full Page Component ---

const WorkFullPage = ({ navigateTo }: { navigateTo: AppView | any }) => {
  const [filter, setFilter] = useState('ALL');
  const [showAll, setShowAll] = useState(false);
  
  const projects = [
    // PHOTOGRAPHY (6) - First
    { id: 7, title: "LUMIÈRE", category: "PHOTOGRAPHY", subCategory: "Luxury Skincare", year: 2024, gradient: "from-[#1f1000] to-[#1a0a00]", tags: ["Product", "Commercial", "Luxury"] },
    { id: 8, title: "FRAGMENT", category: "PHOTOGRAPHY", subCategory: "Fashion Editorial", year: 2024, gradient: "from-[#1f0a10] to-[#1a000a]", tags: ["Editorial", "Fashion", "Model"] },
    { id: 9, title: "FORMA", category: "PHOTOGRAPHY", subCategory: "Tech Accessories", year: 2024, gradient: "from-[#0f141f] to-[#111418]", tags: ["Product", "E-Commerce", "Tech"] },
    { id: 10, title: "ECLIPSE", category: "PHOTOGRAPHY", subCategory: "Jewellery Campaign", year: 2025, gradient: "from-[#1a1400] to-[#111111]", tags: ["Jewellery", "Campaign", "Luxury"] },
    { id: 11, title: "REVERIE", category: "PHOTOGRAPHY", subCategory: "Lifestyle Brand", year: 2025, gradient: "from-[#141a00] to-[#0f0f0f]", tags: ["Lifestyle", "Model", "Campaign"] },
    { id: 12, title: "ICON", category: "PHOTOGRAPHY", subCategory: "Sportswear Brand", year: 2025, gradient: "from-[#00001a] to-[#111111]", tags: ["Sports", "Fashion", "Editorial"] },
    
    // BRANDING (6) - Second
    { id: 13, title: "MAISON NOIR", category: "BRANDING", subCategory: "Restaurant Chain", year: 2024, gradient: "from-[#0f1400] to-[#0a0f00]", tags: ["F&B", "Full Brand", "Identity"] },
    { id: 14, title: "SOLÈNE", category: "BRANDING", subCategory: "Luxury Fashion", year: 2024, gradient: "from-[#1a0f0a] to-[#111111]", tags: ["Fashion", "Logo", "Identity"] },
    { id: 15, title: "VANTA", category: "BRANDING", subCategory: "Tech Startup", year: 2024, gradient: "from-[#111111] to-[#0a0a0a]", tags: ["Tech", "Startup", "Guidelines"] },
    { id: 16, title: "TERRA", category: "BRANDING", subCategory: "Wellness Brand", year: 2025, gradient: "from-[#0a1400] to-[#0f0f0f]", tags: ["Wellness", "Packaging", "Identity"] },
    { id: 17, title: "AURUM", category: "BRANDING", subCategory: "Financial Services", year: 2025, gradient: "from-[#1a1000] to-[#111111]", tags: ["Finance", "Rebrand", "Corporate"] },
    { id: 18, title: "DRIFT", category: "BRANDING", subCategory: "Streetwear Label", year: 2025, gradient: "from-[#0a0f1a] to-[#0f0f0f]", tags: ["Fashion", "Streetwear", "Youth"] },

    // UI/UX (6) - Third
    { id: 1, title: "PULSE", category: "UI/UX", subCategory: "Fintech Dashboard", year: 2024, gradient: "from-[#0a1628] to-[#0d3d3d]", tags: ["Web App", "Dashboard", "Redesign"] },
    { id: 2, title: "AETHER", category: "UI/UX", subCategory: "SaaS Platform", year: 2024, gradient: "from-[#1a0a2e] to-[#0d0d3d]", tags: ["SaaS", "B2B", "Design System"] },
    { id: 3, title: "ORBIT", category: "UI/UX", subCategory: "Mobile Banking App", year: 2024, gradient: "from-[#1a1a2e] to-[#0f0f0f]", tags: ["Mobile", "iOS", "Android"] },
    { id: 4, title: "NOVA", category: "UI/UX", subCategory: "E-Commerce Platform", year: 2025, gradient: "from-[#0a1f0a] to-[#0a0a0a]", tags: ["E-Commerce", "Web", "UX Research"] },
    { id: 5, title: "CIPHER", category: "UI/UX", subCategory: "Cybersecurity Dashboard", year: 2025, gradient: "from-[#1f0a0a] to-[#111111]", tags: ["B2B", "SaaS", "Data Viz"] },
    { id: 6, title: "FLOW", category: "UI/UX", subCategory: "Productivity App", year: 2025, gradient: "from-[#0a1f1f] to-[#0d0d0d]", tags: ["Mobile", "Productivity", "iOS"] },
  ];

  const photography = projects.filter(p => p.category === 'PHOTOGRAPHY');
  const branding = projects.filter(p => p.category === 'BRANDING');
  const uiux = projects.filter(p => p.category === 'UI/UX');

  const filteredProjects = projects.filter(p => filter === 'ALL' || p.category === filter);

  useEffect(() => {
    // Reset showAll when filter changes except to ALL
    if (filter !== 'ALL') setShowAll(true);
  }, [filter]);

  return (
    <div className="bg-black mt-[50px]">
      {/* SECTION 1 — WORK PAGE HERO */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 lg:px-12 overflow-hidden bg-black">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.span 
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 0.04, scale: 1 }}
            transition={{ duration: 2 }}
            className="text-[25vw] lg:text-[40vw] font-serif font-extralight text-white leading-none tracking-[-0.05em]"
          >
            WORK
          </motion.span>
        </div>

        <motion.div 
          animate={{ opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,40,40,0.5)_0,transparent_70%)]"
        />

        <div className="relative z-10 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[10px] font-sans text-gold tracking-[0.5em] uppercase font-bold mb-6"
          >
            Portfolio · 2023–2025
          </motion.p>
          <h1 className="text-6xl md:text-9xl lg:text-[10rem] font-serif text-white leading-[0.9] tracking-tighter">
            <motion.span 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="block"
            >
              Work That
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="block italic text-gold"
            >
              Speaks.
            </motion.span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-white/40 text-sm md:text-lg font-sans font-light tracking-widest mt-10"
          >
            Eighteen projects. Three disciplines. One standard.
          </motion.p>
          
          <div className="w-full max-w-[120px] mx-auto mt-12 bg-white/10 h-px overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-gold"
            />
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 flex flex-col items-center"
        >
          <div className="w-px h-12 bg-white/10 relative">
            <motion.div 
              animate={{ height: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 left-0 w-full bg-gold"
            />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2 — FILTER BAR (Sticky) */}
      <div className="sticky top-[80px] z-40 bg-black/80 backdrop-blur-md border-b border-gold/10 py-4 px-6 lg:px-12">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-white/30 italic">Filter by:</span>
            <div className="flex flex-wrap gap-2">
              {['PHOTOGRAPHY', 'BRANDING', 'UI/UX', 'ALL'].map((f) => (
                <button 
                  key={f}
                  onClick={() => { setFilter(f); if (f === 'ALL') setShowAll(false); }}
                  className={`px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] font-bold transition-all ${filter === f ? 'text-gold border-b border-gold' : 'text-white/40 hover:text-white'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="hidden md:block text-[9px] uppercase tracking-[0.5em] text-white/20">
            Current Selection: <span className="text-gold opacity-100">{filter} PROJECTS</span>
          </div>
        </div>
      </div>

      {/* SECTION 3 — FEATURED PROJECT (Hero Project) */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-black overflow-hidden border-b border-white/5">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 items-center">
            {/* Image Side (60%) */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-7 relative group cursor-crosshair"
            >
              <div className="aspect-video relative overflow-hidden bg-black-soft">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] to-[#0d3d3d] group-hover:scale-105 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
                
                {/* Overlay tag */}
                <div className="absolute bottom-6 left-6 z-10 px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full">
                  <span className="text-[10px] text-white uppercase tracking-[0.3em] font-medium">NovaPay · Fintech · 2024</span>
                </div>
              </div>
            </motion.div>

            {/* Content Side (40%) */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 lg:pl-24"
            >
              <span className="text-gold font-sans font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block italic">Featured Project</span>
              <h2 className="text-6xl md:text-8xl font-serif text-white mb-6 uppercase tracking-tighter">PULSE</h2>
              <p className="text-xs text-white/50 uppercase tracking-[0.4em] mb-10 font-bold">UI/UX Design · 2024</p>
              
              <p className="text-white/60 font-sans font-light text-lg leading-relaxed mb-12 italic max-w-lg">
                "A complete product redesign for NovaPay, a fintech platform serving 2M+ users. We rebuilt their dashboard from zero — research, strategy, design, and front-end delivery."
              </p>

              <div className="grid grid-cols-3 gap-6 mb-16 border-y border-white/5 py-8">
                <div>
                  <h4 className="text-gold text-2xl font-serif mb-1">↑ 40%</h4>
                  <p className="text-[8px] uppercase tracking-widest text-white/40">Retention</p>
                </div>
                <div>
                  <h4 className="text-gold text-2xl font-serif mb-1">↓ 60%</h4>
                  <p className="text-[8px] uppercase tracking-widest text-white/40">Support Tickets</p>
                </div>
                <div>
                  <h4 className="text-gold text-2xl font-serif mb-1">98%</h4>
                  <p className="text-[8px] uppercase tracking-widest text-white/40">User Satisfaction</p>
                </div>
              </div>

              <button className="border border-gold text-gold px-12 py-5 rounded-full text-xs font-sans uppercase tracking-[0.3em] font-bold hover:bg-gold hover:text-black transition-all duration-500 flex items-center gap-3 group">
                View Case Study <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — FULL PROJECT GRID */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-black">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between mb-20 border-b border-white/5 pb-10">
            <div>
              <h2 className="text-4xl lg:text-6xl font-serif text-white uppercase tracking-tighter">
                {filter === 'ALL' ? (showAll ? 'Complete Portfolio' : 'Selected Works') : `${filter} Projects`}
              </h2>
              <motion.div 
                key={filter}
                whileInView={{ width: "100%" }}
                initial={{ width: 0 }}
                transition={{ duration: 1.5 }}
                className="h-1 bg-gold mt-4"
              />
            </div>
            <span className="text-xs font-sans tracking-[0.5em] text-white/20 italic">
              {filter === 'ALL' && !showAll ? '9 Featured' : `${filteredProjects.length} Items`}
            </span>
          </div>

          {(filter === 'ALL' && !showAll) ? (
            <div className="space-y-40">
              <div className="space-y-12">
                <h3 className="text-gold font-serif text-3xl italic">Photography</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {photography.slice(0, 3).map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                  ))}
                </div>
              </div>

              <div className="space-y-12">
                <h3 className="text-gold font-serif text-3xl italic">Branding</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {branding.slice(0, 3).map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                  ))}
                </div>
              </div>

              <div className="space-y-12">
                <h3 className="text-gold font-serif text-3xl italic">UI/UX</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {uiux.slice(0, 3).map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                  ))}
                </div>
              </div>

              <div className="flex justify-center pt-20">
                <button 
                  onClick={() => setShowAll(true)}
                  className="group flex flex-col items-center gap-6"
                >
                  <span className="text-white/40 group-hover:text-gold text-[10px] uppercase font-sans tracking-[0.5em] transition-colors">See the full collection</span>
                  <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold transition-colors duration-500 relative">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border border-gold/20"
                    />
                    <ArrowDown className="text-gold group-hover:translate-y-1 transition-transform" />
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5 — STATISTICS STRIP */}
      <section className="py-20 bg-[#070707] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
            <StatItem count={18} label="Projects Delivered" symbol="+" />
            <StatItem count={3} label="Creative Disciplines" symbol="" />
            <StatItem count={100} label="Client Retention Rate" symbol="%" />
            <StatItem count={2} label="Years of Excellence" symbol="" />
          </div>
        </div>
      </section>

      {/* SECTION 6 — CASE STUDY SPOTLIGHT */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-black">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col mb-20">
            <span className="text-gold font-sans font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block italic">In-depth Analysis</span>
            <h2 className="text-5xl lg:text-7xl font-serif text-white uppercase tracking-tighter">Deep Dive</h2>
            <motion.div 
               whileInView={{ width: 120 }}
               initial={{ width: 0 }}
               transition={{ duration: 1 }}
               className="h-1 bg-gold mt-6"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <CaseStudyCard 
              name="MAISON NOIR"
              category="Branding"
              description="A masterclass in transforming a traditional F&B model into a premium lifestyle brand experience."
              gradient="from-[#0f1400] to-[#0a0f00]"
            />
            <CaseStudyCard 
              name="LUMIÈRE"
              category="Photography"
              description="Engineering light and texture to define the new visual standard for luxury skincare e-commerce."
              gradient="from-[#1f1000] to-[#1a0a00]"
            />
          </div>
        </div>
      </section>

      {/* SECTION 7 — CLIENT LOGOS STRIP */}
      <section className="py-16 bg-[#050505] border-y border-white/5 overflow-hidden">
        <div className="max-w-[1800px] mx-auto mb-12 text-center">
          <span className="text-[10px] uppercase tracking-[0.6em] text-gold/60 font-bold italic">Brands We've Worked With</span>
        </div>
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="animate-marquee-slow flex items-center">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center">
                {["NOVAPAY", "LUMÉ", "MAISON NOIR", "SOLÈNE", "VANTA", "TERRA", "AURUM", "DRIFT", "FORMA AUDIO", "ECLIPSE JEWELS"].map((brand, idx) => (
                  <span key={idx} className="text-2xl lg:text-4xl font-serif text-white/20 hover:text-white/60 transition-colors mx-16 cursor-default tracking-widest uppercase">
                    {brand}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — CLOSING CTA */}
      <section className="py-32 lg:py-60 px-6 lg:px-12 bg-black text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-[0.02] pointer-events-none" />
        <div className="max-w-[1800px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 border border-white/10 rounded-full bg-white/5 mb-10">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/50">Currently Accepting Projects — Q2 2025</span>
            </div>

            <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-10 leading-[0.9] tracking-tighter uppercase">
              Your project <br /> could <span className="italic text-gold">be next.</span>
            </h2>
            
            <p className="text-white/40 text-lg lg:text-xl font-sans font-light italic max-w-2xl mx-auto mb-16 leading-relaxed">
              "We take on a limited number of projects each quarter to ensure every client gets our full attention. Let's build something unforgettable."
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <button 
                onClick={() => navigateTo('onboarding')}
                className="bg-gold text-black px-16 py-6 rounded-full text-xs font-sans uppercase tracking-[0.3em] font-bold border border-gold hover:bg-transparent hover:text-gold transition-all duration-500 flex items-center gap-3 group"
              >
                Start a Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-white/20 text-white px-16 py-6 rounded-full text-xs font-sans uppercase tracking-[0.3em] font-bold hover:border-white transition-all duration-500">
                Get in Touch
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const StatItem = ({ count, label, symbol }: any) => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Quad ease out
        const easeProgress = 1 - Math.pow(1 - progress, 2);
        
        setCurrent(Math.floor(easeProgress * count));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, count]);

  return (
    <div ref={ref} className="text-center lg:border-r border-white/5 last:border-0 px-6">
      <h4 className="text-5xl lg:text-7xl font-serif text-gold mb-3 tracking-tighter">
        {current}{symbol}
      </h4>
      <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/50">{label}</p>
    </div>
  );
};

const CaseStudyCard = ({ name, category, description, gradient }: any) => {
  return (
    <div className="group relative aspect-[16/9] lg:aspect-auto lg:h-[500px] overflow-hidden rounded-sm bg-black-soft cursor-pointer">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40 group-hover:scale-110 transition-transform duration-[2s]`} />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
      
      <div className="absolute inset-0 p-12 flex flex-col justify-end">
        <span className="text-gold font-sans font-bold text-[9px] uppercase tracking-[0.4em] mb-4 block scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 origin-left">Case Study</span>
        <h3 className="text-4xl lg:text-5xl font-serif text-white mb-6 uppercase tracking-tighter translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{name}</h3>
        <p className="text-xs uppercase tracking-[0.3em] font-bold text-white/50 mb-6">{category}</p>
        <p className="text-white/40 font-sans font-light italic text-sm mb-10 max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700">{description}</p>
        
        <div className="flex items-center gap-3 text-gold text-[10px] font-bold uppercase tracking-[0.4em] translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
          Read Full Case Study <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index }: any) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-sm bg-black-soft"
    >
      {/* Card Image area */}
      <div className="aspect-[4/5] relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-[1.5s] group-hover:scale-110`} />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500 flex items-center justify-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] border border-gold/50 px-6 py-2 bg-black/40 backdrop-blur-sm pointer-events-none"
          >
            View Project →
          </motion.span>
        </div>
      </div>

      {/* Card Content area */}
      <div className="p-10 bg-[#0d0d0d] border-t border-white/5 group-hover:border-gold/20 transition-colors duration-500">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-gold text-[9px] font-bold uppercase tracking-[0.4em] mb-2">{project.category} · {project.subCategory}</p>
            <h3 className="text-2xl lg:text-3xl font-serif text-white uppercase tracking-tighter">{project.title}</h3>
          </div>
          <span className="text-[10px] font-sans text-white/20 font-bold">{project.year}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-6">
          {project.tags.map((tag: string) => (
            <span key={tag} className="text-[8px] uppercase tracking-widest text-white/30 border border-white/10 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Hover Border Glow */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
};

// --- Process Full Page Component ---

/**
 * UI/UX Work Page Component
 */
const UIUXWorkPage = ({ navigateTo }: { navigateTo: (v: AppView) => void }) => {
  
  const uiuxProjects = [
    {
      title: "PULSE",
      type: "Web App · Dashboard",
      client: "Fintech Platform",
      year: "2024",
      gradient: "from-[#0a1628] to-[#0d3d3d]",
      result: "↑ 40% User Retention",
      tags: ["Fintech", "Dashboard", "Redesign"],
      desc: "Complete dashboard redesign for a 2M-user fintech platform. Research to front-end delivery.",
      categories: ["WEB APP", "DASHBOARD", "REDESIGN"],
      metric: "↑ 40% retention"
    },
    {
      title: "AETHER",
      type: "SaaS Platform",
      client: "Cloud Analytics Tool",
      year: "2024",
      gradient: "from-[#1a0a2e] to-[#0d0d3d]",
      result: "Design System · 200+ Components",
      tags: ["SaaS", "B2B", "Design System"],
      desc: "End-to-end design system and UI for an enterprise cloud analytics platform.",
      categories: ["SAAS", "WEB APP"],
      metric: "Design System"
    },
    {
      title: "ORBIT",
      type: "Mobile App · iOS & Android",
      client: "Digital Bank",
      year: "2024",
      gradient: "from-[#1a1a2e] to-[#0f0f0f]",
      result: "4.9★ App Store Rating",
      tags: ["Mobile", "Banking", "iOS", "Android"],
      desc: "Mobile-first banking experience redesigned for a Gen Z audience.",
      categories: ["MOBILE APP"],
      metric: "4.9★ rating"
    },
    {
      title: "NOVA",
      type: "E-Commerce Platform",
      client: "Luxury Fashion Brand",
      year: "2024",
      gradient: "from-[#0a1f0a] to-[#0a0a0a]",
      result: "↑ 85% Conversion Rate",
      tags: ["E-Commerce", "Luxury", "Web"],
      desc: "Full UX overhaul of a premium fashion e-commerce experience.",
      categories: ["E-COMMERCE", "WEB APP"],
      metric: "↑ 85% conversion"
    },
    {
      title: "CIPHER",
      type: "Security Dashboard",
      client: "Enterprise Cybersecurity",
      year: "2024",
      gradient: "from-[#1f0a0a] to-[#111111]",
      result: "↓ 70% Decision Time",
      tags: ["B2B", "Data Viz", "Dashboard"],
      desc: "Complex data visualization UI for an enterprise security operations center.",
      categories: ["DASHBOARD", "WEB APP"],
      metric: "↓ 70% time"
    },
    {
      title: "FLOW",
      type: "Mobile App · Productivity",
      client: "Creative Professionals Platform",
      year: "2024",
      gradient: "from-[#0a1f1f] to-[#0d0d0d]",
      result: "50K+ Downloads Month 1",
      tags: ["Mobile", "Productivity", "iOS"],
      desc: "Minimalist task management app designed specifically for creative professionals.",
      categories: ["MOBILE APP"],
      metric: "50K+ downloads"
    },
    {
      title: "HAVEN",
      type: "Web App · Real Estate",
      client: "Property Platform",
      year: "2025",
      gradient: "from-[#1f1a0a] to-[#111111]",
      result: "↑ 120% Lead Generation",
      tags: ["Real Estate", "Web App", "UX"],
      desc: "End-to-end UX redesign of a premium property discovery platform.",
      categories: ["WEB APP"],
      metric: "↑ 120% leads"
    },
    {
      title: "STRATA",
      type: "Mobile App · Health & Fitness",
      client: "Wellness Startup",
      year: "2025",
      gradient: "from-[#0a1a0a] to-[#0d0d0d]",
      result: "4.8★ · 100K+ Users",
      tags: ["Health", "Mobile", "Startup"],
      desc: "Habit tracking and wellness app with deeply personalized UX flows.",
      categories: ["MOBILE APP"],
      metric: "4.8★ rating"
    },
    {
      title: "VEIL",
      type: "Web Platform · Media",
      client: "Premium Content Platform",
      year: "2025",
      gradient: "from-[#1a1a1a] to-[#0a0a0a]",
      result: "↑ 65% Engagement",
      tags: ["Media", "Streaming", "Web"],
      desc: "Editorial-first content platform UI designed for long-form reading and discovery.",
      categories: ["WEB APP"],
      metric: "↑ 65% engagement"
    },
    {
      title: "MERIDIAN",
      type: "Dashboard · Logistics",
      client: "Supply Chain Platform",
      year: "2025",
      gradient: "from-[#0a0f1f] to-[#0d0d0d]",
      result: "↓ 45% Operational Errors",
      tags: ["Logistics", "B2B", "Dashboard"],
      desc: "Real-time logistics dashboard managing 1000+ daily shipments across 12 countries.",
      categories: ["DASHBOARD", "WEB APP"],
      metric: "↓ 45% errors"
    },
    {
      title: "PRISM",
      type: "Mobile App · Education",
      client: "EdTech Platform",
      year: "2025",
      gradient: "from-[#1a0a1a] to-[#0d0d0d]",
      result: "↑ 90% Course Completion",
      tags: ["EdTech", "Mobile", "UX Research"],
      desc: "Personalized learning experience app for professional upskilling platform.",
      categories: ["MOBILE APP"],
      metric: "↑ 90% completion"
    },
    {
      title: "FORGE",
      type: "Web App · Project Management",
      client: "Creative Agency Tool",
      year: "2025",
      gradient: "from-[#0f0a1a] to-[#0a0a0a]",
      result: "Used by 500+ Creative Teams",
      tags: ["SaaS", "Productivity", "Web App"],
      desc: "Project management tool designed specifically for creative agencies and studios.",
      categories: ["SAAS", "WEB APP"],
      metric: "500+ teams"
    }
  ];

  const filteredProjects = uiuxProjects;

  const StatItem = ({ number, label, suffix = "" }: { number: number, label: string, suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
      if (inView) {
        let start = 0;
        const duration = 2000;
        const increment = number / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= number) {
            setCount(number);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        return () => clearInterval(timer);
      }
    }, [inView, number]);

    return (
      <div ref={ref} className="flex flex-col items-center">
        <div className="text-4xl lg:text-6xl font-serif text-gold mb-2">
          {count}{suffix}
        </div>
        <div className="text-[10px] text-white/50 uppercase tracking-[0.3em]">{label}</div>
      </div>
    );
  };

  const UIMockupArt = ({ type }: { type: string }) => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none p-6 opacity-60">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-6 bg-white/10 rounded-sm w-full mb-6 flex items-center px-4 gap-2"
        >
          <div className="w-3 h-3 rounded-full bg-white/20" />
          <div className="w-12 h-1.5 bg-white/20 rounded-full" />
          <div className="ml-auto flex gap-1.5">
            <div className="w-6 h-1.5 bg-white/20 rounded-full" />
            <div className="w-6 h-1.5 bg-white/20 rounded-full" />
          </div>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
             animate={{ y: [0, -15, 0] }}
             transition={{ duration: 5 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
             className="aspect-[4/3] bg-white/5 rounded-sm p-3 border border-white/5"
          >
            <div className="w-full h-1/2 bg-white/10 rounded-sm mb-3" />
            <div className="w-3/4 h-1.5 bg-white/10 rounded-full mb-2" />
            <div className="w-1/2 h-1.5 bg-white/10 rounded-full" />
          </motion.div>
          <motion.div 
             animate={{ y: [0, -20, 0] }}
             transition={{ duration: 6 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="aspect-square bg-white/5 rounded-sm p-3 border border-white/5"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 mb-3" />
            <div className="w-full h-1.5 bg-white/10 rounded-full mb-2" />
            <div className="w-3/4 h-1.5 bg-white/10 rounded-full" />
          </motion.div>
        </div>

        <motion.div 
          animate={{ scale: [1, 1.05, 1] }} 
          transition={{ duration: 8, repeat: Infinity }}
          className="mt-6 h-20 bg-white/5 rounded-sm p-4 border border-white/5"
        >
          <div className="flex justify-between items-center mb-4">
             <div className="w-20 h-2 bg-white/10 rounded-full" />
             <div className="w-4 h-4 rounded-full bg-white/10" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-white/10 rounded-sm" />
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-gold selection:text-black">
      {/* SECTION 1 — PAGE HERO */}
      <section className="relative h-[90vh] flex flex-col justify-center items-center px-6 lg:px-12 overflow-hidden bg-black pt-20">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center opacity-[0.04] pointer-events-none select-none overflow-hidden">
          <h1 className="text-[30vw] font-serif thin tracking-tight leading-none whitespace-nowrap">UI / UX</h1>
        </div>
        
        <div className="max-w-[1800px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-gold font-sans font-bold text-[9px] lg:text-[11px] uppercase tracking-[0.5em] mb-8 block px-4">
              Selected Work · UI/UX Design & Development
            </span>
          </motion.div>
          
          <div className="overflow-hidden mb-8 mt-[400px]">
            <motion.h2 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl md:text-[148px] lg:text-[148px] font-serif leading-[148px] tracking-tighter"
            >
              Screens that make <br /> people <span className="italic text-gold italic-serif">feel</span> something.
            </motion.h2>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-white/50 text-sm lg:text-lg max-w-2xl mx-auto mb-16 leading-relaxed px-6"
          >
            Every project here went through the same process: deep research, intentional design, obsessive refinement.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-12 lg:gap-24"
          >
            <StatItem number={18} label="UI/UX Projects Delivered" suffix="+" />
            <StatItem number={5} label="End Users Reached" suffix="M+" />
          </motion.div>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
            className="absolute -bottom-20 left-0 w-full h-px bg-gold/20 origin-left"
          />
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center gap-4 text-white/30"
        >
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [-48, 48] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-[50%] bg-gold"
            />
          </div>
        </motion.div>
      </section>


      {/* SECTION 3 — FEATURED PROJECT */}
      <section className="py-32 px-6 lg:px-12 bg-black overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            {/* Left Mockup Display */}
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="lg:w-3/5 relative aspect-square lg:aspect-video rounded-sm overflow-hidden p-8 lg:p-16 bg-[#0a0a0a] border border-white/5 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] to-[#0d3d3d] opacity-40" />
              
              <div className="relative h-full w-full flex items-center justify-center">
                 {/* CSS Laptop Mockup */}
                 <div className="relative w-[85%] aspect-[16/10] bg-zinc-900 rounded-lg p-2 shadow-2xl border border-white/10 z-10">
                    <div className="absolute inset-2 bg-[#0d0d0d] rounded-sm overflow-hidden border border-white/5">
                        <UIMockupArt type="dashboard" />
                    </div>
                 </div>
                 {/* CSS Mobile Mockup Overlap */}
                 <div className="absolute -bottom-10 right-10 w-[20%] aspect-[9/16] bg-zinc-900 rounded-xl p-1.5 shadow-2xl border border-white/10 z-20 hidden lg:block">
                    <div className="absolute inset-1.5 bg-[#0d0d0d] rounded-lg overflow-hidden border border-white/5">
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/50 to-black" />
                        <div className="p-3">
                           <div className="w-6 h-6 rounded-full bg-white/10 mb-4" />
                           <div className="space-y-2">
                             <div className="w-full h-1 bg-white/10 rounded-full" />
                             <div className="w-3/4 h-1 bg-white/10 rounded-full" />
                           </div>
                        </div>
                    </div>
                 </div>
              </div>
            </motion.div>

            {/* Right Details */}
            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="lg:w-2/5"
            >
              <span className="text-gold font-sans font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Featured Project · 2024</span>
              <h3 className="text-6xl lg:text-8xl font-serif text-white mb-6 tracking-tighter">PULSE</h3>
              <p className="text-white/40 text-xs font-sans uppercase tracking-[0.3em] font-medium mb-8">Fintech Dashboard Redesign</p>
              
              <p className="text-white/60 text-lg font-sans font-light leading-relaxed mb-12 italic">
                A complete product redesign for NovaPay, a fintech platform serving 2 million users. We rebuilt their dashboard experience from zero — research, strategy, UI design, and front-end delivery.
              </p>

              <div className="grid grid-cols-2 gap-10 mb-12">
                 <div className="space-y-2">
                    <div className="text-3xl font-serif text-white">↑ 40<span className="text-gold font-sans text-xl">%</span></div>
                    <div className="text-[9px] uppercase tracking-widest text-white/40">User Retention</div>
                 </div>
                 <div className="space-y-2">
                    <div className="text-3xl font-serif text-white">↓ 60<span className="text-gold font-sans text-xl">%</span></div>
                    <div className="text-[9px] uppercase tracking-widest text-white/40">Support Tickets</div>
                 </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-12">
                {['Fintech', 'Dashboard', 'Web App', 'Redesign'].map(tag => (
                  <span key={tag} className="text-[9px] uppercase tracking-widest text-white/30 border border-white/10 px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>

              <button className="text-xs font-sans font-bold uppercase tracking-widest text-gold border border-gold/30 px-10 py-5 rounded-full hover:bg-gold hover:text-black transition-all duration-500">
                View Full Case Study →
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — MAIN PROJECT GRID */}
      <section className="py-32 px-6 lg:px-12 bg-black">
        <div className="max-w-[1800px] mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl lg:text-6xl font-serif text-white uppercase tracking-tighter inline-block relative">
              All UI/UX Projects
              <motion.div 
                whileInView={{ width: "100%" }}
                initial={{ width: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute -bottom-2 left-0 h-0.5 bg-gold origin-left"
              />
            </h2>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            <AnimatePresence>
              {filteredProjects.map((project, i) => (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  data-cursor="view"
                >
                  {/* Image Area */}
                  <div className="aspect-[4/5] bg-[#0d0d0d] rounded-sm overflow-hidden mb-6 relative border border-white/5">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 transition-transform duration-1000 ease-out group-hover:scale-110`} />
                    <UIMockupArt type="card" />
                    
                    <div className="absolute top-6 left-6">
                      <span className="text-[8px] font-sans font-bold uppercase tracking-widest text-black bg-gold px-2 py-1 rounded-sm">
                        {project.type.split('·')[0].trim()}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm flex items-center justify-center">
                       <span className="text-gold text-xs font-bold uppercase tracking-[0.4em]">View Project →</span>
                    </div>
                    
                    <div className="absolute inset-0 border border-transparent group-hover:border-gold/30 transition-colors pointer-events-none" />
                  </div>

                  {/* Details Area */}
                  <div className="p-2 transition-transform duration-500 group-hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                         <h4 className="text-2xl font-serif text-white group-hover:text-gold transition-colors mb-2">{project.title}</h4>
                         <span className="text-[9px] uppercase tracking-widest text-gold font-bold">{project.client}</span>
                       </div>
                       <span className="text-xs font-serif italic text-white/30">{project.year}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                       {project.tags.slice(0, 3).map(tag => (
                         <span key={tag} className="text-[8px] uppercase tracking-widest text-white/30 border border-white/10 px-2 py-0.5 rounded-full">{tag}</span>
                       ))}
                    </div>

                    <div className="flex items-center gap-2 text-gold">
                       <Star size={10} className="fill-gold" />
                       <span className="text-[10px] font-sans font-bold uppercase tracking-wider">{project.metric}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — CASE STUDY SPOTLIGHT */}
      <section className="py-32 px-6 lg:px-12 bg-[#050505]">
        <div className="max-w-[1800px] mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl lg:text-5xl font-serif text-white inline-block relative">
              Deep Dive
              <motion.div 
                whileInView={{ width: "100%" }}
                initial={{ width: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute -bottom-2 left-0 h-px bg-gold origin-left"
              />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
             <motion.div 
               whileHover={{ translateY: -10 }}
               className="group relative h-[500px] rounded-sm overflow-hidden cursor-pointer"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] to-[#0d3d3d] opacity-60" />
                <UIMockupArt type="full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                   <h4 className="text-4xl font-serif text-white mb-2">PULSE</h4>
                   <p className="text-gold font-sans font-bold text-xs uppercase tracking-widest mb-6">↑ 40% User Retention</p>
                   <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 group-hover:gap-4 transition-all">
                     Read Case Study <ArrowRight size={14} />
                   </span>
                </div>
                <div className="absolute inset-0 border border-white/5 group-hover:border-gold/30 transition-colors pointer-events-none" />
             </motion.div>

             <motion.div 
               whileHover={{ translateY: -10 }}
               className="group relative h-[500px] rounded-sm overflow-hidden cursor-pointer"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f0f] opacity-60" />
                <UIMockupArt type="mobile" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                   <h4 className="text-4xl font-serif text-white mb-2">ORBIT</h4>
                   <p className="text-gold font-sans font-bold text-xs uppercase tracking-widest mb-6">4.9★ App Store Rating</p>
                   <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 group-hover:gap-4 transition-all">
                     Read Case Study <ArrowRight size={14} />
                   </span>
                </div>
                <div className="absolute inset-0 border border-white/5 group-hover:border-gold/30 transition-colors pointer-events-none" />
             </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — PROCESS TEASER */}
      <section className="py-20 px-6 lg:px-12 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
           <div>
              <span className="text-gold font-sans font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Wondering how we get here?</span>
              <h3 className="text-3xl lg:text-4xl font-serif text-white">Every project follows the <span className="italic-serif text-gold italic">same standard.</span></h3>
           </div>
           <button 
             onClick={() => navigateTo('process')}
             className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.4em] text-gold group"
           >
             See Our Process <ArrowRight size={18} className="group-hover:translate-x-2 transition-all" />
           </button>
        </div>
      </section>

      {/* SECTION 7 — TOOLS & TECHNOLOGIES */}
      <section className="py-32 px-6 lg:px-12 bg-black">
        <div className="max-w-[800px] mx-auto text-center">
           <span className="text-gold font-sans font-bold text-[10px] uppercase tracking-[0.5em] mb-12 block">How We Build</span>
           
           <div className="space-y-16">
              <div>
                 <p className="text-white/30 text-[9px] uppercase tracking-widest mb-8">Design Tools</p>
                 <div className="flex flex-wrap justify-center gap-3">
                   {['Figma', 'Adobe XD', 'Principle', 'Framer', 'Zeplin', 'InVision', 'Sketch', 'Adobe Illustrator'].map((tool, i) => (
                     <motion.span 
                       key={tool}
                       initial={{ opacity: 0, scale: 0.9 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       transition={{ delay: i * 0.05 }}
                       viewport={{ once: true }}
                       className="px-6 py-2 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/60 hover:border-gold hover:text-gold transition-all duration-300 cursor-default"
                     >
                        {tool}
                     </motion.span>
                   ))}
                 </div>
              </div>

              <div>
                 <p className="text-white/30 text-[9px] uppercase tracking-widest mb-8">Development</p>
                 <div className="flex flex-wrap justify-center gap-3">
                   {['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'GSAP', 'Webflow', 'Framer Motion'].map((tool, i) => (
                     <motion.span 
                       key={tool}
                       initial={{ opacity: 0, scale: 0.9 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       transition={{ delay: i * 0.05 + 0.4 }}
                       viewport={{ once: true }}
                       className="px-6 py-2 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/60 hover:border-gold hover:text-gold transition-all duration-300 cursor-default"
                     >
                        {tool}
                     </motion.span>
                   ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* SECTION 8 — START A UI/UX PROJECT CTA */}
      <section className="py-40 px-6 lg:px-12 bg-black relative overflow-hidden text-center">
         <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />
         <motion.div 
            animate={{ opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.1)_0,transparent_70%)]"
         />
         
         <div className="max-w-[1800px] mx-auto relative z-10">
            <span className="text-gold font-sans font-bold text-[10px] uppercase tracking-[0.5em] mb-10 block">Ready to Build Something?</span>
            
            <h2 className="text-6xl lg:text-[7rem] font-serif text-white mb-10 leading-[0.9] tracking-tighter">
               Your digital product <br /> deserves <span className="italic-serif text-gold italic">this</span> standard.
            </h2>

            <p className="text-white/40 text-lg max-w-2xl mx-auto mb-16 leading-relaxed font-light italic px-6">
              "We take on a limited number of UI/UX projects each quarter to ensure full attention and quality."
            </p>

            <div className="mb-16 inline-flex items-center gap-3 px-6 py-2 border border-gold/20 rounded-full bg-gold/5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-gold">Accepting UI/UX Projects · Q2 2025</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <button 
                 onClick={() => navigateTo('onboarding')}
                 className="bg-gold text-black px-12 py-6 rounded-full text-xs font-sans font-bold uppercase tracking-widest border border-gold hover:bg-transparent hover:text-gold transition-all duration-500 shadow-[0_0_30px_rgba(201,168,76,0.3)]"
               >
                 Start a UI/UX Project
               </button>
               <button 
                 onClick={() => navigateTo('process')}
                 className="px-12 py-6 rounded-full text-xs font-sans font-bold uppercase tracking-widest border border-white/20 text-white hover:border-gold hover:text-gold transition-all duration-500"
               >
                 See Our Process
               </button>
            </div>
         </div>
      </section>
    </div>
  );
};

const PhotographyWorkPage = ({ navigateTo }: { navigateTo: (v: AppView) => void }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState(1);
  const [lightboxPan, setLightboxPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [toasts, setToasts] = useState<{ id: number, text: string }[]>([]);

  const addToast = (text: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, text }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2500);
  };

  const photographyImages = [
    { id: 1, name: "LUMIÈRE", cat: "Luxury Skincare", year: "2024", grad: "linear-gradient(135deg,#2a1800 15%,#1a0c00 50%,#0a0500 100%)" },
    { id: 2, name: "FRAGMENT", cat: "Fashion Editorial", year: "2024", grad: "linear-gradient(160deg,#2a0f18 10%,#1a0810 55%,#0a0005 100%)" },
    { id: 3, name: "FORMA", cat: "Tech Accessories", year: "2024", grad: "linear-gradient(120deg,#0f1825 20%,#0a1020 60%,#05080f 100%)" },
    { id: 4, name: "ECLIPSE", cat: "Fine Jewellery", year: "2024", grad: "linear-gradient(145deg,#1f1800 15%,#140f00 50%,#0a0900 100%)" },
    { id: 5, name: "TERRA", cat: "Wellness Products", year: "2024", grad: "linear-gradient(130deg,#0f1a05 20%,#0a1200 55%,#060d00 100%)" },
    { id: 6, name: "BLOOM", cat: "Beauty & Cosmetics", year: "2025", grad: "linear-gradient(155deg,#1f0510 10%,#140010 50%,#0a0008 100%)" },
    { id: 7, name: "STARK", cat: "Menswear Editorial", year: "2025", grad: "linear-gradient(125deg,#0a1020 20%,#08101a 55%,#050810 100%)" },
    { id: 8, name: "VESSEL", cat: "Ceramics & Homeware", year: "2025", grad: "linear-gradient(140deg,#1a1a0a 15%,#121205 50%,#0a0a00 100%)" },
    { id: 9, name: "CARBON", cat: "Automotive Parts", year: "2025", grad: "linear-gradient(135deg,#141414 20%,#0f0f0f 55%,#080808 100%)" },
    { id: 10, name: "SOLSTICE", cat: "Luxury Fashion", year: "2024", grad: "linear-gradient(150deg,#1a1008 15%,#120a05 50%,#0a0500 100%)" },
    { id: 11, name: "REVERIE", cat: "Editorial Creative", year: "2024", grad: "linear-gradient(120deg,#0f0520 15%,#0a0318 55%,#060010 100%)" },
    { id: 12, name: "ICON", cat: "Sportswear Campaign", year: "2024", grad: "linear-gradient(145deg,#050520 15%,#030318 50%,#020010 100%)" },
    { id: 13, name: "FORGE", cat: "Watches & Lux", year: "2025", grad: "linear-gradient(130deg,#1a1205 20%,#120d00 55%,#0a0800 100%)" },
    { id: 14, name: "DUSK", cat: "Lifestyle Outdoor", year: "2024", grad: "linear-gradient(140deg,#181f05 15%,#101500 50%,#0a0f00 100%)" },
    { id: 15, name: "EPOCH", cat: "Model Portrait", year: "2025", grad: "linear-gradient(155deg,#1f1a08 10%,#141205 50%,#0a0a00 100%)" },
    { id: 16, name: "GROWTH", cat: "Nature Organic", year: "2025", grad: "linear-gradient(125deg,#0a1f0a 20%,#061508 55%,#040d04 100%)" },
    { id: 17, name: "BLUSH", cat: "Beauty Portrait", year: "2025", grad: "linear-gradient(145deg,#1f0a1f 15%,#140514 50%,#0a000a 100%)" },
    { id: 18, name: "LEATHER", cat: "Premium Goods", year: "2024", grad: "linear-gradient(135deg,#1a0f00 20%,#120a00 55%,#0a0600 100%)" },
    { id: 19, name: "STRUCT", cat: "Architectural", year: "2025", grad: "linear-gradient(130deg,#001f1f 15%,#001414 50%,#000d0d 100%)" },
    { id: 20, name: "MODA", cat: "Model Editorial", year: "2024", grad: "linear-gradient(150deg,#200015 15%,#150010 50%,#0d0008 100%)" },
    { id: 21, name: "PULSE", cat: "Product Dynamic", year: "2025", grad: "linear-gradient(120deg,#0a1f1f 20%,#061515 55%,#040d0d 100%)" },
    { id: 22, name: "CLAY", cat: "Handcrafted", year: "2025", grad: "linear-gradient(140deg,#1f1200 15%,#140c00 50%,#0a0800 100%)" },
    { id: 23, name: "NIGHT", cat: "Creative Campaign", year: "2024", grad: "linear-gradient(145deg,#0f0f20 15%,#0a0a18 50%,#060610 100%)" },
    { id: 24, name: "AMBER", cat: "Editorial Gold", year: "2025", grad: "linear-gradient(135deg,#1f1f00 20%,#141400 55%,#0a0a00 100%)" },
    { id: 25, name: "RUNWAY", cat: "Fashion Show", year: "2025", grad: "linear-gradient(155deg,#00001f 15%,#000015 50%,#00000f 100%)" },
    { id: 26, name: "MINT", cat: "Flat Lay Product", year: "2025", grad: "linear-gradient(125deg,#1f1f0a 20%,#141405 55%,#0a0a00 100%)" },
    { id: 27, name: "INDIGO", cat: "Atmospheric", year: "2025", grad: "linear-gradient(140deg,#0a0a1f 15%,#060618 50%,#030310 100%)" },
    { id: 28, name: "DRAMA", cat: "Portrait Dramatic", year: "2025", grad: "linear-gradient(150deg,#1f0000 15%,#140000 50%,#0a0000 100%)" },
    { id: 29, name: "WILD", cat: "Outdoor Campaign", year: "2025", grad: "linear-gradient(130deg,#001f00 20%,#001400 55%,#000d00 100%)" },
    { id: 30, name: "GOLD II", cat: "Luxury Commercial", year: "2024", grad: "linear-gradient(145deg,#1f1500 15%,#140f00 50%,#0a0a00 100%)" },
  ];

  const handleDownload = () => {
    if (activeImageIndex === null) return;
    const project = photographyImages[activeImageIndex];
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 1920, 1080);
      // Rough parse of the gradient for download
      gradient.addColorStop(0, '#1f1500');
      gradient.addColorStop(1, '#0a0a00');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const link = document.createElement('a');
      link.download = `${project.name.toLowerCase()}-photography.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      addToast("Image downloading...");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast("Link copied to clipboard!");
  };

  const getGridSpan = (index: number) => {
    const r = index % 13;
    if (r === 0 || r === 1 || r === 2) return "col-span-12 md:col-span-4";
    if (r === 3) return "col-span-12 md:col-span-7";
    if (r === 4) return "col-span-12 md:col-span-5";
    if (r >= 5 && r <= 8) return "col-span-12 md:col-span-3";
    if (r === 9) return "col-span-12"; // Panoramic
    if (r === 10 || r === 11 || r === 12) return "col-span-12 md:col-span-4";
    return "col-span-12";
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') setActiveImageIndex(prev => (prev! + 1) % photographyImages.length);
      if (e.key === 'ArrowLeft') setActiveImageIndex(prev => (prev! - 1 + photographyImages.length) % photographyImages.length);
      if (e.key === '+') setLightboxZoom(z => Math.min(4, z + 0.25));
      if (e.key === '-') setLightboxZoom(z => Math.max(0.25, z - 0.25));
      if (e.key === '0') { setLightboxZoom(1); setLightboxPan({ x: 0, y: 0 }); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex]);

  return (
    <div className="bg-black min-h-screen selection:bg-gold selection:text-black">
      {/* SECTION 1 — HERO */}
      <section className="relative h-screen flex flex-col justify-center px-6 lg:px-24 overflow-hidden pt-20">
        <div className="max-w-[1800px] mx-auto w-full relative z-10 text-center flex flex-col items-center">
          <div className="flex items-baseline justify-center gap-4 mb-2 overflow-hidden">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif italic font-extralight text-3xl lg:text-5xl text-white/60"
            >
              Our
            </motion.span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-serif italic text-2xl lg:text-4xl text-gold"
            >
              Visual Stories in Motion
            </motion.span>
          </div>
          
          <div className="overflow-hidden mb-6">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="text-[clamp(70px,13vw,200px)] font-sans font-extrabold text-white leading-[0.8] tracking-[-0.05em] uppercase"
            >
              Photography
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-4 text-[10px] text-white/40 font-sans font-bold uppercase tracking-[0.5em]"
          >
            <span>Product</span> · <span>Model</span> · <span>Editorial</span> · <span>Campaign</span> · <span>Lookbook</span>
          </motion.div>
        </div>

        {/* FLOATING IMAGE CLUSTER */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          {/* Image 1: Top Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="absolute top-[10%] right-[10%] w-[380px] h-[280px] pointer-events-auto cursor-pointer group"
            onClick={() => setActiveImageIndex(0)}
          >
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full rounded-xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.6)] rotate-[3deg] group-hover:rotate-0 transition-transform duration-700"
              style={{ background: photographyImages[0].grad }}
            >
              <div className="absolute inset-0 bg-white/5 mix-blend-overlay opacity-20 pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* Image 2: Bottom Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="absolute bottom-[10%] right-[25%] w-[260px] h-[360px] pointer-events-auto cursor-pointer group"
            onClick={() => setActiveImageIndex(1)}
          >
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full rounded-xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.6)] rotate-[-2.5deg] group-hover:rotate-0 transition-transform duration-700"
              style={{ background: photographyImages[1].grad }}
            />
          </motion.div>


          {/* Image 4: Bottom Left */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.6 }}
            className="absolute bottom-[5%] left-[15%] w-[300px] h-[190px] pointer-events-auto cursor-pointer group"
            onClick={() => setActiveImageIndex(3)}
          >
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full rounded-xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.6)] rotate-[-1.2deg] group-hover:rotate-0 transition-transform duration-700"
              style={{ background: photographyImages[3].grad }}
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — TITLE STRIP */}
      <section className="py-20 px-6 lg:px-24 border-t border-white/5">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex flex-col md:flex-row items-baseline gap-4">
             <span className="text-gold font-serif italic text-xl">Visuals that speak</span>
             <h2 className="text-white font-serif text-5xl lg:text-7xl tracking-tighter">our photography</h2>
          </div>
        </div>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-px bg-gold w-full mt-12 origin-left"
        />
      </section>

      {/* SECTION 3 — PHOTOGRAPHY GRID */}
      <section className="bg-black pb-40">
        <div className="grid grid-cols-12 gap-[6px] bg-black">
          {photographyImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className={`${getGridSpan(i)} relative overflow-hidden group cursor-pointer aspect-auto min-h-[220px] md:min-h-[280px]`}
              onClick={() => setActiveImageIndex(i)}
              style={{ minHeight: i % 10 === 9 ? '400px' : '' }}
            >
              <div 
                className="absolute inset-0 transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                style={{ background: img.grad }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — CLOSING CTA */}
      <section className="py-40 px-6 lg:px-24 bg-[#050505]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
            <div className="text-center lg:text-left">
               <h2 className="text-5xl lg:text-8xl font-serif text-white leading-none tracking-tighter mb-8">
                 Ready to bring your <br /> vision to <span className="italic text-gold italic-serif">life?</span>
               </h2>
               <p className="text-white/40 text-lg lg:text-xl font-sans font-light uppercase tracking-widest mb-12">Contact ADKO today!</p>
               
               <button 
                 onClick={() => { navigateTo('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
                 className="inline-flex items-center gap-4 px-12 py-6 border border-gold text-white text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all duration-500 rounded-sm"
               >
                 Get in Touch <ArrowRight size={18} />
               </button>
               <p className="mt-8 text-white/30 text-[10px] uppercase tracking-widest">We respond within 24 hours. Always.</p>
            </div>

            <motion.div 
               whileHover={{ rotate: 0 }}
               className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl rotate-1 transition-transform duration-700 hidden lg:block"
            >
               <div className="absolute inset-0 bg-gradient-to-br from-[#2a1800] to-[#0a0500]" />
               <div className="absolute inset-0 bg-black/20" />
            </motion.div>
         </div>
      </section>

      {/* LIGHTBOX SYSTEM */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col pt-14 pb-20 overflow-hidden"
          >
            {/* Toolbar */}
            <div className="absolute top-0 left-0 right-0 h-14 bg-black/70 flex items-center justify-between px-6 z-50">
              <div className="flex items-center gap-4">
                <span className="text-white text-[10px] font-sans font-bold uppercase tracking-widest">
                  {activeImageIndex + 1} / {photographyImages.length}
                </span>
                <span className="text-gold text-[10px] font-sans uppercase tracking-[0.2em] hidden sm:block">
                  {photographyImages[activeImageIndex].name} · {photographyImages[activeImageIndex].cat}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { label: "Zoom In", icon: <Plus size={16} />, onClick: () => setLightboxZoom(prev => Math.min(4, prev + 0.25)) },
                  { label: "Zoom Out", icon: <Minus size={16} />, onClick: () => setLightboxZoom(prev => Math.max(0.25, prev - 0.25)) },
                  { label: "Reset", icon: <Maximize2 size={16} />, onClick: () => { setLightboxZoom(1); setLightboxPan({ x: 0, y: 0 }); } },
                  { label: "Download", icon: <Download size={16} />, onClick: handleDownload },
                  { label: "Share", icon: <Share2 size={16} />, onClick: handleShare },
                  { label: "Close", icon: <X size={20} />, onClick: () => setActiveImageIndex(null), className: "ml-4 bg-gold/10 text-gold" }
                ].map((btn, idx) => (
                  <button
                    key={idx}
                    title={btn.label}
                    onClick={btn.onClick}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-gold/20 text-white transition-all ${btn.className}`}
                  >
                    {btn.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Image Area */}
            <div 
              className="flex-1 relative flex items-center justify-center overflow-hidden touch-none"
              onMouseDown={(e) => {
                if (lightboxZoom > 1) {
                  setIsDragging(true);
                  setDragStart({ x: e.clientX - lightboxPan.x, y: e.clientY - lightboxPan.y });
                }
              }}
              onMouseMove={(e) => {
                if (isDragging && lightboxZoom > 1) {
                  setLightboxPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
                }
              }}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onWheel={(e) => {
                 if (e.deltaY < 0) setLightboxZoom(prev => Math.min(4, prev + 0.1));
                 else setLightboxZoom(prev => Math.max(0.25, prev - 0.1));
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.95, x: 50 }}
                  animate={{ 
                    opacity: 1, 
                    scale: lightboxZoom, 
                    x: lightboxPan.x, 
                    y: lightboxPan.y 
                  }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[90vw] h-full max-h-[80vh] rounded-lg shadow-2xl relative"
                  style={{ background: photographyImages[activeImageIndex].grad, cursor: lightboxZoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in' }}
                  onDoubleClick={() => {
                    if (lightboxZoom === 1) setLightboxZoom(2);
                    else { setLightboxZoom(1); setLightboxPan({ x: 0, y: 0 }); }
                  }}
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button 
                onClick={() => { setActiveImageIndex(prev => (prev! - 1 + photographyImages.length) % photographyImages.length); setLightboxZoom(1); setLightboxPan({ x: 0, y: 0 }); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold/20 hover:border-gold hover:text-gold transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => { setActiveImageIndex(prev => (prev! + 1) % photographyImages.length); setLightboxZoom(1); setLightboxPan({ x: 0, y: 0 }); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold/20 hover:border-gold hover:text-gold transition-all"
              >
                <ChevronRight size={24} />
              </button>

              {/* Zoom Indicator */}
              {lightboxZoom !== 1 && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/80 text-gold text-[10px] font-bold px-4 py-1.5 rounded-full border border-gold/20">
                  {Math.round(lightboxZoom * 100)}%
                </div>
              )}
            </div>

            {/* Bottom Thumbnail Strip */}
            <div className="h-20 bg-black/70 border-t border-white/5 flex items-center px-4 gap-2 overflow-x-auto no-scrollbar">
              {photographyImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => { setActiveImageIndex(idx); setLightboxZoom(1); setLightboxPan({ x: 0, y: 0 }); }}
                  className={`min-w-[70px] h-[50px] rounded-md transition-all ${activeImageIndex === idx ? 'border-2 border-gold brightness-125 scale-105' : 'opacity-40 hover:opacity-100'}`}
                  style={{ background: img.grad }}
                />
              ))}
            </div>

            {/* Toasts */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
              <AnimatePresence>
                {toasts.map(toast => (
                  <motion.div
                    key={toast.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-black/90 text-gold text-xs font-bold px-6 py-3 rounded-full border border-gold/20 shadow-xl"
                  >
                    {toast.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const CapabilityCard = ({ title, desc }: { title: string, desc: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ translateY: -6 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-[#0d0d0d] p-10 border-t-2 border-gold/20 hover:border-gold hover:shadow-[0_0_30px_rgba(201,168,76,0.1)] transition-all duration-500 group"
  >
     <div className="w-12 h-12 mb-8 border border-gold/10 rounded-sm rotate-45 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
        <div className="w-3 h-3 bg-gold/30" />
     </div>
     <h3 className="text-2xl font-serif text-white mb-6 group-hover:text-gold transition-colors">{title}</h3>
     <p className="text-white/40 text-[11px] font-sans font-light tracking-[0.1em] leading-relaxed italic">
        {desc}
     </p>
  </motion.div>
);

const VideographyWorkPage = ({ navigateTo }: { navigateTo: (v: AppView) => void }) => {
  const videographyProjects = [
    { title: "NEBULA", cat: "Brand Film", year: "2024", grad: "linear-gradient(135deg,#000000 0%,#000044 100%)", desc: "A cinematic exploration of space and time." },
    { title: "KINETIC", cat: "Sports Campaign", year: "2024", grad: "linear-gradient(135deg,#111111 0%,#cc0000 100%)", desc: "Dynamic visuals for a high-performance activewear brand." },
    { title: "HORIZON", cat: "Travel Documentary", year: "2023", grad: "linear-gradient(135deg,#002200 0%,#000000 100%)", desc: "Capturing the raw beauty of the Himalayas." },
    { title: "PULSE", cat: "Music Video", year: "2025", grad: "linear-gradient(135deg,#330033 0%,#000000 100%)", desc: "Electronic beats meet neon aesthetics." },
  ];

  return (
    <div className="bg-black min-h-screen text-white pt-32 px-6 lg:px-24">
      <div className="max-w-[1800px] mx-auto text-center flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 flex flex-col items-center"
        >
          <span className="text-gold font-sans font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Selected Work</span>
          <h1 className="text-6xl md:text-9xl font-serif tracking-tighter leading-none mb-6">Videography</h1>
          <p className="text-white/40 text-lg max-w-xl font-sans font-light italic mx-auto">
            Cinematic narratives that bring brands to life. Every frame tells a story.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-40">
          {videographyProjects.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-video relative rounded-lg overflow-hidden border border-white/5 mb-6">
                <div 
                  className="absolute inset-0 group-hover:scale-105 transition-transform duration-1000"
                  style={{ background: v.grad }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full border border-gold flex items-center justify-center bg-gold/10">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-gold border-b-[8px] border-b-transparent translate-x-1" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-serif mb-1 group-hover:text-gold transition-colors">{v.title}</h3>
                  <p className="text-xs text-white/40 uppercase tracking-widest">{v.cat} · {v.year}</p>
                </div>
                <p className="text-[10px] text-white/30 italic max-w-[200px] text-right">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProcessFullPage = ({ navigateTo }: { navigateTo: AppView | any }) => {
  const steps = [
    { id: "01", name: "Discovery", desc: "Immersion into your brand's core DNA." },
    { id: "02", name: "Strategy", desc: "Architecting the visual narrative." },
    { id: "03", name: "Concept", desc: "Where ideas become tangible." },
    { id: "04", name: "Design & Production", desc: "Execution at the highest level." },
    { id: "05", name: "Refinement", desc: "We obsess so you don't have to." },
    { id: "06", name: "Delivery & Support", desc: "The handover is as important as the work." },
  ];

  const stageDetails = [
    {
      id: "01",
      name: "Discovery",
      tagline: "We listen before we create.",
      description: "Every great project begins with understanding. In this stage, we go deep into your business, your audience, your competitors, and your goals. We ask the questions no one else asks — and we actually listen to the answers. Discovery is where we align on what success looks like before a single pixel is designed or a single photo is taken.",
      deliverables: [
        "Discovery Workshop (2-3 hour session)",
        "Competitor & Market Analysis Report",
        "Audience Persona Documentation",
        "Project Goals & Success Metrics Document",
        "Signed Project Brief & Timeline"
      ],
      duration: "1–2 Weeks",
      expect: [
        "An in-depth kickoff call or workshop with key stakeholders",
        "A detailed questionnaire covering brand, goals, and audience",
        "Full written brief delivered for your review and approval"
      ]
    },
    {
      id: "02",
      name: "Strategy",
      tagline: "Every decision earns its place.",
      description: "With discovery complete, we build the strategic foundation your project sits on. This is where we define the creative direction, the messaging hierarchy, the visual language, and the technical architecture. Strategy is the invisible layer that makes everything else work — it's why our work performs as well as it looks.",
      deliverables: [
        "Creative Strategy Document",
        "Visual Direction Moodboard (3 directions)",
        "Content & Messaging Framework",
        "Technical Scope & Architecture Plan",
        "Revised Timeline & Milestone Map"
      ],
      duration: "1–2 Weeks",
      expect: [
        "Presentation of 3 creative directions for your feedback",
        "A collaborative session to align on the chosen direction",
        "Final strategy document signed off before work begins"
      ]
    },
    {
      id: "03",
      name: "Concept",
      tagline: "Where ideas become tangible.",
      description: "This is where creativity meets structure. Based on the approved strategy, we develop initial concepts — rough but intentional. For UI/UX projects this means early wireframes and user flows. For branding, it means logo sketches and identity concepts. For photography, it means shot lists, mood boards, and location scouting. Concept stage is fast, exploratory, and deeply collaborative.",
      deliverables: [
        "Initial Concept Presentation (2–3 concepts)",
        "Wireframes or Sketches (where applicable)",
        "Moodboard & Visual References",
        "Shot List & Creative Direction (for photography)",
        "Client Feedback & Revision Round"
      ],
      duration: "1–2 Weeks",
      expect: [
        "A presentation call walking through each concept in detail",
        "One structured round of feedback and revisions",
        "Sign-off on a single direction before production begins"
      ]
    },
    {
      id: "04",
      name: "Design & Production",
      tagline: "Execution at the highest level.",
      description: "This is the longest and most intensive stage — where the approved concept becomes real. For UI/UX, we move from wireframes to high-fidelity designs and then to working code. For photography, we execute the shoot with full creative direction, styling, and on-site production. For branding, we build the complete identity system across every touchpoint. This stage is where most agencies cut corners. We do not.",
      deliverables: [
        "High-Fidelity Designs or Production Files",
        "Working Prototypes (UI/UX projects)",
        "Edited & Retouched Final Images (photography)",
        "Complete Brand Asset Library (branding)",
        "Progress Updates Every 3 Days",
        "Mid-Production Review Session"
      ],
      duration: "2–6 Weeks (depending on project scope)",
      expect: [
        "Regular progress previews shared via private link",
        "A mid-production check-in call at the halfway point",
        "All files organized and labeled for easy handover"
      ]
    },
    {
      id: "05",
      name: "Refinement",
      tagline: "We obsess so you don't have to.",
      description: "Before anything is delivered, it goes through our internal refinement process. We review every detail against the original brief and strategy. Then we present to you for structured feedback. This stage exists because we believe the difference between good and extraordinary lives in the 5% most people rush past. We don't rush past it.",
      deliverables: [
        "Final Presentation of All Work",
        "Two Structured Revision Rounds",
        "Quality Assurance Review (UI/UX: cross-device testing)",
        "Final Client Sign-Off Document",
        "Preparation of All Delivery Files"
      ],
      duration: "1–2 Weeks",
      expect: [
        "A formal presentation of all final work in a live session",
        "Two rounds of revisions included (additional rounds quoted separately)",
        "Nothing is delivered until you are completely satisfied"
      ]
    },
    {
      id: "06",
      name: "Delivery & Support",
      tagline: "The handover is as important as the work.",
      description: "Final delivery is not just dropping files in a folder. We hand over everything organized, documented, and ready to use. For UI/UX, this means deployed code or developer handover files with full documentation. For photography, this means a full asset library with usage guidelines. For branding, this means a complete brand guidelines document your entire team can use. And we don't disappear after delivery — every project includes a 30-day post-delivery support window.",
      deliverables: [
        "All Final Files (organized, labeled, multiple formats)",
        "Brand Guidelines Document (branding projects)",
        "Developer Handover Package (UI/UX projects)",
        "Image Asset Library with Usage Rights (photography)",
        "30-Day Post-Delivery Support Window",
        "Optional: Ongoing Retainer Proposal"
      ],
      duration: "Completed On Launch",
      expect: [
        "Comprehensive handover session with your team",
        "All final assets delivered in high resolution",
        "Post-launch support window (30 days)"
      ]
    }
  ];

  return (
    <div className="bg-black mt-[50px]">
      {/* SECTION 1 — PROCESS PAGE HERO */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 lg:px-12 overflow-hidden bg-black">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.span 
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 0.04, scale: 1 }}
            transition={{ duration: 2 }}
            className="text-[20vw] lg:text-[30vw] font-serif font-extralight text-white leading-none tracking-[-0.05em]"
          >
            PROCESS
          </motion.span>
        </div>

        <motion.div 
          animate={{ opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,40,40,0.5)_0,transparent_70%)]"
        />

        <div className="relative z-10 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[10px] font-sans text-gold tracking-[0.5em] uppercase font-bold mb-6"
          >
            How We Work · Every Time
          </motion.p>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif text-white leading-[0.9] tracking-tighter">
            <motion.span 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="block"
            >
              Chaos is not
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="block italic text-gold font-light"
            >
              Creative.
            </motion.span>
          </h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-10 max-w-2xl mx-auto"
          >
            <p className="text-white/40 text-sm md:text-lg font-sans font-light tracking-widest leading-relaxed">
              We follow a proven process so your project is never left to chance — only to craft.
            </p>
            <div className="mt-8 inline-flex items-center justify-center gap-3 px-6 py-2 border border-gold/20 rounded-full bg-gold/5 max-w-full text-center">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shrink-0" />
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-gold">6-Stage Process · Refined Over 200+ Projects</span>
            </div>
          </motion.div>
          
          <div className="w-full max-w-[120px] mx-auto mt-12 bg-white/10 h-px overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-gold"
            />
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 flex flex-col items-center"
        >
          <div className="w-px h-12 bg-white/10 relative">
            <motion.div 
              animate={{ height: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 left-0 w-full bg-gold"
            />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2 — PROCESS OVERVIEW STRIP */}
      <section className="py-20 bg-[#050505] border-y border-white/5 relative overflow-hidden group">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 relative">
            {/* Connecting line */}
            <div className="absolute top-[21px] left-0 w-full h-px bg-white/5 hidden lg:block" />
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute top-[21px] left-0 w-full h-px bg-gold origin-left hidden lg:block"
            />

            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 group/item text-center">
                <div className="w-11 h-11 rounded-full border border-white/10 bg-black flex items-center justify-center text-white/20 text-[10px] font-bold font-sans transition-all duration-500 group-hover/item:border-gold group-hover/item:text-gold group-hover/item:scale-110 mb-4 bg-black">
                  {step.id}
                </div>
                <div className="relative">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold group-hover/item:text-white transition-colors">
                    {step.name}
                  </span>
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-gold text-black text-[9px] uppercase tracking-widest font-bold rounded opacity-0 translate-y-2 group-hover/item:opacity-100 group-hover/item:translate-y-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — SIX DETAILED PROCESS STAGES */}
      <div className="bg-black">
        {stageDetails.map((stage, idx) => (
          <ProcessStage key={stage.id} stage={stage} index={idx} />
        ))}
      </div>

      {/* CLOSING SECTION */}
      <section className="py-32 lg:py-60 px-6 lg:px-12 bg-black text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-[0.02] pointer-events-none" />
        <div className="max-w-[1800px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-10 leading-[0.9] tracking-tighter uppercase">
              Trust the <br /> <span className="italic text-gold">Process.</span>
            </h2>
            <p className="text-white/40 text-lg lg:text-xl font-sans font-light italic max-w-2xl mx-auto mb-16 leading-relaxed">
              "We take on a limited number of projects each quarter to ensure every client gets our full attention. Our structured approach is why we deliver results that last."
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <button 
                onClick={() => navigateTo('onboarding')}
                className="bg-gold text-black px-16 py-6 rounded-full text-xs font-sans uppercase tracking-[0.3em] font-bold border border-gold hover:bg-transparent hover:text-gold transition-all duration-500 flex items-center gap-3 group"
              >
                Start a Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const ProcessStage = ({ stage, index }: any) => {
  const isEven = index % 2 !== 0;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-24 lg:py-48 px-6 lg:px-12 border-b border-white/5 relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <div className={`flex flex-col lg:flex-row items-center gap-20 lg:gap-40 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* CONTENT SIDE */}
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: isEven ? 100 : -100 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex-1 relative"
          >
            {/* Background number watermark */}
            <div className="absolute -top-40 -left-20 lg:-top-60 lg:-left-40 pointer-events-none select-none">
              <span className="text-[20rem] lg:text-[30rem] font-serif font-extralight text-white opacity-[0.03] leading-none">
                {stage.id}
              </span>
            </div>

            <div className="relative z-10">
              <span className="text-gold font-sans font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block italic">Stage {stage.id}</span>
              <h2 className="text-5xl lg:text-7xl font-serif text-white mb-4 uppercase tracking-tighter">{stage.name}</h2>
              <p className="text-xl lg:text-2xl italic text-gold font-light mb-10">"{stage.tagline}"</p>
              
              <p className="text-white/50 font-sans font-light text-lg leading-relaxed mb-12 max-w-xl">
                {stage.description}
              </p>

              <div className="mb-12">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold mb-6 italic">Core Deliverables</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stage.deliverables.map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 group">
                      <span className="text-gold text-lg transition-transform group-hover:scale-125">✦</span>
                      <span className="text-xs text-white/60 font-sans tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 mb-12">
                 <div className="px-4 py-2 border border-white/10 bg-white/5 rounded-full">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40">Typical Duration: <span className="text-gold">{stage.duration}</span></span>
                 </div>
              </div>

              {/* Accordion */}
              <div className="border border-white/10 rounded-sm overflow-hidden bg-white/2">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
                >
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-white/70">What to Expect During This Stage</span>
                  <ChevronDown className={`text-gold transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <ul className="p-6 pt-0 space-y-4">
                    {stage.expect.map((item: string, i: number) => (
                      <li key={i} className="flex gap-4">
                        <span className="text-gold font-serif italic text-sm opacity-50">•</span>
                        <p className="text-xs text-white/40 font-sans leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* VISUAL SIDE */}
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: isEven ? -100 : 100 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex-1 w-full"
          >
            <div className="aspect-[4/3] relative rounded-sm overflow-hidden bg-black-soft border border-white/5 group">
              <div className="absolute inset-0 bg-gradient-to-br from-black to-[#050505]" />
              
              {/* Abstract Visual Elements */}
              <div className="absolute inset-0 p-20 flex items-center justify-center">
                <div className="relative w-full h-full border border-white/5 rounded-full opacity-20" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-gold/10 rounded-full scale-125 border-dashed"
                />
                
                {/* stage ID watermark inside */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                   <span className="text-[12rem] font-serif font-bold tracking-tighter uppercase">{stage.name}</span>
                </div>

                {/* Center abstract shape */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-40 h-40 bg-gold/5 rounded-sm rotate-45 border border-gold/20 flex items-center justify-center"
                >
                  <div className="w-20 h-20 bg-gold/10 border border-gold/40" />
                </motion.div>
              </div>

              {/* Decorative corner tags */}
              <div className="absolute top-8 left-8">
                <div className="w-8 h-px bg-gold/40" />
                <div className="h-8 w-px bg-gold/40" />
              </div>
              <div className="absolute bottom-8 right-8 rotate-180">
                <div className="w-8 h-px bg-gold/40" />
                <div className="h-8 w-px bg-gold/40" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- About Full Page Component ---

const StatCounter = ({ end, label, delay = 0 }: { end: number, label: string, delay?: number }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const duration = 2000;
      
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Easing: easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeProgress * end));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      const timeout = setTimeout(() => {
        window.requestAnimationFrame(step);
      }, delay * 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [isInView, end, delay]);

  return (
    <div ref={nodeRef} className="flex flex-col items-center gap-2">
      <div className="text-4xl lg:text-6xl font-serif text-gold">
        {count}{label.includes('%') ? '%' : '+'}
      </div>
      <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">{label.replace('%', '')}</div>
    </div>
  );
};

const AboutFullPage = ({ navigateTo }: { navigateTo: AppView | any }) => {
  const manifestoRef = useRef(null);
  const isManifestoInView = useInView(manifestoRef, { amount: 0.5, once: true });

  const values = [
    { title: "Intentionality", desc: "Every element in our work has a reason to exist. We don't add things because they look nice. We add them because they serve the work." },
    { title: "Honesty", desc: "We tell clients what they need to hear, not what they want to hear. Our job is to serve the work and the brand — not to make everyone comfortable." },
    { title: "Obsession", desc: "Good enough is not a phrase we use. We stay on a project until it is right — not until the deadline forces us to stop." },
    { title: "Collaboration", desc: "The best work happens when client and agency are true partners. We share our thinking, invite your input, and build together." },
    { title: "Restraint", desc: "We know when to add and when to remove. The most powerful creative decisions are often about what you leave out, not what you put in." },
    { title: "Excellence", desc: "Not as a goal. As a baseline. Every project that leaves our studio must be something we are genuinely proud to put our name on." }
  ];

  const team = [
    { 
      name: "Rahul Verma", 
      role: "Founder & Creative Director", 
      bio: "8 years in branding and identity design. Former creative lead at two Mumbai agencies. Believes that a great logo is just the beginning of a great brand. Obsessed with type.",
      specialties: ["Brand Strategy", "Visual Identity", "Art Direction"],
      gradient: "from-[#0a1a1a] to-[#0d3d3d]"
    },
    { 
      name: "Priya Nair", 
      role: "Lead UI/UX Designer", 
      bio: "Product designer with a background in cognitive psychology. Has designed digital products used by over 5 million people. Believes that beautiful design and functional design are never opposites.",
      specialties: ["User Research", "Product Design", "Prototyping"],
      gradient: "from-[#1a0a2e] to-[#0d0d3d]"
    },
    { 
      name: "Arjun Mehta", 
      role: "Photography Director", 
      bio: "Commercial and editorial photographer with 6 years of studio and location experience. Has shot campaigns for beauty, fashion, and tech brands across India and the UAE. Light is his primary tool.",
      specialties: ["Product Photography", "Fashion", "Art Direction"],
      gradient: "from-[#1a1000] to-[#1a1000]"
    },
    { 
      name: "Aisha Kapoor", 
      role: "Brand Strategist & Graphic Designer", 
      bio: "Strategic thinker and visual maker in equal measure. Has built brand systems for startups and legacy companies alike. Believes that strategy without aesthetics is just a document.",
      specialties: ["Brand Strategy", "Graphic Design", "Copywriting"],
      gradient: "from-[#1a0f0a] to-[#1f0a0a]"
    }
  ];

  const awards = [
    { name: "Behance Featured", meta: "Brand Identity · 2024" },
    { name: "Best UI Design", meta: "India Design Awards · 2024" },
    { name: "Top Creative Studio", meta: "Clutch.co · 2024" },
    { name: "Design Week Featured", meta: "Design Week India · 2025" },
    { name: "Honorable Mention", meta: "Awwwards · 2025" }
  ];

  return (
    <div className="bg-black mt-[50px]">
      {/* SECTION 1 — ABOUT PAGE HERO */}
      <section className="relative min-h-screen flex flex-col items-center px-6 lg:px-12 overflow-hidden bg-black pb-40">
        <div className="absolute inset-x-0 top-0 h-screen flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.span 
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 0.04, scale: 1 }}
            transition={{ duration: 2 }}
            className="text-[20vw] lg:text-[30vw] font-serif font-extralight text-white leading-none tracking-[-0.05em]"
          >
            ABOUT
          </motion.span>
        </div>

        <motion.div 
          animate={{ opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,0.5)_0,transparent_70%)]"
        />

        <div className="relative z-10 text-center mt-32 lg:mt-[200px]">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[8px] lg:text-[10px] font-sans text-gold tracking-[0.5em] uppercase font-bold mb-6 px-4"
          >
            Our Story · Our People · Our Why
          </motion.p>
          <h1 className="text-4xl md:text-7xl lg:text-[9rem] font-serif text-white leading-[0.9] tracking-tighter px-4">
            <motion.span 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              We didn't start an agency.
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              We started a
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="block italic text-gold font-light text-6xl lg:text-[11rem]"
            >
              Standard.
            </motion.span>
          </h1>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 max-w-2xl mx-auto px-6"
          >
            <p className="text-white/40 text-xs md:text-lg font-sans font-light tracking-widest leading-relaxed">
              Founded on the belief that great creative work changes how people feel about a brand — forever.
            </p>
            <div className="mt-8 inline-flex items-center justify-center gap-3 px-6 py-2 border border-gold/20 rounded-full bg-gold/5 max-w-full text-center">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shrink-0" />
              <span className="text-[7px] lg:text-[9px] uppercase tracking-[0.3em] font-bold text-gold truncate">Est. 2023 · Premium Creative Studio · India</span>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 w-full px-12">
            <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-px bg-gold origin-left opacity-30"
            />
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-20 flex flex-col items-center"
        >
          <div className="w-px h-12 bg-gold/20 relative">
            <motion.div 
              animate={{ height: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 left-0 w-full bg-gold"
            />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2 — MANIFESTO */}
      <section className="py-24 lg:py-[200px] px-6 lg:px-12 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-[0.02] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="w-20 h-px bg-gold/30 mx-auto mb-16" />
          
          <h2 ref={manifestoRef} className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-12 leading-tight tracking-tighter">
            {["Most", "agencies", "make", "things", "look", "good."].map((word, i) => (
              <motion.span 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="inline-block mr-4 lg:mr-6"
              >
                {word}
              </motion.span>
            ))}
            <br className="hidden md:block" />
            {["We", "make", "things", "mean", "something."].map((word, i) => (
              <motion.span 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i + 6) * 0.1 }}
                viewport={{ once: true }}
                className={`inline-block mr-4 lg:mr-6 ${word === 'mean' || word === 'something.' ? 'text-gold italic' : ''}`}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            viewport={{ once: true }}
            className="text-white/50 text-lg md:text-xl font-sans font-light leading-relaxed max-w-2xl mx-auto italic"
          >
            We started this studio because we were tired of creative work that looked impressive in a portfolio but did nothing in the real world. Every project we take on has one goal above all others: to create something that genuinely moves people — toward a brand, toward a product, toward a decision.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            viewport={{ once: true }}
            className="mt-10 text-white/50 text-lg md:text-xl font-sans font-light leading-relaxed max-w-2xl mx-auto italic"
          >
            We are small by choice. We are selective by design. And we are obsessed with the work in a way that most agencies simply are not.
          </motion.p>
          
          <div className="w-20 h-px bg-gold/30 mx-auto mt-16" />
        </div>
      </section>

      {/* SECTION 3 — THE NUMBERS */}
      <section className="py-24 lg:py-[200px] bg-black border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-[0.01] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:flex lg:flex-wrap justify-between gap-y-16 items-center">
            <StatCounter end={2} label="Years of Excellence" />
            <div className="hidden lg:block w-px h-12 bg-gold/10" />
            <StatCounter end={50} label="Projects Delivered" delay={0.2} />
            <div className="hidden lg:block w-px h-12 bg-gold/10" />
            <StatCounter end={3} label="Creative Disciplines" delay={0.4} />
            <div className="hidden lg:block w-px h-12 bg-gold/10" />
            <StatCounter end={100} label="Client Retention Rate" delay={0.6} />
            <div className="hidden lg:block w-px h-12 bg-gold/10" />
            <StatCounter end={12} label="Brands Transformed" delay={0.8} />
          </div>
        </div>
      </section>

      {/* SECTION 4 — ORIGIN STORY */}
      <section className="py-24 lg:py-[200px] px-6 lg:px-12 bg-black overflow-hidden flex items-center justify-center">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 lg:gap-32 items-center">
            {/* Left Content */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -40 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true }}
              className="flex-[1.2] w-full"
            >
              <span className="text-gold font-sans font-bold text-[10px] uppercase tracking-[0.5em] mb-6 block italic">How It Started</span>
              <h2 className="text-5xl lg:text-[5rem] font-serif text-white mb-10 leading-[0.9] tracking-tighter uppercase">
                Built from <br /> frustration. <br /> Driven by <br /> <span className="text-gold italic">obsession.</span>
              </h2>

              <div className="space-y-8 text-white/50 font-sans font-light text-lg leading-relaxed max-w-xl">
                <p>
                    This studio was born out of a simple frustration: watching brands spend significant money on creative work that looked generic, felt forgettable, and moved no one. We knew there was a better way — and we decided to build it.
                </p>
                <p>
                    We started with a single belief: that the best creative work happens when strategy and aesthetics are treated as equals. Not strategy first. Not aesthetics first. Both, simultaneously, at the highest possible level.
                </p>
                <p>
                    Today we work with brands across India and internationally — from early-stage startups building their identity from zero, to established companies ready to evolve into something more powerful. Every project, regardless of size, receives the same level of obsessive attention.
                </p>
              </div>

              {/* Timeline */}
              <div className="mt-20 relative">
                <div className="absolute top-0 bottom-0 left-[3px] w-px bg-white/5" />
                <div className="space-y-10 pl-10">
                    {[
                        { year: "2023", text: "Studio Founded" },
                        { year: "2023", text: "First Brand Identity Project Delivered" },
                        { year: "2024", text: "Photography Division Launched" },
                        { year: "2024", text: "First International Client" },
                        { year: "2025", text: "UI/UX Division Expanded" },
                        { year: "2025", text: "50+ Projects Milestone" },
                    ].map((item, i) => (
                        <div key={i} className="relative group">
                            <div className="absolute -left-[41px] top-1.5 w-2 h-2 rounded-full border border-gold bg-black group-hover:scale-150 transition-transform duration-300" />
                            <div className="flex items-center gap-6">
                                <span className="text-[10px] font-sans font-bold text-gold tracking-widest">{item.year}</span>
                                <span className="text-xs text-white/40 group-hover:text-white transition-colors">{item.text}</span>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true }}
              className="flex-1 w-full"
            >
              <div className="aspect-[4/5] relative rounded-sm overflow-hidden bg-black-soft border border-white/5 flex items-center justify-center p-12 lg:p-20 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] to-black" />
                
                {/* Abstract Geometric Composition */}
                <div className="relative w-full h-full border border-white/5 flex items-center justify-center">
                    <motion.div 
                        animate={{ y: [0, -10, 0], rotate: [45, 50, 45] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="w-40 h-40 border border-gold/20 rotate-45"
                    />
                    <motion.div 
                        animate={{ y: [0, 10, 0], rotate: [-45, -50, -45] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute w-32 h-32 border border-white/10 -rotate-45"
                    />
                    <div className="absolute w-full h-px bg-gold/5" />
                    <div className="absolute h-full w-px bg-gold/5" />
                </div>

                <div className="absolute bottom-12 left-12 right-12 text-center">
                   <p className="text-gold font-serif italic text-sm opacity-50">"The standard is the standard."</p>
                   <p className="text-[8px] font-sans text-white/20 uppercase tracking-widest mt-2">— Studio Founding Principle</p>
                </div>
              </div>
            </motion.div>
        </div>
      </section>

      {/* SECTION 5 — OUR VALUES */}
      <section className="py-24 lg:py-[200px] px-6 lg:px-12 bg-[#050505]">
        <div className="max-w-[1800px] mx-auto">
          <div className="mb-24">
            <h2 className="text-4xl lg:text-6xl font-serif text-white uppercase tracking-tighter inline-block">
                What We Stand For
            </h2>
            <motion.div 
              whileInView={{ width: "100%" }}
              initial={{ width: 0 }}
              transition={{ duration: 1.5 }}
              className="h-1 bg-gold mt-4 origin-left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#0d0d0d] p-12 border-t-4 border-gold/20 hover:border-gold hover:-translate-y-2 transition-all duration-500 shadow-2xl group"
                >
                    <div className="w-12 h-12 mb-8 relative flex items-center justify-center">
                        <div className="absolute inset-0 border border-gold/30 rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                        <div className="w-4 h-4 bg-gold animate-pulse" />
                    </div>
                    <h3 className="text-gold font-sans font-bold text-[10px] uppercase tracking-[0.4em] mb-6">{v.title}</h3>
                    <p className="text-white/50 font-sans font-light leading-relaxed italic">
                        {v.desc}
                    </p>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — MEET THE TEAM */}
      <section className="py-24 lg:py-[200px] px-6 lg:px-12 bg-black overflow-hidden flex items-center justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-24 text-center">
            <h2 className="text-4xl lg:text-7xl font-serif text-white uppercase tracking-tighter inline-block">
                The People Behind The Work
            </h2>
            <motion.div 
              whileInView={{ width: "200px" }}
              initial={{ width: 0 }}
              transition={{ duration: 1.5 }}
              className="h-1 bg-gold mx-auto mt-6"
            />
            <p className="text-white/40 mt-8 font-sans font-light tracking-[0.4em] uppercase text-[10px]">Small team. Massive standards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#0d0d0d] rounded-sm overflow-hidden border border-white/5 group hover:border-gold/30 transition-all duration-500"
                >
                    <div className="aspect-square relative overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${m.gradient} transition-transform duration-[1.5s] group-hover:scale-105 opacity-80`} />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    <div className="p-6 lg:p-10">
                        <h3 className="text-xl lg:text-3xl font-serif text-white uppercase tracking-tighter mb-2">{m.name}</h3>
                        <p className="text-gold font-sans font-bold text-[8px] lg:text-[9px] uppercase tracking-[0.4em] mb-6">{m.role}</p>
                        <p className="text-white/40 text-[10px] lg:text-xs font-sans font-light leading-relaxed mb-8 italic">
                            {m.bio}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-10">
                            {m.specialties.map(s => (
                                <span key={s} className="text-[7px] lg:text-[8px] uppercase tracking-widest text-[#C9A84C] border border-gold/20 px-3 py-1 rounded-full">{s}</span>
                            ))}
                        </div>
                        <div className="flex gap-4 border-t border-white/5 pt-8">
                            <a href="#" className="text-white/20 hover:text-white transition-colors"><Linkedin size={12} className="lg:w-4 lg:h-4" /></a>
                            <a href="#" className="text-white/20 hover:text-white transition-colors"><Instagram size={12} className="lg:w-4 lg:h-4" /></a>
                            <a href="#" className="text-white/20 hover:text-white transition-colors"><Dribbble size={12} className="lg:w-4 lg:h-4" /></a>
                        </div>
                    </div>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — APPROACH */}
      <section className="py-24 lg:py-[200px] px-6 lg:px-12 bg-[#050505] flex items-center justify-center">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 lg:gap-32 items-center">
             {/* Visual LEFT */}
             <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -40 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="flex-1 w-full order-2 lg:order-1"
            >
              <div className="aspect-[4/3] relative rounded-sm overflow-hidden bg-black-soft border border-white/5 flex items-center justify-center p-6 lg:p-12">
                <div className="absolute inset-0 bg-gradient-to-tr from-black to-[#0a0a0a]" />
                
                <div className="relative w-full h-full flex items-center justify-center scale-75 lg:scale-100">
                    <div className="relative w-48 h-48 lg:w-64 lg:h-64 border border-white/10 rounded-full flex items-center justify-center">
                        <span className="absolute left-[-20px] text-[6px] lg:text-[8px] font-sans text-white/30 uppercase tracking-[0.3em]">Your Vision</span>
                        <div className="w-48 h-48 lg:w-64 lg:h-64 border border-white/10 rounded-full flex items-center justify-center translate-x-12 lg:translate-x-20">
                            <span className="absolute right-[-20px] text-[6px] lg:text-[8px] font-sans text-white/30 uppercase tracking-[0.3em]">Our Craft</span>
                            
                            <motion.div 
                                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute left-[-24px] lg:left-[-32px] w-24 h-24 lg:w-32 lg:h-32 bg-gold/20 blur-xl rounded-full"
                            />
                            <div className="absolute left-[-24px] lg:left-[-32px] w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center">
                                <span className="text-[8px] lg:text-[10px] font-sans font-bold text-gold uppercase tracking-[0.4em] z-10">The Work</span>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>

            {/* Content RIGHT */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-[1.2] order-1 lg:order-2"
            >
              <span className="text-gold font-sans font-bold text-[10px] uppercase tracking-[0.5em] mb-6 block italic">Client Philosophy</span>
              <h2 className="text-5xl lg:text-7xl font-serif text-white mb-10 leading-[0.9] tracking-tighter uppercase">
                We choose our <br /> clients as carefully <br /> as they choose <span className="text-gold italic">us.</span>
              </h2>

              <div className="space-y-8 text-white/50 font-sans font-light text-lg leading-relaxed max-w-xl italic">
                <p>
                    We limit the number of projects we take on at any given time. This is not a capacity issue — it's a quality decision. When you work with us, you get our full attention. Not a fraction of it.
                </p>
                <p>
                    We work best with clients who believe in the power of great creative work. Who understand that design is an investment, not an expense. Who are willing to be challenged and to trust the process.
                </p>
                <p>
                    If that sounds like you, we would love to talk.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-16 px-4 lg:px-0">
                  <div className="bg-black/40 p-6 lg:p-10 border border-gold/10 rounded-sm">
                    <h4 className="text-white text-[8px] lg:text-[10px] font-sans font-bold uppercase tracking-[0.3em] mb-6 border-b border-gold/20 pb-4">What we love working on:</h4>
                    <ul className="space-y-3 text-white/40 text-[8px] lg:text-[10px] font-sans tracking-widest leading-relaxed">
                        <li>✦ Brand-new identity projects</li>
                        <li>✦ Complex UI/UX challenges</li>
                        <li>✦ High-end photography campaigns</li>
                        <li>✦ Brands ready to evolve</li>
                    </ul>
                  </div>
                  <div className="bg-black/40 p-6 lg:p-10 border border-white/5 rounded-sm">
                    <h4 className="text-white text-[8px] lg:text-[10px] font-sans font-bold uppercase tracking-[0.3em] mb-6 border-b border-white/10 pb-4">What we don't do:</h4>
                    <ul className="space-y-3 text-white/40 text-[8px] lg:text-[10px] font-sans tracking-widest leading-relaxed">
                        <li>· Rush jobs without proper process</li>
                        <li>· Projects without clear goals</li>
                        <li>· Work that compromises our standards</li>
                        <li>· More than 4 active projects at once</li>
                    </ul>
                  </div>
              </div>
            </motion.div>
        </div>
      </section>

      {/* SECTION 8 — CULTURE & PHILOSOPHY */}
      <section className="py-24 lg:py-[200px] px-6 lg:px-12 bg-black border-y border-white/5 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-40">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center relative py-20"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[10rem] font-serif text-gold/5 leading-none select-none">“</div>
                <div className="w-20 h-px bg-gold/20 mx-auto mb-10" />
                <h3 className="text-3xl lg:text-5xl font-serif text-white italic leading-tight mb-8">
                    <span className="text-gold">"We would rather lose a client than deliver work we are not proud of."</span>
                </h3>
                <p className="text-[10px] font-sans tracking-[0.4em] text-white/30 uppercase">— Studio Policy, Day One</p>
                <div className="w-20 h-px bg-gold/20 mx-auto mt-10" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10rem] font-serif text-gold/5 leading-none select-none rotate-180">“</div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center relative py-20"
            >
                <div className="w-20 h-px bg-gold/20 mx-auto mb-10" />
                <h3 className="text-3xl lg:text-5xl font-serif text-white leading-tight mb-8">
                    Creativity without strategy is art. <br />
                    Creativity with strategy is design. <br />
                    <span className="text-gold italic">We practice the second.</span>
                </h3>
                <div className="w-20 h-px bg-gold/20 mx-auto mt-10" />
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center relative py-20"
            >
                <div className="w-20 h-px bg-gold/20 mx-auto mb-10" />
                <h3 className="text-3xl lg:text-5xl font-serif text-white italic leading-tight mb-8">
                    "Our best clients don't feel like clients. <br />
                    <span className="text-gold">They feel like collaborators building something together."</span>
                </h3>
                <div className="w-20 h-px bg-gold/20 mx-auto mt-10" />
            </motion.div>
        </div>
      </section>

      {/* SECTION 9 — RECOGNITION */}
      <section className="py-24 lg:py-[200px] px-6 lg:px-12 bg-black overflow-hidden relative">
          <div className="max-w-[1800px] mx-auto">
            <div className="mb-20">
                <h2 className="text-4xl lg:text-6xl font-serif text-white uppercase tracking-tighter inline-block">
                    Recognition
                </h2>
                <motion.div 
                    whileInView={{ width: "200px" }}
                    initial={{ width: 0 }}
                    transition={{ duration: 1.5 }}
                    className="h-1 bg-gold mt-4 origin-left"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {awards.map((a, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-[#0d0d0d] p-8 border border-white/5 rounded-sm hover:border-gold/30 transition-all flex flex-col items-center text-center"
                    >
                        <Star size={20} className="text-gold mb-4 opacity-50" />
                        <h4 className="text-white text-xs font-sans font-bold uppercase tracking-widest mb-2">{a.name}</h4>
                        <p className="text-[10px] text-gold font-sans tracking-[0.2em] uppercase opacity-60 italic">{a.meta}</p>
                    </motion.div>
                ))}
            </div>
          </div>
      </section>

      {/* SECTION 10 — AS SEEN IN */}
      <section className="py-20 bg-[#050505] border-y border-white/5">
        <div className="flex flex-col items-center overflow-hidden">
            <span className="text-gold font-sans font-bold text-[9px] uppercase tracking-[0.5em] mb-12 block">As Seen In</span>
            <div className="flex gap-20 animate-marquee whitespace-nowrap">
                {["Design Week", "Clutch", "Awwwards", "Creative Boom", "India Design", "Behance"].map((press, i) => (
                    <span key={i} className="text-3xl lg:text-5xl font-serif text-white opacity-[0.15] hover:opacity-100 hover:text-gold transition-all duration-500 cursor-default uppercase">
                        {press}
                    </span>
                ))}
                {["Design Week", "Clutch", "Awwwards", "Creative Boom", "India Design", "Behance"].map((press, i) => (
                    <span key={i + 6} className="text-3xl lg:text-5xl font-serif text-white opacity-[0.15] hover:opacity-100 hover:text-gold transition-all duration-500 cursor-default uppercase">
                        {press}
                    </span>
                ))}
            </div>
        </div>
      </section>

      {/* SECTION 11 — CLOSING CTA */}
      <section className="py-24 lg:py-[200px] px-6 lg:px-12 bg-black text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />
        <motion.div 
            animate={{ opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.1)_0,transparent_70%)]"
        />
        <div className="max-w-[1800px] mx-auto relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-gold font-sans font-bold text-[8px] lg:text-[10px] uppercase tracking-[0.5em] mb-10 block italic px-4">Let's Create Together</span>
            <h2 className="text-4xl md:text-8xl lg:text-9xl font-serif text-white mb-10 leading-[0.9] tracking-tighter uppercase px-4">
              You've read our story. <br className="hidden md:block" /> You know how we work. <br className="hidden md:block" /> <span className="italic text-gold">Now let's build yours.</span>
            </h2>
            <p className="text-white/40 text-sm lg:text-xl font-sans font-light italic max-w-2xl mx-auto mb-16 leading-relaxed px-6">
              "Every great brand has a starting point. Let's make yours unforgettable."
            </p>
            
            <div className="mt-8 mb-20 inline-flex items-center gap-3 px-6 py-2 border border-gold/20 rounded-full bg-gold/5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-gold">Currently accepting new projects — Q2 2025</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-8 px-6">
              <button 
                onClick={() => navigateTo('onboarding')}
                className="w-full sm:w-auto bg-gold text-black px-10 lg:px-16 py-4 lg:py-6 rounded-full text-[10px] lg:text-xs font-sans uppercase tracking-[0.3em] font-bold border border-gold hover:bg-transparent hover:text-gold transition-all duration-500 flex items-center justify-center gap-3 group shadow-[0_0_30px_rgba(201,168,76,0.3)]"
              >
                Start a Project <ArrowRight size={16} className="lg:w-[18px] lg:h-[18px] group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigateTo('work')}
                className="w-full sm:w-auto px-10 lg:px-16 py-4 lg:py-6 rounded-full text-[10px] lg:text-xs font-sans uppercase tracking-[0.3em] font-bold border border-white/20 text-white hover:border-gold hover:text-gold transition-all duration-500"
              >
                View Our Work
              </button>
            </div>

            <div className="mt-20 flex flex-wrap justify-center gap-8 text-[9px] font-sans tracking-[0.3em] uppercase text-white/30 italic">
                <span>Free discovery call</span>
                <span className="hidden md:block opacity-30">|</span>
                <span>NDA on request</span>
                <span className="hidden md:block opacity-30">|</span>
                <span>Response within 24 hours</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<AppView>('home');

  const navigateTo = (newView: AppView) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setView(newView);
  };

  return (
    <div className="relative selection:bg-gold selection:text-black min-h-screen bg-black">
      <CustomCursor />
      <Navbar navigateTo={navigateTo} currentView={view} />
      
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.main 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-[50px]" />
            <Hero navigateTo={navigateTo} />
            <div className="h-[50px]" />
            <MarqueeStrip />
            <About />
            <Services />
            <Work navigateTo={navigateTo} />
            <Process />
            <Testimonials />
            <Journal />
            <CTABanner navigateTo={navigateTo} />
          </motion.main>
        )}
        {view === 'services' && (
          <motion.main 
            key="services"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ServicesFullPage navigateTo={navigateTo} />
          </motion.main>
        )}
        {view === 'work' && (
          <motion.main 
            key="work"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <WorkFullPage navigateTo={navigateTo} />
          </motion.main>
        )}
        {view === 'uiux-work' && (
          <motion.main 
            key="uiux-work"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <UIUXWorkPage navigateTo={navigateTo} />
          </motion.main>
        )}
        {view === 'photography-work' && (
          <motion.main 
            key="photography-work"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <PhotographyWorkPage navigateTo={navigateTo} />
          </motion.main>
        )}
        {view === 'videography-work' && (
          <motion.main 
            key="videography-work"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <VideographyWorkPage navigateTo={navigateTo} />
          </motion.main>
        )}
        {view === 'process' && (
          <motion.main 
            key="process"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ProcessFullPage navigateTo={navigateTo} />
          </motion.main>
        )}
        {view === 'about' && (
          <motion.main 
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AboutFullPage navigateTo={navigateTo} />
          </motion.main>
        )}
        {view === 'onboarding' && (
          <motion.main 
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ProjectOnboarding navigateTo={navigateTo} />
          </motion.main>
        )}
      </AnimatePresence>

      <Footer navigateTo={navigateTo} />
    </div>
  );
}
