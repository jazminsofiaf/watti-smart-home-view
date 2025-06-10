
import { ArrowLeft, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const EcoHacksPage = () => {
  const navigate = useNavigate();
  const [visibleTips, setVisibleTips] = useState(4);

  const allTips = [
    {
      id: 1,
      title: "Temperatura ideal",
      tip: "Mantené el aire entre 22-24°C para ahorrar hasta 20% de energía"
    },
    {
      id: 2,
      title: "Puertas cerradas",
      tip: "Cerrá la puerta del pasillo al encender el aire para ahorrar 12%"
    },
    {
      id: 3,
      title: "Horarios inteligentes",
      tip: "Programá el aire 30 min antes de llegar a casa, no al máximo al entrar"
    },
    {
      id: 4,
      title: "Ventilador complementario",
      tip: "Usá ventilador con aire a 25°C en lugar de aire solo a 22°C"
    },
    {
      id: 5,
      title: "Cortinas y persianas",
      tip: "Cerrá las cortinas durante el día para mantener el fresco"
    },
    {
      id: 6,
      title: "Mantenimiento regular",
      tip: "Limpiá los filtros cada 15 días para mantener eficiencia del 95%"
    },
    {
      id: 7,
      title: "Modo nocturno",
      tip: "Activá el modo nocturno para reducir 15% el consumo mientras dormís"
    },
    {
      id: 8,
      title: "Sellado de ventanas",
      tip: "Revisá que no haya filtraciones de aire por ventanas y puertas"
    }
  ];

  useEffect(() => {
    const calculateVisibleTips = () => {
      const isHorizontal = window.innerWidth > window.innerHeight;
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      
      // Altura aproximada de header (80px) + título (60px) + spacing (40px)
      const usedHeight = 180;
      const availableHeight = viewportHeight - usedHeight;
      
      // Altura aproximada por tip (120px incluyendo spacing)
      const tipHeight = 120;
      const columns = isHorizontal ? 2 : 1;
      const rows = Math.floor(availableHeight / tipHeight);
      
      setVisibleTips(Math.max(2, Math.min(rows * columns, allTips.length)));
    };

    calculateVisibleTips();
    window.addEventListener('resize', calculateVisibleTips);
    window.addEventListener('orientationchange', calculateVisibleTips);

    return () => {
      window.removeEventListener('resize', calculateVisibleTips);
      window.removeEventListener('orientationchange', calculateVisibleTips);
    };
  }, []);

  const displayedTips = allTips.slice(0, visibleTips);
  const isHorizontal = window.innerWidth > window.innerHeight;

  return (
    <div 
      className="min-h-screen bg-ivory-mist p-4 overflow-hidden"
      style={{ height: "var(--app-height)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/')}
          className="text-midnight-teal hover:bg-dusty-cyan/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <Lightbulb className="w-6 h-6 text-midnight-teal" />
          <h1 className="text-2xl font-bold text-midnight-teal">Eco-hacks para Ahorrar Energía</h1>
        </div>
      </div>

      {/* Tips Grid */}
      <div 
        className={`grid gap-4 h-full overflow-hidden ${
          isHorizontal ? 'grid-cols-2' : 'grid-cols-1'
        }`}
        style={{ maxHeight: 'calc(var(--app-height) - 180px)' }}
      >
        {displayedTips.map((tip, index) => (
          <div
            key={tip.id}
            className="bg-sage-green rounded-lg p-4 shadow-md animate-fade-in border-l-4 border-l-midnight-teal"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'both'
            }}
          >
            <div className="flex items-start space-x-3">
              <div className="bg-midnight-teal rounded-full p-2 flex-shrink-0">
                <span className="text-ivory-mist text-lg">💡</span>
              </div>
              <div className="flex-1">
                <h3 className="text-midnight-teal font-semibold text-lg mb-2">
                  {tip.title}
                </h3>
                <p className="text-midnight-teal text-sm leading-relaxed">
                  {tip.tip}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EcoHacksPage;
