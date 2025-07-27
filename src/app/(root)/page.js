"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Enhanced dummy data with better structure
const members = [
  {
    name: "Dr. Sarah Chen",
    title: "Founder & CEO",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Environmental scientist with 15+ years of experience in sustainable development.",
  },
  {
    name: "Marcus Rodriguez",
    title: "Co-Founder & CTO",
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Tech innovator focused on green technology solutions.",
  },
  {
    name: "Elena Vasquez",
    title: "Head of Operations",
    image:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Operations expert specializing in community engagement programs.",
  },
  {
    name: "Dr. James Walker",
    title: "Scientific Advisor",
    image:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Climate researcher and policy advocate.",
  },
  {
    name: "Aisha Patel",
    title: "Community Director",
    image:
      "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Community organizer with passion for environmental justice.",
  },
];

const timeline = [
  {
    year: "2018",
    event:
      "Green Doors Association founded with a vision for sustainable communities.",
    icon: "🌱",
  },
  {
    year: "2019",
    event: "First community garden project launched, serving 500+ families.",
    icon: "🌿",
  },
  {
    year: "2020",
    event: "Launched digital platform connecting eco-conscious communities.",
    icon: "💻",
  },
  {
    year: "2021",
    event: "Reached 1,000+ active members across 15 cities.",
    icon: "🌍",
  },
  {
    year: "2022",
    event: "Established partnerships with major environmental organizations.",
    icon: "🤝",
  },
  {
    year: "2023",
    event: "Launched Green City Initiative, transforming urban landscapes.",
    icon: "🏙️",
  },
  {
    year: "2024",
    event: "Awarded 'Environmental Impact Organization of the Year'.",
    icon: "🏆",
  },
];

const projects = [
  {
    title: "Green City Initiative",
    description:
      "Transforming concrete jungles into thriving green ecosystems through innovative urban planning and community engagement.",
    image:
      "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600",
    impact: "50+ Cities Transformed",
    category: "Urban Development",
  },
  {
    title: "Eco School Program",
    description:
      "Educating the next generation about sustainability through hands-on learning experiences and environmental stewardship.",
    image:
      "https://images.pexels.com/photos/8613320/pexels-photo-8613320.jpeg?auto=compress&cs=tinysrgb&w=600",
    impact: "10,000+ Students Reached",
    category: "Education",
  },
  {
    title: "Clean Water Initiative",
    description:
      "Providing sustainable clean water solutions to underserved communities through innovative filtration technology.",
    image:
      "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=600",
    impact: "25,000+ People Served",
    category: "Water Access",
  },
  {
    title: "Carbon Neutral Homes",
    description:
      "Retrofitting residential buildings with renewable energy systems and sustainable materials for zero-emission living.",
    image:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600",
    impact: "500+ Homes Converted",
    category: "Energy",
  },
  {
    title: "Community Gardens Network",
    description:
      "Building interconnected community gardens that provide fresh food while strengthening neighborhood bonds.",
    image:
      "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=600",
    impact: "200+ Gardens Created",
    category: "Food Security",
  },
  {
    title: "Renewable Energy Co-ops",
    description:
      "Establishing community-owned renewable energy cooperatives that make clean power accessible and affordable.",
    image:
      "https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=600",
    impact: "15 MW Generated",
    category: "Energy",
  },
];

