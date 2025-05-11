"use client";

import { LinesPatternCard, LinesPatternCardBody } from "../ui/card-with-lines-patter";
import { ShieldCheck, DollarSign, Globe, MessageCircle } from 'lucide-react'

function WhyChooseUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Authenticity",
      description: "All software licenses are thoroughly vetted to guarantee legitimacy and avoid fraud."
    },
    {
      icon: DollarSign,
      title: "Maximum Returns",
      description: "We offer top market prices for your unused or surplus licenses—get what you deserve."
    },
    {
      icon: Globe,
      title: "Eco–Friendly Recycling",
      description: "Extend the lifecycle of software and reduce digital waste by passing licenses on."
    },
    {
      icon: MessageCircle,
      title: "Expert Guidance",
      description: "Our specialists help you navigate licensing terms and optimize resale value."
    }
  ]

  return (
    <section className="">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Why Choose Us</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          We're committed to providing exceptional financial services that meet your needs and exceed your expectations.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <LinesPatternCard 
            key={index}
            className="h-full transition-all hover:scale-105 w-full md:w-[calc(50%-12px)]"
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
