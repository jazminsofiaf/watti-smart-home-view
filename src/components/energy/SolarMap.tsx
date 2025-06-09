
import { Home, Zap, Wind, Thermometer } from 'lucide-react';

const SolarMap = () => {
  return (
    <div className="bg-white rounded-lg p-3 shadow-md border border-dusty-cyan/30 h-full flex flex-col">
      <h3 className="text-sm font-semibold text-midnight-teal mb-2">Mapa Solar de la Casa</h3>
      
      <div className="relative bg-sage-green/10 rounded-lg flex-1 min-h-0 p-2">
        {/* Casa principal */}
        <div className="relative mx-auto" style={{ width: '120px', height: '80px' }}>
          {/* Estructura de la casa */}
          <div className="absolute bottom-0 w-full h-12 bg-gray-300 rounded-sm border-2 border-gray-400">
            {/* Ventanas */}
            <div className="absolute top-1 left-2 w-3 h-3 bg-blue-200 rounded-sm"></div>
            <div className="absolute top-1 right-2 w-3 h-3 bg-blue-200 rounded-sm"></div>
          </div>
          
          {/* Techo */}
          <div className="absolute top-6 left-2 right-2 h-8 bg-red-400 transform -skew-y-12 rounded-sm"></div>
          
          {/* Paneles solares en el techo */}
          <div className="absolute top-2 left-4 grid grid-cols-4 gap-0.5 z-10">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-2 bg-deep-slate-blue rounded-sm animate-pulse shadow-sm"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
          
          {/* Indicador de generación de energía */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <Zap className="w-4 h-4 text-sage-green animate-bounce" />
          </div>
          
          {/* Aires acondicionados */}
          <div className="absolute top-8 -left-2">
            <div className="w-4 h-3 bg-gray-600 rounded-sm flex items-center justify-center">
              <Wind className="w-2 h-2 text-white" />
            </div>
            <div className="w-1 h-2 bg-dusty-cyan mx-auto animate-pulse"></div>
          </div>
          
          <div className="absolute top-8 -right-2">
            <div className="w-4 h-3 bg-gray-600 rounded-sm flex items-center justify-center">
              <Wind className="w-2 h-2 text-white" />
            </div>
            <div className="w-1 h-2 bg-dusty-cyan mx-auto animate-pulse"></div>
          </div>
          
          {/* Conexiones eléctricas */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Línea de paneles a aires */}
            <path
              d="M60 8 L20 35 M60 8 L100 35"
              stroke="#AEC3B0"
              strokeWidth="1"
              strokeDasharray="2,2"
              className="animate-pulse"
            />
          </svg>
        </div>
        
        {/* Info panel */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="bg-white/95 rounded p-2 text-center text-xs">
            <div className="flex justify-between items-center mb-1">
              <span className="text-midnight-teal font-medium">8 Paneles</span>
              <span className="text-sage-green font-bold">3.2 kW</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-dusty-cyan">2 Aires</span>
              <span className="text-dusty-cyan font-medium">2.1 kW</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarMap;
