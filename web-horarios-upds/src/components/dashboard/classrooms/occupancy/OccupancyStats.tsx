'use client';

import { OccupancyStat } from '@/features/classrooms/actions/occupancy';
import { cn } from '@/lib/utils';
import { BarChart3 } from 'lucide-react';

interface OccupancyStatsProps {
  stats: OccupancyStat[];
  totalOccupancy: number;
}

export const OccupancyStats = ({ stats, totalOccupancy }: OccupancyStatsProps) => {
  // Take top 10 most utilized for the detailed view
  const topStats = stats.slice(0, 10);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="text-blue-600" size={24} />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Analíticas de Uso</h3>
          <p className="text-sm text-gray-500">Eficiencia Global</p>
        </div>
        <div className="ml-auto flex items-end flex-col">
            <span className="text-2xl font-bold text-blue-600">{totalOccupancy}%</span>
            <span className="text-xs text-gray-400">Capacidad Total Usada</span>
        </div>
      </div>

      <div className="space-y-4 overflow-y-auto flex-1 pr-2">
        <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Aulas Más Utilizadas</h4>
        {topStats.map((stat) => (
          <div key={stat.classroomId} className="group">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">{stat.classroomName}</span>
              <span className="text-gray-500">{stat.percentage}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={cn(
                    "h-full rounded-full transition-all duration-500",
                    stat.percentage > 80 ? "bg-red-500" :
                    stat.percentage > 50 ? "bg-blue-500" : "bg-green-500"
                )}
                style={{ width: `${stat.percentage}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-gray-400 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{stat.usedSlots} / {stat.totalSlots} espacios</span>
            </div>
          </div>
        ))}
        {stats.length === 0 && (
            <p className="text-gray-400 text-sm">No se encontraron datos.</p>
        )}
      </div>
    </div>
  );
};
