
import React from 'react';
import { BrainCircuit, Sparkles, ShieldCheck, Users, ArrowRight, GraduationCap, School, Globe, Award, BookOpen, Atom, PenTool, Code, Library, Lightbulb } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

const HandmadeScholarHat = () => (
  <svg width="120" height="120" viewBox="0 0 24 24" className="doodle-path">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const HandmadePencil = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" className="doodle-path">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    <path d="m15 5 4 4" />
  </svg>
);

const HandmadeCompass = () => (
  <svg width="100" height="100" viewBox="0 0 24 24" className="doodle-path">
    <path d="m18 19 2 2" />
    <path d="m20 10-4 4 2 2 4-4-2-2Z" />
    <path d="m4 4 10 10" />
    <path d="M12 21a9 9 0 0 0 0-18" />
  </svg>
);

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 relative overflow-hidden">
      {/* Background Animated Doodles (Handmade Style) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.08] text-indigo-600">
        <div className="absolute top-[10%] left-[8%] animate-float"><HandmadeScholarHat /></div>
        <div className="absolute top-[25%] right-[12%] animate-float-reverse"><HandmadePencil /></div>
        <div className="absolute bottom-[20%] left-[15%] animate-float-slow"><HandmadeCompass /></div>
        <div className="absolute top-[50%] left-[5%] animate-float-reverse opacity-50"><Atom size={60} strokeWidth={1} /></div>
        <div className="absolute bottom-[10%] right-[10%] animate-float opacity-50"><Lightbulb size={70} strokeWidth={1} /></div>
        <div className="absolute top-[40%] right-[5%] animate-float-slow opacity-40"><BookOpen size={90} strokeWidth={1} /></div>
      </div>

      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px]"></div>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 cursor-trigger">
          <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-xl shadow-indigo-200">
            <BrainCircuit className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">cogni<span className="text-indigo-600">HUB</span></span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm font-bold text-slate-500">
          <a href="#features" className="hover:text-indigo-600 transition-colors cursor-trigger">Features</a>
          <a href="#network" className="hover:text-indigo-600 transition-colors cursor-trigger">Network</a>
          <a href="#about" className="hover:text-indigo-600 transition-colors cursor-trigger">Yugastr 2026</a>
        </div>
        <button 
          onClick={onStart}
          className="bg-slate-900 text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95 cursor-trigger"
        >
          Access Hub
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col md:flex-row items-center gap-16 relative z-10">
        <div className="flex-1 space-y-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest">
            <Sparkles size={14} />
            AI-Powered Academic Intelligence
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[1] tracking-tighter">
            Smart Library for <span className="text-indigo-600 decoration-8 underline decoration-indigo-100 underline-offset-8">Curious Minds.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-medium">
            The central nervous system for your campus academic resources. Collaborate, share, and summarize everything in one unified <span className="text-slate-900 font-bold">HUB</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button 
              onClick={onStart}
              className="flex items-center justify-center gap-3 bg-indigo-600 text-white px-10 py-6 rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 active:scale-95 cursor-trigger group"
            >
              Get Started <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <div className="flex items-center gap-5 px-8 py-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center text-[10px] font-black shadow-sm text-indigo-600">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold text-slate-600">
                <span className="text-slate-900">2.5k+</span> active users
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg relative group">
          <div className="absolute -inset-8 bg-indigo-100/60 rounded-[5rem] blur-3xl group-hover:bg-indigo-200/60 transition-colors animate-pulse"></div>
          <div className="relative bg-white border border-slate-100 rounded-[4rem] p-10 shadow-2xl overflow-hidden">
            <div className="space-y-6">
              <div className="bg-slate-50 p-5 rounded-3xl flex items-center gap-5 border border-slate-100 hover:translate-x-2 transition-transform cursor-trigger shadow-sm">
                <div className="bg-rose-100 p-4 rounded-2xl text-rose-600"><GraduationCap size={28} /></div>
                <div>
                  <p className="font-black text-slate-900 text-lg uppercase tracking-tight">Student Portal</p>
                  <p className="text-sm text-slate-500 leading-tight font-medium">Verified academic access</p>
                </div>
              </div>
              <div className="bg-slate-50 p-5 rounded-3xl flex items-center gap-5 border border-slate-100 ml-10 hover:translate-x-2 transition-transform cursor-trigger shadow-sm">
                <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600"><School size={28} /></div>
                <div>
                  <p className="font-black text-slate-900 text-lg uppercase tracking-tight">Faculty Suite</p>
                  <p className="text-sm text-slate-500 leading-tight font-medium">Moderate and distribute</p>
                </div>
              </div>
              <div className="bg-slate-50 p-5 rounded-3xl flex items-center gap-5 border border-slate-100 hover:translate-x-2 transition-transform cursor-trigger shadow-sm">
                <div className="bg-amber-100 p-4 rounded-2xl text-amber-600"><Award size={28} /></div>
                <div>
                  <p className="font-black text-slate-900 text-lg uppercase tracking-tight">Merit System</p>
                  <p className="text-sm text-slate-500 leading-tight font-medium">Earn rewards for quality</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl max-w-[220px] animate-float">
              <div className="flex items-center gap-2 mb-3 text-indigo-400">
                <Sparkles size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">AI Intelligence</span>
              </div>
              <p className="text-xs leading-relaxed opacity-90 italic font-medium">"Analysis shows this resource covers 85% of the Semester 4 syllabus..."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="bg-slate-950 py-32 relative">
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-5xl font-black text-white tracking-tight">Architected for Excellence</h2>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto font-medium">
              We've integrated the world's most advanced AI models to make your study experience significantly faster and more accurate.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { t: 'Gemini AI Engine', d: 'Get instant, high-precision summaries of any PDF or research paper uploaded.', i: Sparkles, c: 'bg-indigo-600 hover:border-indigo-500' },
              { t: 'Tiered Privacy', d: 'Network isolation ensures that campus-only data stays within verified EDU accounts.', i: ShieldCheck, c: 'bg-slate-800 hover:border-rose-500' },
              { t: 'Active Leaderboards', d: 'Gain visibility and rewards for being the top contributor in your subject area.', i: Award, c: 'bg-amber-500 hover:border-amber-400' }
            ].map((f, i) => (
              <div key={i} className={`bg-white/5 backdrop-blur-xl p-12 rounded-[3rem] border border-white/10 shadow-2xl transition-all group cursor-trigger hover:-translate-y-2 ${f.c}/50`}>
                <div className={`${f.c.split(' ')[0]} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-10 shadow-xl group-hover:rotate-12 transition-transform`}>
                  <f.i size={32} />
                </div>
                <h3 className="text-2xl font-black text-white mb-5 uppercase tracking-tight">{f.t}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">
                  {f.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Section - Network Tiers with Improved Images */}
      <section id="network" className="py-40 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-[0.9]">Universal Access. <br/><span className="text-indigo-600">Strict Verification.</span></h2>
            <p className="text-xl text-slate-500 leading-relaxed font-medium">
              Whether you're a student looking for PYQs or an outsider seeking public knowledge, cogniHUB manages the flow of intelligence safely.
            </p>
            <div className="space-y-8 pt-4">
              {[
                { n: 1, t: 'Verified EDU Core', d: 'Authenticated campus mail access for internal materials.', c: 'bg-indigo-100 text-indigo-600' },
                { n: 2, t: 'Public Learning Tier', d: 'Open access for enthusiasts across the globe.', c: 'bg-slate-100 text-slate-600' }
              ].map((item) => (
                <div key={item.n} className="flex gap-6 group cursor-trigger">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-[1.5rem] ${item.c} flex items-center justify-center text-xl font-black group-hover:scale-110 transition-transform shadow-sm`}>{item.n}</div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xl group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{item.t}</h4>
                    <p className="text-slate-500 font-medium">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 relative">
            <div className="absolute -inset-10 bg-indigo-50/50 blur-[100px] pointer-events-none"></div>
            <div className="space-y-6 pt-16 relative z-10">
               <div className="aspect-[4/5] bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white hover:scale-105 transition-all cursor-trigger flex items-center justify-center">
                 <img 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=500" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { (e.target as any).style.display = 'none'; (e.target as any).nextSibling.style.display = 'flex'; }}
                 />
                 <div className="hidden flex-col items-center text-slate-300"><Library size={48} /><span className="text-xs mt-2 font-bold">Image Loading</span></div>
               </div>
               <div className="aspect-square bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white hover:scale-105 transition-all cursor-trigger flex items-center justify-center">
                 <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=500" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { (e.target as any).style.display = 'none'; (e.target as any).nextSibling.style.display = 'flex'; }}
                 />
                 <div className="hidden flex-col items-center text-slate-300"><Users size={48} /><span className="text-xs mt-2 font-bold">Image Loading</span></div>
               </div>
            </div>
            <div className="space-y-6 relative z-10">
               <div className="aspect-square bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white hover:scale-105 transition-all cursor-trigger flex items-center justify-center">
                 <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=500" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { (e.target as any).style.display = 'none'; (e.target as any).nextSibling.style.display = 'flex'; }}
                 />
                 <div className="hidden flex-col items-center text-slate-300"><GraduationCap size={48} /><span className="text-xs mt-2 font-bold">Image Loading</span></div>
               </div>
               <div className="aspect-[4/5] bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white hover:scale-105 transition-all cursor-trigger flex items-center justify-center">
                 <img 
                    src="https://images.unsplash.com/photo-1498243639159-414ccead8c31?auto=format&fit=crop&q=80&w=500" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { (e.target as any).style.display = 'none'; (e.target as any).nextSibling.style.display = 'flex'; }}
                 />
                 <div className="hidden flex-col items-center text-slate-300"><Library size={48} /><span className="text-xs mt-2 font-bold">Image Loading</span></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-slate-950 text-white py-32 relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
          <div className="space-y-8">
            <div className="flex items-center gap-3 cursor-trigger">
              <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-900">
                <BrainCircuit className="text-white w-6 h-6" />
              </div>
              <span className="text-3xl font-black tracking-tighter">cogni<span className="text-indigo-400">HUB</span></span>
            </div>
            <p className="text-slate-400 max-w-sm text-lg font-medium leading-relaxed">
              An ecosystem designed for the next generation of learners. Building bridges between raw information and actionable knowledge.
            </p>
            <div className="flex gap-4">
               {[Globe, Users].map((Icon, i) => (
                 <button key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-indigo-500 hover:bg-indigo-500/10 transition-all cursor-trigger">
                   <Icon size={20} className="text-indigo-400" />
                 </button>
               ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-16">
            <div className="space-y-8">
              <h5 className="font-black text-xs text-indigo-400 uppercase tracking-[0.2em]">Platform</h5>
              <ul className="space-y-4 text-slate-300 text-base font-bold">
                <li><a href="#" className="hover:text-indigo-400 transition-colors cursor-trigger">Resource Library</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors cursor-trigger">AI Summarizer</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors cursor-trigger">Merit Leaderboard</a></li>
              </ul>
            </div>
            <div className="space-y-8">
              <h5 className="font-black text-xs text-indigo-400 uppercase tracking-[0.2em]">Legacy</h5>
              <ul className="space-y-4 text-slate-300 text-base font-bold">
                <li><a href="#" className="hover:text-indigo-400 transition-colors cursor-trigger">Campus Guidelines</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors cursor-trigger">Yugastr 2026</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors cursor-trigger">Privacy Core</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-20 border-t border-white/5 mt-20 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 font-black uppercase tracking-widest">
          <p>© 2026 cogniHUB. Designed for Excellence.</p>
          <p>Yugastr Hackathon Submission</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
