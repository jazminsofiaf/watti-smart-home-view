
import { Mic } from 'lucide-react';
import { useState } from 'react';
import VoiceProcessingScreen from './VoiceProcessingScreen';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [showProcessingScreen, setShowProcessingScreen] = useState(false);

  const handleVoiceClick = () => {
    setIsListening(!isListening);
    setShowProcessingScreen(true);
    console.log('Voice assistant clicked');
  };

  const handleCloseProcessing = () => {
    setShowProcessingScreen(false);
    setIsListening(false);
  };

  return (
    <>
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
          className={`p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl ${
            isListening 
              ? 'bg-sage-green animate-pulse' 
              : 'bg-white border-2 border-sage-green hover:bg-sage-green/10'
          }`}
        >
          <Mic 
            className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
              isListening ? 'text-white' : 'text-sage-green'
            }`} 
          />
        </button>
      </div>

      {/* Pantalla de procesamiento de voz */}
      {showProcessingScreen && (
        <VoiceProcessingScreen onClose={handleCloseProcessing} />
      )}
    </>
  );
};

export default VoiceAssistant;
