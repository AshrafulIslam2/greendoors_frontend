"use client";

import React, { useEffect, useRef } from "react";
import { Wallet, Building2, PiggyBank, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      icon: Wallet,
      title: "Deposit & Join",
      description:
        "Make your initial deposit and become a member of our trusted investment community.",
      color: "bg-brand-teal",
      delay: "0.1s",
    },
    {
      icon: Building2,
      title: "Strategic Investment",
      description:
        "Our expert team identifies and invests in high-potential businesses across diverse sectors.",
      color: "bg-emerald-green",
      delay: "0.3s",
    },
    {
      icon: PiggyBank,
      title: "Profit Sharing",
      description:
        "Enjoy regular returns and profit sharing based on our successful investment portfolio.",
      color: "bg-brand-gold",
      delay: "0.5s",
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-warm-beige/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-royal-blue mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our proven three-step process makes investing simple, transparent,
            and rewarding for all members.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div
                className="animate-on-scroll hover-scale bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative z-10"
                style={{ animationDelay: step.delay }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-royal-blue text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 ${step.color} rounded-xl flex items-center justify-center mb-6 mx-auto`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-royal-blue mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {step.description}
                </p>
              </div>

              {/* Arrow - Desktop Only */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-10 transform -translate-y-1/2 z-20">
                  <ArrowRight className="w-8 h-8 text-brand-teal animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-16 animate-on-scroll"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="bg-gradient-to-r from-royal-blue to-emerald-green p-8 rounded-2xl text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="mb-6 text-white/90">
              Join thousands of members who are already building their financial
              future with us.
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("cta")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-brand-gold hover:bg-yellow-600 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
            >
              Become a Member Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
