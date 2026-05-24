'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home',            href: '/' },
  { label: 'Instituto',       href: '#sobre' },
  { label: 'Tratamentos',     href: '#tratamentos', dropdown: true },
  { label: 'Especialidades',  href: '#especialidades', dropdown: true },
  { label: 'Nossa Estrutura', href: '#estrutura' },
  { label: 'Blog',            href: '#blog' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* ── Top Bar ───────────────────────────────────────────── */}
      <div className={`bg-white z-50 relative transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="font-serif italic text-white text-base font-bold">B</span>
            </div>
            <span className="font-serif font-bold text-[1rem] sm:text-[1.1rem] text-foreground tracking-tight">
              Instituto <span className="text-primary">Bonança</span>
            </span>
          </Link>

          {/* Contact Info — hidden on small screens */}
          <div className="hidden lg:flex items-center gap-6">
            <ContactInfo icon="phone"  label="Fale conosco"          value="(81) 98956-7886" />
            <ContactInfo icon="email"  label="Atendimento 8h – 20h"  value="contato@institutobonanca.com.br" />
          </div>
        </div>
      </div>

      {/* ── Main Nav ──────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-primary shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* Desktop links — changed from md:flex to lg:flex to prevent overlap */}
          <nav className="hidden lg:flex items-center overflow-x-auto">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="nav-link-hover font-sans whitespace-nowrap">
                {item.label}
                {item.dropdown && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth={2.2} stroke="currentColor" className="w-3 h-3 opacity-75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                )}
              </Link>
            ))}
          </nav>

          <Link
            href="#contato"
            className="hidden lg:block px-5 py-[18px] bg-primary-dark text-white text-xs font-bold font-sans tracking-[0.08em] uppercase hover:bg-foreground transition-colors whitespace-nowrap"
          >
            Entrar em Contato
          </Link>

          {/* Hamburger — changed from md:hidden to lg:hidden */}
          <button
            className="lg:hidden text-white p-4 ml-auto"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
            </svg>
          </button>
        </div>

        {/* Mobile Menu — changed from md:hidden to lg:hidden */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
          <div className="bg-primary-dark border-t border-white/10 py-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-6 py-3 text-white/90 text-sm font-sans font-medium border-b border-white/5 last:border-0 hover:bg-white/10 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-6 py-4">
              <Link href="#contato" className="btn-primary w-full justify-center" onClick={() => setMobileOpen(false)}>
                Entrar em Contato
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */
function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="white" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="white" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function ContactInfo({ icon, label, value }: { icon: 'phone' | 'email'; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          {icon === 'phone' ? <PhoneIcon /> : <EmailIcon />}
        </div>
      </div>
      <div>
        <p className="text-[0.68rem] text-primary font-sans font-medium uppercase tracking-wider">{label}</p>
        <p className="text-[0.82rem] font-semibold text-foreground font-sans">{value}</p>
      </div>
    </div>
  );
}
