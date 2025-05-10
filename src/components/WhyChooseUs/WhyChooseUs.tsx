"use client";

import { LinesPatternCard, LinesPatternCardBody } from "../ui/card-with-lines-patter";
import { Shield, Clock, Headphones, Award } from "lucide-react";

function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Bank-level security protocols to keep your financial data protected at all times."
    },
    {
      icon: Clock,
      title: "Fast Approvals",
      description: "Get quick decisions on your loan applications with our streamlined process."
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our dedicated team is always available to assist you with any questions or concerns."
    },
    {
      icon: Award,
      title: "Competitive Rates",
      description: "We offer some of the most competitive interest rates in the market."
    }
  ];

  return (
    <section className="py-16 container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're committed to providing exceptional financial services that meet your needs and exceed your expectations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <LinesPatternCard 
            key={index}
            className="h-full transition-all hover:scale-105"
            // patternClassName="bg-[length:20px_20px]"
          >
            <LinesPatternCardBody className="flex flex-col items-center text-center h-full ">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </LinesPatternCardBody>
          </LinesPatternCard>
        ))}
      </div>
    </section>
  );
}

export { WhyChooseUs };
