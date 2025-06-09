
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
      return <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-dusty-cyan" />;
    } else if (currentTemp > targetTemp) {
      return <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-deep-slate-blue" />;
    }
    return null;
  };

  return (
    <div className={`bg-white rounded-lg p-3 sm:p-4 shadow-lg border-2 transition-all duration-200 hover:shadow-xl h-full flex flex-col justify-between ${
      isActive ? 'border-sage-green' : 'border-dusty-cyan/30'
    }`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm sm:text-lg font-bold text-midnight-teal">{room}</h3>
        {getTempComparison()}
      </div>
      
      <div className="flex-1 flex flex-col justify-center space-y-2">
        <div className="flex items-baseline justify-center space-x-2">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-midnight-teal">{currentTemp}°C</span>
        </div>
        
        {targetTemp && (
          <div className="text-center">
            <span className="text-dusty-cyan text-xs sm:text-sm">objetivo: {targetTemp}°C</span>
          </div>
        )}
        
        <p className={`text-xs sm:text-sm font-medium text-center ${getStatusColor()}`}>
          {getStatusText()}
        </p>
      </div>
    </div>
  );
};

export default TemperatureCard;
