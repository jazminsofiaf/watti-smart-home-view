
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
    <div className="flex justify-between items-center mb-6 px-6 py-4">
      <div className="flex items-center space-x-6">
        <div>
          <h1 className="text-2xl font-bold text-midnight-teal">Hola Alicia</h1>
          <p className="text-dusty-cyan text-sm capitalize">{formatDate(currentTime)}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-midnight-teal">{formatTime(currentTime)}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Wifi className="w-6 h-6 text-sage-green animate-pulse-gentle" />
        <span className="text-dusty-cyan text-sm">Conectado</span>
      </div>
    </div>
  );
};

export default WattiHeader;
