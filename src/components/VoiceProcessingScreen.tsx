
import { Mic, MicOff } from 'lucide-react';
import VoiceflowWidget from './VoiceflowWidget'
import { useState, useRef, useEffect } from 'react';

interface VoiceProcessingScreenProps {
  onClose: () => void;
}

const VoiceProcessingScreen = ({ onClose }: VoiceProcessingScreenProps) => {
  const [isWattiSpeaking, setIsWattiSpeaking] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(false); // Inicializar como deshabilitado
  const voiceRecognition = useRef<any | null>(null);
  const audioCheckInterval = useRef<NodeJS.Timeout | null>(null);

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
      setIsWattiSpeaking(true);
      setIsMicrophoneEnabled(false); // Deshabilitar hasta que termine el sistema

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

  /*
  // Activar micrófono automáticamente cuando esté habilitado y el sistema no esté hablando
  useEffect(() => {
    if (isMicrophoneEnabled && !isWattiSpeaking && !isListening && voiceRecognition.current) {
      console.log('Activando micrófono automáticamente...');
      setTimeout(() => {
        if (voiceRecognition.current && isMicrophoneEnabled && !isWattiSpeaking) {
          voiceRecognition.current.start();
          setIsListening(true);
        }
      }, 500); // Pequeño delay para evitar conflictos
    }
  }, [isMicrophoneEnabled, isWattiSpeaking, isListening]);
 */

  const handleVoiceClick = () => {
    //if (isWattiSpeaking || !isMicrophoneEnabled) return;

    if (isListening){ //&& voiceRecognition.current) {
      // Si está escuchando, detener el reconocimiento
      console.log('Deteniendo reconocimiento de voz por clic del usuario...');
      voiceRecognition.current.stop();
      setIsListening(false);
    }

    console.log('Microfono activado');
    voiceRecognition.current.start();
    setIsListening(true);
  };  
 

  useEffect(() => {
    // Iniciar el monitoreo del audio cuando el sistema empiece a hablar
    audioCheckInterval.current = setInterval(() => {
      if (!isWattiSpeaking) {
        // El audio terminó, habilitar micrófono
        console.log('Audio terminado, habilitando micrófono...');
        setIsMicrophoneEnabled(true);

        // Limpiar el intervalo
        if (audioCheckInterval.current) {
          clearInterval(audioCheckInterval.current);
          audioCheckInterval.current = null;
        }
      }
     }, 200); // Verificar cada 100ms

    return () => {
      if (audioCheckInterval.current) {
        clearInterval(audioCheckInterval.current);
        audioCheckInterval.current = null;
      }
    };
  }, );

  return (
    <div className="min-h-screen bg-ivory-mist flex flex-col items-center justify-center p-6">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-dusty-cyan hover:text-midnight-teal"
      >
        ✕
      </button>

      {/* Animación cuando el sistema está hablando */}
      {isWattiSpeaking && (
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
          //disabled={isWattiSpeaking || !isMicrophoneEnabled}
          className={`p-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border-4 ${
            isWattiSpeaking || !isMicrophoneEnabled
              ? 'bg-gray-300 border-gray-400 cursor-not-allowed' 
              : isListening
                ? 'bg-red-100 border-red-400 animate-pulse'
                : 'bg-white border-deep-slate-blue hover:bg-deep-slate-blue/10'
          }`}
          title={
            isWattiSpeaking 
              ? 'Watti está hablando...' 
              : !isMicrophoneEnabled
                ? 'Esperando a que termine el audio...'
                : isListening 
                  ? 'Haz click para detener el reconocimiento'
                  : 'Haz click para hablar'
          }
        >
          {isWattiSpeaking || !isMicrophoneEnabled ? (
            <MicOff className="w-8 h-8 text-gray-500" />
          ) : isListening ? (
            <Mic className="w-8 h-8 text-red-500" />
          ) : (
            <Mic className="w-8 h-8 text-deep-slate-blue" />
          )}
        </button>

        <p className="text-center text-dusty-cyan text-sm">
          {isWattiSpeaking 
            ? 'Espera a que Watti termine de hablar'
            : !isMicrophoneEnabled
              ? 'Esperando a que termine el audio...'
              : isListening 
                ? 'Escuchando... Haz clic para detener'
                : 'Haz clic para hablarme'
          }
        </p>
      </div>

      {/* Widget de Voiceflow oculto */}
      <div style={{ display: 'none' }}>
        <VoiceflowWidget 
          onWattiSpeakingChange={setIsWattiSpeaking}
        />
      </div>
    </div>
  );
};

export default VoiceProcessingScreen;
