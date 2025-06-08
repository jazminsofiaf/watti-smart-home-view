
import { ArrowUp, ArrowDown } from 'lucide-react';

interface TemperatureCardProps {
  room: string;
  currentTemp: number;
  targetTemp?: number;
  status: 'heating' | 'cooling' | 'off' | 'auto';
  isActive: boolean;
}

const TemperatureCard = ({ room, currentTemp, targetTemp, status, isActive }: TemperatureCardProps) => {
  const getStatusText = () => {
    switch (status) {
      case 'heating': return 'calefacción encendida';
      case 'cooling': return 'aire encendido';
      case 'off': return 'apagado';
      case 'auto': return 'modo automático';
      default: return '';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'heating': return 'text-dusty-cyan';
      case 'cooling': return 'text-deep-slate-blue';
      case 'off': return 'text-dusty-cyan';
      case 'auto': return 'text-sage-green';
      default: return 'text-dusty-cyan';
    }
  };

  const getTempComparison = () => {
    if (!targetTemp) return null;
    if (currentTemp < targetTemp) {
      return <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 text-dusty-cyan" />;
    } else if (currentTemp > targetTemp) {
      return <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-deep-slate-blue" />;
    }
    return null;
  };

  return (
    <div className={`bg-white rounded-lg p-2 sm:p-3 shadow-md border-2 transition-all duration-200 hover:shadow-lg h-fit ${
      isActive ? 'border-sage-green' : 'border-dusty-cyan/30'
    }`}>
      <div className="flex justify-between items-start mb-1 sm:mb-2">
        <h3 className="text-xs sm:text-base font-semibold text-midnight-teal">{room}</h3>
        {getTempComparison()}
      </div>
      
      <div className="space-y-1">
        <div className="flex items-baseline space-x-1">
          <span className="text-lg sm:text-2xl font-bold text-midnight-teal">{currentTemp}°C</span>
          {targetTemp && (
            <span className="text-dusty-cyan text-xs">objetivo: {targetTemp}°C</span>
          )}
        </div>
        
        <p className={`text-xs font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </p>
      </div>
    </div>
  );
};

export default TemperatureCard;
