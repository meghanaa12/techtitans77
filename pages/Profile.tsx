
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { 
  User as UserIcon, 
  Building2, 
  Mail, 
  ShieldCheck, 
  Edit3, 
  Star, 
  Zap, 
  Award,
  BookOpen,
  Calendar,
  Camera,
  Clock,
  MapPin,
  GraduationCap,
  School
} from 'lucide-react';

interface ProfileProps {
  user: User;
  onUpdate?: (updated: Partial<User>) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    onUpdate?.(editedUser);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header Cover / Avatar Section */}
      <div className="relative">
        <div className="h-56 bg-gradient-to-r from-indigo-600 via-indigo-800 to-slate-900 rounded-[3rem] shadow-2xl relative overflow-hidden">
           <div className="absolute inset-0 opacity-10">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_100%)] from-indigo-500"></div>
           </div>
        </div>
        <div className="absolute -bottom-16 left-12 flex items-end gap-8">
          <div className="relative group">
            <div className="w-40 h-40 bg-white rounded-[2.5rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-slate-50 rounded-[2rem] flex items-center justify-center text-indigo-600 font-black text-5xl border-4 border-indigo-50 overflow-hidden relative">
                {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.name.charAt(0)}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Camera className="text-white" size={32} />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full border-4 border-white shadow-lg"></div>
          </div>
          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">{user.name}</h1>
              <div className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-indigo-200">
                <ShieldCheck size={12} /> {user.role}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-slate-500 font-bold text-sm uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Building2 size={16} className="text-indigo-400" /> {user.collegeName || 'Verified Institute'}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="flex items-center gap-1.5"><MapPin size={16} className="text-indigo-400" /> Academic Block {user.department ? user.department.charAt(0) : 'A'}</span>
            </div>
          </div>
        </div>
        <div className="absolute top-6 right-6">
          <button onClick={() => setIsEditing(!isEditing)} className="bg-white/10 backdrop-blur-xl text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-white/20 transition-all border border-white/20">
            <Edit3 size={18} /> {isEditing ? 'Cancel Edit' : 'Modify Hub'}
          </button>
        </div>
      </div>

      <div className="mt-24 grid lg:grid-cols-3 gap-10">
        {/* Left Column: Personal Data */}
        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-8">
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-[0.2em] border-b pb-6 border-slate-50 flex items-center justify-between">
              Profile DNA
              <UserIcon size={16} className="text-indigo-500" />
            </h3>
            
            {isEditing ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">About You</label>
                  <textarea value={editedUser.bio} onChange={e => setEditedUser({...editedUser, bio: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none h-32" placeholder="Academic interests, goals..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</label>
                    <input value={editedUser.department} onChange={e => setEditedUser({...editedUser, department: e.target.value})} className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold" />
                  </div>
                  {user.role === UserRole.STUDENT ? (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Semester</label>
                      <input type="number" value={editedUser.currentSemester} onChange={e => setEditedUser({...editedUser, currentSemester: parseInt(e.target.value)})} className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Office Hours</label>
                      <input value={editedUser.officeHours} onChange={e => setEditedUser({...editedUser, officeHours: e.target.value})} className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold" placeholder="e.g. 2-4 PM Mon" />
                    </div>
                  )}
                </div>
                <button onClick={handleSave} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-all active:scale-95">Sync Profile</button>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-slate-500 text-sm leading-relaxed font-medium italic">"{user.bio || 'Knowledge is only powerful when shared.'}"</p>
                <div className="space-y-5">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-all shadow-inner"><Mail size={20} /></div>
                    <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Access</p><p className="font-bold text-slate-900">{user.email}</p></div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-all shadow-inner"><School size={20} /></div>
                    <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</p><p className="font-bold text-slate-900">{user.department || 'Not Assigned'}</p></div>
                  </div>
                  {user.role === UserRole.STUDENT && (
                    <>
                      <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-all shadow-inner"><Calendar size={20} /></div>
                        <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Batch Year</p><p className="font-bold text-slate-900">{user.graduationYear || '2026'}</p></div>
                      </div>
                      <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-all shadow-inner"><Zap size={20} /></div>
                        <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Semester</p><p className="font-bold text-indigo-600">Semester {user.currentSemester || '1'}</p></div>
                      </div>
                    </>
                  )}
                  {user.role === UserRole.TEACHER && (
                    <>
                      <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-all shadow-inner"><Star size={20} /></div>
                        <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Specialization</p><p className="font-bold text-slate-900">{user.specialization || 'Academic Professional'}</p></div>
                      </div>
                      <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-all shadow-inner"><Clock size={20} /></div>
                        <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Consultation Hours</p><p className="font-bold text-amber-600">{user.officeHours || 'TBD'}</p></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Zap size={140} /></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-600 p-2 rounded-lg"><Zap size={16} /></div>
                <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em]">Platform XP</p>
              </div>
              <div className="flex items-end gap-3 mb-6">
                <span className="text-5xl font-black tabular-nums">{user.points}</span>
                <span className="text-slate-400 font-bold text-sm uppercase mb-1">Merit Points</span>
              </div>
              <div className="w-full bg-white/5 h-4 rounded-full mb-4 border border-white/10 p-1">
                <div className="bg-indigo-500 h-full rounded-full shadow-[0_0_15px_rgba(99,102,241,0.6)]" style={{ width: `${Math.min((user.xp / 5000) * 100, 100)}%` }}></div>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest text-center">Rank: {user.xp > 2000 ? 'Academic Titan' : 'Resource Pioneer'}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Achievements & Academic Impact */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-12">
              <h3 className="font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3">
                <Award className="text-amber-500" size={24} /> Verified Achievements
              </h3>
              <div className="px-5 py-2 bg-slate-50 rounded-xl text-xs font-black text-slate-400 border border-slate-100">{user.badges.length} Mastered</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {user.badges.map((badge, i) => (
                <div key={i} className="group flex flex-col items-center">
                  <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-4 border border-slate-100 group-hover:border-indigo-400 group-hover:bg-indigo-50 group-hover:shadow-xl group-hover:shadow-indigo-500/10 transition-all duration-300">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 group-hover:scale-125 transition-transform duration-500">
                      <Star size={32} fill={i === 0 ? "currentColor" : "none"} />
                    </div>
                  </div>
                  <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{badge}</p>
                </div>
              ))}
              <div className="w-24 h-24 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center opacity-40">
                 <Zap size={24} className="text-slate-300" />
                 <p className="text-[9px] font-black text-slate-400 uppercase mt-2">Locked</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-12">
              <h3 className="font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3">
                <BookOpen className="text-indigo-500" size={24} /> Academic Footprint
              </h3>
              <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View History</button>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-slate-50 rounded-[2.5rem] p-8 flex items-center gap-6 group hover:bg-indigo-600 transition-all duration-500">
                 <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white transition-all"><BookOpen size={32} /></div>
                 <div>
                   <p className="text-4xl font-black text-slate-900 group-hover:text-white transition-colors">12</p>
                   <p className="text-[10px] font-black text-slate-400 group-hover:text-indigo-200 uppercase tracking-widest mt-1">Resources Uploaded</p>
                 </div>
               </div>
               <div className="bg-slate-50 rounded-[2.5rem] p-8 flex items-center gap-6 group hover:bg-emerald-600 transition-all duration-500">
                 <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all"><Zap size={32} /></div>
                 <div>
                   <p className="text-4xl font-black text-slate-900 group-hover:text-white transition-colors">450</p>
                   <p className="text-[10px] font-black text-slate-400 group-hover:text-emerald-100 uppercase tracking-widest mt-1">Student Downloads</p>
                 </div>
               </div>
            </div>
            
            <div className="mt-12 bg-indigo-50 rounded-[2rem] p-8 flex items-center justify-between">
              <div className="flex items-center gap-5">
                 <div className="bg-white p-4 rounded-2xl text-indigo-600 shadow-sm"><GraduationCap size={24} /></div>
                 <div>
                   <p className="font-bold text-slate-900">Academic Standing</p>
                   <p className="text-xs text-slate-500 font-medium">Top 5% of your department this month</p>
                 </div>
              </div>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold text-xs uppercase hover:bg-indigo-700 transition-all">Claim Rank</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
