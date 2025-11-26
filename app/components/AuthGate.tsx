"use client";

import { usePathname } from "next/navigation";
import { useSession } from "@/lib/hooks/useSession";

const PUBLIC_PATHS = ["/auth", "/terms", "/privacy"];

interface AuthGateProps {
  children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const pathname = usePathname();
  const { user, loading } = useSession();

  // Check if current path is public
  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  ) || pathname === "/";

  // Allow public paths and root
  if (isPublic) {
    return <>{children}</>;
  }

  // Show loading state while checking
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-300">Checking login...</p>
      </div>
    );
  }

  // If user is not logged in, middleware will handle redirect
  // Just render children (middleware handles protection)
  return <>{children}</>;
}

