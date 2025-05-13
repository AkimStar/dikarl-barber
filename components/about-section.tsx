"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);

  useEffect(() => {
    countRef.current = 0;
    setCount(0);
    
    const duration = 3000; // 3 seconds (increased from 2)
    const frameDuration = 1000 / 30; // 30fps (reduced from 60 for smoother animation)
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(end * progress);

      if (frame === totalFrames) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(currentCount);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [end]);

  return <>{count}{suffix}</>;
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const stats = statsRef.current;
    const heading = section?.querySelector('h2');

    if (section && stats && heading) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          onEnter: () => setIsVisible(true),
          onLeaveBack: () => setIsVisible(false)
        }
      });

      tl.fromTo(
        heading,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      .fromTo(
        stats.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.4 },
        "-=0.2"
      );
    }

    return () => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(t => t.kill());
      }
    };
  }, []);

  const stats = [
    { value: 10, label: 'години опит', suffix: '+' },
    { value: 3000, label: 'доволни клиенти', suffix: '+' },
    { value: 100, label: 'гаранция за качество', suffix: '%' }
  ];

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="py-24 bg-[#1A1A1D]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          <span className="text-[#FF5C1B]">FADE DISTRICT</span> e твоето място за <span className="text-[#FF5C1B]">САМОУВЕРЕНОСТ</span>
        </h2>
        
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-16 text-lg">
          В нашата модерна бръснарница не просто подстригваме коса. Ние изграждаме стил, самочувствие и общност. 
          Всеки детайл от преживяването е важен - от първото посрещане до последното докосване.
          Нашите бръснари са майстори в своята професия, а тяхната страст е да подчертават най-доброто у всеки клиент.
        </p>
        
        <div 
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className={cn(
                "bg-black/30 backdrop-blur-sm border-0 shadow-xl p-8 text-center transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF5C1B]/10 hover:-translate-y-2",
                index === 1 && "md:-mt-4"
              )}
            >
              <p className="text-[#FF5C1B] text-5xl md:text-6xl font-bold mb-2">
                {isVisible && (
                  <CountUp end={stat.value} suffix={stat.suffix} />
                )}
              </p>
              <p className="text-gray-300 text-lg md:text-xl">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}