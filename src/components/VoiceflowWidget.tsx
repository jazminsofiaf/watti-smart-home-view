import { useEffect } from 'react';

declare global {
  interface Window {
    voiceflow?: {
      chat: {
        load: (config: any) => void;
      };
    };
  }
}

const VoiceflowWidget = () =>  {
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';

    // On script load, initialize the widget
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: '684e9e69921b2a3ad591531a' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        voice: {
          url: 'https://runtime-api.voiceflow.com',
        }
      })

    };

    document.head.appendChild(script);


    // Cleanup on unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // this component doesn't render anything itself
};

export default VoiceflowWidget;
