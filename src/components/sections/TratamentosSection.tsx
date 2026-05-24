import Link from 'next/link';

const treatments = [
  'Tratamento de Espectro Autista',
  'Ansiedade',
  'Transtorno Bipolar',
  'Borderline',
  'Depressão',
  'Esquizofrenia',
  'TOC',
  'TDAH',
  'Transtorno de Alimentação',
];

export default function TratamentosSection() {
  return (
    <section id="tratamentos" className="py-20 sm:py-28 bg-treatments">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left */}
          <div>
            <p className="text-foreground/60 font-sans text-xs font-semibold tracking-[0.16em] uppercase mb-3">Especialidades</p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground leading-tight mb-4">
              Tratamentos disponíveis
            </h2>
            <div className="w-12 h-[2px] bg-foreground/40 mb-6" />
            <p className="leading-[1.85] font-sans text-sm text-foreground/80 mb-4">
              Oferecemos uma vasta gama de tratamentos para ajudá-lo a encontrar o especialista certo. Cada abordagem é baseada em evidências científicas e adaptada às necessidades individuais de cada paciente.
            </p>
            <p className="leading-[1.85] font-sans text-sm text-foreground/80 mb-10">
              Nossa equipe multidisciplinar garante um cuidado integrado, unindo psicologia, neurologia, fisioterapia e outras especialidades sob o mesmo teto.
            </p>
            <Link href="#" className="btn-dark">Ver todos os tratamentos →</Link>
          </div>

          {/* Right — numbered list */}
          <div>
            <ul className="divide-y divide-foreground/12">
              {treatments.map((item, i) => (
                <li key={item}>
                  <Link href="#" className="treatment-item group font-sans">
                    <div className="flex items-center gap-4">
                      <span className="text-[0.65rem] font-bold text-foreground/35 font-sans w-5 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-medium">{item}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 shrink-0 opacity-30 group-hover:opacity-70 group-hover:translate-x-1 transition-all">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
