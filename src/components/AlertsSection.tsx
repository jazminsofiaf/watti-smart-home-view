
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AlertsSection = () => {
  const navigate = useNavigate();
  
  const alerts = [
    {
      id: 1,
      type: 'maintenance',
      message: 'Aire del salón lleva 7 días sin mantenimiento',
      priority: 'medium'
    },
    {
      id: 2,
      type: 'weather',
      message: 'Pronóstico: ola de calor este miércoles, activá modo eco inteligente',
      priority: 'high'
    },
    {
      id: 3,
      type: 'device',
      message: 'El sensor del dormitorio no responde',
      priority: 'medium'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-dusty-cyan bg-sage-green/10';
      case 'medium': return 'border-l-deep-slate-blue bg-dusty-cyan/10';
      default: return 'border-l-dusty-cyan bg-ivory-mist';
    }
  };

  const maxVisible = 1;
  const visibleAlerts = alerts.slice(0, maxVisible);

  const handleViewAll = () => {
    console.log("Navegando a todas las alertas");
    navigate('/alerts');
  };

  return (
    <div className="space-y-2 sm:space-y-2">
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <AlertCircle className="w-3 h-3 sm:w-5 sm:h-5 shrink-0 self-center" />
        <h5 className="text-sm sm:text-lg font-semibold text-midnight-teal">Alertas</h5>
      </div>

      {/* Alerts list (scrollable if needed) */}
      <div className="flex-1 overflow-hidden">
        <div className="space-y-2 sm:space-y-3 overflow-y-auto pr-1 max-h-full">
          {visibleAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-lg p-2 sm:p-3 border-l-4 shadow-sm ${getPriorityColor(alert.priority)} cursor-pointer hover:shadow-md transition-shadow`}
              onClick={handleViewAll}
            >
              <p className="text-midnight-teal text-xs sm:text-sm">{alert.message}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="items-center gap-2 sm:gap-3 mb-2 float-right">
        {/* Show more */}
        {alerts.length > maxVisible && (
          <button
            onClick={handleViewAll}
            className="mt-2 text-xs sm:text-sm text-dusty-cyan underline hover:text-midnight-teal transition"
          >
            Ver todas las alertas →
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertsSection;
