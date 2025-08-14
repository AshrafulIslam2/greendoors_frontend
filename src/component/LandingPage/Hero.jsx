"use client";

import React from "react";
import { ArrowRight, Shield, TrendingUp, Users } from "lucide-react";

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-royal-emerald"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Build Your Financial Future with
            <span className="block text-yellow-400">Trusted Partners</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Join our exclusive investment association where members unite to
            invest in promising businesses while making a positive impact
            through community-driven social initiatives.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-10">
            <div className="flex items-center space-x-2 text-white">
              <Shield className="w-6 h-6 text-yellow-400" />
              <span className="font-semibold">SEC Registered</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
              <span className="font-semibold">15%+ Average Returns</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Users className="w-6 h-6 text-yellow-400" />
              <span className="font-semibold">5,000+ Members</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors">
              Start Your Investment Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </button> */}
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="w-full sm:w-auto border-2 border-white  hover:bg-white text-yellow-400 hover:text-blue-900 font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:transform hover:scale-105"
            >
              Learn How It Works
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "$50M+", label: "Assets Under Management" },
              { number: "200+", label: "Successful Investments" },
              { number: "8 Years", label: "Track Record" },
              { number: "99.2%", label: "Member Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm lg:text-base text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full p-1">
          <div className="w-1 h-3 bg-white/70 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
