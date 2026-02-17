
import React from 'react';
import { Bell, User as UserIcon, Search } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User;
  onProfileClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onProfileClick }) => {
  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 z-10 sticky top-0">
      <div className="flex items-center gap-2 md:hidden">
         <span className="text-indigo-600 font-black text-xl tracking-tight uppercase">CH</span>
      </div>
      
      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search resources, topics, or faculty..." 
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-12 pr-6 focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2.5 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div onClick={onProfileClick} className="flex items-center gap-3 pl-6 border-l border-slate-100 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{user.name}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{user.collegeName?.substring(0, 20) || 'Verified User'}</p>
          </div>
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black border-2 border-indigo-100 group-hover:scale-105 transition-transform overflow-hidden shadow-sm">
            {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.name.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
