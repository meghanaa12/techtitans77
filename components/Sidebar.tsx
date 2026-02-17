
import React from 'react';
import { 
  LayoutDashboard, Search, LogOut, ShieldCheck, Award, Trophy, Users, BrainCircuit, UserCircle 
} from 'lucide-react';
import { User, UserRole } from '../types';

interface SidebarProps {
  user: User;
  activeTab: 'dashboard' | 'explore' | 'admin' | 'leaderboard' | 'communities' | 'profile';
  setActiveTab: (tab: 'dashboard' | 'explore' | 'admin' | 'leaderboard' | 'communities' | 'profile') => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'My Hub', icon: LayoutDashboard, roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN] },
    { id: 'explore', label: 'Library', icon: Search, roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN, UserRole.OUTSIDER] },
    { id: 'communities', label: 'Communities', icon: Users, roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN, UserRole.OUTSIDER] },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN, UserRole.OUTSIDER] },
    { id: 'profile', label: 'My Profile', icon: UserCircle, roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN, UserRole.OUTSIDER] },
    { id: 'admin', label: 'Admin Panel', icon: ShieldCheck, roles: [UserRole.ADMIN] },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="p-2 bg-indigo-600 rounded-lg">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">cogni<span className="text-indigo-400">HUB</span></span>
        </div>

        <nav className="space-y-1">
          {menuItems.filter(item => item.roles.includes(user.role)).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Award className="text-amber-400 w-4 h-4" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Academic Merit</span>
          </div>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-bold text-white">{user.points}</div>
            <div className="text-xs font-normal text-slate-400 mb-1.5">PTS</div>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-indigo-500 h-full" style={{ width: `${Math.min((user.xp / 5000) * 100, 100)}%` }}></div>
          </div>
        </div>
        
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 transition-all">
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
