
import React from 'react';
import { BrainCircuit, Sparkles, ArrowRight, GraduationCap, School, Atom, Pencil, Zap, Network, Share2 } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

const NetworkFlowBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
          <stop offset="50%" stopColor="rgba(99, 102, 241, 0.5)" />
          <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Horizontal Flow Lines */}
      {[...Array(6)].map((_, i) => (
        <g key={`flow-h-${i}`}>
          <line 
            x1="-100" y1={20 * (i + 1) + "%"} 
            x2="120%" y2={20 * (i + 1) + "%"} 
            stroke="url(#flowGrad)" 
            strokeWidth="1" 
          />
          <circle r="2" fill="#6366f1" filter="url(#glow)">
            <animateMotion 
              dur={`${15 + i * 5}s`} 
              repeatCount="indefinite"
              path={`M -10,${20 * (i + 1)}% L 110%,${20 * (i + 1)}%`}
            />
          </circle>
        </g>
      ))}

      {/* Diagonal Network Lines */}
      <path d="M 0,0 L 100,100 M 200,50 L 50,200 M 800,100 L 900,400" stroke="rgba(99,102,241,0.1)" strokeWidth="1" strokeDasharray="5,5" />
    </svg>
  </div>
);

// Fixed HandmadeDoodle component to accept and apply the style prop for animation delays
const HandmadeDoodle = ({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
  <div className={`absolute pointer-events-none opacity-20 text-indigo-400 ${className}`} style={style}>
    {children}
  </div>
);

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 relative overflow-hidden">
      
      {/* Animated Flow Layer */}
      <NetworkFlowBackground />

      {/* Background Animated Doodles */}
      <HandmadeDoodle className="top-[10%] left-[5%] animate-float">
        <GraduationCap size={120} strokeWidth={0.5} className="doodle-svg" />
      </HandmadeDoodle>
      <HandmadeDoodle className="top-[25%] right-[8%] animate-float" style={{ animationDelay: '-3s' }}>
        <Pencil size={80} strokeWidth={0.5} className="doodle-svg" />
      </HandmadeDoodle>
      <HandmadeDoodle className="bottom-[15%] left-[10%] animate-float" style={{ animationDelay: '-7s' }}>
        <Atom size={100} strokeWidth={0.5} className="doodle-svg" />
      </HandmadeDoodle>

      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-indigo-200/20 rounded-full blur-[160px] animate-pulse"></div>

      <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-3 cursor-trigger group">
          <div className="bg-indigo-600 p-3 rounded-[1.25rem] shadow-2xl shadow-indigo-200 group-hover:rotate-12 transition-transform duration-500">
            <BrainCircuit className="text-white w-7 h-7" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">cogni<span className="text-indigo-600">HUB</span></span>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#network" className="hover:text-indigo-600 transition-colors">Network</a>
            <a href="#merit" className="hover:text-indigo-600 transition-colors">Merit System</a>
          </div>
          <button onClick={onStart} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl cursor-trigger hover:scale-105 active:scale-95">
            Access Hub
          </button>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 pt-24 pb-40 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-12 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-indigo-100 text-indigo-600 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-sm">
              <Zap size={14} className="fill-current" /> Intelligent Knowledge Flow
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black text-slate-900 leading-[0.85] tracking-tighter">
              Bridging <span className="text-indigo-600 block">Campus Minds.</span>
            </h1>
            
            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-medium mx-auto lg:mx-0">
              The first decentralized academic resource network. Share, verify, and earn merit as you build the future of education together.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <button onClick={onStart} className="group flex items-center gap-4 bg-indigo-600 text-white px-12 py-7 rounded-[2.5rem] font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 cursor-trigger">
                Get Started <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="flex -space-x-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-14 h-14 rounded-2xl border-4 border-white bg-slate-200 overflow-hidden shadow-lg">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                  </div>
                ))}
                <div className="w-14 h-14 rounded-2xl border-4 border-white bg-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-lg">
                  +2k
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-xl relative">
            <div className="relative">
              {/* Dynamic Connection Animation */}
              <div className="absolute inset-0 z-0">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <path d="M 100,100 Q 200,50 300,100" stroke="rgba(99,102,241,0.2)" strokeWidth="2" fill="none" />
                  <path d="M 100,100 Q 200,350 300,300" stroke="rgba(99,102,241,0.2)" strokeWidth="2" fill="none" />
                  <circle r="4" fill="#6366f1">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M 100,100 Q 200,50 300,100" />
                  </circle>
                  <circle r="4" fill="#6366f1">
                    <animateMotion dur="4s" repeatCount="indefinite" path="M 100,100 Q 200,350 300,300" />
                  </circle>
                </svg>
              </div>

              {/* Interactive Nodes */}
              <div className="relative z-10 grid gap-6">
                <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] flex items-center gap-6 cursor-trigger hover:translate-y-[-8px] transition-transform duration-500">
                  <div className="bg-rose-100 p-5 rounded-2xl text-rose-600"><GraduationCap size={32} /></div>
                  <div><p className="font-black text-slate-900 text-xl uppercase tracking-tighter">Verified EDU</p><p className="text-sm text-slate-500 font-bold">Encrypted campus mail access</p></div>
                </div>
                <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] flex items-center gap-6 ml-16 cursor-trigger hover:translate-y-[-8px] transition-transform duration-500">
                  <div className="bg-emerald-100 p-5 rounded-2xl text-emerald-600"><School size={32} /></div>
                  <div><p className="font-black text-slate-900 text-xl uppercase tracking-tighter">Faculty Tier</p><p className="text-sm text-slate-500 font-bold">Curated professional resources</p></div>
                </div>
                <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] flex items-center gap-6 cursor-trigger hover:translate-y-[-8px] transition-transform duration-500">
                  <div className="bg-indigo-100 p-5 rounded-2xl text-indigo-600"><Share2 size={32} /></div>
                  <div><p className="font-black text-slate-900 text-xl uppercase tracking-tighter">Global Relay</p><p className="text-sm text-slate-500 font-bold">Collaborative knowledge pool</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Flow Section */}
      <section id="features" className="py-40 bg-slate-950 text-white relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-600 to-transparent opacity-50"></div>
         
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16 relative z-10">
            {[
              { title: 'AI Synthesis', icon: BrainCircuit, desc: 'Automatic document classification and summaries using Gemini Intelligence.', color: 'text-indigo-400' },
              { title: 'Merit Economy', icon: Zap, desc: 'Earn points for sharing. Spend for premium institutional insights.', color: 'text-amber-400' },
              { title: 'Role Isolation', icon: Network, desc: 'Verified network levels for students, teachers, and public learners.', color: 'text-emerald-400' },
            ].map((feature, i) => (
              <div key={i} className="space-y-6 group cursor-trigger">
                <div className={`${feature.color} bg-white/5 w-20 h-20 rounded-[2rem] flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-slate-900 transition-all duration-500 group-hover:scale-110`}>
                  <feature.icon size={36} />
                </div>
                <h3 className="text-3xl font-black tracking-tighter uppercase">{feature.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">{feature.desc}</p>
              </div>
            ))}
         </div>
      </section>

      <footer className="bg-white text-slate-900 py-32 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-12">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-3 rounded-2xl text-white">
              <BrainCircuit className="w-8 h-8" />
            </div>
            <span className="text-4xl font-black tracking-tighter uppercase">cogni<span className="text-indigo-600">HUB</span></span>
          </div>
          <p className="text-slate-500 font-black tracking-[0.4em] text-[10px] uppercase">Decentralized Intelligence Network • Yugastr 2026</p>
          <div className="flex gap-8">
            <button onClick={onStart} className="text-indigo-600 font-black text-sm uppercase tracking-widest hover:underline">Launch Hub</button>
            <span className="text-slate-200">|</span>
            <button className="text-slate-400 font-black text-sm uppercase tracking-widest hover:text-slate-900 transition-colors">Documentation</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
