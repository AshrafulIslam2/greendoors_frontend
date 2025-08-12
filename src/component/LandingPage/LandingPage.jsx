"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import {
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Star,
  Calendar,
  Users,
  Briefcase,
} from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Board of Directors data
const boardMembers = [
  {
    name: "Dr. Rahman Ahmed",
    title: "Chairman",
    image:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Former UN Environment Program Director with 25+ years in sustainable development.",
    experience: "25+ Years",
    specialization: "Environmental Policy",
  },
  {
    name: "Ms. Fatima Khan",
    title: "Vice Chairman",
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Social entrepreneur and community development expert.",
    experience: "18+ Years",
    specialization: "Community Development",
  },
  {
    name: "Prof. Dr. Karim Hassan",
    title: "Secretary",
    image:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Agricultural scientist specializing in sustainable farming practices.",
    experience: "20+ Years",
    specialization: "Agricultural Science",
  },
  {
    name: "Mr. Abdul Majid",
    title: "Treasurer",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Financial advisor and microfinance expert.",
    experience: "15+ Years",
    specialization: "Financial Management",
  },
];

// Recent Projects data
const recentProjects = [
  {
    title: "Integrated Agro Development Project",
    description:
      "Modernizing agricultural practices with sustainable farming techniques, benefiting 500+ farmers across rural communities.",
    image:
      "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "Ongoing",
    startDate: "Jan 2024",
    beneficiaries: "500+ Farmers",
    category: "Agriculture",
    progress: 75,
  },
  {
    title: "Community Fish Farming Initiative",
    description:
      "Establishing sustainable aquaculture systems to improve food security and generate income for local communities.",
    image:
      "https://images.pexels.com/photos/1001990/pexels-photo-1001990.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "In Progress",
    startDate: "Mar 2024",
    beneficiaries: "200+ Families",
    category: "Aquaculture",
    progress: 60,
  },
  {
    title: "Eco-Friendly Leather Processing",
    description:
      "Implementing green technology in leather production to reduce environmental impact while creating employment.",
    image:
      "https://images.pexels.com/photos/1598300/pexels-photo-1598300.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "Planning",
    startDate: "Sep 2024",
    beneficiaries: "300+ Workers",
    category: "Manufacturing",
    progress: 25,
  },
  {
    title: "Solar Energy Cooperative",
    description:
      "Building community-owned solar installations to provide clean energy access to remote villages.",
    image:
      "https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "Ongoing",
    startDate: "Nov 2023",
    beneficiaries: "1000+ Households",
    category: "Energy",
    progress: 85,
  },
];

// Testimonials data
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Community Leader",
    image:
      "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=400",
    content:
      "Green Doors Association transformed our community through their sustainable agriculture program. Our farmers now earn 40% more income while protecting the environment.",
    rating: 5,
    location: "Rural District A",
  },
  {
    name: "Mohammad Ali",
    role: "Fish Farmer",
    image:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
    content:
      "The fish farming initiative changed my life completely. From struggling to feed my family, I now run a profitable aquaculture business that supports 5 families.",
    rating: 5,
    location: "Coastal Region B",
  },
  {
    name: "Dr. Amina Rahman",
    role: "Environmental Scientist",
    image:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    content:
      "Their approach to environmental conservation is exemplary. They don't just talk about sustainability - they implement real solutions that work for both people and planet.",
    rating: 5,
    location: "University Partnership",
  },
  {
    name: "Ahmed Hassan",
    role: "Solar Cooperative Member",
    image:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    content:
      "Thanks to the solar energy project, our village now has reliable electricity. Children can study at night and small businesses can operate extended hours.",
    rating: 5,
    location: "Mountain Village C",
  },
];

