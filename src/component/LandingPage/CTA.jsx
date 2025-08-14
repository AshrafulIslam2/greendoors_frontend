"use client";

import React from "react";
import { ArrowRight, Star, TrendingUp } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-400/20 rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-white text-sm font-medium">
                Join Thousands of Successful Investors
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Start Your
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Investment Journey?
              </span>
            </h2>

            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join our community today and get access to exclusive investment
              opportunities, expert guidance, and tools to build your wealth.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <TrendingUp className="w-8 h-8 text-green-400 mb-4 mx-auto" />
              <h3 className="text-white font-semibold mb-2">High Returns</h3>
              <p className="text-white/80 text-sm">
                Average 15-25% annual returns on investment
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Star className="w-8 h-8 text-yellow-400 mb-4 mx-auto" />
              <h3 className="text-white font-semibold mb-2">Expert Support</h3>
              <p className="text-white/80 text-sm">
                24/7 support from investment professionals
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <ArrowRight className="w-8 h-8 text-blue-400 mb-4 mx-auto" />
              <h3 className="text-white font-semibold mb-2">Easy Process</h3>
              <p className="text-white/80 text-sm">
                Get started in just 5 minutes
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors">
              Start Investing Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>

            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 rounded-full font-semibold transition-all duration-300 bg-transparent">
              Schedule Free Consultation
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/70 mb-4">
              Trusted by 50,000+ investors worldwide
            </p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="text-white text-sm">🔒 SEC Regulated</div>
              <div className="text-white text-sm">💎 SIPC Protected</div>
              <div className="text-white text-sm">⭐ 4.9/5 Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
