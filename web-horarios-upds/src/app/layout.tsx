import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema Horarios UPDS",
  description: "Sistema de gestión de horarios y docentes UPDS",
  icons: {
    icon: '/upds-logo.png',
  },
};

import { ToastProvider } from "@/context/ToastContext";

// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={cn(montserrat.className, "min-h-screen bg-background antialiased")}>
        <ToastProvider>
            {children}
        </ToastProvider>
      </body>
    </html>
  );
}
