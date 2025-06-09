
import { ArrowLeft, Zap, Battery, Home, TreePine, Euro } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SolarMap from '@/components/energy/SolarMap';
import EnergyFlow from '@/components/energy/EnergyFlow';
import ProductionStats from '@/components/energy/ProductionStats';
import ConsumptionChart from '@/components/energy/ConsumptionChart';
import EnvironmentalImpact from '@/components/energy/EnvironmentalImpact';
import SolarHours from '@/components/energy/SolarHours';
import EnergyDistribution from '@/components/energy/EnergyDistribution';

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

      {/* Main Content Grid - Fixed heights to prevent overlap */}
      <div className="px-3 py-2"  style={{ height: "var(--app-height)" }} >
        <div className="grid grid-cols-12 gap-1 h-full">
          
          {/* Columna izquierda */}
          <div className="col-span-4 flex-col gap-2">
             <div className="flex-1">
              <ConsumptionChart />
            </div>
            <div className="m-3 bg-deep-slate-blue/10 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <Euro className="w-4 h-4 text-deep-slate-blue mr-1" />
                <p className="text-xs text-dusty-cyan">Ingresos Acumulados</p>
              </div>
              <p className="text-2xl font-bold text-deep-slate-blue">€1,247</p>
              <p className="text-xs text-deep-slate-blue">+€89 este mes</p>
            </div>
            <div className="flex-1 min-h-0">
              <EnergyFlow />
            </div>
          </div>

          {/* Columna central */}
          <div className="col-span-4 flex-col gap-2 h-full">
            <div className="flex-1 min-h-0">
              <ProductionStats />
            </div>
            <div className="flex-1 min-h-0">
              <SolarMap />
            </div>
           
          </div>

          {/* Columna derecha */}
          <div className="col-span-4 flex-col gap-2 h-full">
            <div className="flex-1 min-h-0">
              <SolarHours />
            </div>
            <div className="flex-1 min-h-0">
              <EnergyDistribution />
            </div>
            <div className="flex-1 min-h-0">
              <EnvironmentalImpact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyDashboard;
