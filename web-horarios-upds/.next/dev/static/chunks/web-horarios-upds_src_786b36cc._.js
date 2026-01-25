(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web-horarios-upds/src/features/schedule/services/schedule.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scheduleService",
    ()=>scheduleService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/src/lib/axios.ts [app-client] (ecmascript)");
;
const scheduleService = {
    async generateProposal (semester, periodId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/generator/proposal', {
            semester,
            periodId
        });
        return response.data;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScheduleMatrix
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const TIME_BLOCKS = [
    {
        id: 1,
        name: 'M1',
        time: '06:30 - 07:15'
    },
    {
        id: 2,
        name: 'M2',
        time: '07:15 - 08:00'
    },
    {
        id: 3,
        name: 'M3',
        time: '08:10 - 08:55'
    },
    {
        id: 4,
        name: 'M4',
        time: '08:55 - 09:40'
    },
    {
        id: 5,
        name: 'M5',
        time: '09:50 - 10:35'
    },
    {
        id: 6,
        name: 'M6',
        time: '10:35 - 11:20'
    },
    {
        id: 7,
        name: 'M7',
        time: '11:20 - 12:05'
    },
    // Muestreo Tarde/Noche
    {
        id: 8,
        name: 'N1',
        time: '18:15 - 19:00'
    },
    {
        id: 9,
        name: 'N2',
        time: '19:00 - 19:45'
    },
    {
        id: 10,
        name: 'N3',
        time: '19:55 - 20:40'
    }
];
const DAYS = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY'
];
const DAY_LABELS = {
    MONDAY: 'Lunes',
    TUESDAY: 'Martes',
    WEDNESDAY: 'Miércoles',
    THURSDAY: 'Jueves',
    FRIDAY: 'Viernes',
    SATURDAY: 'Sábado'
};
function ScheduleMatrix({ schedules }) {
    // Función helper para encontrar clase en (dia, bloque)
    const getClass = (day, blockId)=>{
        return schedules.find((s)=>s.dayOfWeek === day && s.timeBlockId === blockId);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-auto rounded-lg shadow border border-gray-200",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "min-w-full bg-white text-sm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    className: "bg-upds-main text-white",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "px-4 py-3 text-left w-24",
                                children: "Horario"
                            }, void 0, false, {
                                fileName: "[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx",
                                lineNumber: 41,
                                columnNumber: 25
                            }, this),
                            DAYS.map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-4 py-3 text-center min-w-[150px]",
                                    children: DAY_LABELS[day]
                                }, day, false, {
                                    fileName: "[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx",
                                    lineNumber: 43,
                                    columnNumber: 29
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx",
                        lineNumber: 40,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx",
                    lineNumber: 39,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    className: "divide-y divide-gray-200",
                    children: TIME_BLOCKS.map((block)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "hover:bg-gray-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-2 font-medium text-gray-900 bg-gray-50 border-r border-gray-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-gray-500",
                                            children: block.name
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx",
                                            lineNumber: 53,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: block.time
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx",
                                            lineNumber: 54,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx",
                                    lineNumber: 52,
                                    columnNumber: 29
                                }, this),
                                DAYS.map((day)=>{
                                    const session = getClass(day, block.id);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-2 py-2 border-r border-gray-100 align-top h-24",
                                        children: session ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-blue-50 border-l-4 border-upds-light p-2 rounded text-xs shadow-sm h-full flex flex-col justify-between hover:bg-blue-100 transition-colors cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-bold text-upds-main mb-1",
                                                    children: [
                                                        "Materia ID: ",
                                                        session.subjectId
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx",
                                                    lineNumber: 62,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-gray-600",
                                                    children: [
                                                        "Docente ID: ",
                                                        session.teacherId.split('-')[0],
                                                        "..."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx",
                                                    lineNumber: 65,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-1 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-white text-gray-800 border border-gray-200 max-w-fit",
                                                    children: [
                                                        "Aula ",
                                                        session.classroomId
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx",
                                                    lineNumber: 68,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx",
                                            lineNumber: 61,
                                            columnNumber: 45
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full w-full"
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx",
                                            lineNumber: 73,
                                            columnNumber: 45
                                        }, this)
                                    }, `${day}-${block.id}`, false, {
                                        fileName: "[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx",
                                        lineNumber: 59,
                                        columnNumber: 37
                                    }, this);
                                })
                            ]
                        }, block.id, true, {
                            fileName: "[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx",
                            lineNumber: 51,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx",
                    lineNumber: 49,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx",
            lineNumber: 38,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx",
        lineNumber: 37,
        columnNumber: 9
    }, this);
}
_c = ScheduleMatrix;
var _c;
__turbopack_context__.k.register(_c, "ScheduleMatrix");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web-horarios-upds/src/app/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$features$2f$auth$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/src/features/auth/services/auth.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$features$2f$schedule$2f$services$2f$schedule$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/src/features/schedule/services/schedule.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$components$2f$schedule$2f$ScheduleMatrix$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/src/components/schedule/ScheduleMatrix.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function DashboardPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [schedules, setSchedules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Controles Filtro (Mock por ahora)
    const [semester, setSemester] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$features$2f$auth$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getCurrentUser();
            if (!currentUser) {
                router.push('/login');
            } else {
                setUser(currentUser);
            }
        }
    }["DashboardPage.useEffect"], [
        router
    ]);
    const handleLogout = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$features$2f$auth$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].logout();
    };
    const handleGenerate = async ()=>{
        setLoading(true);
        try {
            // Hardcoded periodId 1 for MVP
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$features$2f$schedule$2f$services$2f$schedule$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scheduleService"].generateProposal(semester, 1);
            setSchedules(result.details);
            alert(`¡Generación completa! Se asignaron ${result.created} clases.`);
        } catch (error) {
            console.error(error);
            alert('Error al generar horario: ' + (error.response?.data?.error || error.message));
        } finally{
            setLoading(false);
        }
    };
    if (!user) return null; // O un spinner
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-upds-main text-white shadow-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 py-3 flex justify-between items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative w-36 h-12 bg-white rounded-lg shadow-sm px-3 flex items-center justify-center overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/upds-logo.png",
                                        alt: "UPDS Logo",
                                        fill: true,
                                        className: "object-contain p-1",
                                        priority: true
                                    }, void 0, false, {
                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                        lineNumber: 57,
                                        columnNumber: 30
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                    lineNumber: 56,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-l border-white/20 pl-6 hidden md:block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-xl font-bold leading-tight tracking-wide",
                                            children: "Sistema de Gestión Académica"
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                            lineNumber: 66,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-blue-100 font-light",
                                            children: "Facultad de Medicina"
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                            lineNumber: 67,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                    lineNumber: 65,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: "hidden md:flex ml-6 gap-2",
                                    children: [
                                        user.role === 'SUPERADMIN' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>router.push('/dashboard/users'),
                                            className: "px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 border border-white/10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                        lineNumber: 78,
                                                        columnNumber: 116
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                    lineNumber: 78,
                                                    columnNumber: 37
                                                }, this),
                                                "Usuarios"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                            lineNumber: 74,
                                            columnNumber: 33
                                        }, this),
                                        [
                                            'SUPERADMIN',
                                            'ADMIN'
                                        ].includes(user.role) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>router.push('/dashboard/teachers'),
                                                    className: "px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 border border-white/10",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                                lineNumber: 90,
                                                                columnNumber: 120
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                            lineNumber: 90,
                                                            columnNumber: 41
                                                        }, this),
                                                        "Docentes"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                    lineNumber: 86,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>router.push('/dashboard/subjects'),
                                                    className: "px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 border border-white/10",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                            }, void 0, false, {
                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                                lineNumber: 97,
                                                                columnNumber: 120
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                            lineNumber: 97,
                                                            columnNumber: 41
                                                        }, this),
                                                        "Materias"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                    lineNumber: 93,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                            lineNumber: 54,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 bg-white/10 rounded-full pl-4 pr-1 py-1 border border-white/10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-right hidden sm:block leading-tight",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-bold tracking-tight",
                                                    children: user.fullName
                                                }, void 0, false, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-blue-200 font-medium uppercase tracking-wider",
                                                    children: user.role
                                                }, void 0, false, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                    lineNumber: 109,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                            lineNumber: 107,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-9 h-9 bg-upds-light rounded-full flex items-center justify-center shadow-inner border-2 border-upds-main text-xs font-bold ring-2 ring-white/20",
                                            children: user.fullName.charAt(0)
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                            lineNumber: 113,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                    lineNumber: 106,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleLogout,
                                    className: "group flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-red-500/90 text-white/80 hover:text-white transition-all duration-300 border border-white/10",
                                    title: "Cerrar Sesión",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-4 h-4",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                            lineNumber: 125,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                        lineNumber: 124,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                    lineNumber: 119,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                            lineNumber: 104,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                    lineNumber: 53,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "container mx-auto px-4 py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row justify-between items-end md:items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-bold text-gray-800 mb-1",
                                            children: "Generador de Horarios"
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                            lineNumber: 139,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 text-sm",
                                            children: "Selecciona los parámetros para generar una nueva propuesta."
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                            lineNumber: 140,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                    lineNumber: 138,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 w-full md:w-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 md:w-48",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-xs font-semibold text-gray-500 mb-1 uppercase",
                                                    children: "Semestre"
                                                }, void 0, false, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: semester,
                                                    onChange: (e)=>setSemester(Number(e.target.value)),
                                                    className: "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-upds-light outline-none",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: 1,
                                                            children: "1er Semestre"
                                                        }, void 0, false, {
                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                            lineNumber: 151,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: 2,
                                                            children: "2do Semestre"
                                                        }, void 0, false, {
                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                            lineNumber: 152,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: 3,
                                                            children: "3er Semestre"
                                                        }, void 0, false, {
                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                            lineNumber: 153,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: 4,
                                                            children: "4to Semestre"
                                                        }, void 0, false, {
                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                            lineNumber: 154,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                            lineNumber: 144,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 md:w-48",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-xs font-semibold text-gray-500 mb-1 uppercase",
                                                    children: "Gestión"
                                                }, void 0, false, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    disabled: true,
                                                    className: "w-full border border-gray-300 bg-gray-50 rounded px-3 py-2 text-sm text-gray-500 cursor-not-allowed",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        children: "1-2026"
                                                    }, void 0, false, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                    lineNumber: 159,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                            lineNumber: 157,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleGenerate,
                                            disabled: loading,
                                            className: "bg-upds-light text-white px-6 py-2.5 rounded hover:bg-blue-600 transition-colors font-medium shadow-sm h-[42px] mt-auto disabled:opacity-50 flex items-center gap-2",
                                            children: [
                                                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "animate-spin h-4 w-4 text-white",
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            className: "opacity-25",
                                                            cx: "12",
                                                            cy: "12",
                                                            r: "10",
                                                            stroke: "currentColor",
                                                            strokeWidth: "4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                            lineNumber: 170,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            className: "opacity-75",
                                                            fill: "currentColor",
                                                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 37
                                                }, this),
                                                loading ? 'Generando...' : 'Generar Propuesta'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                            lineNumber: 163,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                    lineNumber: 143,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                            lineNumber: 137,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                        lineNumber: 136,
                        columnNumber: 17
                    }, this),
                    schedules.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animation-fade-in",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold text-gray-700 mb-4 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-6 bg-upds-main rounded-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                        lineNumber: 184,
                                        columnNumber: 29
                                    }, this),
                                    "Propuesta Generada",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-normal text-gray-500 ml-2",
                                        children: [
                                            "(",
                                            schedules.length,
                                            " clases asignadas)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                        lineNumber: 186,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                lineNumber: 183,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$components$2f$schedule$2f$ScheduleMatrix$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                schedules: schedules
                            }, void 0, false, {
                                fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                lineNumber: 188,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                        lineNumber: 182,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300 text-gray-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-16 h-16 mb-4 opacity-50",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 1,
                                    d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                }, void 0, false, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                    lineNumber: 192,
                                    columnNumber: 122
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                lineNumber: 192,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg",
                                children: "No hay horarios generados aún"
                            }, void 0, false, {
                                fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                lineNumber: 193,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm",
                                children: 'Selecciona un semestre y presiona "Generar Propuesta"'
                            }, void 0, false, {
                                fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                                lineNumber: 194,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                        lineNumber: 191,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
                lineNumber: 133,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/web-horarios-upds/src/app/dashboard/page.tsx",
        lineNumber: 50,
        columnNumber: 9
    }, this);
}
_s(DashboardPage, "6oimLsTBHAHdo3wcvhoI9PsoHJg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=web-horarios-upds_src_786b36cc._.js.map