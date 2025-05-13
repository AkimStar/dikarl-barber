"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const navLinks = [
    { href: '#', label: 'Начало', onClick: handleScrollToTop },
    { href: '#about', label: 'За нас' },
    { href: '#services', label: 'Услуги' },
    { href: '#why-us', label: 'Как работим' },
    { href: '#team', label: 'Екип' },
    { href: '#pricing', label: 'Цени' },
    { href: '#contact', label: 'Контакти' },
  ];

  return (
    <header className={cn(
      'fixed top-0 w-full z-50 transition-all duration-300',
      scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center transition-transform duration-300 hover:scale-105"
            onClick={handleScrollToTop}
          >
            <span className="text-xl font-bold tracking-wider">
              <span className="text-[#FF5C1B]">FADE</span> DISTRICT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={link.onClick}
                className="relative text-white/80 hover:text-white transition-colors duration-300 py-2 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF5C1B] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <Button 
              className="bg-[#FF5C1B] hover:bg-[#FF5C1B]/80 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#FF5C1B]/20"
            >
              Запази час
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none transition-transform duration-300 hover:scale-110"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Fixed background with glassmorphism */}
          <div className="fixed inset-0 z-40 glass-dark md:hidden" />
          
          {/* Content */}
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="flex flex-col h-full pt-20 p-6">
              <nav className="flex flex-col space-y-6 items-center justify-center flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={link.onClick || (() => setIsOpen(false))}
                    className="text-2xl font-medium text-white relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#FF5C1B] transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
                <Button 
                  className="bg-[#FF5C1B] hover:bg-[#FF5C1B]/80 text-white mt-8 px-8 py-6 text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF5C1B]/20"
                  onClick={() => setIsOpen(false)}
                >
                  Запази час
                </Button>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
}