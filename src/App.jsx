import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Mail, MapPin, Download, Facebook, Instagram, Linkedin, Printer, Package, Leaf, Award, ArrowRight, ChevronDown, ChevronRight, Zap, Layers, ShieldCheck, Globe, BookOpen, ShoppingBag, Factory, Truck, Recycle, CheckCircle, BarChart3, Lightbulb, Users, Loader2, Send } from 'lucide-react';

// --- Global CSS & Keyframes ---
// Not: Gerçek bir projede bu stiller index.css dosyasına taşınmalıdır.
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700;900&display=swap');

  :root {
    font-family: 'Montserrat', sans-serif;
    scroll-behavior: smooth;
  }

  body {
    background-color: #020617; /* slate-950 */
  }

  /* Özel Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #0f172a;
  }
  ::-webkit-scrollbar-thumb {
    background: #3b82f6;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #2563eb;
  }

  .gradient-text {
    background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .gradient-bg {
     background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%);
  }

  .glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .glass-strong {
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
    70% { box-shadow: 0 0 0 20px rgba(59, 130, 246, 0); }
  }
  @keyframes slow-pan {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-glow { animation: pulse-glow 2s infinite; }
  .bg-pan-gradient {
    background: linear-gradient(-45deg, #0f172a, #1e3a8a, #0f172a, #312e81);
    background-size: 400% 400%;
    animation: slow-pan 15s ease infinite;
  }

  .reveal-hidden { opacity: 0; transform: translateY(50px) scale(0.95); transition: all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1); }
  .reveal-visible { opacity: 1; transform: translateY(0) scale(1); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
`;

// --- Custom Hooks ---
function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.10 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return [ref, isVisible];
}

// --- Sabit Veriler ---
const COMPANY_INFO = {
  name: "AYPLAST AMBALAJ",
  phone: "0212 671 8257",
  email: "ayplastambalaj@gmail.com",
  address: "İkitelli OSB, Güngören - Bağcılar Sanayi Sitesi No:11 BLOK NO:16-18-20, 34480 Başakşehir/İstanbul",
  whatsapp: "+90 555 555 00 00",
  year: new Date().getFullYear()
};

const DETAILED_PRODUCTS = [
  {
    id: 1,
    category: "Mağaza Grubu",
    title: "Takviyeli Poşetler",
    desc: "Mağazacılık sektörünün en çok tercih ettiği, sap kısmı ekstra katla güçlendirilmiş, yüksek taşıma kapasiteli prestij poşetleri.",
    image: "https://github.com/FurkanMorova/ayplast-web/blob/main/src/assets/takviyeli-posetler.png?raw=true?auto=format&fit=crop&q=80&w=600",
    features: ["LDPE/HDPE Seçeneği", "Çift Kat Sap Mukavemeti", "8 Renk Flexo Baskı"]
  },
  {
    id: 2,
    category: "Mağaza Grubu",
    title: "El Geçme Poşetler",
    desc: "Ekonomik ve pratik kullanım sunan, el tutma yeri özel kesimle açılmış, fuar ve hafif tekstil ürünleri için ideal çözüm.",
    image: "https://github.com/FurkanMorova/ayplast-web/blob/main/src/assets/el-gecme-posetler.png?raw=true?auto=format&fit=crop&q=80&w=600",
    features: ["Parlak/Mat Yüzey", "Körük Seçeneği", "Tam Yüzey Baskı İmkanı"]
  },
  {
    id: 3,
    category: "Mağaza Grubu",
    title: "Gıda Ambalajları",
    desc: "Ürünlerin tazeliğini koruyan, hijyenik ve dayanıklı yapısıyla gıda sektörüne özel premium ambalaj çözümleri.",
    image: "https://github.com/FurkanMorova/ayplast-web/blob/main/src/assets/gida-ambalajlari.png?raw=true?auto=format&fit=crop&q=80&w=600",
    features: ["Yüksek Gıda Koruma Kapasitesi", "Kuvvetli Çok Katmanlı Film Yapısı", "Geri Dönüştürülebilir"]
  },
  {
    id: 4,
    category: "E-Ticaret",
    title: "Kargo Poşetleri",
    desc: "İnternet satışları için özel tasarlanmış, içi görünmeyen (co-ex), bantlı ve kurye süreçlerine dayanıklı güvenlikli poşetler.",
    image: "https://github.com/FurkanMorova/ayplast-web/blob/main/src/assets/kargo-posetleri.png?raw=true?auto=format&fit=crop&q=80&w=600",
    features: ["Güvenlik Bantlı (Tamper Evident)", "Gri/Siyah İç Yüzey", "Cepte Fatura Alanı"]
  },
  {
    id: 5,
    category: "Endüstriyel",
    title: "Shrink Rulo Film",
    desc: "Isı ile ürünü sararak formunu alan, paletleme ve çoklu paketlemede kullanılan endüstriyel koruma filmleri.",
    image: "https://github.com/FurkanMorova/ayplast-web/blob/main/src/assets/shrink-rulo-film.png?raw=true?auto=format&fit=crop&q=80&w=600",
    features: ["Yüksek Isı Hassasiyeti", "Parlaklık ve Saydamlık", "Otomatik Makine Uyumu"]
  },
  {
    id: 6,
    category: "Tekstil",
    title: "Jelatin (OPP/CPP) Poşet",
    desc: "Gömlek, çorap ve iç giyim gibi ürünlerin sergilenmesinde kullanılan, yüksek parlaklığa sahip şeffaf ambalajlar.",
    image: "https://github.com/FurkanMorova/ayplast-web/blob/main/src/assets/jelatin-poset.png?raw=true?auto=format&fit=crop&q=80&w=600",
    features: ["Yapışkanlı Bant Ağzı", "Kristal Şeffaflık", "Askı Deliği Seçeneği"]
  }
];

// --- UI Bileşenleri ---

const TiltCard = ({ children, className = "" }) => {
    const cardRef = useRef(null);
  
    const handleMouseMove = (e) => {
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 40; 
      const rotateY = (centerX - x) / 40;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    };
  
    const handleMouseLeave = () => {
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };
  
    return (
      <div 
        ref={cardRef} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave}
        className={`transition-transform duration-300 ease-out ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    );
};

const Reveal = ({ children, className = "", delay = "" }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div ref={ref} className={`reveal-hidden ${isVisible ? 'reveal-visible' : ''} ${delay} ${className}`}>
      {children}
    </div>
  );
};

const Button = ({ children, primary, onClick, className = "", icon: Icon, ...props }) => (
  <button
    onClick={onClick}
    className={`relative overflow-hidden group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold tracking-wider transition-all duration-500 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${
      primary
        ? "text-white shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]"
        : "glass text-white hover:bg-white/10 border-white/20"
    } ${className}`}
    {...props}
  >
    {primary && <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_auto] animate-slow-pan opacity-90 group-hover:opacity-100 transition-opacity z-0"></div>}
    <span className="relative z-10 flex items-center gap-2">{children} {Icon && <Icon size={20} className="group-hover:translate-x-1 transition-transform"/>}</span>
  </button>
);

const SectionTitle = ({ title, subtitle, darkBg }) => (
  <Reveal className="text-center mb-20">
    <h2 className={`text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tighter ${darkBg ? 'text-white' : 'text-slate-900'}`}>
      {title.split(' ').map((word, i) => i === 1 ? <span key={i} className="gradient-text">{word} </span> : word + ' ')}
    </h2>
    <div className="w-24 h-2 gradient-bg mx-auto rounded-full mb-8"></div>
    {subtitle && <p className={`text-lg max-w-3xl mx-auto font-medium leading-relaxed ${darkBg ? 'text-slate-300' : 'text-slate-600'}`}>{subtitle}</p>}
  </Reveal>
);

// --- Sayfa İçerikleri ---

const HomePage = ({ navigateTo }) => (
  <div className="bg-slate-950 overflow-hidden">
    {/* HERO SECTION */}
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-pan-gradient">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-overlay filter blur-3xl animate-float opacity-70"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full mix-blend-overlay filter blur-3xl animate-float" style={{animationDelay: '-3s'}}></div>
      </div>
      {/* LCP Optimization: Hero image eager load */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635002962487-2c1d43c92076?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-blue-300 text-sm font-bold mb-8 animate-pulse-glow">
            <Zap size={16} className="text-yellow-400" /> TÜRKİYE'NİN AMBALAJ ÇÖZÜM ORTAĞI
          </div>
        </Reveal>
        <Reveal delay="reveal-delay-1">
        <h1 className="text-6xl md:text-[90px] font-black text-white leading-none tracking-tighter mb-8">
          AMBALAJIN <br />
          <span className="gradient-text relative">
            GELECEĞİ
            <svg className="absolute -bottom-4 left-0 w-full h-4 text-blue-500/50" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
          </span>
        </h1>
        </Reveal>
        <Reveal delay="reveal-delay-2">
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            İstanbul'dan dünyaya açılan kapınız. 10 yıllık tecrübe, yüksek baskı teknolojisi ve <strong className="text-white font-bold">sürdürülebilir üretim</strong> vizyonuyla markanızı en iyi şekilde temsil ediyoruz.
          </p>
        </Reveal>
        <Reveal delay="reveal-delay-3" className="flex flex-col sm:flex-row justify-center gap-6">
            <Button primary onClick={() => navigateTo('products')} icon={ChevronRight}>Ürünleri Keşfet</Button>
            <Button onClick={() => navigateTo('contact')}>Hızlı Teklif Al</Button>
        </Reveal>
      </div>
    </section>

    {/* STRATEGIC PARTNERSHIP */}
    <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <Reveal>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                        Markanız İçin <span className="gradient-text">Kusursuz İlk İzlenim.</span>
                    </h2>
                    <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                        <p>
                            AYPLAST Ambalaj olarak, <strong>baskılı mağaza poşetleri</strong>, <strong>e-ticaret kargo poşetleri</strong> ve <strong>endüstriyel ambalaj</strong> çözümlerinde sektörün öncü üreticilerinden biriyiz. Ürünleriniz müşterinize ulaştığı ilk an, marka kalitenizin aynasıdır.
                        </p>
                        <p>
                            İstanbul İkitelli OSB'deki modern tesisimizde, müşterilerimizin ihtiyaçlarına özel; istenilen ebat, mikron ve renk seçeneklerinde üretim yapıyoruz. Toptan poşet siparişlerinizde yüksek üretim kapasitemiz ile <strong>termin sürelerine sadık kalıyor</strong>, lojistik süreçlerinizi hızlandırıyoruz.
                        </p>
                        <ul className="grid grid-cols-2 gap-4 mt-6">
                            {['Özel Tasarım Baskı', 'Hızlı Üretim', 'Uygun Maliyet', 'Lojistik Destek'].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-white font-bold">
                                    <CheckCircle className="text-blue-500" size={20} /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>
                <Reveal className="relative">
                     <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl transform rotate-3 blur-lg opacity-40"></div>
                     <img loading="lazy" src="https://github.com/FurkanMorova/ayplast-web/blob/main/src/assets/ayplast-giris.png?raw=true" alt="Ayplast Üretim Kalitesi" className="relative rounded-3xl shadow-2xl w-full border border-white/10" />
                </Reveal>
            </div>
        </div>
    </section>

    {/* PROCESS STEPS */}
    <section className="py-24 bg-slate-900/50 relative">
        <div className="container mx-auto px-6">
            <SectionTitle title="Üretim Süreci" subtitle="Siparişten teslimata kadar şeffaf ve teknolojik bir yolculuk." darkBg />
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { icon: Lightbulb, title: "1. Tasarım & Analiz", desc: "Markanızın ihtiyaçlarını analiz ediyor, grafik departmanımızla poşet tasarımınızı baskıya en uygun hale getiriyoruz." },
                    { icon: Factory, title: "2. Üretim & Baskı", desc: "Onaylanan tasarımları, son teknoloji flexo makinelerimizde 8 renge kadar HD kalitede basıyor ve şekillendiriyoruz." },
                    { icon: Truck, title: "3. Kalite & Teslimat", desc: "Üretilen her parti kalite kontrol testlerinden geçer ve anlaşmalı lojistik ağımızla kapınıza teslim edilir." }
                ].map((step, idx) => (
                    <Reveal key={idx} delay={`reveal-delay-${idx}`}>
                        <TiltCard className="glass-strong p-10 rounded-3xl relative overflow-hidden group hover:bg-blue-900/10 transition-colors">
                            <div className="absolute -right-10 -top-10 text-[150px] font-black text-white/5 select-none group-hover:text-blue-500/10 transition-colors">{idx + 1}</div>
                            <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                                <step.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                        </TiltCard>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
  </div>
);

const ProductsPage = () => (
  <div className="bg-slate-950 min-h-screen pt-32 px-6 pb-20">
    <div className="container mx-auto">
      <SectionTitle title="Ürün Koleksiyonu" subtitle="Markanızın değerini artıran, doğa dostu ve yüksek kaliteli ambalaj çözümleri." darkBg />
      
      {/* Filtreleme */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
         {["Tümü", "Mağaza", "E-Ticaret", "Endüstriyel", "Gıda"].map((tag, i) => (
             <button key={i} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${i === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40' : 'glass text-slate-300 hover:bg-white/10'}`}>
                 {tag}
             </button>
         ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DETAILED_PRODUCTS.map((product, idx) => (
            <Reveal key={product.id} delay={`reveal-delay-${idx % 3}`}>
                <TiltCard className="glass rounded-[2rem] overflow-hidden group h-full flex flex-col hover:border-blue-500/30 transition-colors">
                    <div className="h-64 overflow-hidden relative">
                        <img loading="lazy" src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60"></div>
                        <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg">
                            {product.category}
                        </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{product.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                            {product.desc}
                        </p>
                        <div className="space-y-3 mb-8">
                             {product.features.map((feat, i) => (
                                 <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                     {feat}
                                 </div>
                             ))}
                        </div>
                        <button className="w-full py-3 rounded-xl border border-blue-500/30 text-blue-400 font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-900/40">
                            Detaylı İncele <ArrowRight size={16} />
                        </button>
                    </div>
                </TiltCard>
            </Reveal>
        ))}
      </div>
    </div>
  </div>
);

const ECatalogPage = () => (
    <div className="bg-slate-950 min-h-screen pt-32 px-6 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto relative z-10">
            <SectionTitle title="E-Katalog 2025" subtitle="Tüm ürün teknik detayları, ölçü tabloları ve renk skalası artık dijital kütüphanemizde." darkBg />

            <div className="flex flex-col lg:flex-row items-center justify-center gap-16 mt-10">
                <Reveal className="relative group perspective-1000">
                    <div className="w-[350px] h-[500px] bg-gradient-to-br from-blue-900 to-slate-900 rounded-r-2xl rounded-l-sm shadow-[20px_20px_60px_rgba(0,0,0,0.5)] border-l-8 border-blue-800 relative transform transition-transform duration-700 group-hover:rotate-y-[-15deg] group-hover:scale-105 flex flex-col items-center justify-center text-center p-8 border border-white/10">
                         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600')] opacity-10 bg-cover mix-blend-overlay"></div>
                         <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/40 z-10">
                             <div className="font-black text-white text-4xl">A</div>
                         </div>
                         <h3 className="text-4xl font-black text-white mb-2 z-10">AYPLAST</h3>
                         <p className="text-blue-300 tracking-[0.3em] text-sm uppercase mb-12 z-10">Ürün Kataloğu 2025</p>
                         <div className="absolute bottom-8 left-0 w-full text-center z-10">
                             <p className="text-xs text-slate-500">Versiyon 2.4 • 14 MB</p>
                         </div>
                         <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
                    </div>
                    <div className="absolute -bottom-10 left-10 w-[80%] h-10 bg-black/50 blur-xl rounded-[100%] transform rotate-x-60"></div>
                </Reveal>

                <div className="lg:w-1/2 space-y-10">
                    <div className="space-y-6">
                        {[
                            {icon: BookOpen, title: "Dijital Deneyim", text: "Kataloğumuzu indirmeden, interaktif arayüz üzerinden çevrimiçi olarak inceleyin."},
                            {icon: Layers, title: "Teknik Spekler", text: "Mikron kalınlıkları, taşıma kapasiteleri ve koli içi adet bilgilerine ulaşın."},
                            {icon: Globe, title: "Sürdürülebilirlik Raporu", text: "Katalog içeriğinde yer alan geri dönüşüm süreçlerimizi ve sertifikalarımızı inceleyin."}
                        ].map((item, i) => (
                             <div key={i} className="flex items-start gap-4">
                                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400"><item.icon size={24}/></div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                                    <p className="text-slate-400">{item.text}</p>
                                </div>
                           </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <Button primary icon={Download}>PDF İndir (TR)</Button>
                    </div>
                    
                    <p className="text-xs text-slate-500">* Kataloğu görüntülemek için Adobe Acrobat Reader önerilir.</p>
                </div>
            </div>
        </div>
    </div>
);

const AboutPage = () => (
    <div className="bg-slate-950 min-h-screen pt-32 px-6">
    <div className="container mx-auto text-center text-white">
      <SectionTitle title="Hakkımızda & Vizyon" subtitle="Ambalaj sektöründe kalite, güven ve teknoloji odaklı 10 yıllık deneyim." darkBg />
      
      <div className="grid md:grid-cols-2 gap-16 mt-20 items-center mb-32">
        <Reveal>
            <TiltCard className="rounded-[3rem] overflow-hidden relative h-[600px] shadow-2xl shadow-blue-900/20">
                <img loading="lazy" src="https://github.com/FurkanMorova/ayplast-web/blob/main/src/assets/ayplast-uretim-tesisi.png?raw=true" className="w-full h-full object-cover" alt="Ayplast Üretim Tesisi"/>
                <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent text-left">
                    <h4 className="text-white font-bold text-2xl">İkitelli Tesisimiz</h4>
                    <p className="text-slate-300 text-sm">Güngören Sanayi Sitesi, İstanbul</p>
                </div>
            </TiltCard>
        </Reveal>
        <div className="text-left space-y-10">
            <Reveal delay="reveal-delay-1">
                <h3 className="text-4xl font-bold leading-tight mb-6">
                    <span className="gradient-text">10 Yıllık Tecrübe</span> ile Geleceği Tasarlıyoruz.
                </h3>
                <p className="text-lg text-slate-300 leading-relaxed glass p-8 rounded-3xl border-l-4 border-blue-500">
                    Küçük bir atölyede başlayan serüvenimiz, bugün yapay zeka destekli üretim hatlarına sahip, <strong> entegre bir teknoloji üssüne</strong> dönüştü. AYPLAST olarak biz sadece poşet üretmiyoruz; markanızın prestijini koruyan, ürününüzü güvenle taşıyan ve doğaya saygılı <strong>ambalaj çözümleri</strong> geliştiriyoruz.
                </p>
            </Reveal>
            
            <Reveal delay="reveal-delay-2">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="glass p-6 rounded-2xl hover:bg-blue-900/20 transition-colors">
            <h4 className="text-4xl font-black text-blue-400 mb-2">100%</h4>
            <p className="text-xs text-slate-400 font-bold uppercase">Müşteri Memnuyieti</p>
        </div>
        <div className="glass p-6 rounded-2xl hover:bg-purple-900/20 transition-colors">
            <h4 className="text-4xl font-black text-purple-400 mb-2">∞ </h4>
            <p className="text-xs text-slate-400 font-bold uppercase">Sayısız Proje</p>
        </div>
        <div className="glass p-6 rounded-2xl hover:bg-cyan-900/20 transition-colors">
            <h4 className="text-4xl font-black text-cyan-400 mb-2">10+</h4>
            <p className="text-xs text-slate-400 font-bold uppercase">Ülkeye İhracat</p>
        </div>
    </div>
</Reveal>

        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
              { icon: ShieldCheck, title: "Güven & Şeffaflık", text: "İş ortaklarımızla kurduğumuz ilişkilerde dürüstlük esastır. Üretim süreçlerimizden fiyatlandırmaya kadar tam şeffaflık sunarız." },
              { icon: Award, title: "Üstün Kalite", text: "ISO 9001 standartlarında üretim yapıyor, ham madde girişinden son ürün çıkışına kadar laboratuvar testleri uyguluyoruz." },
              { icon: Lightbulb, title: "İnovasyon", text: "Sektördeki gelişmeleri yakından takip ediyor, biyobozunur materyaller ve yeni nesil baskı teknikleri geliştiriyoruz." }
          ].map((val, idx) => (
              <Reveal key={idx} delay={`reveal-delay-${idx}`}>
                  <div className="bg-slate-900 p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-colors text-left">
                      <div className="bg-blue-600/10 w-14 h-14 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                          <val.icon size={28} />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-4">{val.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{val.text}</p>
                  </div>
              </Reveal>
          ))}
      </div>

      <section className="relative rounded-[3rem] overflow-hidden mb-20">
          <div className="absolute inset-0">
              <img loading="lazy" src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600" alt="Doğa Dostu Üretim" className="w-full h-full object-cover filter brightness-50" />
          </div>
          <div className="relative z-10 p-16 md:p-24 text-center">
              <Reveal>
                  <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-green-500/30">
                      <Leaf size={16} /> SÜRDÜRÜLEBİLİRLİK POLİTİKASI
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black text-white mb-8">Gelecek İçin <br/> <span className="text-green-400">Yeşil Dönüşüm</span></h3>
                  <p className="text-xl text-slate-200 max-w-4xl mx-auto leading-relaxed mb-10">
                      AYPLAST olarak karbon ayak izimizi küçültüyoruz. Üretim tesisimizde <strong>Güneş Enerjisi (GES)</strong> kullanıyor, <strong>Sıfır Atık</strong> prensibiyle çalışıyoruz. %100 geri dönüştürülebilir ve doğada çözünebilen biyoplastik ürünlerimizle ekosistemi koruyoruz.
                  </p>
                  <div className="flex flex-wrap justify-center gap-8 opacity-80">
                       <div className="flex items-center gap-2 text-white font-bold"><Recycle className="text-green-400"/> Geri Dönüşüm Sertifikası</div>
                       <div className="flex items-center gap-2 text-white font-bold"><Award className="text-green-400"/> ISO 14001 Çevre</div>
                       <div className="flex items-center gap-2 text-white font-bold"><Zap className="text-green-400"/> Yeşil Enerji</div>
                  </div>
              </Reveal>
          </div>
      </section>

    </div>
  </div>
);

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', company: '', phone: '', productGroup: 'Mağaza Poşetleri', message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simülasyon
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', company: '', phone: '', productGroup: 'Mağaza Poşetleri', message: '' });
            setTimeout(() => setSubmitStatus(null), 8000);
        }, 2000);
    };

    return (
    <div className="bg-slate-950 min-h-screen pt-32 px-6 pb-20">
        <div className="container mx-auto">
            <SectionTitle title="İletişim & Proje" subtitle="Geleceğin projesini birlikte tasarlayalım." darkBg />
            <div className="grid lg:grid-cols-2 gap-16 mt-20">
                <TiltCard className="glass p-6 sm:p-12 rounded-[3rem] relative overflow-hidden">
  {/* Arka plan dekoratif blur */}
  <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-10 text-center sm:text-left">Bize Ulaşın</h3>

  <div className="space-y-6 sm:space-y-8">
    {/* Telefon */}
    <a href={`tel:${COMPANY_INFO.phone}`} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 group">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
        <Phone size={28} className="text-white"/>
      </div>
      <div className="text-center sm:text-left">
        <p className="text-xs text-blue-400 font-bold uppercase">Telefon</p>
        <p className="text-lg sm:text-xl text-white font-bold">{COMPANY_INFO.phone}</p>
      </div>
    </a>

    {/* E-Posta */}
    <a href={`mailto:${COMPANY_INFO.email}`} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 group">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
        <Mail size={28} className="text-white"/>
      </div>
      <div className="text-center sm:text-left">
        <p className="text-xs text-purple-400 font-bold uppercase">E-Posta</p>
        <p className="text-lg sm:text-xl text-white font-bold">{COMPANY_INFO.email}</p>
      </div>
    </a>

    {/* Konum */}
<div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 group">
  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
    <MapPin size={28} className="text-white"/>
  </div>
  <div className="text-center sm:text-left flex-1">
    <p className="text-xs text-slate-400 font-bold uppercase">Konum</p>
    <p className="text-sm sm:text-lg text-white leading-tight break-words">{COMPANY_INFO.address}</p>
  </div>
</div>
  </div>
</TiltCard>


                <div className="bg-white rounded-[3rem] p-12 shadow-2xl relative z-10">
                    <h3 className="text-3xl font-bold text-slate-900 mb-8">Hızlı Teklif Formu</h3>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-2">Adınız Soyadınız</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-slate-800 placeholder:font-normal outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-2">E-Posta</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-slate-800 placeholder:font-normal outline-none" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-2">Firma Ünvanı</label>
                                <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-slate-800 placeholder:font-normal outline-none" />
                            </div>
                             <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-2">Telefon</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-slate-800 placeholder:font-normal outline-none" />
                            </div>
                        </div>
                        
                        <div>
                             <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-2">İlgilendiğiniz Ürün</label>
                             <select name="productGroup" value={formData.productGroup} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-slate-800 outline-none appearance-none">
                                <option>Mağaza Poşetleri</option>
                                <option>E-Ticaret Kargo Poşetleri</option>
                                <option>Gıda Ambalajları</option>
                                <option>Endüstriyel Filmler</option>
                                <option>Diğer / Özel Üretim</option>
                             </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-2">Proje Detayları</label>
                            <textarea rows="4" name="message" value={formData.message} onChange={handleInputChange} required className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-slate-800 placeholder:font-normal resize-none outline-none"></textarea>
                        </div>

                        <Button primary className="w-full" disabled={isSubmitting} type="submit">
                            {isSubmitting ? <><Loader2 className="animate-spin" /> Gönderiliyor...</> : <><Send size={20} /> Gönder & Teklif Al</>}
                        </Button>
                        
                        {submitStatus === 'success' && (
                            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl flex items-start gap-4 animate-fade-in">
                                <div className="bg-green-500 text-white rounded-full p-1 mt-1"><CheckCircle size={16} /></div>
                                <div>
                                    <h4 className="font-bold text-green-600">Talebiniz Başarıyla Alındı!</h4>
                                    <p className="text-sm text-slate-600 mt-1">En kısa sürede {formData.email || 'e-posta'} adresiniz üzerinden dönüş yapacağız.</p>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
};

// --- Ana Uygulama ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // URL Yönetimi: Sayfa yüklendiğinde URL'i kontrol et
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    
    // Eski site linklerini yeni yapıya yönlendir
    if (path.includes('/iletisim')) setActivePage('contact');
    else if (path.includes('/hakkimizda') || path.includes('/kurumsal')) setActivePage('about');
    else if (path.includes('/urunler')) setActivePage('products');
    else if (path.includes('/ekatalog')) setActivePage('ecatalog');
    // Varsayılan home zaten state'de set edildi
  }, []);

  // Sayfa Başlığını Dinamik Değiştirme (SEO)
  useEffect(() => {
    const titles = {
      home: 'Anasayfa',
      about: 'Hakkımızda',
      products: 'Ürünlerimiz',
      ecatalog: 'E-Katalog',
      contact: 'İletişim'
    };
    document.title = `AYPLAST | ${titles[activePage] || 'Ambalaj Çözümleri'}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
    
    // URL'yi güncelle (SPA Router davranışı)
    const paths = {
      home: '/',
      about: '/hakkimizda',
      products: '/urunler',
      ecatalog: '/ekatalog',
      contact: '/iletisim'
    };
    
    // URL'yi tarayıcı geçmişine ekle (sayfa yenilenmeden)
    if (paths[page]) {
      window.history.pushState({ page }, '', paths[page]);
    }
  };

  // Geri butonuna basıldığında state'i güncelle
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setActivePage(event.state.page);
      } else {
        // Geri gelindiğinde URL'yi tekrar kontrol et
        const path = window.location.pathname.toLowerCase();
        if (path.includes('/iletisim')) setActivePage('contact');
        else if (path.includes('/hakkimizda')) setActivePage('about');
        else if (path.includes('/urunler')) setActivePage('products');
        else if (path.includes('/ekatalog')) setActivePage('ecatalog');
        else setActivePage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const menuItems = [
      { id: 'home', label: 'Anasayfa' },
      { id: 'about', label: 'Kurumsal' },
      { id: 'products', label: 'Ürünler' },
      { id: 'ecatalog', label: 'E-Katalog' },
      { id: 'contact', label: 'İletişim' }
  ];

  return (
    <>
    <style>{globalStyles}</style>
    <div className="min-h-screen bg-slate-950 font-sans text-slate-800 overflow-x-hidden">
      <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className={`container mx-auto px-6 rounded-full transition-all duration-500 ${scrolled ? 'glass shadow-2xl shadow-blue-900/20 p-4' : 'bg-transparent'}`}>
            <div className="flex justify-between items-center">
            <div className="font-black text-3xl tracking-tighter cursor-pointer flex items-center gap-2 text-white" onClick={() => navigateTo('home')}>
<img   src="https://github.com/FurkanMorova/ayplast-web/blob/main/src/assets/logo.png?raw=true"   alt="Logo"   style={{ width: '80px', height: 'auto' }} />
            </div>

            <nav className="hidden lg:flex items-center gap-2 glass rounded-full px-2 py-2">
                {menuItems.map((item) => (
                <button key={item.id} onClick={() => navigateTo(item.id)} className={`relative px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide transition-all overflow-hidden group ${activePage === item.id ? 'text-white shadow-lg' : 'text-slate-300 hover:text-white'}`}>
                    {activePage === item.id && <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 -z-10"></div>}
                    <span className="relative z-10">{item.label}</span>
                </button>
                ))}
            </nav>

            <div className="flex items-center gap-4">
                <Button primary className="hidden md:flex !py-3 !px-6 text-sm" onClick={() => navigateTo('contact')}>Teklif Al</Button>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden z-50 glass p-3 rounded-full text-white">
                {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
            </div>
        </div>

        <div className={`fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            {menuItems.map((item, idx) => (
              <button key={item.id} onClick={() => navigateTo(item.id)} className={`text-4xl font-black text-white hover:gradient-text transition-all transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: `${idx * 100}ms`}}>{item.label}</button>
            ))}
          </div>
      </header>

      <main>
        {activePage === 'home' && <HomePage navigateTo={navigateTo} />}
        {activePage === 'products' && <ProductsPage />}
        {activePage === 'ecatalog' && <ECatalogPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
      </main>

      <footer className="bg-slate-950 text-white pt-32 pb-10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1 space-y-8">
              <div className="font-black text-3xl tracking-tighter flex items-center gap-2">
                                <img 
  src="https://github.com/FurkanMorova/ayplast-web/blob/main/src/assets/logo.png?raw=true" 
  alt="Logo" 
  style={{ width: '100px', height: 'auto' }} 
/>

              </div>
              <p className="text-slate-400 leading-relaxed">
                Geleceğin ambalaj teknolojilerini bugünden tasarlayan, inovasyon odaklı üretim üssü.
              </p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                    <div key={i} className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer group">
                        <Icon size={20} className="group-hover:scale-110 transition-transform"/>
                    </div>
                ))}
              </div>
            </div>
            
            <div><h4 className="font-bold text-xl mb-8 gradient-text inline-block">Kurumsal</h4><ul className="space-y-4 text-slate-400">{['Hakkımızda', 'Vizyon & Misyon', 'Kalite Politikası', 'İnsan Kaynakları'].map(i=><li key={i} className="hover:text-blue-400 cursor-pointer transition-colors" onClick={() => navigateTo('about')}>{i}</li>)}</ul></div>
            <div><h4 className="font-bold text-xl mb-8 gradient-text inline-block">Ürünler</h4><ul className="space-y-4 text-slate-400">{['Mağaza Poşetleri', 'E-Ticaret Kargo', 'Gıda Ambalajları', 'Endüstriyel Film'].map(i=><li key={i} className="hover:text-blue-400 cursor-pointer transition-colors" onClick={() => navigateTo('products')}>{i}</li>)}</ul></div>
            <div><h4 className="font-bold text-xl mb-8 gradient-text inline-block">İletişim</h4><ul className="space-y-6 text-slate-400">
                <li className="flex items-start gap-4 group"><MapPin className="text-blue-500 shrink-0 group-hover:scale-110 transition-transform"/><span className="group-hover:text-white transition-colors">{COMPANY_INFO.address}</span></li>
                <li className="flex items-center gap-4 group"><Phone className="text-blue-500 shrink-0 group-hover:scale-110 transition-transform"/><span className="group-hover:text-white transition-colors">{COMPANY_INFO.phone}</span></li>
            </ul></div>
          </div>
          
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>&copy; {COMPANY_INFO.year} AYPLAST Ambalaj. Tüm Hakları Saklıdır.</p>
            <div className="flex gap-8 mt-4 md:mt-0 font-bold">
              
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
