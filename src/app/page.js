import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import PositiveThought from "@/components/landing/PositiveThought";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Resources from "@/components/landing/Resources";
import EmergencyBanner from "@/components/landing/EmergencyBanner";
import Testimonials from "@/components/landing/Testimonials";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <PositiveThought />
      <Features />
      <HowItWorks />
      <Resources />
      <EmergencyBanner />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}