// Members list data
const membersList = [
  {
    name: "Dr. Rashida Begum",
    profession: "Environmental Engineer",
    image:
      "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=400",
    joinDate: "2019",
    contribution: "Water Management",
  },
  {
    name: "Eng. Kamal Uddin",
    profession: "Renewable Energy Specialist",
    image:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
    joinDate: "2020",
    contribution: "Solar Projects",
  },
  {
    name: "Ms. Nasreen Akter",
    profession: "Community Organizer",
    image:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    joinDate: "2021",
    contribution: "Rural Development",
  },
  {
    name: "Dr. Abul Kalam",
    profession: "Agricultural Scientist",
    image:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    joinDate: "2018",
    contribution: "Sustainable Farming",
  },
  {
    name: "Ms. Ruma Khatun",
    profession: "Microfinance Expert",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    joinDate: "2022",
    contribution: "Financial Inclusion",
  },
  {
    name: "Prof. Mizanur Rahman",
    profession: "Climate Researcher",
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    joinDate: "2019",
    contribution: "Climate Studies",
  },
];

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
    year: "2019",
    event:
      "Green Doors Association founded with a vision for sustainable communities.",
    icon: "🌱",
  },
  {
    year: "2020",
    event: "First community garden project launched, serving 500+ families.",
    icon: "🌿",
  },
  {
    year: "2021",
    event: "Launched digital platform connecting eco-conscious communities.",
    icon: "💻",
  },
  {
    year: "2022",
    event: "Reached 1,000+ active members across 15 cities.",
    icon: "🌍",
  },
  {
    year: "2023",
    event: "Established partnerships with major environmental organizations.",
    icon: "🤝",
  },
  {
    year: "2024",
    event: "Launched Green City Initiative, transforming urban landscapes.",
    icon: "🏙️",
  },
  {
    year: "2025",
    event: "Awarded 'Environmental Impact Organization of the Year'.",
    icon: "🏆",
  },
];

