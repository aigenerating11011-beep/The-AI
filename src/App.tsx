/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Zap, 
  Eye, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  BarChart3, 
  Layers, 
  Globe, 
  Search,
  ChevronRight,
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Constants & Data ---
const PERFORMANCE_DATA = [
  { subject: 'Coding', A: 92, B: 85, fullMark: 100, label: 'HumanEval' },
  { subject: 'Math', A: 88, B: 82, fullMark: 100, label: 'GSM8K' },
  { subject: 'Reasoning', A: 94, B: 89, fullMark: 100, label: 'ARC-C' },
  { subject: 'Multi-lingual', A: 85, B: 78, fullMark: 100, label: 'MMLU-X' },
  { subject: 'Visual', A: 82, B: 70, fullMark: 100, label: 'MMMU' },
  { subject: 'Safety', A: 98, B: 92, fullMark: 100, label: 'HateBench' },
];

const COMPARISON_VARS = [
  { name: 'Gemma 4 (27B)', value: 92.4, color: '#C4A484', url: 'https://huggingface.co/google' },
  { name: 'Llama 4 (35B)', value: 89.1, color: '#404040', url: 'https://llama.meta.com' },
  { name: 'Mistral 3 (22B)', value: 86.5, color: '#404040', url: 'https://mistral.ai' },
  { name: 'GPT-4o (Small)', value: 90.2, color: '#404040', url: 'https://openai.com' },
];

const FEATURES = [
  {
    icon: <Cpu className="w-5 h-5 text-editorial-gold" />,
    title: "Efficiency Architecture",
    description: "Built on 4.0 pillars, achieving SOTA results with significantly fewer parameters.",
    tag: "01"
  },
  {
    icon: <Layers className="w-5 h-5 text-editorial-gold" />,
    title: "1.2M Context",
    description: "Process entire repositories in a single pass with near-perfect retrieval accuracy.",
    tag: "02"
  },
  {
    icon: <Eye className="w-5 h-5 text-editorial-gold" />,
    title: "Native Multimodality",
    description: "Interleaved tokens for text, image, and high-fidelity audio natively.",
    tag: "03"
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-editorial-gold" />,
    title: "Hardened Guard",
    description: "Integrated with Google's 2026 Guardian safety infrastructure by default.",
    tag: "04"
  }
];

// --- Components ---

const EditorialHeader = () => (
  <header className="flex flex-col md:flex-row justify-between items-start md:items-end p-8 md:p-12 border-b border-white/10 relative z-10">
    <div className="flex flex-col mb-6 md:mb-0">
      <span className="text-[10px] uppercase tracking-[0.3em] text-editorial-gold font-semibold mb-2">Volume IV / AI Research Division</span>
      <h2 className="text-3xl md:text-5xl font-serif italic tracking-tight">The Architecture of Reasoning</h2>
    </div>
    <div className="text-left md:text-right">
      <div className="text-5xl md:text-[80px] font-extrabold leading-none tracking-tighter">GEMMA_04</div>
      <div className="text-[10px] uppercase tracking-[0.2em] opacity-50 mt-2 font-mono">Model Differentiator & Capabilities</div>
    </div>
  </header>
);

const FeatureSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-white/10">
    {FEATURES.map((f) => (
      <div key={f.title} className="p-8 border-r border-white/10 last:border-r-0 group hover:bg-white/[0.02] transition-colors">
        <span className="block text-[10px] text-editorial-gold font-mono mb-4">{f.tag}</span>
        <h4 className="text-xl font-bold tracking-tight mb-3 text-editorial-white uppercase">{f.title}</h4>
        <p className="text-sm text-white/50 leading-relaxed font-serif italic">{f.description}</p>
      </div>
    ))}
  </div>
);

