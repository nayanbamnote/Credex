import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  headline?: string
  subheading?: string
  ctaText?: string
  ctaSecondaryText?: string
  ctaHref?: string
  secondaryCtaHref?: string
}

const RetroGrid = () => {
  return (
    <div className="pointer-events-none absolute size-full overflow-hidden [perspective:200px] opacity-50">
      <div className="absolute inset-0 [transform:rotateX(65deg)]">
        <div className="animate-grid [background-image:linear-gradient(to_right,gray_1px,transparent_0),linear-gradient(to_bottom,gray_1px,transparent_0)] [background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,gray_1px,transparent_0),linear-gradient(to_bottom,gray_1px,transparent_0)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" />
    </div>
  )
}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  (
    {
      className,
      title = "Software License Marketplace",
      headline = "Transform Unused Software into Revenue",
      subheading = "Our platform helps businesses buy and sell unused software licenses at competitive prices, saving up to 70% compared to retail prices.",
      ctaText = "Sell My Licenses",
      ctaSecondaryText = "Get a Quote",
      ctaHref = "#sell",
      secondaryCtaHref = "#quote",
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative", className)} ref={ref} {...props}>
        <div className="absolute top-0 z-[0] h-screen w-screen bg-blue-950/10 dark:bg-blue-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(59,130,246,0.3),rgba(255,255,255,0))]" />
        <section className="relative max-w-full mx-auto z-1">
          <RetroGrid />
          <div className="max-w-screen-xl z-10 mx-auto px-4 py-28 gap-12 md:px-8">
            <div className="space-y-5 max-w-3xl leading-0 lg:leading-5 mx-auto text-center">
              <h1 className="text-sm text-gray-600 dark:text-gray-400 group font-medium mx-auto px-5 py-2 bg-gradient-to-tr from-zinc-300/20 via-gray-400/20 to-transparent dark:from-zinc-300/5 dark:via-gray-400/5 border-[2px] border-black/5 dark:border-white/5 rounded-3xl w-fit">
                {title}
                <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
              </h1>
              <h2 className="text-4xl tracking-tighter font-bold bg-clip-text text-transparent mx-auto md:text-6xl bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]">
                {headline.split(' ').map((word, i, arr) => 
                  i === arr.length - 1 ? 
                  <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-300 dark:to-cyan-200">
                    {word}
                  </span> : 
                  <span key={i}>{word} </span>
                )}
              </h2>
              <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                {subheading}
              </p>
              <div className="items-center justify-center gap-x-4 space-y-3 sm:flex sm:space-y-0 pt-4">
                <Button size="lg" className="px-8" asChild>
                  <a href={ctaHref}>{ctaText}</a>
                </Button>
                <Button size="lg" variant="outline" className="px-8" asChild>
                  <a href={secondaryCtaHref}>{ctaSecondaryText}</a>
                </Button>
              </div>
            </div>
            <div className="mt-20 mx-auto max-w-4xl relative z-10">
              <div className="aspect-video w-full shadow-lg rounded-lg border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="size-16 bg-blue-500/10 rounded-full mx-auto flex items-center justify-center">
                    <div className="size-8 bg-blue-500/30 rounded-full flex items-center justify-center">
                      <div className="size-4 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  },
)
Hero.displayName = "Hero"

export { Hero } 