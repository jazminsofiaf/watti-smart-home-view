import { Mic, Volume2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VoiceProcessingScreenProps {
  onClose: () => void;
}

const VoiceProcessingScreenApi = ({ onClose }: VoiceProcessingScreenProps) => {
  const [currentPhase, setCurrentPhase] = useState<'listening' | 'processing' | 'responding'>('responding');
  const [currentMessage, setCurrentMessage] = useState('');
  const [isUserMessage, setIsUserMessage] = useState(false);

  const projectID = 'watti';
  const sessionID = 'constant-session';
  const baseURL = 'https://general-runtime.voiceflow.com';
  const bearerToken = 'Bearer VF.DM.684eb21b474f88a339bc0da4.q9ugHmyuxpRFoQec';

  const speakText = (text: string): Promise<void> => {
    return new Promise((resolve) => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
      } else {
        resolve();
      }
    });
  };

  const listenToUser = (): Promise<string> => {
    return new Promise((resolve) => {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };

      recognition.onerror = () => resolve('');
      recognition.onend = () => {};

      recognition.start();
    });
  };

  const sendToVoiceflow = async (action: any) => {
    try {
      const response = await fetch(`${baseURL}/state/${projectID}/interact`, {
        method: 'POST',
        headers: {
          'Authorization': bearerToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          action,
          config: {
            tts: false,
            stripSSML: true,
            stopAll: false,
            excludeTypes: ['block', 'debug', 'flow'],
          },
          session: {
            userID: sessionID,
          },
        }),
      });
      return await response.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  };


  useEffect(() => {
    const runAgent = async () => {
      // Lanzar acción de tipo "launch" para empezar la conversación
      const initialResponse = await sendToVoiceflow({ type: 'launch' });

      for (const trace of initialResponse) {
        if (trace.type === 'text') {
          setCurrentMessage(trace.payload.message);
          await speakText(trace.payload.message);
        }
      }

      setCurrentPhase('listening');
      const userInput = await listenToUser();
      setCurrentMessage(userInput);
      setIsUserMessage(true);

      setCurrentPhase('processing');
      const response = await sendToVoiceflow({ type: 'text', payload: userInput });

      setCurrentPhase('responding');
      for (const trace of response) {
        if (trace.type === 'text') {
          setCurrentMessage(trace.payload.message);
          setIsUserMessage(false);
          await speakText(trace.payload.message);
        }
      }

      setTimeout(() => {
        onClose();
      }, 1000);
    };

    runAgent();
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
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-dusty-cyan hover:text-midnight-teal"
      >
        ✕
      </button>

      <div className="mb-8">
        {getIcon()}
      </div>

      <h2 className="text-2xl font-bold text-midnight-teal mb-8">
        {getStatusText()}
      </h2>

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

export default VoiceProcessingScreenApi;
