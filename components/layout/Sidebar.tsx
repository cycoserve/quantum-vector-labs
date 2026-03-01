"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, X, Loader2, Maximize2, Minimize2, Trash2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Parse message content to make links clickable and remove markdown formatting
function parseMessageContent(content: string): React.ReactNode {
  // First, remove markdown bold markers (**text** -> text)
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

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
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
            ? { ...m, content: "Sorry, something went wrong. Please try again." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Panel */}
      {isOpen && (
        <div className={`glass-panel rounded-2xl flex flex-col border border-primary/30 shadow-[0_0_40px_rgba(32,211,238,0.15)] overflow-hidden ${isFullscreen ? "fixed inset-0 w-full h-full rounded-none z-[60]" : "w-80 h-[480px]"}`}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/20">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-sm font-semibold text-white">QVL Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                aria-label="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleToggleFullscreen}
                className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                <div className="size-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center card-ring">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-slate-400 max-w-[200px]">
                  Ask me anything about our AI services.
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-primary text-black font-medium rounded-br-sm"
                      : "bg-white/5 border border-white/10 text-slate-200 rounded-bl-sm"
                  }`}
                >
                  {message.role === "user" ? (
                    message.content || (
                      <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    )
                  ) : (
                    message.content ? (
                      parseMessageContent(message.content)
                    ) : (
                      <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    )
                  )}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-3 border-t border-white/5 bg-black/20"
          >
            <input
              className="flex-1 bg-slate-900/80 border border-slate-700 rounded-xl text-sm px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none text-white placeholder-slate-500 transition-all"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="size-9 flex items-center justify-center rounded-xl bg-primary text-black hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="size-14 glass-panel rounded-full flex items-center justify-center border border-primary/50 vector-glow group transition-all hover:scale-105 active:scale-95"
        aria-label={isOpen ? "Close assistant" : "Open assistant"}
      >
        <div className="size-9 rounded-full bg-primary/20 flex items-center justify-center border border-primary">
          {isOpen ? (
            <X className="text-primary w-5 h-5" />
          ) : (
            <Bot className="text-primary group-hover:scale-110 transition-transform duration-300 w-5 h-5" />
          )}
        </div>
      </button>
    </div>
  );
}
