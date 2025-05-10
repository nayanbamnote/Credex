import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Hero } from "@/components/HeroSection/Hero";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import  HowItWorks  from "@/components/HowItWorks/HowItWorks";
import { WhyChooseUs } from "@/components/WhyChooseUs/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import ContactUs from "@/components/ContactUs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main className="flex-1 ">
        <Hero 
          title="Software License Marketplace"
          headline="Transform Unused Software into Revenue"
          subheading="Our platform helps businesses buy and sell unused software licenses at competitive prices, saving up to 70% compared to retail prices."
          ctaText="Sell My Licenses"
          ctaSecondaryText="Get a Quote"
        />

        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <ContactUs />
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center py-8 px-4 md:px-6 max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 font-bold mb-4 md:mb-0">
            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">C</div>
            <span>Credex</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 Credex. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
