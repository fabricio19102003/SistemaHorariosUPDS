import { OccupancyDetail } from '@/features/classrooms/actions/occupancy';

interface OccupancyDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    details: OccupancyDetail[];
    title: string;
    loading: boolean;
}

export const OccupancyDetailModal = ({ isOpen, onClose, details, title, loading }: OccupancyDetailModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
             <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
             <div className="flex min-h-screen items-center justify-center p-4">
                <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all">
                    <div className="bg-gradient-to-r from-upds-main to-blue-800 px-6 py-4 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-white">{title}</h3>
                        <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="p-6 max-h-[60vh] overflow-y-auto">
                        {loading ? (
                             <div className="flex justify-center py-10">
                                <svg className="animate-spin h-8 w-8 text-upds-main" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                             </div>
                        ) : details.length > 0 ? (
                            <div className="space-y-3">
                                <p className="text-sm text-gray-500 mb-2">Se encontraron <span className="font-bold text-gray-800">{details.length}</span> clases programadas para este horario:</p>
                                {details.map((detail, idx) => (
                                    <div key={idx} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-gray-800">{detail.classroomName}</span>
                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">{detail.groupCode}</span>
                                            </div>
                                            <div className="text-sm text-gray-600">{detail.subjectName}</div>
                                        </div>
                                        <div className="text-right text-xs text-gray-500 mt-1">
                                            <div className="flex items-center gap-1 justify-end">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                {detail.teacherName}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 text-gray-500">
                                No hay clases programadas en este horario.
                            </div>
                        )}
                    </div>
                    
                    <div className="bg-gray-50 px-6 py-3 flex justify-end">
                        <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            Cerrar
                        </button>
                    </div>
                </div>
             </div>
        </div>
    );
};
