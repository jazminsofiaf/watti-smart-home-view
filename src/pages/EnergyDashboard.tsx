
import { ArrowLeft, Zap, Battery, Home, TreePine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SolarMap from '@/components/energy/SolarMap';
import EnergyFlow from '@/components/energy/EnergyFlow';
import ProductionStats from '@/components/energy/ProductionStats';
import ConsumptionChart from '@/components/energy/ConsumptionChart';
import EnvironmentalImpact from '@/components/energy/EnvironmentalImpact';
import SolarHours from '@/components/energy/SolarHours';

const EnergyDashboard = () => {
  const navigate = useNavigate();

  console.log('EnergyDashboard component loaded');

  return (
    <div className="min-h-screen bg-ivory-mist overflow-hidden">
      {/* Header */}
      <div className="h-16 bg-white shadow-sm border-b border-dusty-cyan/20 flex items-center px-4">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-dusty-cyan/10 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-midnight-teal" />
        </button>
        <h1 className="ml-3 text-xl font-bold text-midnight-teal">Dashboard Energético</h1>
      </div>

      {/* Main Content Grid */}
      <div className="px-4 py-2 h-[calc(100vh-64px)]">
        <div className="grid grid-cols-12 gap-3 h-full">
          
          {/* Columna izquierda - Mapa y flujo de energía */}
          <div className="col-span-5 grid grid-rows-2 gap-3">
            <div className="row-span-1">
              <SolarMap />
            </div>
            <div className="row-span-1">
              <EnergyFlow />
            </div>
          </div>

          {/* Columna central - Estadísticas y gráfico */}
          <div className="col-span-4 grid grid-rows-2 gap-3">
            <div className="row-span-1">
              <ProductionStats />
            </div>
            <div className="row-span-1">
              <ConsumptionChart />
            </div>
          </div>

          {/* Columna derecha - Horas solares e impacto ambiental */}
          <div className="col-span-3 grid grid-rows-2 gap-3">
            <div className="row-span-1">
              <SolarHours />
            </div>
            <div className="row-span-1">
              <EnvironmentalImpact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyDashboard;
