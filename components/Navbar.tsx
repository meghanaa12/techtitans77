
import React from 'react';
import { Bell, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
      <div className="flex items-center gap-2 md:hidden">
         <span className="text-indigo-600 font-bold text-lg uppercase tracking-tight">CH</span>
      </div>
      
      <div className="flex-1 max-w-lg mx-8 hidden md:block">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search subjects, topics, or authors..." 
            className="w-full bg-slate-100 border-none rounded-full py-2 px-6 focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-tight">{user.name}</p>
            <p className="text-xs font-medium text-slate-500 uppercase">{user.role}</p>
          </div>
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold border-2 border-indigo-200">
            {user.avatar ? <img src={user.avatar} className="rounded-full" /> : user.name.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
