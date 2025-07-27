"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  BarChart3,
  Users,
  Settings,
  LogIn,
  Menu,
  X,
  Bell,
  Search,
  User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "@/state/helper_slice/sidebarSlice";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/login");
  //   }
  // }, [status, router]);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const getInitials = (name) => {
    if (!name) return "U"; // fallback
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  };
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const companyName = "Green Doors";
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200  z-50  sticky top-0 ">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <button
            onClick={() => dispatch(openSidebar())}
            className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div> */}
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="">
            {session?.user ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center md:space-x-3"
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    {session.user.profileImage ? (
                      <Image
                        src={session.user.profileImage}
                        alt={session.user.name}
                        width={50}
                        height={50}
                      />
                    ) : (
                      <User className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <div className="hidden md:block">
                    <p className="text-2xl font-extrabold text-gray-900">
                      {getInitials(session.user.name)}
                    </p>
                    <p className="text-xs text-gray-500">{session.user.role}</p>
                  </div>
                </Link>
              </>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-black font-medium border border-gray-300 rounded px-3 py-1 transition-colors duration-200"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
    // <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="flex justify-between h-16 items-center">
    //       {/* Logo */}
    //       <div className="flex-shrink-0 flex items-center">
    //         <h1 className="w-9 h-9  rounded-full bg-black ring-1 ring-green-700 text-white flex items-center justify-center font-semibold text-sm ">
    //           {`${companyName.trim().split(" ")[0][0]}${
    //             companyName.trim().split(" ")[1][0]
    //           }`}
    //         </h1>
    //         <span className="ml-2 font-bold text-lg text-gray-800">
    //           {companyName}
    //         </span>
    //       </div>

    //       {/* Desktop Menu */}
    //       <div className="hidden md:flex space-x-8">
    //         <Link href="#about" className="text-gray-700 hover:text-blue-600">
    //           About Us
    //         </Link>
    //         <Link href="#contact" className="text-gray-700 hover:text-blue-600">
    //           Contact Us
    //         </Link>
    //         <Link
    //           href="#policies"
    //           className="text-gray-700 hover:text-blue-600"
    //         >
    //           Our Policies
    //         </Link>
    //       </div>

    //       {/* Right Side: Profile or Login */}
    //       <div className="hidden md:flex items-center space-x-4 relative">
    //         {session?.user ? (
    //           <div className="relative">
    //             <button onClick={toggleDropdown} className="focus:outline-none">
    //               <div className="w-9 h-9 rounded-full bg-black ring-1 ring-green-700 text-white flex items-center justify-center font-semibold text-sm border border-gray-300">
    //                 {getInitials(session?.user?.name)}
    //               </div>
    //             </button>
    //             {dropdownOpen && (
    //               <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
    //                 <Link
    //                   href="/profile"
    //                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    //                 >
    //                   Profile
    //                 </Link>
    //                 <button
    //                   onClick={() => signOut()}
    //                   className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    //                 >
    //                   Logout
    //                 </button>
    //               </div>
    //             )}
    //           </div>
    //         ) : (
    //           <button
    //             onClick={() => signIn()}
    //             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    //           >
    //             Login
    //           </button>
    //         )}
    //       </div>

    //       {/* Mobile Menu Button */}
    //       <div className="md:hidden flex items-center">
    //         <button
    //           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    //           className="text-gray-700 focus:outline-none"
    //         >
    //           <svg
    //             className="h-6 w-6"
    //             fill="none"
    //             stroke="currentColor"
    //             viewBox="0 0 24 24"
    //           >
    //             {mobileMenuOpen ? (
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M6 18L18 6M6 6l12 12"
    //               />
    //             ) : (
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M4 6h16M4 12h16M4 18h16"
    //               />
    //             )}
    //           </svg>
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Mobile Menu */}
    //   {mobileMenuOpen && (
    //     <div className="md:hidden px-4 pb-4 pt-2 bg-white border-t">
    //       <Link
    //         href="#about"
    //         className="block py-2 text-gray-700 hover:text-blue-600"
    //       >
    //         About Us
    //       </Link>
    //       <Link
    //         href="#contact"
    //         className="block py-2 text-gray-700 hover:text-blue-600"
    //       >
    //         Contact Us
    //       </Link>
    //       <Link
    //         href="#policies"
    //         className="block py-2 text-gray-700 hover:text-blue-600"
    //       >
    //         Our Policies
    //       </Link>
    //       <div className="pt-2">
    //         {session?.user ? (
    //           <>
    //             <Link
    //               href="/profile"
    //               className="block py-2 text-gray-700 hover:text-blue-600"
    //             >
    //               Profile
    //             </Link>
    //             <button
    //               onClick={() => signOut()}
    //               className="block py-2 text-gray-700 hover:text-blue-600"
    //             >
    //               Logout
    //             </button>
    //           </>
    //         ) : (
    //           <button
    //             onClick={() => signIn()}
    //             className="w-full bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700 transition"
    //           >
    //             Login
    //           </button>
    //         )}
    //       </div>
    //     </div>
    //   )}
    // </nav>
  );
}
