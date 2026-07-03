"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Bienvenue chez TimeTravel Agency ! 🕰️ Je suis votre assistant temporel. Comment puis-je vous aider ?",
    sender: "bot",
  },
  {
    id: 2,
    text: "Quelle époque souhaiteriez-vous explorer ?",
    sender: "bot",
  },
];

const quickReplies = [
  "Paris 1889",
  "Le Crétacé",
  "Florence 1504",
  "Tarifs",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(3);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /**
   * Send messages to the API and stream the response.
   */
  const sendToAI = useCallback(
    async (allMessages: Message[]) => {
      setIsLoading(true);

      // Create a placeholder bot message for streaming
      const botId = nextIdRef.current++;
      const botMsg: Message = { id: botId, text: "", sender: "bot" };
      setMessages((prev) => [...prev, botMsg]);

      try {
        // Only send user/bot messages (skip initial welcome which aren't in API context)
        const apiMessages = allMessages
          .filter((m) => m.id > 2) // skip initial welcome messages
          .map((m) => ({ sender: m.sender, text: m.text }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        // Read the SSE stream
        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response stream");

        const decoder = new TextDecoder();
        let accumulated = "";
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;

            const data = trimmed.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulated += parsed.content;
                // Update the bot message with accumulated text
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === botId ? { ...m, text: accumulated } : m
                  )
                );
              }
            } catch {
              // Skip malformed chunks
            }
          }
        }

        // If no content was received, show a fallback
        if (!accumulated) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botId
                ? {
                    ...m,
                    text: "Désolé, je n'ai pas pu vous répondre. Réessayez dans un instant. ✨",
                  }
                : m
            )
          );
        }
      } catch (error) {
        console.error("Chat error:", error);
        // Update placeholder with error message
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botId
              ? {
                  ...m,
                  text: "Une perturbation temporelle empêche la communication. Veuillez réessayer. 🕰️",
                }
              : m
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: Message = {
      id: nextIdRef.current++,
      text: inputValue,
      sender: "user",
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue("");
    sendToAI(updatedMessages);
  };

  const handleQuickReply = (reply: string) => {
    if (isLoading) return;

    const userMsg: Message = {
      id: nextIdRef.current++,
      text: reply,
      sender: "user",
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    sendToAI(updatedMessages);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark text-background flex items-center justify-center shadow-lg hover:shadow-[0_0_30px_rgba(212,168,83,0.3)] transition-shadow duration-300"
        aria-label="Ouvrir le chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl border border-border bg-surface-elevated shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border bg-surface flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-background text-xs font-bold">
                TT
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  Assistant Temporel
                </p>
                <p className="text-xs text-text-muted flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  En ligne
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gold/15 text-gold-light rounded-br-md"
                        : "bg-surface text-text-secondary rounded-bl-md border border-border"
                    }`}
                  >
                    {msg.text || (
                      /* Typing indicator while streaming */
                      <span className="inline-flex gap-1 items-center py-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold/60 animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-gold/60 animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-gold/60 animate-bounce [animation-delay:300ms]" />
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 py-2 flex flex-wrap gap-2 border-t border-border">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleQuickReply(reply)}
                  disabled={isLoading}
                  className="px-3 py-1 text-xs rounded-full border border-gold/20 text-gold hover:bg-gold/10 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-border flex gap-2">
              <input
                type="text"
                placeholder={isLoading ? "En cours..." : "Votre message..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
                className="flex-1 bg-surface rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted border border-border focus:border-gold/30 focus:outline-none transition-colors duration-200 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="w-10 h-10 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 flex items-center justify-center transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Envoyer"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full"
                  />
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
