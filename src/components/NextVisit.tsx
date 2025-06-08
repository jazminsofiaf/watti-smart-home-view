
import { Calendar } from 'lucide-react';

const NextVisit = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-dusty-cyan/30">
      <div className="flex items-center space-x-3 mb-2">
        <Calendar className="w-5 h-5 text-dusty-cyan" />
        <h3 className="text-lg font-semibold text-midnight-teal">Próxima Visita</h3>
      </div>
      
      <div className="space-y-1">
        <p className="text-midnight-teal font-medium">Limpieza aire dormitorio</p>
        <p className="text-dusty-cyan text-sm">Viernes 10:30</p>
      </div>
    </div>
  );
};

export default NextVisit;
