"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ClassroomsTabs() {
  const pathname = usePathname();
  
  const tabs = [
    { 
        name: 'Gestión de Ambientes', 
        href: '/dashboard/classrooms', 
        exact: true,
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        )
    },
    { 
        name: 'Monitor de Ocupación', 
        href: '/dashboard/classrooms/occupancy', 
        exact: false,
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        )
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 mb-8 inline-flex">
       {tabs.map((tab) => {
         const isActive = tab.exact 
            ? pathname === tab.href 
            : pathname.startsWith(tab.href);
            
         return (
            <Link 
              key={tab.href} 
              href={tab.href}
              className={`flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                 isActive 
                   ? 'bg-upds-main text-white shadow-md' 
                   : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              {tab.name}
            </Link>
         );
       })}
    </div>
  );
}
