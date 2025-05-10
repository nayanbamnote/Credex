import type { Step } from "./types"

// Sample data - replace with your actual content
const steps: Step[] = [
  {
    id: 1,
    title: "Discover",
    subtitle:
      "Begin your journey by exploring our platform's features and capabilities. Our intuitive interface makes it easy to find exactly what you need, when you need it, without any unnecessary complexity.",
    description: ["Explore our extensive catalog", "Filter by your preferences", "Get personalized recommendations"],
    image: "/placeholder.svg?height=600&width=500",
    imageAlt: "Discovery process illustration",
  },
  {
    id: 2,
    title: "Connect",
    subtitle:
      "Establish meaningful connections with service providers and experts in your field. Our secure communication channels ensure that your conversations remain private while our scheduling tools make coordination effortless.",
    description: ["Instant messaging with providers", "Schedule appointments easily", "Secure communication channels"],
    image: "/placeholder.svg?height=600&width=500",
    imageAlt: "Connection process illustration",
  },
  {
    id: 3,
    title: "Succeed",
    subtitle:
      "Achieve your goals with our comprehensive support system. We provide detailed analytics, progress tracking, and personalized guidance to ensure you reach your objectives efficiently and effectively.",
    description: ["Track your progress", "Get support when needed", "Celebrate your achievements"],
    image: "/placeholder.svg?height=600&width=500",
    imageAlt: "Success process illustration",
  },
]

export { steps }
