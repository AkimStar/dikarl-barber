"use client";

import Link from 'next/link';

export function Footer() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <footer className="bg-[#0A0A0B] py-16 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Brand */}
          <div className="space-y-4">
            <Link 
              href="/" 
              className="flex items-center"
              onClick={handleScrollToTop}
            >
              <span className="text-xl font-bold tracking-wider">
                <span className="text-[#FF5C1B]">FADE</span> DISTRICT
              </span>
            </Link>
            <p className="text-gray-400 max-w-xs">
              Премиум бръснарница за мъже, които ценят професионализма, качеството и добрия стил.
            </p>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    onClick={link.onClick}
                    className="text-gray-400 hover:text-[#FF5C1B] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакти</h3>
            <ul className="space-y-3 text-gray-400">
              <li>ул. Константин Фотинов 12, Варна</li>
              <li>(+359) 888 123 456</li>
              <li>hello@fadedistrict.bg</li>
            </ul>
            <button className="mt-6 text-[#FF5C1B] border border-[#FF5C1B]/30 rounded-md px-4 py-2 hover:bg-[#FF5C1B]/10 transition-colors">
              Свържи се с нас
            </button>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Fade District. Всички права запазени.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-[#FF5C1B] transition-colors">
              Условия за ползване
            </Link>
            <Link href="#" className="text-gray-400 hover:text-[#FF5C1B] transition-colors">
              Политика за поверителност
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}