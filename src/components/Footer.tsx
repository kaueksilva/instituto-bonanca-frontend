'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuLinks = ['Home', 'Instituto', 'Especialidades', 'Tratamentos', 'Blog', 'Contato'];
const treatmentLinks = ['TEA', 'Ansiedade', 'Depressão', 'Tratamento de Espectro Autista', 'TDAH', 'Ver Todos'];

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-foreground text-white">

      {/* CTA Banner */}
      <div className="text-center py-12 border-b border-white/5">
        <Link href="#contato" className="btn-primary gap-3 px-8 py-4 bg-primary hover:bg-primary-dark text-white text-sm font-bold tracking-widest uppercase font-sans transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969-0 01-.474-.065 4.48 4.48 0 00.978-2.025c-.09-.08-.176-.168-.257-.26C3.165 17.02 2 14.656 2 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          FALE COM UM ESPECIALISTA
        </Link>
      </div>

      {/* Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

        {/* Logo and Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-primary bg-primary flex items-center justify-center text-white font-bold">
              <span className="font-serif italic text-base">B</span>
            </div>
            <span className="font-serif font-bold text-lg text-white">
              Instituto <span className="text-primary-light">Bonança</span>
            </span>
          </div>
          <p className="text-white/50 text-sm font-sans font-light leading-relaxed max-w-xs">
            Cuidado especializado e humanizado em saúde mental para você e sua família.
          </p>
        </div>

        {/* Menu */}
        <div>
          <h4 className="mb-6 font-bold text-xs tracking-[0.15em] uppercase font-sans text-primary-light">MENU</h4>
          <ul className="space-y-3">
            {menuLinks.map((item) => (
              <li key={item}>
                <Link href={`#${item.toLowerCase()}`} className="footer-link hover:text-white transition-colors duration-200">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tratamentos */}
        <div>
          <h4 className="mb-6 font-bold text-xs tracking-[0.15em] uppercase font-sans text-primary-light">TRATAMENTOS</h4>
          <ul className="space-y-3">
            {treatmentLinks.map((item) => (
              <li key={item}>
                <Link href="#" className="footer-link hover:text-white transition-colors duration-200">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Endereços */}
        <div>
          <h4 className="mb-6 font-bold text-xs tracking-[0.15em] uppercase font-sans text-primary-light">ENDEREÇOS</h4>
          <ul className="space-y-5">
            <li className="text-sm font-light font-sans text-white/60 leading-relaxed">
              <span className="font-semibold text-white/80 block mb-1">Unidade Boa Viagem</span>
              Av. Conselheiro Aguiar, 2925<br />Recife-PE, 51020-020
            </li>
            <li className="text-sm font-light font-sans text-white/60 leading-relaxed">
              <span className="font-semibold text-white/80 block mb-1">Unidade Pindaíba</span>
              R. Servilha, Pq Reboças – 18, sala<br />Teresina-PI Distrito – Pindaíba
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-light font-sans text-white/30 text-center sm:text-left">
            © {new Date().getFullYear()} – Todos os direitos reservados – Instituto Bonança
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs font-light font-sans text-white/30 hover:text-white/60 transition-colors">Termos de Uso</Link>
            <Link href="#" className="text-xs font-light font-sans text-white/30 hover:text-white/60 transition-colors">Privacidade</Link>
          </div>
        </div>
      </div>

      {/* WhatsApp */}
      <a href="https://wa.me/5581989567886" target="_blank" rel="noopener noreferrer" className="whatsapp-btn" aria-label="WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

    </footer>
  );
}
