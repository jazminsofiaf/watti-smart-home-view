
import WattiHeader from '@/components/WattiHeader';
import TemperatureCard from '@/components/TemperatureCard';
import SolarProduction from '@/components/SolarProduction';
import NextVisit from '@/components/NextVisit';
import EcoHackBanner from '@/components/EcoHackBanner';
import AlertsSection from '@/components/AlertsSection';
import VoiceAssistant from '@/components/VoiceAssistant';

const Index = () => {
  const roomData = [
    {
      room: 'Dormitorio',
      currentTemp: 22,
      targetTemp: 23,
      status: 'heating' as const,
      isActive: true
    },
    {
      room: 'Salón',
      currentTemp: 21,
      targetTemp: undefined,
      status: 'cooling' as const,
      isActive: true
    },
    {
      room: 'Cocina',
      currentTemp: 19,
      targetTemp: undefined,
      status: 'off' as const,
      isActive: false
    }
  ];

  return (
    <div className="min-h-screen bg-ivory-mist">
      {/* Header optimizado para móvil */}
      <WattiHeader />
      
      {/* Main Content Grid - Optimizado para móvil apaisado */}
      <div className="px-2 pb-2 sm:px-4 sm:pb-4">
        <div className="grid grid-cols-12 gap-2 sm:gap-3 max-h-[calc(100vh-120px)]">
          
          {/* Columna principal - Tarjetas de temperatura MÁS GRANDES */}
          <div className="col-span-12 lg:col-span-9">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg sm:text-xl font-bold text-midnight-teal">Control de Temperatura</h2>
              <VoiceAssistant />
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 h-[140px] sm:h-[160px]">
              {roomData.map((room, index) => (
                <TemperatureCard
                  key={index}
                  room={room.room}
                  currentTemp={room.currentTemp}
                  targetTemp={room.targetTemp}
                  status={room.status}
                  isActive={room.isActive}
                />
              ))}
            </div>
          </div>
          
          {/* Columna lateral más pequeña */}
          <div className="col-span-12 lg:col-span-3 grid grid-cols-3 lg:grid-cols-1 gap-2">
            
            {/* Producción Solar */}
            <div className="col-span-1">
              <SolarProduction />
            </div>
            
            {/* Próxima Visita */}
            <div className="col-span-1">
              <NextVisit />
            </div>
            
            {/* Alertas */}
            <div className="col-span-1">
              <AlertsSection />
            </div>
            
          </div>
        </div>
        
        {/* Banner inferior - Eco-hack más compacto */}
        <div className="mt-2">
          <EcoHackBanner />
        </div>
      </div>
    </div>
  );
};

export default Index;