const ComparisonSection = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-white/10 bg-white/[0.01]">
    <div className="lg:col-span-8 p-12 border-r border-white/10 space-y-12">
      <div className="max-w-2xl">
        <h3 className="text-xs uppercase tracking-[0.3em] text-editorial-gold font-bold mb-6 flex items-center gap-4">
          <div className="w-12 h-[1px] bg-editorial-gold"></div>
          Internal Metrics
        </h3>
        <h1 className="text-6xl md:text-[110px] leading-[0.85] font-bold tracking-tighter mb-8 group">
          PURE <br/> <span className="text-editorial-gold group-hover:italic transition-all duration-500">DENSITY.</span>
        </h1>
        <p className="text-xl text-white/70 leading-relaxed font-serif italic">
          Gemma 4 defines the new "Performance-per-Param" ceiling, delivering reasoning capabilities that exceed models five times its size while remaining fully open-weight.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          {COMPARISON_VARS.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest">
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-editorial-gold transition-colors flex items-center gap-1 group/link"
                >
                  {item.name}
                  <ArrowRight className="w-2 h-2 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                </a>
                <span className="text-editorial-gold">{item.value}%</span>
              </div>
              <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.value}%` }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full" 
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="h-[300px] w-full bg-editorial-dark/50 p-4 border border-white/5 relative overflow-hidden">
           {/* Decorative Grid Lines */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C4A484_1px,transparent_1px)] [background-size:20px_20px]" />
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={PERFORMANCE_DATA}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '0.1em' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Gemma 4"
                dataKey="A"
                stroke="#C4A484"
                fill="#C4A484"
                fillOpacity={0.4}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0C0C0C', border: '1px solid rgba(196,164,132,0.2)', borderRadius: '0px' }}
                itemStyle={{ color: '#fff', fontSize: '10px' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    <div className="lg:col-span-4 flex flex-col">
      <div className="p-12 flex-1 border-b border-white/10">
        <h3 className="text-xs uppercase tracking-[0.3em] text-editorial-gold font-bold mb-8">Competitive Edge</h3>
        <div className="space-y-10">
          <div className="space-y-3">
             <span className="text-[10px] uppercase font-mono text-white/30 tracking-widest block font-bold">Open-Weight Distillation</span>
             <p className="text-sm leading-relaxed text-white/60">Gemma 4 leverages a unique distillation process from larger proprietary models, allowing smaller instances to inherit complex logic without the massive memory footprint.</p>
          </div>
          <div className="space-y-3">
             <span className="text-[10px] uppercase font-mono text-white/30 tracking-widest block font-bold">Privacy Paradigm</span>
             <p className="text-sm leading-relaxed text-white/60">Designed for edge-first execution. Gemma 4 differentiates by running native multi-modal tasks on consumer hardware without cloud dependency.</p>
          </div>
        </div>
      </div>
      <div className="p-12 space-y-6">
        <div className="flex items-end gap-8">
          <div className="flex flex-col">
            <span className="text-5xl font-bold tracking-tighter">12.4X</span>
            <span className="text-[10px] uppercase tracking-widest opacity-40 font-mono">Throughput Increase</span>
          </div>
          <div className="flex flex-col">
            <span className="text-5xl font-bold tracking-tighter">82%</span>
            <span className="text-[10px] uppercase tracking-widest opacity-40 font-mono">MMLU Score</span>
          </div>
        </div>
        <button className="w-full bg-editorial-gold text-editorial-dark font-bold py-4 px-8 flex justify-between items-center group overflow-hidden relative">
          <span className="relative z-10 uppercase tracking-tighter text-sm">Download Model Weights</span>
          <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
        </button>
      </div>
    </div>
  </div>
);

const SUGGESTED_QUERIES = [
  "Analyze Gemma 4's performance in low-resource environments.",
  "Compare multi-modal vector embeddings against open standards.",
  "Distillation efficiency vs. Llama series.",
  "Quantization stability at 4-bit precision."
];

const AIInsights = () => {
  const [query, setQuery] = useState('');
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getInsight = async (forcedQuery?: string) => {
    const activeQuery = forcedQuery || query;
    if (!activeQuery) return;
    setLoading(true);
    setInsight(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide a high-fidelity technical deep-dive into Gemma 4's architecture and performance vs competing open models (like Llama/Mistral) specifically for: ${activeQuery}. 
        Focus on how Gemma 4 differentiates through parameter density, training distillation (2026 methodology), and native multimodal vector alignment. 
        Keep the tone authoritative, technical, and editorial. Avoid generic praise; focus on data-driven differentiators.`,
        config: {
          systemInstruction: "You are a Chief AI Architect at Google Research. You provide specialized, technical breakdowns of model capabilities for researchers."
        }
      });
      setInsight(response.text || "No insights found.");
    } catch (error) {
      console.error(error);
      setInsight("ERR: ANALYTICAL_FAILURE. Documentation node unreachable or credentials invalid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-12 bg-white/[0.02]">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-white/20"></div>
          <h3 className="text-xs uppercase tracking-[0.4em] text-editorial-gold font-bold">Inquiry Terminal</h3>
        </div>
        
        <div className="relative group">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && getInsight()}
            placeholder="Specialize in: Architectural latency, contextual saturation, or multi-modal vectors..."
            className="w-full bg-transparent border-b border-white/10 py-6 text-2xl font-serif italic text-white/90 placeholder:text-white/10 focus:outline-none focus:border-editorial-gold transition-all"
          />
          <button 
            onClick={() => getInsight()}
            disabled={loading}
            className="absolute right-0 bottom-6 text-editorial-gold hover:text-white disabled:opacity-30 flex items-center gap-2 group"
          >
            <span className="text-[10px] uppercase tracking-widest font-bold font-mono group-hover:mr-2 transition-all">Submit</span>
            {loading ? <div className="w-4 h-4 border-b-2 border-editorial-gold rounded-full animate-spin" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

        {/* Suggested Queries */}
        <div className="flex flex-wrap gap-3">
          {SUGGESTED_QUERIES.map((q) => (
            <button 
              key={q}
              onClick={() => { setQuery(q); getInsight(q); }}
              className="text-[10px] uppercase tracking-wider font-mono px-3 py-1.5 border border-white/5 hover:border-editorial-gold hover:text-editorial-gold transition-colors text-white/30"
            >
              {q}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {insight && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              className="mt-12 p-10 border border-white/5 bg-editorial-dark relative shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-1 h-1 bg-editorial-gold" />
              <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/10 uppercase tracking-widest">
                Verification: 04.2026.SOTA
              </div>
              <div className="prose prose-invert max-w-none prose-sm font-serif leading-relaxed italic text-white/80 whitespace-pre-wrap">
                {insight}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-editorial-gold selection:text-editorial-dark">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-200px] left-[-200px] w-[800px] h-[800px] bg-editorial-gold/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] border-t border-l border-white/5" />
      </div>

      <div className="max-w-[1600px] mx-auto border-x border-white/10 relative bg-editorial-dark/95 backdrop-blur-3xl shadow-2xl">
        <EditorialHeader />
        
        <main className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
          {/* Left Sidebar Index */}
          <aside className="hidden lg:flex col-span-1 border-r border-white/10 flex-col justify-between py-12 items-center">
            <div className="space-y-12 [writing-mode:vertical-lr] rotate-180">
              <span className="text-[10px] uppercase font-mono tracking-[0.4em] text-editorial-gold font-bold">Research v4.0.1</span>
              <span className="text-[10px] uppercase font-mono tracking-[0.4em] text-white/20">Archiving Section</span>
            </div>
            <div className="space-y-8">
               <Globe className="w-5 h-5 text-editorial-gold opacity-50" />
               <Layers className="w-5 h-5 text-white/20" />
               <Cpu className="w-5 h-5 text-white/20" />
            </div>
            <div className="[writing-mode:vertical-lr] rotate-180 text-[10px] uppercase tracking-widest text-white/10">
              Est. MMXXIV
            </div>
          </aside>

          {/* Central Content */}
          <div className="col-span-1 lg:col-span-11">
            <FeatureSection />
            <ComparisonSection />
            <AIInsights />
            
            {/* Secondary Branding Footer */}
            <div className="p-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-black">
               <div className="space-y-4">
                  <h3 className="text-3xl font-bold tracking-tighter uppercase">Local-First <br/> <span className="text-editorial-gold">Intelligence</span></h3>
                  <p className="text-sm text-white/40 max-w-sm font-serif italic">Optimized weights for consumer GPUs and NPUs enable real-time sovereign reasoning without external telemetry.</p>
               </div>
               <div className="flex md:justify-end gap-12 font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">
                  <div className="flex flex-col gap-2">
                    <span className="text-white/50">Core Cluster</span>
                    <span>North America West</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-white/50">Status</span>
                    <span className="text-emerald-500">Nominal</span>
                  </div>
               </div>
            </div>
          </div>
        </main>

        <footer className="h-20 border-t border-white/10 flex items-center px-12 justify-between bg-black/50">
          <div className="text-[10px] tracking-[0.2em] uppercase opacity-40 font-mono">
            © 2026 Google Research Group / Distributed Systems
          </div>
          <div className="hidden md:flex gap-12 text-[10px] tracking-[0.2em] uppercase font-mono">
            <a href="#" className="opacity-100 text-editorial-gold">Manifest v4</a>
            <a href="#" className="opacity-40">Documentation</a>
            <a href="#" className="opacity-40 italic">Exp. Build</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
