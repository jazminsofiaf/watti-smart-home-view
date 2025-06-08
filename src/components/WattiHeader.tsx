
import { Wifi } from 'lucide-react';
import { useState, useEffect } from 'react';

const WattiHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="flex justify-between items-center mb-3 sm:mb-6 px-3 sm:px-6 py-2 sm:py-4">
      <div className="flex items-center space-x-3 sm:space-x-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <img 
            src="/lovable-uploads/7a4bf22c-161c-43ca-86b8-39a1200c7546.png" 
            alt="Ecodim Logo" 
            className="h-6 sm:h-8 w-auto"
          />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-midnight-teal">Hola Alicia</h1>
          <p className="text-dusty-cyan text-xs sm:text-sm capitalize">{formatDate(currentTime)}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl sm:text-3xl font-bold text-midnight-teal">{formatTime(currentTime)}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-1 sm:space-x-2">
        <Wifi className="w-5 h-5 sm:w-6 sm:h-6 text-sage-green animate-pulse-gentle" />
        <span className="text-dusty-cyan text-xs sm:text-sm">Conectado</span>
      </div>
    </div>
  );
};

export default WattiHeader;
