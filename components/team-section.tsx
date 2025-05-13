"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function TeamSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    const text = textRef.current;

    if (section && cards && text) {
      const titleElement = section.querySelector('h2');
      if (!titleElement) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(
        titleElement,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(
        cards.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.3, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        text.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.6 },
        "-=0.4"
      );
    }

    return () => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(t => t.kill());
      }
    };
  }, []);

  const team = [
    {
      name: 'Даниел',
      position: 'Senior Бръснар',
      image: '/barber1.png',
      specialties: ['Fade майстор', 'Стилист брада', 'Класически стилове'],
      social: {
        facebook: 'https://facebook.com/ivan.ivanov',
        instagram: 'https://instagram.com/ivan.barber'
      }
    },
    {
      name: 'Божидар',
      position: 'Бръснар',
      image: '/barber2.png',
      specialties: ['Skin Fade', 'Модерни прически', 'Хот тауел шейвинг'],
      social: {
        facebook: 'https://facebook.com/kalin.bochev',
        instagram: 'https://instagram.com/kalin.barber'
      }
    },
  ];

  return (
    <section 
      id="team"
      ref={sectionRef}
      className="py-24 bg-[#0E0E10]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Нашите <span className="text-[#FF5C1B]">бръснари</span>
        </h2>
        
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12"
        >
          {team.map((member, index) => (
            <Card 
              key={index}
              className="bg-black/30 backdrop-blur-sm border-0 shadow-xl overflow-hidden relative group"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                <p className="text-[#FF5C1B] font-medium mb-2">{member.position}</p>
                
                <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  {member.specialties.map((specialty, idx) => (
                    <span 
                      key={idx} 
                      className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white/90"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-3">
                  <Button className="bg-[#FF5C1B] hover:bg-[#FF5C1B]/80 text-white hidden group-hover:block">
                    Запази час
                  </Button>
                  <div className="hidden group-hover:flex gap-3">
                    <a 
                      href={member.social.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF5C1B] transition-colors duration-300"
                    >
                      <Facebook className="h-4 w-4 text-white" />
                    </a>
                    <a 
                      href={member.social.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF5C1B] transition-colors duration-300"
                    >
                      <Instagram className="h-4 w-4 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div ref={textRef} className="max-w-3xl mx-auto text-center">
          <p className="text-gray-300 text-lg mb-8">
            Нашите бръснари не просто подстригват коса - те създават произведения на изкуството. 
            С многогодишен опит, постоянно обучение и истинска страст към фризьорството, 
            те ще ви помогнат да откриете вашия идеален стил.
          </p>
          
          <div className="flex justify-center gap-4 mb-2">
            <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-white/20">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-white/20">
              <Instagram className="h-5 w-5" />
            </Button>
          </div>
          
          <p className="text-sm text-gray-400">Следвайте ни в социалните мрежи за последни трендове и промоции</p>
        </div>
      </div>
    </section>
  );
}