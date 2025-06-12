
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
      roomId: 'dormitorio',
      room: 'Dormitorio',
      currentTemp: 22,
      targetTemp: 23,
      status: 'heating' as const,
      isActive: true
    },
    {
      roomId: 'salon',
      room: 'Salón',
      currentTemp: 21,
      targetTemp: 21,
      status: 'cooling' as const,
      isActive: true
    },
    {
      roomId: 'cocina',
      room: 'Cocina',
      currentTemp: 19,
      targetTemp: undefined,
      status: 'off' as const,
      isActive: false
    }
  ];

  return (
    <div className="min-h-screen bg-ivory-mist overflow-hidden">
      
      {/* Main Content Grid - Responsive */}
      <div className="p-2 flex flex-col h-full overflow-hidden"
         style={{ height: "var(--app-height)" }}
      >
        {/* Desktop: Grid de 2 columnas, Mobile: Columna única */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 flex-1 min-h-0">
              
          {/* Columna principal - Control de temperatura */}
          <div className="md:col-span-9 flex flex-col h-full min-h-0 overflow-hidden">

            {/* Header compacto */}
            <div className="h-16 flex-shrink-0">
              <WattiHeader />
            </div>

            <div className="flex justify-between items-center mb-2 shrink-0">
              <h2 className="text-lg font-bold text-midnight-teal">Control de Temperatura</h2>
              <VoiceAssistant />
            </div>
            
            {/* Tarjetas de temperatura - Sin margin bottom en móvil para evitar overflow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 w-full flex-1 min-h-0 overflow-y-auto">
              {roomData.map((room, index) => (
                <TemperatureCard
                  key={index}
                  roomId={room.roomId}
                  room={room.room}
                  currentTemp={room.currentTemp}
                  targetTemp={room.targetTemp}
                  status={room.status}
                  isActive={room.isActive}
                />
              ))}
            </div>
            
            {/* Banner inferior con eco-hack - Margen top reducido */}
            <div className="shrink-0 mt-2">
              <EcoHackBanner />
            </div>
          </div>
          
          {/* Columna lateral - Siempre en columna */}
          <div className="md:col-span-3 flex flex-col gap-2 h-auto md:h-full mt-4 md:mt-0">
            
            {/* Los componentes siempre en columna */}
            <div className="flex flex-col gap-2 h-auto md:h-full">
              <div className="md:flex-1">
                <SolarProduction />
              </div>
              
              <div className="md:h-24 md:shrink-0">
                <NextVisit />
              </div>
              
              <div className="md:h-20 md:shrink-0">
                <AlertsSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
