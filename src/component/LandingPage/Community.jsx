'use client';

import React, { useEffect, useRef } from 'react';
import { Heart, Users, BookOpen, Handshake, Globe, TreePine } from 'lucide-react';

const Community = () => {
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

  const socialInitiatives = [
    {
      icon: BookOpen,
      title: 'Education Programs',
      description: 'Funding scholarships and educational initiatives for underprivileged communities.',
      image: 'https://images.pexels.com/photos/159844/pexels-photo-159844.jpeg',
      impact: '500+ Students Supported',
      delay: '0.1s'
    },
    {
      icon: Heart,
      title: 'Healthcare Access',
      description: 'Supporting medical facilities and healthcare programs in rural areas.',
      image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg',
      impact: '25 Clinics Established',
      delay: '0.2s'
    },
    {
      icon: TreePine,
      title: 'Environmental Projects',
      description: 'Investing in sustainable practices and environmental conservation efforts.',
      image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg',
      impact: '50K Trees Planted',
      delay: '0.3s'
    }
  ];

  const communityStats = [
    { icon: Users, number: '15K+', label: 'People Impacted' },
    { icon: Globe, number: '12', label: 'Countries Reached' },
    { icon: Handshake, number: '50+', label: 'Partner Organizations' },
    { icon: Heart, number: '$2M+', label: 'Social Investment' }
  ];

  return (
    <section id="community" ref={sectionRef} className="py-20 lg:py-32 bg-warm-beige/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-royal-blue mb-6">
            Community & Social Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Beyond financial returns, we're committed to creating positive change in communities around the world through meaningful social initiatives.
          </p>
        </div>

        {/* Social Initiatives */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {socialInitiatives.map((initiative, index) => (
            <div 
              key={index}
              className="animate-on-scroll hover-scale group"
              style={{ animationDelay: initiative.delay }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={initiative.image} 
                    alt={initiative.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Icon */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-brand-teal rounded-xl flex items-center justify-center">
                    <initiative.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Impact Badge */}
                  <div className="absolute bottom-4 left-4 bg-emerald-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {initiative.impact}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-royal-blue mb-3 group-hover:text-brand-teal transition-colors duration-200">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {initiative.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 animate-on-scroll" style={{ animationDelay: '0.5s' }}>
          {communityStats.map((stat, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-brand-teal rounded-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-emerald-green mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Community Values */}
        <div className="animate-on-scroll" style={{ animationDelay: '0.7s' }}>
          <div className="bg-gradient-to-r from-brand-teal to-emerald-green p-8 lg:p-12 rounded-3xl text-white text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-6">
              Our Commitment to Positive Change
            </h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div>
                <h4 className="text-lg font-semibold mb-3">Sustainable Investing</h4>
                <p className="text-white/90 text-sm">
                  We prioritize investments that create long-term value for both investors and society.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Community First</h4>
                <p className="text-white/90 text-sm">
                  A portion of all profits is dedicated to supporting local communities and social causes.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Transparent Impact</h4>
                <p className="text-white/90 text-sm">
                  Regular reporting on our social impact ensures transparency and accountability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;