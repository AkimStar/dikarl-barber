"use client";

import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';

export function HeroSection() {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const text = textRef.current;

    if (hero && text) {
      gsap.fromTo(text.children, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')",
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-[#0E0E10]/30 to-transparent z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20" ref={textRef}>
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Стилът не е <span className="text-[#FF5C1B]">случайност</span> — <br />
            той започва от <span className="text-[#FF5C1B]">прическата.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Премиум грижа за истинския мъж в сърцето на Варна.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button className="bg-[#FF5C1B] hover:bg-[#FF5C1B]/80 text-white px-8 py-6 text-lg">
              Запази час
            </Button>
            
            <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white px-6 py-6 text-lg">
              За нас
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}