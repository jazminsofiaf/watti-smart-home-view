
import { Sun, Clock } from 'lucide-react';

const SolarHours = () => {
  const solarPercentage = 78;

  return (
    <div className="bg-white rounded-lg p-4 shadow-md border border-dusty-cyan/30 h-full">
      <h3 className="text-lg font-semibold text-midnight-teal mb-3">Horas Solares</h3>
      
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-3">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e5e5"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#AEC3B0"
              strokeWidth="3"
              strokeDasharray={`${solarPercentage}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sun className="w-8 h-8 text-sage-green" />
          </div>
        </div>

        <p className="text-2xl font-bold text-sage-green mb-1">{solarPercentage}%</p>
        <p className="text-sm text-dusty-cyan mb-3">Sol aprovechado hoy</p>

        <div className="bg-sage-green/10 rounded-lg p-3">
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-4 h-4 text-dusty-cyan mr-2" />
            <span className="text-sm text-midnight-teal">Horas de sol efectivas</span>
          </div>
          <p className="text-xl font-bold text-sage-green">6.2h / 8h</p>
        </div>
      </div>
    </div>
  );
};

export default SolarHours;