export default function App() {
  const heroRef = useRef(null);
  const membersRef = useRef(null);
  const timelineRef = useRef(null);
  const missionRef = useRef(null);
  const projectsRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Custom cursor
    const cursor = cursorRef.current;
    let mouseX = 0;
    let mouseY = 0;

    const updateCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener("mousemove", updateCursor);

    gsap.to(cursor, {
      duration: 0.016,
      repeat: -1,
      onRepeat: () => {
        gsap.set(cursor, {
          css: {
            left: mouseX,
            top: mouseY,
          },
        });
      },
    });

    // Hero section advanced animations
    const heroTl = gsap.timeline();
    heroTl
      .fromTo(
        heroRef.current?.querySelector(".hero-title"),
        { opacity: 0, y: 100, rotationX: 90 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1.5, ease: "back.out(1.7)" }
      )
      .fromTo(
        heroRef.current?.querySelector(".hero-subtitle"),
        { opacity: 0, y: 60, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(
        heroRef.current?.querySelector(".hero-cta"),
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.75)",
        },
        "-=0.6"
      );

    // Parallax effect for hero background
    gsap.to(heroRef.current?.querySelector(".hero-bg"), {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Members section with magnetic hover effects
    const memberCards = gsap.utils.toArray(".member-card");
    memberCards.forEach((card) => {
      const tl = gsap.timeline({ paused: true });

      tl.to(card, {
        scale: 1.05,
        z: 100,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        duration: 0.3,
        ease: "power2.out",
      });

      card.addEventListener("mouseenter", () => tl.play());
      card.addEventListener("mouseleave", () => tl.reverse());

      // Magnetic effect
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(card, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.75)",
        });
      });
    });

    // Staggered animation for member cards
    gsap.fromTo(
      ".member-card",
      { opacity: 0, y: 100, rotationY: 90 },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: membersRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Timeline advanced animations
    const timelineItems = gsap.utils.toArray(".timeline-item");
    timelineItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Mission section with split text animation
    const missionText = missionRef.current?.querySelector(".mission-text");
    if (missionText) {
      const text = missionText.textContent;
      missionText.innerHTML = "";
      text?.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        missionText.appendChild(span);
      });

      gsap.fromTo(
        missionText.children,
        { opacity: 0, y: 50, rotationX: 90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.05,
          stagger: 0.02,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 70%",
          },
        }
      );
    }

    // Projects section with 3D card effects
    const projectCards = gsap.utils.toArray(".project-card");
    projectCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 120,
          rotationX: 45,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1.2,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3D hover effect
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    });

    // Scroll progress indicator
    gsap.to(".progress-bar", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", updateCursor);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 bg-emerald-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-blue-500 z-40 origin-left scale-x-0 progress-bar" />

      <div className="bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden"
        >
          {/* <div className="hero-bg absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-blue-600/10 to-slate-900/40" /> */}

          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-emerald-400/30 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-6xl mx-auto">
            <h1 className="hero-title text-4xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-300 mb-6 leading-tight">
              Green Doors
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl font-light text-white/90">
                Association
              </span>
            </h1>

            <p className="hero-subtitle text-xl md:text-3xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
              Pioneering sustainable communities through innovation,
              <br className="hidden md:block" />
              collaboration, and environmental stewardship
            </p>

            <button className="hero-cta group relative px-12 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 overflow-hidden">
              <span className="relative z-10">Explore Our Impact</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>
        </section>

        {/* Members Section */}
        <section
          ref={membersRef}
          className="relative py-24 bg-gradient-to-br from-slate-800 to-emerald-800"
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
              Meet Our Visionaries
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {members.map((member, idx) => (
                <div
                  key={idx}
                  className="member-card group bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:border-emerald-400/50 transition-all duration-500"
                >
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                    {member.name}
                  </h3>

                  <span className="inline-block text-emerald-400 font-semibold text-sm bg-emerald-400/20 px-3 py-1 rounded-full mb-3">
                    {member.title}
                  </span>

                  <p className="text-white/70 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section
          ref={timelineRef}
          className="relative py-24 bg-gradient-to-br from-emerald-800 to-slate-900"
        >
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Our Journey
            </h2>

            {/* Desktop Timeline */}
            <div className="relative hidden md:block">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-400 to-blue-400 rounded-full" />

              {timeline.map((item, idx) => (
                <div
                  key={idx}
                  className={`timeline-item relative flex items-center mb-16 ${
                    idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className={`w-1/2 ${idx % 2 === 0 ? "pr-12" : "pl-12"}`}>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-emerald-400/50 transition-all duration-500">
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-3">{item.icon}</span>
                        <time className="text-2xl font-bold text-emerald-400">
                          {item.year}
                        </time>
                      </div>
                      <p className="text-white/90 text-lg leading-relaxed">
                        {item.event}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full border-4 border-white shadow-lg" />
                </div>
              ))}
            </div>

            {/* Mobile Timeline: vertical cards */}
            <div className="flex flex-col gap-8 md:hidden">
              {timeline.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 text-white text-2xl font-bold shadow-lg mb-2">
                      {item.icon}
                    </div>
                    {idx !== timeline.length - 1 && (
                      <div className="w-1 h-10 bg-gradient-to-b from-emerald-400 to-blue-400 rounded-full" />
                    )}
                  </div>
                  <div>
                    <time className="block text-lg font-bold text-emerald-300 mb-1">
                      {item.year}
                    </time>
                    <p className="text-white/90 text-base leading-relaxed">
                      {item.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section
          ref={missionRef}
          className="relative py-24 bg-gradient-to-br from-slate-900 to-emerald-900"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 mb-8">
                  Our Mission
                </h2>
                <p className="mission-text text-2xl md:text-3xl text-white/90 mb-12 leading-relaxed font-light">
                  To inspire and empower communities to create sustainable,
                  green environments for current and future generations.
                </p>

                <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-8">
                  Our Vision
                </h2>
                <p className="text-2xl md:text-3xl text-white/90 leading-relaxed font-light">
                  A world where every community thrives in harmony with nature,
                  leading the way in environmental stewardship.
                </p>
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Mission and Vision"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-6 text-white">
                  <div className="text-3xl font-bold">25K+</div>
                  <div className="text-sm opacity-90">Lives Impacted</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          ref={projectsRef}
          className="relative py-24 bg-gradient-to-br from-emerald-900 to-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
              Our Impact Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="project-card group bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 hover:border-emerald-400/50 transition-all duration-500"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-white/80 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-semibold">
                        {project.impact}
                      </span>
                      <button className="text-white/60 hover:text-emerald-400 transition-colors duration-300">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-16 bg-slate-900 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-white/70 mb-8 text-lg">
              Join our community of environmental stewards and help build a
              sustainable future.
            </p>
            <button className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold px-8 py-3 rounded-full hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500">
              Get Involved Today
            </button>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-white/50">
                © 2024 Green Doors Association. Building sustainable communities
                worldwide.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
