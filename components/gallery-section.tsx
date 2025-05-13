'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GalleryModal } from './gallery-modal';

export const GallerySection = () => {
  // Fade-in animation (Tailwind + custom)
  // Add this to globals.css if not present:
  // @keyframes fade-in { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
  // .animate-fade-in { animation: fade-in 0.7s cubic-bezier(0.4,0,0.2,1) both; }

  // Placeholder images; replace src with your URLs later
  const images = [
    '/1.jpg',
    '/2.jpg',
    '/3.jpg',
    '/4.jpg',
    '/5.jpg',
    '/6.jpg',
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const grid = gridRef.current;
    if (!section || !heading || !subheading || !grid) return;

    gsap.set([heading, subheading], { opacity: 0, y: 40 });
    gsap.set(grid.children, { opacity: 0, y: 60 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
    tl.to(heading, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
      .to(subheading, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .to(grid.children, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
      }, '-=0.2');

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleImageClick = (idx: number) => {
    setSelectedIndex(idx);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section id="gallery" className="py-16 px-4 md:px-8 bg-[#18181B]" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-2 text-center tracking-wide font-sans" style={{ color: '#FF5C1B' }}>Галерия</h2>
        <p ref={subheadingRef} className="text-lg md:text-xl text-center mb-8 text-gray-300 font-sans">Разгледайте атмосферата в салона ни. Кликнете върху снимка за уголемяване.</p>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">

          {images.map((src, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-xl shadow-2xl cursor-pointer group transform transition-all duration-500 hover:scale-105 hover:shadow-orange-400/60 hover:z-10 bg-[#23232a]"
              onClick={() => handleImageClick(idx)}
            >
              <div className="relative w-full aspect-[4/3] md:aspect-[4/3] min-h-[320px] md:min-h-[400px]">
                <Image
                  src={src}
                  alt={`Галерия изображение ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={idx < 3}
                  className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110 group-hover:blur-[1px] group-hover:opacity-80"
                  style={{ boxShadow: '0 8px 32px 0 rgba(255,92,27,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.20)' }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="text-white text-xl font-semibold bg-[#ff5c1b]/80 px-4 py-2 rounded-lg shadow-lg">Уголеми снимката</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <GalleryModal 
          isOpen={modalOpen}
          images={images}
          selectedIndex={selectedIndex}
          onClose={handleCloseModal}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </section>
  );
};
