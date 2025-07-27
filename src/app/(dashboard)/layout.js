import Navbar from "@/component/shared/Navbar";

import Sidebar from "@/component/shared/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="relative h-screen flex  overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-scroll ">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
