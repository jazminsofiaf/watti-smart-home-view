
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
    status?: string
    action?: {
      type: string;
    };
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
  onWattiSpeakingChange?: (isWattiSpeaking: boolean) => void;
}

const VoiceflowWidget = ({ onWattiSpeakingChange }: VoiceflowWidgetProps) => {
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
          onWattiSpeakingChange?.(true);
          break;

        case 'voiceflow:interact':
          if (data.payload?.session?.status !== 'ACTIVE') return;
          const userAction = data.payload?.action
          console.log(` userAction type: ${ userAction?.type } `)
          if (userAction?.type === 'text'){
            //se manda mensaje a travez de texto (luego de transcribir el reconocimeinto)
            console.log(`Se mando un mensaje watti -> ahora debe estar hablando`);
            onWattiSpeakingChange?.(true);
            break;
          }
          const seesonTurns = data.payload?.session?.turns;
          if (Array.isArray(seesonTurns) && seesonTurns.length > 0) {
            const lastTurn = seesonTurns[seesonTurns.length - 1];
            if (lastTurn?.type === 'system') {
              console.log('Mensaje proveniente del sistema -> eliminar animacion de hablar');
              const lastMessage = lastTurn.messages[lastTurn.messages.length - 1];
              if (lastMessage.type === 'text' && lastMessage.text?.length) {
                // Extraemos el texto plano
                const text = lastMessage.text.map(t => t.children.map(c => c.text).join('')).join('\n')

                const duration = estimateSpeakingTime(text);
                console.log(`Watti speaking duration estimated: ${duration} ms`);

                setTimeout(() => {
                   console.log(`Watti shut up`);
                  onWattiSpeakingChange?.(false);
                }, duration);
              }
            }
          }
          break;

        case 'voiceflow:save_session':
          if (data.payload?.status !== 'ACTIVE') return;
          const turns = data.payload?.turns;
          if (Array.isArray(turns) && turns.length > 0) {
            const lastTurn = turns[turns.length - 1];
            if (lastTurn?.type === 'system') {
              console.log('Mensaje proveniente del sistema -> eliminar animacion de hablar');
              const lastMessage = lastTurn.messages[lastTurn.messages.length - 1];
              if (lastMessage && lastMessage.type === 'text' && lastMessage.text?.length) {
                // Extraemos el texto plano
                const text = lastMessage.text.map(t => t.children.map(c => c.text).join('')).join('\n')

                const duration = estimateSpeakingTime(text);
                console.log(`Watti speaking duration estimated: ${duration} ms`);

                setTimeout(() => {
                   console.log(`Watti shut up`);
                  onWattiSpeakingChange?.(false);
                }, duration);
              }
            }
          }
          break;

        default:
          break;
      }
    };

    const wordsPerMinute = 95;

    const estimateSpeakingTime = (text: string) => {
      const words = text.trim().split(/\s+/).length;
      const minutes = words / wordsPerMinute;
      return minutes * 60 * 1000; // ms
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
      onWattiSpeakingChange?.(false);
    };

    cleanupRef.current = cleanup;

    return cleanup;
  }, [location.pathname, onWattiSpeakingChange]);

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
