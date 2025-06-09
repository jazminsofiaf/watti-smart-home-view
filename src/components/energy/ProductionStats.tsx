
import { TrendingUp, Euro } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductionStats = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log('Navigating to energy flow...');
    navigate('/energy-flow');
  };
  return (
    <div 
    onClick={handleClick}
    className="bg-white rounded-lg p-4 shadow-md border border-dusty-cyan/30 h-full">
      <h3 className="text-lg font-semibold text-midnight-teal mb-3">Estadísticas de Producción</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-sage-green/10 rounded-lg p-3 text-center">
          <p className="text-xs text-dusty-cyan mb-1">Producción Mensual</p>
          <p className="text-xl font-bold text-sage-green">485 kWh</p>
          <p className="text-xs text-sage-green">+12% vs mes anterior</p>
        </div>

        <div className="bg-sage-green/10 rounded-lg p-3 text-center">
          <p className="text-xs text-dusty-cyan mb-1">Producción Anual</p>
          <p className="text-xl font-bold text-sage-green">5240kWh</p>
          <p className="text-xs text-sage-green">Meta: 5,800 kWh</p>
        </div>

        <div className="bg-dusty-cyan/10 rounded-lg p-3 text-center">
          <p className="text-xs text-dusty-cyan mb-1">Autoconsumo</p>
          <p className="text-xl font-bold text-dusty-cyan">76%</p>
          <TrendingUp className="w-4 h-4 text-dusty-cyan mx-auto mt-1" />
        </div>

        <div className="bg-orange-100 rounded-lg p-3 text-center">
          <p className="text-xs text-dusty-cyan mb-1">Energía Importada</p>
          <p className="text-xl font-bold text-orange-600">24%</p>
          <p className="text-xs text-orange-600">-5% vs mes anterior</p>
        </div>
      </div>
    </div>
  );
};

export default ProductionStats;
