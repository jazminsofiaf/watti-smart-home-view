
import { ArrowLeft, Zap, Battery, Home, TreePine, Euro } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductionStats from '@/components/energy/ProductionStats';
import ConsumptionChart from '@/components/energy/ConsumptionChart';
import SolarHours from '@/components/energy/SolarHours';

const EnergyDashboard = () => {
  const navigate = useNavigate();

  console.log('EnergyDashboard component loaded');

  return (
    <div className="min-h-screen bg-ivory-mist overflow-hidden">
      {/* Header */}
      <div className="h-10 bg-white shadow-sm border-b border-dusty-cyan/20 flex items-center px-4">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-dusty-cyan/10 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-midnight-teal" />
        </button>
        <h1 className="ml-3 text-lg font-bold text-midnight-teal">Dashboard Energético</h1>
      </div>

      {/* Main Content Grid - Responsive */}
      <div className="px-3 py-2" style={{ height: "var(--app-height)" }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 h-full">
          
          {/* Columna izquierda */}
          <div className="md:col-span-4 flex flex-col gap-2">
             <div>
              <ConsumptionChart />
            </div>
            <div className="m-3 bg-deep-slate-blue/10 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <Euro className="w-4 h-4 text-deep-slate-blue mr-1" />
                <p className="text-xs text-dusty-cyan">Ingresos Acumulados</p>
              </div>
              <p className="text-2xl font-bold text-deep-slate-blue">€347</p>
              <p className="text-xs text-deep-slate-blue">+€48 este mes</p>
            </div>
          </div>

          {/* Columna central */}
          <div className="md:col-span-4 flex flex-col gap-2 h-full">
            <div className="min-h-0">
              <ProductionStats />
            </div>
          </div>

          {/* Columna derecha */}
          <div className="md:col-span-4 flex flex-col gap-2 h-full">
            <div className=" min-h-0">
              <SolarHours />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyDashboard;
