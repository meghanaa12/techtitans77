
import React from 'react';
import { BrainCircuit, Sparkles, ShieldCheck, Users, ArrowRight, GraduationCap, School, Award, BookOpen, Atom, Pencil, Library, FileText } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

const HandmadeDoodle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`absolute pointer-events-none opacity-20 text-indigo-400 ${className}`}>
    {children}
  </div>
);

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 relative overflow-hidden">
      
      {/* Background Animated Doodles */}
      <HandmadeDoodle className="top-[10%] left-[5%] animate-float">
        <GraduationCap size={120} strokeWidth={0.5} className="doodle-svg" />
      </HandmadeDoodle>
      <HandmadeDoodle className="top-[25%] right-[8%] animate-float">
        <Pencil size={80} strokeWidth={0.5} className="doodle-svg" />
      </HandmadeDoodle>
      <HandmadeDoodle className="bottom-[15%] left-[10%] animate-float">
        <Atom size={100} strokeWidth={0.5} className="doodle-svg" />
      </HandmadeDoodle>

      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-[120px] animate-pulse"></div>

      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 cursor-trigger">
          <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-xl shadow-indigo-200">
            <BrainCircuit className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">cogni<span className="text-indigo-600">HUB</span></span>
        </div>
        <button onClick={onStart} className="bg-slate-900 text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-indigo-600 transition-all shadow-xl cursor-trigger">
          Access Hub
        </button>
      </nav>

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col md:flex-row items-center gap-16 relative z-10">
        <div className="flex-1 space-y-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest">
            <Sparkles size={14} /> AI-Powered Hub
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[1] tracking-tighter">
            Smart Library for <span className="text-indigo-600 decoration-8 underline decoration-indigo-100 underline-offset-8">Active Minds.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-medium">
            Bridging campus minds with global intelligence. Join the unified academic network.
          </p>
          <button onClick={onStart} className="flex items-center justify-center gap-3 bg-indigo-600 text-white px-10 py-6 rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl cursor-trigger group">
            Get Started <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="flex-1 w-full max-w-lg relative">
          <div className="relative bg-white border border-slate-100 rounded-[4rem] p-10 shadow-2xl space-y-6">
            <div className="bg-slate-50 p-5 rounded-3xl flex items-center gap-5 border border-slate-100 shadow-sm cursor-trigger">
              <div className="bg-rose-100 p-4 rounded-2xl text-rose-600"><GraduationCap size={28} /></div>
              <div><p className="font-black text-slate-900 text-lg uppercase">Verified Portal</p><p className="text-sm text-slate-500 font-medium">Campus mail access</p></div>
            </div>
            <div className="bg-slate-50 p-5 rounded-3xl flex items-center gap-5 border border-slate-100 ml-10 shadow-sm cursor-trigger">
              <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600"><School size={28} /></div>
              <div><p className="font-black text-slate-900 text-lg uppercase">Faculty Suite</p><p className="text-sm text-slate-500 font-medium">Moderate resources</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="network" className="py-40 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Universal Access. <span className="text-indigo-600">Verified.</span></h2>
            <div className="space-y-6 pt-4">
              <div className="flex gap-6 group cursor-trigger">
                <div className="flex-shrink-0 w-14 h-14 rounded-[1.5rem] bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-black">1</div>
                <div><h4 className="font-black text-slate-900 text-xl uppercase">Verified EDU Core</h4><p className="text-slate-500 font-medium">Internal campus materials.</p></div>
              </div>
              <div className="flex gap-6 group cursor-trigger">
                <div className="flex-shrink-0 w-14 h-14 rounded-[1.5rem] bg-slate-100 text-slate-600 flex items-center justify-center text-xl font-black">2</div>
                <div><h4 className="font-black text-slate-900 text-xl uppercase">Public Tier</h4><p className="text-slate-500 font-medium">Open learning for all.</p></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6 pt-16">
              <div className="aspect-[4/5] bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format" className="w-full h-full object-cover" alt="Study" />
              </div>
              <div className="aspect-square bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format" className="w-full h-full object-cover" alt="Collab" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="aspect-square bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format" className="w-full h-full object-cover" alt="Grad" />
              </div>
              <div className="aspect-[4/5] bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img src="https://images.unsplash.com/photo-1498243639159-414ccead8c31?w=600&auto=format" className="w-full h-full object-cover" alt="Library" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-white py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <BrainCircuit className="text-indigo-500 w-10 h-10" />
            <span className="text-3xl font-black tracking-tighter uppercase">cogniHUB</span>
          </div>
          <p className="text-slate-500 font-black tracking-widest text-xs uppercase">© 2026 Global Intelligence Network • Yugastr 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
