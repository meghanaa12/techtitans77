
import React from 'react';
import { UserRole } from '../types';
import { Users, Globe, Lock, ShieldCheck, MessageSquare, ArrowRight } from 'lucide-react';

interface CommunitiesProps {
  userRole: UserRole;
}

const Communities: React.FC<CommunitiesProps> = ({ userRole }) => {
  const eduCommunities = [
    { name: 'CS Core - Semester 3', members: 124, active: true },
    { name: 'Discrete Math Group', members: 89, active: true },
    { name: 'Professor Feedback Hub', members: 45, active: false },
  ];

  const generalCommunities = [
    { name: 'Public Research Archive', members: 1200, active: true },
    { name: 'Open Learning Network', members: 3400, active: true },
    { name: 'Hackathon Prep 2026', members: 560, active: true },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Network Tiers</h1>
        <p className="text-slate-500">Connecting EDU Verified users with the Global Network.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* EDU Network Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white">
              <Lock size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">EDU Network (Verified Only)</h2>
          </div>
          <div className="space-y-4">
            {eduCommunities.map((comm, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-300 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{comm.name}</h4>
                    <p className="text-xs text-slate-500">{comm.members} Verified Members</p>
                  </div>
                </div>
                <ArrowRight className="text-slate-300 group-hover:text-indigo-500 transition-colors" size={20} />
              </div>
            ))}
          </div>
        </div>

        {/* General Network Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-xl text-white">
              <Globe size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">General Public Network</h2>
          </div>
          <div className="space-y-4">
            {generalCommunities.map((comm, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-slate-300 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{comm.name}</h4>
                    <p className="text-xs text-slate-500">{comm.members} Learners</p>
                  </div>
                </div>
                <ArrowRight className="text-slate-300 group-hover:text-slate-900 transition-colors" size={20} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-indigo-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-3xl font-black mb-4">Start a Forum</h3>
          <p className="text-indigo-200 text-lg leading-relaxed mb-8">
            Collaborate on specific subjects, share real-time exam tips, or host events within your EDU network.
          </p>
          <button className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2">
            <MessageSquare size={20} />
            Create New Discussion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Communities;
