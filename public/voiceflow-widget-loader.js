(function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function() {
        window.voiceflow.chat.load({
          verify: { projectID: '684e9e69921b2a3ad591531a' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          assistant: {
            persistence: 'sessionStorage', // or 'localStorage' or 'memory'
            type: 'chat',
            renderMode: 'widget', // or 'embed' or 'popover'
          },
          voice: {
            enabled: true,
            url: 'https://runtime-api.voiceflow.com',
          },
          autostart: false,
        }).then(() => {
          window.voiceflow.chat.hide();
          // send launch interaction explicitly
          window.voiceflow.chat.interact({ type: 'launch' }).then(() => {
            
            // now open the widget after launch interaction completes
            window.voiceflow.chat.open();
          });
        });
      }
      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      v.type = "text/javascript"; 
      s.parentNode.insertBefore(v, s);
    })(document, 'script');