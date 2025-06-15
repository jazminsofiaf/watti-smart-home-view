
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

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

interface VoiceflowWidgetProps {
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const VoiceflowWidget = ({ onSpeakingChange }: VoiceflowWidgetProps) => {
  const location = useLocation();
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Solo cargar en la página del agente
    if (location.pathname !== '/agent') {
      return;
    }

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
          onSpeakingChange?.(true);
          break;

        case 'voiceflow:interact':
          if (data.payload?.session?.status !== 'ACTIVE') return;
          const turns = data.payload?.session?.turns;
          if (Array.isArray(turns) && turns.length > 0) {
            const lastTurn = turns[turns.length - 1];
            if (lastTurn?.type === 'system') {
              console.log('Mensaje proveniente del sistema -> eliminar animacion de hablar');
              onSpeakingChange?.(false);
            }
          }
          break;

        case 'voiceflow:save_session':
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

    // Función de limpieza
    const cleanup = () => {
      window.removeEventListener('message', onMessage);
      window.voiceflow?.chat?.close();
      window.voiceflow?.chat?.hide();
      window.voiceflow?.chat?.destroy();
      if (script.parentNode) {
        document.head.removeChild(script);
      }
      onSpeakingChange?.(false);
    };

    cleanupRef.current = cleanup;

    return cleanup;
  }, [location.pathname, onSpeakingChange]);

  // Limpiar cuando se desmonta o se sale de /agent
  useEffect(() => {
    if (location.pathname !== '/agent' && cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
  }, [location.pathname]);

  return null;
};

export default VoiceflowWidget;
