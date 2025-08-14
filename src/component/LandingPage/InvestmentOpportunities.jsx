'use client';

import React, { useEffect, useRef } from 'react';
import { TrendingUp, Building, Zap, Cpu, Leaf, ShoppingBag } from 'lucide-react';

const InvestmentOpportunities = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const opportunities = [
    {
      icon: Cpu,
      title: 'Technology Startups',
      description: 'Cutting-edge fintech and AI companies with high growth potential.',
      returns: '22% avg return',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      stats: '$12M invested',
      delay: '0.1s'
    },
    {
      icon: Leaf,
      title: 'Sustainable Energy',
      description: 'Clean energy solutions and environmental technology ventures.',
      returns: '18% avg return',
      image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg',
      stats: '$8.5M invested',
      delay: '0.2s'
    },
    {
      icon: Building,
      title: 'Real Estate Development',
      description: 'Premium commercial and residential property developments.',
      returns: '16% avg return',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
      stats: '$15M invested',
      delay: '0.3s'
    },
    {
      icon: ShoppingBag,
      title: 'E-commerce Platforms',
      description: 'Next-generation retail and marketplace technologies.',
      returns: '20% avg return',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
      stats: '$9M invested',
      delay: '0.4s'
    },
    {
      icon: Zap,
      title: 'Infrastructure',
      description: 'Smart city solutions and digital infrastructure projects.',
      returns: '14% avg return',
      image: 'https://images.pexels.com/photos/2885320/pexels-photo-2885320.jpeg',
      stats: '$6M invested',
      delay: '0.5s'
    },
    {
      icon: TrendingUp,
      title: 'Growth Companies',
      description: 'Established businesses ready for expansion and scaling.',
      returns: '17% avg return',
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg',
      stats: '$11M invested',
      delay: '0.6s'
    }
  ];

  return (
    <section id="opportunities" ref={sectionRef} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-royal-blue mb-6">
            Investment Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our diverse portfolio of carefully vetted investment opportunities across high-growth sectors.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity, index) => (
            <div 
              key={index}
              className="animate-on-scroll hover-scale group"
              style={{ animationDelay: opportunity.delay }}
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={opportunity.image} 
                    alt={opportunity.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Icon */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-emerald-green rounded-xl flex items-center justify-center">
                    <opportunity.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Returns Badge */}
                  <div className="absolute top-4 right-4 bg-brand-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {opportunity.returns}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-royal-blue mb-3 group-hover:text-emerald-green transition-colors duration-200">
                    {opportunity.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {opportunity.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-emerald-green font-semibold">
                      {opportunity.stats}
                    </span>
                    <span className="text-gray-500">
                      Portfolio allocation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 animate-on-scroll" style={{ animationDelay: '0.8s' }}>
          {[
            { number: '200+', label: 'Active Investments' },
            { number: '85%', label: 'Success Rate' },
            { number: '$60M+', label: 'Total Deployed' },
            { number: '18%', label: 'Average Returns' }
          ].map((stat, index) => (
            <div key={index} className="text-center bg-warm-beige/50 p-6 rounded-xl">
              <div className="text-3xl font-bold text-emerald-green mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentOpportunities;