
import { useNavigate } from 'react-router-dom';

const SolarProduction = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('Navigating to energy dashboard...');
    navigate('/energy-dashboard');
  };

  return (
    <div 
      onClick={handleClick}
      className="h-full flex flex-col justify-between bg-white rounded-lg p-1 sm:p-4 shadow-md border border-dusty-cyan/30 cursor-pointer hover:shadow-lg hover:border-sage-green/50 transition-all duration-200"
    >
      <h3 className="text-sm sm:text-lg font-semibold text-midnight-teal mb-1 sm:mb-2">Producción Solar</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        <div className="text-center">
          <p className="text-dusty-cyan text-xs  mb-0.5">Hoy has generado</p>
          <p className="text-lg sm:text-xl font-bold text-sage-green">4,7 kWh</p>
        </div>
        
        <div className="text-center">
          <p className="text-dusty-cyan text-xs  mb-0.5">Esta semana se acumularon</p>
          <p className="text-lg sm:text-xl font-bold text-sage-green">31,5 kWh</p>
        </div>
      </div>
      
      <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-dusty-cyan/20">
        <div className="flex justify-between items-center">
          <span className="text-dusty-cyan text-xs sm:text-sm">Ahorro estimado</span>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-base sm:text-lg font-bold text-midnight-teal">42 €</span>
            <span className="text-sage-green text-xs sm:text-sm flex items-center">
              ↑ +8 €
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarProduction;
