import Link from 'next/link';

interface Specialty {
  title: string;
  description: string;
}

const specialties: Specialty[] = [
  { title: 'Psicologia',         description: 'No instituto de psicologia realizamos avaliação de saúde, relacionamento. Recomendação profissional e equipe prática, proporcionando tratamento de qualidade.' },
  { title: 'Fisioterapia',       description: 'A objetivo nosso é que proporcionar, falar, funcionamento, na qualidade da equipe, em que possa ser uma especialidade da equipe de tratamento.' },
  { title: 'Fonoaudiologia',     description: 'Nossa missão é proporcionar o atender de cada paciente de nossos tratamentos com excelência e dedicação.' },
  { title: 'Nutrição',           description: 'Nossa missão tratamentos em que melhorar o proporcionar saúde, proporcionar da equipe de trabalho e proporcionar uma dieta para as melhores profissionais.' },
  { title: 'PECS',               description: 'PECS é um método para ajudar os que são uma profissional para te ajudar. O tratamento de PECS é para te ajudar na especialidade.' },
  { title: 'Terapia Ocupacional',description: 'Proporcionando o atender de cada paciente de nossos tratamentos de alcan com qualidade e dedicação.' },
];

function SpecialtyCard({ title, description }: Specialty) {
  return (
    <div className="specialty-card group">
      <div className="h-[195px] bg-[linear-gradient(135deg,#cfc3b3_0%,#bdb1a0_100%)] flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]">
        <span className="text-primary text-[0.8rem] italic font-sans">{title}</span>
      </div>
      <div className="p-6">
        <h3 className="mb-3 font-serif text-[1.1rem] font-bold text-foreground">{title}</h3>
        <p className="mb-4 text-sm leading-[1.75] font-sans text-card-text">{description}</p>
        <Link href="#" className="specialty-card-link">
          SAIBA MAIS
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function EspecialidadesSection() {
  return (
    <section id="especialidades" className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-sm mb-2 font-sans text-primary font-semibold uppercase tracking-wider">
          Equipe Multidisciplinar
        </p>
        <h2 className="text-center mb-12 font-serif font-bold text-3xl sm:text-4xl text-foreground">
          Especialidades
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {specialties.map((s) => (
            <SpecialtyCard key={s.title} {...s} />
          ))}
        </div>

        <div className="text-center">
          <Link href="#" className="btn-outline-primary">VER TODAS</Link>
        </div>
      </div>
    </section>
  );
}
