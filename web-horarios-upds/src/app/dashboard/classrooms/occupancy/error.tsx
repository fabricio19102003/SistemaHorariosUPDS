'use client';

import { FileWarning, ShieldAlert } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isAuthError = error.message.includes('Unauthorized') || error.message.includes('Forbidden');

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      {isAuthError ? (
        <>
            <div className="bg-red-50 p-4 rounded-full mb-4">
                <ShieldAlert size={48} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
            <p className="text-gray-600 max-w-md mb-6">
                You do not have permission to view this dashboard. This area is restricted to Administrators and Super Administrators.
            </p>
        </>
      ) : (
        <>
            <div className="bg-red-50 p-4 rounded-full mb-4">
                <FileWarning size={48} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
            <p className="text-gray-600 max-w-md mb-6">
                We encountered an error while loading the occupancy data.
            </p>
            <button
                onClick={reset}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Try again
            </button>
        </>
      )}
    </div>
  );
}
