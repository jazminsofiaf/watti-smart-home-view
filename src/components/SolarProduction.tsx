
const SolarProduction = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-dusty-cyan/30">
      <h3 className="text-lg font-semibold text-midnight-teal mb-4">Producción Solar</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-dusty-cyan text-sm mb-1">Hoy has generado</p>
          <p className="text-2xl font-bold text-sage-green">4,7 kWh</p>
        </div>
        
        <div className="text-center">
          <p className="text-dusty-cyan text-sm mb-1">Esta semana</p>
          <p className="text-2xl font-bold text-sage-green">31,5 kWh</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-dusty-cyan/20">
        <div className="flex justify-between items-center">
          <span className="text-dusty-cyan text-sm">Ahorro estimado</span>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-midnight-teal">42 €</span>
            <span className="text-sage-green text-sm flex items-center">
              ↑ +8 €
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarProduction;
