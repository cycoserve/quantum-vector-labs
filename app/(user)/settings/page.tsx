"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useAuth } from "@/lib/auth-context";
import { 
  User, 
  Shield, 
  CreditCard, 
  Key, 
  Copy, 
  Check, 
  Info, 
  Settings, 
  Trash2, 
  ArrowLeft,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Monitor,
  LogOut
} from "lucide-react";

/**
 * Highly compact, responsive Settings Page.
 * - Sidebar toggle on the right edge of the sidebar (Desktop only).
 * - Theme switcher in General tab.
 * - Minimal padding for an "expert" app feel.
 * - Auth-gated: only logged-in users can access.
 */
export default function SettingsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "account" | "privacy" | "billing">("general");
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [apiKey] = useState("qvl_live_48291038475629104857");

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  // Auth gate
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace('/auth');
    }
  }, [isAuthLoading, isAuthenticated, router]);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-primary animate-pulse font-mono text-sm tracking-[0.2em] uppercase">
          Initializing_Session...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "account", label: "Account", icon: User },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
  ] as const;

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div className="flex h-screen bg-background text-foreground transition-colors duration-300 overflow-hidden relative">
      
      {/* ── Sidebar Rail ── */}
      <aside 
        className={`fixed md:relative flex flex-col glass-panel border-r border-surface-border transition-all duration-300 ease-in-out z-30 h-full ${
          isExpanded ? "w-64" : "w-16"
        } ${!isExpanded ? "-translate-x-full md:translate-x-0" : "translate-x-0"}`}
      >
        {/* Toggle Button - Placed on the right edge, hidden on mobile */}
        <button 
          onClick={toggleSidebar}
          className="absolute -right-4 top-6 z-40 size-8 bg-surface border border-surface-border rounded-full hidden md:flex items-center justify-center text-primary hover:scale-110 transition-transform vector-glow shadow-xl"
          title={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {/* Brand / Logo Area */}
        <div className="h-14 flex items-center px-5 border-b border-surface-border/50">
          <div className="size-6 rounded bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
             <div className="size-2 rounded-full bg-primary" />
          </div>
          {isExpanded && <span className="ml-3 font-bold text-xs uppercase tracking-tighter animate-in fade-in duration-300">Cy_Nodes</span>}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4 flex flex-col gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (window.innerWidth < 768) setIsExpanded(false);
              }}
              className={`flex items-center gap-4 h-10 px-5 transition-all relative group ${
                activeTab === tab.id
                  ? "text-primary bg-primary/5"
                  : "text-muted hover:text-foreground hover:bg-white/5"
              }`}
            >
              <tab.icon className="w-4 h-4 shrink-0" />
              {isExpanded && (
                <span className="text-xs font-medium animate-in fade-in slide-in-from-left-2 duration-200">
                  {tab.label}
                </span>
              )}
              {activeTab === tab.id && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary vector-glow" />
              )}
              {!isExpanded && (
                <div className="absolute left-16 glass-panel px-2 py-1 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity ml-2 z-50 shadow-2xl border-primary/20">
                  {tab.label}
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Sign Out Button */}
        <button 
          onClick={() => signOut()}
          className="h-14 flex items-center gap-4 px-5 text-muted hover:text-red-500 transition-colors border-t border-surface-border/50 w-full group"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {isExpanded && (
            <span className="text-xs font-medium animate-in fade-in slide-in-from-left-2 duration-200">
              Sign Out
            </span>
          )}
        </button>

        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="h-14 flex items-center gap-4 px-5 text-muted hover:text-primary transition-colors border-t border-surface-border/50 w-full group"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          {isExpanded && (
            <span className="text-xs font-medium animate-in fade-in slide-in-from-left-2 duration-200">
              Exit
            </span>
          )}
        </button>
      </aside>

      {/* Mobile Overlay for Sidebar */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* ── Main Content Area ── */}
      <main className="flex-1 overflow-y-auto bg-background/30 relative">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="md:hidden flex items-center justify-between px-4 h-14 border-b border-surface-border glass-panel sticky top-0 z-10">
           <button onClick={() => setIsExpanded(true)} className="p-2 text-primary">
              <Menu className="w-5 h-5" />
           </button>
           <span className="text-xs font-bold uppercase tracking-widest text-primary">Settings</span>
           <div className="w-9" /> {/* Spacer */}
        </div>

        <div className="max-w-4xl mx-auto px-4 py-4 md:px-8 md:py-6">
          
          {/* Compact Header Section */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-3">
                <span className="text-primary opacity-50 font-mono text-sm">/</span>
                {tabs.find(t => t.id === activeTab)?.label}
              </h1>
              <p className="text-[10px] text-muted uppercase tracking-widest font-mono mt-0.5 opacity-60">
                qvlabs_core // node_cfg // {activeTab}.bin
              </p>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 glass-panel px-2 py-1 rounded-md border-surface-border/30 bg-black/10">
               <div className="size-1 bg-emerald-500 rounded-full animate-pulse" />
               <span className="text-[9px] font-mono text-muted uppercase tracking-tighter">Secure_Tunnel</span>
            </div>
          </div>

          <div className="glass-panel card-ring rounded-xl p-4 md:p-6 border border-surface-border/30 bg-surface/10">
            
            {/* General Tab */}
            {activeTab === "general" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-1 duration-300">
                <section>
                  <h3 className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <div className="w-3 h-px bg-primary/30" /> Localization
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-muted uppercase tracking-widest ml-1">Language</label>
                      <select className="w-full glass-panel bg-black/20 border-surface-border/50 rounded-lg px-3 py-2 text-xs focus:border-primary/50 transition-colors outline-none text-foreground">
                        <option className="bg-background">English (US)</option>
                        <option className="bg-background">Japanese (JP)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-muted uppercase tracking-widest ml-1">Timezone</label>
                      <select className="w-full glass-panel bg-black/20 border-surface-border/50 rounded-lg px-3 py-2 text-xs focus:border-primary/50 transition-colors outline-none text-foreground">
                        <option className="bg-background">UTC-08:00 (PST)</option>
                        <option className="bg-background">UTC+00:00 (GMT)</option>
                      </select>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <div className="w-3 h-px bg-primary/30" /> System_Theme
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'light', label: 'Light', icon: Sun },
                      { id: 'dark', label: 'Dark', icon: Moon },
                      { id: 'system', label: 'System', icon: Monitor },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                          mounted && theme === t.id
                            ? "border-primary/50 bg-primary/5 text-primary shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                            : "border-surface-border/50 bg-black/10 text-muted hover:border-primary/30 hover:text-foreground"
                        }`}
                      >
                        <t.icon className="w-4 h-4" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <div className="pt-4 border-t border-surface-border/20">
                  <button className="bg-primary text-black font-bold px-6 py-2 rounded-lg hover:scale-105 transition-transform vector-glow text-[10px] uppercase tracking-widest">Write_Changes</button>
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === "account" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-1 duration-300">
                <section>
                  <h3 className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <div className="w-3 h-px bg-primary/30" /> Node_Profile
                  </h3>
                  
                  {/* User Icon & Basic Info */}
                  <div className="flex flex-col sm:flex-row gap-6 mb-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="size-20 rounded-xl glass-panel bg-surface/40 border-surface-border/50 flex items-center justify-center relative group overflow-hidden">
                        <User className="w-8 h-8 text-muted/50 group-hover:text-primary transition-colors" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                          <span className="text-[8px] font-mono uppercase text-white">Upload</span>
                        </div>
                      </div>
                      <span className="text-[8px] font-mono text-muted uppercase tracking-tighter">Icon_v1.0</span>
                    </div>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-muted uppercase tracking-widest ml-1">First_Name</label>
                        <input 
                          type="text" 
                          defaultValue="Quantum" 
                          className="w-full glass-panel bg-black/5 dark:bg-black/20 border-surface-border/50 rounded-lg px-3 py-2 text-xs text-foreground focus:border-primary/50 transition-colors outline-none" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-muted uppercase tracking-widest ml-1">Last_Name</label>
                        <input 
                          type="text" 
                          defaultValue="Explorer" 
                          className="w-full glass-panel bg-black/5 dark:bg-black/20 border-surface-border/50 rounded-lg px-3 py-2 text-xs text-foreground focus:border-primary/50 transition-colors outline-none" 
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-[9px] font-mono text-muted uppercase tracking-widest ml-1">Email_Relay</label>
                        <input 
                          type="email" 
                          defaultValue="explorer@qvlabs.ai" 
                          className="w-full glass-panel bg-black/5 dark:bg-black/20 border-surface-border/50 rounded-lg px-3 py-2 text-xs text-foreground focus:border-primary/50 transition-colors outline-none" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-muted uppercase tracking-widest ml-1">Bio_Description</label>
                    <textarea 
                      rows={3}
                      defaultValue="Autonomous entity operating at the edge of the neural horizon. Specializing in planetary-scale vector retrieval and multi-agent orchestration."
                      className="w-full glass-panel bg-black/5 dark:bg-black/20 border-surface-border/50 rounded-lg px-3 py-2 text-xs text-foreground focus:border-primary/50 transition-colors outline-none resize-none leading-relaxed"
                    />
                  </div>
                </section>

                <section>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                      <div className="w-3 h-px bg-primary/30" /> Auth_Token
                    </h3>
                    <span className="text-[8px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded border border-emerald-500/20 font-mono uppercase">Validated</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 font-mono text-[10px] glass-panel bg-black/10 dark:bg-black/40 border-surface-border/50 rounded-lg px-3 py-2.5 flex items-center justify-between overflow-hidden text-foreground">
                      <span className="truncate opacity-80 tracking-tighter">{apiKey}</span>
                    </div>
                    <button 
                      onClick={handleCopyKey}
                      className="glass-panel border-surface-border/50 hover:border-primary/40 text-foreground p-2 rounded-lg transition-all shrink-0"
                    >
                      {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </section>

                <div className="pt-4 border-t border-surface-border/20">
                  <button className="flex items-center gap-2 text-[9px] font-mono text-muted/60 hover:text-red-500 transition-colors uppercase tracking-[0.1em]">
                    <Trash2 className="w-3 h-3" /> Decommission_Account
                  </button>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === "privacy" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-1 duration-300">
                <h3 className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  <div className="w-3 h-px bg-primary/30" /> Policy_Override
                </h3>
                {[
                  { title: "Telemetry", desc: "Global node optimization stream.", active: true },
                  { title: "Memory", desc: "Local history persistence in Leader Brain.", active: true },
                  { title: "Cache", desc: "Regional edge data mirroring.", active: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 glass-panel bg-black/10 rounded-lg border border-surface-border/20">
                    <div>
                      <h4 className="text-[11px] font-bold text-foreground">{item.title}</h4>
                      <p className="text-[9px] text-muted leading-tight opacity-70">{item.desc}</p>
                    </div>
                    <button className={`w-8 h-4 rounded-full transition-all relative ${item.active ? "bg-primary" : "bg-white/10 dark:bg-white/5"}`}>
                      <div className={`absolute top-0.5 size-3 rounded-full bg-white transition-all ${item.active ? "right-0.5" : "left-0.5"}`} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === "billing" && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-1 duration-300">
                <h3 className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  <div className="w-3 h-px bg-primary/30" /> Credit_Allocation
                </h3>
                
                <div className="glass-panel bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] font-mono text-primary uppercase tracking-widest mb-0.5">Active_Tier</div>
                    <div className="text-lg font-bold text-foreground">Pro_Horizon</div>
                    <div className="text-[9px] text-muted font-mono uppercase opacity-60">Cycle: April_2027</div>
                  </div>
                  <a href="/pricing" className="text-[9px] font-bold text-primary hover:underline uppercase tracking-widest">Upgrade</a>
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] font-mono text-muted uppercase tracking-widest block ml-1">Payment_Node</label>
                  <div className="flex items-center justify-between p-3 glass-panel bg-black/10 rounded-lg border border-surface-border/20">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded bg-surface/10 flex items-center justify-center border border-surface-border/30">
                        <CreditCard className="w-3.5 h-3.5 text-muted/70" />
                      </div>
                      <div>
                        <div className="text-[11px] font-medium text-foreground">Visa • 4421</div>
                        <div className="text-[9px] text-muted font-mono uppercase opacity-60">Exp 12/28</div>
                      </div>
                    </div>
                    <button className="text-[9px] font-mono text-muted hover:text-foreground transition-colors uppercase">Edit</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
