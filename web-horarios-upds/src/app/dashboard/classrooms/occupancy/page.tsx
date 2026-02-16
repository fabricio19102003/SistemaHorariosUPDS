import { 
  getConflictCandidates, 
  getCurrentAvailability, 
  getOccupancyStats, 
  getWeeklyHeatmap 
} from '@/features/classrooms/actions/occupancy';
import { ConflictAlerts } from '@/components/dashboard/classrooms/occupancy/ConflictAlerts';
import { CurrentAvailability } from '@/components/dashboard/classrooms/occupancy/CurrentAvailability';
import { OccupancyStats } from '@/components/dashboard/classrooms/occupancy/OccupancyStats';
import { WeeklyHeatmap } from '@/components/dashboard/classrooms/occupancy/WeeklyHeatmap';
import { ClassroomsTabs } from '@/components/dashboard/classrooms/ClassroomsTabs';

export const dynamic = 'force-dynamic'; // Ensure real-time data

export default async function OccupancyPage() {
  // Fetch data in parallel
  const [heatmapData, availabilityData, statsData, alerts] = await Promise.all([
    getWeeklyHeatmap(),
    getCurrentAvailability(),
    getOccupancyStats(),
    getConflictCandidates()
  ]);

  const { stats, totalOccupancy } = statsData;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <ClassroomsTabs />

      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Monitor de Ocupación en Tiempo Real</h1>
           <p className="text-gray-500 mt-2">Monitorea el uso de aulas, disponibilidad y conflictos potenciales.</p>
        </div>
        <div className="text-right">
             <span className="text-sm font-medium text-gray-500 block">Última actualización</span>
             <span className="text-xl font-mono text-gray-800">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Column: Heatmap & Alerts */}
        <div className="xl:col-span-2 space-y-6">
          <section>
             <WeeklyHeatmap data={heatmapData} />
          </section>
          
          <section>
             <ConflictAlerts alerts={alerts} />
          </section>
        </div>

        {/* Side Column: Instant Status & Stats */}
        <div className="space-y-6">
           <section className="h-[500px]">
              <CurrentAvailability data={availabilityData} />
           </section>

           <section className="h-[400px]">
              <OccupancyStats stats={stats} totalOccupancy={totalOccupancy} />
           </section>
        </div>
      </div>
    </div>
  );
}
