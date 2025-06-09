
const ConsumptionChart = () => {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  const production = [420, 380, 450, 485, 520, 485];
  const consumption = [380, 340, 400, 430, 460, 420];

  const maxValue = Math.max(...production, ...consumption);

  return (
    <div className="bg-white rounded-lg p-4 shadow-md border border-dusty-cyan/30 ">
      <h3 className="text-lg font-semibold text-midnight-teal mb-3">Producción vs Consumo</h3>
      
      <div className="flex items-end justify-between space-x-2">
        {months.map((month, index) => (
          <div key={month} className="flex-1 flex flex-col items-center">
            <div className="flex items-end space-x-1 mb-2 h-24">
              {/* Barra de producción */}
              <div 
                className="bg-sage-green rounded-t w-3"
                style={{ height: `${(production[index] / maxValue) * 100}%` }}
              />
              {/* Barra de consumo */}
              <div 
                className="bg-orange-500 rounded-t w-3"
                style={{ height: `${(consumption[index] / maxValue) * 100}%` }}
              />
            </div>
            <p className="text-xs text-dusty-cyan">{month}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4 mt-3">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-sage-green rounded mr-2" />
          <span className="text-xs text-midnight-teal">Producción</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-orange-500 rounded mr-2" />
          <span className="text-xs text-midnight-teal">Consumo</span>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionChart;
