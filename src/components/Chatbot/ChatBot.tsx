'use client'
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { marked } from 'marked';
import { SendIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessage {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface CacheObject {
  name: string;
  created: boolean;
}

const MODEL_NAME = 'gemini-1.5-flash';
const MAX_CONTEXT_LENGTH = 15; // Maximum number of messages to keep in context

// System prompt with comprehensive information about SoftSell
const SYSTEM_PROMPT = `You are SoftSell's virtual assistant, an expert in software license resale. Your goal is to provide helpful, accurate, and comprehensive information ONLY about SoftSell's services.

ABOUT SOFTSELL:
- SoftSell is a platform that enables users to resell their unused or surplus software licenses.
- We verify license authenticity, handle the transfer process, and ensure secure payments.
- We support resale of various software types including design tools, development tools, business software, and more.

KEY SERVICES:
1. License Verification: All licenses undergo thorough vetting to guarantee legitimacy.
2. Market Value Assessment: Our AI-driven valuation engine assesses current market value.
3. Secure Transfer: We handle the transfer process according to each software's terms.
4. Fast Payment: Payments are processed within 24-48 hours after a successful sale.

COMMISSION STRUCTURE:
- Standard rate: 15% of the final sale price
- Premium sellers (10+ transactions): 12%
- Enterprise program: Custom rates available

SELLING PROCESS:
1. Upload License: Submit details through our platform
2. Get Valuation: Our AI system assesses market value
3. Accept Quote: Review and approve our offer
4. Get Paid: Choose payment method and receive funds within 24-48 hours

SUPPORTED SOFTWARE TYPES:
- Design tools (Adobe, Sketch, Figma, etc.)
- Development tools and IDEs
- Business software and productivity suites
- Creative applications
- Enterprise applications

IMPORTANT INSTRUCTIONS:
1. ONLY answer questions related to SoftSell, software license resale, verification, pricing, and payment processes.
2. If asked about unrelated topics (politics, entertainment, personal questions, etc.), politely redirect by saying: "I'm SoftSell's assistant, so I can only provide information about software license resale and our services. Would you like to know more about how to sell a license, our verification process, or something else related to SoftSell?"
3. DO NOT generate responses about topics unrelated to SoftSell even if asked multiple times.
4. Stay factual and only use the information provided above. If you don't know specific details, say: "I don't have that specific information about SoftSell's services. Please contact support@softsell.com for more details."
5. Maintain a professional but friendly tone at all times.

Your ONLY purpose is to provide information about SoftSell's services and redirect any unrelated questions.`;

const EXAMPLE_QUESTIONS = [
  'How do I sell my license?',
  'What types of software can I resell?', 
  'How does your verification process work?',
  'What\'s your commission rate?',
  'How fast do I get paid?'
];

const responses: Record<string, string> = {
  'How do I sell my license?':
    'Selling your software license with SoftSell is simple with our 3-step process:\n\n' +
    '1. Upload License - Submit your unused or surplus software license through our intuitive interface\n' +
    '2. Get Valuation - Our AI-driven engine instantly assesses your license\'s market value\n' +
    '3. Get Paid - Choose your payment method and receive funds securely within 24-48 hours\n\n' +
    'Ready to start? Click the "Sell My Licenses" button at the top of the page!',

  'What types of software can I resell?':
    'At SoftSell, we support resale of various software categories including:\n\n' +
    '- Design tools (Adobe, Sketch, Figma, etc.)\n' +
    '- Development tools and IDEs\n' +
    '- Business software and productivity suites\n' +
    '- Creative applications\n' +
    '- Enterprise applications\n\n' +
    'Our platform handles both perpetual licenses and subscription-based software. Note that some software licenses are non-transferable by the publisher\'s terms. Our verification system will check eligibility during the upload process.',

  'How does pricing work?':
    'SoftSell offers maximum returns for your unused licenses. Our pricing is determined by:\n\n' +
    '- Our AI-driven valuation engine that assesses current market value\n' +
    '- Transparent fee breakdown with no hidden charges\n' +
    '- Option to accept our competitive quote or negotiate\n\n' +
    'We pride ourselves on offering top market prices for your software assets—you get what you deserve.',

  'What\'s your commission rate?':
    'SoftSell\'s commission structure is straightforward and industry-leading:\n\n' +
    '- Standard rate: 15% of the final sale price\n' +
    '- Premium sellers: 12% (for those with 10+ successful transactions)\n' +
    '- Enterprise program: Custom rates available\n\n' +
    'There are no hidden fees or charges - just the commission on successful sales. This allows us to maintain our verification process and expert guidance services.',

  'How do you verify licenses?':
    'License verification is a cornerstone of SoftSell\'s service:\n\n' +
    '- All software licenses undergo thorough vetting to guarantee legitimacy\n' +
    '- Our advanced verification system checks against vendor databases\n' +
    '- Multiple validation points ensure compliance with resale terms\n' +
    '- Expert review by our specialists for complex license agreements\n\n' +
    'This comprehensive approach protects both sellers and buyers from potential fraud.',

  'How long does payment take?':
    'At SoftSell, we prioritize fast, secure payments:\n\n' +
    '- Once you approve our quote, you can select your preferred payment method\n' +
    '- Funds are securely transferred within 24-48 hours\n' +
    '- Payment options include bank transfers, PayPal, and other popular methods\n' +
    '- You\'ll receive instant payment notifications\n\n' +
    'All transactions are securely encrypted to ensure your financial information stays protected.',

  'Why choose SoftSell?':
    'SoftSell stands out from other resale platforms for several key reasons:\n\n' +
    '- Verified Authenticity: All licenses are thoroughly vetted to guarantee legitimacy\n' +
    '- Maximum Returns: We offer top market prices for your unused or surplus licenses\n' +
    '- Eco-Friendly Recycling: Extend software lifecycle and reduce digital waste\n' +
    '- Expert Guidance: Our specialists help navigate licensing terms and optimize resale value\n\n' +
    'We\'ve built a platform that prioritizes transparency, security, and maximum value for our users.',

  'How do I contact support?':
    'Need to get in touch with our team? There are several ways to reach SoftSell support:\n\n' +
    '- Fill out the contact form at the bottom of this page\n' +
    '- Email us directly at support@softsell.com\n' +
    '- Use the live chat feature during business hours (9am-5pm EST)\n\n' +
    'Our team is ready to assist with any questions about license eligibility, the selling process, or payment details.',

  'default':
    'I\'m SoftSell\'s assistant, focused on helping with software license resale questions. I can answer questions about our selling process, verification methods, pricing, and payments.\n\nFor this topic, please contact our support team at support@softsell.com or try one of the example questions below. You can also fill out the contact form at the bottom of this page for personalized assistance.',
};

const ChatBot = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      content: "👋 Hi there! I'm SoftSell's virtual assistant, focused exclusively on software license resale. I can answer your questions about selling licenses, our verification process, pricing, and payments. Please note that I'm only able to provide information about SoftSell's services. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [contextCache, setContextCache] = useState<CacheObject | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const userInputRef = useRef<HTMLTextAreaElement>(null);
  const generativeClient = useRef<GoogleGenerativeAI | null>(null);
  const modelRef = useRef<any>(null);
  const chatRef = useRef<any>(null);

  // Check if on mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    initializeGenerativeAI();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const initializeGenerativeAI = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        console.error("API Key not found in environment variables.");
        return;
      }
      
      generativeClient.current = new GoogleGenerativeAI(apiKey);
      modelRef.current = generativeClient.current.getGenerativeModel({ 
        model: MODEL_NAME,
        systemInstruction: SYSTEM_PROMPT, 
      });
      
      // Initialize chat session
      resetChatSession();
    } catch (error: any) {
      console.error("Failed to initialize Generative AI:", error);
    }
  };

  const resetChatSession = () => {
    if (!modelRef.current) return;
    
    // Create a new chat session
    chatRef.current = modelRef.current.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "I want to learn about selling software licenses" }],
        },
        {
          role: "model",
          parts: [{ text: "Hello! I'd be happy to tell you about selling software licenses through SoftSell. We're a platform that specializes in the resale of unused or surplus software licenses. What specific aspect of our service would you like to know more about? I can provide information about our verification process, pricing structure, supported software types, or the general selling process." }],
        },
        {
          role: "user",
          parts: [{ text: "What's the weather like today?" }],
        },
        {
          role: "model",
          parts: [{ text: "I'm SoftSell's assistant, so I can only provide information about software license resale and our services. Would you like to know more about how to sell a license, our verification process, or something else related to SoftSell?" }],
        },
        {
          role: "user",
          parts: [{ text: "Tell me about your commission rates" }],
        },
        {
          role: "model",
          parts: [{ text: "SoftSell's commission structure is straightforward and industry-leading:\n\n- Standard rate: 15% of the final sale price\n- Premium sellers: 12% (for those with 10+ successful transactions)\n- Enterprise program: Custom rates available\n\nThere are no hidden fees or charges - just the commission on successful sales. This allows us to maintain our verification process and expert guidance services." }],
        },
      ],
    });
  };

  const sendMessage = async () => {
    const message = userInput.trim();
    if (!message) return;

    // Add user message to chat history first
    const newUserMessage: ChatMessage = { 
      content: message, 
      isUser: true, 
      timestamp: new Date() 
    };
    setChatHistory(prev => [...prev, newUserMessage]);
    
    // Clear the input field
    setUserInput('');
    
    // Show typing indicator
    setIsTyping(true);

    try {
      if (!generativeClient.current || !modelRef.current || !chatRef.current) {
        throw new Error("Generative AI not initialized");
      }

      // Get response from AI
      const result = await chatRef.current.sendMessageStream(message);
      
      let fullResponse = "";
      
      // Process stream chunks
      for await (const chunk of result.stream) {
        const chunkText = chunk.text ? chunk.text() : "";
        fullResponse += chunkText;
        
        // Update the bot's response as chunks come in
        setChatHistory(prev => {
          const lastMessage = prev[prev.length - 1];
          
          // If the last message is from the bot, update it
          if (!lastMessage.isUser) {
            const updatedHistory = [...prev];
            updatedHistory[prev.length - 1] = { 
              ...lastMessage, 
              content: formatMessage(fullResponse)
            };
            return updatedHistory;
          } 
          // Otherwise, add a new bot message
          else {
            return [
              ...prev, 
              { 
                content: formatMessage(fullResponse), 
                isUser: false, 
                timestamp: new Date() 
              }
            ];
          }
        });
      }
      
      // Manage context window
      if (chatHistory.length > MAX_CONTEXT_LENGTH) {
        setChatHistory(prev => [...prev.slice(prev.length - MAX_CONTEXT_LENGTH)]);
      }
      
      setIsTyping(false);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setIsTyping(false);
      setChatHistory(prev => [
        ...prev, 
        { 
          content: "I'm sorry, I encountered an error processing your request. Please try again later.", 
          isUser: false, 
          timestamp: new Date() 
        }
      ]);
      
      // Reset chat session on error to maintain stability
      resetChatSession();
    }
  };

  const formatMessage = (content: string): string => {
    return marked(content);
  };

  const formatMessageForMobile = (content: string): string => {
    // Process with marked first
    let htmlContent = marked(content);
    
    // Make tables responsive
    htmlContent = htmlContent.replace(
      /<table>/g, 
      '<div class="overflow-x-auto w-full"><table class="w-full text-left border-collapse" style="max-width: 100%">'
    ).replace(
      /<\/table>/g, 
      '</table></div>'
    );
    
    // Add different classes based on viewport size
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
    
    // Add additional classes to elements for better mobile display
    htmlContent = htmlContent
      .replace(/<pre>/g, `<pre class="overflow-x-auto p-1 ${isMobile ? 'text-2xs' : 'text-xs'} bg-black/30 rounded my-1" style="max-width: 100%;">`)
      .replace(/<code>/g, `<code class="font-mono ${isMobile ? 'text-2xs' : 'text-xs'}" style="word-break: break-word;">`)
      .replace(/<li>/g, '<li class="ml-3 mb-0.5" style="word-break: break-word;">')
      .replace(/<ul>/g, '<ul class="my-1 pl-1">')
      .replace(/<ol>/g, '<ol class="my-1 pl-1">')
      .replace(/<h[1-6]>/g, (match) => `${match.slice(0, -1)} class="font-bold my-1 text-xs sm:text-sm">`)
      .replace(/<p>/g, '<p class="my-1" style="word-break: break-word;">')
      .replace(/<a\s/g, '<a class="text-blue-400 underline" style="word-break: break-all;" ');
    
    return htmlContent;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
  };

  const handleSendButtonClick = () => {
    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuestionClick = (question: string) => {
    setUserInput(question);
    sendMessage();
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div 
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 bg-background/90"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--muted) transparent' }}
      >
        {chatHistory.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] gap-1 sm:gap-2 ${msg.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
              {!msg.isUser && (
                <div className="flex-shrink-0 mt-1">
                  <Avatar className="h-6 w-6 sm:h-8 sm:w-8 bg-primary">
                    <AvatarFallback className="text-xs text-primary-foreground">
                      🤖
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
              
              <div 
                className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm ${
                  msg.isUser 
                    ? 'bg-primary text-primary-foreground rounded-tr-none' 
                    : 'bg-muted text-foreground rounded-tl-none'
                }`}
                style={{ 
                  wordBreak: 'break-word', 
                  maxWidth: '95%',
                  width: 'auto'
                }}
              >
                <div 
                  className="prose-xs sm:prose-sm max-w-full break-words text-current"
                  style={{ 
                    lineHeight: '1.4',
                    wordBreak: 'break-word'
                  }}
                  dangerouslySetInnerHTML={{ __html: formatMessageForMobile(msg.content) }}
                />
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex max-w-[90%] sm:max-w-[85%] gap-1 sm:gap-2">
              <div className="flex-shrink-0 mt-1">
                <Avatar className="h-6 w-6 sm:h-8 sm:w-8 bg-primary">
                  <AvatarFallback className="text-xs text-primary-foreground">🤖</AvatarFallback>
                </Avatar>
              </div>
              <div className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm bg-muted text-foreground rounded-tl-none flex items-center">
                <div className="flex space-x-1">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-muted-foreground animate-pulse delay-0"></div>
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-muted-foreground animate-pulse delay-150"></div>
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-muted-foreground animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="px-2 sm:px-4 py-2 sm:py-3 bg-background/95">
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center px-1">
            <h3 className="text-2xs sm:text-xs font-medium text-muted-foreground">Suggested Questions</h3>
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {EXAMPLE_QUESTIONS.map((question, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                className="h-6 sm:h-7 px-2 sm:px-3 text-2xs sm:text-xs rounded-full bg-muted hover:bg-muted/80 text-muted-foreground border-border"
                onClick={() => handleQuestionClick(question)}
              >
                {isMobile ? 
                  (question.length > 15 ? question.substring(0, 15) + '...' : question) : 
                  question}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-2 sm:p-3 bg-background/95 border-t border-border">
        <form 
          className="flex w-full items-end gap-1 sm:gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <Textarea
            ref={userInputRef}
            placeholder="Type your message..."
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="min-h-8 sm:min-h-10 rounded-xl resize-none bg-muted border-border text-foreground focus-visible:ring-primary/30 placeholder:text-muted-foreground text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2"
          />
          <Button 
            type="submit"
            size="icon" 
            className="shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-primary hover:bg-primary/90"
            disabled={isTyping || !userInput.trim()} 
          >
            <SendIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;