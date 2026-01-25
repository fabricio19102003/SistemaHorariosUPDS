(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web-horarios-upds/src/features/teachers/services/teacher.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "teacherService",
    ()=>teacherService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/src/lib/axios.ts [app-client] (ecmascript)");
;
const teacherService = {
    getAll: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/teachers');
        return response.data;
    },
    create: async (data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/teachers', data);
        return response.data;
    },
    update: async (id, data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/teachers/${id}`, data);
        return response.data;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TeachersPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$features$2f$teachers$2f$services$2f$teacher$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/src/features/teachers/services/teacher.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$context$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/src/context/ToastContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function TeachersPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { showToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$context$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [teachers, setTeachers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Form State
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        fullName: '',
        username: '',
        email: '',
        specialty: '',
        contractType: 'FULL_TIME'
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeachersPage.useEffect": ()=>{
            loadTeachers();
        }
    }["TeachersPage.useEffect"], []);
    const loadTeachers = async ()=>{
        setLoading(true);
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$features$2f$teachers$2f$services$2f$teacher$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["teacherService"].getAll();
            setTeachers(data);
        } catch (error) {
            console.error(error);
            showToast('Error al cargar docentes', 'error');
        } finally{
            setLoading(false);
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$features$2f$teachers$2f$services$2f$teacher$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["teacherService"].create(formData);
            showToast('Docente registrado exitosamente', 'success');
            setIsModalOpen(false);
            setFormData({
                fullName: '',
                username: '',
                email: '',
                specialty: '',
                contractType: 'FULL_TIME'
            });
            loadTeachers();
        } catch (error) {
            showToast(error.response?.data?.error || 'Error al crear docente', 'error');
        }
    };
    const filteredTeachers = teachers.filter((t)=>t.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || t.specialty?.toLowerCase().includes(searchTerm.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-sm text-gray-500 mb-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            onClick: ()=>router.push('/dashboard'),
                                            className: "cursor-pointer hover:text-upds-main transition-colors",
                                            children: "Dashboard"
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                            lineNumber: 66,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M9 5l7 7-7 7"
                                            }, void 0, false, {
                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                lineNumber: 67,
                                                columnNumber: 108
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                            lineNumber: 67,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-gray-900",
                                            children: "Docentes"
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                            lineNumber: 68,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                    lineNumber: 65,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl font-extrabold text-gray-900 tracking-tight",
                                    children: "Gestión de Docentes"
                                }, void 0, false, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                    lineNumber: 70,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 mt-1",
                                    children: "Administra la planta docente y sus asignaciones."
                                }, void 0, false, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                            lineNumber: 64,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setIsModalOpen(true),
                            className: "bg-upds-main text-white px-5 py-2.5 rounded-lg hover:bg-blue-900 transition-all shadow-md flex items-center gap-2 font-medium",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M12 4v16m8-8H4"
                                    }, void 0, false, {
                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                        lineNumber: 77,
                                        columnNumber: 104
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                    lineNumber: 77,
                                    columnNumber: 25
                                }, this),
                                "Nuevo Docente"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                            lineNumber: 73,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                    lineNumber: 63,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative max-w-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "h-5 w-5 text-gray-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    }, void 0, false, {
                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 122
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                    lineNumber: 86,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                lineNumber: 85,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                className: "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-upds-main focus:border-upds-main sm:text-sm",
                                placeholder: "Buscar docente por nombre o especialidad...",
                                value: searchTerm,
                                onChange: (e)=>setSearchTerm(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                lineNumber: 88,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                        lineNumber: 84,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                    lineNumber: 83,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "min-w-full divide-y divide-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "bg-gray-50",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider",
                                            children: "Docente"
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                            lineNumber: 103,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider",
                                            children: "Especialidad"
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                            lineNumber: 104,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider",
                                            children: "Contrato"
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                            lineNumber: 105,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider",
                                            children: "Estado"
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                            lineNumber: 106,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                    lineNumber: 102,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                lineNumber: 101,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                className: "bg-white divide-y divide-gray-200",
                                children: filteredTeachers.map((teacher)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "hover:bg-gray-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 whitespace-nowrap",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold",
                                                            children: teacher.user.fullName.charAt(0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                            lineNumber: 114,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "ml-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm font-medium text-gray-900",
                                                                    children: teacher.user.fullName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                                    lineNumber: 118,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-gray-500",
                                                                    children: teacher.user.email
                                                                }, void 0, false, {
                                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                                    lineNumber: 119,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                            lineNumber: 117,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                lineNumber: 112,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                                children: teacher.specialty || 'Sin asignar'
                                            }, void 0, false, {
                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                lineNumber: 123,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                                children: teacher.contractType
                                            }, void 0, false, {
                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                lineNumber: 126,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 whitespace-nowrap",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${teacher.user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`,
                                                    children: teacher.user.isActive ? 'Activo' : 'Inactivo'
                                                }, void 0, false, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                lineNumber: 129,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, teacher.id, true, {
                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                        lineNumber: 111,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                lineNumber: 109,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                        lineNumber: 100,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                    lineNumber: 99,
                    columnNumber: 17
                }, this),
                isModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "fixed inset-0 bg-black bg-opacity-50 transition-opacity",
                            onClick: ()=>setIsModalOpen(false)
                        }, void 0, false, {
                            fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                            lineNumber: 143,
                            columnNumber: 26
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-h-full items-center justify-center p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative bg-white rounded-lg shadow-xl max-w-md w-full p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-bold mb-4",
                                        children: "Registrar Nuevo Docente"
                                    }, void 0, false, {
                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                        lineNumber: 146,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: handleSubmit,
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-gray-700",
                                                        children: "Nombre Completo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        required: true,
                                                        className: "w-full border rounded-md p-2",
                                                        value: formData.fullName,
                                                        onChange: (e)=>setFormData({
                                                                ...formData,
                                                                fullName: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                        lineNumber: 150,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                lineNumber: 148,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium text-gray-700",
                                                                children: "Usuario"
                                                            }, void 0, false, {
                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                                lineNumber: 154,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                required: true,
                                                                className: "w-full border rounded-md p-2",
                                                                value: formData.username,
                                                                onChange: (e)=>setFormData({
                                                                        ...formData,
                                                                        username: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                                lineNumber: 155,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 42
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium text-gray-700",
                                                                children: "Email"
                                                            }, void 0, false, {
                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                                lineNumber: 158,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "email",
                                                                className: "w-full border rounded-md p-2",
                                                                value: formData.email,
                                                                onChange: (e)=>setFormData({
                                                                        ...formData,
                                                                        email: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                                lineNumber: 159,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                        lineNumber: 157,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                lineNumber: 152,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-gray-700",
                                                        children: "Especialidad"
                                                    }, void 0, false, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                        lineNumber: 163,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        className: "w-full border rounded-md p-2",
                                                        placeholder: "Ej: Redes, Programación...",
                                                        value: formData.specialty,
                                                        onChange: (e)=>setFormData({
                                                                ...formData,
                                                                specialty: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                        lineNumber: 164,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                lineNumber: 162,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-end gap-2 mt-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setIsModalOpen(false),
                                                        className: "px-4 py-2 border rounded-md text-gray-600",
                                                        children: "Cancelar"
                                                    }, void 0, false, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                        lineNumber: 167,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "submit",
                                                        className: "px-4 py-2 bg-upds-main text-white rounded-md hover:bg-blue-900",
                                                        children: "Guardar Docente"
                                                    }, void 0, false, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                        lineNumber: 168,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                                lineNumber: 166,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                                lineNumber: 145,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                            lineNumber: 144,
                            columnNumber: 26
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
                    lineNumber: 142,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
            lineNumber: 62,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/web-horarios-upds/src/app/dashboard/teachers/page.tsx",
        lineNumber: 61,
        columnNumber: 9
    }, this);
}
_s(TeachersPage, "vmxy7kBkmKx4kVid0riXLCnBNCI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$context$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = TeachersPage;
var _c;
__turbopack_context__.k.register(_c, "TeachersPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=web-horarios-upds_src_c7e53e9e._.js.map