const LandingPage = () => {
  const heroRef = useRef(null);
  const membersRef = useRef(null);
  const timelineRef = useRef(null);
  const missionRef = useRef(null);
  const projectsRef = useRef(null);
  const cursorRef = useRef(null);
  const boardRef = useRef(null);
  const recentProjectsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const membersListRef = useRef(null);
  const contactRef = useRef(null);

  const [particles, setParticles] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentMemberSlide, setCurrentMemberSlide] = useState(0);

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

    // Board members animation
    const boardItems = gsap.utils.toArray(".board-item");
    boardItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            stagger: 0.2,
          },
        }
      );
    });

    // Recent projects animation
    const projectItems = gsap.utils.toArray(".project-item");
    projectItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 80, rotationY: 45 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            stagger: 0.1,
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

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", updateCursor);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    // Generate particles only on the client side
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 2 + Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const nextMemberSlide = () => {
    setCurrentMemberSlide(
      (prev) => (prev + 1) % Math.ceil(membersList.length / 3)
    );
  };

  const prevMemberSlide = () => {
    setCurrentMemberSlide(
      (prev) =>
        (prev - 1 + Math.ceil(membersList.length / 3)) %
        Math.ceil(membersList.length / 3)
    );
  };

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-emerald-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-blue-500 z-40 origin-left scale-x-0 progress-bar" />

      <div className="bg-gradient-to-br from-slate-950 via-green-950 to-slate-900 min-h-screen w-full overflow-x-hidden">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-2 h-2 bg-emerald-400/30 rounded-full animate-pulse"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.animationDelay}s`,
                  animationDuration: `${particle.animationDuration}s`,
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

        {/* Board of Directors Section */}
        <section
          ref={boardRef}
          className="relative py-24  from-slate-900 to-emerald-900"
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
              Board of Directors
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {boardMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="board-item flex flex-col bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-emerald-400/50 transition-all duration-500 hover:transform hover:scale-105"
                >
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-emerald-400/50"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full px-3 py-1">
                      <span className="text-white text-xs font-bold">
                        {member.title}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 text-center">
                    {member.name}
                  </h3>
                  <p className="text-emerald-300 text-sm text-center mb-3">
                    {member.specialization}
                  </p>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="flex justify-between items-center text-xs mt-auto">
                    <span className="text-emerald-400 font-semibold">
                      <Briefcase className="w-3 h-3 inline mr-1" />
                      {member.experience}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Projects Section */}
        <section ref={recentProjectsRef} className="relative py-24 ">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Our Recent Work
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentProjects.map((project, idx) => (
                <div
                  key={idx}
                  className="project-item bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:border-emerald-400/50 transition-all duration-500"
                >
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          project.status === "Ongoing"
                            ? "bg-green-500 text-white"
                            : project.status === "In Progress"
                            ? "bg-yellow-500 text-black"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/50 rounded-lg px-2 py-1">
                      <span className="text-white text-xs">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-white/80 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-emerald-300 flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Started: {project.startDate}
                        </span>
                        <span className="text-blue-300 flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {project.beneficiaries}
                        </span>
                      </div>

                      {/* <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white/70 text-sm">
                            Progress
                          </span>
                          <span className="text-emerald-400 text-sm font-bold">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-emerald-400 to-blue-400 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Members List Slider Section */}
        <section ref={membersListRef} className="relative py-24 b">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
              Our Members
            </h2>

            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentMemberSlide * 100}%)`,
                  }}
                >
                  {Array.from({
                    length: Math.ceil(membersList.length / 3),
                  }).map((_, slideIdx) => (
                    <div key={slideIdx} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {membersList
                          .slice(slideIdx * 3, (slideIdx + 1) * 3)
                          .map((member, idx) => (
                            <div
                              key={idx}
                              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-emerald-400/50 transition-all duration-500 hover:transform hover:scale-105"
                            >
                              <div className="text-center">
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-emerald-400/50"
                                />
                                <h3 className="text-xl font-bold text-white mb-2">
                                  {member.name}
                                </h3>
                                <p className="text-emerald-300 mb-2">
                                  {member.profession}
                                </p>
                                <p className="text-white/60 text-sm mb-3">
                                  Member since {member.joinDate}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <button
                onClick={prevMemberSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-emerald-500/20 hover:bg-emerald-500/40 rounded-full p-3 transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextMemberSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-emerald-500/20 hover:bg-emerald-500/40 rounded-full p-3 transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Dots indicator */}
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: Math.ceil(membersList.length / 3) }).map(
                  (_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentMemberSlide(idx)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        idx === currentMemberSlide
                          ? "bg-emerald-400"
                          : "bg-white/30"
                      }`}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section ref={timelineRef} className="relative py-24 ">
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

            {/* Mobile Timeline */}
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
        <section ref={missionRef} className="relative py-24 ">
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

        {/* Testimonials Section */}
        <section ref={testimonialsRef} className="relative py-24 ">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              What People Say
            </h2>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 text-yellow-400 fill-current"
                        />
                      )
                    )}
                  </div>

                  <blockquote className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed italic">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>

                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400"
                    />
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-white">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-emerald-300">
                        {testimonials[currentTestimonial].role}
                      </p>
                      <p className="text-white/60 text-sm">
                        {testimonials[currentTestimonial].location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-emerald-500/20 hover:bg-emerald-500/40 rounded-full p-3 transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-emerald-500/20 hover:bg-emerald-500/40 rounded-full p-3 transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Dots indicator */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === currentTestimonial
                        ? "bg-emerald-400"
                        : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section ref={contactRef} className="relative py-24 ">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Contact Us
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h3 className="text-3xl font-bold text-white mb-8">
                  Get in Touch
                </h3>
                <p className="text-white/80 mb-8 text-lg leading-relaxed">
                  Ready to join our mission for a sustainable future? We'd love
                  to hear from you. Whether you're interested in our projects,
                  want to become a member, or need more information, don't
                  hesitate to reach out.
                </p>

                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="bg-emerald-500/20 rounded-full p-3">
                      <Mail className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      {/* <h4 className="text-white font-semibold">Email</h4> */}
                      <p className="text-white/70">info@greendoors.org</p>
                      <p className="text-white/70">contact@greendoors.org</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-emerald-500/20 rounded-full p-3">
                      <Phone className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      {/* <h4 className="text-white font-semibold">Phone</h4> */}
                      <p className="text-white/70">+880 1234-567890</p>
                      <p className="text-white/70">+880 1987-654321</p>
                    </div>
                  </div>

                  <div className="flex items-center lg:items-start space-x-4 col-span-2  ">
                    <div className="bg-emerald-500/20 rounded-full p-3">
                      <MapPin className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="">
                      {/* <h4 className="text-white font-semibold">Address</h4> */}
                      <p className="text-white/70  ">
                        Green Doors Association, 123 Sustainability Street, Eco
                        District, Dhaka 1000 ,Bangladesh
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h4 className="text-white font-semibold mb-4">
                    Office Hours
                  </h4>
                  <div className="space-y-2 text-white/70">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Send us a Message
                </h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none transition-colors"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none transition-colors"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none transition-colors"
                      placeholder="Message subject"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none transition-colors resize-none"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold py-3 rounded-lg hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-16 border-t border-white/10">
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
};

export default LandingPage;
