
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
      targetTemp: "23°C",
      status: 'heating' as const,
      isActive: true
    },
    {
      room: 'Salón',
      currentTemp: 21,
      targetTemp: "21°C",
      status: 'cooling' as const,
      isActive: true
    },
    {
      room: 'Cocina',
      currentTemp: 19,
      targetTemp: '-',
      status: 'off' as const,
      isActive: false
    }
  ];

  return (
    <div className="min-h-screen bg-ivory-mist overflow-hidden">
      {/* Header compacto */}
      <div className="h-16 flex-shrink-0">
        <WattiHeader />
      </div>
      
      {/* Main Content Grid - Sin scroll, altura fija */}
      <div className="p-2 flex flex-col  h-full overflow-hidden"
         style={{ height: "calc(var(--app-height) - 64px)" }}
      >
        <div className="grid grid-cols-12 gap-2 h-full">
          
          {/* Columna principal - Tarjetas de temperatura */}
          <div className="col-span-9 flex flex-col h-full min-h-0 overflow-hidden">
            <div className="flex justify-between items-center mb-2 shrink-0">
              <h2 className="text-lg font-bold text-midnight-teal">Control de Temperatura</h2>
              <VoiceAssistant />
            </div>
            
            {/* Tarjetas de temperatura */}
            <div className="grid grid-cols-3 gap-3 flex-1 min-h-0 overflow-y-auto">
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
            
            {/* Banner inferior compacto */}
            <div className="mt-2 shrink-0">
              <EcoHackBanner />
            </div>
          </div>
          
          {/* Columna lateral compacta */}
          <div className="col-span-3 grid grid-rows-3 gap-2 h-full overflow-hidden">
            <div className="row-span-1">
              <SolarProduction />
            </div>
            <div className="row-span-1">
              <NextVisit />
            </div>
            <div className="row-span-1">
              <AlertsSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
