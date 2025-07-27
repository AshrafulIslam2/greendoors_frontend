"use client";

import { closeSidebar } from "@/state/helper_slice/sidebarSlice";
import {
  Home,
  BarChart3,
  Users,
  Banknote,
  X,
  User,
  LogOut,
  FolderKanban,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Updated icons for sidebar items
const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Members", href: "/members" },
  { icon: Home, label: "Home", href: "/" }, // Use Home icon for Home
  { icon: Banknote, label: "Deposit", href: "/deposits" },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const isOpen = useSelector((state) => state.sidebar.isSidebarOpen);

  // Only one active at a time: Dashboard if /dashboard, Home if exactly /
  const getIsActive = (href) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href) && href !== "/";
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-500 opacity-50 lg:hidden"
          onClick={() => dispatch(closeSidebar())}
        />
      )}
      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-[300px] bg-gray-900 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-gray-800 ">
          <div className="flex items-center  ">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="ml-3 text-white font-semibold text-lg">
              Dashboard
            </span>
          </div>
          <button
            onClick={() => dispatch(closeSidebar())}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = getIsActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                      ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }
                    `}
                    onClick={() => dispatch(closeSidebar())}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full flex items-center justify-center gap-2 text-gray-200 text-sm font-medium bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
