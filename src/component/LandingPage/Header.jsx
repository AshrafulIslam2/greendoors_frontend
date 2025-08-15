"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, TrendingUp } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full gradient-royal-emerald flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span
              className={`${
                isScrolled ? "text-green-800" : "text-white"
              } text-xl lg:text-2xl font-bold`}
            >
              Green Doors
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {[
              "How It Works",
              "Opportunities",
              "Benefits",
              "Community",
              "Testimonials",
            ].map((item) => (
              <button
                key={item}
                onClick={() =>
                  scrollToSection(item.toLowerCase().replace(" ", "-"))
                }
                className={` ${
                  isScrolled ? "text-gray-700" : "text-white"
                }  hover:text-royal-blue font-medium transition-colors duration-200`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            {session ? (
              <div className="space-x-4 ">
                <Link href="/dashboard">
                  <button className="bg-brand-teal cursor-pointer text-white font-semibold py-2 px-4 rounded transition-colors">
                    Dashboard
                  </button>
                </Link>
                <button
                  className="gradient-gold cursor-pointer text-white font-semibold py-2 px-4 rounded transition-colors"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login">
                <button className="gradient-gold cursor-pointer text-white font-semibold py-2 px-4 rounded transition-colors">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-royal-blue transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <nav className="flex flex-col py-4">
              {[
                "How It Works",
                "Opportunities",
                "Benefits",
                "Community",
                "Testimonials",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(item.toLowerCase().replace(" ", "-"))
                  }
                  className="px-6 py-3 text-left text-gray-700 hover:text-royal-blue hover:bg-gray-50 font-medium transition-all duration-200"
                >
                  {item}
                </button>
              ))}
              <div className="px-6 pt-2">
                {session ? (
                  <div className="space-x-4 ">
                    <Link href="/dashboard">
                      <button className="bg-brand-teal cursor-pointer text-white font-semibold py-2 px-4 rounded transition-colors">
                        Dashboard
                      </button>
                    </Link>
                    <button
                      className="gradient-gold cursor-pointer text-white font-semibold py-2 px-4 rounded transition-colors"
                      onClick={() => signOut()}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link href="/login">
                    <button className="w-full gradient-gold cursor-pointer hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-200">
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
