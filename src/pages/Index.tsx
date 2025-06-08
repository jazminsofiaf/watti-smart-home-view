
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
      {/* Header */}
      <WattiHeader />
      
      {/* Main Content Grid - Optimizado para modo apaisado */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">
          
          {/* Columna principal - Tarjetas de temperatura (ocupa la mayor parte) */}
          <div className="col-span-8">
            <h2 className="text-xl font-bold text-midnight-teal mb-4">Control de Temperatura</h2>
            <div className="grid grid-cols-3 gap-4 h-full">
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
          
          {/* Columna lateral derecha */}
          <div className="col-span-4 space-y-4">
            
            {/* Producción Solar */}
            <SolarProduction />
            
            {/* Próxima Visita */}
            <NextVisit />
            
            {/* Alertas */}
            <AlertsSection />
            
          </div>
        </div>
        
        {/* Banner inferior - Eco-hack */}
        <div className="mt-6">
          <EcoHackBanner />
        </div>
      </div>
    </div>
  );
};

export default Index;
