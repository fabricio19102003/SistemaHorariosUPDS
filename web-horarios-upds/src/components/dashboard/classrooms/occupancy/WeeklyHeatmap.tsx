'use client';

import { HeatmapData, getOccupancyDetails, OccupancyDetail } from '@/features/classrooms/actions/occupancy';
import { cn } from '@/lib/utils';
import { DayOfWeek } from '@prisma/client';
import { useMemo, useState } from 'react';
import { OccupancyDetailModal } from './OccupancyDetailModal';

interface WeeklyHeatmapProps {
  data: HeatmapData[];
}

const DAYS = [
  DayOfWeek.MONDAY,
  DayOfWeek.TUESDAY,
  DayOfWeek.WEDNESDAY,
  DayOfWeek.THURSDAY,
  DayOfWeek.FRIDAY,
  DayOfWeek.SATURDAY,
];

const DAY_LABELS: Record<DayOfWeek, string> = {
  MONDAY: 'Lunes',
  TUESDAY: 'Martes',
  WEDNESDAY: 'Miércoles',
  THURSDAY: 'Jueves',
  FRIDAY: 'Viernes',
  SATURDAY: 'Sábado',
  SUNDAY: 'Domingo',
};

export const WeeklyHeatmap = ({ data }: WeeklyHeatmapProps) => {
  const [selectedCell, setSelectedCell] = useState<{ day: DayOfWeek, blockId: number, blockName: string } | null>(null);
  const [details, setDetails] = useState<OccupancyDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract unique time blocks from data, assuming data is complete or we sort it unique
  const timeBlocks = useMemo(() => {
    const unique = new Map();
    data.forEach(d => {
        if (!unique.has(d.timeBlockName)) {
            unique.set(d.timeBlockName, { id: d.timeBlockId, name: d.timeBlockName });
        }
    });
    return Array.from(unique.values()).sort((a, b) => a.id - b.id); // Assuming IDs are chronological
  }, [data]);


  const getCellData = (day: DayOfWeek, blockName: string) => {
    return data.find(d => d.dayOfWeek === day && d.timeBlockName === blockName);
  };

  const handleCellClick = async (day: DayOfWeek, blockId: number, blockName: string, count: number) => {
    if (count === 0) return; // Don't open for empty cells

    setSelectedCell({ day, blockId, blockName });
    setIsModalOpen(true);
    setLoading(true);
    
    try {
        const detailsData = await getOccupancyDetails(day, blockId);
        setDetails(detailsData);
    } catch (error) {
        console.error("Failed to fetch details", error);
    } finally {
        setLoading(false);
    }
  };

  const getColorClass = (percentage: number) => {
    if (percentage === 0) return 'bg-gray-50';
    if (percentage < 30) return 'bg-green-100 text-green-800 hover:bg-green-200';
    if (percentage < 70) return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    if (percentage < 90) return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
    return 'bg-red-100 text-red-800 font-bold hover:bg-red-200';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Mapa de Calor Semanal de Ocupación</h3>
        <p className="text-xs text-gray-500 italic">Haz clic en una celda para ver detalles</p>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header Row */}
          <div className="grid grid-cols-[100px_repeat(6,_1fr)] gap-2 mb-2">
            <div className="font-medium text-gray-500 text-sm">Horario</div>
            {DAYS.map(day => (
              <div key={day} className="font-medium text-center text-gray-700 text-sm capitalize">
                {DAY_LABELS[day]}
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="space-y-2">
            {timeBlocks.map((block) => (
              <div key={block.id} className="grid grid-cols-[100px_repeat(6,_1fr)] gap-2">
                <div className="flex items-center text-xs font-medium text-gray-500">
                  {block.name}
                </div>
                {DAYS.map((day) => {
                  const cell = getCellData(day, block.name);
                  const percentage = cell?.percentage || 0;
                  
                  return (
                    <div
                      key={`${day}-${block.id}`}
                      onClick={() => handleCellClick(day, block.id, block.name, cell?.occupancyCount || 0)}
                      className={cn(
                        "h-12 rounded-md flex items-center justify-center text-xs transition-colors cursor-pointer",
                        getColorClass(percentage),
                        percentage === 0 && "cursor-default"
                      )}
                      title={`${cell?.occupancyCount || 0} aulas ocupadas (${percentage}%) - Clic para detalles`}
                    >
                      {percentage > 0 ? `${percentage}%` : '-'}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex items-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-50 rounded border border-gray-200"></div>
            <span>0% (Vacío)</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 rounded"></div>
            <span>1-30% (Bajo)</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 rounded"></div>
            <span>31-70% (Medio)</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-100 rounded"></div>
            <span>71-90% (Alto)</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 rounded"></div>
            <span>&gt;90% (Crítico)</span>
        </div>
      </div>

      <OccupancyDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCell ? `${DAY_LABELS[selectedCell.day]} - ${selectedCell.blockName}` : 'Detalles de Ocupación'}
        details={details}
        loading={loading}
      />
    </div>
  );
};
