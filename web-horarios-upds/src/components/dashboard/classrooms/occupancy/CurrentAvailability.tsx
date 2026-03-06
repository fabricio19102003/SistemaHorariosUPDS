'use client';

import { ClassroomStatus } from '@/features/classrooms/actions/occupancy';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, MapPin, XCircle } from 'lucide-react';
import { useState } from 'react';

interface CurrentAvailabilityProps {
  data: ClassroomStatus[];
}

export const CurrentAvailability = ({ data }: CurrentAvailabilityProps) => {
  const [filter, setFilter] = useState<'ALL' | 'AVAILABLE' | 'OCCUPIED'>('ALL');

  const filteredData = data.filter(room => {
    if (filter === 'AVAILABLE') return room.isAvailable;
    if (filter === 'OCCUPIED') return !room.isAvailable;
    return true;
  });

  const availableCount = data.filter(r => r.isAvailable).length;
  const totalCount = data.length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Disponibilidad Actual</h3>
        <span className="text-sm font-medium text-gray-500">
            {availableCount} / {totalCount} Libres
        </span>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <button
            onClick={() => setFilter('ALL')}
            className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                filter === 'ALL' ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
        >
            All
        </button>
        <button
            onClick={() => setFilter('AVAILABLE')}
            className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                filter === 'AVAILABLE' ? "bg-green-600 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"
            )}
        >
            Libres
        </button>
        <button
            onClick={() => setFilter('OCCUPIED')}
            className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                filter === 'OCCUPIED' ? "bg-red-600 text-white" : "bg-red-100 text-red-700 hover:bg-red-200"
            )}
        >
            Ocupadas
        </button>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto min-h-[300px] max-h-[400px] pr-2 space-y-3">
        {filteredData.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
                No se encontraron aulas con el filtro seleccionado.
            </div>
        ) : (
            filteredData.map(room => (
                <div key={room.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800">{room.name}</span>
                            <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 uppercase">
                                {room.type.replace('_', ' ')}
                            </span>
                        </div>
                        {room.isAvailable ? (
                            <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                                <CheckCircle size={14} />
                                <span>Libre</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1 text-red-600 text-xs font-medium">
                                <XCircle size={14} />
                                <span>Ocupada</span>
                            </div>
                        )}
                    </div>

                    {!room.isAvailable && room.currentClass && (
                        <div className="mt-2 text-xs text-gray-600 space-y-1 pl-1 border-l-2 border-red-100">
                             <div className="font-medium text-gray-800">{room.currentClass.subject}</div>
                             <div className="flex items-center gap-1">
                                <MapPin size={10} className="text-gray-400"/>
                                <span>{room.currentClass.teacher}</span>
                             </div>
                             <div className="flex items-center gap-1 text-gray-500">
                                <Clock size={10} />
                                <span>Hasta {room.currentClass.endTime}</span>
                             </div>
                        </div>
                    )}
                </div>
            ))
        )}
      </div>
    </div>
  );
};
