
import { Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VoiceAssistant = () => {
  const navigate = useNavigate();

  const handleVoiceClick = () => {
    navigate('/agent');
    console.log('Navigating to agent page');
  };

  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      <div className="text-right">
        <p className="text-xs sm:text-sm text-dusty-cyan font-medium">
          Dime "Watti" para cambiar la temperatura
        </p>
        <p className="text-xs text-dusty-cyan/80">
          o solicitar lo que necesites...
        </p>
      </div>
      
      <button
        onClick={handleVoiceClick}
        className="p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl bg-white border-2 border-sage-green hover:bg-sage-green/10"
      >
        <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-sage-green" />
      </button>
    </div>
  );
};

export default VoiceAssistant;
