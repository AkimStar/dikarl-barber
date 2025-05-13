'use client';
import React from 'react';
import Image from 'next/image';

interface GalleryModalProps {
  isOpen: boolean;
  images: string[];
  selectedIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, images, selectedIndex, onClose, onPrev, onNext }) => {
  if (!isOpen || !images[selectedIndex]) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity animate-fade-in">
      <div className="relative max-w-3xl w-full p-4 flex flex-col items-center justify-center">
        <button
          className="fixed md:absolute z-50 top-6 right-10 md:top-4 md:right-8 text-white text-4xl md:text-3xl font-bold hover:text-[#FF5C1B] transition-colors"
          onClick={onClose}
          aria-label="Затвори"
        >
          &times;
        </button>
        <div className="relative w-full h-[80vh] border-4 border-[#FF5C1B] rounded-lg shadow-lg bg-black">
          {/* Left Arrow */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 text-white bg-black/40 hover:bg-[#FF5C1B]/80 rounded-full w-8 h-8 flex items-center justify-center text-2xl leading-none transition-colors"
            onClick={onPrev}
            aria-label="Предишна снимка"
            tabIndex={0}
            style={{outline: 'none'}}
          >
            &#8592;
          </button>
          {/* Right Arrow */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 text-white bg-black/40 hover:bg-[#FF5C1B]/80 rounded-full w-8 h-8 flex items-center justify-center text-2xl leading-none transition-colors"
            onClick={onNext}
            aria-label="Следваща снимка"
            tabIndex={0}
            style={{outline: 'none'}}
          >
            &#8594;
          </button>
          <Image 
            src={images[selectedIndex]} 
            alt="Галерия" 
            fill
            sizes="100vw"
            priority
            className="object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
