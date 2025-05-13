"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const accordion = accordionRef.current;

    if (section && image && accordion) {
      const ctx = gsap.context(() => {
        const heading = section.querySelector('h2');
        if (!heading) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        });

        tl.fromTo(
          heading,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 }
        )
        .fromTo(
          image,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          accordion.children,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, stagger: 0.2, duration: 0.6 },
          "-=0.6"
        );
      }, section);

      return () => ctx.revert();
    }
  }, []);

  const reasons = [
    {
      title: 'Висококачествени продукти',
      content: 'Използваме само най-добрите продукти за коса и брада. Нашите инструменти са професионални и винаги в отлично състояние.'
    },
    {
      title: 'Професионални бръснари',
      content: 'Нашите бръснари имат международни сертификати и редовно актуализират своите умения с последните трендове и техники.'
    },
    {
      title: 'Модерен интериор',
      content: 'Създадохме атмосфера, която съчетава класиката на традиционните бръснарници с модерен дизайн и комфорт.'
    },
    {
      title: 'Персонално отношение',
      content: 'Всеки клиент е специален. Отделяме време да разберем вашите предпочитания и да ви предложим най-подходящите решения.'
    },
  ];

  return (
    <section 
      id="why-us"
      ref={sectionRef}
      className="py-24 bg-[#1A1A1D]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Защо да избереш <span className="text-[#FF5C1B]">DIKARL BARBERSHOP</span>?
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div 
            ref={imageRef} 
            className="relative overflow-hidden rounded-xl group"
          >
            <img 
              src="https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Професионални бръснарски услуги" 
              className="rounded-xl shadow-xl w-full object-cover object-center h-[400px] lg:h-[500px] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl transition-opacity duration-300 group-hover:opacity-40"></div>
          </div>
          
          <div ref={accordionRef}>
            <Accordion type="single" collapsible className="w-full">
              {reasons.map((reason, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-white/10 py-2"
                >
                  <AccordionTrigger className="text-xl font-medium hover:text-[#FF5C1B] transition-colors">
                    {reason.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    {reason.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}