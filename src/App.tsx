import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Book, 
  Target, 
  Users, 
  Palette, 
  MessageSquare, 
  Rocket, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Menu,
  X,
  ChevronRight,
  Globe,
  ShoppingBag,
  Cpu,
  Zap
} from 'lucide-react';

// --- Types ---
type Section = 'about' | 'products' | 'team' | 'positioning' | 'voice' | 'visual' | 'priorities';

// --- Components ---

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-col font-condensed font-bold leading-[0.75] uppercase ${className}`}>
    <div className="text-white text-[0.97em] tracking-[0.05em]">CODE</div>
    <div className="text-white tracking-tighter">/NAME</div>
  </div>
);

const ColorSwatch = ({ hex, name, role }: { hex: string; name: string; role: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative flex flex-col gap-2">
      <div 
        className="h-24 w-full rounded-xl shadow-inner border border-black/5 cursor-pointer transition-transform hover:scale-[1.02]"
        style={{ backgroundColor: hex }}
        onClick={copyToClipboard}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 rounded-xl">
          <Copy className="text-white w-5 h-5" />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-medium uppercase">{hex}</span>
          {copied && <span className="text-[10px] text-emerald-600 font-bold uppercase">Copied!</span>}
        </div>
        <div className="font-bold text-sm">{name}</div>
        <div className="text-xs text-slate-500">{role}</div>
      </div>
    </div>
  );
};

const SectionWrapper = ({ children, id, title, icon: Icon }: { children: React.ReactNode; id: string; title: string; icon: any }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="py-12 border-b border-slate-200 last:border-0"
  >
    <div className="flex items-center gap-3 mb-8">
      <div className="p-2 bg-indigo-accent/10 rounded-lg">
        <Icon className="w-6 h-6 text-indigo-accent" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
    </div>
    {children}
  </motion.section>
);

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('about');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sections = [
    { id: 'about', label: 'About Codename', icon: Book },
    { id: 'products', label: 'Products & Services', icon: ShoppingBag },
    { id: 'team', label: 'The Team', icon: Users },
    { id: 'positioning', label: 'Positioning', icon: Target },
    { id: 'voice', label: 'Brand Voice', icon: MessageSquare },
    { id: 'visual', label: 'Visual Identity', icon: Palette },
    { id: 'priorities', label: 'Marketing Priorities', icon: Rocket },
  ];

  const mainRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = mainRef.current;
      if (!container) return;

      const scrollPosition = container.scrollTop + 150;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id as Section);
          }
        }
      }
    };

    const container = mainRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Also listen to window scroll for mobile
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-brand-black text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Logo className="text-xl" />
          <span className="text-xs font-medium opacity-60 uppercase tracking-widest">Brand Manual</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-brand-black text-white transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-8">
          <div className="mb-12 hidden lg:block">
            <Logo className="text-4xl mb-2" />
            <div className="h-px w-12 bg-indigo-accent mb-4" />
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest leading-relaxed">
              Brand Identity Manual<br />v1.0 — 2026
            </p>
          </div>

          <nav className="flex-1 space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${activeSection === section.id 
                    ? 'bg-indigo-accent text-white shadow-lg shadow-indigo-accent/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'}
                `}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-white/10">
            <a 
              href="https://codename.cl" 
              target="_blank" 
              className="flex items-center justify-between text-xs text-slate-400 hover:text-white transition-colors group"
            >
              codename.cl
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        ref={mainRef}
        className="flex-1 lg:h-screen lg:overflow-y-auto px-6 lg:px-16 py-8 lg:py-12 scroll-smooth"
      >
        <div className="max-w-4xl mx-auto">
          
          {/* Header Info */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-accent/10 text-indigo-accent text-xs font-bold uppercase tracking-wider mb-4">
              <Zap className="w-3 h-3" />
              Reference Document
            </div>
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6">
              Codename <span className="text-slate-400">Identity</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
              A comprehensive guide to the visual and verbal identity of Codename. 
              Built for designers, copywriters, and partners.
            </p>
          </div>

          {/* Sections */}
          
          <SectionWrapper id="about" title="About Codename" icon={Book}>
            <div className="grid gap-8">
              <div className="card">
                <p className="text-lg leading-relaxed text-slate-700 mb-4">
                  Codename is a Chilean software company that builds applications for the Shopify ecosystem, 
                  focused on solving real operational problems for e-commerce in Latin America.
                </p>
                <p className="text-slate-500 leading-relaxed">
                  We don't just build apps; we build infrastructure for the next generation of LATAM merchants. 
                  By combining deep technical expertise with a pragmatic understanding of local logistics and tax requirements, 
                  we bridge the gap between global platforms and regional needs.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-2xl border border-slate-200">
                  <h3 className="text-sm font-bold text-indigo-accent uppercase tracking-widest mb-3">Our Mission</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    To empower Latin American merchants by providing the technical tools they need to compete at a global scale, 
                    starting with the most robust Shopify app ecosystem in the region.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-200">
                  <h3 className="text-sm font-bold text-indigo-accent uppercase tracking-widest mb-3">Our Vision</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    To become the standard technical partner for any high-growth e-commerce operation in LATAM, 
                    recognized for reliability, innovation, and deep regional insight.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Founded', value: '2023' },
                  { label: 'Based in', value: 'Chile' },
                  { label: 'Team Size', value: '4 Co-founders' }
                ].map((stat) => (
                  <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>

          <SectionWrapper id="products" title="Products & Services" icon={ShoppingBag}>
            <div className="space-y-12">
              <div>
                <h3 className="subsection-title">Published Apps</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Ship Smart', desc: 'Real-time shipping rates with Chilean couriers', rating: '4.5' },
                    { name: 'BillBoost', desc: 'Tax document selector (boleta/factura) at checkout', rating: '4.1+' },
                    { name: 'LocFix AI', desc: 'AI-powered address correction at checkout', rating: '4.1+' },
                    { name: 'Easy Image Uploader', desc: 'Bulk product image management', rating: '4.8' },
                    { name: 'Product Sentinel', desc: 'Competitive price monitoring', rating: 'Early Access' }
                  ].map((app) => (
                    <div key={app.name} className="card hover:border-indigo-accent/30 transition-colors group">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg group-hover:text-indigo-accent transition-colors">{app.name}</h4>
                        <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded uppercase">★ {app.rating}</span>
                      </div>
                      <p className="text-sm text-slate-500">{app.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="subsection-title">Product Roadmap (Q2-Q3 2026)</h3>
                <div className="relative border-l-2 border-slate-200 ml-4 pl-8 space-y-8">
                  {[
                    { quarter: 'Q2 2026', title: 'LocFix AI Expansion', desc: 'Adding support for Mexico and Colombia markets.' },
                    { quarter: 'Q2 2026', title: 'Ship Smart Analytics', desc: 'Advanced dashboard for shipping cost optimization.' },
                    { quarter: 'Q3 2026', title: 'Product Sentinel v2', desc: 'Automated dynamic pricing engine for Shopify Plus.' }
                  ].map((item, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-white border-2 border-indigo-accent" />
                      <div className="text-xs font-bold text-indigo-accent uppercase tracking-widest mb-1">{item.quarter}</div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="subsection-title">Core Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Custom Shopify app development',
                    'Checkout UI extensions (Shopify Plus)',
                    'ERP & Payment integrations',
                    'AI-powered e-commerce solutions'
                  ].map((service) => (
                    <div key={service} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm font-medium text-slate-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionWrapper>

          <SectionWrapper id="team" title="The Team" icon={Users}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Ricardo Silva', role: 'Co-founder, Full-stack Dev', angle: 'Bridge between LATAM and international Shopify Plus. 15+ years exp.' },
                { name: 'Edwin Guaman', role: 'Co-founder, Business Lead', angle: 'Client relationships, agency partnerships, market positioning.' },
                { name: 'Andres Urrea', role: 'Co-founder, Product Manager', angle: 'Background in game dev. Leads product strategy and roadmap.' },
                { name: 'Karina Cabezas', role: 'Co-founder, Developer', angle: 'Backend specialist (Python, FastAPI). Maintains the app engine.' }
              ].map((member) => (
                <div key={member.name} className="card flex flex-col">
                  <h4 className="font-bold text-lg text-slate-900">{member.name}</h4>
                  <div className="text-xs font-bold text-indigo-accent uppercase tracking-widest mb-3">{member.role}</div>
                  <p className="text-sm text-slate-500 leading-relaxed">{member.angle}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="positioning" title="Positioning" icon={Target}>
            <div className="space-y-12">
              <div className="bg-brand-black p-10 rounded-3xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Target className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="text-xs font-bold text-indigo-accent uppercase tracking-widest mb-4">The One-Liner</div>
                  <blockquote className="text-2xl lg:text-3xl font-medium leading-tight">
                    "Codename is the technical partner for Shopify agencies in LATAM — with 5 published apps as proof of capability."
                  </blockquote>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="subsection-title">Differentiators</h3>
                  <ul className="space-y-4">
                    {[
                      { title: 'Proven Track Record', desc: '5 live apps with high ratings in the Shopify App Store.' },
                      { title: 'Regional Mastery', desc: 'Deep understanding of LATAM-specific logistics and tax laws.' },
                      { title: 'AI Integration', desc: 'Practical AI applications that solve real operational bottlenecks.' },
                      { title: 'Agency-First', desc: 'Built to support and augment the capabilities of Shopify agencies.' }
                    ].map((item) => (
                      <li key={item.title} className="flex items-start gap-4">
                        <div className="mt-1 w-2 h-2 rounded-full bg-indigo-accent shrink-0" />
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="subsection-title">Target Audience</h3>
                  <div className="space-y-4">
                    <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-indigo-accent" />
                        <div className="font-bold text-sm">Primary: Shopify Agencies</div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Agencies in LATAM (and global agencies with LATAM clients) that need a reliable technical partner for complex integrations and custom app development.
                      </p>
                    </div>
                    <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingBag className="w-4 h-4 text-indigo-accent" />
                        <div className="font-bold text-sm">Secondary: Enterprise Merchants</div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        High-volume Shopify Plus merchants in Chile, Mexico, and Colombia looking for specialized tools to optimize their checkout and shipping operations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionWrapper>

          <SectionWrapper id="voice" title="Brand Voice" icon={MessageSquare}>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { trait: 'Technical but accessible', desc: 'Explains complex terms like "checkout extensions".' },
                  { trait: "Show, don't tell", desc: 'Leads with built products and results.' },
                  { trait: 'Pragmatic', desc: 'No hype. Solves real shipping and billing problems.' },
                  { trait: 'Direct, Chilean tone', desc: 'Straightforward, dry humor, not corporate-stiff.' }
                ].map((item) => (
                  <div key={item.trait} className="p-5 bg-white rounded-2xl border border-slate-200">
                    <div className="font-bold text-slate-900 mb-1">{item.trait}</div>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                  <h4 className="text-emerald-700 font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Words to Use
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['optimizar', 'integración', 'automatizar', 'solución', 'crecimiento', 'eficiencia', 'conversión'].map(w => (
                      <span key={w} className="px-3 py-1 bg-white rounded-full text-xs font-medium text-emerald-700 border border-emerald-200">{w}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100">
                  <h4 className="text-rose-700 font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Words to Avoid
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['disruptivo', 'revolucionario', 'game-changer', 'barato', 'básico'].map(w => (
                      <span key={w} className="px-3 py-1 bg-white rounded-full text-xs font-medium text-rose-700 border border-rose-200">{w}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionWrapper>

          <SectionWrapper id="visual" title="Visual Identity" icon={Palette}>
            <div className="space-y-12">
              {/* Logo Section */}
              <div>
                <h3 className="subsection-title">The Logo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-brand-black p-12 rounded-2xl flex items-center justify-center">
                    <Logo className="text-6xl" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      The Codename logo is stacked text: <span className="font-bold">"CODE"</span> on top, <span className="font-bold">"/NAME"</span> below. 
                      It uses a white condensed sans-serif typeface on dark backgrounds.
                    </p>
                    <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase">
                      <AlertCircle className="w-4 h-4" /> No circular icon or mark.
                    </div>
                  </div>
                </div>
              </div>

              {/* Colors Section */}
              <div>
                <h3 className="subsection-title">Color Palette</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <ColorSwatch hex="#020617" name="Rich Black" role="Primary Background" />
                  <ColorSwatch hex="#6366F1" name="Indigo" role="Accent / Interactive" />
                  <ColorSwatch hex="#EB5E28" name="Orange" role="Primary CTA" />
                  <ColorSwatch hex="#EEF2FF" name="Soft Indigo" role="Subtle Tints" />
                  <ColorSwatch hex="#FFFFFF" name="White" role="Text / Clean Space" />
                </div>
              </div>

              {/* Typography Section */}
              <div>
                <h3 className="subsection-title">Typography</h3>
                <div className="card space-y-6">
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-black text-slate-900">Inter</span>
                    <span className="text-slate-400 text-sm">Primary Typeface</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Headings</div>
                      <div className="text-xl font-bold">Inter Bold</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Body</div>
                      <div className="text-xl font-normal">Inter Regular</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Accents</div>
                      <div className="text-xl font-light italic">Inter Light</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Style Section */}
              <div>
                <h3 className="subsection-title">Visual Style</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Modern SaaS', desc: 'Developer-oriented, clean, technical.' },
                    { title: 'Signature Hero', desc: 'Rich black background with animated particle/dot patterns.' },
                    { title: 'UI Elements', desc: 'Rounded corners, soft shadows, white backgrounds.' },
                    { title: 'Iconography', desc: 'Lucide-based or colorful app-specific icons.' }
                  ].map(style => (
                    <div key={style.title} className="p-4 bg-white rounded-xl border border-slate-200">
                      <div className="font-bold text-sm mb-1">{style.title}</div>
                      <p className="text-xs text-slate-500">{style.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* UI/UX Components Section */}
              <div>
                <h3 className="subsection-title">UI/UX Components</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary Button</div>
                      <button className="w-full py-3 bg-orange-cta text-white font-bold rounded-xl shadow-lg shadow-orange-cta/20 hover:scale-[1.02] transition-transform">
                        Action Label
                      </button>
                      <p className="text-[10px] text-slate-500">Used for main conversions and "Get Started" actions.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secondary Button</div>
                      <button className="w-full py-3 bg-indigo-accent text-white font-bold rounded-xl shadow-lg shadow-indigo-accent/20 hover:scale-[1.02] transition-transform">
                        Secondary Action
                      </button>
                      <p className="text-[10px] text-slate-500">Used for navigation and secondary app features.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ghost Button</div>
                      <button className="w-full py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                        Learn More
                      </button>
                      <p className="text-[10px] text-slate-500">Used for low-priority actions and documentation.</p>
                    </div>
                  </div>
                  <div className="p-6 bg-white rounded-2xl border border-slate-200">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Interactive States</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2 text-xs text-slate-600"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Hover: Scale 1.02</div>
                      <div className="flex items-center gap-2 text-xs text-slate-600"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Active: Scale 0.98</div>
                      <div className="flex items-center gap-2 text-xs text-slate-600"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Radius: 12px (xl)</div>
                      <div className="flex items-center gap-2 text-xs text-slate-600"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Shadow: Soft Indigo</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Designer Guidelines Section */}
              <div>
                <h3 className="subsection-title">Designer Guidelines</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-1 h-4 bg-indigo-accent rounded-full" />
                      Grid & Spacing
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Always use an <span className="font-bold">8px grid system</span>. 
                      Internal padding for cards should be 24px (p-6) or 32px (p-8). 
                      Section spacing should be 48px (py-12) or 64px (py-16) to maintain a clean, breathable layout.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-1 h-4 bg-orange-cta rounded-full" />
                      Imagery & Masks
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Use <span className="font-bold">rounded corners (24px+)</span> for all images. 
                      When showcasing app screenshots, use a subtle 1px border (#E2E8F0) and a soft shadow. 
                      Avoid generic stock photos; prefer technical illustrations or real UI captures.
                    </p>
                  </div>
                  <div className="md:col-span-2 p-6 bg-slate-900 rounded-2xl text-white">
                    <div className="text-[10px] font-bold text-indigo-accent uppercase tracking-widest mb-4">Asset Creation Checklist</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <div className="text-xs font-bold">01. Contrast</div>
                        <p className="text-[10px] text-slate-400">Ensure text on brand-black has at least 7:1 contrast ratio.</p>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs font-bold">02. Alignment</div>
                        <p className="text-[10px] text-slate-400">Left-align all technical copy. Center-align only for hero headlines.</p>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs font-bold">03. Export</div>
                        <p className="text-[10px] text-slate-400">Export web assets as SVG or WebP (80% quality) for performance.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionWrapper>

          <SectionWrapper id="priorities" title="Marketing Priorities" icon={Rocket}>
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'LinkedIn presence optimization for co-founders',
                  'Unified LinkedIn banners across all profiles',
                  'Website fixes (broken images, OG tags)',
                  'Content engine: 55 posts planned over 3 months',
                  'New /agencies landing page (April-May)'
                ].map((priority, i) => (
                  <div key={priority} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-indigo-accent/10 text-indigo-accent flex items-center justify-center font-bold text-xs shrink-0">
                      0{i + 1}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{priority}</span>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="subsection-title">Content Pillars</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: 'Technical Authority', icon: Cpu, desc: 'Deep dives into Shopify Plus, Checkout Extensibility, and AI integrations.' },
                    { title: 'Regional Insights', icon: Globe, desc: 'Analyzing the LATAM e-commerce landscape, logistics, and tax challenges.' },
                    { title: 'Product Proof', icon: Zap, desc: 'Case studies and feature highlights from our 5 published apps.' }
                  ].map((pillar) => (
                    <div key={pillar.title} className="p-6 bg-white rounded-2xl border border-slate-200 text-center">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <pillar.icon className="w-6 h-6 text-slate-400" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">{pillar.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* Footer */}
          <footer className="mt-24 pt-12 border-t border-slate-200 text-center pb-12">
            <Logo className="text-3xl mb-4 mx-auto text-slate-900" />
            <p className="text-slate-400 text-sm">
              © 2026 Codename. All rights reserved.
            </p>
          </footer>

        </div>
      </main>
    </div>
  );
}
