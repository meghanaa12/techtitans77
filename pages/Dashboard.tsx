
import React, { useState } from 'react';
import { User, Resource, UserRole } from '../types';
import { 
  FilePlus, 
  TrendingUp, 
  Users, 
  DownloadCloud, 
  Star,
  Clock,
  Sparkles,
  Flame,
  Zap,
  Award
} from 'lucide-react';
import ResourceCard from '../components/ResourceCard';
import UploadModal from '../components/UploadModal';

interface DashboardProps {
  user: User;
  resources: Resource[];
  onUpload: (resource: Resource) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, resources, onUpload }) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const stats = [
    { label: 'Total Points', value: user.points, icon: Star, color: 'text-amber-500', bg: 'bg-amber-100' },
    { label: 'Streak Days', value: user.streak || 5, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100' },
    { label: 'XP Points', value: user.xp || 1240, icon: Zap, color: 'text-indigo-500', bg: 'bg-indigo-100' },
    { label: 'Resources Shared', value: resources.length, icon: FilePlus, color: 'text-emerald-500', bg: 'bg-emerald-100' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-slate-500 mt-1">Your academic impact is growing. Keep sharing!</p>
        </div>
        {(user.role === UserRole.STUDENT || user.role === UserRole.TEACHER) && (
          <button 
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
          >
            <FilePlus size={20} />
            Upload Resource
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Clock className="text-indigo-500" size={20} />
            Recent Contributions
          </h2>
          
          {resources.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {resources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <FilePlus size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Start your journey</h3>
              <p className="text-slate-500 mt-2">Upload question papers or notes to earn XP and rewards.</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="text-amber-500" size={20} />
              Earned Badges
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {['Early Adopter', 'Top Reviewer', 'Verified'].map((badge, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-2 border border-indigo-100">
                    <Sparkles size={18} className="text-indigo-600" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-900 text-white rounded-3xl p-6">
             <p className="text-indigo-200 text-sm font-bold uppercase tracking-wider mb-2">Daily Quest</p>
             <p className="text-lg font-medium">Download 3 resources to unlock a +50 XP bonus!</p>
             <div className="mt-4 w-full bg-indigo-800 h-2 rounded-full overflow-hidden">
               <div className="bg-indigo-400 h-full w-1/3"></div>
             </div>
             <p className="mt-2 text-xs text-indigo-300">1 of 3 completed</p>
          </div>
        </div>
      </div>

      <UploadModal 
        user={user}
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
        onUpload={(res) => {
          onUpload(res);
          setIsUploadOpen(false);
        }}
      />
    </div>
  );
};

export default Dashboard;
