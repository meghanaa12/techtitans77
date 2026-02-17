
import React, { useState } from 'react';
import { UserRole, User, NetworkType } from '../types';
import { supabase } from '../services/supabase';
import { 
  BrainCircuit, GraduationCap, School, Globe, ArrowLeft, 
  ChevronRight, Lock, Users, AlertCircle, Mail, Key, Building2,
  BookOpen, Zap, ShieldCheck
} from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

// Exact registry from the user's Supabase screenshot
const DEMO_ACCOUNTS: Record<string, any> = {
  'admin@cognihub.edu': {
    id: 'a1111111-1111-1111-1111-111111111111',
    name: 'Platform Chief',
    email: 'admin@cognihub.edu',
    role: UserRole.ADMIN,
    network: 'EDU',
    points: 2500,
    xp: 5000,
    streak: 15,
    badges: ['Platform Chief', 'System Architect'],
    collegeName: 'TechTitans Main'
  },
  'teacher@cognihub.edu': {
    id: 'b2222222-2222-2222-2222-222222222222',
    name: 'Prof. Sarah Chen',
    email: 'teacher@cognihub.edu',
    role: UserRole.TEACHER,
    network: 'EDU',
    points: 1200,
    xp: 3200,
    streak: 8,
    badges: ['Verified Educator', 'Top Mentor'],
    collegeName: 'TechTitans University',
    department: 'Computer Science'
  },
  'student@cognihub.edu': {
    id: 'c3333333-3333-3333-3333-333333333333',
    name: 'Alex Johnson',
    email: 'student@cognihub.edu',
    role: UserRole.STUDENT,
    network: 'EDU',
    points: 650,
    xp: 1500,
    streak: 5,
    badges: ['Scholar', 'Resource Contributor'],
    collegeName: 'TechTitans University',
    department: 'Information Technology',
    currentSemester: 4
  },
  'mike.outsider@gmail.com': {
    id: 'd4444444-4444-4444-4444-444444444444',
    name: 'Mike Smith',
    email: 'mike.outsider@gmail.com',
    role: UserRole.OUTSIDER,
    network: 'GENERAL',
    points: 150,
    xp: 400,
    streak: 2,
    badges: ['Public Learner'],
    collegeName: 'External Network'
  }
};

