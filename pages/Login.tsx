
import React, { useState, useEffect } from 'react';
import { UserRole, User, NetworkType } from '../types';
import { supabase } from '../services/supabase';
import { 
  BrainCircuit, Shield, GraduationCap, School, Globe, ArrowLeft, 
  ChevronRight, Lock, Users, Sparkles, AlertCircle, Mail, Key, Building2,
  Calendar, BookOpen, Clock
} from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('1');
  const [specialization, setSpecialization] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType | null>(null);

  const validate = () => {
    if (!email.trim() || !email.includes('@')) {
      setError('A valid email is required.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    if (mode === 'REGISTER') {
      if (!fullName.trim()) { setError('Full name is required.'); return false; }
      if (!collegeName.trim()) { setError('College name is required.'); return false; }
      if (!department.trim()) { setError('Department is required.'); return false; }
    }
    setError('');
    return true;
  };

  const handleAuth = async (role: UserRole) => {
    if (!validate()) return;
    setIsLoading(true);
    
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
        
        const { error: profileError } = await supabase.from('profiles').insert([{
          id: data.user?.id,
          email,
          full_name: fullName,
          role,
          network,
          college_name: collegeName,
          department,
          current_semester: parseInt(semester),
          specialization,
          points: role === UserRole.OUTSIDER ? 0 : 500,
          xp: 100
        }]);
        if (profileError) throw profileError;

        onLogin({
          id: data.user?.id || '',
          name: fullName,
          email,
          role,
          network,
          points: role === UserRole.OUTSIDER ? 0 : 500,
          xp: 100,
          streak: 1,
          badges: ['Newcomer'],
          collegeName,
          department,
          currentSemester: parseInt(semester),
          specialization
        });
      } else {
        const e = email.toLowerCase().trim();
        if (e.includes('demo')) {
           onLogin({
              id: Math.random().toString(),
              name: 'Demo Scholar',
              email: e,
              role,
              network,
              points: 1000,
              xp: 2500,
              streak: 12,
              badges: ['Verified'],
              collegeName: 'Demo Institute of Technology',
              department: 'CS Engineering',
              currentSemester: 4
           });
           return;
        }

        const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;

        const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user?.id).single();
        if (profile) {
          onLogin({
            id: profile.id,
            name: profile.full_name,
            email: profile.email,
            role: profile.role,
            network: profile.network,
            points: profile.points,
            xp: profile.xp,
            streak: profile.streak,
            badges: profile.badges,
            avatar: profile.avatar_url,
            collegeName: profile.college_name,
            department: profile.department,
            currentSemester: profile.current_semester,
            specialization: profile.specialization,
            officeHours: profile.office_hours,
            bio: profile.bio
          });
        }
      }
    } catch (e: any) {
      setError(e.message || 'Authentication failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6 relative font-sans overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
      
      <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-all z-20 font-bold uppercase tracking-widest text-xs">
        <ArrowLeft size={14} /> Back to Hub
      </button>

      <div className="max-w-xl w-full relative z-10 py-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-5 bg-indigo-600 rounded-[2rem] shadow-2xl mb-6">
            <BrainCircuit className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase">cogni<span className="text-indigo-500">HUB</span></h1>
          <p className="text-slate-400 mt-3 font-medium tracking-wide">Enter the Unified Academic Network</p>
        </div>

        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 shadow-2xl border-t-white/20">
          <div className="flex bg-white/5 p-1 rounded-2xl mb-8">
            <button onClick={() => setMode('LOGIN')} className={`flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${mode === 'LOGIN' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>Login</button>
            <button onClick={() => setMode('REGISTER')} className={`flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${mode === 'REGISTER' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>Join Network</button>
          </div>

          <div className="space-y-4">
            {mode === 'REGISTER' && (
              <>
                <div className="relative group">
                  <input type="text" placeholder="Full Legal Name" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-indigo-500 focus:bg-white/10 transition-all font-medium" />
                  <Users size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500" />
                </div>
                <div className="relative group">
                  <input type="text" placeholder="Institution Name" value={collegeName} onChange={e => setCollegeName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-indigo-500 focus:bg-white/10 transition-all font-medium" />
                  <Building2 size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500" />
                </div>
                <div className="relative group">
                  <input type="text" placeholder="Department (e.g. Computer Science)" value={department} onChange={e => setDepartment(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-indigo-500 focus:bg-white/10 transition-all font-medium" />
                  <BookOpen size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500" />
                </div>
              </>
            )}
            
            <div className="relative group">
              <input type="email" placeholder="Campus Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-indigo-500 focus:bg-white/10 transition-all font-medium" />
              <Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500" />
            </div>

            <div className="relative group">
              <input type="password" placeholder="Secure Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-indigo-500 focus:bg-white/10 transition-all font-medium" />
              <Key size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500" />
            </div>

            {error && <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-bold flex items-center gap-2"><AlertCircle size={16} /> {error}</div>}
          </div>

          {!selectedNetwork ? (
            <div className="grid grid-cols-1 gap-4 mt-8">
              <button onClick={() => validate() && setSelectedNetwork('EDU')} className="group flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:border-indigo-500 hover:bg-white/10 transition-all text-left shadow-lg">
                <div className="bg-indigo-500/20 p-5 rounded-2xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all"><Lock size={28} /></div>
                <div className="flex-1">
                  <p className="text-xl font-black text-white leading-tight">EDU Tier</p>
                  <p className="text-xs text-slate-500 uppercase font-black tracking-widest mt-1">Institutional Access</p>
                </div>
                <ChevronRight size={20} className="text-slate-700 group-hover:text-indigo-500 transition-all" />
              </button>
              <button onClick={() => validate() && setSelectedNetwork('GENERAL')} className="group flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:border-slate-400 hover:bg-white/10 transition-all text-left shadow-lg">
                <div className="bg-slate-500/20 p-5 rounded-2xl text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-900 transition-all"><Globe size={28} /></div>
                <div className="flex-1">
                  <p className="text-xl font-black text-white leading-tight">Global Tier</p>
                  <p className="text-xs text-slate-500 uppercase font-black tracking-widest mt-1">Public Archive Access</p>
                </div>
                <ChevronRight size={20} className="text-slate-700 group-hover:text-white transition-all" />
              </button>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-500 text-xs uppercase tracking-[0.2em]">Select Portal Identity</h3>
                <button onClick={() => setSelectedNetwork(null)} className="text-[10px] text-indigo-400 font-black uppercase tracking-widest hover:underline">Switch Network</button>
              </div>

              {selectedNetwork === 'EDU' && mode === 'REGISTER' && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                   <div className="relative group col-span-1">
                    <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Semester</label>
                    <select value={semester} onChange={e => setSemester(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-indigo-500">
                      {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s} className="bg-slate-900">Sem {s}</option>)}
                    </select>
                  </div>
                  <div className="relative group col-span-1">
                    <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Specialization</label>
                    <input type="text" placeholder="e.g. AI/ML" value={specialization} onChange={e => setSpecialization(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-indigo-500" />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {selectedNetwork === 'EDU' ? (
                  <>
                    <button onClick={() => handleAuth(UserRole.STUDENT)} disabled={isLoading} className="flex flex-col items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-indigo-500/20 hover:border-indigo-500 transition-all group">
                      <div className="p-4 bg-indigo-500/20 rounded-2xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all"><GraduationCap size={24} /></div>
                      <span className="text-xs font-black text-white uppercase tracking-widest">Student</span>
                    </button>
                    <button onClick={() => handleAuth(UserRole.TEACHER)} disabled={isLoading} className="flex flex-col items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-emerald-500/20 hover:border-emerald-500 transition-all group">
                      <div className="p-4 bg-emerald-500/20 rounded-2xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all"><School size={24} /></div>
                      <span className="text-xs font-black text-white uppercase tracking-widest">Teacher</span>
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleAuth(UserRole.OUTSIDER)} disabled={isLoading} className="col-span-2 flex items-center justify-center gap-4 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-indigo-600 transition-all text-white font-black text-sm uppercase tracking-[0.2em] shadow-xl">
                    <Globe size={24} /> Access Archive
                  </button>
                )}
              </div>
            </div>
          )}
          
          <p className="mt-10 text-center text-slate-600 text-[10px] uppercase font-black tracking-[0.25em]">Merit System Enabled • Yugastr 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
