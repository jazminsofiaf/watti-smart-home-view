
import WattiHeader from '@/components/WattiHeader';
import TemperatureCard from '@/components/TemperatureCard';
import SolarProduction from '@/components/SolarProduction';
import NextVisit from '@/components/NextVisit';
import EcoHackBanner from '@/components/EcoHackBanner';
import AlertsSection from '@/components/AlertsSection';

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
      <div className="px-3 pb-3 sm:px-6 sm:pb-6">
        <div className="grid grid-cols-12 gap-2 sm:gap-4 lg:gap-6 h-[calc(100vh-100px)] sm:h-[calc(100vh-120px)]">
          
          {/* Columna principal - Tarjetas de temperatura */}
          <div className="col-span-12 lg:col-span-8">
            <h2 className="text-lg sm:text-xl font-bold text-midnight-teal mb-2 sm:mb-4">Control de Temperatura</h2>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 h-full">
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
          
          {/* Columna lateral - responsive */}
          <div className="col-span-12 lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-4">
            
            {/* Producción Solar */}
            <div className="col-span-1">
              <SolarProduction />
            </div>
            
            {/* Próxima Visita */}
            <div className="col-span-1">
              <NextVisit />
            </div>
            
            {/* Alertas - span completo en móvil */}
            <div className="col-span-2 lg:col-span-1">
              <AlertsSection />
            </div>
            
          </div>
        </div>
        
        {/* Banner inferior - Eco-hack */}
        <div className="mt-3 sm:mt-6">
          <EcoHackBanner />
        </div>
      </div>
    </div>
  );
};

export default Index;
