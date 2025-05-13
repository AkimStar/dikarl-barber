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
  const sectionRef = useRef(null);
  const infoRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const info = infoRef.current;
    const map = mapRef.current;

    if (section && info && map) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(
        section.querySelector('h2'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(
        info,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        map,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8 },
        "-=0.8"
      );
    }

    return () => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(t => t.kill());
      }
    };
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
            className="bg-black/30 backdrop-blur-sm border-0 p-8"
          >
            <div className="space-y-8">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-[#FF5C1B] mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Адрес</h3>
                  <p className="text-gray-300">ул. Константин Фотинов 12, Варна, България</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-[#FF5C1B] mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Телефон</h3>
                  <p className="text-gray-300">(+359) 888 123 456</p>
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
            className="h-[400px] overflow-hidden rounded-xl shadow-xl"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.871033261403!2d27.906738015736547!3d43.20460127913856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a4538f4c9ce6b9%3A0xce6630b262166d59!2sul.%20%22Konstantin%20Fotinov%22%2012%2C%209000%20Varna%20Center%2C%20Varna%2C%20Bulgaria!5e0!3m2!1sen!2sus!4v1656498261001!5m2!1sen!2sus" 
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