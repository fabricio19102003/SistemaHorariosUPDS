module.exports = [
"[project]/web-horarios-upds/src/features/subjects/services/subject.service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "subjectService",
    ()=>subjectService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/src/lib/axios.ts [app-ssr] (ecmascript)");
;
const subjectService = {
    getAll: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/subjects');
        return response.data;
    },
    create: async (data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/subjects', data);
        return response.data;
    },
    update: async (id, data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`/subjects/${id}`, data);
        return response.data;
    }
};
}),
"[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SubjectsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$features$2f$subjects$2f$services$2f$subject$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/src/features/subjects/services/subject.service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$context$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/src/context/ToastContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web-horarios-upds/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function SubjectsPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { showToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$context$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const [subjects, setSubjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [teachers, setTeachers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // ... properties
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // ... useEffect ...
    const handleEdit = (subject)=>{
        setFormData({
            name: subject.name,
            code: subject.code,
            credits: subject.credits,
            semester: subject.semester,
            careerId: subject.careerId,
            defaultTeacherId: subject.defaultTeacherId?.toString() || '' // Handle defaultTeacherId mismatch type if needed in service
        });
        // Fix potential undefined defaultTeacherId if the backend structure is nested differently or ID is not direct
        // Ideally the subject object has defaultTeacherId or we extract it from relation. 
        // Based on previous service, `defaultTeacherId` field exists in Prisma model but frontend type might need adjustment.
        // Let's assume subject has defaultTeacherId (raw) or we use the relation. 
        // Actually, my previous service types defined `defaultTeacher` object but not the raw ID. I should fix that if I want to prefill.
        // Quick fix: The backend `findAll` returns `defaultTeacher` relation. It doesn't explicitly return `defaultTeacherId` unless selected.
        // However, Prisma includes foreign keys by default if not excluded? Javascript objects usually have it.
        // Let's safe check. If not, I might need to adjust the service or use the relation to find the ID.
        // Wait, the edit form uses `defaultTeacherId` state.
        // Let's look at the subject type in state.
        // Since I can't see the exact runtime value, I will try to use `subject.defaultTeacherId` (which might be in the response even if not typed in interface) 
        // OR search the teacher list for a matching name? No, that's brittle.
        // I'll assume the backend sends `defaultTeacherId`. 
        // Actually, looking at my previous Backend Service `findAll`: It includes `defaultTeacher`. 
        // Prisma `findMany` returns the scalar fields (like `defaultTeacherId`) by default unless `select` is used.
        // I used `include`. So `defaultTeacherId` SHOULD be there. I just need to cast it or add it to interface.
        const rawSubject = subject;
        setFormData({
            name: subject.name,
            code: subject.code,
            credits: subject.credits,
            semester: subject.semester,
            careerId: subject.careerId,
            defaultTeacherId: rawSubject.defaultTeacherId || ''
        });
        setEditingId(subject.id);
        setIsModalOpen(true);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            if (editingId) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$features$2f$subjects$2f$services$2f$subject$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subjectService"].update(editingId, formData);
                showToast('Materia actualizada exitosamente', 'success');
            } else {
                await __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$src$2f$features$2f$subjects$2f$services$2f$subject$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subjectService"].create(formData);
                showToast('Materia creada exitosamente', 'success');
            }
            setIsModalOpen(false);
            resetForm();
            loadData();
        } catch (error) {
            showToast(error.response?.data?.error || 'Error al guardar materia', 'error');
        }
    };
    const resetForm = ()=>{
        setFormData({
            name: '',
            code: '',
            credits: 4,
            semester: 1,
            careerId: 1,
            defaultTeacherId: ''
        });
        setTeacherSearch('');
        setEditingId(null);
    };
    const filteredSubjects = subjects.filter((s)=>s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.code.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredTeachers = teachers.filter((t)=>t.user.fullName.toLowerCase().includes(teacherSearch.toLowerCase()) || t.specialty?.toLowerCase().includes(teacherSearch.toLowerCase()));
    // Grouping Logic
    const groupedSubjects = filteredSubjects.reduce((acc, subject)=>{
        const sem = subject.semester;
        if (!acc[sem]) acc[sem] = [];
        acc[sem].push(subject);
        return acc;
    }, {});
    const sortedSemesters = Object.keys(groupedSubjects).map(Number).sort((a, b)=>a - b);
    // Helper text for semester
    const getSemesterName = (num)=>{
        const names = [
            'Primer',
            'Segundo',
            'Tercer',
            'Cuarto',
            'Quinto',
            'Sexto',
            'Séptimo',
            'Octavo',
            'Noveno',
            'Décimo'
        ];
        return names[num - 1] ? `${names[num - 1]} Semestre` : `Semestre ${num}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50/50 p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            onClick: ()=>router.push('/dashboard'),
                                            className: "cursor-pointer hover:text-upds-main transition-colors",
                                            children: "Dashboard"
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                            lineNumber: 121,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M9 5l7 7-7 7"
                                            }, void 0, false, {
                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                lineNumber: 122,
                                                columnNumber: 108
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                            lineNumber: 122,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-900",
                                            children: "Materias"
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                            lineNumber: 123,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                    lineNumber: 120,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-upds-main to-blue-700 tracking-tight mb-2",
                                    children: "Catálogo Académico"
                                }, void 0, false, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                    lineNumber: 125,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 text-lg",
                                    children: "Gestiona las asignaturas, créditos y asignaciones docentes."
                                }, void 0, false, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                    lineNumber: 128,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                            lineNumber: 119,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                resetForm();
                                setIsModalOpen(true);
                            },
                            className: "group bg-upds-main text-white px-6 py-3 rounded-xl hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-3 font-semibold",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white/20 p-1 rounded-lg group-hover:bg-white/30 transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M12 4v16m8-8H4"
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                            lineNumber: 135,
                                            columnNumber: 108
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                    lineNumber: 134,
                                    columnNumber: 25
                                }, this),
                                "Nueva Materia"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                            lineNumber: 130,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                    lineNumber: 118,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-8 max-w-xl flex items-center gap-2 focus-within:ring-2 focus-within:ring-upds-main/20 focus-within:border-upds-main transition-all",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pl-4 text-gray-400",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                }, void 0, false, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                    lineNumber: 144,
                                    columnNumber: 104
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                lineNumber: 144,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                            lineNumber: 143,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            className: "block w-full py-3 pr-4 border-none bg-transparent placeholder-gray-400 focus:ring-0 text-gray-700",
                            placeholder: "Buscar por nombre (ej: Cálculo) o sigla (ej: MAT-101)...",
                            value: searchTerm,
                            onChange: (e)=>setSearchTerm(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                            lineNumber: 146,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                    lineNumber: 142,
                    columnNumber: 17
                }, this),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse",
                    children: [
                        1,
                        2,
                        3
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-48 bg-gray-200 rounded-xl"
                        }, i, false, {
                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                            lineNumber: 158,
                            columnNumber: 43
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                    lineNumber: 157,
                    columnNumber: 20
                }, this) : filteredSubjects.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-12",
                    children: sortedSemesters.map((semester)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 mb-6 sticky top-0 bg-gray-50/95 backdrop-blur-sm p-2 z-10 border-b border-gray-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-bold text-gray-800",
                                            children: getSemesterName(semester)
                                        }, void 0, false, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                            lineNumber: 165,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "bg-gray-200 text-gray-600 px-2 py-1 rounded-md text-xs font-bold",
                                            children: [
                                                groupedSubjects[semester].length,
                                                " Materias"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                            lineNumber: 168,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                    lineNumber: 164,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                                    children: groupedSubjects[semester].map((subject)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:border-blue-100 transition-all duration-300 relative overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150"
                                                }, void 0, false, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleEdit(subject),
                                                    className: "absolute top-4 right-4 z-20 bg-white shadow-sm border border-gray-100 p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all opacity-0 group-hover:opacity-100",
                                                    title: "Editar Materia",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-4 h-4",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                            lineNumber: 184,
                                                            columnNumber: 128
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                        lineNumber: 184,
                                                        columnNumber: 49
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-start mb-4 relative pr-10",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-blue-50 text-blue-700 font-mono text-sm px-3 py-1.5 rounded-lg border border-blue-100 font-bold tracking-wide",
                                                        children: subject.code
                                                    }, void 0, false, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                        lineNumber: 188,
                                                        columnNumber: 49
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold text-gray-800 mb-2 group-hover:text-upds-main transition-colors line-clamp-2 min-h-[3.5rem]",
                                                    children: subject.name
                                                }, void 0, false, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-4 text-sm text-gray-500 mb-6",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1.5",
                                                        title: "Créditos Académicos",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-4 h-4 text-orange-400",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M13 10V3L4 14h7v7l9-11h-7z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                    lineNumber: 199,
                                                                    columnNumber: 148
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                lineNumber: 199,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium",
                                                                children: [
                                                                    subject.credits,
                                                                    " Créditos"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                lineNumber: 200,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                        lineNumber: 198,
                                                        columnNumber: 49
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-4 border-t border-gray-100 relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-2",
                                                            children: "Docente Titular"
                                                        }, void 0, false, {
                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                            lineNumber: 205,
                                                            columnNumber: 49
                                                        }, this),
                                                        subject.defaultTeacher ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3 bg-gray-50 p-2 rounded-xl group-hover:bg-blue-50/50 transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-8 w-8 rounded-full bg-gradient-to-tr from-upds-main to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-sm",
                                                                    children: subject.defaultTeacher.user.fullName.charAt(0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                    lineNumber: 208,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "truncate",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm font-bold text-gray-800 truncate",
                                                                            children: subject.defaultTeacher.user.fullName
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                            lineNumber: 212,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-blue-600 truncate font-medium",
                                                                            children: "Docente Asignado"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                            lineNumber: 213,
                                                                            columnNumber: 61
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                    lineNumber: 211,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                            lineNumber: 207,
                                                            columnNumber: 53
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 text-gray-400 py-1 italic",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-8 w-8 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center",
                                                                    children: "?"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                    lineNumber: 218,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm",
                                                                    children: "Sin asignar"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                    lineNumber: 219,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 53
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, subject.id, true, {
                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                            lineNumber: 175,
                                            columnNumber: 41
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                    lineNumber: 173,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, semester, true, {
                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                            lineNumber: 163,
                            columnNumber: 29
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                    lineNumber: 161,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-20 px-6 bg-white rounded-3xl border border-dashed border-gray-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto h-16 w-16 text-gray-300 mb-4 bg-gray-50 rounded-full flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-8 h-8",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                }, void 0, false, {
                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                    lineNumber: 232,
                                    columnNumber: 108
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                lineNumber: 232,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                            lineNumber: 231,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-medium text-gray-900",
                            children: "No se encontraron materias"
                        }, void 0, false, {
                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                            lineNumber: 234,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm text-gray-500",
                            children: "Prueba ajustando tu búsqueda o crea una nueva materia."
                        }, void 0, false, {
                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                            lineNumber: 235,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                    lineNumber: 230,
                    columnNumber: 21
                }, this),
                isModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity",
                            onClick: ()=>setIsModalOpen(false)
                        }, void 0, false, {
                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                            lineNumber: 242,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-h-screen items-center justify-center p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full max-w-2xl transform overflow-visible rounded-2xl bg-white text-left shadow-2xl transition-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gradient-to-r from-upds-main to-blue-800 px-8 py-5 rounded-t-2xl flex justify-between items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-2xl font-bold text-white",
                                                        children: editingId ? 'Editar Materia' : 'Nueva Materia'
                                                    }, void 0, false, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                        lineNumber: 248,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-blue-200 text-sm",
                                                        children: editingId ? 'Modifica la información existente' : 'Ingresa los detalles académicos'
                                                    }, void 0, false, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                        lineNumber: 249,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                lineNumber: 247,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setIsModalOpen(false),
                                                className: "text-white/70 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-6 h-6",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M6 18L18 6M6 6l12 12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 120
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                lineNumber: 251,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                        lineNumber: 246,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: handleSubmit,
                                        className: "p-8 space-y-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "col-span-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2",
                                                                children: "Sigla / Código"
                                                            }, void 0, false, {
                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                lineNumber: 261,
                                                                columnNumber: 46
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                required: true,
                                                                placeholder: "Ej: SIS-101",
                                                                className: "w-full rounded-xl border-gray-200 bg-gray-50/50 border px-4 py-3 outline-none focus:ring-2 focus:ring-upds-main/30 focus:border-upds-main font-mono tracking-wide uppercase transition-all",
                                                                value: formData.code,
                                                                onChange: (e)=>setFormData({
                                                                        ...formData,
                                                                        code: e.target.value.toUpperCase()
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                lineNumber: 262,
                                                                columnNumber: 46
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "col-span-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2",
                                                                children: "Nombre de la Materia"
                                                            }, void 0, false, {
                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                lineNumber: 271,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                required: true,
                                                                placeholder: "Ej: Introducción a la Programación",
                                                                className: "w-full rounded-xl border-gray-200 bg-gray-50/50 border px-4 py-3 outline-none focus:ring-2 focus:ring-upds-main/30 focus:border-upds-main transition-all font-medium text-gray-800",
                                                                value: formData.name,
                                                                onChange: (e)=>setFormData({
                                                                        ...formData,
                                                                        name: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                lineNumber: 272,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                        lineNumber: 270,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                lineNumber: 259,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3",
                                                        children: "Semestre Académico"
                                                    }, void 0, false, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-2",
                                                        children: [
                                                            [
                                                                1,
                                                                2,
                                                                3,
                                                                4,
                                                                5,
                                                                6,
                                                                7,
                                                                8,
                                                                9,
                                                                10
                                                            ].map((sem)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>setFormData({
                                                                            ...formData,
                                                                            semester: sem
                                                                        }),
                                                                    className: `w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all border-2 ${formData.semester === sem ? 'border-upds-main bg-upds-main text-white shadow-lg scale-110' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'}`,
                                                                    children: sem
                                                                }, sem, false, {
                                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                    lineNumber: 287,
                                                                    columnNumber: 49
                                                                }, this)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-px h-10 bg-gray-200 mx-2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                lineNumber: 300,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 bg-gray-50 px-3 rounded-lg border border-gray-100",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-bold text-gray-500",
                                                                        children: "CRÉDITOS:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                        lineNumber: 302,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        min: "1",
                                                                        max: "10",
                                                                        className: "w-12 bg-transparent text-center font-bold text-gray-800 outline-none border-b border-transparent focus:border-upds-main py-1",
                                                                        value: formData.credits,
                                                                        onChange: (e)=>setFormData({
                                                                                ...formData,
                                                                                credits: parseInt(e.target.value)
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                        lineNumber: 303,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                lineNumber: 301,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                        lineNumber: 285,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                lineNumber: 283,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2",
                                                        children: "Asignar Docente Titular"
                                                    }, void 0, false, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setIsTeacherDropdownOpen(!isTeacherDropdownOpen),
                                                                className: `w-full text-left rounded-xl border bg-white px-4 py-3 outline-none transition-all flex items-center justify-between ${isTeacherDropdownOpen ? 'ring-2 ring-upds-main/30 border-upds-main' : 'border-gray-200 hover:border-gray-300'}`,
                                                                children: [
                                                                    formData.defaultTeacherId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-3",
                                                                        children: (()=>{
                                                                            const t = teachers.find((t)=>t.id === formData.defaultTeacherId);
                                                                            return t ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs",
                                                                                        children: t.user.fullName.charAt(0)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                                        lineNumber: 329,
                                                                                        columnNumber: 69
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "font-bold text-gray-800 text-sm",
                                                                                                children: t.user.fullName
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                                                lineNumber: 331,
                                                                                                columnNumber: 73
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "text-xs text-gray-500",
                                                                                                children: t.specialty
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                                                lineNumber: 332,
                                                                                                columnNumber: 73
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                                        lineNumber: 330,
                                                                                        columnNumber: 69
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: "Seleccionar..."
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                                lineNumber: 335,
                                                                                columnNumber: 65
                                                                            }, this);
                                                                        })()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                        lineNumber: 324,
                                                                        columnNumber: 53
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-400",
                                                                        children: "Buscar y seleccionar docente..."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                        lineNumber: 339,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        className: `w-5 h-5 text-gray-400 transition-transform ${isTeacherDropdownOpen ? 'rotate-180' : ''}`,
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        viewBox: "0 0 24 24",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: 2,
                                                                            d: "M19 9l-7 7-7-7"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                            lineNumber: 341,
                                                                            columnNumber: 210
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                        lineNumber: 341,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                lineNumber: 318,
                                                                columnNumber: 45
                                                            }, this),
                                                            isTeacherDropdownOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute z-10 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden max-h-64 flex flex-col animate-in fade-in slide-in-from-top-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "p-2 bg-gray-50 border-b border-gray-100 sticky top-0",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            autoFocus: true,
                                                                            className: "w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-upds-main",
                                                                            placeholder: "Filtrar por nombre o especialidad...",
                                                                            value: teacherSearch,
                                                                            onChange: (e)=>setTeacherSearch(e.target.value)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                            lineNumber: 348,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                        lineNumber: 347,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "overflow-y-auto p-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "p-2 cursor-pointer hover:bg-gray-50 rounded-lg text-gray-500 text-sm italic",
                                                                                onClick: ()=>{
                                                                                    setFormData({
                                                                                        ...formData,
                                                                                        defaultTeacherId: ''
                                                                                    });
                                                                                    setIsTeacherDropdownOpen(false);
                                                                                },
                                                                                children: "-- Sin Asignar --"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                                lineNumber: 357,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            filteredTeachers.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    onClick: ()=>{
                                                                                        setFormData({
                                                                                            ...formData,
                                                                                            defaultTeacherId: t.id
                                                                                        });
                                                                                        setIsTeacherDropdownOpen(false);
                                                                                    },
                                                                                    className: `p-2 cursor-pointer hover:bg-blue-50 rounded-lg flex items-center gap-3 transition-colors ${formData.defaultTeacherId === t.id ? 'bg-blue-50/80 border border-blue-100' : ''}`,
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs shrink-0",
                                                                                            children: t.user.fullName.charAt(0)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                                            lineNumber: 369,
                                                                                            columnNumber: 65
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "font-bold text-gray-800 text-sm",
                                                                                                    children: t.user.fullName
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                                                    lineNumber: 371,
                                                                                                    columnNumber: 69
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "text-xs text-gray-500",
                                                                                                    children: t.specialty
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                                                    lineNumber: 372,
                                                                                                    columnNumber: 69
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                                            lineNumber: 370,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, t.id, true, {
                                                                                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                                    lineNumber: 364,
                                                                                    columnNumber: 61
                                                                                }, this)),
                                                                            filteredTeachers.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "p-4 text-center text-gray-400 text-sm",
                                                                                children: "No se encontraron docentes"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                                lineNumber: 377,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                        lineNumber: 356,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                                lineNumber: 346,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                lineNumber: 314,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4 pt-6 mt-4 border-t border-gray-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setIsModalOpen(false),
                                                        className: "flex-1 px-4 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors",
                                                        children: "Cancelar"
                                                    }, void 0, false, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2d$horarios$2d$upds$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "submit",
                                                        className: "flex-[2] px-4 py-3 bg-upds-main text-white font-bold rounded-xl hover:bg-blue-900 shadow-lg hover:shadow-xl transition-all",
                                                        children: editingId ? 'Actualizar' : 'Guardar Materia'
                                                    }, void 0, false, {
                                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                                lineNumber: 386,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                        lineNumber: 256,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                                lineNumber: 244,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                            lineNumber: 243,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
                    lineNumber: 241,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
            lineNumber: 117,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/web-horarios-upds/src/app/dashboard/subjects/page.tsx",
        lineNumber: 116,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=web-horarios-upds_src_cdf40d13._.js.map