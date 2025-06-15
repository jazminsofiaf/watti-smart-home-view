
import { Mic, MicOff } from 'lucide-react';
import VoiceflowWidget from './VoiceflowWidget'
import { useState, useRef, useEffect } from 'react';

interface VoiceProcessingScreenProps {
  onClose: () => void;
}

const VoiceProcessingScreen = ({ onClose }: VoiceProcessingScreenProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const voiceRecognition = useRef<any | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Reconocimiento de voz no soportado.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = true;

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      console.log('Texto reconocido:', transcript);

      // Detener reconocimiento después de capturar el texto
      recognition.stop();
      setIsListening(false);

      // Enviar el texto a Voiceflow
      if (window.voiceflow?.chat) {
        window.voiceflow.chat.interact({
          type: 'text',
          payload: transcript 
        });
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Error de reconocimiento de voz:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      console.log('Reconocimiento finalizado.');
      setIsListening(false);
    };

    voiceRecognition.current = recognition;
  }, []);

  // Activar micrófono automáticamente cuando el sistema deje de hablar
  useEffect(() => {
    if (!isSpeaking && !isListening && voiceRecognition.current) {
      console.log('Sistema dejó de hablar, activando micrófono automáticamente...');
      setTimeout(() => {
        if (voiceRecognition.current && !isSpeaking) {
          voiceRecognition.current.start();
          setIsListening(true);
        }
      }, 500); // Pequeño delay para evitar conflictos
    }
  }, [isSpeaking, isListening]);

  const handleVoiceClick = () => {
    if (isSpeaking) return;

    if (isListening && voiceRecognition.current) {
      // Si está escuchando, detener el reconocimiento
      console.log('Deteniendo reconocimiento de voz por clic del usuario...');
      voiceRecognition.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory-mist flex flex-col items-center justify-center p-6">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-dusty-cyan hover:text-midnight-teal"
      >
        ✕
      </button>

      {/* Animación cuando el sistema está hablando */}
      {isSpeaking && (
        <div className="mb-8 flex flex-col items-center">
          <div className="flex space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 bg-sage-green rounded-full animate-pulse"
                style={{
                  height: Math.random() * 40 + 20,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
          <p className="text-dusty-cyan font-medium">Watti está hablando...</p>
        </div>
      )}

      {/* Botón del micrófono */}
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={handleVoiceClick}
          disabled={isSpeaking}
          className={`p-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border-4 ${
            isSpeaking 
              ? 'bg-gray-300 border-gray-400 cursor-not-allowed' 
              : isListening
                ? 'bg-red-100 border-red-400 animate-pulse'
                : 'bg-white border-sage-green hover:bg-sage-green/10'
          }`}
          title={
            isSpeaking 
              ? 'Watti está hablando...' 
              : isListening 
                ? 'Haz clic para detener el reconocimiento'
                : 'El micrófono se activará automáticamente'
          }
        >
          {isSpeaking ? (
            <MicOff className="w-8 h-8 text-gray-500" />
          ) : isListening ? (
            <Mic className="w-8 h-8 text-red-500" />
          ) : (
            <Mic className="w-8 h-8 text-sage-green" />
          )}
        </button>

        <p className="text-center text-dusty-cyan text-sm">
          {isSpeaking 
            ? 'Espera a que Watti termine de hablar'
            : isListening 
              ? 'Escuchando... Haz clic para detener'
              : 'El micrófono se activará automáticamente'
          }
        </p>
      </div>

      {/* Widget de Voiceflow oculto */}
      <div style={{ display: 'none' }}>
        <VoiceflowWidget 
          onSpeakingChange={setIsSpeaking}
        />
      </div>
    </div>
  );
};

export default VoiceProcessingScreen;
