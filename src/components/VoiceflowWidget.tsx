
import { useEffect } from 'react';

declare global {
  interface Window {
    voiceflow?: {
      chat: {
        load: (config: any) => Promise<any>;
        destroy: () => void;
        close: () => void;
        hide: () => void;
      };
    };
  }
}

const VoiceflowWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";

    // On script load, initialize the widget
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
        // send launch interaction explicitly
        window.voiceflow?.chat.interact({ type: 'launch' }).then(() => {
          // now open the widget after launch interaction completes
          window.voiceflow?.chat.open();
        });
      });
    };

    document.head.appendChild(script);

    // Cleanup on unmount - when user leaves /agent page
    return () => {
      // Close and hide the widget first
      if (window.voiceflow?.chat) {
        window.voiceflow.chat.close();
        window.voiceflow.chat.hide();
        // Then destroy it completely
        window.voiceflow.chat.destroy();
      }
      
      // Remove the script from DOM
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null;
}

export default VoiceflowWidget;
