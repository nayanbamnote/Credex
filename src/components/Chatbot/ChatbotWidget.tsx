'use client'

import type React from "react"
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [showInitialAnimation, setShowInitialAnimation] = useState(false)

  useEffect(() => {
    // Delay the initial animation to ensure it plays after page load
    const timer = setTimeout(() => {
      setShowInitialAnimation(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[550px] max-h-[70vh] overflow-y-auto border border-neutral-200 dark:border-neutral-800 shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="size-5 text-blue-500" />
              <span>Credex Assistant</span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
            </DialogTitle>
          </DialogHeader>
          <div className="h-[400px] flex items-center justify-center text-muted-foreground">
            Chatbot functionality will be implemented here
          </div>
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 flex justify-end">
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}
                   className="text-xs font-medium relative border-neutral-200 dark:border-white/[0.2] hover:bg-neutral-100 dark:hover:bg-neutral-800/50">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: showInitialAnimation ? [0.8, 1.1, 1] : 1,
          opacity: 1,
        }}
        transition={{
          duration: showInitialAnimation ? 0.5 : 0,
          times: showInitialAnimation ? [0, 0.7, 1] : [0, 0, 1],
        }}
        whileHover={{
          scale: 1.05,
          rotate: isOpen ? 0 : 5,
          boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
        }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-black border border-neutral-200 dark:border-white/[0.2] text-neutral-600 dark:text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-t-full" /> */}
        <span
          className="absolute inset-0 rounded-full animate-ping bg-blue-500/20 opacity-75"
          style={{ animationDuration: "2s" }}
        ></span>
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </motion.div>
      </motion.button>
    </div>
  );
} 