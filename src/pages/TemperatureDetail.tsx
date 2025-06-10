
import { ArrowLeft, Edit, Plus, AlertTriangle, CheckCircle, Filter } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const TemperatureDetail = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();

  // Mock data - en una app real esto vendría de una API
  const roomData = {
    'dormitorio': {
      name: 'Dormitorio',
      brand: 'Samsung',
      model: 'WindFree AR12TXHQASINEU',
      status: 'heating',
      hasIssue: false,
      lastFilterClean: '2024-05-15',
      consumption: '245 kWh',
      currentTemp: 22,
      targetTemp: 23
    },
    'salon': {
      name: 'Salón',
      brand: 'LG',
      model: 'ARTCOOL Gallery A12FR',
      status: 'cooling',
      hasIssue: true,
      issueDescription: 'Filtro necesita limpieza',
      lastFilterClean: '2024-04-20',
      consumption: '320 kWh',
      currentTemp: 21,
      targetTemp: 21
    },
    'cocina': {
      name: 'Cocina',
      brand: 'Daikin',
      model: 'Emura FTXJ25MW',
      status: 'off',
      hasIssue: false,
      lastFilterClean: '2024-05-28',
      consumption: '180 kWh',
      currentTemp: 19,
      targetTemp: undefined
    }
  };

  const temperatureData = [
    { day: '1', temp: 20 },
    { day: '5', temp: 22 },
    { day: '10', temp: 21 },
    { day: '15', temp: 23 },
    { day: '20', temp: 22 },
    { day: '25', temp: 24 },
    { day: '30', temp: 22 }
  ];

  const room = roomData[roomId as keyof typeof roomData];

  if (!room) {
    return (
      <div className="min-h-screen bg-ivory-mist p-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-midnight-teal mb-4">Habitación no encontrada</h2>
          <Button onClick={() => navigate('/')}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  const getStatusText = () => {
    switch (room.status) {
      case 'heating': return 'Calefacción encendida';
      case 'cooling': return 'Aire acondicionado encendido';
      case 'off': return 'Apagado';
      case 'auto': return 'Modo automático';
      default: return '';
    }
  };

  const getStatusColor = () => {
    switch (room.status) {
      case 'heating': return 'text-dusty-cyan';
      case 'cooling': return 'text-deep-slate-blue';
      case 'off': return 'text-dusty-cyan';
      case 'auto': return 'text-sage-green';
      default: return 'text-dusty-cyan';
    }
  };

  const chartConfig = {
    temp: {
      label: "Temperatura",
      color: "#2563eb",
    },
  };

  return (
    <div 
      className="min-h-screen bg-ivory-mist p-4 overflow-auto"
      style={{ height: "var(--app-height)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
            className="text-midnight-teal hover:bg-dusty-cyan/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-midnight-teal">{room.name}</h1>
            <Button variant="ghost" size="icon" className="text-midnight-teal hover:bg-dusty-cyan/20">
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <Button 
          className="bg-sage-green hover:bg-sage-green/90 text-midnight-teal rounded-full w-12 h-12"
          size="icon"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Device Info */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-bold text-midnight-teal mb-4">Información del Dispositivo</h2>
          <div className="space-y-3">
            <div>
              <span className="text-dusty-cyan text-sm">Marca y Modelo:</span>
              <p className="text-midnight-teal font-medium">{room.brand} {room.model}</p>
            </div>
            
            <div>
              <span className="text-dusty-cyan text-sm">Estado:</span>
              <p className={`font-medium ${getStatusColor()}`}>{getStatusText()}</p>
            </div>
            
            <div>
              <span className="text-dusty-cyan text-sm">Temperatura Actual:</span>
              <p className="text-midnight-teal font-bold text-2xl">{room.currentTemp}°C</p>
            </div>
            
            {room.targetTemp && (
              <div>
                <span className="text-dusty-cyan text-sm">Temperatura Objetivo:</span>
                <p className="text-midnight-teal font-medium">{room.targetTemp}°C</p>
              </div>
            )}
          </div>
        </div>

        {/* Status and Issues */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-bold text-midnight-teal mb-4">Estado y Mantenimiento</h2>
          <div className="space-y-4">
            
            {/* Issue Status */}
            <div className="flex items-center gap-3">
              {room.hasIssue ? (
                <>
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-red-500 font-medium">Requiere atención</p>
                    {'issueDescription' in room && (
                      <p className="text-dusty-cyan text-sm">{room.issueDescription}</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <p className="text-green-500 font-medium">Funcionando correctamente</p>
                </>
              )}
            </div>

            {/* Filter Cleaning */}
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-dusty-cyan" />
              <div>
                <p className="text-midnight-teal font-medium">Último cambio de filtro</p>
                <p className="text-dusty-cyan text-sm">{new Date(room.lastFilterClean).toLocaleDateString('es-ES')}</p>
              </div>
            </div>

            {/* Consumption */}
            <div>
              <span className="text-dusty-cyan text-sm">Consumo Acumulado:</span>
              <p className="text-midnight-teal font-bold text-xl">{room.consumption}</p>
              <p className="text-dusty-cyan text-xs">este mes</p>
            </div>
          </div>
        </div>

        {/* Temperature Chart */}
        <div className="bg-white rounded-lg p-6 shadow-lg md:col-span-2">
          <h2 className="text-lg font-bold text-midnight-teal mb-4">Temperatura del Mes</h2>
          <div className="h-48 w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={temperatureData}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    domain={['dataMin - 2', 'dataMax + 2']}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="var(--color-temp)" 
                    strokeWidth={3}
                    dot={{ fill: "var(--color-temp)", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureDetail;
