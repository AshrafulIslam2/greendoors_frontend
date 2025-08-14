"use client";

import React from "react";
import {
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-royal-blue text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-royal-blue" />
              </div>
              <span className="text-2xl font-bold">InvestTrust</span>
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              Building financial futures through trusted investment partnerships
              and community-driven social impact.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Instagram, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-brand-gold hover:text-royal-blue transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "How It Works", id: "how-it-works" },
                { label: "Investment Opportunities", id: "opportunities" },
                { label: "Member Benefits", id: "benefits" },
                { label: "Community Impact", id: "community" },
                { label: "Member Stories", id: "testimonials" },
              ].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/80 hover:text-brand-gold transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-3 text-white/80">
              <li>Portfolio Management</li>
              <li>Investment Advisory</li>
              <li>Risk Assessment</li>
              <li>Financial Planning</li>
              <li>Tax Optimization</li>
              <li>Retirement Planning</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="text-white/80">
                  123 Financial District
                  <br />
                  New York, NY 10005
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="text-white/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="text-white/80">info@investtrust.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="bg-white/5 rounded-lg p-6">
            <h4 className="font-semibold mb-3 text-brand-gold">
              Investment Disclaimer:
            </h4>
            <p className="text-sm text-white/70 leading-relaxed">
              All investments carry risk and may lose value. Past performance
              does not guarantee future results. Please consult with a financial
              advisor before making investment decisions. InvestTrust is a
              registered investment advisor with the SEC. Member SIPC.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-white/60 text-sm mb-4 lg:mb-0">
              © 2025 InvestTrust Association. All rights reserved.
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <a
                href="#"
                className="text-white/60 hover:text-brand-gold transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-brand-gold transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-brand-gold transition-colors"
              >
                Cookie Policy
              </a>
              <button
                onClick={scrollToTop}
                className="text-white/60 hover:text-brand-gold transition-colors"
              >
                Back to Top ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
