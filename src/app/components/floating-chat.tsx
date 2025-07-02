"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useSpring } from "framer-motion"
import { MessageCircle, X, Send, Sparkles, RotateCcw, HelpCircle, Trash2, Bot, User, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

interface Message {
    id: string
    content: string
    isUser: boolean
    timestamp: Date
}

export function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Advanced spring animations
    const springConfig = { tension: 300, friction: 30 }
    //   @ts-ignore
    const buttonScale = useSpring(isHovered ? 1.05 : 1, springConfig)
    // @ts-ignore
    const chatScale = useSpring(isOpen ? 1 : 0.95, springConfig)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputValue,
            isUser: true,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInputValue("")
        setIsTyping(true)

        // Simulate AI response with realistic delay
        setTimeout(
            () => {
                const responses = [
                    "I'd be happy to help you with that! Could you provide more details about what you're looking for?",
                    "That's a great question! Let me break this down for you in a clear and helpful way.",
                    "I understand what you're asking. Here's my take on this topic, and I hope it helps clarify things for you.",
                    "Thanks for reaching out! I'm here to assist you with whatever you need. Let's dive into this together.",
                    "Excellent question! I love helping with topics like this. Here's what I think would be most useful for you to know.",
                ]

                const aiMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    content: responses[Math.floor(Math.random() * responses.length)],
                    isUser: false,
                    timestamp: new Date(),
                }
                setMessages((prev) => [...prev, aiMessage])
                setIsTyping(false)
            },
            1200 + Math.random() * 800,
        )
    }

    const handleNewChat = () => {
        setMessages([])
    }

    const handleClearChat = () => {
        setMessages([])
    }

    return (
        <>
            {/* Floating Chat Button - Legendary Design with shadcn colors */}
            <motion.div
                className="fixed bottom-8 right-8 z-50"
                initial={{ scale: 0, opacity: 0, y: 100 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                    delay: 0.5,
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    mass: 0.8,
                }}
            >
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                        >
                            <motion.div style={{ scale: buttonScale }} className="relative">
                                <Button
                                    onClick={() => setIsOpen(true)}
                                    className="h-14 w-14 rounded-full bg-gradient-to-br from-primary via-primary/90 to-accent hover:from-primary/90 hover:via-accent hover:to-primary shadow-2xl hover:shadow-primary/25 transition-all duration-500 group relative overflow-hidden border-0"
                                >
                                    {/* Animated background gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />

                                    {/* Sparkle effect */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full"
                                        animate={{
                                            background: [
                                                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                                                "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                                                "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                                            ],
                                        }}
                                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                    />

                                    <MessageCircle className="h-7 w-7 text-primary-foreground group-hover:scale-110 transition-transform duration-300 relative z-10" />

                                    {/* Pulse ring */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-2 border-primary/40"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.5, 0, 0.5],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                        }}
                                    />
                                </Button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Chat Widget - Masterpiece Design with shadcn colors */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            mass: 0.8,
                        }}
                        className="fixed bottom-8 right-8 z-50"
                    >
                        <Card className="w-[520px] h-[680px] shadow-2xl border-border/50 bg-card/95 backdrop-blur-2xl overflow-hidden flex flex-col relative">
                            {/* Ambient light effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 pointer-events-none" />

                            {/* Header - Legendary Gradient with shadcn colors */}
                            <motion.div
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 30 }}
                                className="relative overflow-hidden flex-shrink-0"
                            >
                                {/* Beautiful shadcn gradient background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent" />

                                {/* Glass morphism overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-background/10 to-transparent backdrop-blur-sm" />

                                <div className="relative z-10 p-6 text-primary-foreground">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <motion.div
                                                animate={{ rotate: [0, 360] }}
                                                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                            >
                                                <Sparkles className="h-6 w-6" />
                                            </motion.div>
                                            <h3 className="font-bold text-xl tracking-tight">Chat with our AI</h3>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setIsOpen(false)}
                                            className="text-primary-foreground hover:bg-background/20 h-9 w-9 p-0 rounded-full transition-all duration-300 hover:scale-110"
                                        >
                                            <X className="h-5 w-5" />
                                        </Button>
                                    </div>

                                    <p className="text-primary-foreground/90 text-sm mb-4 font-medium">
                                        Ask any question for our AI to answer
                                    </p>

                                    <div className="flex gap-2">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={handleNewChat}
                                            className="bg-background/20 hover:bg-background/30 text-primary-foreground border-background/20 hover:border-background/30 text-xs font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                                        >
                                            <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                                            New Chat
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={handleClearChat}
                                            className="bg-background/20 hover:bg-background/30 text-primary-foreground border-background/20 hover:border-background/30 text-xs font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                                        >
                                            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                                            Clear
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="bg-background/20 hover:bg-background/30 text-primary-foreground border-background/20 hover:border-background/30 text-xs font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                                        >
                                            <HelpCircle className="h-3.5 w-3.5 mr-1.5" />
                                            FAQ
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Messages Container - Perfect Scrolling */}
                            <div className="flex-1 flex flex-col min-h-0 relative">
                                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-muted/50 to-background/80 backdrop-blur-sm">
                                    {messages.length === 0 ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                                            className="flex flex-col items-center justify-center h-full text-center py-12"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 25 }}
                                                className="relative mb-6"
                                            >
                                                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-border/50">
                                                    <MessageCircle className="w-10 h-10 text-primary" />
                                                </div>

                                                {/* Floating particles */}
                                                {[...Array(3)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="absolute w-2 h-2 bg-primary/60 rounded-full"
                                                        animate={{
                                                            y: [-10, -20, -10],
                                                            x: [0, Math.sin(i) * 10, 0],
                                                            opacity: [0.3, 0.8, 0.3],
                                                        }}
                                                        transition={{
                                                            duration: 2 + i * 0.5,
                                                            repeat: Number.POSITIVE_INFINITY,
                                                            ease: "easeInOut",
                                                        }}
                                                        style={{
                                                            top: `${20 + i * 15}%`,
                                                            left: `${30 + i * 20}%`,
                                                        }}
                                                    />
                                                ))}
                                            </motion.div>

                                            <motion.h3
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.7 }}
                                                className="text-xl font-bold text-foreground mb-3"
                                            >
                                                Start a conversation
                                            </motion.h3>

                                            <motion.p
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.9 }}
                                                className="text-muted-foreground text-sm max-w-xs leading-relaxed"
                                            >
                                                Ask me anything! I'm here to help you with your questions.
                                            </motion.p>
                                        </motion.div>
                                    ) : (
                                        <AnimatePresence mode="popLayout">
                                            {messages.map((message, index) => (
                                                <motion.div
                                                    key={message.id}
                                                    layout
                                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -30, scale: 0.95 }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 400,
                                                        damping: 30,
                                                        delay: index * 0.05,
                                                    }}
                                                    className={`flex gap-3 ${message.isUser ? "justify-end" : "justify-start"}`}
                                                >
                                                    {!message.isUser && (
                                                        <Avatar className="h-9 w-9 border-2 border-primary/20 flex-shrink-0 shadow-sm">
                                                            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-semibold">
                                                                <Bot className="h-4 w-4" />
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    )}

                                                    <motion.div
                                                        whileHover={{ scale: 1.02 }}
                                                        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${message.isUser
                                                                ? "bg-gradient-to-r from-primary to-accent text-primary-foreground ml-auto"
                                                                : "bg-card border border-border/50 text-card-foreground backdrop-blur-sm"
                                                            }`}
                                                    >
                                                        <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                                                    </motion.div>

                                                    {message.isUser && (
                                                        <Avatar className="h-9 w-9 border-2 border-accent/20 flex-shrink-0 shadow-sm">
                                                            <AvatarFallback className="bg-gradient-to-br from-accent to-secondary text-accent-foreground text-xs font-semibold">
                                                                <User className="h-4 w-4" />
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    )}

                                    {/* Typing Indicator - Masterpiece Animation */}
                                    <AnimatePresence>
                                        {isTyping && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                className="flex gap-3"
                                            >
                                                <Avatar className="h-9 w-9 border-2 border-primary/20 flex-shrink-0 shadow-sm">
                                                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-semibold">
                                                        <Bot className="h-4 w-4" />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="bg-card border border-border/50 rounded-2xl px-4 py-3 shadow-sm backdrop-blur-sm">
                                                    <div className="flex gap-1.5">
                                                        {[0, 1, 2].map((i) => (
                                                            <motion.div
                                                                key={i}
                                                                className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full"
                                                                animate={{
                                                                    scale: [1, 1.4, 1],
                                                                    opacity: [0.5, 1, 0.5],
                                                                }}
                                                                transition={{
                                                                    duration: 1.2,
                                                                    repeat: Number.POSITIVE_INFINITY,
                                                                    delay: i * 0.2,
                                                                    ease: "easeInOut",
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input - Legendary Design */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 30 }}
                                    className="px-6 py-4 bg-card/90 backdrop-blur-xl border-t border-border/50 flex-shrink-0"
                                >
                                    <div className="flex gap-3">
                                        <div className="flex-1 relative">
                                            <Input
                                                ref={inputRef}
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                                                placeholder="Type a message..."
                                                className="w-full border-input focus:border-ring rounded-2xl bg-muted/50 backdrop-blur-sm px-4 py-3 text-sm font-medium placeholder:text-muted-foreground shadow-sm focus:shadow-md transition-all duration-300 pr-12"
                                                disabled={isTyping}
                                            />
                                        </div>

                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                onClick={handleSendMessage}
                                                disabled={!inputValue.trim() || isTyping}
                                                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 disabled:from-muted disabled:to-muted rounded-2xl px-4 py-3 h-12 w-12 transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-sm group relative overflow-hidden"
                                            >
                                                <motion.div
                                                    animate={isTyping ? { rotate: 360 } : { rotate: 0 }}
                                                    transition={{ duration: 1, repeat: isTyping ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
                                                >
                                                    <Send className="h-5 w-5 text-primary-foreground group-hover:scale-110 transition-transform duration-200" />
                                                </motion.div>

                                                {/* Button shine effect */}
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent"
                                                    animate={{ x: [-100, 100] }}
                                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                                />
                                            </Button>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
