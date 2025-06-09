
import { ArrowRight, Battery, Home, Zap } from 'lucide-react';

const EnergyFlow = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md border border-dusty-cyan/30 h-full">
      <h3 className="text-lg font-semibold text-midnight-teal mb-3">Flujo de Energía</h3>
      
      <div className="flex items-center justify-between h-[calc(100%-60px)]">
        {/* Paneles Solares */}
        <div className="text-center">
          <div className="w-16 h-16 bg-sage-green rounded-lg flex items-center justify-center mb-2">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <p className="text-xs font-medium text-midnight-teal">Paneles</p>
          <p className="text-sm font-bold text-sage-green">3.2 kW</p>
        </div>

        <ArrowRight className="w-6 h-6 text-dusty-cyan animate-pulse" />

        {/* Casa */}
        <div className="text-center">
          <div className="w-16 h-16 bg-dusty-cyan rounded-lg flex items-center justify-center mb-2">
            <Home className="w-8 h-8 text-white" />
          </div>
          <p className="text-xs font-medium text-midnight-teal">Consumo</p>
          <p className="text-sm font-bold text-dusty-cyan">2.1 kW</p>
        </div>

        <ArrowRight className="w-6 h-6 text-dusty-cyan animate-pulse" />

        {/* Batería */}
        <div className="text-center">
          <div className="w-16 h-16 bg-deep-slate-blue rounded-lg flex items-center justify-center mb-2">
            <Battery className="w-8 h-8 text-white" />
          </div>
          <p className="text-xs font-medium text-midnight-teal">Batería</p>
          <p className="text-sm font-bold text-deep-slate-blue">0.8 kW</p>
        </div>

        <ArrowRight className="w-6 h-6 text-dusty-cyan animate-pulse" />

        {/* Red */}
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center mb-2">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <p className="text-xs font-medium text-midnight-teal">Red</p>
          <p className="text-sm font-bold text-orange-600">0.3 kW</p>
        </div>
      </div>
    </div>
  );
};

export default EnergyFlow;
