
import { TreePine, Leaf } from 'lucide-react';

const EnvironmentalImpact = () => {
  return (
    <div className="bg-white rounded-lg p-3 shadow-md border border-dusty-cyan/30 h-full flex flex-col">
      <h3 className="text-sm font-semibold text-midnight-teal mb-2">Impacto Ambiental</h3>
      
      <div className="flex-1 flex flex-col justify-between space-y-2">
        <div className="bg-sage-green/10 rounded-lg p-2 text-center flex-1 flex flex-col justify-center">
          <Leaf className="w-5 h-5 text-sage-green mx-auto mb-1" />
          <p className="text-xs text-dusty-cyan mb-1">CO₂ Evitado</p>
          <p className="text-lg font-bold text-sage-green">2.1 t</p>
        </div>

        <div className="bg-sage-green/10 rounded-lg p-2 text-center flex-1 flex flex-col justify-center">
          <TreePine className="w-5 h-5 text-sage-green mx-auto mb-1" />
          <p className="text-xs text-dusty-cyan mb-1">Equiv. Árboles</p>
          <p className="text-lg font-bold text-sage-green">47</p>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalImpact;
