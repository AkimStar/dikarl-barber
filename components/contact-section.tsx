"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const info = infoRef.current;
    const map = mapRef.current;

    if (!section || !info || !map) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelector('h2');
      if (!heading) return;

      gsap.set([heading, info, map], { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(heading, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(info, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3")
      .to(map, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3");
    }, section);

    return () => ctx.revert();
  }, []);

  const workingHours = [
    { day: 'Пон-Пет', hours: '10:00 - 19:00' },
    { day: 'Събота', hours: '10:00 - 16:00' },
    { day: 'Неделя', hours: 'Почивен ден' },
  ];

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="py-24 bg-[#0E0E10]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Свържи се с <span className="text-[#FF5C1B]">нас</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <Card 
            ref={infoRef}
            className="bg-black/30 backdrop-blur-sm border-0 p-8 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF5C1B]/10 hover:-translate-y-1"
          >
            <div className="space-y-8">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-[#FF5C1B] mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Адрес</h3>
                  <p className="text-gray-300">ул. „Славянска“ 6, 7500 Силистра</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-[#FF5C1B] mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Телефон</h3>
                  <p className="text-gray-300">(+359) 898 589 296</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-6 w-6 text-[#FF5C1B] mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Работно време</h3>
                  <ul className="space-y-2 text-gray-300">
                    {workingHours.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.day}:</span>
                        <span>{item.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Button className="w-full bg-[#FF5C1B] hover:bg-[#FF5C1B]/80 text-white py-6">
                Запази час
              </Button>
            </div>
          </Card>
          
          <div 
            ref={mapRef}
            className="h-[400px] overflow-hidden rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF5C1B]/10 hover:-translate-y-1"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2864.4077597293285!2d27.257692277379782!3d44.116210922360096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b01f456b1aa931%3A0xf76e7af5bc38c444!2sDikarl%20Barbershop!5e0!3m2!1sbg!2sbg!4v1747140606331!5m2!1sbg!2sbg" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}