
import { Calendar } from 'lucide-react';

const NextVisit = () => {
  return (
     <div 
      className="h-full flex flex-col justify-between bg-white rounded-lg p-2 sm:p-5 shadow-md border border-dusty-cyan/30 cursor-pointer hover:shadow-lg hover:border-sage-green/50 transition-all duration-200"
    >
      
      <div className="flex items-center gap-1 sm:gap-3">
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-dusty-cyan shrink-0 self-center" />
        <h3 className="text-xs sm:text-sm font-semibold text-midnight-teal">
          Próxima Visita
        </h3>
      </div>
      
      <div className="space-y-1">
        <p className="text-dusty-cyan text-xs  mb-0.5">Limpieza aire del salón</p>
        <p className="text-dusty-cyan text-xs sm:text-sm">Viernes 10:30</p>
      </div>
    </div>
  );
};

export default NextVisit;
