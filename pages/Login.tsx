
import React, { useState, useEffect } from 'react';
import { UserRole, User, NetworkType } from '../types';
import { BrainCircuit, Shield, GraduationCap, School, Globe, ArrowLeft, ChevronRight, Lock, Users, Sparkles } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const handleRoleLogin = (role: UserRole) => {
    const network: NetworkType = role === UserRole.OUTSIDER ? 'GENERAL' : 'EDU';
    
    let demoUser: Partial<User> = {};
    const e = email.toLowerCase().trim();

    if (e === 'admin@cognihub.edu') {
      demoUser = { id: 'a1111111-1111-1111-1111-111111111111', name: 'Platform Chief', role: UserRole.ADMIN, network: 'EDU', points: 2500, xp: 8000, streak: 45, badges: ['System Architect', 'Verified'] };
    } else if (e === 'teacher@cognihub.edu') {
      demoUser = { id: 'b2222222-2222-2222-2222-222222222222', name: 'Prof. Sarah Chen', role: UserRole.TEACHER, network: 'EDU', points: 1200, xp: 4500, streak: 20, badges: ['Star Educator', 'Verified'] };
    } else if (e === 'student@cognihub.edu') {
      demoUser = { id: 'c3333333-3333-3333-3333-333333333333', name: 'Alex Johnson', role: UserRole.STUDENT, network: 'EDU', points: 650, xp: 1800, streak: 7, badges: ['Resource Scout'] };
    } else if (e === 'mike.outsider@gmail.com') {
      demoUser = { id: 'd4444444-4444-4444-4444-444444444444', name: 'Mike Smith', role: UserRole.OUTSIDER, network: 'GENERAL', points: 150, xp: 400, streak: 2, badges: ['Guest Learner'] };
    }

    onLogin({
      id: demoUser.id || Math.random().toString(36).substr(2, 9),
      name: demoUser.name || email.split('@')[0] || 'New User',
      email: email || 'user@campus.edu',
      role: demoUser.role || role,
      network: demoUser.network || network,
      points: demoUser.points ?? (role === UserRole.OUTSIDER ? 0 : 500),
      xp: demoUser.xp ?? (role === UserRole.OUTSIDER ? 0 : 120),
      streak: demoUser.streak ?? (role === UserRole.OUTSIDER ? 0 : 1),
      badges: demoUser.badges ?? (role === UserRole.OUTSIDER ? [] : ['Newcomer']),
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6 relative font-sans overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]"></div>

      <button 
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-all font-bold text-sm z-20 cursor-trigger"
      >
        <ArrowLeft size={18} />
        Back to Home
      </button>

      <div className={`max-w-xl w-full relative z-10 staggered-in ${isAnimating ? 'active' : ''}`}>
        <div className="text-center mb-10 transition-all duration-700" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center justify-center p-4 bg-indigo-600 rounded-3xl shadow-2xl shadow-indigo-600/30 mb-6 group cursor-trigger">
            <BrainCircuit className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2 text-center uppercase">
            cogni<span className="text-indigo-500">HUB</span>
          </h1>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-slate-400 text-xs font-medium">
            <Sparkles size={12} className="text-indigo-400" /> Demo Portal Active
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl transition-all duration-700" style={{ animationDelay: '0.2s' }}>
          <div className="mb-8 group">
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 transition-colors group-focus-within:text-indigo-400">Login Identifier</label>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter demo email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-slate-500 focus:ring-4 focus:ring-indigo-600/20 focus:border-indigo-500/50 outline-none transition-all font-medium cursor-trigger"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors">
                 <Users size={20} />
              </div>
            </div>
            <p className="mt-3 text-[10px] text-slate-500 text-center italic">Try: <span className="text-indigo-400">admin@cognihub.edu</span> or <span className="text-indigo-400">student@cognihub.edu</span></p>
          </div>

          {!selectedNetwork ? (
            <div className="grid grid-cols-1 gap-4" style={{ animationDelay: '0.3s' }}>
              <button 
                onClick={() => setSelectedNetwork('EDU')}
                className="group flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all text-left shadow-sm cursor-trigger"
              >
                <div className="bg-indigo-500/20 p-4 rounded-2xl text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                  <Lock size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-white leading-tight">EDU Network</p>
                  <p className="text-sm text-slate-400">Restricted to Students, Teachers & Staff</p>
                </div>
                <ChevronRight size={20} className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </button>

              <button 
                onClick={() => setSelectedNetwork('GENERAL')}
                className="group flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-slate-400 hover:bg-white/10 transition-all text-left shadow-sm cursor-trigger"
              >
                <div className="bg-slate-500/20 p-4 rounded-2xl text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-900 transition-all shadow-inner">
                  <Globe size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-white leading-tight">General Network</p>
                  <p className="text-sm text-slate-400">Public communities and learning groups</p>
                </div>
                <ChevronRight size={20} className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Select Role in <span className="text-indigo-400">{selectedNetwork}</span> Portal</h3>
                <button onClick={() => setSelectedNetwork(null)} className="text-xs text-indigo-400 font-bold hover:underline cursor-trigger">Change Network</button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedNetwork === 'EDU' ? (
                  <>
                    <button 
                      onClick={() => handleRoleLogin(UserRole.STUDENT)}
                      className="group flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-indigo-500 hover:bg-indigo-500/10 transition-all text-left cursor-trigger"
                    >
                      <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all"><GraduationCap size={18} /></div>
                      <span className="text-sm font-bold text-white">Student</span>
                    </button>
                    <button 
                      onClick={() => handleRoleLogin(UserRole.TEACHER)}
                      className="group flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-emerald-500 hover:bg-emerald-500/10 transition-all text-left cursor-trigger"
                    >
                      <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all"><School size={18} /></div>
                      <span className="text-sm font-bold text-white">Teacher</span>
                    </button>
                    <button 
                      onClick={() => handleRoleLogin(UserRole.ADMIN)}
                      className="group flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-amber-500 hover:bg-amber-500/10 transition-all text-left sm:col-span-2 cursor-trigger"
                    >
                      <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-all"><Shield size={18} /></div>
                      <span className="text-sm font-bold text-white">Administrator</span>
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => handleRoleLogin(UserRole.OUTSIDER)}
                    className="group flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-indigo-400 hover:bg-indigo-500/10 transition-all text-left sm:col-span-2 cursor-trigger"
                  >
                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all"><Globe size={18} /></div>
                    <span className="text-sm font-bold text-white">General Learner / Outsider</span>
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-500 text-xs font-medium leading-relaxed">
              By accessing, you agree to the <br/>
              <a href="#" className="text-indigo-400 hover:underline font-bold cursor-trigger">Campus Integrity Guidelines</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
