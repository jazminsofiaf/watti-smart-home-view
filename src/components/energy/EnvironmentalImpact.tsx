
import { TreePine, Leaf } from 'lucide-react';

const EnvironmentalImpact = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md border border-dusty-cyan/30 h-full">
      <h3 className="text-lg font-semibold text-midnight-teal mb-3">Impacto Ambiental</h3>
      
      <div className="space-y-4">
        <div className="bg-sage-green/10 rounded-lg p-3 text-center">
          <Leaf className="w-8 h-8 text-sage-green mx-auto mb-2" />
          <p className="text-xs text-dusty-cyan mb-1">CO₂ Evitado</p>
          <p className="text-xl font-bold text-sage-green">2.1 t</p>
          <p className="text-xs text-sage-green">Este año</p>
        </div>

        <div className="bg-sage-green/10 rounded-lg p-3 text-center">
          <TreePine className="w-8 h-8 text-sage-green mx-auto mb-2" />
          <p className="text-xs text-dusty-cyan mb-1">Equivalente a</p>
          <p className="text-xl font-bold text-sage-green">47</p>
          <p className="text-xs text-sage-green">Árboles plantados</p>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalImpact;
