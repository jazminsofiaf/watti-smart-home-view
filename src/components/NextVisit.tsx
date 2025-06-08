
import { Calendar } from 'lucide-react';

const NextVisit = () => {
  return (
    <div className="bg-white rounded-lg p-3 sm:p-6 shadow-md border border-dusty-cyan/30 h-full">
      <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-dusty-cyan" />
        <h3 className="text-sm sm:text-lg font-semibold text-midnight-teal">Próxima Visita</h3>
      </div>
      
      <div className="space-y-1">
        <p className="text-midnight-teal font-medium text-xs sm:text-base">Limpieza aire dormitorio</p>
        <p className="text-dusty-cyan text-xs sm:text-sm">Viernes 10:30</p>
      </div>
    </div>
  );
};

export default NextVisit;
