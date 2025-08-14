"use client";
import React, { useEffect, useRef, useState } from "react";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import InvestmentOpportunities from "./InvestmentOpportunities";
import MemberBenefits from "./MemberBenefits";
import Community from "./Community";
import Testimonials from "./Testimonials";
import Header from "./Header";
import CTA from "./CTA";
import Footer from "./Footer";
import { useSession } from "next-auth/react";

const LandingPage = () => {
  useEffect(() => {
    // Enhanced scroll animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    // Smooth scrolling for anchor links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href")?.substring(1);
        const targetElement = document.getElementById(targetId || "");
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <InvestmentOpportunities />
        <MemberBenefits />
        <Community />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
