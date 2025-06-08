
const SolarProduction = () => {
  return (
    <div className="bg-white rounded-lg p-3 sm:p-6 shadow-md border border-dusty-cyan/30 h-full">
      <h3 className="text-sm sm:text-lg font-semibold text-midnight-teal mb-2 sm:mb-4">Producción Solar</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        <div className="text-center">
          <p className="text-dusty-cyan text-xs sm:text-sm mb-1">Hoy has generado</p>
          <p className="text-lg sm:text-2xl font-bold text-sage-green">4,7 kWh</p>
        </div>
        
        <div className="text-center">
          <p className="text-dusty-cyan text-xs sm:text-sm mb-1">Esta semana</p>
          <p className="text-lg sm:text-2xl font-bold text-sage-green">31,5 kWh</p>
        </div>
      </div>
      
      <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-dusty-cyan/20">
        <div className="flex justify-between items-center">
          <span className="text-dusty-cyan text-xs sm:text-sm">Ahorro estimado</span>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-lg sm:text-xl font-bold text-midnight-teal">42 €</span>
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
