
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const EnergyDistribution = () => {
  const data = [
    { name: 'Autoconsumo', value: 76, color: '#AEC3B0' },
    { name: 'Energía Importada', value: 24, color: '#f97316' }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-lg p-3 shadow-md border border-dusty-cyan/30 h-full flex flex-col">
      <h3 className="text-sm font-semibold text-midnight-teal mb-2">Distribución Energética</h3>
      
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={40}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, '']}
              labelStyle={{ color: '#1a365d' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 space-y-1">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div className="flex items-center">
              <div 
                className="w-2 h-2 rounded mr-2" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-midnight-teal">{item.name}</span>
            </div>
            <span className="font-bold" style={{ color: item.color }}>
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnergyDistribution;
