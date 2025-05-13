"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ServicesSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (section && cards) {
      gsap.fromTo(
        section.querySelector('h2'),
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(
        cards.children,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.2, 
          duration: 0.8,
          scrollTrigger: {
            trigger: cards,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    return () => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(t => t.kill());
      }
    };
  }, []);

  const services = [
    {
      title: 'Мъжко подстригване (Fade)',
      description: 'Прецизно изпълнен fade с плавен преход, съобразен с формата на главата и предпочитанията ви. Включва измиване, подстригване и стилизиране.',
      image: 'https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      title: 'Оформяне на брада',
      description: 'Професионално оформяне на брадата с прецизно подравняване, дефиниране на контури и използване на специални продукти за поддръжка.',
      image: 'https://images.pexels.com/photos/1319461/pexels-photo-1319461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      title: 'Skin Fade + масаж',
      description: 'Ултра прецизен skin fade до кожа, съчетан с релаксиращ масаж на скалпа. Завършваме със стилизиране според предпочитанията ви.',
      image: 'https://images.pexels.com/photos/897262/pexels-photo-897262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      title: 'Класическо бръснене с гореща кърпа',
      description: 'Традиционно бръснене с прецизно заточен бръснач, включващо гореща кърпа за отваряне на порите и завършващо с охлаждащ балсам.',
      image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  return (
    <section 
      id="services"
      ref={sectionRef}
      className="py-24 bg-[#0E0E10]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Премиум услуги за <span className="text-[#FF5C1B]">модерния джентълмен</span>
        </h2>
        
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <Card 
              key={index}
              className="relative h-[300px] overflow-hidden group border-0 rounded-xl shadow-lg"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />
              
              {/* Content Container */}
              <div className="absolute bottom-0 left-0 p-6 w-full transition-all duration-500 ease-out">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:mb-4 transition-all duration-300">
                  {service.title}
                </h3>
                
                {/* Description - Hidden by default, shown on hover */}
                <p className="text-gray-300 opacity-0 max-h-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:max-h-[200px] group-hover:mt-2">
                  {service.description}
                </p>
                
                <div className="h-1 w-0 bg-[#FF5C1B] mt-2 transition-all duration-500 group-hover:w-20" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}