const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('4');
  const [specialization, setSpecialization] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType | null>(null);

  const validate = () => {
    setError('');
    if (!email.trim() || !email.includes('@')) {
      setError('A valid email address is required.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  const handleDemoAccess = () => {
    const demoUser = DEMO_ACCOUNTS[email.toLowerCase()];
    if (demoUser) {
      onLogin(demoUser);
    } else {
      // Default fallback if email isn't in specific list
      onLogin({
        id: 'demo-guest',
        name: fullName || 'Demo User',
        email: email || 'guest@cognihub.edu',
        role: UserRole.STUDENT,
        network: 'EDU',
        points: 100,
        xp: 100,
        streak: 1,
        badges: ['Demo Access'],
        collegeName: 'Demo Institute'
      });
    }
  };

  const handleAuth = async (role: UserRole) => {
    if (!validate()) return;
    setIsLoading(true);
    setError('');
    
    // DEMO BYPASS: Immediate check for universal password
    if (password === '1122334455') {
      const demoUser = DEMO_ACCOUNTS[email.toLowerCase()];
      if (demoUser) {
        setTimeout(() => {
          onLogin(demoUser);
          setIsLoading(false);
        }, 500);
        return;
      }
    }

    try {
      const network: NetworkType = role === UserRole.OUTSIDER ? 'GENERAL' : 'EDU';
      
      if (mode === 'REGISTER') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { 
              full_name: fullName, 
              role, 
              network, 
              college_name: collegeName,
              department,
              current_semester: parseInt(semester),
              specialization
            }
          }
        });
        
        if (signUpError) throw signUpError;
        onLogin({
          id: data.user!.id,
          name: fullName,
          email: email,
          role,
          network,
          points: 500,
          xp: 100,
          streak: 1,
          badges: ['Newcomer'],
          collegeName
        });
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        onLogin({
          id: data.user.id,
          name: profile?.full_name || 'Scholar',
          email: data.user.email || '',
          role: profile?.role || UserRole.STUDENT,
          network: profile?.network || 'EDU',
          points: profile?.points || 0,
          xp: profile?.xp || 0,
          streak: profile?.streak || 1,
          badges: profile?.badges || [],
          collegeName: profile?.college_name
        });
      }
    } catch (e: any) {
      console.error("Auth Error:", e);
      // Detailed error for Vercel troubleshooting
      if (e.message?.includes('fetch') || e.name === 'TypeError') {
        setError('Network Connection Failed. Database unreachable.');
      } else {
        setError(e.message || 'Authentication failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6 relative font-sans overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
      
      <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-all z-20 font-bold uppercase tracking-widest text-xs">
        <ArrowLeft size={14} /> Back to Landing
      </button>

      <div className="max-w-xl w-full relative z-10 py-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-5 bg-indigo-600 rounded-[2rem] shadow-2xl mb-6">
            <BrainCircuit className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase">cogni<span className="text-indigo-500">HUB</span></h1>
          <p className="text-slate-400 mt-3 font-medium tracking-wide">Identity Portal</p>
        </div>

        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 shadow-2xl border-t-white/20">
          <div className="flex bg-white/5 p-1 rounded-2xl mb-8">
            <button onClick={() => { setMode('LOGIN'); setError(''); }} className={`flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${mode === 'LOGIN' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>Login</button>
            <button onClick={() => { setMode('REGISTER'); setError(''); }} className={`flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${mode === 'REGISTER' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>Join Network</button>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <input type="email" placeholder="Campus Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-indigo-500 transition-all font-medium" />
              <Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500" />
            </div>

            <div className="relative group">
              <input type="password" placeholder="Secure Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-indigo-500 transition-all font-medium" />
              <Key size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500" />
            </div>

            {error && (
              <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-[2rem] animate-in slide-in-from-top-2">
                <div className="text-rose-400 text-[11px] font-bold flex items-center gap-3">
                  <AlertCircle size={18} /> {error}
                </div>
                <button 
                  onClick={handleDemoAccess}
                  className="mt-4 w-full bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-indigo-500/30"
                >
                  <Zap size={12} /> Launch in Demo Access Mode
                </button>
              </div>
            )}
          </div>

          {!selectedNetwork ? (
            <div className="grid grid-cols-1 gap-4 mt-8">
              <button onClick={() => setSelectedNetwork('EDU')} className="group flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:border-indigo-500 hover:bg-white/10 transition-all text-left shadow-lg">
                <div className="bg-indigo-500/20 p-5 rounded-2xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all"><Lock size={28} /></div>
                <div className="flex-1">
                  <p className="text-xl font-black text-white leading-tight">Institutional Tier</p>
                  <p className="text-xs text-slate-500 uppercase font-black tracking-widest mt-1">Full Campus Ecosystem</p>
                </div>
                <ChevronRight size={20} className="text-slate-700 group-hover:text-indigo-500 transition-all" />
              </button>
              <button onClick={() => setSelectedNetwork('GENERAL')} className="group flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:border-slate-400 hover:bg-white/10 transition-all text-left shadow-lg">
                <div className="bg-slate-500/20 p-5 rounded-2xl text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-900 transition-all"><Globe size={28} /></div>
                <div className="flex-1">
                  <p className="text-xl font-black text-white leading-tight">Public Tier</p>
                  <p className="text-xs text-slate-500 uppercase font-black tracking-widest mt-1">Open Archive Access</p>
                </div>
                <ChevronRight size={20} className="text-slate-700 group-hover:text-white transition-all" />
              </button>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-500 text-[10px] uppercase tracking-[0.2em]">Select Hub Identity</h3>
                <button onClick={() => setSelectedNetwork(null)} className="text-[10px] text-indigo-400 font-black uppercase tracking-widest hover:underline">Change Tier</button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {selectedNetwork === 'EDU' ? (
                  <>
                    <button onClick={() => handleAuth(UserRole.STUDENT)} disabled={isLoading} className="flex flex-col items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-indigo-500/20 hover:border-indigo-500 transition-all group disabled:opacity-50">
                      <div className="p-4 bg-indigo-500/20 rounded-2xl text-indigo-400 group-hover:bg-indigo-50 group-hover:text-white transition-all shadow-inner"><GraduationCap size={24} /></div>
                      <span className="text-xs font-black text-white uppercase tracking-widest">Student</span>
                    </button>
                    <button onClick={() => handleAuth(UserRole.TEACHER)} disabled={isLoading} className="flex flex-col items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-emerald-500/20 hover:border-emerald-500 transition-all group disabled:opacity-50">
                      <div className="p-4 bg-emerald-500/20 rounded-2xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner"><School size={24} /></div>
                      <span className="text-xs font-black text-white uppercase tracking-widest">Teacher</span>
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleAuth(UserRole.OUTSIDER)} disabled={isLoading} className="col-span-2 flex items-center justify-center gap-4 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-indigo-600 transition-all text-white font-black text-sm uppercase tracking-[0.2em] disabled:opacity-50 shadow-xl">
                    {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Globe size={24} />}
                    {isLoading ? 'Verifying...' : 'Access Global Archive'}
                  </button>
                )}
              </div>
              
              {selectedNetwork === 'EDU' && (
                <button onClick={() => handleAuth(UserRole.ADMIN)} className="w-full mt-4 flex items-center justify-center gap-3 p-4 bg-slate-900 border border-indigo-500/30 rounded-2xl hover:bg-indigo-900 transition-all group">
                   <ShieldCheck className="text-indigo-400 group-hover:scale-110 transition-transform" size={20} />
                   <span className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Platform Chief Access</span>
                </button>
              )}
            </div>
          )}
          
          <p className="mt-10 text-center text-slate-600 text-[9px] uppercase font-black tracking-[0.3em]">Encrypted Institutional Ledger • Yugastr 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
