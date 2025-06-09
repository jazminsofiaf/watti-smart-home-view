
import { Home, Zap } from 'lucide-react';

const SolarMap = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md border border-dusty-cyan/30 h-full">
      <h3 className="text-lg font-semibold text-midnight-teal mb-3">Mapa Solar de la Casa</h3>
      
      <div className="relative bg-sage-green/10 rounded-lg h-full min-h-[200px] flex items-center justify-center">
        {/* Casa simplificada */}
        <div className="relative">
          <Home className="w-20 h-20 text-midnight-teal" />
          
          {/* Paneles solares en el techo */}
          <div className="absolute -top-6 left-2 grid grid-cols-4 gap-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-2 bg-deep-slate-blue rounded-sm animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          
          {/* Indicadores de energía */}
          <div className="absolute -top-12 -right-4">
            <Zap className="w-6 h-6 text-sage-green animate-bounce" />
          </div>
        </div>
        
        {/* Info overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/90 rounded-lg p-2 text-center">
            <p className="text-sm text-midnight-teal font-medium">8 Paneles Activos</p>
            <p className="text-xs text-dusty-cyan">Generando 3.2 kW</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarMap;
