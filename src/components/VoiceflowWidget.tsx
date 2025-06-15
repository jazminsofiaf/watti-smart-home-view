import { Mic } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
    voiceflow?: {
      chat: {
        open(): void;
        interact(action: { type: string, payload?: string }): Promise<any>;
        load: (config: any) => Promise<any>;
        destroy(): void;
        close(): void;
        hide(): void;
        on(event: string, callback: (payload: any) => void): void;
        off(event: string, callback: (payload: any) => void): void;
      };
    };
  }
}

type VoiceflowMessage = {
  type: string;
  payload?: {
    session?:{
      turns: Array<{
          id: string;
          type: string;
          timestamp: number;
          messages?: Array<{
            id: string;
            type: string;
            text?: Array<{
              children: Array<{ text: string }>;
            }>;
            delay?: number;
          }>;
        }>;
      startTime?: number;
      status?: string
      userID?: string;
    }
  };
};



const VoiceflowWidget = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const voiceRecognition = useRef<any| null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";

    const onMessage = (event: MessageEvent) => {
      if (!event.data) return;

      let parsedData: any;

      try {
        parsedData = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      } catch (e) {
        console.error('Failed to parse event.data:', e);
        return;
      }

      console.log('Parsed data:', parsedData);

      const data = parsedData as VoiceflowMessage;

      switch (data.type) {
        case 'voiceflow:open':
          console.log('Widget abierto -> mostrar animacion de hablar');
          setIsSpeaking(true);
          break;

        case 'voiceflow:interact':
          if (data.payload?.session?.status !== 'ACTIVE') return;
          const turns = data.payload?.session?.turns;
          if (Array.isArray(turns) && turns.length > 0) {
            const lastTurn = turns[turns.length - 1];
            if (lastTurn?.type === 'system') {
              console.log('Mensaje proveniente del sistema -> eliminar animacion de hablar');
              setIsSpeaking(false);
            }
          }
          break;

        case 'voiceflow:save_session':
          //console.log('Sesión guardada');
          break;

        default:
          break;
      }
    };

    script.onload = () => {
      window.voiceflow?.chat.load({
        verify: { projectID: '684e9e69921b2a3ad591531a' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        assistant: {
          persistence: 'memory',
          type: 'chat',
          renderMode: 'widget',
        },
        voice: {
          enabled: true,
          url: 'https://runtime-api.voiceflow.com',
        },
        autostart: true,
      }).then(() => {
        // Widget oculto
        window.voiceflow?.chat.hide();

        // Lanzar sesión
        window.voiceflow?.chat.interact({ type: 'launch' }).then((response) => {

          // Empezar a hablar
          window.voiceflow?.chat.open();

          // Subscribe to listen to events
          window.addEventListener('message', onMessage);
         
        });
      });
    };

    document.head.appendChild(script);

    return () => {
      window.removeEventListener('message', onMessage);
      window.voiceflow?.chat?.close();
      window.voiceflow?.chat?.hide();
      window.voiceflow?.chat?.destroy();
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Reconocimiento de voz no soportado.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log('Texto reconocido:', transcript);

      window.voiceflow?.chat.interact({
        type: 'text',
        payload:transcript 
      });
    };

    recognition.onspeechend = () => {
      console.log('Usuario dejó de hablar, deteniendo reconocimiento...');
      recognition.stop();
    };

    recognition.onend = () => {
      console.log('Reconocimiento finalizado.');
      // Aquí puedes actualizar estado para activar botón nuevamente
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Error de reconocimiento de voz:', event.error);
      setIsListening(false);
    };

    recognition.current = recognition;
  }, []);


  const handleVoiceClick = () => {

    if (!voiceRecognition.current) return;

    if (isListening) {
      voiceRecognition.current.stop();
      setIsListening(false);
    } else {
      voiceRecognition.current.start();
      setIsListening(true);
    }
  };


  return (
    <div style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 1000 }}>
      {isSpeaking && <span>🔊 Watti está hablando...</span>}
      <button
        onClick={handleVoiceClick}
        disabled={isSpeaking}
        className={`p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border-2 ${
          isSpeaking ? 'bg-gray-300 border-gray-400 cursor-not-allowed' : 'bg-white border-[#AEC3B0] hover:bg-[#AEC3B0]/10'
        }`}
        title={isSpeaking ? 'Watti está hablando...' : 'Habla con Watti'}
      >
        <Mic className={`w-5 h-5 sm:w-6 sm:h-6 ${isSpeaking ? 'text-gray-500' : 'text-[#AEC3B0]'}`} />
      </button>
    </div>
  );
};

export default VoiceflowWidget;
