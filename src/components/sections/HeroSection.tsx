import Image from 'next/image';
import Link from 'next/link';

const heroCards = [
  {
    id: 'tdah',
    title: 'TDAH',
    description: 'Diagnóstico e acompanhamento especializado para o Transtorno de Déficit de Atenção e Hiperatividade em crianças e adultos.',
    bg: 'bg-[rgba(60,53,40,0.92)]',
    border: 'border-l-4 border-primary',
  },
  {
    id: 'ansiedade',
    title: 'Ansiedade',
    description: 'Tratamento personalizado para superar transtornos de ansiedade e recuperar a qualidade de vida com apoio multidisciplinar.',
    bg: 'bg-primary/90',
    border: 'border-l-4 border-white/40',
  },
  {
    id: 'neurofeedback',
    title: 'Neurofeedback',
    description: 'Tecnologia de biofeedback cerebral que treina o sistema nervoso para funcionar com mais eficiência e equilíbrio.',
    bg: 'bg-[rgba(185,168,140,0.92)]',
    border: 'border-l-4 border-white/40',
  },
];

export default function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center min-h-[520px] sm:min-h-[580px]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image src="/hero_background.png" alt="Instituto Bonança" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(30,24,16,0.80)_0%,rgba(30,24,16,0.55)_55%,rgba(30,24,16,0.20)_100%)]" />
      </div>

      {/* Hero Text */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-16 pb-20 lg:pb-48">
        <div className="max-w-lg">
          <p className="animate-fade-in text-primary-light font-sans text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Saúde Mental &amp; Bem-estar
          </p>
          <h1 className="hero-title animate-fade-up text-white mb-5 leading-[1.1] font-serif font-bold text-4xl sm:text-5xl lg:text-6xl">
            Instituto<br />Bonança
          </h1>
          <p className="animate-fade-up delay-200 text-white/80 max-w-md leading-relaxed font-sans text-sm sm:text-base font-light mb-8">
            Especialistas em saúde mental com atendimento humanizado e equipe multidisciplinar para cuidar de você e da sua família.
          </p>
          <div className="animate-fade-up delay-300 flex flex-wrap gap-3">
            <Link href="#contato" className="btn-primary">Agendar consulta</Link>
            <Link href="#sobre" className="inline-flex items-center gap-2 text-white/80 text-sm font-sans hover:text-white transition-colors">
              Conheça o Instituto
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Cards — Changed to relative on mobile to prevent overlapping text */}
      <div className="relative lg:absolute lg:bottom-0 lg:left-0 lg:right-0 z-20 lg:translate-y-1/2 mt-10 lg:mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 shadow-2xl">
            {heroCards.map((card, i) => (
              <div
                key={card.id}
                className={`${card.bg} ${card.border} p-6 sm:p-7 flex flex-col justify-between min-h-[180px] sm:min-h-[210px] group`}
              >
                <div>
                  <h3 className="text-white text-lg sm:text-xl font-bold mb-2 sm:mb-3 font-serif">{card.title}</h3>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-sans font-light">{card.description}</p>
                </div>
                <Link
                  href={`#${card.id}`}
                  className="inline-flex items-center gap-2 text-white/75 text-[0.68rem] font-semibold mt-4 tracking-widest uppercase font-sans group-hover:text-white group-hover:gap-3 transition-all"
                >
                  SAIBA MAIS
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
