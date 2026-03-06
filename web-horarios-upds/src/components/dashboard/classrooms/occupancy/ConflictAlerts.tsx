'use client';

import { ConflictAlert } from '@/features/classrooms/actions/occupancy';
import { cn } from '@/lib/utils';
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ConflictAlertsProps {
  alerts: ConflictAlert[];
}

export const ConflictAlerts = ({ alerts }: ConflictAlertsProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-orange-500" size={24} />
        <h3 className="text-lg font-semibold text-gray-800">Alertas de Riesgo</h3>
      </div>
        
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <CheckCircle2 size={48} className="text-green-500 mb-2 opacity-50" />
                <p className="font-medium text-gray-800">Sin conflictos detectados</p>
                <p className="text-sm text-gray-500">Los niveles de ocupación están dentro de límites seguros.</p>
            </div>
        ) : (
            alerts.map((alert, index) => (
                <div 
                    key={index} 
                    className={cn(
                        "p-4 rounded-lg border-l-4 text-sm relative",
                        alert.severity === 'CRITICAL' 
                            ? "bg-red-50 border-red-500 text-red-900" 
                            : "bg-orange-50 border-orange-500 text-orange-900"
                    )}
                >
                    <div className="flex items-start gap-3">
                        {alert.severity === 'CRITICAL' ? (
                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        ) : (
                            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        )}
                        <div>
                            <div className="font-bold mb-1 flex justify-between w-full">
                                <span>{alert.dayOfWeek} - {alert.timeBlockName}</span>
                                <span className={cn(
                                    "text-xs px-2 py-0.5 rounded-full font-bold",
                                    alert.severity === 'CRITICAL' ? "bg-red-200 text-red-800" : "bg-orange-200 text-orange-800"
                                )}>
                                    {alert.occupancyPercentage}% Carga
                                </span>
                            </div>
                            <p className="text-opacity-90 leading-relaxed">
                                {alert.message}
                            </p>
                        </div>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
};
