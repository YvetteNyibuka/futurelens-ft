"use client";

import { usePathname } from "next/navigation";

export default function ConditionalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <div className={`min-h-screen ${isDashboard ? "" : "pt-16"}`}>
      {children}
    </div>
  );
}
