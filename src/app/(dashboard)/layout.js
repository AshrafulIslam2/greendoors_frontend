import { auth } from "@/auth";
import Navbar from "@/component/shared/Navbar";
import Navigation from "@/component/shared/Navigation";

import Sidebar from "@/component/shared/Sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const session = await auth();
  console.log("Dashboard Layout Session:", session); // Debug log
  // Redirect to /login if no session or accessToken
  if (!session || !session.user) {
    console.log("No session found, redirecting to login");
    redirect("/login");
  }
  return (
    <div className="relative h-screen flex  overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-scroll ">
        {/* <Navbar /> */}
        <Navigation />
        {children}
      </div>
    </div>
  );
}
