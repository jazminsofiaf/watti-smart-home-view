
import { ArrowLeft, AlertCircle, CheckCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const AlertsPage = () => {
  const navigate = useNavigate();
  
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'maintenance',
      message: 'Aire del salón lleva 7 días sin mantenimiento',
      priority: 'medium',
      actionText: 'Programar mantenimiento'
    },
    {
      id: 2,
      type: 'weather',
      message: 'Pronóstico: ola de calor este miércoles, activá modo eco inteligente',
      priority: 'high',
      actionText: 'Activar modo eco'
    },
    {
      id: 3,
      type: 'device',
      message: 'El sensor del dormitorio no responde',
      priority: 'medium',
      actionText: 'Reiniciar sensor'
    },
    {
      id: 4,
      type: 'energy',
      message: 'Consumo energético 15% mayor al mes pasado',
      priority: 'low',
      actionText: 'Ver detalles'
    },
    {
      id: 5,
      type: 'maintenance',
      message: 'Filtro del aire de la cocina necesita reemplazo',
      priority: 'medium',
      actionText: 'Cambiar filtro'
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-dusty-cyan bg-dusty-cyan/10';
      case 'low': return 'border-l-gray-400 bg-gray-50';
      default: return 'border-l-dusty-cyan bg-ivory-mist';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return 'Media';
    }
  };

  const getPriorityTextColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-dusty-cyan';
      case 'low': return 'text-gray-600';
      default: return 'text-dusty-cyan';
    }
  };

  const handleAction = (alertId: number, actionText: string) => {
    console.log(`Ejecutando acción: ${actionText} para alerta ${alertId}`);
    // Aquí se implementaría la lógica específica para cada acción
  };

  const handleIgnore = (alertId: number) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
    console.log(`Alerta ${alertId} ignorada`);
  };

  return (
    <div className="min-h-screen bg-ivory-mist p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/')}
          className="text-midnight-teal hover:bg-dusty-cyan/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-midnight-teal" />
          <h1 className="text-2xl font-bold text-midnight-teal">Todas las Alertas</h1>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-red-600">
              {alerts.filter(a => a.priority === 'high').length}
            </p>
            <p className="text-sm text-gray-600">Alta prioridad</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-dusty-cyan">
              {alerts.filter(a => a.priority === 'medium').length}
            </p>
            <p className="text-sm text-gray-600">Media prioridad</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-600">
              {alerts.filter(a => a.priority === 'low').length}
            </p>
            <p className="text-sm text-gray-600">Baja prioridad</p>
          </div>
        </div>
      </div>

      {/* Alerts list */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`bg-white rounded-lg p-4 border-l-4 shadow-sm ${getPriorityColor(alert.priority)}`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityTextColor(alert.priority)} bg-current bg-opacity-10`}>
                    {getPriorityText(alert.priority)}
                  </span>
                </div>
                <p className="text-midnight-teal text-sm">{alert.message}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={() => handleAction(alert.id, alert.actionText)}
                className="bg-sage-green hover:bg-sage-green/90 text-white text-xs px-3 py-1.5 h-auto"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                {alert.actionText}
              </Button>
              <Button
                onClick={() => handleIgnore(alert.id)}
                variant="outline"
                className="text-gray-600 border-gray-300 hover:bg-gray-50 text-xs px-3 py-1.5 h-auto"
              >
                <X className="w-3 h-3 mr-1" />
                Ignorar
              </Button>
            </div>
          </div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-sage-green mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-midnight-teal mb-2">¡No hay alertas!</h3>
          <p className="text-gray-600">Todas las alertas han sido atendidas.</p>
        </div>
      )}
    </div>
  );
};

export default AlertsPage;
