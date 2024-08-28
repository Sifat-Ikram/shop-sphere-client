"use client";
import AdminNavbar from "@/components/shared/AdminNavbar";

export default function DashboardLayout({ children }) {
  return (
    <body>
      <div className="flex max-md:flex-col justify-center">
        <AdminNavbar />
        <main className="flex-1">{children}</main>
      </div>
    </body>
  );
}
