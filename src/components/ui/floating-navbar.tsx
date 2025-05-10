"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const FloatingNav = ({
  navItems,
  className,
  showLogo = true,
  showThemeToggle = true,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
  showLogo?: boolean;
  showThemeToggle?: boolean;
}) => {
  const { scrollYProgress } = useScroll();

  // Start with visible true for initial rendering
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      
      // Get current scroll position in pixels
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Always visible for first 100vh
      if (scrollY < windowHeight) {
        setVisible(true);
      } else {
        // After 100vh, show when scrolling up, hide when scrolling down
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0, // Start visible at y=0
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex fixed top-4 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-4 py-2 items-center justify-between max-w-2xl w-fit",
          className
        )}
      >
        {showLogo && (
          <div className="flex items-center gap-2 font-bold mr-3">
            <div className="size-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">C</div>
            <span className="text-sm">Credex</span>
          </div>
        )}
        
        <div className="flex items-center justify-center space-x-3">
          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 px-2"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="text-xs sm:text-sm">{navItem.name}</span>
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-2 ml-3">
          {showThemeToggle && <ThemeToggle />}
          <button className="border text-xs font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-3 py-1.5 rounded-full">
            <span>Login</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
