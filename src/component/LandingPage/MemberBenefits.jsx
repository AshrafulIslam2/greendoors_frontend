"use client";

import React from "react";
import {
  Crown,
  Shield,
  TrendingUp,
  Users,
  BookOpen,
  Heart,
} from "lucide-react";

export default function MemberBenefits() {
  const benefits = [
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Exclusive Investment Access",
      description:
        "Get first access to high-return investment opportunities not available to the general public.",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Risk Management",
      description:
        "Our expert team conducts thorough due diligence and risk assessment for every investment.",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Higher Returns",
      description:
        "Achieve 15-25% average annual returns through our diversified investment portfolio.",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Network",
      description:
        "Connect with like-minded investors and business leaders in our exclusive member community.",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Educational Resources",
      description:
        "Access premium investment education, market insights, and financial planning resources.",
      gradient: "from-indigo-400 to-blue-500",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Social Impact",
      description:
        "Make a positive difference while earning returns through our community-focused initiatives.",
      gradient: "from-red-400 to-pink-500",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Exclusive Member
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Benefits
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our elite investment community and unlock access to premium
            benefits, exclusive opportunities, and expert guidance that sets you
            up for financial success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div
                className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${benefit.gradient} text-white mb-6`}
              >
                {benefit.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {benefit.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Available to all members
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Plus Many More Benefits
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our membership program is designed to provide comprehensive
              support for your investment journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">24/7</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Support</h4>
              <p className="text-sm text-gray-600">
                Round-the-clock assistance from our expert team
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">$0</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Hidden Fees</h4>
              <p className="text-sm text-gray-600">
                Transparent pricing with no surprise charges
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20  bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">100%</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Transparency</h4>
              <p className="text-sm text-gray-600">
                Full visibility into all investment activities
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">5★</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Rated Service
              </h4>
              <p className="text-sm text-gray-600">
                Consistently top-rated by our members
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
