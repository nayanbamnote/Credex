// HowItWorks.tsx or data/steps.ts
import { Step } from './types';

export const steps: Step[] = [
  {
    id: 1,
    title: "Upload License",
    subtitle:
      "Quickly submit your unused or surplus software licenses through our intuitive upload interface.",
    description: [
      "Select your license file (e.g., PDF, DOC)",
      "Provide license key and purchase details",
      "Review and confirm submission"
    ],
    image: "/icons/upload-license.svg",          // replace with your real asset
    imageAlt: "Upload license illustration",
  },
  {
    id: 2,
    title: "Get Valuation",
    subtitle:
      "Our AI-driven engine instantly assesses your license’s market value and presents you with a competitive quote.",
    description: [
      "Automated price estimation",
      "Transparent fee breakdown",
      "Option to accept or negotiate"
    ],
    image: "/icons/valuation.svg",
    imageAlt: "Valuation chart illustration",
  },
  {
    id: 3,
    title: "Get Paid",
    subtitle:
      "Once you approve the quote, pick your payment method and receive funds securely within 24–48 hours.",
    description: [
      "Choose bank transfer, PayPal, or other methods",
      "Instant payment notification",
      "Secure, encrypted transactions"
    ],
    image: "/icons/get-paid.svg",
    imageAlt: "Payment illustration",
  },
];
