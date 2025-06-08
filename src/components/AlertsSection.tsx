
const AlertsSection = () => {
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
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'medium': return 'border-l-dusty-cyan bg-blue-50';
      default: return 'border-l-gray-400 bg-gray-50';
    }
  };

  return (
    <div className="space-y-2 sm:space-y-3">
      <h3 className="text-sm sm:text-lg font-semibold text-midnight-teal">Alertas</h3>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-2 sm:gap-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`bg-white rounded-lg p-2 sm:p-4 border-l-4 shadow-sm ${getPriorityColor(alert.priority)}`}
          >
            <p className="text-midnight-teal text-xs sm:text-sm">{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsSection;
