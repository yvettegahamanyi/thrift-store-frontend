import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
