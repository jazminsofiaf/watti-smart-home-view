
import { Mic, Volume2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VoiceProcessingScreenProps {
  onClose: () => void;
}

const VoiceProcessingScreen = ({ onClose }: VoiceProcessingScreenProps) => {
  const [currentPhase, setCurrentPhase] = useState<'listening' | 'processing' | 'responding'>('listening');
  const [currentMessage, setCurrentMessage] = useState('');
  const [isUserMessage, setIsUserMessage] = useState(true);

  // Function to speak text using Web Speech API as fallback
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES'; // Spanish language
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Simular el proceso de reconocimiento de voz y respuesta
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentMessage('Watti, nos vamos a la Costa Brava este fin de semana.');
      setIsUserMessage(true);
    }, 1000);

    const timer2 = setTimeout(() => {
      setCurrentMessage('Watti, nos vamos a la Costa Brava este fin de semana. Volvemos el lunes a la 1 am.');
      setIsUserMessage(true);
    }, 2500);

    const timer3 = setTimeout(() => {
      setCurrentMessage('Watti, nos vamos a la Costa Brava este fin de semana. Volvemos el lunes a la 1 am. Queremos los cuartos a 22° al volver.');
      setCurrentPhase('processing');
      setIsUserMessage(true);
    }, 4000);

    const timer4 = setTimeout(() => {
      setCurrentPhase('responding');
      const response = 'Perfecto. Todos los aires se han apagado.';
      setCurrentMessage(response);
      setIsUserMessage(false);
      speakText(response);
    }, 5500);

    const timer5 = setTimeout(() => {
      const response = 'Perfecto. Todos los aires se han apagado. Se minimizará el consumo energético.';
      setCurrentMessage(response);
      setIsUserMessage(false);
      speakText(response);
    }, 6500);

    const timer6 = setTimeout(() => {
      const response = 'Perfecto. Todos los aires se han apagado. Se minimizará el consumo energético. El lunes a las 00:30 se activarán los aires para que encuentres la casa a 22°.';
      setCurrentMessage(response);
      setIsUserMessage(false);
      speakText(response);
    }, 8000);

    const timer7 = setTimeout(() => {
      onClose();
    }, 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
      clearTimeout(timer7);
    };
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
