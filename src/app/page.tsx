import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-border">
        <div className=" flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold">
            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">C</div>
            <span>Credex</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-sm font-medium hover:underline underline-offset-4">Features</a>
            <a href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">Testimonials</a>
            <a href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">Pricing</a>
            <a href="#contact" className="text-sm font-medium hover:underline underline-offset-4">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                Modern Solution for Your <span className="text-primary">Digital Needs</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-[700px] mx-auto">
                Streamline your workflow with our intuitive platform designed to enhance productivity and simplify complex tasks.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">Learn More</Button>
            </div>
            <div className="relative w-full max-w-5xl aspect-video rounded-lg overflow-hidden border shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg">
                  <p className="font-medium">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className=" px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter">Key Features</h2>
            <p className="text-muted-foreground mt-2">Discover what makes our platform stand out</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Intuitive Design",
                description: "User-friendly interface that simplifies complex operations and enhances productivity."
              },
              {
                title: "Advanced Analytics",
                description: "Gain valuable insights with our comprehensive data analysis and visualization tools."
              },
              {
                title: "Secure Platform",
                description: "Enterprise-grade security ensuring your data remains protected at all times."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border shadow-sm">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <div className="size-6 rounded-full bg-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className=" flex flex-col md:flex-row justify-between items-center py-8 px-4 md:px-6">
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
