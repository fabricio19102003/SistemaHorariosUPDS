"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/features/auth/services/auth.service";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
        router.push('/dashboard');
    } else {
        router.push('/login');
    }
  }, [router]);

  // Spinner simple mientras redirige
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-upds-main"></div>
    </div>
  );
}
