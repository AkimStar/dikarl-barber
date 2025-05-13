import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { ServicesSection } from '@/components/services-section';
import { WhyChooseUsSection } from '@/components/why-choose-us-section';
import { TeamSection } from '@/components/team-section';
import { GallerySection } from '@/components/gallery-section';
import { PricingSection } from '@/components/pricing-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0E0E10] text-white">
      <div className="fixed inset-0 noise pointer-events-none z-50" />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <GallerySection />
      <TeamSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </main>
  );
}