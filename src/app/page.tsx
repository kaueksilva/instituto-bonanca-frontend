import HeroSection from '@/components/sections/HeroSection';
import PorDentroSection from '@/components/sections/PorDentroSection';
import TratamentosSection from '@/components/sections/TratamentosSection';
import EspecialidadesSection from '@/components/sections/EspecialidadesSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <HeroSection />
      {/* Spacer to offset the floating hero cards on desktop */}
      <div className="h-[40px] lg:h-[115px]" />
      <PorDentroSection />
      <TratamentosSection />
      <EspecialidadesSection />
    </div>
  );
}
