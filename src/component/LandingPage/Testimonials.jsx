'use client';

import React, { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
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

  const testimonials = [
    {
      name: 'Sarah Johnson',
      title: 'Business Executive',
      company: 'Tech Corp',
      quote: 'InvestTrust has completely transformed my investment strategy. The consistent returns and professional management give me confidence in my financial future.',
      rating: 5,
      returns: '23% annual return',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      delay: '0.1s'
    },
    {
      name: 'Michael Chen',
      title: 'Entrepreneur',
      company: 'StartupHub',
      quote: 'The community aspect is incredible. I\'ve not only seen great returns but also made valuable connections that have helped my business grow.',
      rating: 5,
      returns: '19% annual return',
      image: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg',
      delay: '0.2s'
    },
    {
      name: 'Emily Rodriguez',
      title: 'Healthcare Professional',
      company: 'Regional Medical',
      quote: 'What sets InvestTrust apart is their commitment to social impact. It feels good knowing my investments are making a positive difference.',
      rating: 5,
      returns: '21% annual return',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      delay: '0.3s'
    },
    {
      name: 'David Park',
      title: 'Retired Teacher',
      company: 'Education Sector',
      quote: 'After retirement, InvestTrust has provided me with steady income and peace of mind. Their transparent approach is exactly what I was looking for.',
      rating: 5,
      returns: '17% annual return',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      delay: '0.4s'
    },
    {
      name: 'Lisa Thompson',
      title: 'Marketing Director',
      company: 'Creative Agency',
      quote: 'The exclusive investment opportunities have been game-changing. I\'ve accessed deals I never would have found on my own.',
      rating: 5,
      returns: '25% annual return',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      delay: '0.5s'
    },
    {
      name: 'Robert Martinez',
      title: 'Financial Advisor',
      company: 'Wealth Management',
      quote: 'As a financial professional, I appreciate InvestTrust\'s sophisticated approach and consistent performance. Highly recommended.',
      rating: 5,
      returns: '20% annual return',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
      delay: '0.6s'
    }
  ];

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-royal-blue mb-6">
            What Our Members Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from successful investors who have transformed their financial future with InvestTrust.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="animate-on-scroll hover-scale group"
              style={{ animationDelay: testimonial.delay }}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                {/* Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-8 h-8 text-brand-gold" />
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                {/* Returns Badge */}
                <div className="mb-4">
                  <span className="bg-emerald-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {testimonial.returns}
                  </span>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-royal-blue">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.title}</div>
                    <div className="text-sm text-gray-400">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 animate-on-scroll" style={{ animationDelay: '0.8s' }}>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-center text-royal-blue mb-8">
              Trusted by Thousands of Investors
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-green mb-2">99.2%</div>
                <div className="text-gray-600">Member Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-green mb-2">4.9/5</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-green mb-2">5,000+</div>
                <div className="text-gray-600">Active Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-green mb-2">8 Years</div>
                <div className="text-gray-600">Proven Track Record</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;