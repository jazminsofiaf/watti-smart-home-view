
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
      targetTemp: 21,
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
    <div className="min-h-screen bg-ivory-mist overflow-hidden">
      
      {/* Main Content Grid - Sin scroll, altura fija */}
      <div className="p-2 flex flex-col  h-full overflow-hidden"
         style={{ height: "var(--app-height)" }}
      >
        <div className="grid grid-cols-12 gap-2 h-full">

              
          {/* Columna principal - Control de temperatura */}
          <div className="col-span-9 flex flex-col h-full min-h-0 overflow-hidden">

            {/* Header compacto */}
            <div className="h-16 flex-shrink-0">
              <WattiHeader />
            </div>

            <div className="flex justify-between items-center mb-2 shrink-0">
              <h2 className="text-lg font-bold text-midnight-teal">Control de Temperatura</h2>
              <VoiceAssistant />
            </div>
            
            {/* Tarjetas de temperatura */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
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
            
            {/* Banner inferior con eco-hack */}
            <div className="mt-2 shrink-0">
              <EcoHackBanner />
            </div>
          </div>
          
          {/* Columna lateral compacta */}
          <div className="col-span-3 grid grid-rows-4 gap-2 h-full overflow-hidden">
            <div className="row-span-2 h-full overflow-hidden">
              <SolarProduction />
            </div>
            <div className="row-span-1 h-full overflow-hidden">
              <NextVisit />
            </div>
            <div className="row-span-1 h-full overflow-hidden">
              <AlertsSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
