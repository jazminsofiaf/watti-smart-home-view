
import { Sun } from 'lucide-react';
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
      className="h-full flex flex-col justify-between bg-white rounded-lg p-2 sm:p-4 shadow-md border border-dusty-cyan/30 cursor-pointer hover:shadow-lg hover:border-sage-green/50 transition-all duration-200"
    >
      
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-dusty-cyan shrink-0 self-center" />
        <h3 className="text-xs sm:text-sm font-semibold text-midnight-teal">
          Producción Solar
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        <div className="text-center">
          <p className="text-dusty-cyan text-xs  mb-0.5">Generado solo hoy</p>
          <p className="text-base sm:text-lg font-bold text-sage-green">54,7 kWh</p>
        </div>
        
        <div className="text-center">
          <p className="text-dusty-cyan text-xs  mb-0.5">Generado este mes</p>
          <p className="text-base sm:text-lg font-bold text-sage-green">159,5 kWh</p>
        </div>
      </div>
      
      <div className="mt-1 sm:mt-1 pt-1 sm:pt-2 border-t border-dusty-cyan/20">
        <div className="grid grid-cols-3 items-center text-center gap-x-2 sm:gap-x-4">
          <div>
            <span className="text-dusty-cyan text-xs block leading-tight">
              Ahorro<br />estimado
            </span>
          </div>
          
          <div>
            <span className="text-base sm:text-lg font-bold text-midnight-teal">
              48 €
            </span>
          </div>
          
          <div>
            <span className="text-sage-green text-xs sm:text-sm flex justify-center items-center">
              ↑ +7 €
            </span>
          </div>
      </div>

      </div>
    </div>
  );
};

export default SolarProduction;
