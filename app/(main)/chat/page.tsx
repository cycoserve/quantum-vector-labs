"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, Trash2, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Parse message content to make links clickable and remove markdown formatting
function parseMessageContent(content: string): React.ReactNode {
  // Remove markdown bold markers (**text** -> text)
  let processed = content.replace(/\*\*(.+?)\*\*/g, "$1");
  // Remove italic markers (*text* -> text)
  processed = processed.replace(/\*(.+?)\*/g, "$1");
  // Remove inline code markers (`code` -> code)
  processed = processed.replace(/`(.+?)`/g, "$1");

  // Split content by URLs to create clickable links
  const urlRegex = /(https?:\/\/[^\s<]+)/g;
  const parts = processed.split(urlRegex);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      urlRegex.lastIndex = 0; // Reset regex state
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClearChat = () => {
    setMessages([]);
    inputRef.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userText = input.trim();
    if (!userText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userText,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to get response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: accumulated } : m
          )
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: "Sorry, something went wrong. Please try again.",
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-dark"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 0%, #0a192f 0%, #010918 50%)",
      }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-primary/20 shadow-[0_0_30px_rgba(32,211,238,0.08)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Left: back link */}
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm hidden sm:inline">Home</span>
          </Link>

          {/* Center: branding */}
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center card-ring">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold text-white tracking-wide">
                QVL Assistant
              </span>
              <span className="text-[10px] text-primary/70 font-medium tracking-widest uppercase">
                Quantum Vector Labs
              </span>
            </div>
            {/* Live indicator */}
            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
          </div>

          {/* Right: clear chat */}
          <button
            onClick={handleClearChat}
            disabled={messages.length === 0}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-2 py-1.5 rounded-lg hover:bg-white/5 text-sm"
            aria-label="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </header>

      {/* Message thread */}
      <main className="flex-1 overflow-y-auto pt-16 pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-4">
          {/* Empty state */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] gap-5 text-center animate-fade-in">
              <div className="size-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center card-ring">
                <Bot className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-white">
                  QVL Assistant
                </h2>
                <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
                  Ask me anything about Quantum Vector Labs — our AI services,
                  pricing, vector databases, or how to get started.
                </p>
              </div>
              {/* Suggestion chips */}
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {[
                  "What's your pricing?",
                  "How do vector databases work?",
                  "Tell me about your API",
                  "What models do you support?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="px-3 py-1.5 rounded-full text-xs border border-primary/20 text-slate-300 hover:border-primary/50 hover:text-white hover:bg-primary/5 transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-fade-in ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* AI avatar */}
              {message.role === "assistant" && (
                <div className="flex-shrink-0 mt-1">
                  <div className="size-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                </div>
              )}

              {/* Bubble */}
              <div
                className={`max-w-[75%] sm:max-w-[65%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "bg-primary text-black font-medium rounded-br-sm shadow-[0_0_20px_rgba(32,211,238,0.25)]"
                    : "glass-panel rounded-bl-sm text-slate-200 shadow-[0_0_15px_rgba(32,211,238,0.08)]"
                }`}
              >
                {message.role === "user" ? (
                  message.content
                ) : message.content ? (
                  parseMessageContent(message.content)
                ) : (
                  <span className="flex items-center gap-2 text-slate-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                    <span className="text-xs">Thinking…</span>
                  </span>
                )}
              </div>

              {/* User avatar */}
              {message.role === "user" && (
                <div className="flex-shrink-0 mt-1">
                  <div className="size-8 rounded-full bg-slate-700/60 border border-slate-600 flex items-center justify-center text-xs font-semibold text-slate-300">
                    U
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Fixed input bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        {/* Gradient fade above the bar */}
        <div className="h-8 bg-gradient-to-t from-[#010918] to-transparent pointer-events-none" />

        <div className="glass-panel border-t border-primary/20 shadow-[0_-10px_40px_rgba(32,211,238,0.08)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-3"
            >
              <input
                ref={inputRef}
                type="text"
                className="flex-1 bg-slate-900/80 border border-slate-700 rounded-xl text-sm px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none text-white placeholder-slate-500 transition-all disabled:opacity-50"
                placeholder="Ask about QVL services, pricing, APIs…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="size-11 flex items-center justify-center rounded-xl bg-primary text-black hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0 shadow-[0_0_15px_rgba(32,211,238,0.3)] active:scale-95"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
            <p className="text-center text-[11px] text-slate-600 mt-2">
              QVL Assistant · AI-powered · Responses may not always be accurate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
