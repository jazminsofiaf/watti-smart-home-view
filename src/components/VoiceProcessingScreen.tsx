
import { Mic, Volume2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VoiceProcessingScreenProps {
  onClose: () => void;
}

const VoiceProcessingScreen = ({ onClose }: VoiceProcessingScreenProps) => {
  const [currentPhase, setCurrentPhase] = useState<'listening' | 'processing' | 'responding'>('listening');
  const [currentMessage, setCurrentMessage] = useState('');
  const [isUserMessage, setIsUserMessage] = useState(true);

  // Function to speak text using Web Speech API and return a promise
  const speakText = (text: string): Promise<void> => {
    return new Promise((resolve) => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES'; // Spanish language
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        
        utterance.onend = () => {
          resolve();
        };
        
        utterance.onerror = () => {
          resolve(); // Resolve even on error to continue the flow
        };
        
        window.speechSynthesis.speak(utterance);
      } else {
        resolve(); // Resolve immediately if speech synthesis is not available
      }
    });
  };

  // Simular el proceso de reconocimiento de voz y respuesta
  useEffect(() => {
    const runSequence = async () => {
      // User message building up
      setTimeout(() => {
        setCurrentMessage('Watti, nos vamos a la Costa Brava este fin de semana.');
        setIsUserMessage(true);
      }, 1000);

      setTimeout(() => {
        setCurrentMessage('Watti, nos vamos a la Costa Brava este fin de semana. Volvemos el lunes a la 1 am.');
        setIsUserMessage(true);
      }, 2500);

      setTimeout(() => {
        setCurrentMessage('Watti, nos vamos a la Costa Brava este fin de semana. Volvemos el lunes a la 1 am. Queremos los cuartos a 22° al volver.');
        setCurrentPhase('processing');
        setIsUserMessage(true);
      }, 4000);

      // Start responding phase
      setTimeout(async () => {
        setCurrentPhase('responding');
        const response1 = 'Perfecto. Todos los aires se han apagado.';
        setCurrentMessage(response1);
        setIsUserMessage(false);
        await speakText(response1);

        const response2 = 'Perfecto. Todos los aires se han apagado. Se minimizará el consumo energético.';
        setCurrentMessage(response2);
        await speakText(response2);

        const response3 = 'Perfecto. Todos los aires se han apagado. Se minimizará el consumo energético. El lunes a las 00:30 se activarán los aires para que encuentres la casa a 22°.';
        setCurrentMessage(response3);
        await speakText(response3);

        // Wait a bit after finishing speaking, then close
        setTimeout(() => {
          onClose();
        }, 1000);
      }, 5500);
    };

    runSequence();
  }, [onClose]);

  const getIcon = () => {
    switch (currentPhase) {
      case 'listening':
        return <Mic className="w-16 h-16 text-sage-green animate-pulse" />;
      case 'processing':
        return <Loader2 className="w-16 h-16 text-dusty-cyan animate-spin" />;
      case 'responding':
        return <Volume2 className="w-16 h-16 text-deep-slate-blue animate-pulse" />;
    }
  };

  const getStatusText = () => {
    switch (currentPhase) {
      case 'listening':
        return 'Escuchando...';
      case 'processing':
        return 'Procesando...';
      case 'responding':
        return 'Watti está respondiendo...';
    }
  };

  return (
    <div className="fixed inset-0 bg-ivory-mist z-50 flex flex-col items-center justify-center p-6">
      {/* Botón para cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-dusty-cyan hover:text-midnight-teal"
      >
        ✕
      </button>

      {/* Icono principal - Posición fija */}
      <div className="mb-8">
        {getIcon()}
      </div>

      {/* Estado actual */}
      <h2 className="text-2xl font-bold text-midnight-teal mb-8">
        {getStatusText()}
      </h2>

      {/* Mensaje actual - Solo uno a la vez */}
      {currentMessage && (
        <div className={`rounded-lg p-4 max-w-2xl w-full shadow-lg ${
          isUserMessage 
            ? 'bg-white' 
            : 'bg-sage-green/20'
        }`}>
          <h3 className="text-lg font-semibold mb-2 text-dusty-cyan">
            {isUserMessage ? 'Tu mensaje:' : 'Watti responde:'}
          </h3>
          <p className="text-midnight-teal">{currentMessage}</p>
        </div>
      )}

      {/* Indicador de ondas de sonido */}
      {currentPhase === 'listening' && (
        <div className="flex items-center space-x-1 mt-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-sage-green rounded-full animate-pulse"
              style={{
                height: Math.random() * 40 + 20,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VoiceProcessingScreen;
