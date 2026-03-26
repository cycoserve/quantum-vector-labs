"use client";

import { useState, useRef, useEffect } from "react";
import { 
  LifeBuoy, 
  Send, 
  X, 
  Loader2, 
  Mail, 
  Github, 
  MessageSquare, 
  HelpCircle,
  ShieldCheck,
  ExternalLink,
  Bot
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "NPM/GitHub Repo",
    description: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (showModal) scrollToBottom();
  }, [messages, showModal]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
    
    // Start initial AI message based on form
    setIsLoading(true);
    const assistantId = Date.now().toString();
    setMessages([{ 
      id: assistantId, 
      role: "assistant", 
      content: "Wait a moment... I am analyzing your request to find the best solution for you." 
    }]);

    const initialUserMessage = { 
      role: "user", 
      content: `I need help with the following issue: ${formData.description}` 
    };

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [initialUserMessage],
          formContext: formData,
        }),
      });

      if (!response.ok) throw new Error("Support API error");

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });

        // Update the FIRST assistant message with the stream
        setMessages([
          { id: Date.now().toString() + "-user", role: "user", content: formData.description },
          { id: assistantId, role: "assistant", content: accumulated }
        ]);
      }
    } catch (err) {
      setMessages([{ id: assistantId, role: "assistant", content: "Sorry, I encountered an error. Please contact support@quantumvectorlabs.com directly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userText = input.trim();
    if (!userText || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: userText };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          formContext: formData,
        }),
      });

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: accumulated } : m));
      }
    } catch {
      setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: "Error connecting. Reach us at support@quantumvectorlabs.com" } : m));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase">
            <LifeBuoy className="w-4 h-4" />
            Support Center
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white">
            How Can We <span className="text-gradient">Help You?</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Get instant answers for NPM packages, GitHub repos, and platform usage. 
            Our Support AI is trained on all QVL documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Support Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl">
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Your Name</label>
                    <input 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                    <input 
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Issue Category</label>
                  <select 
                    value={formData.issueType}
                    onChange={(e) => setFormData({...formData, issueType: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white appearance-none"
                  >
                    <option>NPM/GitHub Repo</option>
                    <option>Platform Usage</option>
                    <option>API & Integration</option>
                    <option>Billing & Account</option>
                    <option>Custom AI App Development</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Description</label>
                  <textarea 
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={5}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white resize-none"
                    placeholder="Describe the issue or ask a question..."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-primary text-black font-bold rounded-xl vector-glow hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Launch Support Assistant
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links / Status */}
          <div className="space-y-6">
            <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/5 space-y-6">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Quick Resources
              </h3>
              
              <div className="space-y-3">
                <a href="https://github.com/quantumvectorlabs" target="_blank" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">GitHub Repos</span>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="/learn" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Documentation</span>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="mailto:support@quantumvectorlabs.com" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Direct Email</span>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              <div className="pt-2">
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-center">
                    All QVL software status: <span className="text-emerald-500 font-bold uppercase ml-1">Operational</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-hidden">
          <div className="w-full max-w-3xl h-[80vh] flex flex-col bg-white dark:bg-[#010918] rounded-3xl border border-primary/30 shadow-2xl overflow-hidden animate-fade-in relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/40">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Support Assistant</h3>
                  <p className="text-[10px] text-primary font-bold tracking-widest uppercase">NLP Resolution Loop</p>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                    m.role === "user" 
                      ? "bg-primary text-black font-medium" 
                      : "bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Modal Footer (Input) */}
            <div className="p-4 border-t border-slate-200 dark:border-white/5">
              <form onSubmit={handleChatSubmit} className="flex items-center gap-2 max-w-2xl mx-auto">
                <input 
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  placeholder="Type to follow up..."
                  className="flex-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-white"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="size-11 rounded-2xl bg-primary text-black flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <p className="text-[10px] text-center text-slate-500 mt-3 uppercase tracking-widest">
                If unresolved, email support@quantumvectorlabs.com
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
