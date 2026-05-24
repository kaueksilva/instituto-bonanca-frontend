import Link from 'next/link';

export default function PorDentroSection() {
  return (
    <section id="sobre" className="py-20 sm:py-28 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text */}
          <div className="order-2 lg:order-1">
            <p className="text-primary font-sans text-xs font-semibold tracking-[0.16em] uppercase mb-3">Por dentro</p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground leading-tight mb-6">
              Cuidado especializado<br className="hidden sm:block" /> que transforma vidas
            </h2>
            <div className="w-12 h-[2px] bg-primary mb-6" />
            <p className="leading-[1.85] font-sans text-[0.9rem] text-muted mb-4">
              Com uma equipe multidisciplinar e estrutura de excelência, o Instituto Bonança oferece atendimento personalizado para uma ampla variedade de condições — de ansiedade a depressão, em um ambiente que transmite tranquilidade e segurança.
            </p>
            <p className="leading-[1.85] font-sans text-[0.9rem] text-muted mb-8">
              Somos especialistas em saúde mental infantil, com programas pensados para crianças com necessidades especiais. Nossa equipe trabalha com dedicação, acolhimento e as ferramentas mais modernas para impulsionar cada desenvolvimento.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link href="#contato" className="btn-outline-primary">Conheça mais →</Link>
              <div className="flex items-center gap-2 text-sm text-muted font-sans">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>+1.200 pacientes atendidos</span>
              </div>
            </div>
          </div>

          {/* Collage */}
          <div className="order-1 lg:order-2 relative h-[340px] sm:h-[420px]">
            {/* Main image */}
            <div className="absolute top-0 left-0 w-[68%] h-[70%] rounded overflow-hidden bg-[linear-gradient(135deg,#d4c8b8,#c0b4a0)] shadow-lg flex items-center justify-center">
              <span className="text-primary/60 text-xs italic font-sans">Foto da Estrutura</span>
            </div>
            {/* Secondary image */}
            <div className="absolute bottom-0 right-0 w-[58%] h-[55%] rounded overflow-hidden bg-[linear-gradient(135deg,#cac0b0,#b8ac9c)] shadow-xl flex items-center justify-center">
              <span className="text-primary/60 text-xs italic font-sans">Foto da Equipe</span>
            </div>
            {/* Accent dot grid */}
            <div className="absolute top-[30%] right-[35%] grid grid-cols-4 gap-1.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/20" />
              ))}
            </div>
            {/* Badge */}
            <div className="absolute z-10 w-[72px] h-[72px] rounded-full border-4 border-background bg-primary shadow-xl flex items-center justify-center top-[48%] left-[48%] -translate-x-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
