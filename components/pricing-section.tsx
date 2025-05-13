"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function PricingSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (section && cards) {
      // Reset any existing animations
      gsap.killTweensOf([section.querySelector('h2'), cards.children]);
      
      // Set initial states
      gsap.set(section.querySelector('h2'), { opacity: 0, y: 20 });
      gsap.set(cards.children, { opacity: 0, y: 30 });

      // Create animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(section.querySelector('h2'), {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(cards.children, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.3");
    }

    return () => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(t => t.kill());
      }
    };
  }, []);

  const pricingPlans = [
    {
      title: 'Мъжко подстригване',
      price: '25',
      image: 'https://images.pexels.com/photos/2076932/pexels-photo-2076932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: [
        'Консултация',
        'Fade или класическо',
        'Завършек с продукт',
      ]
    },
    {
      title: 'Подстригване + Брада',
      price: '40',
      image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: [
        'Пълно подстригване',
        'Оформяне на брада',
        'Гореща кърпа',
      ],
      highlighted: true
    },
    {
      title: 'Само брада',
      price: '20',
      image: 'https://images.pexels.com/photos/1319461/pexels-photo-1319461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: [
        'Изравняване',
        'Контури',
        'Кърпа и балсам',
      ]
    },
  ];

  return (
    <section 
      id="pricing"
      ref={sectionRef}
      className="py-24 bg-[#1A1A1D] relative z-10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Цени за всеки <span className="text-[#FF5C1B]">стил и бюджет</span>
        </h2>
        
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index}
              className={cn(
                "group relative bg-black/30 backdrop-blur-sm overflow-hidden border-0 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-[#FF5C1B]/10",
                plan.highlighted && "shadow-lg shadow-[#FF5C1B]/20 border border-[#FF5C1B]/30 md:scale-105 z-10"
              )}
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={plan.image} 
                  alt={plan.title} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>
              </div>
              
              <div className="p-6 relative z-10 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
                
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-lg text-gray-300 ml-1">лв</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <Check className="h-5 w-5 text-[#FF5C1B] mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={cn(
                    "w-full relative overflow-hidden transition-all duration-300",
                    plan.highlighted 
                      ? "bg-[#FF5C1B] hover:bg-[#FF5C1B]/80 text-white" 
                      : "bg-white/10 hover:bg-white/20 text-white"
                  )}
                >
                  <span className="relative z-10">Запази час</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}