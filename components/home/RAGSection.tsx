"use client";

import { 
  FileText, 
  Shield, 
  Brain, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function RAGSection() {
  return (
    <section className="py-24 px-6 bg-space-blue/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase">
              <Brain className="w-4 h-4" />
              Turnkey RAG
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
              Build Custom AI Without <span className="text-primary">Training Models</span>
            </h2>
            
            <p className="text-lg text-slate-400 leading-relaxed">
              Using our API, upload your documents or data to your private, secure vector database. 
              Our pre-trained models use these embeddings as source material, providing custom outputs 
              without requiring model training—or risking proprietary data leaking to public AI models.
            </p>

            <ul className="space-y-4">
              {[
                "Upload documents via API to private vector database",
                "Data stored as embeddings - never leaves your control",
                "Pre-trained models generate custom responses",
                "No model training required",
                "Zero risk of data leakage to public AI",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-primary text-black font-bold rounded-xl vector-glow hover:brightness-110 transition-all flex items-center justify-center gap-2">
                Start Building <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 glass-panel border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all">
                View Documentation
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            {/* Main Card */}
            <div className="glass-panel-primary rounded-3xl p-8 border-primary/30 vector-glow relative z-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Document Upload</h4>
                  <p className="text-xs text-slate-400">API Endpoint</p>
                </div>
              </div>

              {/* Code Example */}
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm overflow-hidden">
                <div className="text-purple-400">const</div>
                <div className="text-blue-400"> response</div>
                <div className="text-white"> = </div>
                <div className="text-yellow-400">await</div>
                <div className="text-white"> qvl.</div>
                <div className="text-green-400">embed</div>
                <div className="text-white">(</div>
                <div className="text-orange-400">{'{'}</div>
                <div className="pl-4 text-slate-400">
                  <div className="text-white">documents: </div>
                  <div className="text-orange-400">[</div>
                  <div className="text-green-400">'doc1.pdf'</div>
                  <div className="text-orange-400">,]</div>
                </div>
                <div className="text-orange-400">{'}'}</div>
                <div className="text-white">)</div>
              </div>

              {/* Shield Badge */}
              <div className="absolute -bottom-4 -right-4 flex items-center gap-2 px-4 py-2 bg-space-blue border border-primary/30 rounded-full">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-primary">100% Private</span>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
